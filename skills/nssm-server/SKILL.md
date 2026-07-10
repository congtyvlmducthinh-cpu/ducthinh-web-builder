---
name: nssm-server
description: "Quản lý Windows service ducthinh-tools bằng NSSM — kiểm tra status, restart, start, stop, xem log"
---

# NSSM Server Management

Skill này dùng để quản lý Windows service `ducthinh-tools` chạy server Node.js cho các tool nội bộ.

## Các lệnh NSSM cơ bản

### Kiểm tra trạng thái service

```powershell
nssm status ducthinh-tools
# Trả về: SERVICE_RUNNING | SERVICE_PAUSED | SERVICE_STOPPED
```

Hoặc dùng PowerShell:

```powershell
Get-Service ducthinh-tools | Select-Object Name, Status, StartType
```

### Start / Stop / Restart

```powershell
nssm start ducthinh-tools
nssm stop ducthinh-tools
nssm restart ducthinh-tools
```

Hoặc:

```powershell
Start-Service ducthinh-tools
Stop-Service ducthinh-tools
Restart-Service ducthinh-tools
```

### Xem cấu hình service

```powershell
nssm get ducthinh-tools Application    # đường dẫn node.exe
nssm get ducthinh-tools AppDirectory   # thư mục làm việc
nssm get ducthinh-tools AppParameters  # tham số dòng lệnh
nssm dump ducthinh-tools              # tất cả cấu hình
```

### Xem log service

```powershell
# stdout + stderr log
Get-Content C:\Users\Admin\.openclaw\canvas\server.log -Tail 50
```

## Khi gặp lỗi service

### TH1: SERVICE_PAUSED
→ `nssm restart ducthinh-tools` hoặc `Restart-Service ducthinh-tools`

### TH2: SERVICE_STOPPED
→ `nssm start ducthinh-tools`

### TH3: Service không start được
1. Kiểm tra đường dẫn node.exe còn tồn tại: `nssm get ducthinh-tools Application`
2. Kiểm tra AppDirectory: `nssm get ducthinh-tools AppDirectory`
3. Chạy thử Node trực tiếp: cd vào AppDirectory, gõ đường dẫn node + server.js
4. Xem log lỗi: `Get-Content server.log -Tail 100`

### TH4: Lỗi "Access Denied"
→ Chạy PowerShell/Terminal với quyền **Administrator**

## Cấu hình NSSM chi tiết

```powershell
nssm get ducthinh-tools AppStdout
nssm get ducthinh-tools AppStderr
nssm get ducthinh-tools AppRotateFiles
nssm get ducthinh-tools AppRotateSeconds
nssm get ducthinh-tools AppRotateBytes
nssm get ducthinh-tools AppRestartDelay
nssm get ducthinh-tools AppExit
nssm get ducthinh-tools AppThrottle
nssm get ducthinh-tools AppStopMethodOverride
```

## Thông tin service

- **Tên service:** ducthinh-tools
- **Application:** C:\Program Files\nodejs\node.exe
- **AppDirectory:** C:\Users\Admin\.openclaw\canvas
- **Server file:** server.js
- **Log file:** C:\Users\Admin\.openclaw\canvas\server.log
- **User:** LocalSystem (chạy dưới quyền SYSTEM)
