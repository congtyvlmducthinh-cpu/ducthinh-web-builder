var fs=require('fs');
var h=fs.readFileSync('sites/kiem-tra-gia/vi.html','utf8').replace(/\r\n/g,'\n');
var si=h.lastIndexOf('<script>');
var ei=h.lastIndexOf('</script>');
var js=h.substring(si+8,ei);

// getDomesticMode
var idx=js.indexOf('function getDomesticMode');
console.log(js.substring(idx, idx+100));

// setDomesticMode
var idx2=js.indexOf('function setDomesticMode');
var a=js.substring(idx2);
var b=a.substring(a.indexOf('{')+1);
var d=1,p=0;while(d>0&&p<b.length){if(b[p]==='{')d++;else if(b[p]==='}')d--;p++;}
var fn=a.substring(0,a.indexOf('{')+1+p);
console.log(fn);

// initDomesticTab
var idx3=js.indexOf('function initDomesticTab');
var a3=js.substring(idx3);
var b3=a3.substring(a3.indexOf('{')+1);
var d3=1,p3=0;while(d3>0&&p3<b3.length){if(b3[p3]==='{')d3++;else if(b3[p3]==='}')d3--;p3++;}
var fn3=a3.substring(0,a3.indexOf('{')+1+p3);
console.log(fn3);
