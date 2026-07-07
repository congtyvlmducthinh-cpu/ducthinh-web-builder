const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');
let idx = c.indexOf('class="badge"');
if(idx < 0) {
  console.log('No badge spans left');
} else {
  while(idx >= 0) {
    console.log(c.substring(Math.max(0,idx-20), idx+60));
    idx = c.indexOf('class="badge"', idx+1);
  }
}
