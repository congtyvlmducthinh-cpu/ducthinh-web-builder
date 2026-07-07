var fs=require('fs');
var files=['sites/kiem-tra-gia/en.html','sites/kiem-tra-gia/zh.html'];

files.forEach(function(path){
  var h=fs.readFileSync(path,'utf8');
  var lines=h.split('\n');

  // 1. Remove premature container close (before controls)
  var ctrlIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('controls" id="controlBar"')>=0){ctrlIdx=i;break;}
  }
  // The close is at ctrlIdx-1 - check it's a bare </div>
  var closeLine=lines[ctrlIdx-1].trim();
  if(closeLine==='</div>'){
    console.log(path+': Removing premature </div> at L'+(ctrlIdx));
    lines.splice(ctrlIdx-1,1);
  }else{
    console.log(path+': WARN - Expected </div> at L'+(ctrlIdx)+', got: '+closeLine);
  }

  // 2. Remove orphan close (before FOB PTSC)
  var fobIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('FOB PTSC PANEL')>=0){fobIdx=i;break;}
  }
  var orphanLine=lines[fobIdx-3].trim(); // the </div> usually at -2, there's a blank line at -1
  // Actually let me find the orphan - it's between manage panel end and fob ptsc
  // Pattern: </div> (manage-panel close) -> blank -> </div> (orphan) -> blank -> FOB PTSC
  var orphanIdx=-1;
  for(var i=fobIdx-5;i<fobIdx;i++){
    if(lines[i].trim()==='</div>' && lines[i+1].trim()==='' && lines[i+2].indexOf('FOB PTSC')>=0){
      orphanIdx=i; break;
    }
  }
  if(orphanIdx>=0){
    console.log(path+': Removing orphan </div> at L'+(orphanIdx+1));
    lines.splice(orphanIdx,1);
  }else{
    console.log(path+': WARN - Could not find orphan </div> before FOB PTSC');
  }

  // 3. Find pwModal opening and insert container close before it
  var pwIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('pwModal')>=0 && lines[i].indexOf('id="pwModal"')>=0){
      // Make sure this is the modal-overlay opening
      if(lines[i].indexOf('modal-overlay')>=0){
        pwIdx=i; break;
      }
    }
  }
  if(pwIdx>=0){
    console.log(path+': Inserting container close before pwModal at L'+(pwIdx+1));
    lines.splice(pwIdx, 0, '</div> <!-- .container -->');
  }else{
    console.log(path+': WARN - Could not find pwModal opening');
  }

  // Verify depth
  var bs=-1;
  for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
  if(bs>=0){
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
      if(d<minD)minD=d;
    }
    console.log(path+': Final depth='+d+', min='+minD+(minD>=0?' ✓':' ! NEGATIVE'));
  }

  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log(path+': Written\n');
});
