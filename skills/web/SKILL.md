---
name: web
description: "Xây dựng website tool nội bộ bằng HTML/CSS/JS thuần — mobile-first, responsive, SEO cơ bản, performance, accessibility"
---

# 🏗️ Web Development Skill (Nâng cao)

> Hướng dẫn build website HTML/CSS/JS thuần — chuẩn production, responsive, accessible, nhanh và đẹp.

---

## Nguyên tắc chung

- **HTML/CSS/JS thuần** — KHÔNG dùng framework, không cần build tool
- **1 file cho tool nhỏ (< 50KB). File ≥ 50KB → split CSS ra .css, JS ra .js, data ra JSON riêng.**
  Layout đề xuất cho tool lớn:
  ```
  sites/{tool-name}/
    index.html      (khung HTML + inline critical CSS)
    app.js          (toàn bộ logic JS)
    style.css       (phần CSS không critical)
    data/           (dữ liệu JSON)
    i18n/           (bản dịch nếu multi-lang)
  ```
- **Giao diện tiếng Việt** (trừ yêu cầu tiếng Anh)
- **Mobile-first** — viết cho mobile trước, scale lên desktop sau
- **Mọi thao tác code đều qua Git workflow** (branch → commit → merge → push)

---

## 1. HTML Structure — Chuẩn SEO & Accessibility

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tên Tool — Đức Thịnh</title>
  <meta name="description" content="Mô tả ngắn gọn tool này làm gì">
  <meta name="theme-color" content="#0f172a">
  <!-- Open Graph (cho social preview) -->
  <meta property="og:title" content="Tên Tool">
  <meta property="og:description" content="Mô tả ngắn gọn">
  <meta property="og:type" content="website">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
  <style>
    /* CSS ở đây — inline critical styles */
  </style>
</head>
<body>
  <header>
    <nav><!-- Semantic nav --></nav>
  </header>
  <main>
    <!-- Nội dung chính — chỉ 1 <main>, 1 <h1> -->
    <h1>Tiêu đề trang</h1>
  </main>
  <footer><!-- Thông tin footer --></footer>

  <script>
    // JS ở đây — defer mặc định vì ở cuối body
  </script>
</body>
</html>
```

### ⚠️ Quy tắc HTML cứng

| Rule | Giải thích |
|------|-----------|
| `<h1>` duy nhất | Là tiêu đề trang, không phải công cụ styling |
| Dùng semantic tags | `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` — hỗ trợ screen reader & SEO |
| `<button>` cho action, `<a>` cho navigation | Không dùng `<div>` với click handler |
| External link: `rel="noopener"` | Tránh lỗ hổng bảo mật với `target="_blank"` |
| `<html lang="vi">` | Screen reader đọc đúng giọng |
| Thiếu `<!DOCTYPE html>` | Trigger quirks mode — layout hỏng |

---

## 2. CSS — Production-grade Styling

### CSS Variables — Design Tokens

```css
:root {
  /* Core palette */
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-gradient: linear-gradient(135deg, #2563eb, #7c3aed);

  /* Surface & backgrounds */
  --bg: #0f172a;
  --surface: rgba(30, 41, 59, 0.8);
  --surface-hover: rgba(30, 41, 59, 0.95);

  /* Text */
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --text-inverse: #0f172a;

  /* Borders */
  --border: rgba(30, 41, 59, 0.5);
  --border-light: rgba(255, 255, 255, 0.06);

  /* Spacing scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.2);
  --shadow-glow: 0 0 20px rgba(37, 99, 235, 0.3);

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### CSS Reset + Global

```css
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%; /* prevent auto-zoom on orientation change */
}

body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
}
a:hover { color: var(--primary-hover); }

button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
}
```

### ⚠️ Quy tắc CSS cứng

| Rule | Giải thích |
|------|-----------|
| **KHÔNG dùng `!important`** | Fix specificity thay vì dùng !important |
| **Dùng relative units** | `rem`, `em`, `%` cho text — tôn trọng font-size trình duyệt |
| **Flexbox cho 1D, Grid cho 2D** | Đừng ép việc này |
| **Touch targets ≥ 44×44px** | Ngón tay không chính xác — nút nhỏ gây khó chịu |
| **Contrast ratio ≥ 4.5:1** | Dùng WebAIM contrast checker |
| **Test khi tắt CSS** | Nội dung vẫn đọc được ở plain HTML |

---

## 3. Responsive — Mobile-First

### Pattern chuẩn

```css
/* === MOBILE FIRST === */

/* Mobile: mặc định */
.container {
  width: 100%;
  padding: var(--space-md);
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Tablet (≥ 640px) */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    margin: 0 auto;
    padding: var(--space-lg);
  }
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Wide (≥ 1280px) */
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
}
```

### ⚠️ Kiểm tra responsive

- Test ở **320px** — lỗi scroll ngang là critical bug
- Dùng **Chrome DevTools device toolbar** kéo thử mọi kích thước
- Test trên **thiết bị thật** — DevTools throttle không giống real world

---

## 4. JavaScript — Best Practices

```javascript
'use strict';

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  // Setup: bind events, fetch data, render UI
}

// Arrow functions cho callbacks
const handleClick = (e) => {
  e.preventDefault();
  // xử lý
};

// Async/await với for...of (KHÔNG forEach)
async function fetchData(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    const data = await res.json();
    // xử lý từng cái
  }
}
// Hoặc chạy song song
async function fetchAll(urls) {
  const results = await Promise.all(urls.map(u => fetch(u).then(r => r.json())));
}

document.querySelector('.btn-submit')?.addEventListener('click', handleClick);
```

### ⚠️ Quy tắc JS cứng

| Rule | Giải thích |
|------|-----------|
| **Dùng `===` không `==`** | `"0" == false` là `true`, `"0" === false` là `false` |
| **forEach không await được** | Dùng `for...of` hoặc `Promise.all` |
| **Form luôn `preventDefault`** | Không thì page reload |
| **Giả định JS có thể tắt** | Core content vẫn chạy được không JS (progressive enhancement) |
| **CORS là server-side** | Không fix được từ client |

---

## 5. Performance

### Images
- **Định dạng hiện đại:** WebP / AVIF (thay PNG/JPG)
- **Set explicit `width` + `height`** — chống layout shift (CLS)
- **`loading="lazy"`** cho ảnh dưới fold
- Dùng `<picture>` cho responsive images

```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Mô tả" width="1200" height="600" loading="lazy">
</picture>
```

### CSS & Fonts
- **Inline critical CSS** trong `<head>` — defer phần còn lại
- **`font-display: swap`** — chống FOIT (flash of invisible text)
- **Preload font chính**

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.woff2') format('woff2');
  font-display: swap;
}
```

### Third-party scripts
- Dùng `async` hoặc `defer` — analytics/chat/widget thêm 500ms+
- Audit định kỳ — không giữ script chết

### Đo lường
- **Lighthouse** trong incognito mode (extensions gây nhiễu)
- Focus: **LCP** (≤ 2.5s), **CLS** (≤ 0.1), **FID** (≤ 100ms)

---

## 6. Accessibility (a11y)

### Checklist tối thiểu

- ✅ Mọi `<img>` có `alt` text — `alt=""` cho decorative, mô tả cho meaningful
- ✅ Color contrast ≥ 4.5:1 body text — [WebAIM checker](https://webaim.org/resources/contrastchecker/)
- ✅ Form inputs có `<label>` — placeholder không thay thế được label
- ✅ Keyboard navigation — Tab qua mọi interactive element
- ✅ Heading hierarchy — `<h1>` → `<h2>` → `<h3>`, không skip level
- ✅ Focus ring visible — `:focus-visible` cho keyboard users

```css
/* Focus ring đẹp */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Bỏ ring cho mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 7. Design System — Token Library

Khi cần giao diện đẹp, mượn design tokens từ các hệ thống nổi tiếng (tham khảo skill `popular-web-designs` với 54 template đầy đủ).

### Stripe — Landing page SaaS

```css
:root {
  --primary: #635bff;
  --primary-gradient: linear-gradient(135deg, #635bff, #00d4ff);
  --text-dark: #0a2540;
  --text-body: #425466;
  --bg: #ffffff;
  --bg-section: #f6f9fc;
  --font: 'Source Sans 3', system-ui, sans-serif;
  --shadow-card: 0 2px 5px rgba(0,0,0,0.05);
  --radius: 12px;
}
/* Display: 72px weight 300, H1: 48px weight 400 */
```

### Linear — Dark mode dev tool

```css
:root {
  --primary: #5e6ad2;
  --bg: #1a1a1a;
  --surface: #222222;
  --surface-hover: #2a2a2a;
  --text: #ffffff;
  --text-secondary: #8a8a8a;
  --border: rgba(255,255,255,0.06);
  --font: 'Geist', 'Inter', system-ui, sans-serif;
  --shadow-popover: 0px 4px 24px rgba(0,0,0,0.4);
  --radius: 6px;
}
```

### Notion — Warm minimal docs

```css
:root {
  --primary: #0075de;
  --text: rgba(0,0,0,0.95);
  --text-secondary: rgba(0,0,0,0.5);
  --bg: #ffffff;
  --bg-warm: #f6f5f4;
  --border: rgba(0,0,0,0.1);
  --font: 'Inter', system-ui, sans-serif;
  --shadow-card: rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2.025px 7.84688px, rgba(0,0,0,0.02) 0px 0.8px 2.925px, rgba(0,0,0,0.01) 0px 0.175px 1.04062px;
}
/* Display: 64px weight 700 letter-spacing -2.125px */
```

### Vercel — Black-white precision

```css
:root {
  --text: #000000;
  --bg: #ffffff;
  --surface: #fafafa;
  --accent: #0070f3;
  --border: rgba(0,0,0,0.08);
  --font: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', monospace;
  --shadow-card: 0 2px 8px rgba(0,0,0,0.06);
  --radius: 6px;
}
```

> 📂 Xem full 54 design systems trong skill `popular-web-designs`: Stripe, Linear, Notion, Vercel, Apple, GitHub, Spotify, Figma, Airtable, Supabase, Cursor, MongoDB...

---

## 8. Common Mistakes — Tránh ngay

| ❌ Sai lầm | ✅ Sửa |
|-----------|--------|
| Thiếu favicon → 404 spam server log | Thêm favicon, ít nhất SVG inline |
| Quên `<html lang="vi">` | Screen reader đọc sai giọng |
| Hardcoded `http://` trên HTTPS site | Dùng `https://` hoặc protocol-relative `//` |
| Giả định JS luôn available | Core content chạy không JS |
| Quên print styles | Thêm `@media print` nếu cần |
| `forEach` + async | Dùng `for...of` |
| Form không `preventDefault` | Gọi `e.preventDefault()` |

---

## 9. Pre-launch Checklist

- [ ] Form submit hoạt động (test thật)
- [ ] 404 page tồn tại và hữu ích
- [ ] Open Graph tags hoạt động (test Facebook/Twitter debugger)
- [ ] Lighthouse score ≥ 90 (Performance, Accessibility, SEO)
- [ ] Test responsive: 320px, 768px, 1024px, 1280px
- [ ] Scroll ngang = 0 — 100% width
- [ ] Tab qua mọi element — keyboard navigation
- [ ] Images lazy-load + dimensions set
- [ ] Console = 0 errors
- [ ] Git commit & push 🚀

---

## 10. Khi cần giúp thêm

- **Debug server / restart NSSM** → skill `server-debug` hoặc `nssm-server`
- **Git conflict / push lỗi** → skill `git-workflow`
- **Design system tokens** → skill `popular-web-designs` (54 templates)

---

## 11. 🛡️ Validation Rules — BẮT BUỘC trước mỗi commit

> Mọi thay đổi code PHẢI được validate trước khi commit. KHÔNG commit nếu validation fail.

### 11.1 CRLF / LF Normalization

**Nguyên nhân:** File dùng `\r\n` (CRLF) khác `\n` (LF) làm `.replace()` trong script fails silent.

**Quy tắc:**
- Code mới tạo: **luôn dùng LF (`\n`)**
- Khi sửa file cũ: **chuẩn hoá về LF trước khi thao tác**:
  ```js
  h = h.replace(/\r\n/g, '\n');
  ```
- Khi viết file: **ghi với 'utf8', không thêm CRLF**

### 11.2 Balanced Braces Check

Kiểm tra `{` = `}` và `[` = `]`:
```js
var opens = (code.match(/{/g) || []).length;
var closes = (code.match(/}/g) || []).length;
if (opens !== closes) { console.error('FAIL: ' + opens + ' { vs ' + closes + ' }'); process.exit(1); }
```

### 11.3 Balanced HTML Tags Check

```js
var openDivs = (html.match(/<div[^>]*>/g) || []).length;
var closeDivs = (html.match(/<\/div>/g) || []).length;
if (openDivs !== closeDivs) { console.error('FAIL: div imbalance'); process.exit(1); }
```

### 11.4 JS Syntax Check

```bash
node --check file.js
```

### 11.5 String Replacement Fallback

KHI DÙNG `file.replace(old, new)`:
- **Luôn kiểm tra kết quả:** nếu kết quả giống input → warn + hỏi abort
- **Luôn có fallback CRLF:** thử `/\r?\n/` nếu LF fails
- **Luôn in log:** `console.log('REPLACE: match found → OK')`
