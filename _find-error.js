const fs = require('fs');
let h = fs.readFileSync('sites/kiem-tra-gia/index.html', 'utf8');

// Find the JavaScript syntax error by checking t() calls
// The issue is likely in how we replaced strings - check for broken concat patterns
var broken = [
  // Look for "+t('key')+" that might be broken
  ["'+t(", "'+t("],
  // Check h += lines around t() calls
];
console.log('Checking for broken string concatenation...');

// Find all lines with t() and verify they make sense
var lines = h.split('\n');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  if (l.indexOf('t(') > -1 && l.indexOf('function') === -1 && l.indexOf('LANG_MAP') === -1) {
    // In the JS context (between script tags), check if quotes match
    var startTag = l.indexOf('t(');
    // Get the function call text
    var endTag = l.indexOf(')', startTag);
    var callText = l.substring(startTag, endTag + 1);
    // Verify it doesn't contain broken quotes
    var singleQuotes = (callText.match(/'/g) || []).length;
    var doubleQuotes = (callText.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      console.log('Broken single quotes at line ' + (i+1) + ': ' + l.trim().substring(0, 100));
    }
    if (doubleQuotes % 2 !== 0) {
      console.log('Broken double quotes at line ' + (i+1) + ': ' + l.trim().substring(0, 100));
    }
  }
}

// Check specifically for broken patterns from our replacements
var badPatterns = [
  /t\('[^']+'t\('/,  // Missing closing quote
  /\)\+'\+t\('[^']+'\)/,  // Should be valid but let's check
  /\+\+t\('/,  // Double ++
  /\+''\+t\('/,  // Empty string concat
  /\+\+t\('[^']+'\)/,
];

// Search raw file content
var content = h;
for (var bp of badPatterns) {
  var m;
  while ((m = bp.exec(content)) !== null) {
    var ctx = content.substring(Math.max(0, m.index - 30), m.index + m[0].length + 30);
    console.log('Pattern match: ' + ctx.replace(/\n/g, ' ').substring(0, 100));
  }
}

console.log('Check complete');
