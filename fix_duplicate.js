const fs = require('fs');
const files = ['sites/kiem-tra-gia/vi.html', 'sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html'];

// Define markers for the old function block to remove
const OLD_START = '\nfunction renderAppsTab() {';
const OLD_END = 'function attachAppEvents() {\n  // Already handled via oninput\n}\n';

files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // Find first occurrence of old start
  const startIdx = content.indexOf(OLD_START);
  if (startIdx < 0) { console.error('Start not found in ' + filepath); return; }
  
  // Find the matching old END after start
  const endIdx = content.indexOf(OLD_END, startIdx + 1);
  if (endIdx < 0) { console.error('End not found in ' + filepath); return; }
  
  const afterEnd = endIdx + OLD_END.length;
  
  // Check if there's a second duplicate block after this
  const secondStart = content.indexOf(OLD_START, afterEnd);
  let cleanContent;
  if (secondStart > 0) {
    // Find the second END
    const secondEnd = content.indexOf(OLD_END, secondStart + 1);
    if (secondEnd > 0) {
      // Remove both blocks
      cleanContent = content.slice(0, startIdx) + content.slice(afterEnd, secondStart) + content.slice(secondEnd + OLD_END.length);
      console.log(filepath + ': removed duplicate block (2 copies found)');
    } else {
      cleanContent = content.slice(0, startIdx) + content.slice(afterEnd);
      console.log(filepath + ': removed only first block');
    }
  } else {
    cleanContent = content.slice(0, startIdx) + content.slice(afterEnd);
    console.log(filepath + ': removed one block (no duplicate)');
  }
  
  fs.writeFileSync(filepath, cleanContent, 'utf-8');
  console.log('  -> Saved: ' + filepath);
});
