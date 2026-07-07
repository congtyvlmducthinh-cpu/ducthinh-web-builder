const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Find all badge spans
let idx = c.indexOf('class="badge"');
while(idx >= 0) {
  console.log(c.substring(Math.max(0,idx-40), idx+100));
  idx = c.indexOf('class="badge"', idx+1);
}
