var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

console.log('=== BEFORE ===');
// Show key lines
for(var i=385;i<395;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');
for(var i=459;i<466;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');
for(var i=510;i<520;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');

// Line 389 (index 388) = premature </div> that closes container
// This line has just '</div>'
// It should be REMOVED

// Line 463 (index 462) = orphan </div> after manage-panel close
// Should be REMOVED

// Line 514 (index 513) = orphan </div> after fobptsc-panel close
// Should be REMOVED

// Remove premature container close at L389
lines[388]='<!-- PREMATURE CONTAINER CLOSE REMOVED -->';

// Remove orphan </div> at L463
lines[462]='<!-- ORPHAN CLOSE AFTER MANAGE-PANEL REMOVED -->';

// Remove orphan </div> at L514
lines[513]='<!-- ORPHAN CLOSE AFTER FOBPTSC-PANEL REMOVED -->';

// Add proper close before pwModal
// pwModal is at L516 (index 515): '<div class="modal-overlay" id="pwModal">'
// Insert a line before it: </div> <!-- .container -->
lines.splice(515, 0, '</div> <!-- .container -->');

console.log('\n=== AFTER ===');
for(var i=385;i<395;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');
for(var i=459;i<466;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');
for(var i=510;i<522;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');
console.log('---');

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('\n=== Written ===');
