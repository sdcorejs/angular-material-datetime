import assert from 'node:assert/strict';
import test from 'node:test';
import { publishDatetimePackage } from './publish-datetime.mjs';

const manifest = {
  name: '@sdcorejs/angular-material-datetime',
  version: '1.0.3',
};
const tarball = 'C:\\release\\sdcorejs-angular-material-datetime-1.0.3.tgz';
const sha256 = 'a'.repeat(64);
const integrity = `sha512-${Buffer.from('local artifact').toString('base64')}`;
const artifact = { sha256, integrity };

test('skips only when the exact version already exists with identical integrity', async () => {
  const calls = [];
  const result = await publishDatetimePackage({
    readManifest: async () => manifest,
    tarball,
    expectedSha256: sha256,
    inspectArtifact: async () => artifact,
    runNpm: (args) => {
      calls.push(args);
      return {
        status: 0,
        stdout: JSON.stringify({ version: manifest.version, dist: { integrity } }),
        stderr: '',
      };
    },
  });

  assert.deepEqual(result, { status: 'skipped', package: `${manifest.name}@${manifest.version}` });
  assert.deepEqual(calls, [[
    'view',
    `${manifest.name}@${manifest.version}`,
    'version',
    'dist.integrity',
    '--json',
  ]]);
});

test('rejects an existing version whose registry integrity differs', async () => {
  await assert.rejects(
    publishDatetimePackage({
      readManifest: async () => manifest,
      tarball,
      expectedSha256: sha256,
      inspectArtifact: async () => artifact,
      runNpm: () => ({
        status: 0,
        stdout: JSON.stringify({
          version: manifest.version,
          dist: { integrity: 'sha512-different' },
        }),
        stderr: '',
      }),
    }),
    /integrity differs/,
  );
});

test('publishes the verified absolute tarball when npm reports that the version does not exist', async () => {
  const calls = [];
  const result = await publishDatetimePackage({
    readManifest: async () => manifest,
    tarball,
    expectedSha256: sha256,
    inspectArtifact: async () => artifact,
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
    ['view', `${manifest.name}@${manifest.version}`, 'version', 'dist.integrity', '--json'],
    ['publish', tarball, '--access', 'public'],
  ]);
});

test('rejects a checksum mismatch before registry lookup or publish', async () => {
  const calls = [];
  await assert.rejects(
    publishDatetimePackage({
      readManifest: async () => manifest,
      tarball,
      expectedSha256: 'b'.repeat(64),
      inspectArtifact: async () => artifact,
      runNpm: (args) => {
        calls.push(args);
        return { status: 0, stdout: '', stderr: '' };
      },
    }),
    /SHA-256 mismatch/,
  );
  assert.deepEqual(calls, []);
});

test('does not publish when the registry lookup fails unexpectedly', async () => {
  await assert.rejects(
    publishDatetimePackage({
      readManifest: async () => manifest,
      tarball,
      expectedSha256: sha256,
      inspectArtifact: async () => artifact,
      runNpm: () => ({ status: 1, stdout: '', stderr: 'npm error code E401' }),
    }),
    /Unable to check/,
  );
});

test('reports an npm process startup failure without attempting publish', async () => {
  await assert.rejects(
    publishDatetimePackage({
      readManifest: async () => manifest,
      tarball,
      expectedSha256: sha256,
      inspectArtifact: async () => artifact,
      runNpm: () => ({ status: null, error: new Error('spawnSync npm.cmd EINVAL') }),
    }),
    /Unable to execute npm view.*EINVAL/,
  );
});
