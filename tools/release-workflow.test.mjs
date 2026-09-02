import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflow = await readFile(new URL('../.github/workflows/release.yml', import.meta.url), 'utf8');
const ciWorkflow = await readFile(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
const rootPackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

test('release workflow ignores showcase-only pushes', () => {
  assert.match(workflow, /push:\s*\n\s*branches:\s*\n\s*- main\s*\n\s*paths:/);
  assert.match(workflow, /- ['"]?projects\/datetime\/\*\*['"]?/);
  assert.match(workflow, /- ['"]?\.changeset\/\*\*['"]?/);
  assert.doesNotMatch(workflow, /- ['"]?projects\/demo\/\*\*['"]?/);
});

test('release script uses the idempotent datetime publisher', () => {
  assert.equal(rootPackage.scripts.release, 'node tools/publish-datetime.mjs');
  assert.doesNotMatch(rootPackage.scripts.release, /npm run publish:datetime/);
  assert.doesNotMatch(rootPackage.scripts.release, /build|pack|test:/);
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
      new RegExp(`consumer-smoke\\.mjs --tarball ['"]?\\$\\{\\{ steps\\.release-artifact\\.outputs\\.tarball \\}\\} --angular=${major}`),
    );
  }

  assert.match(workflow, /SD_DATETIME_RELEASE_TARBALL:\s*\$\{\{ steps\.release-artifact\.outputs\.tarball \}\}/);
  assert.match(workflow, /SD_DATETIME_RELEASE_SHA256:\s*\$\{\{ steps\.release-artifact\.outputs\.sha256 \}\}/);
  assert.match(workflow, /NODE_AUTH_TOKEN:\s*\$\{\{ secrets\.NPM_TOKEN \}\}/);
  assert.doesNotMatch(workflow, /npm publish \.\/dist\/datetime/);
});
