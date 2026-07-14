import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflow = await readFile(new URL('../.github/workflows/release.yml', import.meta.url), 'utf8');
const rootPackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

test('release workflow ignores showcase-only pushes', () => {
  assert.match(workflow, /push:\s*\n\s*branches:\s*\n\s*- main\s*\n\s*paths:/);
  assert.match(workflow, /- ['"]?projects\/datetime\/\*\*['"]?/);
  assert.match(workflow, /- ['"]?\.changeset\/\*\*['"]?/);
  assert.doesNotMatch(workflow, /- ['"]?projects\/demo\/\*\*['"]?/);
});

test('release script uses the idempotent datetime publisher', () => {
  assert.match(rootPackage.scripts.release, /node tools\/publish-datetime\.mjs/);
  assert.doesNotMatch(rootPackage.scripts.release, /npm run publish:datetime/);
});
