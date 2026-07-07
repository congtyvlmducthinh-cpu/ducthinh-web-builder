const fs = require('fs');

// Fix vi.html - already correct, but just ensure
let vi = fs.readFileSync('vi.html', 'utf8');
let pat = /<div class="lang-switcher">.*?<\/div>/;
let match = vi.match(pat);
if (match) {
  // vi is already correct, but let's make sure
  let correct = '<div class="lang-switcher"><a href="vi.html" class=" active">VI</a><a href="en.html" class="">EN</a><a href="zh.html" class="">ZH</a></div>';
  if (match[0] !== correct) {
    vi = vi.replace(pat, correct);
    fs.writeFileSync('vi.html', vi, 'utf8');
    console.log('vi.html fixed');
  } else {
    console.log('vi.html already correct');
  }
}

// Fix en.html
let en = fs.readFileSync('en.html', 'utf8');
match = en.match(pat);
if (match) {
  let correct = '<div class="lang-switcher"><a href="vi.html" class="">VI</a><a href="en.html" class=" active">EN</a><a href="zh.html" class="">ZH</a></div>';
  if (match[0] !== correct) {
    en = en.replace(pat, correct);
    fs.writeFileSync('en.html', en, 'utf8');
    console.log('en.html fixed');
  } else {
    console.log('en.html already correct');
  }
}

// Fix zh.html
let zh = fs.readFileSync('zh.html', 'utf8');
match = zh.match(pat);
if (match) {
  let correct = '<div class="lang-switcher"><a href="vi.html" class="">VI</a><a href="en.html" class="">EN</a><a href="zh.html" class=" active">ZH</a></div>';
  if (match[0] !== correct) {
    zh = zh.replace(pat, correct);
    fs.writeFileSync('zh.html', zh, 'utf8');
    console.log('zh.html fixed');
  } else {
    console.log('zh.html already correct');
  }
}

// Verify
console.log('\nVerification:');
['vi.html','en.html','zh.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(pat);
  console.log(f + ': ' + (m ? m[0] : 'NOT FOUND'));
});
