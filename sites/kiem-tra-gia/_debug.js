const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const match = html.match(/<script>([\s\S]*)<\/script>/);
if (!match) {
  console.log('No script found in vi.html');
  process.exit(1);
}
const js = match[1];

// Check for syntax errors
try {
  new Function(js);
  console.log('JS syntax: OK');
} catch(e) {
  console.log('JS syntax ERROR:', e.message);
  // Find the error line number from the message
  const m = e.message.match(/line (\d+)/);
  if (m) {
    const badLine = parseInt(m[1]);
    const lines = js.split('\n');
    console.log('Around line', badLine + ':');
    for (let i = Math.max(0, badLine - 4); i < Math.min(lines.length, badLine + 3); i++) {
      console.log('  ' + (i + 1) + ': ' + lines[i].substring(0, 200));
    }
  }
}
