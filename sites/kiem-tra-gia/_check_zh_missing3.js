var fs = require('fs');
var build = fs.readFileSync('build.js', 'utf-8');

var fnStart = build.indexOf("function getJSReplMap");
var enStart = build.indexOf("en: {", fnStart);
var zhStart = build.indexOf("zh: {", enStart);

// Get the en section - but the key might not have the ' key format
var enSection = build.substring(enStart, zhStart);

// Extract ALL strings that are Vietnamse - use 'xxx': pattern
var enKeys = [];
var re = /'([^']{2,})':\s*'([^']+)'/g;
var match;
while ((match = re.exec(enSection)) !== null) {
  enKeys.push({ vi: match[1], en: match[2] });
}

var zhSection = build.substring(zhStart);

var missing = [];
enKeys.forEach(function(k) {
  // Check if the Vietnamese key exists in zh section (value side too)
  if (zhSection.indexOf("'" + k.vi + "'") === -1 && zhSection.indexOf(":" + k.vi) === -1) {
    missing.push(k);
  }
});

console.log('Missing from ZH (' + missing.length + '):');
missing.forEach(function(m) {
  console.log("  '" + m.vi + "'" + " -> en: '" + m.en + "'");
});

// Check remaining Vietnamese strings in zh.html
var zh = fs.readFileSync('zh.html', 'utf-8');
var remainingVi = [];
enKeys.forEach(function(k) {
  var count = (zh.match(new RegExp(escapeRegex(k.vi), 'g')) || []).length;
  if (count > 0) remainingVi.push({ vi: k.vi, count: count });
});

console.log('\nStill Vietnamese in zh.html:');
remainingVi.sort(function(a, b) { return b.count - a.count; }).forEach(function(r) {
  console.log('  x' + r.count + ': ' + r.vi);
});

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
