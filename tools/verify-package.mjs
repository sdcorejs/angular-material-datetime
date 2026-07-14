import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const packageDirectory = resolve(root, process.argv[2] ?? 'dist/datetime');
const packageJsonPath = resolve(packageDirectory, 'package.json');
const npmCli = process.env.npm_execpath;

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

if (!existsSync(packageJsonPath)) {
  fail(`missing ${packageJsonPath}; run npm run build:datetime first`);
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const rootExport = packageJson.exports?.['.'];

if (!rootExport?.types || !rootExport?.default) {
  fail('package.json must expose root types and default entrypoints');
}

if (!packageJson.module || !packageJson.typings) {
  fail('package.json must contain module and typings fields');
}

const packResult = JSON.parse(
  runNpm(['pack', '--dry-run', '--json', packageDirectory]),
)[0];
const filePaths = packResult.files.map(({ path }) => path.replaceAll('\\', '/'));

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
    fail(`dry-run tarball is missing ${requiredFile}`);
  }
}

if (!filePaths.some((path) => path.startsWith('fesm2022/') && path.endsWith('.mjs'))) {
  fail('dry-run tarball has no FESM2022 bundle');
}

if (!filePaths.some((path) => path.endsWith('.d.ts'))) {
  fail('dry-run tarball has no TypeScript declarations');
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

console.log(JSON.stringify({
  name: packResult.name,
  version: packResult.version,
  filename: packResult.filename,
  packageSize: packResult.size,
  unpackedSize: packResult.unpackedSize,
  entryCount: packResult.entryCount,
  files: filePaths,
}, null, 2));
