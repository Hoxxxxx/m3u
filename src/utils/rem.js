/* eslint-disable */ ! function (e) {
  var g = e,
    f = g.document,
    h = f.documentElement,
    a = f.getElementsByTagName("html")[0],
    d = h.clientWidth,
    c = "fontSize",
    b = function (k, i, j) {
      return k.style[i] = j + "px"
    };
  b(a, c, d / 7.5);
  g.onresize = function () {
    var j = g.document,
      k = j.documentElement,
      l = j.getElementsByTagName("html")[0],
      i = k.clientWidth;
    b(l, c, i / 7.5)
  }
}(window);