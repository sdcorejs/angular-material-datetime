# PRD - M3 Showcase và Social Preview

## Problem

Showcase cũ chưa truyền đạt nhất quán định vị Material 3 và metadata tĩnh chưa đủ để link GitHub Pages tạo preview chuyên nghiệp khi được chia sẻ.

## Goal

Tạo showcase Material 3-only dễ thử, dễ tra cứu, responsive/accessibile, đồng thời cung cấp favicon, author identity và social card thống nhất cho SDCoreJS.

## Users

- Angular developer — cần đánh giá picker và copy cấu hình nhanh.
- Maintainer — cần một tài liệu API/theming có thể kiểm chứng và triển khai tĩnh.
- Người nhận link — cần nhận biết package qua title, description và ảnh preview.

## Scope

- Làm mới navigation, hero, examples, API, theming, code blocks và footer.
- Giữ đầy đủ chín ví dụ và public API hiện tại.
- Chỉ tài liệu/style Material 3.
- Metadata HTML tĩnh, favicon SDCoreJS và social card 1200×630.
- Author: Trần Thuận Nghĩa, `tran.thuan.nghia@gmail.com`, `https://github.com/sdcorejs`.

## Out Of Scope

- Thay đổi TypeScript public API hoặc behavior của picker/adapters.
- SSR, analytics, custom domain, dark-mode toggle hoặc dependency upgrade.
- Tự động publish npm/GitHub release.

## Success Criteria

- 17 acceptance criteria trong approved spec được trace tới implementation và verification.
- Automated tests, lint và production builds pass.
- Hai bước manual còn lại được ghi rõ: responsive UAT và crawler re-scrape sau deploy.
