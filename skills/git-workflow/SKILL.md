---
name: git-workflow
description: "Enforce Git workflow chuẩn — branch naming, commit, merge, push, xử lý conflict, dọn dẹp"
---

# Git Workflow

Skill này enforce quy trình Git cho web-builder workspace.

## Quy trình chuẩn (BẮT BUỘC)

### 1. Kiểm tra clean trước khi code

```powershell
git status
```

Nếu có dirty file (modified/untracked):
- Stash: `git stash`
- Hoặc commit: `git add . && git commit -m "..."`

### 2. Tạo nhánh

```powershell
git checkout -b feature/ten-tool     # tính năng mới
git checkout -b fix/ten-loi          # sửa lỗi
git checkout -b refactor/ten-viec    # tái cấu trúc
```

### 3. Code và commit

```powershell
git add .
git commit -m "Mô tả ngắn gọn (tiếng Việt hoặc Anh)"
```

### 4. Về main + merge

```powershell
git checkout master
git merge feature/ten-tool
# Nếu có conflict → xử lý conflict, rồi git add + git commit
```

### 5. Validate (bắt buộc)

Kiểm tra syntax JS: `node --check app.js`

Kiểm tra balanced braces: `node -e "var h=require('fs').readFileSync('index.html','utf8');console.log((h.match(/{/g)||[]).length===(h.match(/}/g)||[]).length)"`

6. Push lên GitHub

```powershell
git push
```

## Xử lý conflict

### Conflict khi merge

```powershell
git merge feature/ten-tool
# CONFLICT hiện ra
```

Các bước xử lý:
1. Mở file bị conflict
2. Tìm `<<<<<<<`, `=======`, `>>>>>>>`
3. Giữ phần code đúng, xóa markers
4. `git add <file>` cho từng file đã fix
5. `git commit -m "Merge branch 'feature/ten-tool'"`

### Conflict khi pull

```powershell
git pull
# CONFLICT hiện ra
```

Giải pháp:
1. `git merge --abort` (huỷ merge)
2. `git stash` (cất thay đổi local)
3. `git pull` (kéo code mới)
4. `git stash pop` (áp lại thay đổi)
5. Nếu vẫn conflict → xử lý thủ công như trên

## Khi gặp lỗi

### Nhánh lỗi / code hỏng

```powershell
git checkout master          # về nhánh sạch
git branch -D feature/loi   # xoá nhánh hỏng
# Tạo nhánh mới và code lại
```

### Cần huỷ commit cuối (chưa push)

```powershell
git reset --soft HEAD~1      # giữ code
git reset --hard HEAD~1      # xoá luôn code
```

### Cần huỷ commit cuối (đã push)

```powershell
git revert HEAD              # tạo commit đảo ngược
git push
```

### Cần stash

```powershell
git stash                    # cất code tạm
git stash list               # xem danh sách stash
git stash pop                # lấy lại code mới nhất
git stash drop               # xoá stash mới nhất
```

## Kiểm tra trước khi báo done

```powershell
git status          # phải clean
git log --oneline   # kiểm tra commit message OK
```
