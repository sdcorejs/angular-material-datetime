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
