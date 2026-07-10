var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'vi.html');
var h = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Fix the downloadFile function syntax
var df = h.indexOf('function downloadFile');
var dfEnd = h.indexOf('function downloadAsExcel');
var dfBlock = h.substring(df, dfEnd);

console.log('=== CURRENT dfBlock start ===');
console.log(dfBlock.substring(0, 300));
console.log('...');
console.log('=== CURRENT dfBlock end ===');
console.log(dfBlock.substring(dfBlock.length - 300));

// Find the broken part: } } else if (type === 5) should be } else if (type === 5)
// Current: case 4 closes with }, then we have } else if (type === 5)
var broken = '}\n   } else if (type === 5) {';
var fixed = '  } else if (type === 5) {';

if (dfBlock.indexOf(broken) >= 0) {
  var fixedBlock = dfBlock.replace(broken, fixed);
  h = h.replace(dfBlock, fixedBlock);
  console.log('\nFixed downloadFile syntax!');
} else {
  console.log('\nCould not find broken pattern. Checking exact content...');
  // Show what's between case 4 and if(!data.length)
  var c4 = dfBlock.indexOf('type === 4');
  var nl = dfBlock.indexOf('if (!data.length)', c4);
  console.log('Content between case 4 and null check:');
  console.log(JSON.stringify(dfBlock.substring(c4, nl + 50)));
}

fs.writeFileSync(filePath, h, 'utf8');
console.log('Written.');
