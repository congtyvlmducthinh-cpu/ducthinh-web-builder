const fs = require('fs');

// Collect ALL user-visible strings: static HTML text + JS single/double quoted strings that look like UI labels
const VN_RE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
const NODIAC = /\b(?:Khac|Cang|Cang di|Cang den|San pham|Xuat khau|Nhap khau|Gia ban|Gia mua|Tong gia|Thanh tien|So luong|Don vi|Bao bi|Quy cach|Tieu chuan|May chay|Hoa hong|Loi nhuan|Tam ung|Cong no|Ghi chu|Dia chi|Thanh pho|Quan|Huyen|Phuong|Xa|Ap|Duong|Khu|Thi tran|Nganh hang|Mat hang|Chung loai|Chat lieu|Mau sac|Kich thuoc|Trong luong|Dong goi|Van chuyen|Giao hang|Thanh toan|Hoa don|Bao hanh|Khach hang|Nha cung cap|Nhan vien|Don hang|Phieu xuat|Phieu nhap|Ton kho)\b/i;

function scanHtml(file) {
  const s = fs.readFileSync(file, 'utf8');
  const hits = [];
  const body = s.match(/<body[\s\S]*<\/body>/i);
  if (!body) return hits;
  const noScript = body[0].replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const noTags = noScript.replace(/<[^>]+>/g, '\n');
  noTags.split(/\r?\n/).forEach((l, i) => {
    const t = l.replace(/&nbsp;/g, ' ').trim();
    if (t.length > 1 && (VN_RE.test(t) || NODIAC.test(t))) hits.push(t.substring(0, 120));
  });
  return hits;
}

function scanJS(file) {
  const s = fs.readFileSync(file, 'utf8');
  const hits = [];
  // strip html first, keep only script blocks
  const scripts = [];
  const re = /<script>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(s)) !== null) scripts.push(m[1]);
  const js = scripts.join('\n');
  // quoted strings
  const qre = /'([^'\n]{2,120})'|"([^"\n]{2,120})"/g;
  while ((m = qre.exec(js)) !== null) {
    const str = m[1] || m[2];
    if (VN_RE.test(str) || NODIAC.test(str)) hits.push(str);
  }
  return hits;
}

for (const f of ['sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html']) {
  console.log('########## ' + f + ' ##########');
  const html = scanHtml(f);
  console.log('--- HTML text nodes (' + html.length + ') ---');
  html.forEach(h => console.log('  ' + h));
  const js = scanJS(f);
  console.log('--- JS strings (' + js.length + ') ---');
  js.forEach(h => console.log('  ' + h));
}
