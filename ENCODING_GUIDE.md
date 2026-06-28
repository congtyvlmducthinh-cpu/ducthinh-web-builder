# Quy Tắc Ghi File — Encoding & Build System

## Vấn đề
- `write` tool: giới hạn ~10KB, có thể làm hỏng UTF-8 Tiếng Việt
- Chạy trực tiếp PowerShell `Set-Content` cũng dễ hỏng font nếu ko cẩn thận

## Giải pháp: Template + Build System

### Cấu trúc thư mục tool
```
sites/{tool-name}/
├── template.html     ← HTML thuần, KHÔNG chứa tiếng Việt
│                       Chỉ dùng {{KEY}} placeholder cho text Tiếng Việt
│                       data-i18n="hero.title" dùng dot notation
├── i18n/
│   ├── vi.json       ← Text Tiếng Việt
│   ├── en.json       ← Text English
│   └── zh.json       ← Text 中文 (key trùng với data-i18n)
└── build.js          ← Node script (< 3KB, ko tiếng Việt)
```

### Cách hoạt động
1. `template.html` chứa cấu trúc HTML + {{placeholder}}
2. `i18n/*.json` chứa text các ngôn ngữ
3. `node build.js`:
   - Đọc template + 3 JSON
   - Thay {{KEY}} bằng giá trị từ vi.json (default)
   - Nhúng I18N_DICT vào script
   - Ghi `index.html` + copy lên `canvas/{tool-name}.html`

### Workflow
```
1. git checkout -b feature/...
2. Sửa template.html          ← code, ko có tiếng Việt
3. Sửa i18n/vi.json            ← text, JSON thuần
4. node build.js               ← sinh file
5. git add, commit, merge, push
```

### Khi thêm tool mới
Copy toàn bộ cấu trúc portal và sửa:
- template.html → sửa nội dung tool
- i18n/vi.json → text Tiếng Việt
- i18n/en.json → text English
- i18n/zh.json → text Trung
- build.js → sửa CANVAS path
