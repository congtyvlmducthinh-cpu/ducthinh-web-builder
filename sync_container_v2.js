var fs=require('fs');
var files=['sites/kiem-tra-gia/en.html','sites/kiem-tra-gia/zh.html'];
var fixCount=0;

files.forEach(function(path){
  var h=fs.readFileSync(path,'utf8');
  var lines=h.split('\n');

  // Verify structure
  var l388=lines[387].trim();
  var l389=lines[388].trim();
  var l390=lines[389].trim();
  var l391=lines[390].trim();
  var l463=lines[462].trim();
  var l505=lines[504].trim();

  console.log(path+':');
  console.log('  L388: '+l388);
  console.log('  L389: '+l389);
  console.log('  L390: "'+l390+'"');
  console.log('  L391: '+l391);
  console.log('  L463: '+l463);
  console.log('  L505: '+l505);

  // 1. Remove L389 (premature container close)
  if(l389==='</div>' && l391.indexOf('controls')>=0){
    lines.splice(388,1);
    console.log('  -> Removed L389 (premature container close)');
  }else{
    console.log('  -> WARN: Unexpected structure at L389');
    return;
  }

  // 2. Remove orphan at L463 (now shifted to L462)
  if(lines[460].trim()==='</div>'){
    lines.splice(460,1);
    console.log('  -> Removed L463 (orphan close)');
  }else{
    console.log('  -> WARN: Expected orphan close not found');
    return;
  }

  // 3. Find pwModal opening and insert container close before it
  var pwIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('modal-overlay')>=0 && lines[i].indexOf('pwModal')>=0){
      pwIdx=i; break;
    }
  }
  if(pwIdx>=0){
    lines.splice(pwIdx, 0, '</div> <!-- .container -->');
    console.log('  -> Inserted container close before pwModal at L'+(pwIdx+1));
  }else{
    console.log('  -> WARN: Could not find pwModal opening');
    return;
  }

  // 4. Verify depth
  var bs=-1;
  for(var i=0;i<lines.length;i++){if(lines[i].indexOf('<body')>=0){bs=i;break;}}
  if(bs>=0){
    var ins=false;
    var d=0;
    var minD=999;
    var negLines=[];
    for(var i=bs;i<lines.length;i++){
      var t=lines[i].trim();
      if(t.indexOf('<script')===0&&t.indexOf('src=')<0){ins=true;continue;}
      if(t.indexOf('</script>')===0){ins=false;continue;}
      if(ins)continue;
      var o=(t.match(/<div[ >]/g)||[]).length;
      var c=(t.match(/<\/div>/g)||[]).length;
      d+=o-c;
      if(d<minD){minD=d;if(d<0)negLines.push('    L'+(i+1)+' d='+d);}
    }
    console.log('  Final depth: '+d+', minimum: '+minD);
    if(d===0 && minD>=0){
      console.log('  -> PERFECT!');
      fixCount++;
    }else{
      console.log('  -> BAD! Depth issues');
      return;
    }
  }

  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log('  -> Written\n');
});

console.log('\n=== Summary: '+fixCount+'/'+files.length+' files fixed ===');
