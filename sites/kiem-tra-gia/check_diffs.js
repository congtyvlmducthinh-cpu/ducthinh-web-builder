const fs = require('fs');
const vi = fs.readFileSync('vi.html','utf8');
const en = fs.readFileSync('en.html','utf8');
const zh = fs.readFileSync('zh.html','utf8');

// Compare script blocks
let viScript = vi.match(/<script>([\s\S]*?)<\/script>/);
let enScript = en.match(/<script>([\s\S]*?)<\/script>/);
let zhScript = zh.match(/<script>([\s\S]*?)<\/script>/);
console.log('Script block lengths:', viScript?.[1].length, enScript?.[1].length, zhScript?.[1].length);

// Check en/zh labels
console.log('en has Email người:', en.includes('Email người'));
console.log('zh has Email người:', zh.includes('Email người'));
console.log('en has Ngày báo giá:', en.includes('Ngày báo giá'));
console.log('zh has Ngày báo giá:', zh.includes('Ngày báo giá'));

// Check badges in en/zh
let badgeRe = /class="badge"/g;
console.log('en badge count:', (en.match(badgeRe)||[]).length);
badgeRe = /class="badge"/g;
console.log('zh badge count:', (zh.match(badgeRe)||[]).length);

// Check validation in en/zh functions
console.log('en has quotPreviewOpen validation:', en.includes('Vui lòng nhập Tên khách hàng'));
console.log('zh has quotPreviewOpen validation:', zh.includes('Vui lòng nhập Tên khách hàng'));
console.log('en has onChange reset:', en.includes("style.borderColor"));
console.log('zh has onChange reset:', zh.includes("style.borderColor"));
