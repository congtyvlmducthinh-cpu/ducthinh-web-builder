var http=require('http');
http.get('http://localhost:8080/kiem-tra-gia/vi.html',function(r){
  var d=[];
  r.on('data',function(c){d.push(c);});
  r.on('end',function(){
    var h=Buffer.concat(d).toString('utf8');
    console.log('autocomplete=off province:', h.indexOf('autocomplete="off" id="domProvince"') >= 0 ? 'YES' : 'NO');
    console.log('autocomplete=off freight:', h.indexOf('autocomplete="off" id="domFreight"') >= 0 ? 'YES' : 'NO');
    console.log('Second timeout clear:', h.indexOf('setTimeout(function(){ var _p=document.getElementById') >= 0 ? 'YES' : 'NO');
    console.log('Length:', h.length);
  });
});
