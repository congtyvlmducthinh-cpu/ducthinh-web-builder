var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

console.log('L389: |'+lines[388]+'|');
console.log('L463: |'+lines[462]+'|');
console.log('L514: |'+lines[513]+'|');

// Fix 1: Remove premature container close at L389 (index 388)
lines[388] = '<!-- container close MOVED to before pwModal -->';

// Fix 2: Remove orphan close after manage-panel at L463 (index 462)
lines[462] = '<!-- ORPHAN </div> REMOVED -->';

// Fix 3: Add proper container close before pwModal
// pwModal is at original L516 (index 515)
// After removing 2 lines above, the lines shift down
// But we already replaced with comments, so index 515 is still pwModal
lines.splice(515, 0, '</div> <!-- .container -->');

console.log('\nAfter pwModal insertion:');
for(var i=514;i<520;i++) console.log('L'+(i+1)+': |'+lines[i]+'|');

// Count div depth
var bodyStart=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bodyStart=i;break;}}
var insScript=false;
var d=0;
var minD=999;
for(var i=bodyStart;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){insScript=true;continue;}
  if(t.indexOf('</script>')===0){insScript=false;continue;}
  if(insScript)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
  if(d<minD) minD=d;
}
console.log('\n=== Final depth at body end: '+d+', minimum: '+minD+' ===');

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('\nWritten to '+path);
