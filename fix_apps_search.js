const fs = require('fs');
const files = ['sites/kiem-tra-gia/vi.html', 'sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html'];

// New functions to replace old ones (lines 2296-2471)
const newCode = `function renderAppsTab() {
  // If an app is selected, show detail view
  if (activeApp) {
    return renderAppDetail(activeApp);
  }

  var h = "";

  // === CONTROLS ===
  h += '<div class="controls">';
  h += '<input type="text" id="appSearchInput" placeholder="🔍 Tìm ứng dụng hoặc mã SP..." value="' + appSearchTerm.replace(/"/g, '&quot;') + '" oninput="filterApps()">';
  h += '<select id="appSortSelect" onchange="doSortAppGrid()">';
  h += '<option value="index">Mặc định</option>';
  h += '<option value="count">Theo số SP (nhiều→ít)</option>';
  h += '<option value="alpha">Theo tên A→Z</option>';
  h += '</select>';
  h += '</div>';

  // Summary bar
  h += '<div class="summary-bar" id="appsSummaryBar">';
  h += '<div class="summary-card" id="appsSummaryCount"><div class="lbl">Ứng dụng</div><div class="val">' + DATA_APPLICATIONS.length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Mapping SP</div><div class="val">' + countTotalMappings(DATA_APPLICATIONS) + '</div></div>';
  h += '</div>';

  // Grid of app cards
  h += '<div class="app-grid" id="appGrid">';
  for (var i = 0; i < DATA_APPLICATIONS.length; i++) {
    var app = DATA_APPLICATIONS[i];
    var style = getAppStyle(i);
    var icon = getAppIcon(i, app.name);
    var count = app.products.length;
    h += '<div class="app-card" ' + style + ' onclick="selectApp(' + i + ')" title="Xem sản phẩm ' + app.name + '"';
    // Data attributes for DOM filtering (no re-render needed)
    h += ' data-index="' + i + '"';
    h += ' data-name="' + app.name.replace(/"/g, '&quot;').replace(/\\n/g, ' ').toLowerCase() + '"';
    var codes = '';
    for (var ci = 0; ci < app.products.length; ci++) {
      codes += app.products[ci].code.replace(/\\n/g, ' ') + ' ';
    }
    h += ' data-code="' + codes.replace(/"/g, '&quot;').toLowerCase() + '"';
    h += '>';
    h += '<div class="app-card-icon">' + icon + '</div>';
    h += '<div class="app-card-name">' + app.name.replace(/\\n/g, '<br>') + '</div>';
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
    // Re-apply filter after re-render if there's a search term
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

/**
 * Filter app cards in the DOM directly — no re-render, no focus loss
 */
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
  // Update summary count live
  var summaryEl = document.getElementById("appsSummaryCount");
  if (summaryEl) {
    var valEl = summaryEl.querySelector(".val");
    if (valEl) valEl.textContent = visibleCount;
  }
}

/**
 * Sort app cards in DOM
 */
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
  // Re-append in sorted order
  for (var i = 0; i < cards.length; i++) {
    grid.appendChild(cards[i]);
  }
  // Re-apply filter after sort
  applyAppCardFilter();
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
  h += '<div class="apps-detail-title" id="appsDetailTitle">' + app.name.replace(/\\n/g, ' / ') + '</div>';
  h += '<div class="apps-detail-sub">' + app.products.length + ' sản phẩm</div>';
  h += '</div>';

  // Products table
  h += '<div class="table-wrap"><table><thead>';
  h += '<tr><th>Mã SP</th><th>Thông số kỹ thuật</th><th>Máy</th><th>Giá tham khảo</th><th></th></tr>';
  h += '</thead><tbody>';

  for (var i = 0; i < app.products.length; i++) {
    var p = app.products[i];
    var product = findProductByCode(p.code);
    var displayCode = p.code.replace(/\\n/g, '<br>');
    var displayMachine = (p.machine || "").replace(/\\n/g, '<br>');

    h += '<tr>';
    h += '<td><strong>' + displayCode + '</strong></td>';
    h += '<td class="apps-spec-cell">' + parseSpecRow(p.spec_raw) + '</td>';
    h += '<td>' + displayMachine + '</td>';

    // Price reference column
    if (product) {
      var price = product.exw_vnd ? product.exw_vnd.toLocaleString('vi-VN') : '—';
      h += '<td class="text-right"><span class="apps-price-ref">' + price + '</span><br><span class="info-row">VND/tấn</span></td>';
      h += '<td><button class="apps-view-price-btn" onclick="gotoPriceTab(\\'' + product.code.replace(/'/g, "\\\\'") + '\\')">📋 Xem giá</button></td>';
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
      h += '<span class="apps-sharing-tag" onclick="selectAppByName(\\'' + sharing[si].replace(/'/g, "\\\\'") + '\\')">' + sharing[si] + '</span>';
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
    // Get base codes without \\n
    var parts = currentApp.products[ci].code.split('\\n');
    for (var pi = 0; pi < parts.length; pi++) {
      codes[parts[pi].trim()] = true;
    }
  }
  var shared = [];
  for (var ai = 0; ai < DATA_APPLICATIONS.length; ai++) {
    var a = DATA_APPLICATIONS[ai];
    if (a.name === currentApp.name) continue;
    for (var ci2 = 0; ci2 < a.products.length; ci2++) {
      var parts2 = a.products[ci2].code.split('\\n');
      for (var pi2 = 0; pi2 < parts2.length; pi2++) {
        if (codes[parts2[pi2].trim()]) {
          shared.push(a.name.replace(/\\n/g, ' / '));
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
  if (!input) return;
  appSearchTerm = input.value;
  // Don't re-render — filter existing cards in DOM directly
  applyAppCardFilter();
}

function selectApp(index) {
  activeApp = DATA_APPLICATIONS[index];
  renderAppsTabAndSwitch();
}

function selectAppByName(name) {
  for (var i = 0; i < DATA_APPLICATIONS.length; i++) {
    if (DATA_APPLICATIONS[i].name === name || DATA_APPLICATIONS[i].name.replace(/\\n/g, ' / ') === name) {
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
}`;

// Read old code to verify boundary markers
const oldCodeStart = 'function renderAppsTab() {';
const oldCodeEnd = '  renderAppsTabAndSwitch();\n}\n\n';

files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // Find the functions section (from renderAppsTab to end of filterApps)
  const startIdx = content.indexOf('\n' + oldCodeStart);
  // Find the line "function selectApp(index) {" after filterApps
  const afterFilterApps = content.indexOf('\nfunction selectApp(index) {', startIdx + 1);
  
  if (startIdx < 0 || afterFilterApps < 0) {
    console.error('Cannot find markers in ' + filepath);
    return;
  }
  
  const oldBlock = content.slice(startIdx + 1, afterFilterApps);
  // Replace the old block with new code (keeping the leading newline)
  const newContent = content.slice(0, startIdx + 1) + newCode + content.slice(afterFilterApps);
  
  fs.writeFileSync(filepath, newContent, 'utf-8');
  console.log('Updated: ' + filepath);
});
