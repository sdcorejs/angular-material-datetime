import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const verifier = resolve(import.meta.dirname, 'verify-package.mjs');
const workflow = await readFile(new URL('../.github/workflows/release.yml', import.meta.url), 'utf8');
const ciWorkflow = await readFile(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
const consumerHarness = await readFile(new URL('./consumer-smoke.mjs', import.meta.url), 'utf8');
const rootPackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

test('release workflow ignores showcase-only pushes', () => {
  assert.match(workflow, /push:\s*\n\s*branches:\s*\n\s*- main\s*\n\s*paths:/);
  assert.match(workflow, /- ['"]?projects\/datetime\/\*\*['"]?/);
  assert.match(workflow, /- ['"]?\.changeset\/\*\*['"]?/);
  assert.doesNotMatch(workflow, /- ['"]?projects\/demo\/\*\*['"]?/);
});

test('release script publishes the immutable tarball before creating the Changesets tag', () => {
  assert.equal(
    rootPackage.scripts.release,
    'node tools/publish-datetime.mjs && changeset tag',
  );
  assert.match(workflow, /publish:\s*npm run release/);
  assert.doesNotMatch(rootPackage.scripts.release, /npm run publish:datetime/);
  assert.doesNotMatch(rootPackage.scripts.release, /build|pack|test:/);
});

test('release installs an OIDC-capable npm CLI before dependency installation', () => {
  const setupNodeIndex = workflow.indexOf("node-version: '22.22.3'");
  const setupNpmIndex = workflow.indexOf('npm install --global npm@11.19.1');
  const installDependenciesIndex = workflow.indexOf('run: npm ci');

  assert.match(workflow, /id-token:\s*write/);
  assert.doesNotMatch(workflow, /^\s+NPM_TOKEN:/m);
  assert.doesNotMatch(workflow, /^\s+NODE_AUTH_TOKEN:/m);
  assert.doesNotMatch(workflow, /^\s+registry-url:/m);
  assert.ok(setupNodeIndex >= 0, 'expected the exact release Node version');
  assert.ok(setupNpmIndex > setupNodeIndex, 'expected npm setup after Node setup');
  assert.ok(
    installDependenciesIndex > setupNpmIndex,
    'expected OIDC-capable npm before npm ci and the publish command',
  );
});

test('Angular packed-consumer CI runs on exact Node 22.22.3 and covers boundary majors', () => {
  assert.match(ciWorkflow, /node-version:\s*['"]22\.22\.3['"]/);
  assert.match(ciWorkflow, /consumer-smoke\.mjs[^\n]*--angular=19/);
  assert.match(ciWorkflow, /consumer-smoke\.mjs[^\n]*--angular=22/);
});

test('release verifies and publishes one immutable tarball', () => {
  assert.match(workflow, /node-version:\s*['"]22\.22\.3['"]/);
  assert.equal((workflow.match(/npm pack \.\/dist\/datetime/g) ?? []).length, 1);
  assert.match(workflow, /id:\s*release-artifact/);
  assert.match(workflow, /tarball=.*>>\s*['"]?\$GITHUB_OUTPUT/);
  assert.match(workflow, /sha256=.*>>\s*['"]?\$GITHUB_OUTPUT/);
  assert.match(workflow, /verify-package\.mjs --tarball ['"]?\$\{\{ steps\.release-artifact\.outputs\.tarball \}\}/);
  assert.match(workflow, /compare-package-baseline\.mjs --tarball ['"]?\$\{\{ steps\.release-artifact\.outputs\.tarball \}\}/);

  for (const major of [19, 20, 21, 22]) {
    assert.match(
      workflow,
      new RegExp(`consumer-smoke\\.mjs --tarball ['"]?\\$\\{\\{ steps\\.release-artifact\\.outputs\\.tarball \\}\\}['"]? --angular=${major}`),
    );
  }

  assert.match(workflow, /SD_DATETIME_RELEASE_TARBALL:\s*\$\{\{ steps\.release-artifact\.outputs\.tarball \}\}/);
  assert.match(workflow, /SD_DATETIME_RELEASE_SHA256:\s*\$\{\{ steps\.release-artifact\.outputs\.sha256 \}\}/);
  assert.doesNotMatch(workflow, /NODE_AUTH_TOKEN:\s*\$\{\{ secrets\.NPM_TOKEN \}\}/);
  assert.doesNotMatch(workflow, /npm publish \.\/dist\/datetime/);
});

test('package verifier preserves the positional package-directory API', () => {
  const missingPackageDirectory = resolve(root, 'missing-positional-package-fixture');
  const result = spawnSync(process.execPath, [verifier, missingPackageDirectory], {
    cwd: root,
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.ok(`${result.stdout}${result.stderr}`.includes(missingPackageDirectory));
});

test('package verifier rejects ambiguous or unknown tarball arguments', () => {
  const firstTarball = resolve(root, 'first.tgz');
  const secondTarball = resolve(root, 'second.tgz');
  const duplicate = spawnSync(
    process.execPath,
    [verifier, `--tarball=${firstTarball}`, `--tarball=${secondTarball}`],
    { cwd: root, encoding: 'utf8' },
  );
  assert.notEqual(duplicate.status, 0);
  assert.match(`${duplicate.stdout}${duplicate.stderr}`, /duplicate --tarball option/);

  const unknown = spawnSync(
    process.execPath,
    [verifier, '--tarball', firstTarball, '--unknown'],
    { cwd: root, encoding: 'utf8' },
  );
  assert.notEqual(unknown.status, 0);
  assert.match(`${unknown.stdout}${unknown.stderr}`, /unknown argument --unknown/);
});

test('consumer tarball mode cannot repack the supplied artifact', () => {
  const branch = consumerHarness.match(/if \(requestedTarball\) \{([\s\S]*?)\n  \} else \{([\s\S]*?)\n  \}/);
  assert.ok(branch, 'expected explicit supplied-tarball and developer-pack branches');
  assert.doesNotMatch(branch[1], /runNpm\(\s*\[\s*['"]pack['"]/);
  assert.equal((branch[2].match(/runNpm\(\s*\[\s*['"]pack['"]/g) ?? []).length, 1);
});
