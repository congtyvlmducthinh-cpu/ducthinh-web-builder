---
name: server-debug
description: "Debug server.js — kiểm tra log, tìm lỗi, fix common issues, restart service"
---

# Server Debug Skill

## Kiểm tra log lỗi

### Xem log chính

```powershell
Get-Content C:\Users\Admin\.openclaw\canvas\server.log -Tail 100
```

### Xem log trong real-time

```powershell
Get-Content C:\Users\Admin\.openclaw\canvas\server.log -Tail 20 -Wait
```

### Xem log của NSSM wrapper

```powershell
Get-Content C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\doccheck-server-service.out.log -Tail 50
Get-Content C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\doccheck-server-service.err.log -Tail 50
```

## Các lỗi thường gặp & cách fix

### 1. Service PAUSED

**Fix:** Restart service

```powershell
Restart-Service ducthinh-tools
```

Sau đó kiểm tra: `Get-Service ducthinh-tools`

### 2. Lỗi "Error: Cannot find module ..."

**Nguyên nhân:** Thiếu module hoặc path sai.

**Fix:**
1. Xem đường dẫn server: `nssm get ducthinh-tools AppDirectory`
2. Kiểm tra file server.js có tồn tại: `Test-Path C:\Users\Admin\.openclaw\canvas\server.js`
3. Kiểm tra require path có đúng không (đường dẫn tuyệt đối / tương đối)
4. Nếu cần: cd vào AppDirectory, chạy thử node server.js để xem lỗi chi tiết

### 3. Lỗi "EADDRINUSE" — port đã được dùng

**Nguyên nhân:** Có process khác đang chạy port 8080.

**Fix:**

```powershell
netstat -ano | findstr :8080
# Lấy PID, rồi:
taskkill /PID <PID> /F
# Restart service
Restart-Service ducthinh-tools
```

### 4. Lỗi "Cannot find file" 404

**Nguyên nhân:** File HTML không tồn tại trong canvas hoặc sites.

**Fix:**
Kiểm tra các đường dẫn trong router của server.js:
- `SITES_ROOT` có trỏ đúng không
- File thực sự tồn tại không: `Test-Path <path>`

### 5. Server start được nhưng không serve được trang

**Nguyên nhân thường gặp:**
- Host routing sai (HOST_ROUTES trong server.js)
- Inline HTML lỗi syntax

**Fix:**
1. Kiểm tra `HOST_ROUTES` trong server.js
2. Kiểm tra `serveLoginPage` function — inline HTML có balanced không

## Quy trình debug chuẩn

```powershell
# B1: Check service
Get-Service ducthinh-tools

# B2: Nếu không chạy, start thử
Restart-Service ducthinh-tools
Start-Sleep 2
Get-Service ducthinh-tools

# B3: Nếu vẫn lỗi, chạy thủ công
cd C:\Users\Admin\.openclaw\canvas
node server.js
# Xem lỗi in ra console

# B4: Nếu chạy tay OK, restart service
Restart-Service ducthinh-tools
```

## Restart service nhanh

```powershell
Restart-Service ducthinh-tools -Force
```

## Thông tin tham khảo

- **Service name:** ducthinh-tools
- **App Directory:** C:\Users\Admin\.openclaw\canvas
- **Server file:** server.js
- **Server port:** 8080
- **Log path:** C:\Users\Admin\.openclaw\canvas\server.log
