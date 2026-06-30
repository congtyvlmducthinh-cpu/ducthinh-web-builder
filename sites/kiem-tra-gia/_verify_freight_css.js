var https = require('https');
var html = '';
https.get('https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html', function(res) {
  res.on('data', function(c) { html += c; });
  res.on('end', function() {
    var cssStart = html.indexOf('<style>');
    var cssEnd = html.indexOf('</style>');
    var css = html.substring(cssStart + 7, cssEnd);
    
    var checks = [
      '.freight-overlay',
      '.freight-overlay.open',
      '.freight-modal',
      '.freight-modal-header',
      '.freight-modal-filters',
      '.freight-modal-body',
      '.freight-modal-footer',
      '.freight-val',
      '#freightSearch'
    ];
    checks.forEach(function(s) {
      var ok = css.indexOf(s) >= 0;
      console.log((ok ? 'OK' : 'MISS') + ' ' + s);
    });
    
    console.log('\nHas class="freight-overlay": ' + (html.indexOf('class="freight-overlay"') >= 0));
    console.log('Has open class ref in CSS: ' + (css.indexOf('.freight-overlay.open') >= 0));
    
    console.log('\nCache status: ' + res.headers['cf-cache-status']);
    console.log('Cache control: ' + res.headers['cache-control']);
  });
}).on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
