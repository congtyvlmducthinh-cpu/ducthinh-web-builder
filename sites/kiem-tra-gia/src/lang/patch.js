var fs = require('fs');

var patch = {
  'src/lang/en.js': {
    search: 'FILTER_ALL_MACHINES: "All machines",',
    insert: '  RESET_FILTERS_TITLE: "Reset filters",'
  },
  'src/lang/zh.js': {
    search: 'FILTER_ALL_MACHINES: "所有机器",',
    insert: '  RESET_FILTERS_TITLE: "重置筛选",'
  }
};

Object.keys(patch).forEach(function(f) {
  var content = fs.readFileSync(f, 'utf8');
  var p = patch[f];
  content = content.replace(p.search, p.search + '\n' + p.insert);
  fs.writeFileSync(f, content, 'utf8');
  console.log('Updated ' + f);
});
