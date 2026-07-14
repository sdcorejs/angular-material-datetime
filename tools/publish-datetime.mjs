import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const DEFAULT_PACKAGE_DIR = './dist/datetime';
const DEFAULT_MANIFEST_URL = new URL('../dist/datetime/package.json', import.meta.url);

function runNpmCommand(args) {
  const isPublish = args[0] === 'publish';
  return spawnSync('npm', args, {
    encoding: 'utf8',
    shell: process.platform === 'win32',
    stdio: isPublish ? 'inherit' : 'pipe',
  });
}

async function readBuiltManifest() {
  return JSON.parse(await readFile(DEFAULT_MANIFEST_URL, 'utf8'));
}

export async function publishDatetimePackage({
  readManifest = readBuiltManifest,
  runNpm = runNpmCommand,
  packageDir = DEFAULT_PACKAGE_DIR,
} = {}) {
  const manifest = await readManifest();
  const packageSpec = `${manifest.name}@${manifest.version}`;
  const lookup = runNpm(['view', packageSpec, 'version', '--json']);

  if (lookup.error) {
    throw new Error(`Unable to execute npm view for ${packageSpec}: ${lookup.error.message}`);
  }

  if (lookup.status === 0) {
    const publishedVersion = JSON.parse(lookup.stdout.trim());
    if (publishedVersion === manifest.version) {
      return { status: 'skipped', package: packageSpec };
    }
    throw new Error(`Registry returned ${publishedVersion} while checking ${packageSpec}.`);
  }

  if (!lookup.stderr?.includes('E404')) {
    throw new Error(`Unable to check ${packageSpec} on npm: ${lookup.stderr?.trim() || 'unknown npm error'}`);
  }

  const publish = runNpm(['publish', packageDir, '--access', 'public']);
  if (publish.error) {
    throw new Error(`Unable to execute npm publish for ${packageSpec}: ${publish.error.message}`);
  }
  if (publish.status !== 0) {
    throw new Error(`npm publish failed for ${packageSpec} with exit code ${publish.status}.`);
  }

  return { status: 'published', package: packageSpec };
}

const invokedPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;
if (invokedPath === import.meta.url) {
  const result = await publishDatetimePackage();
  if (result.status === 'skipped') {
    console.log(`${result.package} is already published; skipping npm publish.`);
  } else {
    console.log(`${result.package} published successfully.`);
  }
}
