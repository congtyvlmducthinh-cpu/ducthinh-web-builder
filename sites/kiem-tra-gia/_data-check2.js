var fs = require('fs');
var html = fs.readFileSync('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi.html', 'utf-8');

// Check for COST_FOB and MAX_LOADING differently
var idx = html.indexOf('DATA_COST_FOB');
if (idx >= 0) {
  console.log('DATA_COST_FOB at:', idx, html.substring(idx, idx + 50));
} else {
  console.log('DATA_COST_FOB: not in HTML');
}
idx = html.indexOf('costFOB');
if (idx >= 0) {
  console.log('costFOB at:', idx, html.substring(idx - 10, idx + 50));
}
idx = html.indexOf('DATA_MAX_LOADING');
if (idx >= 0) {
  console.log('DATA_MAX_LOADING at:', idx, html.substring(idx, idx + 50));
} else {
  console.log('DATA_MAX_LOADING: not in HTML');
}
idx = html.indexOf('maxLoading');
if (idx >= 0) {
  console.log('maxLoading at:', idx, html.substring(idx - 10, idx + 50));
}

// Also check: what's right after DATA_OTHERS
idx = html.indexOf('DATA_OTHERS');
console.log('\nAfter DATA_OTHERS:');
var end = html.indexOf('];', html.indexOf('DATA_OTHERS'));
console.log(html.substring(end + 3, end + 100));
