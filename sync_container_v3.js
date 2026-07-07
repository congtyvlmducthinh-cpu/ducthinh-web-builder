var fs=require('fs');
var files=['sites/kiem-tra-gia/en.html','sites/kiem-tra-gia/zh.html'];
var fixCount=0;

files.forEach(function(path){
  var h=fs.readFileSync(path,'utf8');
  var lines=h.split('\n');

  // 1. Remove L389 (premature container close)
  // L389 = index 388
  var l389=lines[388].trim();
  var l391=lines[390].trim();
  console.log(path+':');
  console.log('  L389: "'+l389+'"  L391: '+l391);
  
  if(l389==='</div>' && l391.indexOf('controls')>=0){
    lines.splice(388,1);
    console.log('  1. Removed L389 (premature container close)');
  }else{
    console.log('  1. WARN: Unexpected at L389, got: "'+l389+'"');
    return;
  }

  // After -1 shift, original L463 (index 462) -> new index 461
  // What's there?
  var orphanNewIdx=461;
  var orphanContent=lines[orphanNewIdx].trim();
  console.log('     Orphan candidate L'+(orphanNewIdx+1)+': "'+orphanContent+'"');
  
  // Also check context
  console.log('     L'+(orphanNewIdx)+': "'+lines[orphanNewIdx-1].trim()+'"');
  console.log('     L'+(orphanNewIdx+2)+': "'+(lines[orphanNewIdx+1]||'').trim()+'"');
  console.log('     L'+(orphanNewIdx+3)+': "'+(lines[orphanNewIdx+2]||'').trim()+'"');

  if(orphanContent==='</div>'){
    lines.splice(orphanNewIdx,1);
    console.log('  2. Removed orphan </div> at L'+(orphanNewIdx+1));
  }else{
    console.log('  2. WARN: Not a </div> at expected orphan position');
    return;
  }

  // 3. Find pwModal and insert container close before it
  var pwIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('modal-overlay')>=0 && lines[i].indexOf('pwModal')>=0){
      pwIdx=i; break;
    }
  }
  if(pwIdx>=0){
    lines.splice(pwIdx, 0, '</div> <!-- .container -->');
    console.log('  3. Inserted container close before pwModal at L'+(pwIdx+1));
  }else{
    console.log('  3. WARN: Could not find pwModal');
    return;
  }

  // 4. Verify depth
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
    console.log('  4. Depth: final='+d+', min='+minD);
    if(d===0 && minD>=0){
      console.log('  -> PERFECT!');
      fixCount++;
      fs.writeFileSync(path, lines.join('\n'), 'utf8');
      console.log('  -> Written\n');
    }else{
      console.log('  -> BAD! Reverting');
      return;
    }
  }
});

console.log('\n=== Fixed: '+fixCount+'/'+files.length+' ===');
