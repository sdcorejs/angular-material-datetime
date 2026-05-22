// @ts-check
const angularEslint = require('angular-eslint');
const tsEslint = require('typescript-eslint');
const eslint = require('@eslint/js');

/**
 * Strict ESLint rules applied to the three library projects.
 * The demo app intentionally uses the `app` prefix so it is excluded from
 * the component/directive selector rules.
 */
module.exports = tsEslint.config(
  // ── Global ignores ────────────────────────────────────────────────────────
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '**/*.d.ts',
    ],
  },

  // ── Library projects: TypeScript files ────────────────────────────────────
  {
    files: [
      'projects/datetime/**/*.ts',
      'projects/moment-adapter/**/*.ts',
      'projects/date-fns-adapter/**/*.ts',
    ],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...angularEslint.configs.tsRecommended,
    ],
    processor: angularEslint.processInlineTemplates,
    rules: {
      // Angular selector conventions for the `sd` library prefix
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'sd', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'sd', style: 'camelCase' },
      ],
      // Explicit access modifiers on all class members (constructors excluded)
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
      ],
      // Allow empty exports in stub public-api.ts files
      '@typescript-eslint/no-empty-object-type': 'off',
      // Follow Angular Material naming convention: class names need not end
      // with "Component" — e.g. SdTimeSpinner, SdDatepicker are acceptable
      '@angular-eslint/component-class-suffix': [
        'error',
        { suffixes: ['Component', 'Spinner', 'Picker', 'Panel', 'Dialog', 'Header', 'Footer', 'Actions'] },
      ],
      // Allow directive class names without "Directive" suffix, following
      // Angular Material convention (e.g. MatSort, MatRipple, SdDatetimePickerApply)
      '@angular-eslint/directive-class-suffix': [
        'error',
        { suffixes: ['Directive', 'Apply', 'Cancel', 'Clear', 'Toggle'] },
      ],
    },
  },

  // ── Library spec files: relax class-name suffix rules for host fixtures ──────
  {
    files: [
      'projects/datetime/**/*.spec.ts',
      'projects/moment-adapter/**/*.spec.ts',
      'projects/date-fns-adapter/**/*.spec.ts',
    ],
    rules: {
      // Host component fixture classes in specs (e.g. HostCmp) need not
      // match the library class-suffix conventions
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
    },
  },

  // ── Library projects: HTML templates ──────────────────────────────────────
  {
    files: [
      'projects/datetime/**/*.html',
      'projects/moment-adapter/**/*.html',
      'projects/date-fns-adapter/**/*.html',
    ],
    extends: [...angularEslint.configs.templateRecommended],
    rules: {},
  },

  // ── Demo application: TypeScript files (relaxed rules) ────────────────────
  {
    files: ['projects/demo/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...angularEslint.configs.tsRecommended,
    ],
    processor: angularEslint.processInlineTemplates,
    rules: {
      // Demo uses the `app` prefix — do not enforce `sd`
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
    },
  },

  // ── Demo application: HTML templates (relaxed rules) ──────────────────────
  {
    files: ['projects/demo/**/*.html'],
    extends: [...angularEslint.configs.templateRecommended],
    rules: {},
  },
);
