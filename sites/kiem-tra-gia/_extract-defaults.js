var fs = require('fs');
var html = fs.readFileSync('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'utf-8');

// Extract the 5 DATA variable blocks as raw JS strings
// Using the exact delimiter boundaries to avoid JSON parsing issues

var blocks = {};

// DATA_PRODUCTS = [ ... ];
var start = html.indexOf('var DATA_PRODUCTS = [');
var end = html.indexOf('];', start) + 2;
if (start >= 0) blocks.DATA_PRODUCTS = html.substring(start, end);
else throw new Error('DATA_PRODUCTS not found');

// DATA_BAGS = [ ... ];
start = html.indexOf('var DATA_BAGS = [');
end = html.indexOf('];', start) + 2;
if (start >= 0) blocks.DATA_BAGS = html.substring(start, end);
else throw new Error('DATA_BAGS not found');

// DATA_OTHERS = [ ... ];
start = html.indexOf('var DATA_OTHERS = [');
end = html.indexOf('];', start) + 2;
if (start >= 0) blocks.DATA_OTHERS = html.substring(start, end);
else throw new Error('DATA_OTHERS not found');

// DATA_MAX_LOADING = { ... };
start = html.indexOf('var DATA_MAX_LOADING = {');
end = html.indexOf('};', start) + 2;
if (start >= 0) blocks.DATA_MAX_LOADING = html.substring(start, end);
else throw new Error('DATA_MAX_LOADING not found');

// DATA_COST_FOB = { ... }; (multi-line object)
start = html.indexOf('var DATA_COST_FOB = {');
// Find the matching closing }; - it's complex because of nested objects
// Find the last } before the next function or var
end = html.indexOf('};', start);
// There might be multiple }; but we need the one ending the var statement
// After DATA_COST_FOB, next line should be a function or another var
var restAfter = html.substring(end + 2);
var nextLine = restAfter.substring(0, 50);
console.log('After DATA_COST_FOB }; : ' + nextLine.trim());

if (start >= 0) blocks.DATA_COST_FOB = html.substring(start, end + 2);
else throw new Error('DATA_COST_FOB not found');

// Now save the defaults as a JSON file (strings are safe in JSON)
var defaults = {};
Object.keys(blocks).forEach(function(key) {
  defaults[key] = blocks[key];
});

fs.writeFileSync('C:/Users/Admin/.openclaw/canvas/_ktg-default-data.json', JSON.stringify(defaults, null, 2), 'utf-8');
console.log('Defaults saved to _ktg-default-data.json');
Object.keys(defaults).forEach(function(key) {
  console.log('  ' + key + ': ' + defaults[key].length + ' chars');
});
