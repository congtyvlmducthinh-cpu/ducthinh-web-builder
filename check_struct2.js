var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8');
var lines=h.split('\n');
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
var ins=false;
var d=0;
var out=[];
for(var i=bs;i<bs+180;i++){
  var ln=lines[i].trim();
  if(ln.indexOf('<script')===0&&ln.indexOf('src=')<0){ins=true;continue;}
  if(ln.indexOf('</script>')===0){ins=false;continue;}
  if(ins) continue;
  var o=(ln.match(/<div[ >]/g)||[]).length;
  var c=(ln.match(/<\/div>/g)||[]).length;
  d+=o-c;
  if(ln==='</div>'||ln.indexOf('container')>=0||ln.indexOf('controls')>=0||ln.indexOf('mainContainer')>=0||ln.indexOf('fobptsc')>=0||ln.indexOf('pwModal')>=0||ln.indexOf('manage-panel')>=0||ln.indexOf('price-mode')>=0)
    out.push('L'+(i+1)+' d='+d+' '+ln.substring(0,70));
}
fs.writeFileSync('out.txt', out.join('\n'), 'utf8');
