const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Remove the updateDataInfo function entirely
let idx = c.indexOf('function updateDataInfo()');
if (idx >= 0) {
  // Find the end of this function by looking for the next function or significant code
  let endIdx = c.indexOf('function ', idx + 20);
  if (endIdx < 0) endIdx = c.indexOf('// ---', idx);
  if (endIdx < 0) endIdx = c.length;
  
  // Find the closing brace
  let braceCount = 0;
  let found = false;
  for (let i = idx; i < endIdx; i++) {
    if (c[i] === '{') braceCount++;
    if (c[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        // Function ends here - cut from the function name to after the closing brace
        // But keep everything before the function declaration
        // Find the actual line start
        let lineStart = idx;
        while (lineStart > 0 && c[lineStart-1] !== '\n') lineStart--;
        c = c.substring(0, lineStart) + '\n' + c.substring(i + 1);
        found = true;
        break;
      }
    }
  }
  if (!found) {
    // Fallback: just comment it out
    console.log('Could not find function end, commenting out');
    c = c.replace('function updateDataInfo()', '/*function updateDataInfo()');
    let closeIdx = c.indexOf('function ', idx + 20);
    if (closeIdx > 0) {
      c = c.substring(0, closeIdx) + '*/' + c.substring(closeIdx);
    }
  }
}

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Remove any call to updateDataInfo
c = fs.readFileSync('vi.html', 'utf8');
c = c.replace(/updateDataInfo\(\)/g, '');
fs.writeFileSync('vi.html', c, 'utf8');
console.log('Calls removed.');

// Syntax check
let sc = c.match(/<script>([\s\S]*?)<\/script>/g) || [];
for(let i=0;i<sc.length;i++){
  try{ new Function(sc[i].replace(/<script>|<\/script>/g,'')); }
  catch(e){ console.log('SYNTAX ERROR in block',i,':',e.message); }
}
console.log('Syntax check done.');
