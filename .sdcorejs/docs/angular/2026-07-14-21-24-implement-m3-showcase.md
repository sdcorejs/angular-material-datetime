# Implement M3 Showcase — 2026-07-14 21:24

## What was requested

Triển khai showcase refresh đã được duyệt: chỉ Material 3, presentation chuyên nghiệp, favicon/social preview theo SDCoreJS, author rõ ràng; sau đó chạy full tests, review/repair và viết cả technical doc lẫn user guide.

## What was changed

- EDIT `projects/demo/src/app/sections/nav.component.ts` — navigation responsive, skip link, keyboard focus/Escape và reset state khi resize desktop.
- EDIT `projects/demo/src/app/sections/hero.component.ts` — product hero, install/CTA và live calendar/time workbench có Now/Cancel/Apply.
- EDIT `projects/demo/src/app/sections/examples.component.ts` — bốn intent groups, chín examples, featured workbench và accessible selection/scroll behavior.
- EDIT `projects/demo/src/app/sections/api-reference.component.ts` — năm bảng API responsive, semantics và payload `SdDatetimeCloseReason`.
- EDIT `projects/demo/src/app/sections/theming.component.ts` — hướng dẫn M3-only setup, tokens, customization và dark compatibility.
- EDIT `projects/demo/src/app/sections/footer.component.ts` — package links, compatibility và author identity.
- EDIT `projects/demo/src/styles.scss`, `projects/demo/src/app/app.config.ts`, `projects/demo/src/index.html` — M3 foundation, default native adapter và static metadata.
- CREATE `projects/demo/src/app/sections/showcase-sections.component.spec.ts` — 11 regression tests cho showcase interactions/accessibility/content.
- CREATE `.sdcorejs/documentation/technical-docs/m3-showcase.md` — architecture, contracts, flows và troubleshooting.
- CREATE `.sdcorejs/documentation/user-guides/showcase.md` và capture script — user flow, AC coverage, screenshot checklist.
- CREATE `product/**`, `.sdcorejs/docs/product/**`, `.sdcorejs/summary.md` — PO docs và requirement/implementation/test traceability.

## Decisions made

- Giữ scope M3-only ở styling/docs và không đổi public TypeScript API của picker.
- Live workbench dùng public `MatCalendar`/`SdTimeSpinner`; picker overlay vẫn dùng package public entrypoint.
- Đóng mobile menu khi viewport chuyển desktop để tránh trạng thái hidden-active.
- Example index đưa featured workbench vào viewport và tôn trọng `prefers-reduced-motion`.
- Metadata social nằm tĩnh trong `index.html`; production crawler re-scrape vẫn là manual post-deploy step.
- Không chạy `npm publish`, push hoặc deploy trong phiên này.

## Open questions / follow-ups

- AC-014 cần deploy GitHub Pages rồi re-scrape URL production bằng crawler/debugger tương thích Messenger/Zalo.
- Project owner cần acknowledgement cuối cho manual responsive UAT/preview sau deploy; automated gate không tự pass tiêu chí manual.

## Product traceability

- Ledger: `.sdcorejs/docs/product/2026-07-14-21-23-m3-showcase-social-preview.md`
- Status: partial — local implementation đầy đủ; post-deploy social crawler evidence còn mở.

## Next suggested action

- Deploy GitHub Pages từ revision đã duyệt, sau đó re-scrape social metadata.
- Chỉ publish npm `1.0.3` sau khi project owner xác nhận riêng command release.

## Verification snapshot

- `npm test -- --runInBand` — pass 15 suites, 149 tests.
- `npm run lint` — pass cả bốn Angular projects.
- `npm run build:all` — pass ba Angular Package Format libraries.
- Pages production build — pass với base href `/angular-material-datetime/`.
- `npm run test:package` và `npm run pack:datetime` — pass; 23-file APF tarball, FESM/declarations present, source/spec/tsconfig absent.
- Clean tarball consumers — Angular 20/21 resolution + build pass; Angular 19 matrix tạo build output trước runner timeout/cleanup.

## Skill provenance

Skills invoked this session: `sdcorejs-design` -> `sdcorejs-plan` -> `sdcorejs-execute-plan` -> `sdcorejs-parallel-dispatch` -> `sdcorejs-angular` -> `sdcorejs-test` -> `sdcorejs-review` -> `sdcorejs-repair-loop` -> `sdcorejs-documentation` -> `sdcorejs-product` -> `sdcorejs-ship`.
