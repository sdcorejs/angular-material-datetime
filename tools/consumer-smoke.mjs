import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const workspace = mkdtempSync(join(tmpdir(), 'sd-datetime-consumer-'));
const npmCli = process.env.npm_execpath;
const requestedMajor = process.argv.find((argument) => argument.startsWith('--angular='))?.split('=')[1];
const angularMajors = requestedMajor ? [Number(requestedMajor)] : [19, 20, 21];

if (angularMajors.some((major) => ![19, 20, 21].includes(major))) {
  throw new Error('Use --angular=19, --angular=20, or --angular=21.');
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
  const angularRange = `^${angularMajor}.0.0`;
  const typescriptRange = angularMajor === 19 ? '~5.8.2' : '~5.9.2';

  write(consumer, 'package.json', JSON.stringify({
    private: true,
    scripts: { build: 'ng build' },
    dependencies: {
      '@angular/animations': angularRange,
      '@angular/cdk': angularRange,
      '@angular/common': angularRange,
      '@angular/compiler': angularRange,
      '@angular/core': angularRange,
      '@angular/forms': angularRange,
      '@angular/material': angularRange,
      '@angular/platform-browser': angularRange,
      '@sdcorejs/angular-material-datetime': `file:${tarball.replaceAll('\\', '/')}`,
      rxjs: '^7.8.0',
      tslib: '^2.8.0',
      'zone.js': '^0.15.0',
    },
    devDependencies: {
      '@angular-devkit/build-angular': angularRange,
      '@angular/cli': angularRange,
      '@angular/compiler-cli': angularRange,
      typescript: typescriptRange,
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

try {
  const packOutput = runNpm(
    ['pack', join(root, 'dist', 'datetime'), '--pack-destination', workspace],
    { cwd: root, encoding: 'utf8' },
  ).trim().split(/\r?\n/);
  const tarball = join(workspace, packOutput.at(-1));

  for (const angularMajor of angularMajors) {
    const consumer = join(workspace, `consumer-angular-${angularMajor}`);
    mkdirSync(consumer, { recursive: true });
    createConsumer(consumer, angularMajor, tarball);

    console.log(`\nVerifying Angular ${angularMajor} consumer...`);
    runNpm(['install', '--no-audit', '--no-fund'], { cwd: consumer, stdio: 'inherit' });

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
