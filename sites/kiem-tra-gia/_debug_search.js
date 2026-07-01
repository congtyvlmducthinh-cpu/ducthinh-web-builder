const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');

// Find the script content
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) { console.log('No script found'); return; }
const js = scriptMatch[1];

// Check basic structure
console.log('searchInput id in HTML:', html.indexOf('id="searchInput"') > -1);
console.log('oninput=globalSearch in HTML:', html.indexOf('oninput="globalSearch()"') > -1);
console.log('mainContainer id in HTML:', html.indexOf('id="mainContainer"') > -1);
console.log('controlBar id in HTML:', html.indexOf('id="controlBar"') > -1);

// Function order check
const funcs = ['globalSearch', 'render', 'renderPriceTab', 'populateFilters', 'switchTab'];
funcs.forEach(fn => {
  const idx = js.indexOf('function ' + fn + '(');
  console.log(fn + ' at index:', idx);
});

// Check globalSearch calls render
const gsMatch = js.match(/function globalSearch\(\)\s*\{([^}]+)\}/);
if (gsMatch) console.log('globalSearch body:', gsMatch[1]);

// Check if render reads searchInput
if (js.indexOf('searchInput') > -1) {
  // Find context around searchInput in render
  const lines = js.split('\n');
  lines.forEach((line, i) => {
    if (line.indexOf('searchInput') > -1) {
      console.log('Line', i, ':', line.trim().substring(0, 200));
    }
  });
}

// Check render function body  
const renderMatch = js.match(/function render\(\)\s*\{([\s\S]*?)\n\}/);
if (renderMatch) {
  const body = renderMatch[1];
  console.log('\nrender() checks activeTab:', body.indexOf('activeTab') > -1);
  console.log('render() calls renderPriceTab:', body.indexOf('renderPriceTab()') > -1);
}

// Check if DOM elements exist in the static HTML
// Look for the controls div
const controlsIdx = html.indexOf('class="controls"');
if (controlsIdx > 0) {
  const ctrlSnippet = html.substring(controlsIdx, controlsIdx + 500);
  console.log('\nControls snippet present:', ctrlSnippet.substring(0, 300) + '...');
}

console.log('\nDONE');
