import fs from 'fs';
let vi = fs.readFileSync('vi.html', 'utf-8');
let pos = 0;
while ((pos = vi.indexOf('setMarket(', pos)) >= 0) {
  console.log('at', pos, ':', vi.substring(pos, pos+40));
  pos++;
}
// Also check onload handler
let initIdx = vi.indexOf('init()');
if (initIdx < 0) initIdx = vi.indexOf('initApp()');
console.log('init call:', initIdx, vi.substring(initIdx, initIdx+40));

// Check for onload or DOMContentLoaded
let loadIdx = vi.indexOf('DOMContentLoaded');
if (loadIdx < 0) loadIdx = vi.indexOf('onload');
console.log('load handler:', loadIdx, loadIdx >= 0 ? vi.substring(loadIdx, loadIdx+40) : 'none');
