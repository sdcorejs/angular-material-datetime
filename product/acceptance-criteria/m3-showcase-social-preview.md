# Acceptance Criteria - M3 Showcase và Social Preview

Nguồn chuẩn: `.sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md`.

| ID | User Story | Criterion | Verification | Status |
|---|---|---|---|---|
| AC-001 | US-01 | Không còn user-facing M2/legacy-theme support claim. | repository text scan | implemented |
| AC-002 | US-01 | Picker/time-spinner chỉ dùng M3 system tokens. | source inspection/build | implemented |
| AC-003 | US-01 | Demo theme chỉ cấu hình bằng `mat.theme(...)`. | source inspection/build | implemented |
| AC-004 | US-01 | Theming chỉ hướng dẫn M3 setup/tokens/customization/dark compatibility. | component test/review | implemented |
| AC-005 | US-01 | README nêu M3-only và migration expectation. | README inspection | implemented |
| AC-006 | US-01 | Tất cả section có ngôn ngữ M3 đồng bộ và giữ interactions/content. | component tests/browser smoke | implemented |
| AC-007 | US-02 | Desktop/tablet/mobile không overflow, clip hoặc overlap. | manual responsive UAT | pending UAT |
| AC-008 | US-02 | Focus, image semantics và heading order accessible. | component tests/browser review | implemented |
| AC-009 | US-03 | Favicon/apple-touch icon resolve ở local/Pages base href. | build artifact inspection | implemented |
| AC-010 | US-03 | HTML có title, description, canonical, theme color và author. | static HTML inspection | implemented |
| AC-011 | US-03 | Open Graph đầy đủ với absolute production URLs. | static HTML inspection | implemented |
| AC-012 | US-03 | Twitter card dùng `summary_large_image` và metadata đã duyệt. | static HTML inspection | implemented |
| AC-013 | US-03 | Social card 1200×630 dùng SDCoreJS brand và M3 positioning. | image dimension/visual inspection | implemented |
| AC-014 | US-03 | Production link tạo rich preview sau re-scrape. | post-deploy manual UAT | pending deploy |
| AC-015 | US-04 | Footer và package manifests có author identity nhất quán. | file inspection/test | implemented |
| AC-016 | US-04 | Jest, lint, build:all và Pages production build pass. | command gate | pending final gate |
| AC-017 | US-04 | Final diff không có output/debug/focused tests/secrets/unrelated changes. | branch-ready gate | pending final gate |
