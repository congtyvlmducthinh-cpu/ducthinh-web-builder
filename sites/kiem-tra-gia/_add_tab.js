const fs = require('fs');
const base = 'C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder\\sites\\kiem-tra-gia\\';

const files = ['vi.html', 'en.html', 'zh.html', 'index.html'];

const btnParts = {
  'vi.html': { oldPart: 'data-tab="apps" onclick="switchTab(\'apps\')">', newLabel: '\uD83D\uDCC4 B\u00E1o gi\u00E1', newSub: 'L\u00EAn b\u00E1o gi\u00E1' },
  'en.html': { oldPart: 'data-tab="apps" onclick="switchTab(\'apps\')">', newLabel: '\uD83D\uDCC4 Quotation', newSub: 'Create quotation' },
  'zh.html': { oldPart: 'data-tab="apps" onclick="switchTab(\'apps\')">', newLabel: '\uD83D\uDCC4 \u62A5\u4EF7', newSub: '\u521B\u5EFA\u62A5\u4EF7' },
  'index.html': { oldPart: 'data-tab="apps" onclick="switchTab(\'apps\')">', newLabel: '\uD83D\uDCC4', newSub: 'Quotation' }
};

for (const file of files) {
  const path = base + file;
  let c = fs.readFileSync(path, 'utf8');
  const p = btnParts[file];
  const idx = c.indexOf(p.oldPart);
  if (idx === -1) { console.log(file + ': NOT FOUND'); continue; }
  
  // Find the full old button
  const btnStart = c.lastIndexOf('<button', idx);
  const btnEnd = c.indexOf('</button>', idx) + '</button>'.length;
  const oldBtn = c.substring(btnStart, btnEnd);
  
  // Build new quotation button
  const newBtn = '<button class="tab-btn" data-tab="quotation" onclick="switchTab(\'quotation\')"><span>' + p.newLabel + '</span><br><small style="font-weight:400;font-size:10px;opacity:.7">' + p.newSub + '</small></button>';
  
  c = c.replace(oldBtn, newBtn + '\n' + oldBtn);
  fs.writeFileSync(path, c, 'utf8');
  console.log(file + ': OK');
}
