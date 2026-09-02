import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  comparePackageSurfaces,
  createPackageSurface,
} from './compare-package-baseline.mjs';

const baseManifest = {
  name: '@sdcorejs/angular-material-datetime',
  version: '1.0.3',
  description: 'Angular 19–21',
  module: 'fesm2022/sdcorejs-angular-material-datetime.mjs',
  typings: 'index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      default: './fesm2022/sdcorejs-angular-material-datetime.mjs',
    },
    './package.json': { default: './package.json' },
  },
  peerDependencies: {
    '@angular/core': '>=19.0.0 <22.0.0',
    rxjs: '^7.0.0',
  },
};

async function withPackage(manifest, declarations, callback) {
  const directory = await mkdtemp(join(tmpdir(), 'sd-datetime-surface-'));
  try {
    await writeFile(join(directory, 'package.json'), JSON.stringify(manifest, null, 2));
    for (const [relativePath, source] of Object.entries(declarations)) {
      const target = join(directory, relativePath);
      await mkdir(join(target, '..'), { recursive: true });
      await writeFile(target, source);
    }
    return await callback(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

const declarations = {
  'index.d.ts': "export { PublicThing } from './lib/public-thing';\n",
  'lib/public-thing.d.ts': 'export declare class PublicThing {}\nexport interface PublicOptions { enabled: boolean; }\n',
};

test('allows only release description, version, and peer metadata changes', async () => {
  const candidateManifest = {
    ...baseManifest,
    version: '1.0.4',
    description: 'Angular 19–22',
    peerDependencies: {
      ...baseManifest.peerDependencies,
      '@angular/core': '>=19.0.0 <23.0.0',
    },
  };

  await withPackage(baseManifest, declarations, async (baselineDirectory) => {
    await withPackage(candidateManifest, declarations, async (candidateDirectory) => {
      const baseline = await createPackageSurface(baselineDirectory);
      const candidate = await createPackageSurface(candidateDirectory);
      assert.deepEqual(comparePackageSurfaces(baseline, candidate), { compatible: true, differences: [] });
    });
  });
});

test('rejects root export-map drift', async () => {
  const candidateManifest = {
    ...baseManifest,
    exports: { ...baseManifest.exports, './unexpected': './unexpected.d.ts' },
  };

  await withPackage(baseManifest, declarations, async (baselineDirectory) => {
    await withPackage(candidateManifest, declarations, async (candidateDirectory) => {
      const result = comparePackageSurfaces(
        await createPackageSurface(baselineDirectory),
        await createPackageSurface(candidateDirectory),
      );
      assert.equal(result.compatible, false);
      assert.match(result.differences.join('\n'), /export-map keys/);
    });
  });
});

test('rejects module or typings entrypoint drift', async () => {
  const candidateManifest = { ...baseManifest, module: 'fesm2022/renamed.mjs' };

  await withPackage(baseManifest, declarations, async (baselineDirectory) => {
    await withPackage(candidateManifest, declarations, async (candidateDirectory) => {
      const result = comparePackageSurfaces(
        await createPackageSurface(baselineDirectory),
        await createPackageSurface(candidateDirectory),
      );
      assert.equal(result.compatible, false);
      assert.match(result.differences.join('\n'), /module/);
    });
  });
});

test('rejects public declaration path and symbol drift', async () => {
  const changedDeclarations = {
    'index.d.ts': "export { RenamedThing } from './lib/renamed-thing';\n",
    'lib/renamed-thing.d.ts': 'export declare class RenamedThing {}\n',
  };

  await withPackage(baseManifest, declarations, async (baselineDirectory) => {
    await withPackage(baseManifest, changedDeclarations, async (candidateDirectory) => {
      const result = comparePackageSurfaces(
        await createPackageSurface(baselineDirectory),
        await createPackageSurface(candidateDirectory),
      );
      assert.equal(result.compatible, false);
      assert.match(result.differences.join('\n'), /declaration inventory/);
    });
  });
});

test('rejects unrelated manifest metadata drift', async () => {
  const candidateManifest = { ...baseManifest, sideEffects: true };

  await withPackage(baseManifest, declarations, async (baselineDirectory) => {
    await withPackage(candidateManifest, declarations, async (candidateDirectory) => {
      const result = comparePackageSurfaces(
        await createPackageSurface(baselineDirectory),
        await createPackageSurface(candidateDirectory),
      );
      assert.equal(result.compatible, false);
      assert.match(result.differences.join('\n'), /manifest metadata/);
    });
  });
});
