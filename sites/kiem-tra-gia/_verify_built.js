var fs=require('fs'),p=require('path');
var root=process.cwd();
var html=fs.readFileSync(p.join(root,'vi.html'),'utf-8');
console.log('Has loadProductsData: '+(html.indexOf('function loadProductsData')>=0));
console.log('Has importProducts: '+(html.indexOf('function importProducts')>=0));
var dpIdx=html.indexOf('DATA_PRODUCTS = [');
var dpEnd=html.indexOf('];', dpIdx)+2;
var dataBlock=html.substring(dpIdx, dpEnd);
console.log('Data block size: '+dataBlock.length+' bytes');
var lines=dataBlock.split('\n');
var objCount=0;
for(var i=0;i<lines.length;i++){
  var t=lines[i].trim();
  if(t.startsWith('{"') || t.startsWith('{ "')) objCount++;
}
console.log('Product objects: '+objCount);
