var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var lines=h.split('\n');
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
var allLines=[];
for(var i=bs;i<lines.length;i++){
  var ln=lines[i];
  var t=ln.trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
  allLines.push({num:(i+1),d:d,text:t.substring(0,80)});
  if(d===0) console.log('DEPTH 0 at L'+(i+1)+': '+t.substring(0,80));
}
console.log('=== Final depth at body end: '+d+' ===');
console.log('=== Lines where d=0 (container boundary drops):');
allLines.filter(function(x){return x.d===0;}).forEach(function(x){console.log('L'+x.num+' d='+x.d+' '+x.text);});
