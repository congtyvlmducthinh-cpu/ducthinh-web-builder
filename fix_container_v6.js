var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

console.log('=== BEFORE ===');
// Show lines 385-395
for(var i=384;i<396;i++){console.log('L'+(i+1)+': |'+lines[i].substring(0,60)+'|');}
console.log('');
// Show lines 458-470
for(var i=457;i<472;i++){console.log('L'+(i+1)+': |'+lines[i].substring(0,60)+'|');}
console.log('');
// Show lines 510-520
for(var i=509;i<522;i++){console.log('L'+(i+1)+': |'+lines[i].substring(0,60)+'|');}

// 1. Remove L389 (premature container close)
var removedFirst = lines.splice(388, 1)[0];
console.log('\nRemoved L389: |'+removedFirst.trim()+'|');

// 2. Remove the </div> after manage-panel (was L463, now at L462)
var removedSecond = lines.splice(461, 1)[0];
console.log('Removed orphan: |'+removedSecond.trim()+'|');

// 3. Find pwModal
var pwIdx=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('pwModal')>=0){pwIdx=i;break;}}
console.log('pwModal at L'+(pwIdx+1)+': |'+lines[pwIdx].substring(0,60)+'|');

// Insert container close before pwModal
lines.splice(pwIdx, 0, '</div> <!-- .container -->');

// Verify
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
var minD=999;
var problems=[];
for(var i=bs;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
  if(d<minD){minD=d;problems.push('NEG at L'+(i+1)+' d='+d);}
}
console.log('\n=== RESULTS ===');
console.log('Final depth: '+d+', minimum: '+minD);
problems.forEach(function(p){console.log(p);});

// Write
fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('\nWritten to '+path);
