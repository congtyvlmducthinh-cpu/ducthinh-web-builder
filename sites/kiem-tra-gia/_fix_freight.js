const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

const popupIdx = tpl.indexOf('freetPopup">');
let searchFrom = popupIdx < 0 ? tpl.indexOf('freightPopup"') : popupIdx;
if (searchFrom < 0) {
    console.log('ERROR: Cannot find freightPopup');
    process.exit(1);
}

let filtersStart = tpl.indexOf('freight-modal-filters', searchFrom);
let filtersDivOpen = tpl.lastIndexOf('<div', filtersStart);
let filtersDivClose = tpl.indexOf('</div>', filtersDivOpen);

// Check what's before filters div
let beforeFilters = tpl.substring(Math.max(0, filtersDivOpen - 200), filtersDivOpen);
console.log('BEFORE FILTERS:');
console.log(beforeFilters);
console.log('---');

// The actual filters div
let filtersContent = tpl.substring(filtersDivOpen, filtersDivClose + 6);
console.log('FILTERS DIV:');
console.log(filtersContent);
console.log('---');

// Check if there's already a search input
let hasSearch = tpl.indexOf('freightSearch');
console.log('Existing freightSearch: ' + hasSearch);
