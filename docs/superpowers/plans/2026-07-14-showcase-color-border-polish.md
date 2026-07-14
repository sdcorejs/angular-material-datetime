# Showcase Color and Border Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the showcase hero surfaces, separators, and example intent pill borders visually consistent without changing layout or behavior.

**Architecture:** Keep the correction at the showcase styling boundary. Component-scoped hero styles will own the preview surface hierarchy, while the existing global showcase stylesheet will own the Material intent-button overrides that already live there.

**Tech Stack:** Angular 19, Angular Material 19, SCSS, Jest, Angular CLI

---

## File Map

- Modify `projects/demo/src/app/sections/hero.component.ts`: refine only the component-scoped hero background, shell, inline-picker, spinner, and separator styles.
- Modify `projects/demo/src/styles.scss`: refine only the global example intent-button surface, outline, MDC outline width, and selected-state styles.
- Verify `projects/demo/src/app/sections/showcase-sections.component.spec.ts`: existing behavioral coverage ensures selection and hero interactions remain intact; no new behavior test is required for a token-only CSS change.

### Task 1: Normalize hero surfaces and separators

**Files:**
- Modify: `projects/demo/src/app/sections/hero.component.ts:128-289`
- Test: `projects/demo/src/app/sections/showcase-sections.component.spec.ts`

- [ ] **Step 1: Run the existing hero tests as a behavioral baseline**

Run:

```powershell
npx jest projects/demo/src/app/sections/showcase-sections.component.spec.ts --runInBand
```

Expected: PASS; the hero calendar, Apply/Cancel flow, dialog, and example selection tests succeed before the visual-only change.

- [ ] **Step 2: Reduce the hero section separator contrast**

In the `.hero` rule, replace the direct outline token with a mixed low-contrast separator:

```scss
border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 58%, transparent);
```

- [ ] **Step 3: Give the preview shell one neutral surface and subtle outline**

In `.preview-shell`, use:

```scss
border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 72%, transparent);
background: var(--mat-sys-surface-container-lowest);
```

Keep its existing radius, padding, and elevation unchanged.

- [ ] **Step 4: Normalize the inline picker and its internal layers**

Replace the inline-picker surface rules with:

```scss
.inline-picker {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 76%, transparent);
  border-radius: 22px;
  background: var(--mat-sys-surface-container-lowest);
  box-shadow: var(--mat-sys-level1);
}

.inline-picker mat-calendar {
  display: block;
  width: 100%;
  background: var(--mat-sys-surface-container-lowest);
}

.inline-picker sd-time-spinner {
  min-height: 100px;
  border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 62%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 62%, transparent);
  background: var(--mat-sys-surface-container-low);
}
```

Keep `.preview-actions` on `var(--mat-sys-surface-container-lowest)` so the action row reads as part of the white interactive surface.

- [ ] **Step 5: Re-run the showcase tests**

Run:

```powershell
npx jest projects/demo/src/app/sections/showcase-sections.component.spec.ts --runInBand
```

Expected: PASS with the same behavioral assertions as the baseline.

- [ ] **Step 6: Commit the hero polish**

```powershell
git add projects/demo/src/app/sections/hero.component.ts
git commit -m "style(demo): normalize hero preview surfaces"
```

### Task 2: Remove the doubled intent-pill border effect

**Files:**
- Modify: `projects/demo/src/styles.scss:163-193`
- Test: `projects/demo/src/app/sections/showcase-sections.component.spec.ts`

- [ ] **Step 1: Establish explicit neutral and selected button tokens**

Replace the current intent-control button rules with the following scoped overrides:

```scss
app-examples .intent-controls button {
  --mdc-outlined-button-outline-color: color-mix(in srgb, var(--mat-sys-outline-variant) 82%, transparent);
  --mdc-outlined-button-outline-width: 1px;
  --mdc-outlined-button-container-shape: 999px;
  --mdc-outlined-button-label-text-color: var(--mat-sys-on-surface-variant);
  min-height: 44px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 999px;
  background: var(--mat-sys-surface-container-lowest);
}

app-examples .intent-controls button[aria-pressed='true'] {
  --mdc-outlined-button-outline-color: var(--mat-sys-primary);
  --mdc-outlined-button-label-text-color: var(--mat-sys-on-primary-container);
  background: var(--mat-sys-primary-container);
  color: var(--mat-sys-on-primary-container);
}
```

The zero host border ensures the MDC outline is the only visible outline. The selectors remain scoped to the four intent controls and do not affect buttons elsewhere.

- [ ] **Step 2: Preserve the selected-state indicator beyond color**

Keep the existing `aria-pressed` binding and count badge. Confirm in the DOM that only the active button has `aria-pressed="true"`; this behavior is already asserted by the showcase test.

- [ ] **Step 3: Run the showcase tests**

Run:

```powershell
npx jest projects/demo/src/app/sections/showcase-sections.component.spec.ts --runInBand
```

Expected: PASS, including `switches developer intent and selects its first example` and `selects a specific example while keeping its intent active`.

- [ ] **Step 4: Build the demo**

Run:

```powershell
npx ng build demo
```

Expected: exit code 0 with demo bundles emitted under `dist/demo` and no SCSS compilation error.

- [ ] **Step 5: Inspect the desktop result**

Run:

```powershell
npm start
```

At the desktop viewport represented by the source screenshot, confirm:

- the hero shell and inline picker use coherent white/light-neutral surfaces;
- time spinner separators are visible but quieter than input outlines;
- the hero/examples boundary is subtle;
- every intent pill has exactly one aligned outline;
- the selected pill uses primary-container fill and a primary outline;
- keyboard focus remains visible around each pill.

- [ ] **Step 6: Check the final diff**

Run:

```powershell
git diff --check
git diff -- projects/demo/src/app/sections/hero.component.ts projects/demo/src/styles.scss
```

Expected: no whitespace errors; the diff contains only the scoped color and border changes described above.

- [ ] **Step 7: Commit the intent-control polish**

```powershell
git add projects/demo/src/styles.scss
git commit -m "style(demo): align example intent borders"
```
