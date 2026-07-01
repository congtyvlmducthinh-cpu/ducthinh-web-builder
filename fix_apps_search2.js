const fs = require('fs');

// === NEW FUNCTIONS to inject ===
// These replace: function renderAppsTab(), renderAppsTabAndSwitch(), countTotalMappings()
// and ADD: applyAppCardFilter(), doSortAppGrid()
// and REPLACE: filterApps()
// The old functions end at line "function filterApps() {" start

const NEW_BLOCK = `function renderAppsTab() {
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

  // Grid of app cards (always render ALL, filter/display in DOM via JS)
  h += '<div class="app-grid" id="appGrid">';
  for (var i = 0; i < DATA_APPLICATIONS.length; i++) {
    var app = DATA_APPLICATIONS[i];
    var style = getAppStyle(i);
    var icon = getAppIcon(i, app.name);
    var count = app.products.length;
    h += '<div class="app-card" ' + style + ' onclick="selectApp(' + i + ')" title="Xem sản phẩm ' + app.name + '"';
    // Data attributes for DOM-only filtering (no re-render)
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
    // Re-apply filter after render
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
 * Filter app cards in the DOM directly — NO re-render, NO focus loss
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
 * Sort app cards in DOM (no re-render)
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
  for (var i = 0; i < cards.length; i++) {
    grid.appendChild(cards[i]);
  }
  applyAppCardFilter();
}

// ====== RENDER DETAIL ====== (same as before, kept for compatibility)

`;

files = ['sites/kiem-tra-gia/vi.html', 'sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html'];

files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf-8');

  // 1. Replace function renderAppsTab()
  var start = content.indexOf('function renderAppsTab() {');
  if (start < 0) { console.error('Cannot find renderAppsTab in ' + filepath); return; }

  // Find the end of countTotalMappings function (the next function after renderAppDetail)
  // Pattern: end of getSharingApps is before "// ====== EVENT HANDLERS ======"
  var sectionEnd = content.indexOf('// ====== EVENT HANDLERS ======');
  if (sectionEnd < 0) { console.error('Cannot find EVENT HANDLERS marker in ' + filepath); return; }

  // The block from renderAppsTab up to EVENT HANDLERS
  var oldBlock = content.slice(start, sectionEnd);

  // The new block content up to EVENT HANDLERS
  // We also need to keep renderAppDetail and getSharingApps functions which were in the old block
  // So let's determine the split more carefully

  // Find where renderAppDetail function starts (this we keep)
  var detailStart = oldBlock.indexOf('function renderAppDetail(app) {');
  var sharingStart = oldBlock.indexOf('function getSharingApps(currentApp) {');
  
  var newStart = NEW_BLOCK; // functions that replace renderAppsTab + renderAppsTabAndSwitch + countTotalMappings + new helpers
  
  // Keep renderAppDetail + getSharingApps from the old block
  var keptFunctions = '';
  if (detailStart >= 0) keptFunctions += oldBlock.slice(detailStart);
  else if (sharingStart >= 0) keptFunctions += oldBlock.slice(sharingStart);
  else keptFunctions = ''; // shouldn't happen

  var newSection = newStart + keptFunctions;
  
  content = content.slice(0, start) + newSection + content.slice(sectionEnd);
  
  // 2. Replace filterApps function body
  var filterStart = content.indexOf('function filterApps() {');
  if (filterStart < 0) { console.error('Cannot find filterApps in ' + filepath); return; }
  
  // Find next function after filterApps
  var nextFunc = content.indexOf('\nfunction ', filterStart + 20);
  if (nextFunc < 0) nextFunc = content.indexOf('\n    function ', filterStart + 20);
  // Actually just find the closing line count of filterApps
  // filterApps old: 4 lines, function selectApp is next
  var selectAppStart = content.indexOf('\nfunction selectApp(', filterStart);
  if (selectAppStart < 0) { console.error('Cannot find selectApp after filterApps in ' + filepath); return; }
  
  var newFilter = `function filterApps() {
  var input = document.getElementById("appSearchInput");
  if (!input) return;
  appSearchTerm = input.value;
  // Direct DOM filtering — no re-render, no focus loss
  applyAppCardFilter();
}`;

  content = content.slice(0, filterStart) + newFilter + content.slice(selectAppStart);

  // 3. Remove the old renderAppsTabAndSwitch which is now part of NEW_BLOCK
  // Already done since we replaced the entire section

  // 4. Remove old countTotalMappings
  // Already in new section

  // 5. Adjust the renderAppDetail and getSharingApps if they have issues
  // check for any extra "function selectApp" duplication

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Updated: ' + filepath);
});

console.log('Done');
