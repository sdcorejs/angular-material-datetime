---
feature: m3-showcase-social-preview
status: partial
tracks: [angular, test]
sourceSpecPath: .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
sourcePlanPath: .sdcorejs/plans/angular/2026-07-14-15-23-m3-showcase-social-preview.md
prdPath: product/prds/m3-showcase-social-preview.md
userStoriesPath: product/user-stories/m3-showcase-social-preview.md
acceptanceCriteriaPath: product/acceptance-criteria/m3-showcase-social-preview.md
uatChecklistPath: product/uat-checklists/m3-showcase-social-preview.md
updatedAt: 2026-07-14T21:23:59.1650414+07:00
---

# Product Feature Ledger - M3 Showcase và Social Preview

## Business Goal

Giúp Angular developer đánh giá package qua showcase M3 chuyên nghiệp và giúp link GitHub Pages tạo nhận diện rõ ràng khi được chia sẻ.

## Users And Scenarios

- Angular developer thử picker, xem examples/API/theming và đi tới package source.
- Người dùng mobile/bàn phím điều hướng không bị kẹt hoặc tràn layout.
- Người nhận link nhận được SDCoreJS social preview có đủ image/title/description.
- Maintainer có requirement-to-test trace và release gate rõ ràng.

## Requirement Contract

| ID | Requirement | Priority | Source | Status |
|---|---|---|---|---|
| AC-001–AC-006 | M3-only product presentation và full showcase content | Must | approved spec | agreed |
| AC-007–AC-008 | Responsive và accessible | Must | approved spec | agreed |
| AC-009–AC-014 | Brand metadata và social preview | Must | approved spec | agreed |
| AC-015–AC-017 | Author consistency và delivery gates | Must | approved spec | agreed |

## Implementation Map

| AC | Backend | Frontend | Other | Status |
|---|---|---|---|---|
| AC-001 | n/a | `projects/demo/src/app/sections/theming.component.ts` | `README.md` | done |
| AC-002 | n/a | picker/time-spinner SCSS | n/a | done |
| AC-003 | n/a | `projects/demo/src/styles.scss` | n/a | done |
| AC-004 | n/a | `theming.component.ts` | n/a | done |
| AC-005 | n/a | n/a | `README.md` | done |
| AC-006 | n/a | `projects/demo/src/app/sections/*.component.ts` | `projects/demo/src/styles.scss` | done |
| AC-007 | n/a | responsive component/global styles | design wireframes/previews | done |
| AC-008 | n/a | navigation/example/API semantics and focus styles | n/a | done |
| AC-009 | n/a | `projects/demo/src/index.html` | `projects/demo/public/brand/logo.png` | done |
| AC-010 | n/a | `projects/demo/src/index.html` | n/a | done |
| AC-011 | n/a | `projects/demo/src/index.html` | n/a | done |
| AC-012 | n/a | `projects/demo/src/index.html` | n/a | done |
| AC-013 | n/a | n/a | `projects/demo/public/og-image.png` | done |
| AC-014 | n/a | static metadata | GitHub Pages/crawler cache | partial |
| AC-015 | n/a | footer | root và package manifests | done |
| AC-016 | n/a | n/a | npm verification scripts | done |
| AC-017 | n/a | n/a | final branch-ready gate | partial |

## Test Map

| AC | Unit | Integration | E2E / UAT | Evidence | Status |
|---|---|---|---|---|---|
| AC-001 | n/a | n/a | text scan | final verification | pending gate |
| AC-002 | existing style/build coverage | production build | n/a | `npm run build:all` | done |
| AC-003 | demo tests | production build | n/a | demo build | done |
| AC-004 | `showcase-sections.component.spec.ts` | demo build | content review | focused Jest | done |
| AC-005 | n/a | n/a | README inspection | final verification | pending gate |
| AC-006 | `showcase-sections.component.spec.ts` | demo build | browser smoke | 11 focused tests + browser probe | done |
| AC-007 | n/a | production build | responsive browser UAT | desktop/mobile evidence; tablet acknowledgement pending | partial |
| AC-008 | `showcase-sections.component.spec.ts` | Angular template compile | keyboard/browser review | focused Jest/browser probe | done |
| AC-009 | n/a | Pages build | built asset inspection | final verification | pending gate |
| AC-010 | n/a | Pages build | HTML inspection | final verification | pending gate |
| AC-011 | n/a | Pages build | HTML inspection | final verification | pending gate |
| AC-012 | n/a | Pages build | HTML inspection | final verification | pending gate |
| AC-013 | n/a | public asset copy | image inspection | final verification | pending gate |
| AC-014 | n/a | n/a | production crawler re-scrape | requires deploy | partial |
| AC-015 | footer component test | manifest inspection | n/a | focused Jest + final scan | done |
| AC-016 | full Jest suite | lint/build | n/a | 149/149 tests; all project lint/build pass | done |
| AC-017 | n/a | n/a | branch-ready | final read-only gate | partial |

## UAT Checklist

| Scenario | Steps | Expected Result | Owner | Status |
|---|---|---|---|---|
| Showcase interactions | Hero, overlay, examples, menu | Behaviors match approved design | QC | pass local |
| Responsive layout | Desktop/tablet/mobile | No overflow/clip/overlap | PO/QC | pending acknowledgement |
| Social preview | Deploy and re-scrape URL | Image/title/description visible | PO/QC | pending deploy |

## Gap Review

- Requirement gaps: none.
- Implementation gaps: none for local scope; production crawler cache is external.
- Test gaps: AC-014 requires post-deploy manual evidence; AC-007 remains manual acceptance. Consumer Angular 19 produced build output during the matrix run, but the enclosing helper timed out during the long multi-version run/cleanup; Angular 20/21 were re-probed and built directly with exit 0.
- Ambiguities: none.

## Decisions

- M3-only styling/docs; TypeScript public API không đổi.
- Metadata social là HTML tĩnh và dùng URL production tuyệt đối.
- Không publish package hoặc deploy trong workflow này.

## Open Questions

- Project owner cần xác nhận responsive UAT và social preview sau lần deploy kế tiếp.

## Related Docs

- PRD: `product/prds/m3-showcase-social-preview.md`
- User stories: `product/user-stories/m3-showcase-social-preview.md`
- Acceptance criteria: `product/acceptance-criteria/m3-showcase-social-preview.md`
- UAT checklist: `product/uat-checklists/m3-showcase-social-preview.md`
- Decisions: `product/decisions/m3-showcase-social-preview.md`
- Spec: `.sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md`
- Plan: `.sdcorejs/plans/angular/2026-07-14-15-23-m3-showcase-social-preview.md`
- User guide: `.sdcorejs/documentation/user-guides/showcase.md`
- Technical doc: `.sdcorejs/documentation/technical-docs/m3-showcase.md`
