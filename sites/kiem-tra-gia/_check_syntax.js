var https=require('https');
var url='https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html';
https.get(url, {headers:{'Cache-Control':'no-cache'}}, function(res){
  var data='';
  res.on('data',function(c){data+=c;});
  res.on('end',function(){
    var start=data.indexOf('<script>')+8;
    var end=data.indexOf('</script>', start);
    var js=data.substring(start, end);
    
    // Find the full function around 113150
    // Search backwards for 'function'
    var fIdx=113150;
    while(fIdx>0 && js.substring(fIdx, fIdx+8)!=='function') fIdx--;
    while(fIdx>0 && js[fIdx]!=='\n') fIdx--;
    
    var fEnd=js.indexOf('\n//', fIdx+1); // next section
    if(fEnd<0 || fEnd>fIdx+5000) fEnd=fIdx+2000;
    
    console.log(js.substring(fIdx, fEnd));
  });
}).on('error',function(e){console.log('Error: '+e.message);});
