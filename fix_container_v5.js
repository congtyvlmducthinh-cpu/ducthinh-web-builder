var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

// 1. Remove L389 (premature container close)
lines.splice(388, 1);
console.log('Removed L389 (premature container close)');

// 2. Remove L463 (orphan container close, now at L462 after above shift)
lines.splice(461, 1);
console.log('Removed L462 (orphan container close)');

// 3. Find pwModal (shifted by -2 now)
var pwIdx=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('pwModal')>=0){pwIdx=i;break;}}
console.log('pwModal at L'+(pwIdx+1));

// 4. Insert container close before pwModal
lines.splice(pwIdx, 0, '</div> <!-- .container -->');
console.log('Inserted container close before pwModal');

// 5. Verify: count div depth
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
var minD=999;
for(var i=bs;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
  if(d<minD){minD=d;console.log('NEGATIVE at L'+(i+1)+' d='+d+' '+t.substring(0,50));}
}
console.log('Final depth: '+d+', minimum: '+minD);

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Written to '+path);
