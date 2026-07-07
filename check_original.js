var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var lines=h.split('\n');
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
for(var i=bs;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d+=o-c;
}
console.log('Original depth at body end: '+d);

// Check specific span with lines
var d2=0;
for(var i=bs;i<Math.min(bs+180,lines.length);i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){break;}
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  d2+=o-c;
  if(/*t==='</div>'||*/t.indexOf('container')>=0||t.indexOf('controls')>=0||t.indexOf('mainContainer')>=0||t.indexOf('fobptsc')>=0||t.indexOf('pwModal')>=0||t.indexOf('manage-panel')>=0||t.indexOf('price-mode')>=0){
    console.log('L'+(i+1)+' d='+d2+' '+t.substring(0,60));
  }
}
