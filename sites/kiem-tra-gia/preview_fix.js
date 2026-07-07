var fs = require('fs');

// Fix vi.html JS - remove duplicate copy-paste code in fobPtscLoadCfg and fobPtscSaveCfg
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
var s = m[1];
var lines = s.split('\n');

console.log('Total JS lines:', lines.length);

// Fix 1: fobPtscLoadCfg - L8714 has `};` (wrong), L8715-L8719 is orphan duplicate
// Change L8714 from `};` to `}`, remove L8715-L8719
console.log('\nL8713:', lines[8712]);
console.log('L8714:', lines[8713]);
console.log('L8715:', lines[8714]);
console.log('L8716:', lines[8715]);
console.log('L8717:', lines[8716]);
console.log('L8718:', lines[8717]);
console.log('L8719:', lines[8718]);

// Fix 2: fobPtscSaveCfg - L8738 has `};` (wrong), L8739-L8744 is orphan duplicate
console.log('\nL8737:', lines[8736]);
console.log('L8738:', lines[8737]);
console.log('L8739:', lines[8738]);
console.log('L8740:', lines[8739]);
console.log('L8741:', lines[8740]);
console.log('L8742:', lines[8741]);
console.log('L8743:', lines[8742]);
console.log('L8744:', lines[8743]);
