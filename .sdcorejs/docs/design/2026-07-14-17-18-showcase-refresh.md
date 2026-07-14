---
feature: showcase-refresh
status: approved
sourceUserStories: not-provided
sourceAcceptanceCriteria: not-provided
updatedAt: 2026-07-14T17:21:07+07:00
---

# Design Ledger - Showcase Refresh

## Outputs

- Decision and audit: `design/decisions/showcase-refresh.md`
- Flow: `design/flows/showcase-refresh.md`
- Spec: `design/specs/showcase-refresh.md`
- Editable wireframes:
  - `design/wireframes/showcase-refresh/showcase.html`
  - `design/wireframes/showcase-refresh/mobile-preview.html`
- PNG exports:
  - `design/exports/png/showcase-refresh/showcase-desktop.png`
  - `design/exports/png/showcase-refresh/showcase-mobile.png`

## Traceability

No formal product story or acceptance-criteria IDs were provided. The project owner approved the design intent represented by the rows below on 2026-07-14.

| User Story | Acceptance Criteria | Design Artifact | Status |
|---|---|---|---|
| As an Angular developer, I can understand the package value in the first viewport. | Hero shows a real datetime interaction, truthful compatibility and a copyable install command. | Desktop/mobile wireframes; spec sections 1-2 | Approved design intent |
| As a mobile visitor, I can evaluate and navigate the showcase without clipping. | No document overflow at 320-390px; nav collapses to GitHub and menu controls; CTAs remain reachable. | Mobile PNG; responsive rules | Approved design intent |
| As an adopter, I can find an example matching my task. | All nine examples remain discoverable under Quick start, Forms & validation, Customization and Composition. | Flow; spec section 3 | Approved design intent |
| As a technical evaluator, I can inspect implementation details. | Featured example keeps live preview beside source; API and theming remain available. | Desktop PNG; spec sections 3-4 | Approved design intent |

## FE Handoff Notes

- Implement through the existing standalone demo sections; no production Angular code was changed by this design task.
- Frontend design plan: use the `Interactive datetime workbench` direction, with the real picker as the signature hero proof and the example source adjacent to its live result.
- Mobile design plan: use compact navigation, full-width CTAs, a horizontally scrollable category strip and internal overflow only for code/table content.
- Confirmed token/component/copy decisions: retain existing Roboto/system typography and logo; use SDCore blue for primary actions, temporal orange as a restrained accent, and Material 3 shapes/states; no new design dependency.
- Approved interaction decisions: the hero picker is interactive with a deterministic initial value; intent controls update the featured workbench while stable anchors keep examples linkable.
- Do not ship ambiguous `3 adapters` or `3 picker modes` metrics. Keep Angular/Material compatibility text consistent with the verified package range.
- Preserve focus visibility, skip navigation, reduced-motion behavior, minimum 44px touch targets and the picker action order.

## Open Questions

- None. The project owner approved this handoff on 2026-07-14.
