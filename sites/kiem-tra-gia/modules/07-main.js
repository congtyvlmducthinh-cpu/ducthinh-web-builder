// ====== GLOBAL SEARCH ======
function globalSearch() { render(); }

// ====== TOGGLE CURRENCY ======
function toggleCurrency(el) {
  currency = el.dataset.currency;
  document.querySelectorAll(".currency-toggle button").forEach(function(b) { b.classList.toggle("active", b.dataset.currency === currency); });
  render();
}

// ====== SWITCH TAB ======
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.tab === tab); });
  
  // Control bar visibility
  var cbar = document.getElementById("controlBar");
  if (cbar) cbar.style.display = (tab === "pricelist") ? "flex" : "none";
  
  // Price mode bar only on pricelist
  var bar = document.getElementById("priceModeBar");
  if (bar) bar.style.display = (tab === "pricelist") ? "flex" : "none";
  
  // Manage panel
  document.getElementById("managePanel").classList.toggle("open", tab === "manage");
  
  // Populate filters on pricelist tab
  if (tab === "pricelist") populateFilters();
  
  render();
}


// ====== MAIN RENDER ======
function render() {
  var container = document.getElementById("mainContainer");
  if (!container) return;
  
  // Control bar visibility (safe redundant call)
  var cbar = document.getElementById("controlBar");
  if (cbar) cbar.style.display = (activeTab === "pricelist") ? "flex" : "none";
  var pBar = document.getElementById("priceModeBar");
  if (pBar) pBar.style.display = (activeTab === "pricelist") ? "flex" : "none";
  
  if (activeTab === "pricelist") populateFilters();
  
  if (activeTab === "pricelist") {
    container.innerHTML = renderPriceTab();
  } else if (activeTab === "bags") {
    container.innerHTML = renderBagsTab();
  } else if (activeTab === "others") {
    container.innerHTML = renderOthersTab();
  } else if (activeTab === "calc") {
    container.innerHTML = renderCalcTab();
    setTimeout(function(){ filterCalcProducts(); filterBagSpec();
    // Sync calc currency toggle with current global currency
    var vndBtn = document.getElementById("calcCcyVnd");
    var usdBtn = document.getElementById("calcCcyUsd");
    if (vndBtn && usdBtn) {
      vndBtn.classList.toggle("active", currency === "VND");
      usdBtn.classList.toggle("active", currency === "USD");
    }
  }, 0);
  } else if (activeTab === "manage") {
    container.innerHTML = "";
  } else {
    container.innerHTML = "";
  }
}



// ====== MISSING FUNCTIONS ======

// ====== SAVE DATA TO SERVER ======
function detectCurrentLang() {
  var path = window.location.pathname;
  var m = path.match(/\/(vi|en|zh)(?:\.html)?(?:\/|$)/);
  return m ? m[1] : "vi";
}

function saveToServer() {
  var btn = document.getElementById("saveServerBtn");
  if (!btn) return;
  var origText = btn.textContent;
  btn.textContent = "⏳ Đang lưu...";
  btn.disabled = true;
  var status = document.getElementById("manageUploadStatus");

  var payload = {
    lang: "__ALL__",
    blocks: {
      DATA_PRODUCTS: "var DATA_PRODUCTS = " + JSON.stringify(DATA_PRODUCTS, null, 2) + ";",
      DATA_BAGS: "var DATA_BAGS = " + JSON.stringify(DATA_BAGS, null, 2) + ";",
      DATA_OTHERS: "var DATA_OTHERS = " + JSON.stringify(DATA_OTHERS, null, 2) + ";",
      DATA_MAX_LOADING: "var DATA_MAX_LOADING = " + JSON.stringify(DATA_MAX_LOADING, null, 2) + ";",
      DATA_COST_FOB: "var DATA_COST_FOB = " + JSON.stringify(DATA_COST_FOB, null, 2) + ";"
    }
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/ktg-data", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    btn.textContent = origText;
    btn.disabled = false;
    if (status) {
      status.style.display = "block";
      status.className = xhr.status === 200 ? "manage-status-sm ok" : "manage-status-sm err";
      status.textContent = xhr.status === 200
        ? "✅ Đã lưu lên server! Tải lại en.html, zh.html để thấy dữ liệu mới."
        : "❌ Lỗi: " + xhr.status + " - " + xhr.statusText;
    }
  };
  xhr.onerror = function() {
    btn.textContent = origText;
    btn.disabled = false;
    if (status) {
      status.style.display = "block";
      status.className = "manage-status-sm err";
      status.textContent = "❌ Không thể kết nối server!";
    }
  };
  xhr.send(JSON.stringify(payload));
}
function updateDataInfo() {
  var el = document.getElementById("dataInfo");
  if (!el) return;
  el.textContent = "📊 " + DATA_PRODUCTS.length + " SP · " + DATA_BAGS.length + " BB · " + DATA_OTHERS.length + " QC";
}

// Language switch (i18n stub - keeps layout functional)
var currentLang = "vi";
var i18nStrings = {};
function setLang(lang) {
  currentLang = lang;
  // Simple implementation - just updates visible text
  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    var key = el.getAttribute("data-i18n");
    if (i18nStrings[key] && i18nStrings[key][lang]) {
      el.textContent = i18nStrings[key][lang];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-placeholder");
    if (i18nStrings[key] && i18nStrings[key][lang]) {
      el.placeholder = i18nStrings[key][lang];
    }
  });
  document.querySelectorAll(".lang-btn").forEach(function(b) {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}


