var fs=require('fs');
var path='sites/kiem-tra-gia/vi.html';
var h=fs.readFileSync(path,'utf8');
var lines=h.split('\n');

// REMOVE ONLY L389 (premature container close)
var removed = lines.splice(388, 1)[0];
console.log('Removed L389: |'+removed.trim()+'|');

// Verify depth
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
  if(d<minD){minD=d;problems.push('NEG at L'+(i+1)+' d='+d+' '+t.substring(0,40));}
}
console.log('Final depth: '+d+', minimum: '+minD);
if(problems.length) problems.forEach(function(p){console.log(p);});
else console.log('No negative depths - clean!');

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('\nWritten to '+path);
