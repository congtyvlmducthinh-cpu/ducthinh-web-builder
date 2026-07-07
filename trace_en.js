var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/en.html','utf8');
var lines=h.split('\n');

// Find body
var bs=-1;
for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}

var divs=[];
var ins=false;
var d=0;
var minD=999;

console.log('=== DIV DEPTH TRACE (en.html original) ===\n');

for(var i=bs;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
  if(t.indexOf('</script>')===0){ins=false;continue;}
  if(ins)continue;
  
  var o=(t.match(/<div[ >]/g)||[]).length;
  var c=(t.match(/<\/div>/g)||[]).length;
  
  if(o>0||c>0){
    var oldD=d;
    d+=o-c;
    if(d<minD)minD=d;
    
    var marker='';
    if(t.indexOf('container')>=0)marker=' [container]';
    else if(t.indexOf('pwModal')>=0)marker=' [pwModal]';
    else if(t.indexOf('fobptsc-panel')>=0)marker=' [fobptsc]';
    else if(t.indexOf('FOB PTSC')>=0)marker=' [FOB PTSC COMMENT]';
    else if(t.indexOf('manage-panel')>=0)marker=' [manage-panel]';
    else if(t.indexOf('tabs')>=0)marker=' [tabs]';
    
    if(o>0||c>0||marker){
      console.log('L'+(i+1)+' d='+oldD+'->'+d+' | '+t.replace(/\s+/g,' ').substring(0,80)+marker);
    }
  }
}

console.log('\nDepth: final='+d+', min='+minD);

// Also find specific lines of interest
console.log('\n=== Key markers ===');
for(var i=0;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.indexOf('container">')>=0 || t.indexOf('tabs')>=0 || t.indexOf('manage-panel')>=0 || 
     t.indexOf('fobptsc')>=0 || t.indexOf('pwModal')>=0 || t.indexOf('FOB PTSC')>=0){
    if(t.match(/<div|<\/div>/)){
      console.log('L'+(i+1)+': '+t.replace(/\s+/g,' ').substring(0,100));
    }
  }
}
