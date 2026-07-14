# Example Intent Pills Design

Status: approved in chat on 2026-07-15

## Goal

Remove the white crescent artifacts at the leading edge of the four example intent pills while preserving their layout, selection behavior, accessibility, and visual hierarchy.

## Root Cause

The controls use Angular Material `mat-stroked-button`. Its generated persistent ripple/state-layer elements inherit shape from a bordered host, a case Angular Material handles with internal stroked-button rules. The showcase adds its own 999px shape and background tokens, producing the visible internal crescent artifacts.

## Chosen Design

- Replace `mat-stroked-button` on the four intent controls with semantic native `<button type="button">` elements.
- Keep the existing click handlers, `aria-controls`, and `aria-pressed` bindings unchanged.
- Style the host buttons directly with one 1px outline, neutral surface, 999px radius, and the existing 44px minimum target.
- Keep the selected state on primary-container with primary outline and on-primary-container text.
- Preserve the count badge, horizontal scrolling, global focus-visible ring, labels, spacing, and behavior.
- Remove the intent-specific MDC custom properties because the controls no longer use an MDC outlined button.

## Constraints

- Do not alter example selection logic or featured-example scrolling.
- Do not change the surrounding examples layout, heading, copy, or group cards.
- Do not affect Material buttons elsewhere in the showcase.
- Do not add dependencies.

## Verification

- Add a regression assertion that the four intent controls are semantic buttons without Material button classes or generated ripple layers.
- Confirm all four retain `aria-pressed` and switch the selected example correctly.
- Build the demo and run showcase tests.
- Inspect computed styles: exactly one 1px border, no persistent ripple/state-layer child, and visible keyboard focus.

## Acceptance Criteria

- No white crescent appears inside any intent pill.
- All four pills retain the same labels, counts, sizing, spacing, and horizontal scrolling.
- Selected and unselected states retain the approved Material-system colors.
- Keyboard, click, `aria-pressed`, and featured-example behavior remain unchanged.
