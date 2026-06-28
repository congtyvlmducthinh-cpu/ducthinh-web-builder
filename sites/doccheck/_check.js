const fs = require('fs');
const http = require('http');
http.get('http://localhost:8080/', {headers:{Host:'doccheck.ducthinhmaterials.com'}}, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const checks = [
      ['clickSample(', 'clickSample function'],
      ['onclick="clickSample(', 'inline onclick'],
      ['SAMPLES={', 'SAMPLES object'],
      ['gdrive:"Kiểm', 'gdrive sample data'],
      ['inv:"Kiểm tra invoice', 'inv sample data'],
      ['bl:"Kiểm tra BL', 'bl sample data'],
      ['compare:"So sánh', 'compare sample data'],
      ['toggleGuide() {', 'toggleGuide function'],
      ['exampleClick(text)', 'exampleClick definition'],
    ];
    checks.forEach(([pat, lbl]) => {
      console.log((d.includes(pat) ? 'OK' : 'MISSING') + ': ' + lbl);
    });
    console.log('Total size: ' + d.length);
  });
});
