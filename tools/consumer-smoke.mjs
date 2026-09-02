import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const REQUIRED_NODE_VERSION = 'v22.22.3';
const ANGULAR_PROFILES = {
  19: {
    framework: '~19.2.25',
    material: '~19.2.19',
    tooling: '~19.2.27',
    typescript: '~5.8.3',
    zone: '~0.15.1',
  },
  20: {
    framework: '~20.3.30',
    material: '~20.2.14',
    tooling: '~20.3.35',
    typescript: '~5.8.3',
    zone: '~0.15.1',
  },
  21: {
    framework: '~21.2.22',
    material: '~21.2.14',
    tooling: '~21.2.22',
    typescript: '~5.9.3',
    zone: '~0.15.1',
  },
  22: {
    framework: '~22.1.4',
    material: '~22.1.4',
    tooling: '~22.1.6',
    typescript: '~6.0.3',
    zone: '~0.16.2',
  },
};

if (process.version !== REQUIRED_NODE_VERSION) {
  throw new Error(`Consumer verification requires Node ${REQUIRED_NODE_VERSION}; received ${process.version}.`);
}

const root = resolve(import.meta.dirname, '..');
const workspace = mkdtempSync(join(tmpdir(), 'sd-datetime-consumer-'));
const npmCli = process.env.npm_execpath;
const requestedMajor = readOption('--angular');
const requestedTarball = readOption('--tarball');
const angularMajors = requestedMajor ? [Number(requestedMajor)] : Object.keys(ANGULAR_PROFILES).map(Number);

if (angularMajors.some((major) => !ANGULAR_PROFILES[major])) {
  throw new Error('Use --angular=19, --angular=20, --angular=21, or --angular=22.');
}

function readOption(name) {
  const equalsArgument = process.argv.find((argument) => argument.startsWith(`${name}=`));
  if (equalsArgument) {
    return equalsArgument.slice(name.length + 1);
  }

  const optionIndex = process.argv.indexOf(name);
  return optionIndex === -1 ? undefined : process.argv[optionIndex + 1];
}

function runNpm(args, options = {}) {
  if (npmCli) {
    return execFileSync(process.execPath, [npmCli, ...args], options);
  }
  return execFileSync('npm', args, options);
}

function write(consumer, relativePath, content) {
  const target = join(consumer, relativePath);
  mkdirSync(resolve(target, '..'), { recursive: true });
  writeFileSync(target, content);
}

function createConsumer(consumer, angularMajor, tarball) {
  const profile = ANGULAR_PROFILES[angularMajor];

  write(consumer, 'package.json', JSON.stringify({
    private: true,
    scripts: { build: 'ng build' },
    dependencies: {
      '@angular/animations': profile.framework,
      '@angular/cdk': profile.material,
      '@angular/common': profile.framework,
      '@angular/compiler': profile.framework,
      '@angular/core': profile.framework,
      '@angular/forms': profile.framework,
      '@angular/material': profile.material,
      '@angular/platform-browser': profile.framework,
      '@sdcorejs/angular-material-datetime': `file:${tarball.replaceAll('\\', '/')}`,
      rxjs: '~7.8.2',
      tslib: '~2.8.1',
      'zone.js': profile.zone,
    },
    devDependencies: {
      '@angular-devkit/build-angular': profile.tooling,
      '@angular/cli': profile.tooling,
      '@angular/compiler-cli': profile.framework,
      typescript: profile.typescript,
    },
  }, null, 2));
  write(consumer, 'angular.json', JSON.stringify({
    $schema: './node_modules/@angular/cli/lib/config/schema.json',
    version: 1,
    projects: {
      consumer: {
        projectType: 'application',
        root: '',
        sourceRoot: 'src',
        architect: {
          build: {
            builder: '@angular-devkit/build-angular:application',
            options: {
              outputPath: 'dist/consumer',
              browser: 'src/main.ts',
              tsConfig: 'tsconfig.app.json',
              index: 'src/index.html',
              styles: ['src/styles.scss'],
            },
          },
        },
      },
    },
  }, null, 2));
  write(consumer, 'tsconfig.json', JSON.stringify({
    compilerOptions: {
      strict: true,
      target: 'ES2022',
      module: 'preserve',
      moduleResolution: 'bundler',
      experimentalDecorators: true,
      importHelpers: true,
      skipLibCheck: false,
      lib: ['ES2022', 'dom'],
    },
    angularCompilerOptions: { strictTemplates: true },
  }, null, 2));
  write(consumer, 'tsconfig.app.json', JSON.stringify({
    extends: './tsconfig.json',
    compilerOptions: { outDir: './out-tsc/app', types: [] },
    files: ['src/main.ts'],
  }, null, 2));
  write(consumer, 'src/index.html', '<!doctype html><html><body><consumer-root></consumer-root></body></html>');
  write(consumer, 'src/styles.scss', '');
  write(consumer, 'src/main.ts', `
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  SD_DATE_FORMATS,
  SD_NATIVE_DATE_FORMATS,
  SdDateAdapter,
  SdDatetimePicker,
  SdDatetimePickerActions,
  SdDatetimePickerApply,
  SdDatetimePickerCancel,
  SdDatetimePickerNow,
  SdDatetimePickerInput,
  SdDatetimePickerToggle,
  SdNativeDateAdapter,
  provideSdNativeDateAdapter,
} from '@sdcorejs/angular-material-datetime';

const requiredPublicApi = [
  SD_DATE_FORMATS,
  SD_NATIVE_DATE_FORMATS,
  SdDateAdapter,
  SdDatetimePicker,
  SdDatetimePickerActions,
  SdDatetimePickerApply,
  SdDatetimePickerCancel,
  SdDatetimePickerNow,
  SdNativeDateAdapter,
];

if (requiredPublicApi.some((value) => value == null)) {
  throw new Error('A required public API export is missing.');
}

@Component({
  selector: 'consumer-root',
  standalone: true,
  imports: [ReactiveFormsModule, SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle],
  template: \`
    <input [sdDatetimePicker]="picker" [formControl]="value">
    <button [sdDatetimePickerToggle]="picker">Open</button>
    <sd-datetime-picker #picker [showSeconds]="true" [stepMinute]="15"></sd-datetime-picker>
  \`,
})
class ConsumerApp {
  readonly value = new FormControl<Date | null>(null);
}

bootstrapApplication(ConsumerApp, { providers: [provideSdNativeDateAdapter()] });
`);
}

function assertResolvedVersions(consumer, angularMajor) {
  const lock = JSON.parse(readFileSync(join(consumer, 'package-lock.json'), 'utf8'));
  const packageVersion = (name) => lock.packages?.[`node_modules/${name}`]?.version;
  const expectedTypescriptMajor = angularMajor === 22 ? 6 : 5;
  const expectedZoneMinor = angularMajor === 22 ? '0.16.' : '0.15.';

  for (const packageName of [
    '@angular/animations',
    '@angular/cdk',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/material',
    '@angular/platform-browser',
    '@angular/compiler-cli',
  ]) {
    const version = packageVersion(packageName);
    if (!version?.startsWith(`${angularMajor}.`)) {
      throw new Error(`Expected ${packageName} ${angularMajor}.x, received ${version ?? 'missing'}.`);
    }
  }

  const typescriptVersion = packageVersion('typescript');
  if (!typescriptVersion?.startsWith(`${expectedTypescriptMajor}.`)) {
    throw new Error(`Expected TypeScript ${expectedTypescriptMajor}.x, received ${typescriptVersion ?? 'missing'}.`);
  }

  const zoneVersion = packageVersion('zone.js');
  if (!zoneVersion?.startsWith(expectedZoneMinor)) {
    throw new Error(`Expected Zone.js ${expectedZoneMinor}x, received ${zoneVersion ?? 'missing'}.`);
  }
}

try {
  let tarball;
  if (requestedTarball) {
    tarball = resolve(requestedTarball);
    if (!existsSync(tarball) || !statSync(tarball).isFile()) {
      throw new Error(`Packed package does not exist: ${tarball}`);
    }
  } else {
    const packOutput = runNpm(
      ['pack', join(root, 'dist', 'datetime'), '--pack-destination', workspace],
      { cwd: root, encoding: 'utf8' },
    ).trim().split(/\r?\n/);
    tarball = join(workspace, packOutput.at(-1));
  }

  for (const angularMajor of angularMajors) {
    const consumer = join(workspace, `consumer-angular-${angularMajor}`);
    mkdirSync(consumer, { recursive: true });
    createConsumer(consumer, angularMajor, tarball);

    console.log(`\nVerifying Angular ${angularMajor} consumer...`);
    runNpm(['install', '--no-audit', '--no-fund'], { cwd: consumer, stdio: 'inherit' });
    assertResolvedVersions(consumer, angularMajor);

    const resolutionProbe = `
      const { createRequire } = require('node:module');
      const scopedRequire = createRequire(${JSON.stringify(join(consumer, 'package.json'))});
      const resolved = scopedRequire.resolve('@sdcorejs/angular-material-datetime');
      if (!resolved.replaceAll('\\\\', '/').includes('/fesm2022/')) {
        throw new Error('Package did not resolve to its FESM entrypoint: ' + resolved);
      }
      console.log('Resolved package entrypoint:', resolved);
    `;
    execFileSync(process.execPath, ['-e', resolutionProbe], { cwd: consumer, stdio: 'inherit' });
    runNpm(['run', 'build'], { cwd: consumer, stdio: 'inherit' });
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
