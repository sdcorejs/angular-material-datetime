import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import {
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  basename,
  isAbsolute,
  join,
  relative,
  resolve,
} from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const DEFAULT_BASELINE = '@sdcorejs/angular-material-datetime@1.0.3';
const APPROVED_PEER_TRANSITIONS = new Map([
  ['@angular/cdk', ['>=19.0.0 <22.0.0', '>=19.0.0 <23.0.0']],
  ['@angular/common', ['>=19.0.0 <22.0.0', '>=19.0.0 <23.0.0']],
  ['@angular/core', ['>=19.0.0 <22.0.0', '>=19.0.0 <23.0.0']],
  ['@angular/forms', ['>=19.0.0 <22.0.0', '>=19.0.0 <23.0.0']],
  ['@angular/material', ['>=19.0.0 <22.0.0', '>=19.0.0 <23.0.0']],
]);
const bundledNpmCli = resolve(process.execPath, '..', 'node_modules', 'npm', 'bin', 'npm-cli.js');
const npmCli = process.env.npm_execpath ?? (existsSync(bundledNpmCli) ? bundledNpmCli : undefined);

function runNpm(args, options = {}) {
  if (npmCli) {
    return execFileSync(process.execPath, [npmCli, ...args], options);
  }
  return execFileSync('npm', args, options);
}

function stableValue(value) {
  if (Array.isArray(value)) {
    return value.map(stableValue);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right, 'en'))
        .map(([key, child]) => [key, stableValue(child)]),
    );
  }
  return value;
}

function stableJson(value) {
  return JSON.stringify(stableValue(value));
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(target));
    } else if (entry.isFile()) {
      files.push(target);
    }
  }

  return files;
}

function declarationFingerprint(sourceFile, printer) {
  const canonicalSource = sourceFile.statements
    .map((statement) => printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile))
    .join('\n');
  return createHash('sha256').update(canonicalSource).digest('hex');
}

function declarationSymbols(sourceFile, checker) {
  const sourceSymbol = checker.getSymbolAtLocation(sourceFile) ?? sourceFile.symbol;
  if (!sourceSymbol) {
    return [];
  }
  return checker.getExportsOfModule(sourceSymbol)
    .map((symbol) => symbol.getName())
    .sort((left, right) => left.localeCompare(right, 'en'));
}

export async function createPackageSurface(packageDirectory) {
  const resolvedDirectory = resolve(packageDirectory);
  const packageStats = await stat(resolvedDirectory);
  if (!packageStats.isDirectory()) {
    throw new Error(`Package surface input must be a directory: ${resolvedDirectory}`);
  }

  const manifest = JSON.parse(await readFile(join(resolvedDirectory, 'package.json'), 'utf8'));
  const declarationFiles = (await listFiles(resolvedDirectory))
    .filter((path) => path.endsWith('.d.ts'))
    .sort((left, right) => left.localeCompare(right, 'en'));
  const program = ts.createProgram(declarationFiles, {
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.Latest,
  });
  const checker = program.getTypeChecker();
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: true,
  });
  const declarationInventory = declarationFiles.map((filePath) => {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) {
      throw new Error(`Unable to parse declaration: ${filePath}`);
    }
    return {
      path: relative(resolvedDirectory, filePath).replaceAll('\\', '/'),
      symbols: declarationSymbols(sourceFile, checker),
      fingerprint: declarationFingerprint(sourceFile, printer),
    };
  });
  const {
    version: _version,
    description: _description,
    peerDependencies = {},
    ...manifestContract
  } = manifest;

  return {
    name: manifest.name,
    version: manifest.version,
    exportMapKeys: Object.keys(manifest.exports ?? {}).sort((left, right) => left.localeCompare(right, 'en')),
    module: manifest.module,
    typings: manifest.typings,
    manifestContract: stableValue(manifestContract),
    peerDependencies: stableValue(peerDependencies),
    declarationInventory,
  };
}

function comparePeerDependencies(baseline, candidate, differences) {
  const baselineKeys = Object.keys(baseline);
  const candidateKeys = Object.keys(candidate);
  if (stableJson(baselineKeys) !== stableJson(candidateKeys)) {
    differences.push(`peer dependency keys changed: ${stableJson(baselineKeys)} -> ${stableJson(candidateKeys)}`);
    return;
  }

  for (const key of baselineKeys) {
    const approvedTransition = APPROVED_PEER_TRANSITIONS.get(key);
    if (approvedTransition) {
      const [expectedBaseline, expectedCandidate] = approvedTransition;
      if (baseline[key] !== expectedBaseline || candidate[key] !== expectedCandidate) {
        differences.push(
          `peer dependency ${key} must change exactly ${expectedBaseline} -> ${expectedCandidate}; received ${baseline[key]} -> ${candidate[key]}`,
        );
      }
    } else if (baseline[key] !== candidate[key]) {
      differences.push(`peer dependency ${key} changed: ${baseline[key]} -> ${candidate[key]}`);
    }
  }
}

export function comparePackageSurfaces(baseline, candidate) {
  const differences = [];

  if (baseline.name !== candidate.name) {
    differences.push(`package name changed: ${baseline.name} -> ${candidate.name}`);
  }
  if (stableJson(baseline.exportMapKeys) !== stableJson(candidate.exportMapKeys)) {
    differences.push(`root export-map keys changed: ${stableJson(baseline.exportMapKeys)} -> ${stableJson(candidate.exportMapKeys)}`);
  }
  if (baseline.module !== candidate.module) {
    differences.push(`module changed: ${baseline.module} -> ${candidate.module}`);
  }
  if (baseline.typings !== candidate.typings) {
    differences.push(`typings changed: ${baseline.typings} -> ${candidate.typings}`);
  }
  if (stableJson(baseline.manifestContract) !== stableJson(candidate.manifestContract)) {
    differences.push('manifest metadata outside version, description, and approved peer ranges changed');
  }

  comparePeerDependencies(baseline.peerDependencies, candidate.peerDependencies, differences);

  if (stableJson(baseline.declarationInventory) !== stableJson(candidate.declarationInventory)) {
    differences.push('public declaration inventory or declaration signature changed');
  }

  return { compatible: differences.length === 0, differences };
}

function readOption(argv, name) {
  const equalsArguments = argv.filter((argument) => argument.startsWith(`${name}=`));
  const optionIndexes = argv.flatMap((argument, index) => argument === name ? [index] : []);
  if (equalsArguments.length + optionIndexes.length > 1) {
    throw new Error(`Duplicate option: ${name}`);
  }
  if (equalsArguments.length === 1) {
    const value = equalsArguments[0].slice(name.length + 1);
    if (!value) throw new Error(`${name} requires a value.`);
    return value;
  }
  if (optionIndexes.length === 1) {
    const value = argv[optionIndexes[0] + 1];
    if (!value || value.startsWith('--')) throw new Error(`${name} requires a value.`);
    return value;
  }
  return undefined;
}

function parseExactPackageSpec(packageSpec) {
  const separator = packageSpec.lastIndexOf('@');
  const name = packageSpec.slice(0, separator);
  const version = packageSpec.slice(separator + 1);
  if (!name || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error(`Baseline must be an exact package version: ${packageSpec}`);
  }
  return { name, version };
}

export function parseBaselineArgs(argv) {
  const tarball = readOption(argv, '--tarball');
  const baseline = readOption(argv, '--baseline') ?? DEFAULT_BASELINE;
  const consumed = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--tarball' || argument === '--baseline') {
      consumed.add(index);
      consumed.add(index + 1);
    } else if (argument.startsWith('--tarball=') || argument.startsWith('--baseline=')) {
      consumed.add(index);
    }
  }
  const unknown = argv.filter((_argument, index) => !consumed.has(index));
  if (unknown.length > 0) {
    throw new Error(`Unknown argument: ${unknown[0]}`);
  }
  parseExactPackageSpec(baseline);

  if (tarball && !isAbsolute(tarball)) {
    throw new Error(`--tarball must be an absolute path: ${tarball}`);
  }
  return {
    baseline,
    tarball: tarball ? resolve(tarball) : undefined,
  };
}

async function withExtractedTarball(tarball, callback) {
  const workspace = await mkdtemp(join(tmpdir(), 'sd-datetime-package-'));
  try {
    execFileSync('tar', ['-xzf', tarball, '-C', workspace], { stdio: 'pipe' });
    const packageDirectory = join(workspace, 'package');
    await stat(join(packageDirectory, 'package.json'));
    return await callback(packageDirectory);
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}

async function snapshotBaseline(packageSpec) {
  const expected = parseExactPackageSpec(packageSpec);
  const workspace = await mkdtemp(join(tmpdir(), 'sd-datetime-baseline-'));
  try {
    const pack = JSON.parse(runNpm(
      ['pack', packageSpec, '--json', '--pack-destination', workspace],
      { cwd: root, encoding: 'utf8' },
    ))[0];
    const tarball = join(workspace, pack.filename);
    return await withExtractedTarball(tarball, async (directory) => {
      const surface = await createPackageSurface(directory);
      if (surface.name !== expected.name || surface.version !== expected.version) {
        throw new Error(
          `Baseline identity mismatch: expected ${packageSpec}, received ${surface.name}@${surface.version}.`,
        );
      }
      return surface;
    });
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}

export async function comparePackageBaseline({
  baseline = DEFAULT_BASELINE,
  tarball,
  packageDirectory = join(root, 'dist', 'datetime'),
} = {}) {
  const baselineSurface = await snapshotBaseline(baseline);
  const candidateSurface = tarball
    ? await withExtractedTarball(tarball, createPackageSurface)
    : await createPackageSurface(packageDirectory);
  const result = comparePackageSurfaces(baselineSurface, candidateSurface);
  return { ...result, baseline: baselineSurface, candidate: candidateSurface };
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  const options = parseBaselineArgs(process.argv.slice(2));
  const result = await comparePackageBaseline(options);
  if (!result.compatible) {
    throw new Error(`Package baseline comparison failed:\n- ${result.differences.join('\n- ')}`);
  }
  console.log(JSON.stringify({
    baseline: `${result.baseline.name}@${result.baseline.version}`,
    candidate: `${result.candidate.name}@${result.candidate.version}`,
    tarball: options.tarball ? basename(options.tarball) : null,
    exportMapKeys: result.candidate.exportMapKeys,
    module: result.candidate.module,
    typings: result.candidate.typings,
    declarationFiles: result.candidate.declarationInventory.length,
    declarationSymbols: result.candidate.declarationInventory
      .reduce((count, declaration) => count + declaration.symbols.length, 0),
  }, null, 2));
}
