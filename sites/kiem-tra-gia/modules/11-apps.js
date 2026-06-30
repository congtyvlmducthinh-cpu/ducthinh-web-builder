/**
 * 11-apps.js — Tab Ứng Dụng Sản Phẩm
 * Hiển thị sản phẩm theo nhóm ứng dụng (Masterbatch, Sơn nước, Bột bả...)
 */
var activeApp = null;
var appSearchTerm = "";

// Color palette for app cards
var APP_COLORS = [
  {bg: "#e0f2fe", fg: "#0369a1", icon: "🧪"},
  {bg: "#dcfce7", fg: "#15803d", icon: "🎨"},
  {bg: "#fef3c7", fg: "#a16207", icon: "🧱"},
  {bg: "#fce7f3", fg: "#be185d", icon: "🏠"},
  {bg: "#ede9fe", fg: "#6d28d9", icon: "📄"},
  {bg: "#ffedd5", fg: "#c2410c", icon: "🪵"},
  {bg: "#d1fae5", fg: "#065f46", icon: "🚗"},
  {bg: "#f0f9ff", fg: "#1e40af", icon: "🛍️"},
  {bg: "#f5f3ff", fg: "#5b21b6", icon: "🔬"},
  {bg: "#fff7ed", fg: "#9a3412", icon: "🏭"},
  {bg: "#ecfdf5", fg: "#166534", icon: "🌿"},
  {bg: "#fdf2f8", fg: "#9d174d", icon: "💡"},
  {bg: "#eef2ff", fg: "#3730a3", icon: "🪟"},
  {bg: "#fefce8", fg: "#854d0e", icon: "🪨"},
  {bg: "#faf5ff", fg: "#6b21a8", icon: "🧤"},
  {bg: "#fff1f2", fg: "#9f1239", icon: "⚙️"},
  {bg: "#ecfeff", fg: "#0e7490", icon: "🪵"},
  {bg: "#f0fdf4", fg: "#166534", icon: "🧩"},
  {bg: "#fef2f2", fg: "#991b1b", icon: "🛞"},
];

function getAppStyle(index) {
  var c = APP_COLORS[index % APP_COLORS.length];
  return 'style="background:' + c.bg + ';color:' + c.fg + ';border-color:' + c.fg + '33"';
}

function getAppIcon(index, name) {
  var c = APP_COLORS[index % APP_COLORS.length];
  return c.icon;
}

/**
 * Parse spec_raw into structured HTML
 */
function parseSpecRow(specRaw) {
  if (!specRaw) return '<span class="muted">—</span>';
  var lines = specRaw.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
  var h = '';
  for (var i = 0; i < lines.length; i++) {
    h += '<div>' + lines[i] + '</div>';
  }
  return h;
}

/**
 * Find DATA_PRODUCTS entry matching a code
 * Supports multi-code like "H10A2\nF10A2" -> find first match
 */
function findProductByCode(code) {
  // Codes may contain newlines or commas (multiple variants)
  var candidates = code.split(/[\n,]+/).map(function(s) { return s.trim(); }).filter(Boolean);
  for (var ci = 0; ci < candidates.length; ci++) {
    for (var i = 0; i < DATA_PRODUCTS.length; i++) {
      if (DATA_PRODUCTS[i].code === candidates[ci]) return DATA_PRODUCTS[i];
    }
  }
  return null;
}

/**
 * Render the Ứng Dụng tab
 */
function renderAppsTab() {
  var h = "";
  var filtered = DATA_APPLICATIONS;

  // Search filter
  if (appSearchTerm) {
    var st = appSearchTerm.toLowerCase();
    filtered = filtered.filter(function(a) {
      if (a.name.toLowerCase().indexOf(st) >= 0) return true;
      for (var i = 0; i < a.products.length; i++) {
        if (a.products[i].code.toLowerCase().indexOf(st) >= 0) return true;
      }
      return false;
    });
  }

  // If an app is selected, show detail view
  if (activeApp) {
    return renderAppDetail(activeApp);
  }

  // === GRID VIEW: All apps ===
  h += '<div class="controls">';
  h += '<input type="text" id="appSearchInput" placeholder="🔍 Tìm ứng dụng hoặc mã SP..." value="' + appSearchTerm.replace(/"/g, '&quot;') + '" oninput="filterApps()">';
  h += '<select id="appSortSelect" onchange="renderAppsTabAndSwitch()">';
  h += '<option value="count">Theo số SP (nhiều→ít)</option>';
  h += '<option value="alpha">Theo tên A→Z</option>';
  h += '</select>';
  h += '</div>';

  // Summary bar
  h += '<div class="summary-bar">';
  h += '<div class="summary-card"><div class="lbl">Ứng dụng</div><div class="val">' + filtered.length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Mapping SP</div><div class="val">' + countTotalMappings(filtered) + '</div></div>';
  h += '</div>';

  // Grid of app cards
  h += '<div class="app-grid">';
  for (var i = 0; i < filtered.length; i++) {
    var app = filtered[i];
    var style = getAppStyle(i);
    var icon = getAppIcon(i, app.name);
    var count = app.products.length;
    h += '<div class="app-card" ' + style + ' onclick="selectApp(' + i + ')" title="Xem sản phẩm ' + app.name + '">';
    h += '<div class="app-card-icon">' + icon + '</div>';
    h += '<div class="app-card-name">' + app.name.replace(/\n/g, '<br>') + '</div>';
    h += '<div class="app-card-count">' + count + ' SP</div>';
    h += '</div>';
  }
  h += '</div>';

  // "Back to grid" hidden (only when in detail)
  return h;
}

function renderAppsTabAndSwitch() {
  var container = document.getElementById("mainContainer");
  if (container && activeTab === "apps") {
    container.innerHTML = renderAppsTab();
    attachAppEvents();
  }
}

function countTotalMappings(apps) {
  var count = 0;
  for (var i = 0; i < apps.length; i++) count += apps[i].products.length;
  return count;
}

/**
 * Render detail for a specific application
 */
function renderAppDetail(app) {
  var h = "";
  h += '<div style="margin-bottom:16px">';
  h += '<button class="btn-cancel" onclick="backToAppsGrid()" style="margin-right:10px">← Quay lại</button>';
  h += '</div>';

  // App header
  h += '<div class="apps-detail-header">';
  h += '<div class="apps-detail-title" id="appsDetailTitle">' + app.name.replace(/\n/g, ' / ') + '</div>';
  h += '<div class="apps-detail-sub">' + app.products.length + ' sản phẩm</div>';
  h += '</div>';

  // Products table
  h += '<div class="table-wrap"><table><thead>';
  h += '<tr><th>Mã SP</th><th>Thông số kỹ thuật</th><th>Máy</th><th>Giá tham khảo</th><th></th></tr>';
  h += '</thead><tbody>';

  for (var i = 0; i < app.products.length; i++) {
    var p = app.products[i];
    var product = findProductByCode(p.code);
    var displayCode = p.code.replace(/\n/g, '<br>');
    var displayMachine = (p.machine || "").replace(/\n/g, '<br>');

    h += '<tr>';
    h += '<td><strong>' + displayCode + '</strong></td>';
    h += '<td class="apps-spec-cell">' + parseSpecRow(p.spec_raw) + '</td>';
    h += '<td>' + displayMachine + '</td>';

    // Price reference column
    if (product) {
      var price = product.exw_vnd ? product.exw_vnd.toLocaleString('vi-VN') : '—';
      h += '<td class="text-right"><span class="apps-price-ref">' + price + '</span><br><span class="info-row">VND/tấn</span></td>';
      h += '<td><button class="apps-view-price-btn" onclick="gotoPriceTab(\'' + product.code.replace(/'/g, "\\'") + '\')">📋 Xem giá</button></td>';
    } else {
      h += '<td class="text-right"><span class="muted">—</span></td>';
      h += '<td></td>';
    }

    h += '</tr>';
  }

  h += '</tbody></table></div>';

  // Other apps that share these products
  var sharing = getSharingApps(app);
  if (sharing.length > 0) {
    h += '<div class="apps-sharing-bar">';
    h += '<span class="apps-sharing-label">🔗 Sản phẩm trong ứng dụng này cũng được dùng cho:</span>';
    for (var si = 0; si < sharing.length; si++) {
      h += '<span class="apps-sharing-tag" onclick="selectAppByName(\'' + sharing[si].replace(/'/g, "\\'") + '\')">' + sharing[si] + '</span>';
    }
    h += '</div>';
  }

  return h;
}

/**
 * Find other apps that share products with the current one (cross-reference)
 */
function getSharingApps(currentApp) {
  var codes = {};
  for (var ci = 0; ci < currentApp.products.length; ci++) {
    // Get base codes without \n
    var parts = currentApp.products[ci].code.split('\n');
    for (var pi = 0; pi < parts.length; pi++) {
      codes[parts[pi].trim()] = true;
    }
  }
  var shared = [];
  for (var ai = 0; ai < DATA_APPLICATIONS.length; ai++) {
    var a = DATA_APPLICATIONS[ai];
    if (a.name === currentApp.name) continue;
    for (var ci2 = 0; ci2 < a.products.length; ci2++) {
      var parts2 = a.products[ci2].code.split('\n');
      for (var pi2 = 0; pi2 < parts2.length; pi2++) {
        if (codes[parts2[pi2].trim()]) {
          shared.push(a.name.replace(/\n/g, ' / '));
          ci2 = a.products.length; // break outer
          break;
        }
      }
    }
  }
  // Deduplicate
  var seen = {}, uniq = [];
  for (var si = 0; si < shared.length; si++) {
    if (!seen[shared[si]]) { seen[shared[si]] = true; uniq.push(shared[si]); }
  }
  return uniq;
}

// ====== EVENT HANDLERS ======

function filterApps() {
  var input = document.getElementById("appSearchInput");
  appSearchTerm = input ? input.value : "";
  renderAppsTabAndSwitch();
}

function selectApp(index) {
  activeApp = DATA_APPLICATIONS[index];
  renderAppsTabAndSwitch();
}

function selectAppByName(name) {
  for (var i = 0; i < DATA_APPLICATIONS.length; i++) {
    if (DATA_APPLICATIONS[i].name === name || DATA_APPLICATIONS[i].name.replace(/\n/g, ' / ') === name) {
      activeApp = DATA_APPLICATIONS[i];
      renderAppsTabAndSwitch();
      return;
    }
  }
}

function backToAppsGrid() {
  activeApp = null;
  renderAppsTabAndSwitch();
}

function gotoPriceTab(code) {
  // Switch to price tab and auto-fill search with this code
  switchTab("pricelist");
  var searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = code;
    globalSearch();
  }
}

function attachAppEvents() {
  // Already handled via oninput
}
