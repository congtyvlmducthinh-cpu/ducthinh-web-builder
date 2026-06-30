var path = require('path');
var fs = require('fs');
var injector = require('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/_ktg-data-injector.js')({
  dir: 'C:/Users/Admin/.openclaw/canvas/ktg-data',
  __dirname: 'C:/Users/Admin/.openclaw/canvas',
  fs: fs,
  path: path
});

var ok = injector.save('vi', {
  DATA_PRODUCTS: 'var DATA_PRODUCTS = [{ "Ma_sp": "TEST001", "Ten_sp": "San pham test" }];'
});
console.log('Save result:', ok);

var dataFile = 'C:/Users/Admin/.openclaw/canvas/ktg-data/ktg-data-vi.json';
console.log('File exists:', fs.existsSync(dataFile));
if (fs.existsSync(dataFile)) {
  var content = fs.readFileSync(dataFile, 'utf-8');
  console.log('Content:', content);
}

// Test inject
var html = '<html><head></head><body><script>var DATA_PRODUCTS = [{"Ma_sp":"ORIG","Ten_sp":"Original"}];\nvar DATA_BAGS = [];\n</script></body></html>';
var injected = injector.inject(html, 'vi');
console.log('\n=== Injected HTML ===');
console.log(injected);
