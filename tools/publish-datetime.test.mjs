import assert from 'node:assert/strict';
import test from 'node:test';
import { publishDatetimePackage } from './publish-datetime.mjs';

const manifest = {
  name: '@sdcorejs/angular-material-datetime',
  version: '1.0.3',
};

test('skips publishing when the exact version already exists', async () => {
  const calls = [];
  const result = await publishDatetimePackage({
    readManifest: async () => manifest,
    runNpm: (args) => {
      calls.push(args);
      return { status: 0, stdout: JSON.stringify(manifest.version), stderr: '' };
    },
  });

  assert.deepEqual(result, { status: 'skipped', package: `${manifest.name}@${manifest.version}` });
  assert.deepEqual(calls, [['view', `${manifest.name}@${manifest.version}`, 'version', '--json']]);
});

test('publishes when npm reports that the version does not exist', async () => {
  const calls = [];
  const result = await publishDatetimePackage({
    readManifest: async () => manifest,
    runNpm: (args) => {
      calls.push(args);
      if (args[0] === 'view') {
        return { status: 1, stdout: '', stderr: 'npm error code E404' };
      }
      return { status: 0, stdout: '', stderr: '' };
    },
  });

  assert.deepEqual(result, { status: 'published', package: `${manifest.name}@${manifest.version}` });
  assert.deepEqual(calls, [
    ['view', `${manifest.name}@${manifest.version}`, 'version', '--json'],
    ['publish', './dist/datetime', '--access', 'public'],
  ]);
});

test('does not publish when the registry lookup fails unexpectedly', async () => {
  await assert.rejects(
    publishDatetimePackage({
      readManifest: async () => manifest,
      runNpm: () => ({ status: 1, stdout: '', stderr: 'npm error code E401' }),
    }),
    /Unable to check/,
  );
});

test('reports an npm process startup failure without attempting publish', async () => {
  await assert.rejects(
    publishDatetimePackage({
      readManifest: async () => manifest,
      runNpm: () => ({ status: null, error: new Error('spawnSync npm.cmd EINVAL') }),
    }),
    /Unable to execute npm view.*EINVAL/,
  );
});
