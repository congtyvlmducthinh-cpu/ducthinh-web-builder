loadProductsData().then(function() {
  var saved = localStorage.getItem("dq_products");
  if (saved) {
    try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}
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
});