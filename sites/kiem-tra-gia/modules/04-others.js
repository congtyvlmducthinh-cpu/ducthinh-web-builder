// ====== RENDER OTHERS TAB ======
function renderOthersTab() {
  var h = '<div class="table-wrap" style="margin-top:0"><table><thead>';
  h += '<tr><th>Quy cách khác</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';
  h += '</thead><tbody>';
  for (var i = 0; i < DATA_OTHERS.length; i++) {
    var o = DATA_OTHERS[i];
    h += '<tr>';
    h += '<td><strong>' + o.code + '</strong></td>';
    h += '<td class="text-right">' + (o.cost || 0).toLocaleString() + ' VND</td>';
    h += '<td class="text-right"><strong>' + (o.price || 0).toLocaleString() + ' VND</strong></td>';
    h += '<td class="text-right"><span class="tag-profit">' + ((o.profit || 0) * 100).toFixed(0) + '%</span></td>';
    h += '</tr>';
  }
  h += '</tbody></table></div>';
  h += '<div class="summary-bar" style="margin-top:12px">';
  h += '<div class="summary-card"><div class="lbl">Tổng quy cách</div><div class="val">' + DATA_OTHERS.length + '</div></div>';
  h += '</div>';
  return h;
}

