# Design Spec — Showcase Refresh

Status: `approved - 2026-07-14`

## Source

- User request: review and improve the showcase.
- Existing implementation: `projects/demo/src/app/sections/`.
- PRD/user stories/acceptance criteria: none; information architecture was inferred from the existing showcase and approved by the project owner on 2026-07-14.
- Decision log: `design/decisions/showcase-refresh.md`.

## Outputs

- Editable responsive wireframe: `design/wireframes/showcase-refresh/showcase.html`.
- Mobile render harness (390px iframe): `design/wireframes/showcase-refresh/mobile-preview.html`.
- Desktop preview: `design/exports/png/showcase-refresh/showcase-desktop.png`.
- Mobile preview: `design/exports/png/showcase-refresh/showcase-mobile.png`.

## Screens

| Screen | Route | Purpose | Source | Status |
| --- | --- | --- | --- | --- |
| Showcase desktop | `/` | Evaluate, install, try examples, inspect API/theme | Current showcase | Approved handoff |
| Showcase tablet | `/` | Preserve hero proof and example workflow in stacked layout | Responsive requirement | Approved handoff |
| Showcase mobile | `/` | Evaluate and navigate without horizontal overflow | Current mobile defect | Approved handoff |

## Layout

### 1. Sticky navigation

- 64px desktop, minimum 56px mobile.
- Desktop: logo/name left; `Examples`, `API`, `Theming`, GitHub right.
- Mobile: logo left; GitHub icon and menu button right. Do not render all text anchors inline.

### 2. Hero: interactive datetime workbench

- Left: compatibility eyebrow, concise H1, one paragraph, install command, primary/secondary CTA, four factual capability labels.
- Right: `Live preview` header, datetime input, open calendar + time spinner, selected-value footer.
- Replace ambiguous metrics with `Angular 19–21`, `Material 3`, `Reactive forms`, `Adapter-pluggable`.
- The preview is the signature element and should use the real library component during implementation.

### 3. Examples information architecture

- Lead with one featured `Basic setup` workbench: live preview left, template/component source right.
- Add intent navigation: `Quick start`, `Forms & validation`, `Customization`, `Composition`.
- Convert remaining examples into compact cards; selecting a card may update the featured workbench or anchor to a dedicated block.
- Keep all nine behaviors available; this is hierarchy improvement, not feature removal.

Suggested grouping:

| Group | Examples |
| --- | --- |
| Quick start | Basic, Initial value |
| Forms & validation | Required validation, Min/max, Disabled |
| Customization | Seconds, Minute step, Custom actions |
| Composition | Two pickers in one form |

### 4. API and theming

- Retain content but use the same section header pattern and max width.
- API table gets a mobile scroll wrapper with an explicit `Scroll to see all columns` hint for touch devices.
- Theming cards use fewer decorative step badges; keep one featured setup card and compact token reference rows.

### 5. Footer

- Keep author and project links.
- Replace fixed Angular 19 build claim with `Verified with Angular 19–21`.
- Remote version badge has a plain-text fallback.

## Frontend design plan

- Direction: Interactive datetime workbench.
- Tokens: Canvas mist, Paper surface, Graphite ink, Slate note, SDCore blue, Temporal orange.
- Type: existing Roboto/system and Roboto Mono/system monospace.
- Signature: real open datetime picker in first viewport.
- Copy: terse developer language; claims must match package verification.
- Full rationale: `design/decisions/showcase-refresh.md`.

## Components

| Need | Preferred component | Notes |
| --- | --- | --- |
| Live hero proof | `SdDatetimePicker`, input and toggle directives | Use actual component; fixed demo value is acceptable |
| Actions | Material buttons | Primary/secondary hierarchy; minimum 44px touch target |
| Category navigation | Material button toggle/tabs or semantic buttons | Candidate; no new dependency |
| Example workbench | Existing form field, expansion panel and code block | Recompose; do not duplicate source renderer |
| API reference | Semantic table in overflow wrapper | Preserve header association |
| Mobile menu | CDK overlay/menu candidate | Must be keyboard accessible and dismissible |

## States

| Area | State | Behavior |
| --- | --- | --- |
| Hero picker | closed/open/apply/cancel | Preview value changes only on Apply; Cancel restores committed value |
| Install command | default/copied/error | Show `Copied` feedback; keep command selectable on failure |
| Examples | loading/not applicable | All examples are local; avoid fake skeletons |
| Validation | pristine/invalid/valid | Show explicit repair message and stable layout |
| Code | collapsed/expanded | Focus moves predictably; panel scrolls internally on narrow viewports |
| External badge | unavailable | Show text version/npm link instead of a broken image |

## Authoritative copy

- Eyebrow: `ANGULAR MATERIAL 19–21 · MATERIAL 3`
- H1: `A datetime picker that speaks Material 3.`
- Supporting copy: `Calendar and time controls for Angular, with strict forms integration, accessible interactions, and an adapter-pluggable core.`
- Primary CTA: `Try live examples`
- Install label: `Install the core package`
- Preview label: `Live preview`
- Examples heading: `Start with the path you need`
- Mobile table hint: `Scroll to see all columns`

## Responsive rules

- `>= 1024px`: two-column hero; preview width 480–560px; two-column featured example.
- `768–1023px`: stacked hero; preview max-width 640px; nav anchors remain if they fit.
- `< 768px`: compact nav; one-column content; full-width CTAs; example category strip scrolls inside itself.
- `< 420px`: 16px gutters; H1 36px maximum; preview padding 12–16px; calendar cells minimum 40px where feasible.
- `320px`: zero document-level horizontal overflow. Long code uses internal horizontal scrolling.
- 200% zoom/dynamic type: no clipped labels or fixed-height copy areas.
- Reduced motion: disable hover lift and nonessential transition; state remains perceivable.

## Accessibility

- One H1, sequential H2/H3 structure.
- Skip link to `#examples` or main content.
- Mobile menu has name, expanded state, focus trap/restore and Escape handling.
- Hero picker uses the library dialog/ARIA contract; do not create a decorative fake in production.
- Copy buttons announce success with a polite live region.
- Category controls expose selected state; do not depend on color alone.
- Minimum WCAG AA intent for body text and visible 3px focus ring.
- Table wrapper remains keyboard-scrollable and does not hide headers.

## Suggested implementation scope

No production code was changed by this design task. Expected implementation files:

- `projects/demo/src/app/sections/nav.component.ts`
- `projects/demo/src/app/sections/hero.component.ts`
- `projects/demo/src/app/sections/examples.component.ts`
- `projects/demo/src/app/sections/api-reference.component.ts`
- `projects/demo/src/app/sections/footer.component.ts`
- `projects/demo/src/styles.scss`

## Design acceptance checklist

- [ ] No horizontal overflow at 320, 390, 768, 1024 and 1440px.
- [ ] First desktop and mobile viewport visibly demonstrates the datetime picker.
- [ ] No claim of three functional adapters or ambiguous picker modes.
- [ ] Compatibility copy consistently states Angular/Material 19–21.
- [ ] All nine existing example behaviors remain discoverable.
- [ ] Keyboard focus, reduced motion and 200% zoom are manually verified.

## Open questions

- None blocking implementation.
- Approved default: the hero uses the real interactive picker with a deterministic initial value.
- Approved default: intent controls update the featured workbench; examples also retain stable anchors for direct links and keyboard navigation.
