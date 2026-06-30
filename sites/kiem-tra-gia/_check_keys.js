var fs = require('fs');
["vi","en","zh"].forEach(function(l) {
  var c = fs.readFileSync("src/lang/" + l + ".js", "utf-8");
  var keys = c.match(/  [A-Z_]+:/g);
  console.log(l + ": " + keys.length + " keys");
});
