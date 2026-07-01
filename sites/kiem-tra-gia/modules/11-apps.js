/**
 * 11-apps.js — Tab Ứng Dụng Sản Phẩm
 * Hiển thị sản phẩm theo nhóm ứng dụng (Masterbatch, Sơn nước, Bột bả...)
 *
 * FIX: filterApps() dùng DOM filtering thay vì re-render → hết mất focus, hết lag
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

function parseSpecRow(specRaw) {
  if (!specRaw) return '<span class="muted">—</span>';
  var lines = specRaw.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
  var h = '';
  for (var i = 0; i < lines.length; i++) {
    h += '<div>' + lines[i] + '</div>';
  }
  return h;
}

function findProductByCode(code) {
  var candidates = code.split(/[\n,]+/).map(function(s) { return s.trim(); }).filter(Boolean);
  for (var ci = 0; ci < candidates.length; ci++) {
    for (var i = 0; i < DATA_PRODUCTS.length; i++) {
      if (DATA_PRODUCTS[i].code === candidates[ci]) return DATA_PRODUCTS[i];
    }
  }
  return null;
}

function renderAppsTab() {
  if (activeApp) {
    return renderAppDetail(activeApp);
  }

  var h = "";
  h += '<div class="controls">';
  h += '<input type="text" id="appSearchInput" placeholder="🔍 Tìm ứng dụng hoặc mã SP..." value="' + appSearchTerm.replace(/"/g, '&quot;') + '" oninput="filterApps()">';
  h += '<select id="appSortSelect" onchange="doSortAppGrid()">';
  h += '<option value="index">Mặc định</option>';
  h += '<option value="count">Theo số SP (nhiều→ít)</option>';
  h += '<option value="alpha">Theo tên A→Z</option>';
  h += '</select>';
  h += '</div>';

  h += '<div class="summary-bar" id="appsSummaryBar">';
  h += '<div class="summary-card" id="appsSummaryCount"><div class="lbl">Ứng dụng</div><div class="val">' + DATA_APPLICATIONS.length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Mapping SP</div><div class="val">' + countTotalMappings(DATA_APPLICATIONS) + '</div></div>';
  h += '</div>';

  h += '<div class="app-grid" id="appGrid">';
  for (var i = 0; i < DATA_APPLICATIONS.length; i++) {
    var app = DATA_APPLICATIONS[i];
    var style = getAppStyle(i);
    var icon = getAppIcon(i, app.name);
    var count = app.products.length;
    h += '<div class="app-card" ' + style + ' onclick="selectApp(' + i + ')" title="Xem sản phẩm ' + app.name + '"';
    h += ' data-index="' + i + '"';
    h += ' data-name="' + app.name.replace(/"/g, '&quot;').replace(/\n/g, ' ').toLowerCase() + '"';
    var codes = '';
    for (var ci = 0; ci < app.products.length; ci++) {
      codes += app.products[ci].code.replace(/\n/g, ' ') + ' ';
    }
    h += ' data-code="' + codes.replace(/"/g, '&quot;').toLowerCase() + '"';
    h += '>';
    h += '<div class="app-card-icon">' + icon + '</div>';
    h += '<div class="app-card-name">' + app.name.replace(/\n/g, '<br>') + '</div>';
    h += '<div class="app-card-count">' + count + ' SP</div>';
    h += '</div>';
  }
  h += '</div>';
  return h;
}

function renderAppsTabAndSwitch() {
  var container = document.getElementById("mainContainer");
  if (container && activeTab === "apps") {
    container.innerHTML = renderAppsTab();
    if (appSearchTerm) {
      applyAppCardFilter();
    }
  }
}

function countTotalMappings(apps) {
  var count = 0;
  for (var i = 0; i < apps.length; i++) count += apps[i].products.length;
  return count;
}

function applyAppCardFilter() {
  var grid = document.getElementById("appGrid");
  if (!grid) return;
  var term = (appSearchTerm || "").toLowerCase().trim();
  var cards = grid.querySelectorAll(".app-card");
  var visibleCount = 0;
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (!term) {
      card.style.display = "";
      visibleCount++;
    } else {
      var name = (card.getAttribute("data-name") || "");
      var code = (card.getAttribute("data-code") || "");
      var match = name.indexOf(term) >= 0 || code.indexOf(term) >= 0;
      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    }
  }
  var summaryEl = document.getElementById("appsSummaryCount");
  if (summaryEl) {
    var valEl = summaryEl.querySelector(".val");
    if (valEl) valEl.textContent = visibleCount;
  }
}

function doSortAppGrid() {
  var grid = document.getElementById("appGrid");
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".app-card"));
  var sortBy = document.getElementById("appSortSelect").value;
  if (sortBy === "index") {
    cards.sort(function(a, b) {
      return parseInt(a.getAttribute("data-index")) - parseInt(b.getAttribute("data-index"));
    });
  } else if (sortBy === "count") {
    cards.sort(function(a, b) {
      var ca = parseInt(a.querySelector(".app-card-count").textContent);
      var cb = parseInt(b.querySelector(".app-card-count").textContent);
      return cb - ca;
    });
  } else if (sortBy === "alpha") {
    cards.sort(function(a, b) {
      return (a.getAttribute("data-name") || "").localeCompare(b.getAttribute("data-name") || "");
    });
  }
  for (var i = 0; i < cards.length; i++) {
    grid.appendChild(cards[i]);
  }
  applyAppCardFilter();
}

function renderAppDetail(app) {
  var h = "";
  h += '<div style="margin-bottom:16px">';
  h += '<button class="btn-cancel" onclick="backToAppsGrid()" style="margin-right:10px">← Quay lại</button>';
  h += '</div>';
  h += '<div class="apps-detail-header">';
  h += '<div class="apps-detail-title" id="appsDetailTitle">' + app.name.replace(/\n/g, ' / ') + '</div>';
  h += '<div class="apps-detail-sub">' + app.products.length + ' sản phẩm</div>';
  h += '</div>';
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

function getSharingApps(currentApp) {
  var codes = {};
  for (var ci = 0; ci < currentApp.products.length; ci++) {
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
          ci2 = a.products.length;
          break;
        }
      }
    }
  }
  var seen = {}, uniq = [];
  for (var si = 0; si < shared.length; si++) {
    if (!seen[shared[si]]) { seen[shared[si]] = true; uniq.push(shared[si]); }
  }
  return uniq;
}

// ====== EVENT HANDLERS ======

function filterApps() {
  var input = document.getElementById("appSearchInput");
  if (!input) return;
  appSearchTerm = input.value;
  applyAppCardFilter(); // DOM only — no re-render
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
