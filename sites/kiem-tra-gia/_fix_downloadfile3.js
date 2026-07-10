var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'vi.html');
var h = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Find second downloadFile (after byte 270000)
var df2 = h.indexOf('function downloadFile', 270000);
var dfEnd = h.indexOf('function downloadAsExcel', df2);
if (dfEnd < 0) dfEnd = h.indexOf('function', df2 + 50);
if (dfEnd < 0) dfEnd = df2 + 500;

var oldFn2 = h.substring(df2, dfEnd);
console.log('Second downloadFile at byte', df2);
console.log('Current body:');
console.log(oldFn2.substring(0, 400));
console.log('...');
console.log(oldFn2.substring(oldFn2.length - 100));

// Add type === 5 before the closing if(!data.length)
var nullCheck = oldFn2.indexOf('if (!data.length)');
var case5Block = 
  '  } else if (type === 5) {\n' +
  '    fn = "Cuoc_noi_dia.xlsx";\n' +
  '    data = JSON.parse(JSON.stringify(DATA_DOMESTIC_FREIGHT));\n' +
  '    sheetName = "Freight";\n' +
  '  }\n';

var newFn2 = oldFn2.substring(0, nullCheck) + case5Block + oldFn2.substring(nullCheck);

h = h.replace(oldFn2, newFn2);

fs.writeFileSync(filePath, h, 'utf8');
console.log('\nDone. Adding type 5 to second downloadFile.');

// Verify
var df2a = h.indexOf('function downloadFile', 270000);
console.log('Has type 5 now:', h.indexOf('type === 5', df2a) >= 0 && h.indexOf('type === 5', df2a) < h.indexOf('function downloadAsExcel', df2a));
