var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

// 1. Remove L389 (premature container close)
lines.splice(388, 1);
console.log('1. Removed L389 (premature container close)');

// 2. Remove orphan at L463 (now shifted to L462)
lines.splice(461, 1);
console.log('2. Removed orphan L463 (was needed only to balance premature close)');

// 3. Find pwModal (shifted by -2 now)
var pwIdx=-1;
for(var i=0;i<lines.length;i++){
  if(lines[i].indexOf('pwModal')>=0){pwIdx=i;break;}
}
console.log('3. Found pwModal at L'+(pwIdx+1));

// 4. Insert container close before pwModal
lines.splice(pwIdx, 0, '</div> <!-- .container -->');
console.log('4. Inserted container close before pwModal');

// 5. Verify div depth
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
  if(d<minD){minD=d;problems.push('L'+(i+1)+': d='+d+' '+t.substring(0,40));}
}
console.log('\n=== RESULTS ===');
console.log('Final depth: '+d+', minimum: '+minD);
if(minD>=0)console.log('✓ PERFECT: No negative depth');
else{console.log('! Negative depth found:');problems.forEach(function(p){console.log('  '+p);});}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('\nWritten to '+path);
