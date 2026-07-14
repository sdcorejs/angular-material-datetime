---
title: M3 showcase architecture
generated_at: 2026-07-14T21:17:18.6343386+07:00
git_head: f58983e777e78e637121e4acbbf3415deee1763a
contract_id: angular-material-datetime-m3-showcase-20260714
source_refs:
  - .sdcorejs/specs/angular/2026-07-14-15-12-m3-showcase-social-preview.md
  - .sdcorejs/plans/angular/2026-07-14-15-23-m3-showcase-social-preview.md
---

# Kiến trúc M3 showcase

## Mục đích

Showcase là ứng dụng Angular standalone một trang dùng để giới thiệu `@sdcorejs/angular-material-datetime`, kiểm thử trực tiếp các tương tác chính và cung cấp tài liệu API/theming có thể tra cứu. Giao diện chỉ sử dụng Material 3; không còn nhánh trình bày hoặc hướng dẫn Material 2.

Ứng dụng được build tĩnh và triển khai lên GitHub Pages tại `https://sdcorejs.github.io/angular-material-datetime/` với base href `/angular-material-datetime/`.

## Entry points và cấu trúc

| Thành phần | Trách nhiệm |
|---|---|
| `projects/demo/src/main.ts` | Bootstrap ứng dụng standalone. |
| `projects/demo/src/app/app.config.ts` | Cấu hình router, animation và `provideSdNativeDateAdapter()`. |
| `projects/demo/src/app/app.component.ts` | Ghép navigation, hero, examples, API, theming và footer. |
| `projects/demo/src/app/sections/nav.component.ts` | Điều hướng desktop/mobile, skip link, Escape và khôi phục focus. |
| `projects/demo/src/app/sections/hero.component.ts` | Product message, cài đặt package và live datetime workbench. |
| `projects/demo/src/app/sections/examples.component.ts` | Chín ví dụ theo bốn nhóm intent và workbench được chọn. |
| `projects/demo/src/app/sections/api-reference.component.ts` | Năm bảng API có hỗ trợ cuộn ngang trên màn hình hẹp. |
| `projects/demo/src/app/sections/theming.component.ts` | Hướng dẫn M3 setup, system tokens, customization và dark theme. |
| `projects/demo/src/app/sections/footer.component.ts` | Repository, npm, license, compatibility và thông tin tác giả. |
| `projects/demo/src/styles.scss` | `mat.theme(...)`, system tokens và nền tảng responsive dùng chung. |
| `projects/demo/src/index.html` | Metadata tĩnh cho favicon, SEO, Open Graph, Twitter và JSON-LD. |
| `projects/demo/public/og-image.png` | Social card 1200×630 dùng cho Open Graph/Twitter. |

`projects/demo/src/app/app.routes.ts` không khai báo route con. Toàn bộ showcase chạy ở route `/` và dùng anchor `#examples`, `#api`, `#theming` để điều hướng trong trang.

## Luồng dữ liệu và tương tác

### Live workbench trong hero

1. `committedValue` giữ giá trị đã Apply; `draftValue` giữ thay đổi đang thao tác.
2. Calendar và `SdTimeSpinner` cập nhật draft mà chưa ghi đè committed value.
3. **Now** đưa draft về thời điểm hiện tại.
4. **Cancel** phục hồi draft từ committed value.
5. **Apply** clone draft sang committed value và cập nhật chuỗi datetime hiển thị.

Giá trị mẫu ban đầu cố định ở ngày 14/07/2026 lúc 10:30 để screenshot và kiểm thử không phụ thuộc đồng hồ hệ thống. Picker overlay thật vẫn được mở từ input sử dụng public API của package.

### Example workbench

`selectedIntent` và `selectedExample` xác định nội dung đang hiển thị. Khi người dùng chọn một mục trong example index, component cập nhật hai signal rồi đưa `#featured-example` vào viewport. Hiệu ứng cuộn tôn trọng `prefers-reduced-motion`.

Các ví dụ giữ nguyên hành vi public của package: basic, initial value, required, min/max, disabled, seconds, minute step, custom actions và two pickers.

### Responsive navigation

Menu mobile là vùng điều hướng không modal. Nút mở menu quản lý `aria-expanded`; Escape đóng menu và trả focus về trigger. Khi viewport chuyển sang desktop, listener `window:resize` đóng trạng thái menu mobile để tránh menu ẩn nhưng còn active trong DOM.

## Hợp đồng kỹ thuật

- Theme phải được khởi tạo bằng `mat.theme(...)` tại document root để CDK overlay nhận đủ `--mat-sys-*` tokens.
- Demo sử dụng `provideSdNativeDateAdapter()`; không đưa format string tùy ý vào native adapter.
- Showcase chỉ import qua public entrypoint `@sdcorejs/angular-material-datetime`, không deep import từ `src`.
- Output `closed` trong API reference có payload `SdDatetimeCloseReason`.
- Bảng API giữ wrapper có thể focus và hint cuộn trên mobile; header cell dùng `scope="col"`.
- Metadata social phải nằm trực tiếp trong `index.html` vì crawler chia sẻ link có thể không chạy JavaScript của Angular.
- Canonical và `og:image` dùng URL production tuyệt đối; favicon dùng asset tương đối để hoạt động với cả base href local và GitHub Pages.

## Accessibility

- Skip link đưa bàn phím thẳng tới Examples.
- Navigation và example selector công bố trạng thái bằng `aria-expanded`, `aria-pressed` và `aria-controls`.
- Focus ring dùng system tokens và không bị loại bỏ.
- Picker overlay duy trì semantics dialog từ thư viện.
- Code/table overflow được giữ trong vùng nội dung, không gây tràn ngang toàn trang.

## Metadata và nhận diện

Document title là `Angular Material Datetime Picker | SDCoreJS`. Description nêu rõ Material 3, Angular 19, standalone signals và date adapters. Tác giả công khai là Trần Thuận Nghĩa, email `tran.thuan.nghia@gmail.com`, profile `https://github.com/sdcorejs`.

Open Graph, Twitter card và SoftwareApplication JSON-LD cùng dùng nội dung/ảnh thống nhất. Thay đổi nội dung social cần cập nhật đồng thời ba vùng metadata để tránh preview khác nhau giữa nền tảng.

## Kiểm tra thay đổi

```powershell
npm test -- --runInBand
npm run lint
npm run build:all
npx ng build demo --configuration production --base-href=/angular-material-datetime/
```

Kiểm tra bổ sung cho showcase:

```powershell
npx jest projects/demo/src/app/sections/showcase-sections.component.spec.ts --runInBand
node --check .sdcorejs/documentation/user-guides/capture-screenshots.playwright.mjs
```

Sau deploy, cần yêu cầu crawler re-scrape URL production để xác nhận ảnh, title và description. Cache cũ của Messenger/Zalo không phản ánh lỗi runtime của Angular.

## Lỗi thường gặp

| Hiện tượng | Kiểm tra |
|---|---|
| Overlay thiếu màu hoặc typography | Bảo đảm `mat.theme(...)` nằm ở ancestor dùng chung với CDK overlay container. |
| GitHub Pages mất asset | Build đúng base href `/angular-material-datetime/` và giữ link favicon tương đối. |
| Social preview vẫn cũ | Xác nhận HTML production rồi dùng công cụ re-scrape/cache refresh của nền tảng. |
| Chọn example nhưng không thấy thay đổi | Kiểm tra `#featured-example`, `aria-controls` và `scrollIntoView`; reduced motion chỉ đổi kiểu cuộn. |
| Menu mobile còn trạng thái mở sau resize | Kiểm tra listener resize đóng menu khi vượt breakpoint desktop. |
