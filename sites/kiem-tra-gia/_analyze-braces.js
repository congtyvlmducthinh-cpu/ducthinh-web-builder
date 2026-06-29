var fs = require('fs');

// ============ THE PROBLEM ============
// server.js.broken has:
//   Lines 1-34: Callback body code (KTG API handlers) ← IN CALLBACK SCOPE
//   Lines 35-173: Module-level code (require, globals, functions) ← IN CALLBACK SCOPE (WRONG!)
//   Lines 175-306: serveHTML function ← IN CALLBACK SCOPE
//   Lines 307+: Rest of callback body → server.listen ← SUPPOSED TO BE IN CALLBACK SCOPE
//
// Fix: Extract module-level code to the TOP, then callback body correctly

var js = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');
var lines = js.split('\n');

// Extract sections:
// Section A: Module-level code (lines 35-173) - move to top
// Section B: Callback body start (lines 1-34) - should be INSIDE callback  
// Section C: serveHTML function definition (line 175 onwards)
// Section D: serveHTML implementation (lines 175-306) 
// Section E: rest of callback body (line 307 onwards)

// Wait, actually the entire file IS inside the callback because there's no module-level
// top. The original file was:
// const http = require('http');
// ...
// const server = http.createServer((req, res) => {
//   ... callback body ...
// });
// server.listen(...);

// But the broken file merged:
// Actually, let me check what's before the first line
// Line 1 is empty or inside callback?

// Line 1: blank line (inside callback)
// Lines 2-33: KTG API handlers (2 copies)
// Line 34: blank
// Lines 35-173: ACTUAL require/globals that used to be at the top

// This means the "const server = http.createServer((req, res) => {" line
// was somehow removed or the callback opens before line 1.

// Let me check if there's a "const server = http.createServer" anywhere
var createServerIdx = js.indexOf('const server = http.createServer');
console.log('createServer at:', createServerIdx);

// If it's negative, then the file starts INSIDE the callback
// because the createServer line was LOST when patching.

// Let me check the original file (~line 152 area in working version)
// The callback opens around where the action starts

// Let me look at what's really going on with full context
var allContent = fs.readFileSync('C:/Users/Admin/.openclaw/canvas/server.js.broken', 'utf-8');
console.log('File length:', allContent.length);

// Let me find ALL curly braces at top level and count them
var braceCount = 0;
var topLevelBraces = [];
for (var i = 0; i < allContent.length; i++) {
  var c = allContent[i];
  // Skip strings
  if (c === "'" || c === '"' || c === '`') {
    var quote = c;
    i++;
    while (i < allContent.length) {
      if (allContent[i] === '\\') { i += 2; continue; }
      if (allContent[i] === quote) break;
      i++;
    }
    continue;
  }
  if (c === '{') {
    if (braceCount === 0) topLevelBraces.push({type:'open', i:i});
    braceCount++;
  }
  if (c === '}') {
    braceCount--;
    if (braceCount === 0) topLevelBraces.push({type:'close', i:i});
  }
}

console.log('\nTop-level braces:');
for (var b = 0; b < topLevelBraces.length; b++) {
  var ctx = allContent.substring(topLevelBraces[b].i, Math.min(topLevelBraces[b].i + 50, allContent.length)).replace(/\n/g, '\\n').substring(0, 60);
  console.log('  ' + topLevelBraces[b].type + ' at ' + topLevelBraces[b].i + ': "' + ctx + '"');
}

// This will help understand the structure
