var fs=require('fs');

function fixFile(fn){
  var path='sites/kiem-tra-gia/'+fn;
  var h=fs.readFileSync(path,'utf8');
  var lines=h.split('\n');
  console.log('=== Fix '+fn+' ('+lines.length+' lines) ===');

  // 1) Remove the 2nd </div> before controls (L389 = premature container close)
  var ctrlIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('id="controlBar"')>=0){ctrlIdx=i;break;}
  }
  console.log('  controls at L'+(ctrlIdx+1));

  // Collect ALL </div> before controls (going backward, but don't break on blanks)
  var closes=[];
  for(var i=ctrlIdx-1;i>=ctrlIdx-6;i--){
    var t=lines[i].trim();
    if(t==='</div>'){
      closes.unshift(i); // add to front so they stay in order
    }
  }
  console.log('  Found '+closes.length+' </div> before controls: '+
    closes.map(function(x){return 'L'+(x+1);}).join(', '));
  
  // Keep the first </div> (tabs close), remove the rest (premature closes)
  if(closes.length>1){
    var toRemove=closes.slice(1); // remove everything except the first (tabs close)
    toRemove.sort(function(a,b){return b-a;}); // reverse order for splice
    toRemove.forEach(function(ix){
      console.log('  Remove premature </div> at L'+(ix+1));
      lines.splice(ix,1);
    });
  }else{
    console.log('  Only 1 </div> before controls — no premature close to remove');
  }

  // 2) Find and remove orphan </div> after manage-panel (before FOB PTSC)
  var fobIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('FOB PTSC PANEL')>=0 && lines[i].indexOf('<!--')>=0){fobIdx=i;break;}
  }
  console.log('  FOB comment at L'+(fobIdx+1));

  // Count all </div> going backward from FOB comment
  var postManageCloses=[];
  for(var i=fobIdx-1;i>=Math.max(0,fobIdx-12);i--){
    if(lines[i].trim()==='</div>'){
      postManageCloses.unshift(i);
    }
  }
  console.log('  Found '+postManageCloses.length+' </div> before FOB: '+
    postManageCloses.map(function(x){return 'L'+(x+1);}).join(', '));
  
  // We expect: manage-status-sm, manage-actions, manage-dashboard, [orphan]
  // The orphan is the 4th one (closest to FOB because it's at the outer nesting)
  // Or more precisely: after removing premature close, original orphan becomes 
  // the LAST </div> before FOB comment among the 4 closes
  // After fix: we need exactly 3 closes before FOB (manage closes), not 4
  // The orphan is the one with a blank line around it, or the one index-3
  // From trace: en/zh have 4 closes before FOB at L(459,461,463) in current file
  // After removing premature L389: indices shift -1
  
  if(postManageCloses.length>3){
    // The orphan is the last one (farthest from FOB, highest index in array because unshift)
    // postManageCloses[0] = furthest from FOB, postManageCloses[3] = closest to FOB
    // But we already removed a line for premature close which shifted indices
    // Let's use a simpler approach: remove the </div> that's on its own line
    // between blank lines (not part of the manage-panel closure trio)
    
    // Actually, let me check the position more carefully
    // L459 </div> — manage-status-sm close
    // L460 </div> — manage-actions close
    // L461 blank
    // L462 blank
    // L463 </div> — orphan
    
    // Hmm, but after L389 removal, indices shift by -1
    
    // Better: the orphan is the one surrounded by blank lines (or at least 1 blank)
    for(var oi=0;oi<postManageCloses.length;oi++){
      var ix=postManageCloses[oi];
      var prev=lines[ix-1]||'';
      var next=lines[ix+1]||'';
      // If prev is blank and next starts with <!-- FOB or is blank → orphan
      if(prev.trim()==='' && (next.trim().indexOf('<!--')===0 || next.trim()==='')){
        console.log('  Removing orphan </div> at L'+(ix+1));
        lines.splice(ix,1);
        break;
      }
    }
  }else{
    console.log('  Only '+postManageCloses.length+' closes before FOB — no orphan to remove');
  }

  // 3) Find pwModal and insert container close before it
  var pwIdx=-1;
  for(var i=0;i<lines.length;i++){
    if(lines[i].indexOf('modal-overlay')>=0 && lines[i].indexOf('pwModal')>=0){
      pwIdx=i; break;
    }
  }
  console.log('  pwModal at L'+(pwIdx+1));
  
  // Check if container close already exists
  if(lines[pwIdx-1].trim().indexOf('<!-- .container -->')>=0){
    console.log('  Container close already before pwModal — skip insert');
  }else if(pwIdx>=0){
    lines.splice(pwIdx, 0, '</div> <!-- .container -->');
    console.log('  Inserted container close at L'+(pwIdx+1));
  }else{
    console.log('  WARN: pwModal not found');
    return;
  }

  // 4) Verify depth
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
    if(d<minD)minD=d;
  }
  console.log('  Depth: final='+d+', min='+minD);
  
  if(d===0 && minD>=0){
    console.log('  -> SUCCESS!');
    fs.writeFileSync(path, lines.join('\n'), 'utf8');
    console.log('  -> Written to '+fn+'\n');
    return true;
  }else{
    console.log('  -> FAIL! (depth offset: '+(d)+', min: '+minD+')');
    console.log('  -> NOT written\n');
    return false;
  }
}

fixFile('en.html');
fixFile('zh.html');
console.log('Done');
