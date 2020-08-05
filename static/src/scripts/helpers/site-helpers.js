export function qsParams(params) {
  var str = '';
  $.each(params, function(name, val) {
    if (val) {
      str += (str ? '&' : '') + name + '=' + encodeURIComponent(val);
    }
  });
  return str;
}
