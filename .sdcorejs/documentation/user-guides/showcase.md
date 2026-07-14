---
module: showcase
title: Showcase Angular Material Datetime
tracks:
  - angular
generated_at: 2026-07-14T21:17:18.6343386+07:00
git_head: f58983e777e78e637121e4acbbf3415deee1763a
routes:
  - path: /
    screen: showcase
    permission: null
permissions: []
entities: []
screens:
  - showcase
spec_refs:
  - .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
prd_refs: []
coverage:
  total: 17
  met: 14
  partial: 3
  missing: 0
---

# Hướng dẫn sử dụng showcase

## Tổng quan

Showcase giúp thử trực tiếp Angular Material Datetime Picker, xem mã nguồn cho từng tình huống, tra cứu API và cấu hình Material 3. Trang không yêu cầu đăng nhập hoặc quyền riêng biệt.

URL production: `https://sdcorejs.github.io/angular-material-datetime/`

## Màn hình và tác vụ

### Navigation

- Trên desktop, chọn **Examples**, **API** hoặc **Theming** để đi tới section tương ứng.
- Trên mobile, mở **Open navigation**, chọn section rồi menu tự đóng.
- Nhấn Escape để đóng menu mobile và quay focus về nút mở.
- Dùng liên kết **Skip to examples** khi điều hướng bằng bàn phím.

### Hero và live workbench

1. Chọn ngày trên calendar.
2. Dùng mũi tên của time spinner để chỉnh giờ/phút.
3. Chọn **Apply** để xác nhận giá trị đang chỉnh.
4. Chọn **Cancel** để quay về giá trị đã Apply gần nhất.
5. Chọn **Now** để đưa bản nháp về thời điểm hiện tại trước khi Apply.

Nút cạnh input mở picker overlay thật. Trong dialog này, các action Now/Cancel/Apply hoạt động như khi tích hợp package vào ứng dụng Angular.

### Examples

Chọn một trong bốn nhóm intent rồi chọn ví dụ cụ thể:

- **Quick start:** Basic, Initial value.
- **Forms & validation:** Required validation, Min/max constraints, Disabled state.
- **Customization:** Seconds, Minute step, Custom actions.
- **Composition:** Two pickers in one form.

Ví dụ được chọn xuất hiện ở workbench phía trên index. Trang tự cuộn workbench vào vùng nhìn thấy; nếu hệ điều hành bật reduced motion, chuyển động cuộn được tắt.

### API reference

Năm bảng liệt kê picker inputs, outputs, methods, input directive và supporting directives/components. Trên màn hình hẹp, focus vào vùng bảng rồi cuộn ngang để xem đủ cột.

### Theming

Phần Theming trình bày:

- cài đặt theme bằng `mat.theme(...)`;
- các `--mat-sys-*` tokens quan trọng;
- cách tùy chỉnh system tokens;
- điều kiện để popup trong CDK overlay nhận cùng theme;
- ví dụ dark-theme compatibility.

## Quyền truy cập

| Route | Màn hình | Quyền yêu cầu |
|---|---|---|
| `/` | Showcase | Không yêu cầu |

## Dữ liệu

Showcase không đọc hoặc ghi entity bền vững. Giá trị picker chỉ tồn tại trong form controls/signals của phiên trình duyệt và được reset khi tải lại trang.

## Tác vụ đặc biệt

| Tác vụ | Kết quả |
|---|---|
| Now | Cập nhật giá trị nháp sang thời điểm hiện tại, chưa tự Apply. |
| Cancel | Bỏ thay đổi nháp và giữ giá trị đã xác nhận. |
| Apply | Xác nhận ngày/giờ đang chọn. |
| Chọn example | Đổi workbench và đưa nó vào viewport. |
| GitHub/npm/source link | Mở tài nguyên ngoài ở tab mới. |

## Coverage theo acceptance criteria

| AC | Trạng thái | Bằng chứng/hành động còn lại |
|---|---|---|
| AC-001 | Met | Nội dung user-facing không còn claim Material 2/legacy theme. |
| AC-002 | Met | Picker/time-spinner dùng Material 3 system tokens. |
| AC-003 | Met | Demo theme dùng `mat.theme(...)`. |
| AC-004 | Met | Theming chỉ còn M3 setup, tokens, customization và dark compatibility. |
| AC-005 | Met | README mô tả M3-only và lưu ý migration. |
| AC-006 | Met | Navigation, hero, examples, API, theming, code blocks và footer đã đồng bộ. |
| AC-007 | Partial | Automated/browser checks đã pass; vẫn cần project owner acknowledgement cho manual desktop/tablet/mobile UAT. |
| AC-008 | Met | Focus, alt/decorative semantics và heading order có automated/browser coverage. |
| AC-009 | Met | Favicon/apple-touch icon dùng `brand/logo.png` tương đối theo base href. |
| AC-010 | Met | Title, description, canonical, theme color và author có trong HTML tĩnh. |
| AC-011 | Met | Open Graph đầy đủ và dùng production URLs tuyệt đối. |
| AC-012 | Met | Twitter `summary_large_image` dùng cùng title/description/image. |
| AC-013 | Met | `og-image.png` là social card 1200×630 có SDCoreJS branding. |
| AC-014 | Partial | Cần deploy rồi re-scrape bằng crawler/debugger của Messenger/Zalo. |
| AC-015 | Met | Footer và package manifests dùng cùng author/email/profile. |
| AC-016 | Met | Jest, lint, build:all và Pages production build là gate bắt buộc. |
| AC-017 | Partial | Chỉ đạt sau gate branch-ready xác nhận không có output tạm hoặc thay đổi ngoài scope. |

## Checklist minh họa

Các ảnh sau chưa được commit tự động; tạo lại bằng script để tài liệu luôn khớp UI hiện tại:

| Ảnh | Mục đích | File đích |
|---|---|---|
| Hero desktop | Product message và live workbench | `images/showcase-hero.png` |
| Examples | Intent selector và featured example | `images/showcase-examples.png` |
| Picker dialog | Overlay thật với calendar/time/actions | `images/showcase-picker-dialog.png` |

Chạy demo trước, sau đó chạy:

```powershell
npx ng serve demo
node .sdcorejs/documentation/user-guides/capture-screenshots.playwright.mjs http://localhost:4200
```

Script cần package `playwright` trong môi trường chạy. Nếu chưa có, cài theo policy của workspace trước khi chụp; script sẽ dừng với thông báo rõ ràng thay vì tạo ảnh rỗng.

## Kiểm tra social preview sau deploy

1. Mở source HTML của URL production và xác nhận `og:title`, `og:description`, `og:image` xuất hiện trước khi Angular bootstrap.
2. Mở trực tiếp URL `og:image` và xác nhận ảnh tải được không cần đăng nhập.
3. Re-scrape URL bằng Open Graph debugger phù hợp.
4. Gửi lại URL trong Messenger/Zalo sau khi cache được làm mới.
5. Nếu preview vẫn cũ nhưng HTML/ảnh đúng, chờ cache TTL hoặc dùng chức năng refresh của nền tảng.
