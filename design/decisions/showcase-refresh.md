# Design Decision — Showcase Refresh

Status: `approved - 2026-07-14`

## Source and constraints

- Source: showcase Angular hiện tại trong `projects/demo/src/app/sections/`.
- Product stories/acceptance criteria: chưa có; các quyết định về thứ tự nội dung được đánh dấu `inferred`.
- Giữ Material 3, logo SDCoreJS, Roboto/system stack và các Angular Material components hiện có.
- Không thêm font, icon pack, illustration hoặc motion dependency mới.
- Design artifact chỉ là handoff; không thay đổi production code trong lượt này.

## Review findings

| Priority | Finding | Evidence | Direction |
| --- | --- | --- | --- |
| P0 | Mobile 390px bị horizontal overflow | Nav, headline, CTA, install card và example card bị cắt bên phải trong screenshot | Mobile nav rút gọn; mọi grid về một cột; code/value areas có `min-width: 0` và scroll nội bộ |
| P1 | First viewport chưa cho thấy component | Hero phải cuộn xuống mới thấy input; cột phải chỉ có install command | Dùng open datetime picker preview làm signature element ngay trong hero |
| P1 | Hero metrics không đúng package contract | “3 included adapters” trong khi Moment/date-fns là placeholder; “3 picker modes” không rõ nghĩa | Thay bằng facts: Angular 19–21, Material 3, Forms + A11y, adapter-pluggable |
| P1 | Version copy không nhất quán | Hero ghi 19+, footer ghi build với 19, package hỗ trợ 19–21 | Dùng một compatibility statement: Angular/Material 19–21 |
| P2 | 9 examples ngang hàng làm tăng thời gian scan | Grid đánh số liên tục nhưng không phân nhóm theo intent | Nhóm Quick start, Forms & validation, Customization; một featured example, phần còn lại compact cards |
| P2 | Mobile navigation không có strategy thu gọn | Logo + ba anchor + GitHub vượt viewport | Giữ logo, GitHub icon và menu button; anchors chuyển vào menu/sheet |

## Frontend Design Plan

### Subject

- Subject: package showcase cho Angular Material datetime picker.
- Audience: Angular developers đang đánh giá package, tìm installation snippet hoặc behavior cụ thể.
- Single job: giúp developer xác nhận nhanh “component trông/hoạt động ra sao” và lấy đúng code để bắt đầu.

### Visual direction

- Concept: **Interactive datetime workbench** — component thật là bằng chứng chính, docs là lớp giải thích xung quanh.
- Rationale: datetime picker là sản phẩm thị giác và tương tác; first viewport nên chứng minh chất lượng M3 trước khi nói về metrics.
- Intentional risk: picker preview trong hero khá giàu thông tin; bù lại copy và CTA được rút gọn để giữ nhịp thở.

### Tokens

Các màu là candidate, cần map sang `--mat-sys-*`/CSS variables khi implement.

| Token | Role | Hex | Intended use |
| --- | --- | ---: | --- |
| Canvas mist | Page surface | `#F7F8FC` | Nền chung, section alternation |
| Paper surface | Raised surface | `#FFFFFF` | Picker, example workbench, code panel |
| Graphite ink | Primary text | `#1A1B20` | Heading, labels, selected values |
| Slate note | Secondary text | `#5D6170` | Supporting copy, metadata |
| SDCore blue | Primary action/focus | `#005CBD` | CTA, active date, focus ring |
| Temporal orange | Brand accent | `#E85D1A` | Time marker, small signature details only |

Error/success states tiếp tục dùng Material system error/tertiary tokens, kèm text/icon chứ không chỉ dựa vào màu.

### Type

| Role | Stack | Weight | Usage |
| --- | --- | --- | --- |
| Display | `Roboto, Arial, sans-serif` | 700–750 | Hero and section titles |
| Body | `Roboto, Arial, sans-serif` | 400–500 | Description, form helper text |
| Utility | `Roboto Mono, Consolas, monospace` | 500–700 | Install command, API names, values |

### Layout

- Desktop: sticky 64px nav; 12-column hero with copy 5 columns and live picker 7 columns; examples use featured split workbench followed by three intent groups.
- Tablet: hero stacks copy above preview; example workbench remains split until 760px.
- Mobile: one column; compact nav; picker preview stays within 358px; CTAs stack; code scrolls inside its own panel.

### Signature element

- An always-visible, open datetime picker framed as a “Live preview” workbench, with selected date/time and Apply/Cancel actions.
- It fits because the package’s core differentiation is the combined calendar + time interaction, not generic repository metrics.

### Copy voice

- Register: concise, technical, confident; avoid “production-ready” unless release evidence supports it.
- Actions: `Try live examples`, `Copy install`, `View source`, `Open picker`, `Apply`.
- Errors: say which input is invalid and how to correct it.
- Showcase remains English to match the existing global developer audience; design notes remain Vietnamese.

## Mobile Design Plan

### Subject framing

- Target surface: responsive developer documentation website.
- Mobile context: quick package evaluation, copy install command, inspect one example; not a full IDE replacement.
- Single job: see component quality and reach the relevant example without horizontal scrolling.

### Layout and ergonomics

- Navigation: brand + GitHub icon + 44px menu button; anchor links live in a menu/sheet candidate.
- Primary action: full-width `Try live examples` directly under hero copy.
- Touch targets: minimum 44×44px; code copy button remains visible without hover.
- Keyboard/safe area: sticky nav respects top safe area; overlays stay inside viewport; focus remains visible.
- Gesture alternatives: no gesture-only interaction; example category chips can horizontally scroll but also remain keyboard navigable.

### Mobile states

- Poor network/offline: core text and system icons remain usable; external npm/version badge degrades to a text link.
- Interrupted/resumed: hash anchor and expanded code state should remain stable where practical.
- Dynamic type/zoom: at 200% zoom, hero and preview stack; no fixed-height text containers.
- Small phone: support 320px without document-level horizontal overflow.
- Large phone: preserve 16–20px gutters; never stretch picker beyond readable width.
- Reduced motion: remove lift/translate animation; state changes remain immediate.

## Design critique

- Initial issue: first idea retained the install/metrics card and only polished its styling, which remained generic for any npm package.
- Revision: made the open calendar + time spinner the hero signature and moved installation into a compact command row.
- Why better: developers can judge the product in the first viewport, while capability facts become verifiable and secondary.

## Confirmed vs inferred

- Confirmed from code: M3-only, SDCoreJS brand assets, Angular Material components, existing examples/API/theming anchors, responsive mobile web target.
- Confirmed from verification: Angular/Material 19–21 package compatibility.
- Approved by project owner on 2026-07-14: group examples by developer intent, make Basic the featured example, and use the real interactive picker in the hero with a deterministic initial value.
- Implementation behavior: selecting an intent updates the featured workbench while every example remains directly discoverable and linkable.
- Open visual decisions: none blocking implementation.
