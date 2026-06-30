const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Restore the template from the backup in the HTML that was printed
// The issue: market-group was removed but it took a chunk of the header with it
// Let me restore from a fresh read and be more careful

// Actually, looking at the output - the removal was too aggressive!
// The template starts with '<div cl' instead of '<!DOCTYPE'
// The market-group </div> closed into the HTML structure

// Let me restore the template from git
