var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

// Remove premature container close at L389 (index 388)
var removedLine = lines.splice(388, 1)[0];
console.log('Removed L389: |'+removedLine+'|');

// Find pwModal - after removal, line shifted by -1
// pwModal was at L516, now at L515
var pwIdx = -1;
for(var i=0;i<lines.length;i++){
  if(lines[i].indexOf('pwModal')>=0){pwIdx=i;break;}
}
console.log('Found pwModal at L'+(pwIdx+1));

// Insert container close before pwModal
lines.splice(pwIdx, 0, '</div> <!-- .container -->');
console.log('Inserted </div> <!-- .container --> before pwModal');

// Count div depth
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
  if(d<minD) minD=d;
}
console.log('Final depth: '+d+', minimum: '+minD);

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Written to '+path);
