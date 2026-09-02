import { spawnSync, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import {
  mkdtemp,
  readFile,
  rm,
  stat,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const bundledNpmCli = resolve(process.execPath, '..', 'node_modules', 'npm', 'bin', 'npm-cli.js');
const npmCli = process.env.npm_execpath ?? (existsSync(bundledNpmCli) ? bundledNpmCli : undefined);

function runNpmCommand(args) {
  const isPublish = args[0] === 'publish';
  const command = npmCli ? process.execPath : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const commandArgs = npmCli ? [npmCli, ...args] : args;
  return spawnSync(command, commandArgs, {
    encoding: 'utf8',
    stdio: isPublish ? 'inherit' : 'pipe',
  });
}

async function inspectReleaseArtifact(tarball) {
  const bytes = await readFile(tarball);
  return {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    integrity: `sha512-${createHash('sha512').update(bytes).digest('base64')}`,
  };
}

async function readTarballManifest(tarball) {
  const workspace = await mkdtemp(join(tmpdir(), 'sd-datetime-publish-'));
  try {
    execFileSync('tar', ['-xzf', tarball, '-C', workspace], { stdio: 'pipe' });
    return JSON.parse(await readFile(join(workspace, 'package', 'package.json'), 'utf8'));
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}

function registryIntegrity(metadata) {
  return metadata?.['dist.integrity'] ?? metadata?.dist?.integrity;
}

export async function publishDatetimePackage({
  readManifest = readTarballManifest,
  runNpm = runNpmCommand,
  tarball = process.env.SD_DATETIME_RELEASE_TARBALL,
  expectedSha256 = process.env.SD_DATETIME_RELEASE_SHA256,
  inspectArtifact = inspectReleaseArtifact,
} = {}) {
  if (!tarball) {
    throw new Error('SD_DATETIME_RELEASE_TARBALL is required.');
  }
  if (!isAbsolute(tarball)) {
    throw new Error(`Release tarball path must be absolute: ${tarball}`);
  }
  const resolvedTarball = resolve(tarball);
  if (!expectedSha256 || !/^[a-f\d]{64}$/i.test(expectedSha256)) {
    throw new Error('SD_DATETIME_RELEASE_SHA256 must be a 64-character SHA-256 digest.');
  }

  if (inspectArtifact === inspectReleaseArtifact) {
    const tarballStats = await stat(resolvedTarball);
    if (!tarballStats.isFile()) {
      throw new Error(`Release tarball is not a file: ${resolvedTarball}`);
    }
  }

  const artifact = await inspectArtifact(resolvedTarball);
  if (artifact.sha256.toLowerCase() !== expectedSha256.toLowerCase()) {
    throw new Error(
      `Release tarball SHA-256 mismatch: expected ${expectedSha256.toLowerCase()}, received ${artifact.sha256.toLowerCase()}.`,
    );
  }

  const manifest = await readManifest(resolvedTarball);
  const packageSpec = `${manifest.name}@${manifest.version}`;
  const lookup = runNpm(['view', packageSpec, 'version', 'dist.integrity', '--json']);

  if (lookup.error) {
    throw new Error(`Unable to execute npm view for ${packageSpec}: ${lookup.error.message}`);
  }

  if (lookup.status === 0) {
    const published = JSON.parse(lookup.stdout.trim());
    if (published.version !== manifest.version) {
      throw new Error(`Registry returned ${published.version} while checking ${packageSpec}.`);
    }
    const publishedIntegrity = registryIntegrity(published);
    if (publishedIntegrity !== artifact.integrity) {
      throw new Error(
        `Registry integrity differs for ${packageSpec}: expected ${artifact.integrity}, received ${publishedIntegrity ?? 'missing'}.`,
      );
    }
    return { status: 'skipped', package: packageSpec };
  }

  if (!lookup.stderr?.includes('E404')) {
    throw new Error(`Unable to check ${packageSpec} on npm: ${lookup.stderr?.trim() || 'unknown npm error'}`);
  }

  const publish = runNpm(['publish', resolvedTarball, '--access', 'public']);
  if (publish.error) {
    throw new Error(`Unable to execute npm publish for ${packageSpec}: ${publish.error.message}`);
  }
  if (publish.status !== 0) {
    throw new Error(`npm publish failed for ${packageSpec} with exit code ${publish.status}.`);
  }

  return { status: 'published', package: packageSpec };
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  const result = await publishDatetimePackage();
  if (result.status === 'skipped') {
    console.log(`${result.package} is already published with identical integrity; skipping npm publish.`);
  } else {
    console.log(`${result.package} published successfully.`);
  }
}
