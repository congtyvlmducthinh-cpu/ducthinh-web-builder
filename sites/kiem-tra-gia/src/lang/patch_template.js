var fs = require('fs');

var template = fs.readFileSync('src/template.html', 'utf8');

// Add reset button after machineFilter select
template = template.replace(
  '<select id="machineFilter" onchange="render()"><option value="">{{FILTER_ALL_MACHINES}}</option></select>',
  '<select id="machineFilter" onchange="render()"><option value="">{{FILTER_ALL_MACHINES}}</option></select>\n<button id="resetFiltersBtn" onclick="resetFilters()" title="{{RESET_FILTERS_TITLE}}">↺</button>'
);

fs.writeFileSync('src/template.html', template, 'utf8');
console.log('Updated template.html');
