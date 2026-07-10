var fs = require('fs');
var path = 'C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder';

// === 1. SỬA skills/web/SKILL.md ===
var f = path + '/skills/web/SKILL.md';
var h = fs.readFileSync(f, 'utf8');
h = h.replace(
  '- **1 file là xong:** mỗi tool = 1 file `sites/{tool-name}/index.html`',
  '- **1 file cho tool nh\u1ecf (< 50KB). File \u2265 50KB \u2192 split CSS ra .css, JS ra .js, data ra JSON ri\u00eang.**\n' +
  '  Layout \u0111\u1ec1 xu\u1ea5t cho tool l\u1edbn:\n' +
  '  ```\n' +
  '  sites/{tool-name}/\n' +
  '    index.html      (khung HTML + inline critical CSS)\n' +
  '    app.js          (to\u00e0n b\u1ed9 logic JS)\n' +
  '    style.css       (ph\u1ea7n CSS kh\u00f4ng critical)\n' +
  '    data/           (d\u1eef li\u1ec7u JSON)\n' +
  '    i18n/           (b\u1ea3n d\u1ecbch n\u1ebfu multi-lang)\n' +
  '  ```'
);
fs.writeFileSync(f, h, 'utf8');
console.log('1. SKILL.md \u2014 file size policy updated');

// === 2. THÊM section Validation vào cuối SKILL.md ===
var valSection = 
'\n---\n\n' +
'## 11. \uD83D\uDEE1\uFE0F Validation Rules \u2014 B\u1eaeT BU\u1ed8C tr\u01b0\u1edbc m\u1ed7i commit\n\n' +
'> M\u1ecdi thay \u0111\u1ed5i code PH\u1ea2I \u0111\u01b0\u1ee3c validate tr\u01b0\u1edbc khi commit. KH\u00d4NG commit n\u1ebfu validation fail.\n\n' +
'### 11.1 CRLF / LF Normalization\n\n' +
'**Nguy\u00ean nh\u00e2n:** File d\u00f9ng `\\r\\n` (CRLF) kh\u00e1c `\\n` (LF) l\u00e0m `.replace()` trong script fails silent.\n\n' +
'**Quy t\u1eafc:**\n' +
'- Code m\u1edbi t\u1ea1o: **lu\u00f4n d\u00f9ng LF (`\\n`)**\n' +
'- Khi s\u1eeda file c\u0169: **chu\u1ea9n ho\u00e1 v\u1ec1 LF tr\u01b0\u1edbc khi thao t\u00e1c**:\n' +
'  ```js\n' +
'  h = h.replace(/\\r\\n/g, \'\\n\');\n' +
'  ```\n' +
'- Khi vi\u1ebft file: **ghi v\u1edbi \'utf8\', kh\u00f4ng th\u00eam CRLF**\n\n' +
'### 11.2 Balanced Braces Check\n\n' +
'Ki\u1ec3m tra `{` = `}` v\u00e0 `[` = `]`:\n' +
'```js\n' +
'var opens = (code.match(/{/g) || []).length;\n' +
'var closes = (code.match(/}/g) || []).length;\n' +
'if (opens !== closes) { console.error(\'FAIL: \' + opens + \' { vs \' + closes + \' }\'); process.exit(1); }\n' +
'```\n\n' +
'### 11.3 Balanced HTML Tags Check\n\n' +
'```js\n' +
'var openDivs = (html.match(/<div[^>]*>/g) || []).length;\n' +
'var closeDivs = (html.match(/<\\/div>/g) || []).length;\n' +
'if (openDivs !== closeDivs) { console.error(\'FAIL: div imbalance\'); process.exit(1); }\n' +
'```\n\n' +
'### 11.4 JS Syntax Check\n\n' +
'```bash\n' +
'node --check file.js\n' +
'```\n\n' +
'### 11.5 String Replacement Fallback\n\n' +
'KHI D\u00d9NG `file.replace(old, new)`:\n' +
'- **Lu\u00f4n ki\u1ec3m tra k\u1ebft qu\u1ea3:** n\u1ebfu k\u1ebft qu\u1ea3 gi\u1ed1ng input \u2192 warn + h\u1ecfi abort\n' +
'- **Lu\u00f4n c\u00f3 fallback CRLF:** th\u1eed `/\\r?\\n/` n\u1ebfu LF fails\n' +
'- **Lu\u00f4n in log:** `console.log(\'REPLACE: match found \u2192 OK\')`\n';

fs.appendFileSync(f, valSection, 'utf8');
console.log('2. SKILL.md \u2014 validation section added');

// === 3. SỬA AGENTS.md ===
var f2 = path + '/AGENTS.md';
var h2 = fs.readFileSync(f2, 'utf8');
h2 = h2.replace(
  '5. **Push l\u00ean GitHub**: `git push`',
  '5. **Push l\u00ean GitHub**: `git push`\n' +
  '6. **Validate** (b\u1eaft bu\u1ed9c tr\u01b0\u1edbc commit):\n' +
  '   - `node --check file.js` \u2014 ki\u1ec3m tra syntax JS\n' +
  '   - \u0110\u1ebfm `{` vs `}` \u2014 ph\u1ea3i b\u1eb1ng nhau (d\u00f9ng validate.js)\n' +
  '   - \u0110\u1ebfm `<div>` vs `</div>` \u2014 ph\u1ea3i b\u1eb1ng nhau\n' +
  '   - Ki\u1ec3m tra CRLF: file d\u00f9ng LF, kh\u00f4ng CRLF\n' +
  '   - N\u1ebfu d\u00f9ng string replace: ki\u1ec3m tra k\u1ebft qu\u1ea3 kh\u00e1c input'
);
fs.writeFileSync(f2, h2, 'utf8');
console.log('3. AGENTS.md updated');

// === 4. SỬA SOUL.md ===
var f3 = path + '/SOUL.md';
var h3 = fs.readFileSync(f3, 'utf8');
h3 = h3.replace(
  '## GIT \u2014 QUY T\u1eaeC S\u1ed0 1',
  '## CODE \u2014 QUY T\u1eaeC C\u1ee8NG\n\n' +
  '- **Lu\u00f4n normalise CRLF \u2192 LF** tr\u01b0\u1edbc khi thao t\u00e1c file\n' +
  '- **Lu\u00f4n ki\u1ec3m tra k\u1ebft qu\u1ea3 replace**: n\u1ebfu input === output \u2192 b\u00e1o l\u1ed7i, kh\u00f4ng ignore\n' +
  '- **Lu\u00f4n validate syntax** tr\u01b0\u1edbc commit (braces, divs, JS parse)\n' +
  '- **Split file** n\u1ebfu HTML > 50KB\n\n' +
  '## GIT \u2014 QUY T\u1eaeC S\u1ed0 1'
);
fs.writeFileSync(f3, h3, 'utf8');
console.log('4. SOUL.md updated');

// === 5. SỬA skills/git-workflow/SKILL.md ===
var f4 = path + '/skills/git-workflow/SKILL.md';
var h4 = fs.readFileSync(f4, 'utf8');
h4 = h4.replace(
  '5. Push l\u00ean GitHub',
  '5. Validate (b\u1eaft bu\u1ed9c)\n' +
  '\n' +
  'Ki\u1ec3m tra syntax JS: `node --check app.js`\n' +
  '\n' +
  'Ki\u1ec3m tra balanced braces: `node -e "var h=require(\'fs\').readFileSync(\'index.html\',\'utf8\');console.log((h.match(/{/g)||[]).length===(h.match(/}/g)||[]).length)"`\n' +
  '\n' +
  '6. Push l\u00ean GitHub'
);
fs.writeFileSync(f4, h4, 'utf8');
console.log('5. git-workflow/SKILL.md updated');

console.log('\n\u2705 ALL 5 FILES DONE');
