import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  basename,
  isAbsolute,
  join,
  relative,
  resolve,
} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const bundledNpmCli = resolve(process.execPath, '..', 'node_modules', 'npm', 'bin', 'npm-cli.js');
const npmCli = process.env.npm_execpath ?? (existsSync(bundledNpmCli) ? bundledNpmCli : undefined);

function fail(message) {
  throw new Error(`Package verification failed: ${message}`);
}

function runNpm(args) {
  if (npmCli) {
    return execFileSync(process.execPath, [npmCli, ...args], {
      cwd: root,
      encoding: 'utf8',
    });
  }

  return execFileSync('npm', args, { cwd: root, encoding: 'utf8' });
}

function parseArguments(argv) {
  const equalsIndexes = argv.flatMap((argument, index) =>
    argument.startsWith('--tarball=') ? [index] : []);
  const optionIndexes = argv.flatMap((argument, index) =>
    argument === '--tarball' ? [index] : []);
  if (equalsIndexes.length + optionIndexes.length > 1) {
    fail('duplicate --tarball option');
  }

  const consumed = new Set();
  let tarball;
  if (equalsIndexes.length === 1) {
    const index = equalsIndexes[0];
    consumed.add(index);
    tarball = argv[index].slice('--tarball='.length);
    if (!tarball) fail('--tarball requires a value');
  } else if (optionIndexes.length === 1) {
    const index = optionIndexes[0];
    consumed.add(index);
    consumed.add(index + 1);
    tarball = argv[index + 1];
    if (!tarball || tarball.startsWith('--')) fail('--tarball requires a value');
  }

  const remaining = argv.filter((_argument, index) => !consumed.has(index));
  if (tarball) {
    if (remaining.length > 0) fail(`unknown argument ${remaining[0]}`);
    return { tarball };
  }
  if (remaining.length > 1) fail(`unknown argument ${remaining[1]}`);
  if (remaining[0]?.startsWith('--')) fail(`unknown argument ${remaining[0]}`);
  return { packageDirectory: remaining[0] };
}

function listPackageFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listPackageFiles(target));
    } else if (entry.isFile()) {
      files.push(target);
    }
  }
  return files;
}

const argv = process.argv.slice(2);
const { tarball: tarballArgument, packageDirectory: positionalPackageDirectory } = parseArguments(argv);

let workspace;
let packageDirectory;
let packageJson;
let filePaths;
let summary;

try {
  if (tarballArgument) {
    if (!isAbsolute(tarballArgument)) {
      fail(`--tarball must be an absolute path: ${tarballArgument}`);
    }
    const tarball = resolve(tarballArgument);
    if (!existsSync(tarball) || !statSync(tarball).isFile()) {
      fail(`tarball does not exist: ${tarball}`);
    }
    workspace = mkdtempSync(join(tmpdir(), 'sd-datetime-verify-'));
    execFileSync('tar', ['-xzf', tarball, '-C', workspace], { stdio: 'pipe' });
    packageDirectory = join(workspace, 'package');
    const packageJsonPath = join(packageDirectory, 'package.json');
    if (!existsSync(packageJsonPath)) {
      fail(`tarball ${tarball} has no package/package.json`);
    }
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const files = listPackageFiles(packageDirectory);
    filePaths = files
      .map((path) => relative(packageDirectory, path).replaceAll('\\', '/'))
      .sort();
    summary = {
      name: packageJson.name,
      version: packageJson.version,
      filename: basename(tarball),
      packageSize: statSync(tarball).size,
      unpackedSize: files.reduce((size, path) => size + statSync(path).size, 0),
      entryCount: files.length,
    };
  } else {
    packageDirectory = resolve(root, positionalPackageDirectory ?? 'dist/datetime');
    const packageJsonPath = join(packageDirectory, 'package.json');
    if (!existsSync(packageJsonPath)) {
      fail(`missing ${packageJsonPath}; run npm run build:datetime first`);
    }
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const packResult = JSON.parse(
      runNpm(['pack', '--dry-run', '--json', packageDirectory]),
    )[0];
    filePaths = packResult.files.map(({ path }) => path.replaceAll('\\', '/'));
    summary = {
      name: packResult.name,
      version: packResult.version,
      filename: packResult.filename,
      packageSize: packResult.size,
      unpackedSize: packResult.unpackedSize,
      entryCount: packResult.entryCount,
    };
  }

  const rootExport = packageJson.exports?.['.'];
  if (!rootExport?.types || !rootExport?.default) {
    fail('package.json must expose root types and default entrypoints');
  }

  if (!packageJson.module || !packageJson.typings) {
    fail('package.json must contain module and typings fields');
  }

  const requiredFiles = [
    'package.json',
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
    packageJson.typings,
    packageJson.module,
  ];

  for (const requiredFile of requiredFiles) {
    if (!filePaths.includes(requiredFile)) {
      fail(`artifact is missing ${requiredFile}`);
    }
  }

  if (!filePaths.some((path) => path.startsWith('fesm2022/') && path.endsWith('.mjs'))) {
    fail('artifact has no FESM2022 bundle');
  }

  if (!filePaths.some((path) => path.endsWith('.d.ts'))) {
    fail('artifact has no TypeScript declarations');
  }

  const forbiddenFile = filePaths.find((path) =>
    path.startsWith('src/')
    || path.includes('.spec.')
    || path.includes('tsconfig')
    || path.endsWith('ng-package.json')
    || path.endsWith('.html')
    || path.endsWith('.scss'));

  if (forbiddenFile) {
    fail(`source-only artifact leaked into tarball: ${forbiddenFile}`);
  }

  console.log(JSON.stringify({ ...summary, files: filePaths }, null, 2));
} finally {
  if (workspace) {
    rmSync(workspace, { recursive: true, force: true });
  }
}
