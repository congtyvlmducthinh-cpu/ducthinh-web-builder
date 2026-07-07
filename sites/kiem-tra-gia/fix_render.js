var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');

// Fix render() to include fobptsc tab
var old = '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else {\n    container.innerHTML = "";\n  }';
var updated = '} else if (activeTab === "quotation") {\n    container.innerHTML = renderQuotationTab();\n    setTimeout(function(){ quotInitRender(); }, 0);\n  } else if (activeTab === "fobptsc") {\n    container.innerHTML = "";\n  } else {\n    container.innerHTML = "";\n  }';
h = h.split(old).join(updated);

fs.writeFileSync(__dirname + '/vi.html', h, 'utf8');
console.log('Done - render() updated with fobptsc');
