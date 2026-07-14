# Example Intent Pills Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the white Material state-layer crescents from the four example intent pills without changing their behavior, dimensions, or approved colors.

**Architecture:** Keep the controls as native semantic buttons driven by the existing Angular signals and event handlers. Remove only the `mat-stroked-button` directives and replace the intent-specific MDC token overrides with direct, component-scoped host styles.

**Tech Stack:** Angular 19, SCSS, Jest, native HTML buttons

---

## File Map

- Modify `projects/demo/src/app/sections/showcase-sections.component.spec.ts`: add a regression assertion that intent controls do not generate Material button/ripple layers.
- Modify `projects/demo/src/app/sections/examples.component.ts`: remove `mat-stroked-button` from only the four intent buttons.
- Modify `projects/demo/src/styles.scss`: replace MDC custom-property overrides with one direct host border and text color.

### Task 1: Add the regression test

**Files:**
- Modify: `projects/demo/src/app/sections/showcase-sections.component.spec.ts:98-108`

- [ ] **Step 1: Extend the intent-switching test before changing production code**

Immediately after querying `.intent-controls button`, add:

```typescript
expect(intentButtons).toHaveLength(4);
expect([...intentButtons].every((button) => !button.classList.contains('mat-mdc-button-base'))).toBe(true);
expect(fixture.nativeElement.querySelectorAll('.intent-controls .mat-mdc-button-persistent-ripple')).toHaveLength(0);
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx jest projects/demo/src/app/sections/showcase-sections.component.spec.ts --runInBand
```

Expected: FAIL because the current `mat-stroked-button` directives add `mat-mdc-button-base` and persistent ripple elements.

- [ ] **Step 3: Commit the failing regression test**

```powershell
git add projects/demo/src/app/sections/showcase-sections.component.spec.ts
git commit -m "test(demo): cover native example intent pills"
```

### Task 2: Replace the Material intent buttons with semantic pills

**Files:**
- Modify: `projects/demo/src/app/sections/examples.component.ts:72-84`
- Modify: `projects/demo/src/styles.scss:173-189`
- Test: `projects/demo/src/app/sections/showcase-sections.component.spec.ts`

- [ ] **Step 1: Remove the Material directive from the four intent controls**

For each of the four buttons inside `.intent-controls`, change:

```html
<button type="button" mat-stroked-button ...>
```

to:

```html
<button type="button" ...>
```

Keep `aria-controls`, `[attr.aria-pressed]`, click handlers, labels, and count spans unchanged. Keep `MatButtonModule` imported because the featured examples still use Material buttons.

- [ ] **Step 2: Replace the MDC overrides with direct pill styles**

Use:

```scss
app-examples .intent-controls button {
  min-height: 44px;
  flex: 0 0 auto;
  padding: 0 24px;
  border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 82%, transparent);
  border-radius: 999px;
  background: var(--mat-sys-surface-container-lowest);
  color: var(--mat-sys-on-surface-variant);
  cursor: pointer;
}

app-examples .intent-controls button[aria-pressed='true'] {
  border-color: var(--mat-sys-primary);
  background: var(--mat-sys-primary-container);
  color: var(--mat-sys-on-primary-container);
}
```

The global `button { font: inherit; }` and `button:focus-visible` rules continue to supply typography and the 3px keyboard focus ring.

- [ ] **Step 3: Run the focused test and verify GREEN**

```powershell
npx jest projects/demo/src/app/sections/showcase-sections.component.spec.ts --runInBand
```

Expected: PASS, including the new native-button/ripple assertions and existing selection behavior.

- [ ] **Step 4: Build and lint the demo change**

```powershell
npx ng build demo
npm run lint
```

Expected: both commands exit 0 with no component-style budget warning.

- [ ] **Step 5: Inspect the rendered controls**

At the desktop viewport represented by the screenshot, confirm:

- four intent buttons render;
- no `.mat-mdc-button-persistent-ripple` exists inside them;
- every button has one 1px solid border and 999px radius;
- no white crescent appears;
- the selected button retains primary-container colors;
- Tab focus remains visible and clicking each control updates `aria-pressed` and the featured example.

- [ ] **Step 6: Check scope and commit**

```powershell
git diff --check
git diff -- projects/demo/src/app/sections/examples.component.ts projects/demo/src/styles.scss projects/demo/src/app/sections/showcase-sections.component.spec.ts
git add projects/demo/src/app/sections/examples.component.ts projects/demo/src/styles.scss
git commit -m "fix(demo): remove intent pill ripple artifacts"
```
