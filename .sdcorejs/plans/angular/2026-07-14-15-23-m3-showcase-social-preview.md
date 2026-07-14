---
name: m3-showcase-social-preview
description: Approved execution plan for the M3-only library styling, professional showcase, and social metadata delivery.
approvedAt: 2026-07-14T15:23:36.6815487+07:00
approvedBy: tran.thuan.nghia@gmail.com
track: angular
sourceSpecPath: .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
taskCount: 18
phaseCount: 5
target_root_kind: target-project
stack_profile: plain-angular
approved_spec_hash: d784b6b574f7cc2b2033b6264caa7c32f6abf23445cb60ed08ebee390b8e51d8
allowed_paths:
  - projects/datetime/src/lib/datetime-picker/datetime-picker.component.scss
  - projects/datetime/src/lib/datetime-picker/datetime-picker-actions.component.ts
  - projects/datetime/src/lib/time-spinner/time-spinner.component.scss
  - projects/demo/src/**
  - projects/demo/public/**
  - README.md
  - package.json
  - projects/datetime/package.json
  - projects/moment-adapter/package.json
  - projects/date-fns-adapter/package.json
  - .sdcorejs/**
prohibited_paths:
  - package-lock.json
  - node_modules/**
  - dist/**
  - coverage/**
  - .git/**
  - .github/workflows/**
dependency_changes:
  required: false
  approval_required: false
env_changes:
  required: false
  approval_required: false
migration_changes:
  required: true
  approval_required: false
approved_plan_hash: bca44f7ee1ec346a256ec8983fb84230ee7fe1fe6c66c4c333a1270dfe53008e
supersedes: null
change_control:
  revision: 1
  supersedes: null
  change_reason: null
---

# M3-only showcase and social preview - Approved Plan

> Snapshot of what the user approved at the `sdcorejs-plan` gate. Do not edit by hand; re-author through `sdcorejs-plan` if the contract changes.

## Approved contract

# Plan - M3-only showcase and social preview - 2026-07-14 15:12

## Scope

Migrate the public styling/documentation contract from Material 2-compatible fallbacks to Material 3-only tokens, refresh the Angular showcase into a coherent professional M3 product page, and add static author/SEO/social-preview metadata suitable for GitHub Pages, Messenger, and Zalo. Preserve picker behavior and the existing pending action-row alignment change.

## Execution context

- Track: Angular
- Target root kind: `target-project`
- Stack profile: `plain-angular`
- Coverage approach: post-hoc for visual/content changes
- Parallel candidates: yes; library-token migration, showcase styling, and metadata/docs are separable until final integration, but shared showcase files remain parent-owned

```yaml
plan_context:
  source: sdcorejs-plan
  contract_id: angular-material-datetime-m3-showcase-20260714
  requirement_id: req-m3-showcase-social-preview-20260714
  approved_spec_path: .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
  approved_spec_hash: d784b6b574f7cc2b2033b6264caa7c32f6abf23445cb60ed08ebee390b8e51d8
  approved_plan_path: .sdcorejs/plans/angular/2026-07-14-15-23-m3-showcase-social-preview.md
  approved_plan_hash: bca44f7ee1ec346a256ec8983fb84230ee7fe1fe6c66c4c333a1270dfe53008e
  supersedes: null
  target_root: C:/Users/nghiatt15_onemount/Documents/sdcorejs/angular-material-datetime
  target_root_kind: target-project
  track: angular
  stack_profile: plain-angular
  task_count: 18
  phase_count: 5
  allowed_paths:
    - projects/datetime/src/lib/datetime-picker/datetime-picker.component.scss
    - projects/datetime/src/lib/datetime-picker/datetime-picker-actions.component.ts
    - projects/datetime/src/lib/time-spinner/time-spinner.component.scss
    - projects/demo/src/index.html
    - projects/demo/src/styles.scss
    - projects/demo/src/app/code-block.component.ts
    - projects/demo/src/app/sections/nav.component.ts
    - projects/demo/src/app/sections/hero.component.ts
    - projects/demo/src/app/sections/examples.component.ts
    - projects/demo/src/app/sections/api-reference.component.ts
    - projects/demo/src/app/sections/theming.component.ts
    - projects/demo/src/app/sections/footer.component.ts
    - projects/demo/public/brand/logo.png
    - projects/demo/public/brand/logo-text.png
    - projects/demo/public/og-image.png
    - README.md
    - package.json
    - projects/datetime/package.json
    - projects/moment-adapter/package.json
    - projects/date-fns-adapter/package.json
    - .sdcorejs/docs/angular/*m3-showcase-social-preview*.md
    - .sdcorejs/specs/angular/*m3-showcase-social-preview*.md
    - .sdcorejs/plans/angular/*m3-showcase-social-preview*.md
  prohibited_paths:
    - package-lock.json
    - node_modules/**
    - dist/**
    - coverage/**
    - .git/**
    - projects/datetime/src/public-api.ts
    - projects/datetime/src/lib/**/*.spec.ts
    - .github/workflows/**
  generated_artifacts:
    - dist/**
    - coverage/**
  docs_artifacts:
    - README.md
    - .sdcorejs/docs/angular/2026-07-14-15-04-m3-showcase-social-preview-spec.md
    - .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
    - .sdcorejs/docs/angular/2026-07-14-15-12-m3-showcase-social-preview-plan.md
    - .sdcorejs/plans/angular/*m3-showcase-social-preview*.md
  dependency_changes:
    required: false
    packages: []
    approval_required: false
  package_metadata_changes:
    required: true
    manifests:
      - package.json
      - projects/datetime/package.json
      - projects/moment-adapter/package.json
      - projects/date-fns-adapter/package.json
    scope: author, description, homepage, and M3-focused keywords only; no dependency or version changes
    approval_source: approved spec AC-015
  env_changes:
    required: false
    files: []
    approval_required: false
  migration_changes:
    required: true
    description: Remove Material 2 styling fallbacks and public compatibility claims; retain TypeScript API behavior.
    approval_required: false
  verification_strategy:
    package_manager: npm
    scripts_detected:
      - name: test
      - name: lint
      - name: build:all
      - name: ng
    commands_planned:
      - command_or_script: npm test -- --runInBand
        reason: run the existing complete Jest regression suite
      - command_or_script: npm run lint
        reason: validate all Angular workspace source and templates
      - command_or_script: npm run build:all
        reason: prove all three published packages compile
      - command_or_script: npm run ng -- build demo --base-href /angular-material-datetime/
        reason: reproduce the GitHub Pages production build without downloading tools
      - command_or_script: repository text and built-artifact metadata probes with rg/PowerShell
        reason: prove M2 claims are gone and static metadata/assets resolve
    commands_skipped:
      - command_or_probe: live Messenger/Zalo crawler validation before deployment
        reason: requires the updated public GitHub Pages URL and platform cache refresh after merge/deploy
    focused_checks:
      - verify no user-facing M2/legacy theme references remain in README or demo source
      - verify no `--mat-sys-*` declaration retains a neutral fallback value
      - verify Open Graph/Twitter/canonical/author fields are static and use absolute production URLs
      - verify `og-image.png` is 1200x630 and visually preserves the SDCoreJS brand
      - verify final diff preserves the pre-existing action-alignment change
    broad_checks:
      - complete Jest suite
      - workspace lint
      - all library builds
      - production demo build with Pages base href
      - responsive/manual accessibility smoke check
  parallel_candidates:
    allowed: true
    units:
      - id: m3-library
        title: M3-only public library styles
        allowed_paths:
          - projects/datetime/src/lib/datetime-picker/datetime-picker.component.scss
          - projects/datetime/src/lib/datetime-picker/datetime-picker-actions.component.ts
          - projects/datetime/src/lib/time-spinner/time-spinner.component.scss
        dependencies: []
      - id: showcase-ui
        title: Professional M3 showcase refresh
        allowed_paths:
          - projects/demo/src/styles.scss
          - projects/demo/src/app/code-block.component.ts
          - projects/demo/src/app/sections/*.component.ts
        dependencies: []
      - id: metadata-docs
        title: Social metadata, author manifests, and README migration
        allowed_paths:
          - projects/demo/src/index.html
          - projects/demo/public/og-image.png
          - README.md
          - package.json
          - projects/*/package.json
        dependencies: []
    shared_files:
      - path: projects/demo/src/index.html
        coordination_strategy: parent-owned
      - path: projects/demo/src/styles.scss
        coordination_strategy: parent-owned
      - path: README.md
        coordination_strategy: sequential
      - path: package.json and projects/*/package.json
        coordination_strategy: sequential
    conflict_risks:
      - showcase section components contain large inline style blocks and must not be edited by multiple units
      - action component already contains an approved one-line alignment change that must be preserved
      - social image generation and index metadata must agree on the final filename and dimensions
  finish_tail:
    docs_before_final_branch_ready: true
    branch_ready_final_gate: true
  approval:
    approved: true
    approved_at: 2026-07-14T15:23:36.6815487+07:00
  change_control:
    revision: 1
    supersedes: null
    change_reason: null
```

## Tasks

### Phase 1 - Preflight and M3-only library contract

1. VERIFY working tree and approved scope - record branch, HEAD, staged/unstaged/untracked state, preserve the existing action-alignment diff, and stop on unrelated dirty-file conflicts.
2. EDIT `projects/datetime/src/lib/datetime-picker/datetime-picker.component.scss` - replace neutral fallback expressions with direct M3 system-token usage for panel surfaces and dividers.
3. EDIT `projects/datetime/src/lib/datetime-picker/datetime-picker-actions.component.ts` - preserve `justify-content: flex-end` and make the action divider M3-token-only.
4. EDIT `projects/datetime/src/lib/time-spinner/time-spinner.component.scss` - remove legacy primary/on-surface fallback colors and consume M3 system tokens directly.

### Phase 2 - Professional M3 showcase

5. EDIT `projects/demo/src/styles.scss` - establish the global M3 showcase foundation, typography, page background, selection/focus treatment, responsive defaults, and reduced-motion behavior using Material system tokens.
6. EDIT `projects/demo/src/app/sections/nav.component.ts` - create a polished responsive product navigation with SDCoreJS branding, clear anchors, GitHub action, keyboard focus, and mobile-safe behavior.
7. EDIT `projects/demo/src/app/sections/hero.component.ts` - strengthen the product proposition, state M3-only support, improve package/install actions, and add a professional product-summary visual hierarchy.
8. EDIT `projects/demo/src/app/code-block.component.ts` - align code surfaces, copy controls, focus states, and responsive overflow with the M3 showcase language without changing code-copy behavior.
9. EDIT `projects/demo/src/app/sections/examples.component.ts` and `projects/demo/src/app/sections/api-reference.component.ts` - harmonize section headers, cards, tables, spacing, surfaces, and responsive overflow while preserving every example and API entry.
10. EDIT `projects/demo/src/app/sections/theming.component.ts` - replace the M2/M3 comparison and M2 override snippet with M3-only setup, system-token reference, customization guidance, and dark-theme compatibility notes.
11. EDIT `projects/demo/src/app/sections/footer.component.ts` - present SDCoreJS brand, Tráº§n Thuáº­n NghÄ©a, public email, license, package links, and implementation stack in an accessible responsive footer.

### Phase 3 - Favicon, social artwork, and crawler metadata

12. CREATE `projects/demo/public/og-image.png` - use the image-generation workflow with `brand/logo.png`/`brand/logo-text.png` as references to produce a brand-faithful 1200Ã—630 social card; visually inspect the result and reject altered logo geometry/lettering.
13. EDIT `projects/demo/src/index.html` - point favicon/apple-touch icon to the SDCoreJS logo and add the approved title, description, canonical URL, author/email, theme color, Open Graph, Twitter Card, and SoftwareApplication JSON-LD metadata with absolute GitHub Pages URLs.

### Phase 4 - Public documentation and package identity

14. EDIT `README.md` - remove Material 2/hybrid/fallback claims, state M3-only support, provide the M3 setup contract, and explain the compatibility migration without changing installation/API guidance unnecessarily.
15. EDIT `package.json`, `projects/datetime/package.json`, `projects/moment-adapter/package.json`, and `projects/date-fns-adapter/package.json` - add consistent author name/email/URL metadata; refine descriptions/homepage/keywords only where needed, with no version, dependency, or lockfile changes.

### Phase 5 - Verification, review, and final hygiene

16. VERIFY focused contracts - scan source/docs for remaining M2 claims and token fallbacks; validate metadata completeness and absolute URLs; inspect social-image dimensions and branding; confirm package metadata consistency.
17. VERIFY automated regression surface - run `npm test -- --runInBand`, `npm run lint`, `npm run build:all`, and `npm run ng -- build demo --base-href /angular-material-datetime/`; inspect the built index and copied social asset without committing `dist/**`.
18. VERIFY finish tail - perform read-only code/visual/accessibility review, repair verified findings if any, update only approved documentation artifacts before the final check, then run verify-before-done and branch-ready as the last read-only gate; do not write files after branch-ready.

## Acceptance mapping

- AC-001 -> tasks 10, 14, 16
- AC-002 -> tasks 2, 3, 4, 16
- AC-003 -> tasks 5, 16, 17
- AC-004 -> tasks 10, 16
- AC-005 -> tasks 14, 16
- AC-006 -> tasks 5, 6, 7, 8, 9, 10, 11, 17, 18
- AC-007 -> tasks 6, 7, 9, 10, 11, 18
- AC-008 -> tasks 5, 6, 7, 8, 9, 10, 11, 18
- AC-009 -> tasks 12, 13, 17
- AC-010 -> tasks 13, 16, 17
- AC-011 -> tasks 12, 13, 16, 17
- AC-012 -> tasks 12, 13, 16
- AC-013 -> tasks 12, 16
- AC-014 -> tasks 13, 17, 18
- AC-015 -> tasks 11, 13, 15, 16
- AC-016 -> tasks 17
- AC-017 -> tasks 1, 16, 17, 18

## Verification

- `npm test -- --runInBand`
- `npm run lint`
- `npm run build:all`
- `npm run ng -- build demo --base-href /angular-material-datetime/`
- Focused repository scans for M2/legacy claims, M3 token fallbacks, author consistency, absolute social URLs, debug/focused-test markers, and unexpected generated files.
- Inspect `projects/demo/public/og-image.png` at original resolution and verify 1200Ã—630 dimensions.
- Inspect `dist/demo/browser/index.html` and `dist/demo/browser/og-image.png` after the production build.
- Manual: check desktop/tablet/mobile layout, keyboard focus, table overflow, and all primary links.
- Manual after deployment: request a fresh crawl of `https://sdcorejs.github.io/angular-material-datetime/` and confirm image/title/description in an Open Graph debugger plus Messenger/Zalo-compatible preview.


## Decisions captured during review

- Approved as drafted.
- Package manifests may change metadata only; versions, dependencies, and lockfile remain prohibited.
- The pre-existing action-row alignment change must remain intact.

## Skill provenance

sdcorejs-plan (approved on attempt 1 / 3)
