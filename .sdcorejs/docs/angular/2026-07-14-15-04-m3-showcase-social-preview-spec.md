# Spec - M3-only showcase and social preview - 2026-07-14 15:04

```yaml
spec_context:
  source: sdcorejs-spec
  contract_id: angular-material-datetime-m3-showcase-20260714
  requirement_id: req-m3-showcase-social-preview-20260714
  approved_spec_path: .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
  approved_spec_hash: d784b6b574f7cc2b2033b6264caa7c32f6abf23445cb60ed08ebee390b8e51d8
  supersedes: null
  target_root: C:/Users/nghiatt15_onemount/Documents/sdcorejs/angular-material-datetime
  target_root_kind: target-project
  track: angular
  stack_profile: plain-angular
  profile_confidence: high
  source_requirement_context: confirmed in conversation on 2026-07-14
  acceptance_criteria_count: 17
  manual_criteria_count: 2
  non_goals:
    - Change the datetime picker public TypeScript API or date adapter behavior
    - Add a custom domain, analytics, SSR, or dynamic metadata service
    - Add a dark-mode toggle or redesign the SDCoreJS logo
    - Upgrade Angular, Angular Material, or other dependencies
  risks:
    - Removing M2 fallbacks is a deliberate styling compatibility break for M2 consumers
    - Social preview caches may delay visible metadata changes after deployment
    - A visual refresh can regress mobile layout if not checked at representative widths
  assumptions:
    - Public showcase URL is https://sdcorejs.github.io/angular-material-datetime/
    - Public author is Trần Thuận Nghĩa with tran.thuan.nghia@gmail.com and https://github.com/sdcorejs
    - Existing SDCoreJS logo assets remain the source of truth for favicon and social artwork
    - UI/content coverage is post-hoc, with existing automated tests plus build/lint and manual visual checks
  redaction_applied: false
  approval:
    approved: true
    approved_at: 2026-07-14T15:12:19.8238862+07:00
    approval_source: explicit-user-choice
  change_control:
    revision: 1
    supersedes: null
    change_reason: null
```

## Problem & Goals

The library currently presents itself as “Material 3-ready” while documenting and styling a Material 2 legacy fallback path. The showcase also uses a mixed hard-coded visual language and only minimal page metadata, so the deployed GitHub Pages link does not consistently communicate a polished product identity or produce a rich preview in Messenger and Zalo.

The goal is to make the package and showcase explicitly Material 3-only, give the demo a coherent professional M3 presentation, use the SDCoreJS brand consistently, expose clear author information, and provide crawler-readable metadata with a branded social card.

## Non-goals

- Do not change picker inputs, outputs, directives, selection behavior, adapters, or overlay behavior.
- Do not add runtime SEO libraries, SSR, prerendering, analytics, a CMS, or a custom domain.
- Do not redesign or reinterpret the SDCoreJS logo; reuse the supplied brand assets.
- Do not add a theme switcher or introduce a second theme in this scope.
- Do not upgrade dependencies or change package compatibility ranges.

## Architecture

The target is a plain Angular 19 workspace with standalone demo components and Angular Material 19. The demo continues to deploy as a static GitHub Pages application under `/angular-material-datetime/`.

Material styling will use `mat.theme(...)` and `--mat-sys-*` system tokens only. Neutral fallback values that existed for M2 consumers will be removed from the library styles, and all M2/legacy setup guidance will be removed from the showcase and README. This is a deliberate styling-contract migration; no TypeScript public API changes are included.

The showcase refresh will establish one M3 visual system across navigation, hero, examples, API reference, theming, code blocks, and footer: system-token colors, expressive but restrained surfaces, consistent radii/elevation/spacing, strong information hierarchy, visible focus states, and responsive behavior. Existing examples and API content remain available and functional.

Social metadata must be static in `projects/demo/src/index.html` because Messenger, Zalo, and other link crawlers may not execute Angular. The document will include a clear title and description, canonical URL, author metadata, Open Graph fields, Twitter card fields, theme color, favicon/apple-touch icon links, and SoftwareApplication JSON-LD. Open Graph URLs must be absolute and point to the deployed GitHub Pages location.

The social artwork will be a 1200×630 PNG under the demo public assets, use the existing SDCoreJS logo without redesign, and communicate the package name plus its M3 datetime-picker value proposition. The same image will be used by Open Graph and Twitter metadata.

Author identity is public and explicit:

- Name: Trần Thuận Nghĩa
- Email: `tran.thuan.nghia@gmail.com`
- URL/brand profile: `https://github.com/sdcorejs`

## Stack profile and technology assumptions

- Track: Angular
- Stack profile: `plain-angular`
- Profile evidence: `angular.json`, Angular 19 dependencies, standalone demo components, Angular Material theme configuration, and absence of `@sdcorejs/angular`/`@sd-angular/core`.
- Package manager: npm, evidenced by `package-lock.json` and Angular CLI configuration.
- Hosting: GitHub Pages workflow builds the demo with base href `/angular-material-datetime/`.
- Styling: Angular Material 3 Sass API plus Material system CSS tokens.
- Coverage approach: post-hoc for visual/content work; retain and run current Jest suite, lint, library build, demo production build, and manual responsive/social checks.

## File structure

- `projects/datetime/src/lib/datetime-picker/datetime-picker.component.scss` - remove M2-oriented token fallback values.
- `projects/datetime/src/lib/datetime-picker/datetime-picker-actions.component.ts` - retain the pending action-alignment change and make its divider token M3-only.
- `projects/datetime/src/lib/time-spinner/time-spinner.component.scss` - use pure M3 color tokens.
- `projects/demo/src/styles.scss` - define the M3-only global showcase foundation and page-level behavior.
- `projects/demo/src/index.html` - add title, description, author, favicon, canonical, Open Graph, Twitter, theme, and JSON-LD metadata.
- `projects/demo/src/app/code-block.component.ts` - align code presentation with the refreshed M3 visual system where needed.
- `projects/demo/src/app/sections/nav.component.ts` - professional responsive product navigation and SDCoreJS brand treatment.
- `projects/demo/src/app/sections/hero.component.ts` - stronger product message, M3-only positioning, package actions, and visual hierarchy.
- `projects/demo/src/app/sections/examples.component.ts` - harmonize example cards and responsive spacing without removing examples.
- `projects/demo/src/app/sections/api-reference.component.ts` - harmonize API tables/cards and mobile overflow behavior.
- `projects/demo/src/app/sections/theming.component.ts` - replace M2/M3 comparison with concise M3-only setup, tokens, and customization guidance.
- `projects/demo/src/app/sections/footer.component.ts` - display author identity, public email, license, repository, package, and technology information.
- `projects/demo/public/brand/logo.png` and `projects/demo/public/brand/logo-text.png` - reuse as immutable source brand assets.
- `projects/demo/public/og-image.png` - create the 1200×630 social preview card.
- `README.md` - remove M2 compatibility claims and document M3-only theming and migration expectations.
- `package.json` - add consistent private-workspace author metadata.
- `projects/datetime/package.json` - add published-package author metadata and M3-focused description/keywords.
- `projects/moment-adapter/package.json` - add the same author identity.
- `projects/date-fns-adapter/package.json` - add the same author identity.

## Acceptance criteria

- AC-001 - A repository search across source and README finds no user-facing Material 2, M2, hybrid M2+M3, or legacy-theme support claim; unrelated compiler “legacy message ID” configuration is unchanged.
- AC-002 - Picker and time-spinner styles consume `--mat-sys-*` tokens without neutral M2 fallback values.
- AC-003 - The demo theme is configured only through the Angular Material 3 `mat.theme(...)` API.
- AC-004 - The Theming section documents only M3 setup, system tokens, customization, and dark-theme compatibility; no M2 comparison card or override snippet remains.
- AC-005 - The README clearly identifies the library as Material 3-only and explains the styling compatibility change for consumers migrating from M2.
- AC-006 - Navigation, hero, example cards, API reference, theming content, code blocks, and footer share a coherent M3 visual language and preserve all existing showcase content and interactions.
- AC-007 (manual) - At desktop, tablet, and mobile widths, the showcase has no unintended horizontal page overflow, clipped primary controls, unreadable tables, or overlapping navigation.
- AC-008 - Keyboard focus is visibly styled for interactive elements; meaningful images have alt text; decorative graphics are hidden from assistive technology where appropriate; heading order remains logical.
- AC-009 - The browser favicon and apple-touch icon resolve to the supplied SDCoreJS logo asset under both local `/` and deployed `/angular-material-datetime/` base hrefs.
- AC-010 - The HTML document contains a concise unique title, a clear product description, canonical URL, theme color, and public author name/email.
- AC-011 - Static Open Graph metadata includes `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, image dimensions, and image alt text; canonical and image URLs are absolute GitHub Pages URLs.
- AC-012 - Static Twitter metadata uses `summary_large_image` and mirrors the approved title, description, and image without claiming an unconfirmed Twitter handle.
- AC-013 - `projects/demo/public/og-image.png` is exactly 1200×630, uses the existing SDCoreJS brand mark, remains legible at preview size, and names Angular Material Datetime plus its M3 positioning.
- AC-014 (manual) - After GitHub Pages deployment and cache refresh, the public URL produces a preview with image, title, and description in a standards-based Open Graph debugger and can be re-scraped by Messenger/Zalo-compatible crawlers.
- AC-015 - Footer, root package metadata, and all three published package manifests identify Trần Thuận Nghĩa, `tran.thuan.nghia@gmail.com`, and `https://github.com/sdcorejs` consistently.
- AC-016 - `npm test -- --runInBand`, `npm run lint`, `npm run build:all`, and the demo production build used by the Pages workflow complete successfully.
- AC-017 - Final tracked changes contain no generated `dist` output, temporary design files, debug statements, focused tests, credentials, or unrelated modifications; the pre-existing one-line action-alignment change remains intact.

## Risks & mitigations

- **Risk:** Existing M2 consumers lose neutral visual fallbacks. -> **Mitigation:** State M3-only support prominently in README/Theming and avoid unrelated API changes.
- **Risk:** Social preview image or URLs work locally but fail under the Pages subpath. -> **Mitigation:** use absolute production URLs in crawler metadata and verify the built artifact contains the public image.
- **Risk:** Zalo or Messenger shows stale metadata. -> **Mitigation:** validate standards metadata first, then use platform re-scrape/cache-refresh tools after deployment; do not treat cache delay as an application failure.
- **Risk:** Large inline component styles become inconsistent. -> **Mitigation:** anchor all refreshed styles to the same M3 system tokens and shared spacing/surface conventions, while keeping component ownership unchanged.
- **Risk:** A generated social asset alters the logo. -> **Mitigation:** use the existing logo file as the reference asset and reject any result that changes its shape, colors, or lettering.
- **Risk:** Mobile polish regresses in table-heavy sections. -> **Mitigation:** retain deliberate horizontal table scrolling and perform manual checks at representative breakpoints.

## Out of scope (deferred)

- Custom domain and domain-level SEO configuration - defer until a production domain is selected.
- SSR/prerendering - defer unless future routes need dynamic metadata or search indexing beyond a static showcase.
- Analytics, consent, and conversion tracking - defer until tracking requirements are explicitly approved.
- Dark-mode toggle - defer to a separate UX requirement; this scope only keeps the code M3-token compatible.
- Release/version bump/changelog publication - defer until the implementation has passed review and the user requests a release workflow.
