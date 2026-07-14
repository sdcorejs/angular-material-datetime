# UAT Checklist - M3 Showcase và Social Preview

| Scenario | Steps | Expected Result | Owner | Status |
|---|---|---|---|---|
| Hero workbench | Chọn ngày/giờ, dùng Cancel rồi Apply | Cancel phục hồi committed value; Apply xác nhận draft | QC | pass local |
| Picker overlay | Mở picker từ input, dùng Now/Cancel/Apply | Dialog accessible và actions hoạt động | QC | pass local |
| Example selection | Chọn từng intent và một example phía dưới | Workbench đổi đúng và được đưa vào viewport | QC | pass local |
| Mobile navigation | Mở menu, nhấn Escape, resize sang desktop | Focus được phục hồi; menu không còn trạng thái mở | QC | pass local |
| Responsive layout | Kiểm tra desktop, tablet, mobile | Không page overflow, clip control hoặc overlap | PO/QC | pending final acknowledgement |
| Metadata build | Build với Pages base href, mở built `index.html` | Base href, favicon, canonical và OG URLs đúng | QC | pending final gate |
| Social crawler | Deploy rồi re-scrape production URL | Có image, title và description trong preview | PO/QC | pending deploy |
