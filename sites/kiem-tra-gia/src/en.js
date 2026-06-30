loadProductsData().then(function() {
  var saved = localStorage.getItem("dq_products");
  if (saved) {
    try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}
  }
  var savedBags = localStorage.getItem("dq_bags");
  if (savedBags) {
    try { DATA_BAGS = JSON.parse(savedBags); } catch(e) {}
  }
  var savedOthers = localStorage.getItem("dq_others");
  if (savedOthers) {
    try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
  }
  var savedML = localStorage.getItem("dq_maxLoading");
  if (savedML) {
    try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
  }
  var savedCF = localStorage.getItem("dq_costFOB");
  if (savedCF) {
    try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
  }
  applyMarket();
  switchTab("pricelist");
}).catch(function(err) {
  console.error('Error loading data, using localStorage fallback', err);
  var saved = localStorage.getItem("dq_products");
  if (saved) {
    try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}  
  }
  var savedBags = localStorage.getItem("dq_bags");
  if (savedBags) {
    try { DATA_BAGS = JSON.parse(savedBags); } catch(e) {}
  }
  var savedOthers = localStorage.getItem("dq_others");
  if (savedOthers) {
    try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
  }
  var savedML = localStorage.getItem("dq_maxLoading");
  if (savedML) {
    try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
  }
  var savedCF = localStorage.getItem("dq_costFOB");
  if (savedCF) {
    try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
  }
  applyMarket();
  switchTab("pricelist");
