# Showcase Color and Border Polish

Status: approved in chat on 2026-07-14

## Goal

Correct the inconsistent colors and borders visible in the current desktop showcase without changing its layout, copy, component behavior, or information architecture.

## Scope

- Normalize the hero preview shell, inline picker, calendar, time spinner, and action-row surfaces.
- Reduce the contrast of decorative borders and section separators so they follow one Material 3 outline hierarchy.
- Correct the example intent controls so inactive and selected pills render with a single aligned border and an unambiguous selected state.
- Keep the existing Material system tokens and component structure.

## Visual Rules

### Hero preview

- Use the lowest container surface for the raised preview shell and its interactive content.
- Use a subtle outline-variant border for the outer shell and inline picker.
- Use lighter outline-variant separators between calendar, time spinner, and actions.
- Remove the mismatched gray-purple time area while retaining enough tonal separation to distinguish controls.

### Hero-to-examples boundary

- Keep the structural separator, but reduce its contrast so it does not compete with the preview card borders.

### Example intent controls

- Render each pill with one 1px outline and no doubled or offset border effect.
- Inactive pills use a neutral surface and outline-variant border.
- The selected pill uses the primary-container surface, primary border, and on-primary-container text.
- Preserve the existing count badge, 44px minimum target, horizontal scrolling, focus indicator, and `aria-pressed` behavior.

## Constraints

- No layout, spacing, typography, copy, route, state, or interaction changes.
- No changes to the datetime library components or public API.
- No new dependencies or hard-coded palette values; use existing `--mat-sys-*` tokens and `color-mix()` where needed.
- Do not rely on broad selectors that could alter buttons outside the showcase intent controls.

## Verification

- Build the demo successfully.
- Run the relevant showcase tests.
- Inspect the desktop showcase at the viewport represented by the source screenshot.
- Confirm the hero surfaces and separators are visually consistent.
- Confirm every intent pill has one aligned border in both inactive and selected states.
- Confirm keyboard focus remains visible and selection is not conveyed by color alone.

## Acceptance Criteria

- The selected example intent pill no longer shows a white or gray offset border.
- Inactive intent pills have consistent neutral backgrounds and borders.
- The hero preview shell, picker, spinner, and action row use a coherent light-surface hierarchy.
- Separator lines remain visible but are less prominent than interactive control outlines.
- Existing responsive layout and showcase behavior remain unchanged.
