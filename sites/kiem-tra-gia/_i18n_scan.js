const fs = require('fs');
const VN_RE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;

// Vietnamese words WITHOUT diacritics commonly used in UI
const NODIAC = /\b(?:Khac|Cang|Cang di|Cang den|San pham|SanPham|Xuat khau|Nhap khau|Gia ban|Gia mua|Ho tro|Tong|Thanh tien|So luong|Don vi|Bao bì|Bao bi|Quy cach|Tieu chuan|May moc|Mau|Loai|Hang|Hoa don|Don hang|Khach hang|Nha cung cap|Ngay|Thang|Nam|Tấn|Tân|Thue|Phi|Loi nhuan|Hoa hong|Chiet khau|Tam ung|Cong no|Kho|Ton kho|Xuat|Nhap|DVT|Hang hoa|Ghi chu|Dia chi|Tinh|Thanh pho|Quan|Huyen|Phuong|Xa|Ap|KCN|Duong|So nha)\b/i;

function scanStaticHTML(file) {
  const s = fs.readFileSync(file, 'utf8');
  const hits = [];
  // extract text nodes in <body> excluding <script>/<style>
  const body = s.match(/<body[\s\S]*<\/body>/i);
  if (!body) return hits;
  const noScript = body[0].replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const noTags = noScript.replace(/<[^>]+>/g, ' ');
  const lines = noTags.split(/\r?\n/);
  lines.forEach((l, i) => {
    const t = l.replace(/&nbsp;/g, ' ').trim();
    if (t.length > 1 && (VN_RE.test(t) || NODIAC.test(t))) {
      hits.push({ line: i + 1, text: t.substring(0, 160) });
    }
  });
  return hits;
}

function scanNoDiacriticJS(file) {
  const s = fs.readFileSync(file, 'utf8');
  const hits = [];
  // quoted strings only, in JS-ish context: look for Vietnamese no-diacritics words inside quotes
  const re = /'([^']{2,80})'|"([^"]{2,80})"/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const str = m[1] || m[2];
    if (NODIAC.test(str)) {
      const lineNo = s.substring(0, m.index).split(/\r?\n/).length;
      hits.push({ line: lineNo, text: str });
    }
  }
  return hits;
}

for (const f of ['sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html']) {
  console.log('===== ' + f + ' STATIC HTML TEXT =====');
  scanStaticHTML(f).forEach(h => console.log('  L' + h.line + ': ' + h.text));
  console.log('===== ' + f + ' JS QUOTED NO-DIACRITIC VIETNAMESE =====');
  scanNoDiacriticJS(f).forEach(h => console.log('  L' + h.line + ': ' + h.text));
}
