var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'vi.html');
var h = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Fix second downloadFile - remove stray '}' before '} else if (type === 5)'
var df2 = h.indexOf('function downloadFile', 270000);
var dfEnd = h.indexOf('function downloadAsExcel', df2);
var oldFn2 = h.substring(df2, dfEnd);

// The broken pattern: extra closing brace before case 5
var broken = '  }\n    } else if (type === 5) {';
var fixed = '  } else if (type === 5) {';
var newFn2 = oldFn2.replace(broken, fixed);

if (newFn2 !== oldFn2) {
  h = h.replace(oldFn2, newFn2);
  console.log('Fixed stray brace in second downloadFile');
} else {
  // Try different pattern
  var broken2 = '  }\n  } else if (type === 5) {';
  var newFn2 = oldFn2.replace(broken2, '  } else if (type === 5) {');
  if (newFn2 !== oldFn2) {
    h = h.replace(oldFn2, newFn2);
    console.log('Fixed stray brace (pattern 2)');
  } else {
    console.log('Could not find broken pattern, showing exact bytes:');
    var case4End = oldFn2.indexOf('"Applications";');
    var nullCheck = oldFn2.indexOf('if (!data.length)');
    console.log(JSON.stringify(oldFn2.substring(case4End, nullCheck)));
  }
}

fs.writeFileSync(filePath, h, 'utf8');

// Re-verify
var h2 = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
console.log('Braces:', (h2.match(/\{/g)||[]).length, '=', (h2.match(/\}/g)||[]).length);

// JS syntax check
var scripts = h2.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
var allJS = '';
if (scripts) {
  scripts.forEach(function(s) {
    var code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    allJS += code + '\n';
  });
}
try {
  new Function(allJS);
  console.log('JS syntax: OK');
} catch(e) {
  console.log('JS syntax error:', e.message);
}
