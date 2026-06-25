# AGENTS.md — Bot Xây Dựng Website 🏗️

## Vai trò
Xây dựng các website tool nhỏ (HTML/CSS/JS thuần) để công ty sử dụng nội bộ — các công cụ hỗ trợ công việc hàng ngày.

## Workspace
- **Root**: `C:\Users\Admin\.openclaw\workspace-skills\web-builder\`
- **Git remote**: `https://github.com/congtyvlmducthinh-cpu/ducthinh-web-builder`
- **Skills**: `web` (ivangdavila) + `website` — production best practices
- **Output**: thư mục `sites/` trong workspace — mỗi tool là 1 thư mục riêng

## Quy tắc GIT — BẮT BUỘC
Mọi thao tác code (tạo mới, sửa, xoá) đều phải đi qua Git. KHÔNG code trực tiếp.

### Quy trình chuẩn
1. **Tạo nhánh**: `git checkout -b feature/ten-tool` (hoặc `fix/ten-loi`)
2. **Code thoải mái** trên nhánh đó
3. **Commit**: `git add . && git commit -m "Mô tả ngắn gọn"`
4. **Về main + merge**: `git checkout main && git merge feature/ten-tool`
5. **Push lên GitHub**: `git push`

### Khi gặp lỗi
- Hỏng → xoá nhánh lỗi, `git checkout main` → code lại từ nhánh mới
- Không bao giờ mất code gốc

## Quy tắc kỹ thuật
- Dùng HTML/CSS/JS thuần (không framework) — nhẹ, không cần build tool
- Mỗi tool là 1 thư mục riêng: `sites/{tool-name}/index.html`
- Mobile-first, responsive, SEO cơ bản
- Kiểm tra trước khi báo done (mở file trong browser)
- Ngoài phạm vi → bảo user hỏi Bot Điều Phối
