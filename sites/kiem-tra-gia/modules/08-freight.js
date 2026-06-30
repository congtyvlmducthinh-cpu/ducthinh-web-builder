// ====== FREIGHT LOOKUP POPUP ======
var selectedFreightRoute = null;

function showFreightPopup() {
  var popup = document.getElementById("freightPopup");
  if (!popup) return;
  
  // Populate filters
  var countries = {}, forwarders = {}, vias = {};
  FREIGHT_DATA.forEach(function(r) {
    countries[r.country] = true;
    forwarders[r.forwarder] = true;
    vias[r.via] = true;
  });
  
  var cf = document.getElementById("freightCountryFilter");
  var ff = document.getElementById("freightForwarderFilter");
  var vf = document.getElementById("freightViaFilter");
  
  if (cf) {
    var cur = cf.value;
    cf.innerHTML = '<option value="">Tất cả nước</option>';
    Object.keys(countries).sort().forEach(function(c) { cf.innerHTML += '<option value="' + c + '">' + c + '</option>'; });
    cf.value = cur;
  }
  if (ff) {
    var cur = ff.value;
    ff.innerHTML = '<option value="">Tất cả hãng</option>';
    Object.keys(forwarders).sort().forEach(function(f) { ff.innerHTML += '<option value="' + f + '">' + f + '</option>'; });
    ff.value = cur;
  }
  if (vf) {
    var cur = vf.value;
    vf.innerHTML = '<option value="">Tất cả loại</option>';
    Object.keys(vias).sort().forEach(function(v) { vf.innerHTML += '<option value="' + v + '">' + v + '</option>'; });
    vf.value = cur;
  }
  
  selectedFreightRoute = null;
  document.getElementById("freightSearch").value = "";
  filterFreightRoutes();
  popup.classList.add("open");
}

function closeFreightPopup() {
  document.getElementById("freightPopup").classList.remove("open");
}

function filterFreightRoutes() {
  var search = (document.getElementById("freightSearch").value || "").toLowerCase().trim();
  var country = document.getElementById("freightCountryFilter").value;
  var forwarder = document.getElementById("freightForwarderFilter").value;
  var via = document.getElementById("freightViaFilter").value;
  
  var filtered = FREIGHT_DATA.filter(function(r) {
    if (search && r.port.toLowerCase().indexOf(search) < 0 && r.country.toLowerCase().indexOf(search) < 0) return false;
    if (country && r.country !== country) return false;
    if (forwarder && r.forwarder !== forwarder) return false;
    if (via && r.via !== via) return false;
    return true;
  });
  
  var tbody = document.getElementById("freightTableBody");
  var count = document.getElementById("freightCount");
  if (count) count.textContent = filtered.length + " tuyến";
  if (!tbody) return;
  
  tbody.innerHTML = "";
  filtered.forEach(function(r) {
    var tr = document.createElement("tr");
    tr.dataset.index = FREIGHT_DATA.indexOf(r);
    tr.innerHTML = '<td>' + r.port + '</td><td>' + r.country + '</td><td class="freight-val">$' + r.freight + '</td><td>' + r.forwarder + '</td><td>' + r.via + '</td>';
    tr.onclick = function() {
      tbody.querySelectorAll("tr").forEach(function(t) { t.classList.remove("selected"); });
      this.classList.add("selected");
      selectedFreightRoute = r;
    };
    tbody.appendChild(tr);
  });
}

function selectFreightRoute() {
  if (!selectedFreightRoute) return;
  var input = document.getElementById("calcFreightInput");
  if (input) input.value = selectedFreightRoute.freight;
  setCalcFreight(selectedFreightRoute.freight);
  closeFreightPopup();
}



