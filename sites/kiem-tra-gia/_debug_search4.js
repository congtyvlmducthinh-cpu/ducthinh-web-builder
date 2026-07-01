const fs = require('fs');
const html = fs.readFileSync('vi.html', 'utf-8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];

// Extract the globalSearch function
const gsMatch = js.match(/function globalSearch[\s\S]*?\n\}/);
console.log("=== globalSearch function ===");
console.log(gsMatch ? gsMatch[0].substring(0, 2000) : "NOT FOUND");

// Extract the render function  
const rMatch = js.match(/function render[\s\S]*?\n\}/);
console.log("\n=== render function ===");
console.log(rMatch ? rMatch[0].substring(0, 1000) : "NOT FOUND");

// Check if render() calls renderPriceTab() or renderBagsTab etc
// Let me look at the switchTab function
const stMatch = js.match(/function switchTab[\s\S]*?^function /m);
console.log("\n=== switchTab (truncated) ===");
console.log(stMatch ? stMatch[0].substring(0, 3000) : "NOT FOUND");
