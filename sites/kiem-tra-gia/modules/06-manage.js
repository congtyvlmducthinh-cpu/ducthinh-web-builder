// ====== EXPORT FUNCTIONS ======
function exportToExcel() {
  var dt = new Date();
  var isUsd = currency === "USD";
  var modeLabel = priceMode.toUpperCase();
  if (priceMode === "fob" || priceMode === "cif") modeLabel += " (" + (lccType === "sub" ? "Sub LCC" : "No LCC") + ")";
  var fn = "DT-PriceList-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";

  var rows = [["M\u00e3","K\u00edch th\u01b0\u1edbc","Ti\u00eau chu\u1ea9n","M\u00e1y","25KG (VND)","Jumbo (VND)","Gi\u00e1 b\u00e1n (" + modeLabel + ", " + (isUsd ? "USD" : "VND") + ")","Hoa h\u1ed3ng (" + (isUsd ? "USD" : "VND") + ")"]];

  for (var i = 0; i < DATA_PRODUCTS.length; i++) {
    var p = DATA_PRODUCTS[i];
    var price25 = "", priceJumbo = "", sellPrice = "", comm = "";
    if (priceMode === "fob") {
      price25 = getFOB25PriceVND(p, lccType);
      priceJumbo = getFOBJumboPriceVND(p, lccType);
      sellPrice = isUsd ? getFOB25PriceUSD(p, lccType) : getFOB25PriceVND(p, lccType);
    } else if (priceMode === "cif") {
      price25 = getCIF25PriceVND(p, lccType, freightUSD);
      priceJumbo = getCIFJumboPriceVND(p, lccType, freightUSD);
      sellPrice = isUsd ? getCIF25PriceUSD(p, lccType, freightUSD) : getCIF25PriceVND(p, lccType, freightUSD);
    } else {
      price25 = p.pkg25_vnd;
      priceJumbo = p.jumbo_vnd;
      sellPrice = isUsd ? p.exw_usd : p.exw_vnd;
      comm = isUsd ? p.comm_usd : p.comm_vnd;
    }
    rows.push([p.code, p.size, p.standard, p.machine, price25 || "\u2014", priceJumbo || "\u2014", sellPrice || "\u2014", comm || "\u2014"]);
  }

  var ws = XLSX.utils.aoa_to_sheet(rows);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Price");
  XLSX.writeFile(wb, fn);
}

// ====== MANAGE PANEL FUNCTIONS ======
function manageLogin() {
  var pw = document.getElementById("managePass").value;
  if (pw === managePassword) {
    document.getElementById("manageLogin").style.display = "none";
    document.getElementById("manageDashboard").classList.add("open");
    document.getElementById("manageError").style.display = "none";
    document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
    document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
    document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;
  } else {
    document.getElementById("manageError").textContent = "\u274c Sai m\u1eadt kh\u1ea9u!";
    document.getElementById("manageError").style.display = "block";
  }
}


function downloadTemplate(type) {
  var headers, fn, row;
  if (type === 0) {
    fn = "Mau_gia_ban.xlsx";
    headers = ["code","size","standard","machine","max25","maxJumbo","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];
  } else if (type === 1) {
    fn = "Mau_bao_bi.xlsx";
    headers = ["code","cost","spec","qty","price","profit"];
  } else if (type === 2) {
    fn = "Mau_quy_cach_khac.xlsx";
    headers = ["code","name","cost","qty","price","profit"];
  } else if (type === 3) {
    fn = "Mau_max_tai.xlsx";
    headers = ["SẢN PHẨM","Max Loading 25KG","Max Loading Jumbo"];
  }
  var ws = XLSX.utils.aoa_to_sheet([headers]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, fn);
}

function downloadFullTemplate() {
  var ws_data = [];
  var dt = new Date();
  var fn = "DT-Mau_Day_Du-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";
  var wb = XLSX.utils.book_new();
  
  // Sheet 1: Products
  var prodHeaders = ["code","size","standard","machine","max25","maxJumbo","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([prodHeaders]), "Products");
  
  // Sheet 2: Bags
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","cost","spec","qty","price","profit"]]), "Bags");
  
  // Sheet 3: Others
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","name","cost","qty","price","profit"]]), "Others");
  
  // Sheet 4: MaxLoading
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","max25","maxJumbo"]]), "MaxLoading");
  
  // Sheet 5: CostFOB
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["maxLoading","no","sub"]]), "CostFOB");
  
  XLSX.writeFile(wb, fn);
}

function downloadFile(type) {
  var fn = "", data = [], sheetName = "";
  if (type === 0) { fn = "Gia_ban_toi_thieu.xlsx"; data = DATA_PRODUCTS; sheetName = "Products"; }
  else if (type === 1) { fn = "Surcharge_bao_bi.xlsx"; data = DATA_BAGS; sheetName = "Bags"; }
  else if (type === 2) { fn = "Quy_cach_khac.xlsx"; data = DATA_OTHERS; sheetName = "Others"; }
  else if (type === 3) {
    fn = "Max_loadding.xlsx";
    var mlArr = [];
    if (DATA_MAX_LOADING && Object.keys(DATA_MAX_LOADING).length > 0) {
      Object.keys(DATA_MAX_LOADING).forEach(function(k) {
        var o = {"SẢN PHẨM": k};
        if (DATA_MAX_LOADING[k].max25 !== undefined) o["Max Loading 25KG"] = DATA_MAX_LOADING[k].max25;
        if (DATA_MAX_LOADING[k].maxJumbo !== undefined) o["Max Loading Jumbo"] = DATA_MAX_LOADING[k].maxJumbo;
        mlArr.push(o);
      });
    }
    data = mlArr;
    sheetName = "MaxLoading";
  }
  if (!data.length) return;
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fn);
}

function downloadAsExcel() {
  var dt = new Date();
  var fn = "DT-FullData-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_PRODUCTS), "Products");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_BAGS), "Bags");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_OTHERS), "Others");
  // Export MaxLoading if data exists
  if (DATA_MAX_LOADING && Object.keys(DATA_MAX_LOADING).length > 0) {
    var mlArr = [];
    Object.keys(DATA_MAX_LOADING).forEach(function(k) {
      var o = {code: k};
      if (DATA_MAX_LOADING[k].max25 !== undefined) o.max25 = DATA_MAX_LOADING[k].max25;
      if (DATA_MAX_LOADING[k].maxJumbo !== undefined) o.maxJumbo = DATA_MAX_LOADING[k].maxJumbo;
      mlArr.push(o);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(mlArr), "MaxLoading");
  }
  // Export CostFOB if data exists
  if (DATA_COST_FOB && Object.keys(DATA_COST_FOB).length > 0) {
    var cfArr = [];
    Object.keys(DATA_COST_FOB).forEach(function(k) {
      var o = {maxLoading: Number(k)};
      if (DATA_COST_FOB[k].no !== undefined) o.no = DATA_COST_FOB[k].no;
      if (DATA_COST_FOB[k].sub !== undefined) o.sub = DATA_COST_FOB[k].sub;
      cfArr.push(o);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cfArr), "CostFOB");
  }
  XLSX.writeFile(wb, fn);
}

function downloadAsJSON() {
  var dt = new Date();
  var fn = "DT-data-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".js";
  var content = "// Data exported " + dt.toISOString() + "\n";
  content += "var DATA_PRODUCTS = " + JSON.stringify(DATA_PRODUCTS, null, 2) + ";\n\n";
  content += "var DATA_BAGS = " + JSON.stringify(DATA_BAGS, null, 2) + ";\n\n";
  content += "var DATA_OTHERS = " + JSON.stringify(DATA_OTHERS, null, 2) + ";";
  var blob = new Blob([content], {type: "text/javascript"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fn;
  a.click();
}

// Manage file upload
(function() {
  var dropZone = document.getElementById("manageDropZone");
  var fileInput = document.getElementById("manageFileInput");
  if (!dropZone || !fileInput) return;
  dropZone.addEventListener("click", function() { fileInput.click(); });
  dropZone.addEventListener("dragover", function(e) { e.preventDefault(); dropZone.classList.add("dragover"); });
  dropZone.addEventListener("dragleave", function() { dropZone.classList.remove("dragover"); });
  dropZone.addEventListener("drop", function(e) {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length) handleManageFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change", function() {
    if (fileInput.files.length) handleManageFile(fileInput.files[0]);
  });
})();

function handleManageFile(file) {
  var status = document.getElementById("manageUploadStatus");
  status.style.display = "block";
  if (!file.name.match(/.xlsx?$/i)) {
    status.className = "manage-status-sm err";
    status.textContent = "❌ Chỉ hỗ trợ file Excel (.xlsx)";
    return;
  }
  status.className = "manage-status-sm loading";
  status.textContent = "⏳ Đang xử lý file...";
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var wb = XLSX.read(data, {type: "array"});
      var sheets = wb.SheetNames;
      var updated = 0;
      
      // Try multiple sheet name variants
      function hasSheet(variants) {
        for (var i = 0; i < variants.length; i++) {
          if (sheets.indexOf(variants[i]) >= 0) return variants[i];
        }
        return null;
      }
      
      var prodSheet = hasSheet(["Products", "products", "Sản phẩm", "sản phẩm", "Product", "product", "Template", "Giá bán tối thiểu", "giá bán tối thiểu", "Giá bán", "Gia ban", "Giá"]);
      if (prodSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[prodSheet]);
        if (s.length > 0) { importProducts(s); updated++; }
      }
      
      var bagSheet = hasSheet(["Bags", "bags", "Bao bì", "bao bì", "Bao", "bao", "Bag"]);
      if (bagSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[bagSheet]);
        if (s.length > 0) { DATA_BAGS = s; updated++; }
      }
      
      var otherSheet = hasSheet(["Others", "others", "Quy cách khác", "Other", "other"]);
      if (otherSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[otherSheet]);
        if (s.length > 0) { DATA_OTHERS = s; updated++; }
      }
      
      var mlSheet = hasSheet(["MaxLoading", "maxloading", "Max Load", "max_load", "Tải trọng", "tải trọng"]);
      if (mlSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[mlSheet]);
        if (s.length > 0) { importMaxLoading(s); updated++; }
      }
      
      var fobSheet = hasSheet(["CostFOB", "Cost FOB", "costfob", "cost fob", "FOB", "fob", "Cost_FOB", "cost_fob", "Cost Fob"]);
      if (fobSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[fobSheet]);
        if (s.length > 0) { importCostFOB(s); updated++; }
      }
      
      applyMarket();
      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));
      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));
      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));
      localStorage.setItem("dq_maxLoading", JSON.stringify(DATA_MAX_LOADING));
      localStorage.setItem("dq_costFOB", JSON.stringify(DATA_COST_FOB));
            document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
      document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
      document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;
      populateFilters();
      render();
      status.className = "manage-status-sm ok";
            saveToServer();
      status.textContent = "✅ Đã cập nhật " + updated + " bảng dữ liệu!";
    } catch(err) {
      status.className = "manage-status-sm err";
      status.textContent = "❌ Lỗi: " + err.message;
    }
  };
  reader.readAsArrayBuffer(file);
}function importMaxLoading(arr) {
  DATA_MAX_LOADING = {};
  arr.forEach(function(r) {
    // Support Vietnamese column names from Max_loadding.xlsx
    var code = r.code || r.Code || r.CodeSP || r.CodeSP_Standard || r["SẢN PHẨM"] || r["SAN PHAM"] || "";
    if (!code) return;
    var obj = {};
    var v25 = r.max25 || r["Max Loading 25KG"] || r["Max Loading 25kg"] || r["max25"] || r["Max25"];
    var vJb = r.maxJumbo || r["Max Loading Jumbo"] || r["Max Loading jumbo"] || r["maxJumbo"] || r["MaxJumbo"] || r["Max Jumbo"];
    if (v25 !== undefined && v25 !== null && v25 !== "") obj.max25 = Number(v25);
    if (vJb !== undefined && vJb !== null && vJb !== "") obj.maxJumbo = Number(vJb);
    if (Object.keys(obj).length > 0) DATA_MAX_LOADING[code] = obj;
  });
}

function importCostFOB(arr) {
  DATA_COST_FOB = {};
  arr.forEach(function(r) {
    var load = Number(r.maxLoading || r.MaxLoading || r.load || r.Load || r.tan || r.Tan || r["Tấn"] || r["Max loadding"] || r["Max Loadding"]);
    if (!load) return;
    var obj = {};
    var vNo = r.no !== undefined ? r.no : r["No LCC"] || r["No lcc"];
    var vSub = r.sub !== undefined ? r.sub : r["Sub LCC"] || r["Sub lcc"];
    if (vNo !== undefined && vNo !== null && vNo !== "") obj.no = Number(vNo);
    if (vSub !== undefined && vSub !== null && vSub !== "") obj.sub = Number(vSub);
    if (Object.keys(obj).length > 0) DATA_COST_FOB[load] = obj;
  });
}


// ====== PASSWORD MODAL ======
function showPwModal() {
  document.getElementById("pwModal").classList.add("open");
  document.getElementById("pwInput").value = "";
  document.getElementById("pwError").style.display = "none";
}
function closePwModal() {
  document.getElementById("pwModal").classList.remove("open");
}
function checkPassword() {
  if (document.getElementById("pwInput").value === managePassword) {
    closePwModal();
    switchTab("manage");
  } else {
    document.getElementById("pwError").style.display = "block";
  }
}
function manageFromPwModal() { checkPassword(); }

