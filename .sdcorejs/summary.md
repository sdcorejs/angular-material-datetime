# Project Summary — angular-material-datetime

## Purpose

Angular workspace phát triển và giới thiệu `@sdcorejs/angular-material-datetime` cùng các adapter Moment/date-fns. Demo tĩnh được triển khai bằng GitHub Pages.

## Stack

- Angular 19 standalone application and libraries
- Angular Material/CDK 19, Material 3 Sass theming
- Jest unit/component tests
- npm với `package-lock.json`
- ng-packagr cho Angular Package Format output

## Main Areas

- `projects/datetime/` — core datetime picker package.
- `projects/moment-adapter/` — Moment adapter package.
- `projects/date-fns-adapter/` — date-fns adapter package.
- `projects/demo/` — single-page showcase và static social metadata.
- `.github/workflows/` — CI, GitHub Pages và release workflows.
- `design/`, `product/`, `.sdcorejs/` — approved design/product/implementation traceability.

## Public Showcase

- Local route: `/`
- Production URL: `https://sdcorejs.github.io/angular-material-datetime/`
- Pages base href: `/angular-material-datetime/`
- Sections: navigation, hero/live workbench, examples, API, theming, footer.
- Public author: Trần Thuận Nghĩa (`tran.thuan.nghia@gmail.com`).

## Verification Commands

```powershell
npm test -- --runInBand
npm run lint
npm run build:all
npx ng build demo --configuration production --base-href=/angular-material-datetime/
```

## Current Context

- Branch: `codex/release-1.0.3`
- Active contract: `angular-material-datetime-m3-showcase-20260714`
- Approved spec: `.sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md`
- Approved plan: `.sdcorejs/plans/angular/2026-07-14-15-23-m3-showcase-social-preview.md`
- Release publication remains manual; never run `npm publish` without explicit confirmation.
