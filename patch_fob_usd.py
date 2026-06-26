import sys
sys.stdout.reconfigure(encoding='utf-8')

path = 'sites/kiem-tra-gia/index.html'
with open(path, 'r', encoding='utf-8') as f:
    data = f.read()

# ============================================================
# STEP 1: Add CIF USD functions (missing)
# ============================================================
old_cif = """function getCIF25PriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "max25");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOB25PriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10) * 26000 / ml);
}
function getCIFJumboPriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "maxJumbo");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOBJumboPriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10) * 26000 / ml);
}"""

new_cif = """function getCIF25PriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "max25");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOB25PriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10) * 26000 / ml);
}
function getCIFJumboPriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "maxJumbo");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOBJumboPriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10) * 26000 / ml);
}
function getCIF25PriceUSD(prod, lccVariant, freight) { return Math.round(getCIF25PriceVND(prod, lccVariant, freight) / 26000); }
function getCIFJumboPriceUSD(prod, lccVariant, freight) { return Math.round(getCIFJumboPriceVND(prod, lccVariant, freight) / 26000); }"""

if old_cif in data:
    data = data.replace(old_cif, new_cif)
    print('1) OK: Added CIF USD functions')
else:
    print('1) FAIL: CIF functions not found')

# ============================================================
# STEP 2: Fix pricelist tab - use USD functions when isUsd
# ============================================================
old_pricelist_fob = """    if (isFob) {
      h += '<td class="text-right">' + formatCurrency(getFOB25PriceVND(p, lccType), false) + '</td>';
      h += '<td class="text-right">' + formatCurrency(getFOBJumboPriceVND(p, lccType), false) + '</td>';
    } else if (isCif) {
      h += '<td class="text-right">' + formatCurrency(getCIF25PriceVND(p, lccType, freightUSD), false) + '</td>';
      h += '<td class="text-right">' + formatCurrency(getCIFJumboPriceVND(p, lccType, freightUSD), false) + '</td>';"""

new_pricelist_fob = """    if (isFob) {
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getFOB25PriceUSD(p, lccType), true) : formatCurrency(getFOB25PriceVND(p, lccType), false)) + '</td>';
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getFOBJumboPriceUSD(p, lccType), true) : formatCurrency(getFOBJumboPriceVND(p, lccType), false)) + '</td>';
    } else if (isCif) {
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getCIF25PriceUSD(p, lccType, freightUSD), true) : formatCurrency(getCIF25PriceVND(p, lccType, freightUSD), false)) + '</td>';
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getCIFJumboPriceUSD(p, lccType, freightUSD), true) : formatCurrency(getCIFJumboPriceVND(p, lccType, freightUSD), false)) + '</td>';"""

if old_pricelist_fob in data:
    data = data.replace(old_pricelist_fob, new_pricelist_fob)
    print('2) OK: Fixed pricelist FOB/CIF USD columns')
else:
    print('2) FAIL: pricelist FOB section not found')
    idx = data.find('if (isFob)')
    print(f'  Found at {idx}')
    if idx >= 0:
        print(data[idx:idx+400])

# ============================================================
# STEP 3: Add currency toggle in renderCalcTab (left panel, top)
# ============================================================
old_left_start = """  h += '<div class="calc-left">';

  // --- Section: Sản phẩm ---"""

new_left_start = """  h += '<div class="calc-left">';

  // Currency toggle for calc tab
  h += '<div class="calc-section" style="margin-bottom:2px">';
  h += '<div class="calc-section-header"><span class="calc-section-icon">\U0001f4b1</span><span>Ti\u1ec1n t\u1ec7</span></div>';
  h += '<div class="calc-row">';
  h += '<div class="calc-currency-bar">';
  h += '<button class="mode-btn active" id="calcCcyVnd" onclick="setCalcCurrency(\'VND\')">VND</button>';
  h += '<button class="mode-btn" id="calcCcyUsd" onclick="setCalcCurrency(\'USD\')">USD</button>';
  h += '</div>';
  h += '</div>';
  h += '</div>';

  // --- Section: Sản phẩm ---"""

if old_left_start in data:
    data = data.replace(old_left_start, new_left_start)
    print('3) OK: Added currency toggle in calc left panel')
else:
    print('3) FAIL: calc left panel not found')

# ============================================================
# STEP 4: Add setCalcCurrency function
# ============================================================
old_pickMode = """function setCalcPriceMode(mode) {"""

new_pickMode = """function setCalcCurrency(ccy) {
  currency = ccy;
  var vndBtn = document.getElementById("calcCcyVnd");
  var usdBtn = document.getElementById("calcCcyUsd");
  if (vndBtn) vndBtn.classList.toggle("active", ccy === "VND");
  if (usdBtn) usdBtn.classList.toggle("active", ccy === "USD");
  calcPrice();
}
function setCalcPriceMode(mode) {"""

if old_pickMode in data:
    data = data.replace(old_pickMode, new_pickMode)
    print('4) OK: Added setCalcCurrency function')
else:
    print('4) FAIL: setCalcPriceMode not found')

# ============================================================
# STEP 5: Fix calcPrice to read from calc currency, not global
# ============================================================
# The calcPrice uses `var isUsd = currency === "USD"` already — good.
# But we need to make sure the topbar's currency button also syncs with calc tab.
# We'll do that at the end.

# ============================================================
# STEP 6: Sync currency buttons — when calc tab opens, highlight correct one
# ============================================================
old_calc_init = """  setTimeout(function(){ filterCalcProducts(); filterBagSpec(); }, 0);"""

new_calc_init = """  setTimeout(function(){ filterCalcProducts(); filterBagSpec();
    // Sync calc currency toggle with current global currency
    var vndBtn = document.getElementById("calcCcyVnd");
    var usdBtn = document.getElementById("calcCcyUsd");
    if (vndBtn && usdBtn) {
      vndBtn.classList.toggle("active", currency === "VND");
      usdBtn.classList.toggle("active", currency === "USD");
    }
  }, 0);"""

if old_calc_init in data:
    data = data.replace(old_calc_init, new_calc_init)
    print('6) OK: Synced calc currency on tab open')
else:
    print('6) FAIL: calc init setTimeout not found')
    idx = data.find('filterCalcProducts(); filterBagSpec()')
    print(f'  Found at {idx}')

# ============================================================
# STEP 7: Remove the old "..., ..." placeholder comments
# ============================================================

# Write
with open(path, 'w', encoding='utf-8') as f:
    f.write(data)
print('DONE!')
