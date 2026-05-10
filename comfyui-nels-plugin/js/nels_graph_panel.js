import { app as _e } from "../../scripts/app.js";
import { api as ir } from "../../scripts/api.js";
var Bt, $, rr, or, Ae, hi, ar, sr, nn, St, ot, ur, Un, wn, En, Rt = {}, Lt = [], Mo = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ht = Array.isArray;
function be(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Bn(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function dr(t, e, n) {
  var i, r, o, a = {};
  for (o in e) o == "key" ? i = e[o] : o == "ref" ? r = e[o] : a[o] = e[o];
  if (arguments.length > 2 && (a.children = arguments.length > 3 ? Bt.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) a[o] === void 0 && (a[o] = t.defaultProps[o]);
  return Tt(t, a, i, r, null);
}
function Tt(t, e, n, i, r) {
  var o = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++rr, __i: -1, __u: 0 };
  return r == null && $.vnode != null && $.vnode(o), o;
}
function $e(t) {
  return t.children;
}
function at(t, e) {
  this.props = t, this.context = e;
}
function He(t, e) {
  if (e == null) return t.__ ? He(t.__, t.__i + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? He(t) : null;
}
function zo(t) {
  if (t.__P && t.__d) {
    var e = t.__v, n = e.__e, i = [], r = [], o = be({}, e);
    o.__v = e.__v + 1, $.vnode && $.vnode(o), Hn(t.__P, o, e, t.__n, t.__P.namespaceURI, 32 & e.__u ? [n] : null, i, n ?? He(e), !!(32 & e.__u), r), o.__v = e.__v, o.__.__k[o.__i] = o, fr(i, o, r), e.__e = e.__ = null, o.__e != n && lr(o);
  }
}
function lr(t) {
  if ((t = t.__) != null && t.__c != null) return t.__e = t.__c.base = null, t.__k.some(function(e) {
    if (e != null && e.__e != null) return t.__e = t.__c.base = e.__e;
  }), lr(t);
}
function ci(t) {
  (!t.__d && (t.__d = !0) && Ae.push(t) && !Nt.__r++ || hi != $.debounceRendering) && ((hi = $.debounceRendering) || ar)(Nt);
}
function Nt() {
  try {
    for (var t, e = 1; Ae.length; ) Ae.length > e && Ae.sort(sr), t = Ae.shift(), e = Ae.length, zo(t);
  } finally {
    Ae.length = Nt.__r = 0;
  }
}
function hr(t, e, n, i, r, o, a, s, u, d, h) {
  var l, c, f, g, v, y, x, _ = i && i.__k || Lt, S = e.length;
  for (u = Oo(n, e, _, u, S), l = 0; l < S; l++) (f = n.__k[l]) != null && (c = f.__i != -1 && _[f.__i] || Rt, f.__i = l, y = Hn(t, f, c, r, o, a, s, u, d, h), g = f.__e, f.ref && c.ref != f.ref && (c.ref && Wn(c.ref, null, f), h.push(f.ref, f.__c || g, f)), v == null && g != null && (v = g), (x = !!(4 & f.__u)) || c.__k === f.__k ? (u = cr(f, u, t, x), x && c.__e && (c.__e = null)) : typeof f.type == "function" && y !== void 0 ? u = y : g && (u = g.nextSibling), f.__u &= -7);
  return n.__e = v, u;
}
function Oo(t, e, n, i, r) {
  var o, a, s, u, d, h = n.length, l = h, c = 0;
  for (t.__k = new Array(r), o = 0; o < r; o++) (a = e[o]) != null && typeof a != "boolean" && typeof a != "function" ? (typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? a = t.__k[o] = Tt(null, a, null, null, null) : Ht(a) ? a = t.__k[o] = Tt($e, { children: a }, null, null, null) : a.constructor === void 0 && a.__b > 0 ? a = t.__k[o] = Tt(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : t.__k[o] = a, u = o + c, a.__ = t, a.__b = t.__b + 1, s = null, (d = a.__i = Uo(a, n, u, l)) != -1 && (l--, (s = n[d]) && (s.__u |= 2)), s == null || s.__v == null ? (d == -1 && (r > h ? c-- : r < h && c++), typeof a.type != "function" && (a.__u |= 4)) : d != u && (d == u - 1 ? c-- : d == u + 1 ? c++ : (d > u ? c-- : c++, a.__u |= 4))) : t.__k[o] = null;
  if (l) for (o = 0; o < h; o++) (s = n[o]) != null && (2 & s.__u) == 0 && (s.__e == i && (i = He(s)), gr(s, s));
  return i;
}
function cr(t, e, n, i) {
  var r, o;
  if (typeof t.type == "function") {
    for (r = t.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = t, e = cr(r[o], e, n, i));
    return e;
  }
  t.__e != e && (i && (e && t.type && !e.parentNode && (e = He(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function Uo(t, e, n, i) {
  var r, o, a, s = t.key, u = t.type, d = e[n], h = d != null && (2 & d.__u) == 0;
  if (d === null && s == null || h && s == d.key && u == d.type) return n;
  if (i > (h ? 1 : 0)) {
    for (r = n - 1, o = n + 1; r >= 0 || o < e.length; ) if ((d = e[a = r >= 0 ? r-- : o++]) != null && (2 & d.__u) == 0 && s == d.key && u == d.type) return a;
  }
  return -1;
}
function fi(t, e, n) {
  e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || Mo.test(e) ? n : n + "px";
}
function pt(t, e, n, i, r) {
  var o, a;
  e: if (e == "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof i == "string" && (t.style.cssText = i = ""), i) for (e in i) n && e in n || fi(t.style, e, "");
    if (n) for (e in n) i && n[e] == i[e] || fi(t.style, e, n[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(ur, "$1")), a = e.toLowerCase(), e = a in t || e == "onFocusOut" || e == "onFocusIn" ? a.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? i ? n[ot] = i[ot] : (n[ot] = Un, t.addEventListener(e, o ? En : wn, o)) : t.removeEventListener(e, o ? En : wn, o);
  else {
    if (r == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
  }
}
function pi(t) {
  return function(e) {
    if (this.l) {
      var n = this.l[e.type + t];
      if (e[St] == null) e[St] = Un++;
      else if (e[St] < n[ot]) return;
      return n($.event ? $.event(e) : e);
    }
  };
}
function Hn(t, e, n, i, r, o, a, s, u, d) {
  var h, l, c, f, g, v, y, x, _, S, p, m, b, E, A, R = e.type;
  if (e.constructor !== void 0) return null;
  128 & n.__u && (u = !!(32 & n.__u), o = [s = e.__e = n.__e]), (h = $.__b) && h(e);
  e: if (typeof R == "function") try {
    if (x = e.props, _ = R.prototype && R.prototype.render, S = (h = R.contextType) && i[h.__c], p = h ? S ? S.props.value : h.__ : i, n.__c ? y = (l = e.__c = n.__c).__ = l.__E : (_ ? e.__c = l = new R(x, p) : (e.__c = l = new at(x, p), l.constructor = R, l.render = Ho), S && S.sub(l), l.state || (l.state = {}), l.__n = i, c = l.__d = !0, l.__h = [], l._sb = []), _ && l.__s == null && (l.__s = l.state), _ && R.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = be({}, l.__s)), be(l.__s, R.getDerivedStateFromProps(x, l.__s))), f = l.props, g = l.state, l.__v = e, c) _ && R.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), _ && l.componentDidMount != null && l.__h.push(l.componentDidMount);
    else {
      if (_ && R.getDerivedStateFromProps == null && x !== f && l.componentWillReceiveProps != null && l.componentWillReceiveProps(x, p), e.__v == n.__v || !l.__e && l.shouldComponentUpdate != null && l.shouldComponentUpdate(x, l.__s, p) === !1) {
        e.__v != n.__v && (l.props = x, l.state = l.__s, l.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(N) {
          N && (N.__ = e);
        }), Lt.push.apply(l.__h, l._sb), l._sb = [], l.__h.length && a.push(l);
        break e;
      }
      l.componentWillUpdate != null && l.componentWillUpdate(x, l.__s, p), _ && l.componentDidUpdate != null && l.__h.push(function() {
        l.componentDidUpdate(f, g, v);
      });
    }
    if (l.context = p, l.props = x, l.__P = t, l.__e = !1, m = $.__r, b = 0, _) l.state = l.__s, l.__d = !1, m && m(e), h = l.render(l.props, l.state, l.context), Lt.push.apply(l.__h, l._sb), l._sb = [];
    else do
      l.__d = !1, m && m(e), h = l.render(l.props, l.state, l.context), l.state = l.__s;
    while (l.__d && ++b < 25);
    l.state = l.__s, l.getChildContext != null && (i = be(be({}, i), l.getChildContext())), _ && !c && l.getSnapshotBeforeUpdate != null && (v = l.getSnapshotBeforeUpdate(f, g)), E = h != null && h.type === $e && h.key == null ? pr(h.props.children) : h, s = hr(t, Ht(E) ? E : [E], e, n, i, r, o, a, s, u, d), l.base = e.__e, e.__u &= -161, l.__h.length && a.push(l), y && (l.__E = l.__ = null);
  } catch (N) {
    if (e.__v = null, u || o != null) if (N.then) {
      for (e.__u |= u ? 160 : 128; s && s.nodeType == 8 && s.nextSibling; ) s = s.nextSibling;
      o[o.indexOf(s)] = null, e.__e = s;
    } else {
      for (A = o.length; A--; ) Bn(o[A]);
      xn(e);
    }
    else e.__e = n.__e, e.__k = n.__k, N.then || xn(e);
    $.__e(N, e, n);
  }
  else o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : s = e.__e = Bo(n.__e, e, n, i, r, o, a, u, d);
  return (h = $.diffed) && h(e), 128 & e.__u ? void 0 : s;
}
function xn(t) {
  t && (t.__c && (t.__c.__e = !0), t.__k && t.__k.some(xn));
}
function fr(t, e, n) {
  for (var i = 0; i < n.length; i++) Wn(n[i], n[++i], n[++i]);
  $.__c && $.__c(e, t), t.some(function(r) {
    try {
      t = r.__h, r.__h = [], t.some(function(o) {
        o.call(r);
      });
    } catch (o) {
      $.__e(o, r.__v);
    }
  });
}
function pr(t) {
  return typeof t != "object" || t == null || t.__b > 0 ? t : Ht(t) ? t.map(pr) : be({}, t);
}
function Bo(t, e, n, i, r, o, a, s, u) {
  var d, h, l, c, f, g, v, y = n.props || Rt, x = e.props, _ = e.type;
  if (_ == "svg" ? r = "http://www.w3.org/2000/svg" : _ == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), o != null) {
    for (d = 0; d < o.length; d++) if ((f = o[d]) && "setAttribute" in f == !!_ && (_ ? f.localName == _ : f.nodeType == 3)) {
      t = f, o[d] = null;
      break;
    }
  }
  if (t == null) {
    if (_ == null) return document.createTextNode(x);
    t = document.createElementNS(r, _, x.is && x), s && ($.__m && $.__m(e, o), s = !1), o = null;
  }
  if (_ == null) y === x || s && t.data == x || (t.data = x);
  else {
    if (o = o && Bt.call(t.childNodes), !s && o != null) for (y = {}, d = 0; d < t.attributes.length; d++) y[(f = t.attributes[d]).name] = f.value;
    for (d in y) f = y[d], d == "dangerouslySetInnerHTML" ? l = f : d == "children" || d in x || d == "value" && "defaultValue" in x || d == "checked" && "defaultChecked" in x || pt(t, d, null, f, r);
    for (d in x) f = x[d], d == "children" ? c = f : d == "dangerouslySetInnerHTML" ? h = f : d == "value" ? g = f : d == "checked" ? v = f : s && typeof f != "function" || y[d] === f || pt(t, d, f, y[d], r);
    if (h) s || l && (h.__html == l.__html || h.__html == t.innerHTML) || (t.innerHTML = h.__html), e.__k = [];
    else if (l && (t.innerHTML = ""), hr(e.type == "template" ? t.content : t, Ht(c) ? c : [c], e, n, i, _ == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, o, a, o ? o[0] : n.__k && He(n, 0), s, u), o != null) for (d = o.length; d--; ) Bn(o[d]);
    s || (d = "value", _ == "progress" && g == null ? t.removeAttribute("value") : g != null && (g !== t[d] || _ == "progress" && !g || _ == "option" && g != y[d]) && pt(t, d, g, y[d], r), d = "checked", v != null && v != t[d] && pt(t, d, v, y[d], r));
  }
  return t;
}
function Wn(t, e, n) {
  try {
    if (typeof t == "function") {
      var i = typeof t.__u == "function";
      i && t.__u(), i && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (r) {
    $.__e(r, n);
  }
}
function gr(t, e, n) {
  var i, r;
  if ($.unmount && $.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || Wn(i, null, e)), (i = t.__c) != null) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (o) {
      $.__e(o, e);
    }
    i.base = i.__P = null;
  }
  if (i = t.__k) for (r = 0; r < i.length; r++) i[r] && gr(i[r], e, n || typeof t.type != "function");
  n || Bn(t.__e), t.__c = t.__ = t.__e = void 0;
}
function Ho(t, e, n) {
  return this.constructor(t, n);
}
function gi(t, e, n) {
  var i, r, o, a;
  e == document && (e = document.documentElement), $.__ && $.__(t, e), r = (i = !1) ? null : e.__k, o = [], a = [], Hn(e, t = e.__k = dr($e, null, [t]), r || Rt, Rt, e.namespaceURI, r ? null : e.firstChild ? Bt.call(e.childNodes) : null, o, r ? r.__e : e.firstChild, i, a), fr(o, t, a);
}
Bt = Lt.slice, $ = { __e: function(t, e, n, i) {
  for (var r, o, a; e = e.__; ) if ((r = e.__c) && !r.__) try {
    if ((o = r.constructor) && o.getDerivedStateFromError != null && (r.setState(o.getDerivedStateFromError(t)), a = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, i || {}), a = r.__d), a) return r.__E = r;
  } catch (s) {
    t = s;
  }
  throw t;
} }, rr = 0, or = function(t) {
  return t != null && t.constructor === void 0;
}, at.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = be({}, this.state), typeof t == "function" && (t = t(be({}, n), this.props)), t && be(n, t), t != null && this.__v && (e && this._sb.push(e), ci(this));
}, at.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), ci(this));
}, at.prototype.render = $e, Ae = [], ar = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, sr = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, Nt.__r = 0, nn = Math.random().toString(8), St = "__d" + nn, ot = "__a" + nn, ur = /(PointerCapture)$|Capture$/i, Un = 0, wn = pi(!1), En = pi(!0);
function Wo() {
  if (document.getElementById("nels-graph-panel-style")) return;
  const t = document.createElement("style");
  t.id = "nels-graph-panel-style", t.textContent = `
    .nels-panel { position: relative; width: 100%; height: 100%; min-height: 0; display: flex; flex-direction: column; color: #d8dee9; background: #05090f; font: 12px sans-serif; overflow: hidden; }
    .nels-panel * { box-sizing: border-box; }
    .nels-panel-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; border-bottom: 1px solid #1a2232; background: #080d14; }
    .nels-panel-header strong { display: block; font-size: 13px; color: #f8fafc; }
    .nels-panel-header span { color: #93a4b8; }
    .nels-panel-actions { display: flex; align-items: center; gap: 8px; }
    .nels-panel button, .nels-panel select, .nels-panel input { height: 28px; border: 1px solid #1e2d40; border-radius: 4px; background: #0d1520; color: #e6edf3; padding: 0 8px; }
    .nels-panel button { cursor: pointer; }
    .nels-panel button:hover { background: #162030; }
    .nels-panel select { min-width: 180px; }
    .nels-panel-toggle { display: flex; border: 1px solid #1e2d40; border-radius: 4px; overflow: hidden; }
    .nels-panel-toggle button { border: 0; border-radius: 0; min-width: 58px; }
    .nels-panel-toggle button.active { background: #3b82f6; color: #ffffff; }
    .nels-panel-body { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(420px, 1fr) minmax(320px, 400px); overflow: hidden; }
    .nels-panel-body.hidden, .nels-panel-logs-view.hidden { display: none; }
    .nels-panel-main { position: relative; min-height: 0; border-right: 1px solid #1a2232; background: #05090f; background-image: linear-gradient(rgba(30,60,100,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,60,100,0.35) 1px, transparent 1px); background-size: 40px 40px; }
    .nels-sigma-container { position: absolute; inset: 0; overflow: hidden; }
    .nels-sigma-container canvas { position: absolute; top: 0; left: 0; }
    .nels-panel-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #8b98a8; pointer-events: none; z-index: 1; }
    .nels-panel-hover { position: absolute; z-index: 2; max-width: 260px; padding: 7px 8px; border: 1px solid #1e2d40; border-radius: 5px; background: rgba(5,9,15,0.97); color: #e6edf3; box-shadow: 0 12px 32px rgba(0,0,0,0.5); pointer-events: none; font: 11px ui-monospace, SFMono-Regular, Consolas, monospace; }
    .nels-panel-hover.hidden { display: none; }
    .nels-panel-side { height: 100%; min-height: 0; max-height: 100%; padding: 10px 10px 48px; background: #070b10; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; overflow-x: hidden; scrollbar-gutter: stable; }
    .nels-panel-side .nels-panel-card { flex: 0 0 auto; }
    .nels-panel-logs-view { flex: 1; min-height: 0; padding: 10px; background: #070b10; }
    .nels-panel-logs-view .nels-panel-card { height: 100%; display: flex; flex-direction: column; }
    .nels-panel-card { min-height: 0; border: 1px solid #1a2232; border-radius: 6px; background: #090e16; overflow: visible; }
    .nels-panel-card summary { list-style: none; cursor: pointer; margin: 0; padding: 8px 10px; border-bottom: 1px solid #303946; font-size: 12px; font-weight: 700; color: #f8fafc; }
    .nels-panel-card summary::-webkit-details-marker { display: none; }
    .nels-panel-card summary::after { content: "collapse"; float: right; color: #93a4b8; font-weight: 400; font-size: 11px; }
    .nels-panel-card:not([open]) summary { border-bottom: 0; }
    .nels-panel-card:not([open]) summary::after { content: "expand"; }
    .nels-panel-card h3 { margin: 0; padding: 8px 10px; border-bottom: 1px solid #303946; font-size: 12px; color: #f8fafc; }
    .nels-panel-card dl { display: grid; grid-template-columns: 102px 1fr; gap: 6px 8px; margin: 0; padding: 10px; }
    .nels-panel-card dt { color: #93a4b8; }
    .nels-panel-card dd { margin: 0; color: #d8dee9; overflow-wrap: anywhere; }
    .nels-panel-controls { display: grid; gap: 8px; padding: 10px; }
    .nels-panel-controls label { display: grid; grid-template-columns: 80px minmax(0, 1fr); align-items: center; gap: 8px; }
    .nels-panel-controls label span { color: #93a4b8; }
    .nels-panel-controls input, .nels-panel-controls select { width: 100%; min-width: 0; }
    .nels-panel-row { display: flex; gap: 8px; }
    .nels-panel-row button { flex: 1; }
    .nels-panel-log { flex: 1; overflow: auto; padding: 9px 10px; font: 11px ui-monospace, SFMono-Regular, Consolas, monospace; color: #cbd5e1; }
    .nels-panel-log-line { padding: 3px 0 5px; border-bottom: 1px solid rgba(48,57,70,0.5); }
    .nels-panel-log-line.stale { opacity: 0.62; }
    .nels-panel-log-time { color: #8b98a8; }
    .nels-panel-log-node { color: #7dd3fc; }
    .nels-panel-log-type { color: #c084fc; }
    .nels-panel-log-status-failed { color: #fb7185; }
    @media (max-width: 900px) {
      .nels-panel-body { grid-template-columns: 1fr; grid-template-rows: minmax(260px, 1fr) 320px; }
      .nels-panel-side { min-height: 0; }
      .nels-panel-main { border-right: 0; border-bottom: 1px solid #303946; }
    }
  `, document.head.appendChild(t);
}
var jo = 0;
function k(t, e, n, i, r, o) {
  e || (e = {});
  var a, s, u = e;
  if ("ref" in u) for (s in u = {}, e) s == "ref" ? a = e[s] : u[s] = e[s];
  var d = { type: t, props: u, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --jo, __i: -1, __u: 0, __source: r, __self: o };
  if (typeof t == "function" && (a = t.defaultProps)) for (s in a) u[s] === void 0 && (u[s] = a[s]);
  return $.vnode && $.vnode(d), d;
}
var Dt, J, rn, vi, Sn = 0, vr = [], O = $, mi = O.__b, yi = O.__r, _i = O.diffed, bi = O.__c, wi = O.unmount, Ei = O.__;
function mr(t, e) {
  O.__h && O.__h(J, t, Sn || e), Sn = 0;
  var n = J.__H || (J.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function jn(t, e) {
  var n = mr(Dt++, 3);
  !O.__s && yr(n.__H, e) && (n.__ = t, n.u = e, J.__H.__h.push(n));
}
function Vn(t) {
  return Sn = 5, Yn(function() {
    return { current: t };
  }, []);
}
function Yn(t, e) {
  var n = mr(Dt++, 7);
  return yr(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__;
}
function Vo() {
  for (var t; t = vr.shift(); ) {
    var e = t.__H;
    if (t.__P && e) try {
      e.__h.some(kt), e.__h.some(Tn), e.__h = [];
    } catch (n) {
      e.__h = [], O.__e(n, t.__v);
    }
  }
}
O.__b = function(t) {
  J = null, mi && mi(t);
}, O.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Ei && Ei(t, e);
}, O.__r = function(t) {
  yi && yi(t), Dt = 0;
  var e = (J = t.__c).__H;
  e && (rn === J ? (e.__h = [], J.__h = [], e.__.some(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (e.__h.some(kt), e.__h.some(Tn), e.__h = [], Dt = 0)), rn = J;
}, O.diffed = function(t) {
  _i && _i(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (vr.push(e) !== 1 && vi === O.requestAnimationFrame || ((vi = O.requestAnimationFrame) || Yo)(Vo)), e.__H.__.some(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), rn = J = null;
}, O.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.some(kt), n.__h = n.__h.filter(function(i) {
        return !i.__ || Tn(i);
      });
    } catch (i) {
      e.some(function(r) {
        r.__h && (r.__h = []);
      }), e = [], O.__e(i, n.__v);
    }
  }), bi && bi(t, e);
}, O.unmount = function(t) {
  wi && wi(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.some(function(i) {
    try {
      kt(i);
    } catch (r) {
      e = r;
    }
  }), n.__H = void 0, e && O.__e(e, n.__v));
};
var xi = typeof requestAnimationFrame == "function";
function Yo(t) {
  var e, n = function() {
    clearTimeout(i), xi && cancelAnimationFrame(e), setTimeout(t);
  }, i = setTimeout(n, 35);
  xi && (e = requestAnimationFrame(n));
}
function kt(t) {
  var e = J, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), J = e;
}
function Tn(t) {
  var e = J;
  t.__c = t.__(), J = e;
}
function yr(t, e) {
  return !t || t.length !== e.length || e.some(function(n, i) {
    return n !== t[i];
  });
}
var qo = Symbol.for("preact-signals");
function Wt() {
  if (Ee > 1)
    Ee--;
  else {
    var t, e = !1;
    for ((function() {
      var r = Pt;
      for (Pt = void 0; r !== void 0; )
        r.S.v === r.v && (r.S.i = r.i), r = r.o;
    })(); st !== void 0; ) {
      var n = st;
      for (st = void 0, Gt++; n !== void 0; ) {
        var i = n.u;
        if (n.u = void 0, n.f &= -3, !(8 & n.f) && wr(n)) try {
          n.c();
        } catch (r) {
          e || (t = r, e = !0);
        }
        n = i;
      }
    }
    if (Gt = 0, Ee--, e) throw t;
  }
}
function Ko(t) {
  if (Ee > 0) return t();
  kn = ++Xo, Ee++;
  try {
    return t();
  } finally {
    Wt();
  }
}
var F = void 0;
function _r(t) {
  var e = F;
  F = void 0;
  try {
    return t();
  } finally {
    F = e;
  }
}
var st = void 0, Ee = 0, Gt = 0, Xo = 0, kn = 0, Pt = void 0, Ft = 0;
function br(t) {
  if (F !== void 0) {
    var e = t.n;
    if (e === void 0 || e.t !== F)
      return e = { i: 0, S: t, p: F.s, n: void 0, t: F, e: void 0, x: void 0, r: e }, F.s !== void 0 && (F.s.n = e), F.s = e, t.n = e, 32 & F.f && t.S(e), e;
    if (e.i === -1)
      return e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = F.s, e.n = void 0, F.s.n = e, F.s = e), e;
  }
}
function j(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
j.prototype.brand = qo;
j.prototype.h = function() {
  return !0;
};
j.prototype.S = function(t) {
  var e = this, n = this.t;
  n !== t && t.e === void 0 && (t.x = n, this.t = t, n !== void 0 ? n.e = t : _r(function() {
    var i;
    (i = e.W) == null || i.call(e);
  }));
};
j.prototype.U = function(t) {
  var e = this;
  if (this.t !== void 0) {
    var n = t.e, i = t.x;
    n !== void 0 && (n.x = i, t.e = void 0), i !== void 0 && (i.e = n, t.x = void 0), t === this.t && (this.t = i, i === void 0 && _r(function() {
      var r;
      (r = e.Z) == null || r.call(e);
    }));
  }
};
j.prototype.subscribe = function(t) {
  var e = this;
  return Le(function() {
    var n = e.value, i = F;
    F = void 0;
    try {
      t(n);
    } finally {
      F = i;
    }
  }, { name: "sub" });
};
j.prototype.valueOf = function() {
  return this.value;
};
j.prototype.toString = function() {
  return this.value + "";
};
j.prototype.toJSON = function() {
  return this.value;
};
j.prototype.peek = function() {
  var t = F;
  F = void 0;
  try {
    return this.value;
  } finally {
    F = t;
  }
};
Object.defineProperty(j.prototype, "value", { get: function() {
  var t = br(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set: function(t) {
  if (t !== this.v) {
    if (Gt > 100) throw new Error("Cycle detected");
    (function(n) {
      Ee !== 0 && Gt === 0 && n.l !== kn && (n.l = kn, Pt = { S: n, v: n.v, i: n.i, o: Pt });
    })(this), this.v = t, this.i++, Ft++, Ee++;
    try {
      for (var e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Wt();
    }
  }
} });
function V(t, e) {
  return new j(t, e);
}
function wr(t) {
  for (var e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Er(t) {
  for (var e = t.s; e !== void 0; e = e.n) {
    var n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function xr(t) {
  for (var e = t.s, n = void 0; e !== void 0; ) {
    var i = e.p;
    e.i === -1 ? (e.S.U(e), i !== void 0 && (i.n = e.n), e.n !== void 0 && (e.n.p = i)) : n = e, e.S.n = e.r, e.r !== void 0 && (e.r = void 0), e = i;
  }
  t.s = n;
}
function Ie(t, e) {
  j.call(this, void 0), this.x = t, this.s = void 0, this.g = Ft - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
Ie.prototype = new j();
Ie.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Ft)) return !0;
  if (this.g = Ft, this.f |= 1, this.i > 0 && !wr(this))
    return this.f &= -2, !0;
  var t = F;
  try {
    Er(this), F = this;
    var e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (n) {
    this.v = n, this.f |= 16, this.i++;
  }
  return F = t, xr(this), this.f &= -2, !0;
};
Ie.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  j.prototype.S.call(this, t);
};
Ie.prototype.U = function(t) {
  if (this.t !== void 0 && (j.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (var e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
};
Ie.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var t = this.t; t !== void 0; t = t.x) t.t.N();
  }
};
Object.defineProperty(Ie.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var t = br(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function $t(t, e) {
  return new Ie(t, e);
}
function Sr(t) {
  var e = t.m;
  if (t.m = void 0, typeof e == "function") {
    Ee++;
    var n = F;
    F = void 0;
    try {
      e();
    } catch (i) {
      throw t.f &= -2, t.f |= 8, qn(t), i;
    } finally {
      F = n, Wt();
    }
  }
}
function qn(t) {
  for (var e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Sr(t);
}
function Zo(t) {
  if (F !== this) throw new Error("Out-of-order effect");
  xr(this), F = t, this.f &= -2, 8 & this.f && qn(this), Wt();
}
function Ye(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
Ye.prototype.c = function() {
  var t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
};
Ye.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Sr(this), Er(this), Ee++;
  var t = F;
  return F = this, Zo.bind(this, t);
};
Ye.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = st, st = this);
};
Ye.prototype.d = function() {
  this.f |= 8, 1 & this.f || qn(this);
};
Ye.prototype.dispose = function() {
  this.d();
};
function Le(t, e) {
  var n = new Ye(t, e);
  try {
    n.c();
  } catch (r) {
    throw n.d(), r;
  }
  var i = n.d.bind(n);
  return i[Symbol.dispose] = i, i;
}
var Tr, gt, Jo = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, kr = [];
Le(function() {
  Tr = this.N;
})();
function qe(t, e) {
  $[t] = e.bind(null, $[t] || function() {
  });
}
function It(t) {
  if (gt) {
    var e = gt;
    gt = void 0, e();
  }
  gt = t && t.S();
}
function Cr(t) {
  var e = this, n = t.data, i = ea(n);
  i.value = n;
  var r = Yn(function() {
    for (var s = e, u = e.__v; u = u.__; ) if (u.__c) {
      u.__c.__$f |= 4;
      break;
    }
    var d = $t(function() {
      var f = i.value.value;
      return f === 0 ? 0 : f === !0 ? "" : f || "";
    }), h = $t(function() {
      return !Array.isArray(d.value) && !or(d.value);
    }), l = Le(function() {
      if (this.N = Ar, h.value) {
        var f = d.value;
        s.__v && s.__v.__e && s.__v.__e.nodeType === 3 && (s.__v.__e.data = f);
      }
    }), c = e.__$u.d;
    return e.__$u.d = function() {
      l(), c.call(this);
    }, [h, d];
  }, []), o = r[0], a = r[1];
  return o.value ? a.peek() : a.value;
}
Cr.displayName = "ReactiveTextNode";
Object.defineProperties(j.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: Cr }, props: { configurable: !0, get: function() {
  var t = this;
  return { data: { get value() {
    return t.value;
  } } };
} }, __b: { configurable: !0, value: 1 } });
qe("__b", function(t, e) {
  if (typeof e.type == "string") {
    var n, i = e.props;
    for (var r in i) if (r !== "children") {
      var o = i[r];
      o instanceof j && (n || (e.__np = n = {}), n[r] = o, i[r] = o.peek());
    }
  }
  t(e);
});
qe("__r", function(t, e) {
  if (t(e), e.type !== $e) {
    It();
    var n, i = e.__c;
    i && (i.__$f &= -2, (n = i.__$u) === void 0 && (i.__$u = n = (function(r, o) {
      var a;
      return Le(function() {
        a = this;
      }, { name: o }), a.c = r, a;
    })(function() {
      var r;
      Jo && ((r = n.y) == null || r.call(n)), i.__$f |= 1, i.setState({});
    }, typeof e.type == "function" ? e.type.displayName || e.type.name : ""))), It(n);
  }
});
qe("__e", function(t, e, n, i) {
  It(), t(e, n, i);
});
qe("diffed", function(t, e) {
  It();
  var n;
  if (typeof e.type == "string" && (n = e.__e)) {
    var i = e.__np, r = e.props;
    if (i) {
      var o = n.U;
      if (o) for (var a in o) {
        var s = o[a];
        s !== void 0 && !(a in i) && (s.d(), o[a] = void 0);
      }
      else
        o = {}, n.U = o;
      for (var u in i) {
        var d = o[u], h = i[u];
        d === void 0 ? (d = Qo(n, u, h), o[u] = d) : d.o(h, r);
      }
      for (var l in i) r[l] = i[l];
    }
  }
  t(e);
});
function Qo(t, e, n, i) {
  var r = e in t && t.ownerSVGElement === void 0, o = V(n), a = n.peek();
  return { o: function(s, u) {
    o.value = s, a = s.peek();
  }, d: Le(function() {
    this.N = Ar;
    var s = o.value.value;
    a !== s ? (a = void 0, r ? t[e] = s : s != null && (s !== !1 || e[4] === "-") ? t.setAttribute(e, s) : t.removeAttribute(e)) : a = void 0;
  }) };
}
qe("unmount", function(t, e) {
  if (typeof e.type == "string") {
    var n = e.__e;
    if (n) {
      var i = n.U;
      if (i) {
        n.U = void 0;
        for (var r in i) {
          var o = i[r];
          o && o.d();
        }
      }
    }
    e.__np = void 0;
  } else {
    var a = e.__c;
    if (a) {
      var s = a.__$u;
      s && (a.__$u = void 0, s.d());
    }
  }
  t(e);
});
qe("__h", function(t, e, n, i) {
  (i < 3 || i === 9) && (e.__$f |= 2), t(e, n, i);
});
at.prototype.shouldComponentUpdate = function(t, e) {
  if (this.__R) return !0;
  var n = this.__$u, i = n && n.s !== void 0;
  for (var r in e) return !0;
  if (this.__f || typeof this.u == "boolean" && this.u === !0) {
    var o = 2 & this.__$f;
    if (!(i || o || 4 & this.__$f) || 1 & this.__$f) return !0;
  } else if (!(i || 4 & this.__$f) || 3 & this.__$f) return !0;
  for (var a in t) if (a !== "__source" && t[a] !== this.props[a]) return !0;
  for (var s in this.props) if (!(s in t)) return !0;
  return !1;
};
function ea(t, e) {
  return Yn(function() {
    return V(t, e);
  }, []);
}
var ta = function(t) {
  queueMicrotask(function() {
    queueMicrotask(t);
  });
};
function na() {
  Ko(function() {
    for (var t; t = kr.shift(); ) Tr.call(t);
  });
}
function Ar() {
  kr.push(this) === 1 && ($.requestAnimationFrame || ta)(na);
}
async function Rr(t, e) {
  const n = await ir.fetchApi(t, e);
  if (!n.ok) throw new Error(`${n.status} ${n.statusText}`);
  return n.json();
}
function Kn(t, e) {
  return Rr(t, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e ?? {})
  });
}
function ia(t) {
  return Kn("/nels/api/canvas-sessions/sync", { sessions: t });
}
function ra(t) {
  return Rr(`/nels/api/session/${encodeURIComponent(t)}`);
}
function oa(t, e) {
  return Kn(
    `/nels/api/session/${encodeURIComponent(t)}/ui-state`,
    e
  );
}
function aa(t) {
  return Kn(
    `/nels/api/session/${encodeURIComponent(t)}/source-preview`,
    {}
  );
}
const Mt = V([]), Lr = V("initializing"), We = V("graph"), Oe = V(!0);
function K(t) {
  Lr.value = t;
}
function Si(t) {
  We.value = t;
}
function jt(t, e = 0) {
  const n = Number(t.state_revision ?? 0), i = {
    timestamp: t.timestamp ?? Date.now(),
    event_type: t.event_type ?? "event",
    node_name: t.node_name ?? "NELS",
    message: t.message ?? t.status ?? "",
    status: t.status ?? "",
    stale: e > 0 && n > 0 && n < e
  }, r = Mt.value, o = r.length >= 300 ? [...r.slice(r.length - 299), i] : [...r, i];
  Mt.value = o;
}
function sa() {
  Mt.value = [];
}
const we = V({
  operation: "inspect",
  metric_mode: "step_distance",
  neighbor_count: 4,
  alpha_schedule: "0,0.25,0.5,0.75,1"
}), ct = V(null), Nr = V(null);
function Dr(t) {
  we.value = { ...we.value, ...t };
}
function Xn(t) {
  ct.value = t;
}
function Gr(t) {
  Nr.value = t;
}
const Ne = V(/* @__PURE__ */ new Set()), Cn = V(null), ht = V(null), ua = $t(() => {
  var n;
  const t = ct.value;
  if (!t) return /* @__PURE__ */ new Set();
  const e = /* @__PURE__ */ new Set();
  t.source_point_id && e.add(String(t.source_point_id));
  for (const i of t.source_point_ids ?? []) e.add(String(i));
  for (const i of t.neighbors ?? []) {
    const r = i.point_id ?? i.id;
    r && e.add(String(r));
  }
  for (const i of ((n = t.selection) == null ? void 0 : n.selected_point_ids) ?? []) e.add(String(i));
  return e;
});
function da(t, e) {
  if (e) {
    const n = new Set(Ne.value);
    n.has(t) ? n.delete(t) : n.add(t), Ne.value = n;
  } else
    Ne.value = /* @__PURE__ */ new Set([t]);
}
function Pr() {
  Ne.value = /* @__PURE__ */ new Set();
}
function la(t, e) {
  const n = e ? t.filter((i) => e.has(i)) : t;
  Ne.value = new Set(n);
}
const Zn = V(null), Se = V(ga());
let Ti = "", on = /* @__PURE__ */ new Map();
function Vt(t, e = {}) {
  const n = fa(t, e);
  return Zn.value = n, Se.value = ha(n), !!(e.fitAlways || e.fit && t);
}
function ha(t) {
  const e = Array.isArray(t == null ? void 0 : t.points) ? t.points : [], n = Array.isArray(t == null ? void 0 : t.edges) ? t.edges : [], i = new Map(e.map((a) => [String(a.id), a])), r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const a of e)
    r.set(String(a.id), /* @__PURE__ */ new Set()), o.set(String(a.id), 0);
  for (const a of n) {
    const s = String(a.source), u = String(a.target);
    !r.has(s) || !r.has(u) || (r.get(s).add(u), r.get(u).add(s), o.set(s, (o.get(s) ?? 0) + 1), o.set(u, (o.get(u) ?? 0) + 1));
  }
  return { points: e, edges: n, byId: i, adjacency: r, degrees: o, bounds: pa(e) };
}
function ca(t, e, n) {
  if (!e || !n.points.length) return !0;
  const i = new Set((t.points ?? []).map((s) => String(s.id))), r = new Set(n.points.map((s) => String(s.id))), o = i.size === r.size && [...i].every((s) => r.has(s)), a = JSON.stringify(An(t)) === JSON.stringify(An(e));
  return !o || !a;
}
function fa(t, e = {}) {
  if (!t) return null;
  const n = JSON.stringify(An(t)), i = new Set((t.points ?? []).map((u) => String(u.id))), r = n === Ti, o = r && [...i].every((u) => on.has(u)), a = e.acceptCoordinates !== !1, s = e.forceCoordinates === !0 || !r;
  return a && (s || !o) ? (Ti = n, on = new Map(
    (t.points ?? []).map((u) => [String(u.id), u.coords ?? [0, 0]])
  ), t) : o ? {
    ...t,
    points: (t.points ?? []).map((u) => ({
      ...u,
      coords: on.get(String(u.id)) ?? u.coords
    }))
  } : t;
}
function An(t) {
  const e = (t == null ? void 0 : t.source_config) ?? {};
  return {
    sample_count: e.sample_count,
    embedding_dim: e.embedding_dim,
    seed: e.seed,
    label_prefix: e.label_prefix,
    metadata_mode: e.metadata_mode,
    cluster_count: e.cluster_count,
    projection_mode: e.projection_mode
  };
}
function pa(t) {
  if (!t.length) return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
  const e = t.map((s) => {
    var u;
    return Number(((u = s.coords) == null ? void 0 : u[0]) ?? 0);
  }), n = t.map((s) => {
    var u;
    return Number(((u = s.coords) == null ? void 0 : u[1]) ?? 0);
  }), i = Math.min(...e), r = Math.max(...e), o = Math.min(...n), a = Math.max(...n);
  return {
    minX: i === r ? i - 1 : i,
    maxX: i === r ? r + 1 : r,
    minY: o === a ? o - 1 : o,
    maxY: o === a ? a + 1 : a
  };
}
function ga() {
  return {
    points: [],
    edges: [],
    byId: /* @__PURE__ */ new Map(),
    adjacency: /* @__PURE__ */ new Map(),
    degrees: /* @__PURE__ */ new Map(),
    bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 }
  };
}
let an = null;
function ut() {
  return an ? Promise.resolve(an) : Promise.resolve().then(() => $d).then((t) => (an = t, t));
}
const he = V([]), Q = V(""), Yt = $t(
  () => he.value.find((t) => t.session_id === Q.value) ?? null
);
let Ct = 0, sn = null;
async function Fr(t = {}) {
  const e = ba(), n = await ia(e);
  he.value = n.sessions ?? [];
  const i = Q.value;
  he.value.length ? he.value.some((r) => r.session_id === i) || (Q.value = he.value[0].session_id) : Q.value = "", t.log !== !1 && jt({
    event_type: "ui_action",
    node_name: "NELS Graph Panel",
    message: `Synced ${e.length} NELS Session node(s)`,
    status: "completed"
  });
}
async function $r() {
  K("syncing sessions");
  try {
    await Fr(), Q.value ? await Ir() : (Vt(null, { acceptCoordinates: !0 }), K("no active sessions"));
  } catch (t) {
    K(`session sync error: ${t.message}`);
  }
}
async function Ir() {
  var t;
  if (Q.value) {
    K("loading session");
    try {
      const e = await ra(Q.value);
      Jn(e);
      const n = e.graph_snapshot ?? e.source_snapshot ?? null;
      Vt(n, { fit: !0, fitAlways: !0, acceptCoordinates: !0 }), Xn(e.operation_result ?? null), Gr(e.metrics ?? null), Qn(e.ui_state ?? {}, { skipViewport: !1 }), Ct = Math.max(0, ...(e.events ?? []).map((r) => r.sequence ?? 0)), sa();
      const i = Number(((t = e.ui_state) == null ? void 0 : t.state_revision) ?? 0);
      for (const r of e.events ?? []) jt(r, i);
      K(n ? "ready" : "no snapshot loaded");
    } catch (e) {
      K(`session load error: ${e.message}`);
    }
  }
}
async function va() {
  var t, e, n;
  K("refreshing");
  try {
    await Fr({ log: !1 });
  } catch (i) {
    K(`session sync error: ${i.message}`);
    return;
  }
  if (!Q.value) {
    K("select a session first");
    return;
  }
  K("refreshing preview");
  try {
    const i = await aa(Q.value);
    i.session && Jn(i.session), Vt(i.graph_snapshot, { fit: !0, acceptCoordinates: !0, forceCoordinates: !0 }), Qn(((t = i.session) == null ? void 0 : t.ui_state) ?? {}, { skipViewport: !1 });
    const r = ((n = (e = i.graph_snapshot) == null ? void 0 : e.points) == null ? void 0 : n.length) ?? 0;
    jt({
      event_type: "ui_action",
      node_name: "NELS Graph Panel",
      message: `Refreshed graph preview with ${r} points`,
      status: "completed"
    }), K("preview refreshed");
  } catch (i) {
    K(`preview error: ${i.message}`);
  }
}
function Ue() {
  sn && clearTimeout(sn), sn = setTimeout(() => void ma(), 120);
}
async function ma() {
  var a, s, u;
  if (!Q.value) return;
  const e = (await ut()).getCameraState(), n = we.value, i = Zn.value, r = Yt.value, o = {
    selected_point_ids: [...Ne.value],
    operation: n.operation,
    metric_mode: n.metric_mode,
    neighbor_count: Math.max(1, n.neighbor_count),
    alpha_schedule: n.alpha_schedule,
    projection_mode: ((a = r == null ? void 0 : r.ui_state) == null ? void 0 : a.projection_mode) ?? (i == null ? void 0 : i.projection_mode) ?? "2d_umap",
    edge_mode: ((s = r == null ? void 0 : r.ui_state) == null ? void 0 : s.edge_mode) ?? (i == null ? void 0 : i.edge_mode) ?? "knn_cosine",
    viewport: e
  };
  try {
    const d = await oa(Q.value, o);
    d.session && Jn(d.session), xa(o.neighbor_count), K(`state revision ${((u = d.ui_state) == null ? void 0 : u.state_revision) ?? "-"}`);
  } catch (d) {
    K(`state sync error: ${d.message}`);
  }
}
function ya(t) {
  var n, i;
  if (!(t != null && t.session_id)) return;
  if (t.session_id !== Q.value) {
    $r();
    return;
  }
  Ct = Math.max(Ct, Number(t.sequence ?? 0));
  const e = Number(((i = (n = Yt.value) == null ? void 0 : n.ui_state) == null ? void 0 : i.state_revision) ?? 0);
  if (jt(t, e), t.event_type === "ui_state_updated") {
    const r = Number(t.state_revision ?? 0);
    if (!(e > 0 && r > 0 && r < e)) {
      const a = t.payload ?? {};
      Qn(a, { skipViewport: !0 });
    }
  }
  if (t.event_type === "source_snapshot" || t.event_type === "graph_snapshot") {
    const r = t.payload;
    r && ca(r, Zn.value, Se.value) && (Vt(r, { fit: !0, acceptCoordinates: !0, forceCoordinates: !0 }), ut().then(
      (a) => a.pulseIds((r.points ?? []).map((s) => String(s.id)))
    ));
  }
  if (t.event_type === "operation_result") {
    const r = t.payload ?? null;
    Xn(r), ut().then((o) => {
      o.addOverlayEdges(), o.pulseOperationResult(r), o.sigmaRefresh();
    });
  }
  t.event_type === "metrics_result" && (Gr(t.payload ?? null), ut().then((r) => r.sigmaRefresh())), K(`event ${t.event_type ?? "event"} #${Ct}`);
}
function _a(t) {
  ir.addEventListener(
    "nels.session_event",
    (e) => ya(e.detail ?? {}),
    { signal: t }
  );
}
function Jn(t) {
  const e = he.value.some((n) => n.session_id === t.session_id);
  he.value = e ? he.value.map((n) => n.session_id === t.session_id ? t : n) : [...he.value, t];
}
function Qn(t, e) {
  const n = (t.selected_point_ids ?? []).map(String), i = Se.value.byId.size > 0 ? new Set(Se.value.byId.keys()) : void 0;
  if (la(n, i), Dr({
    operation: String(t.operation ?? we.value.operation),
    metric_mode: String(t.metric_mode ?? we.value.metric_mode),
    neighbor_count: Number(t.neighbor_count ?? we.value.neighbor_count),
    alpha_schedule: String(t.alpha_schedule ?? we.value.alpha_schedule)
  }), !e.skipViewport) {
    const r = t.viewport;
    r && typeof r == "object" && ut().then((o) => o.applySigmaViewport(r));
  }
}
function ba() {
  var e;
  return (((e = _e.graph) == null ? void 0 : e._nodes) ?? []).filter(Ea).map((n) => ({
    session_node_id: String(n.id),
    session_label: String(fe(n, "session_label", "default") ?? "default"),
    source_config: wa(n)
  }));
}
function wa(t) {
  const e = Mr(t);
  return {
    sample_count: Number(fe(e, "sample_count", 32) ?? 32),
    embedding_dim: Number(fe(e, "embedding_dim", 64) ?? 64),
    seed: Number(fe(e, "seed", 42) ?? 42),
    label_prefix: String(fe(e, "label_prefix", "sample") ?? "sample"),
    metadata_mode: String(fe(e, "metadata_mode", "clustered") ?? "clustered"),
    cluster_count: Number(fe(e, "cluster_count", 4) ?? 4),
    projection_mode: String(fe(e, "projection_mode", "2d_umap") ?? "2d_umap"),
    edge_mode: String(fe(e, "edge_mode", "knn_cosine") ?? "knn_cosine"),
    neighbor_count: Number(fe(e, "neighbor_count", 4) ?? 4)
  };
}
function Mr(t) {
  var r, o, a, s;
  const e = (o = (r = t == null ? void 0 : t.inputs) == null ? void 0 : r.find((u) => u.name === "embedding_set")) == null ? void 0 : o.link;
  if (e == null || !((a = _e.graph) != null && a.links)) return null;
  const n = _e.graph.links[e] ?? _e.graph.links[String(e)], i = n == null ? void 0 : n.origin_id;
  return (((s = _e.graph) == null ? void 0 : s._nodes) ?? []).find(
    (u) => String(u.id) === String(i)
  ) ?? null;
}
function Ea(t) {
  var n;
  return (t.comfyClass ?? t.type ?? ((n = t.properties) == null ? void 0 : n["Node name for S&R"])) === "nels_Session" || t.title === "NELS Session";
}
function fe(t, e, n) {
  var i, r;
  return ((r = (i = t == null ? void 0 : t.widgets) == null ? void 0 : i.find((o) => o.name === e)) == null ? void 0 : r.value) ?? n;
}
function xa(t) {
  var a, s, u;
  const e = (a = Yt.value) == null ? void 0 : a.session_node_id;
  if (!e) return;
  const i = (((s = _e.graph) == null ? void 0 : s._nodes) ?? []).find((d) => String(d.id) === String(e)) ?? null, r = Mr(i);
  if (!r) return;
  const o = (u = r.widgets) == null ? void 0 : u.find((d) => d.name === "neighbor_count");
  o && (o.value = t, typeof o.callback == "function" && o.callback(t));
}
function Sa() {
  const t = We.value === "graph";
  function e(n) {
    Q.value = n.target.value, Ir();
  }
  return /* @__PURE__ */ k("div", { class: "nels-panel-header", children: [
    /* @__PURE__ */ k("div", { children: [
      /* @__PURE__ */ k("strong", { children: "NELS Graph Panel" }),
      /* @__PURE__ */ k("span", { children: Lr.value })
    ] }),
    /* @__PURE__ */ k("div", { class: "nels-panel-actions", children: [
      /* @__PURE__ */ k("select", { value: Q.value, onChange: e, children: he.value.length === 0 ? /* @__PURE__ */ k("option", { value: "", children: "no active sessions" }) : he.value.map((n) => /* @__PURE__ */ k("option", { value: n.session_id, children: n.label || n.session_id }, n.session_id)) }),
      /* @__PURE__ */ k("div", { class: "nels-panel-toggle", role: "tablist", "aria-label": "Panel view", children: [
        /* @__PURE__ */ k(
          "button",
          {
            class: t ? "active" : "",
            onClick: () => Si("graph"),
            children: "Graph"
          }
        ),
        /* @__PURE__ */ k(
          "button",
          {
            class: t ? "" : "active",
            onClick: () => Si("logs"),
            children: "Logs"
          }
        )
      ] }),
      /* @__PURE__ */ k(
        "button",
        {
          title: Oe.value ? "Disable animation" : "Enable animation",
          onClick: () => {
            Oe.value = !Oe.value;
          },
          children: Oe.value ? "🎬" : "⏸️"
        }
      ),
      /* @__PURE__ */ k("button", { onClick: () => void $r(), children: "Sessions" }),
      /* @__PURE__ */ k("button", { onClick: () => void va(), children: "Refresh" })
    ] })
  ] });
}
function Ta() {
  var o;
  const t = Yt.value, e = (t == null ? void 0 : t.graph_snapshot) ?? (t == null ? void 0 : t.source_snapshot) ?? null, n = (t == null ? void 0 : t.source_config) ?? (e == null ? void 0 : e.source_config) ?? {}, i = ((o = t == null ? void 0 : t.ui_state) == null ? void 0 : o.state_revision) ?? "-", r = t ? [
    ["session", t.session_id],
    ["session node", t.session_node_id ?? "-"],
    ["points", String(Se.value.points.length)],
    ["projection", String(n.projection_mode ?? (e == null ? void 0 : e.projection_mode) ?? "-")],
    ["neighbors", String(n.neighbor_count ?? we.value.neighbor_count)],
    ["revision", String(i)],
    ["selected", String(Ne.value.size)]
  ] : [["Status", "No active session"]];
  return /* @__PURE__ */ k("details", { class: "nels-panel-card", open: !0, children: [
    /* @__PURE__ */ k("summary", { children: "Session" }),
    /* @__PURE__ */ k("dl", { children: r.map(([a, s]) => /* @__PURE__ */ k($e, { children: [
      /* @__PURE__ */ k("dt", { children: a }, `dt-${a}`),
      /* @__PURE__ */ k("dd", { children: s }, `dd-${a}`)
    ] })) })
  ] });
}
function ka(t, e) {
  if (typeof t != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
function dt(t) {
  var e = ka(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Y(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function ki(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, dt(i.key), i);
  }
}
function q(t, e, n) {
  return e && ki(t.prototype, e), n && ki(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function je(t) {
  return je = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, je(t);
}
function zr() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (zr = function() {
    return !!t;
  })();
}
function Ca(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Aa(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Ca(t);
}
function oe(t, e, n) {
  return e = je(e), Aa(t, zr() ? Reflect.construct(e, n || [], je(t).constructor) : e.apply(t, n));
}
function Rn(t, e) {
  return Rn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Rn(t, e);
}
function ae(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Rn(t, e);
}
function Ra(t) {
  if (Array.isArray(t)) return t;
}
function La(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, r, o, a, s = [], u = !0, d = !1;
    try {
      if (o = (n = n.call(t)).next, e === 0) {
        if (Object(n) !== n) return;
        u = !1;
      } else for (; !(u = (i = o.call(n)).done) && (s.push(i.value), s.length !== e); u = !0) ;
    } catch (h) {
      d = !0, r = h;
    } finally {
      try {
        if (!u && n.return != null && (a = n.return(), Object(a) !== a)) return;
      } finally {
        if (d) throw r;
      }
    }
    return s;
  }
}
function Ln(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function Or(t, e) {
  if (t) {
    if (typeof t == "string") return Ln(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ln(t, e) : void 0;
  }
}
function Na() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ve(t, e) {
  return Ra(t) || La(t, e) || Or(t, e) || Na();
}
var un = {
  black: "#000000",
  silver: "#C0C0C0",
  gray: "#808080",
  grey: "#808080",
  white: "#FFFFFF",
  maroon: "#800000",
  red: "#FF0000",
  purple: "#800080",
  fuchsia: "#FF00FF",
  green: "#008000",
  lime: "#00FF00",
  olive: "#808000",
  yellow: "#FFFF00",
  navy: "#000080",
  blue: "#0000FF",
  teal: "#008080",
  aqua: "#00FFFF",
  darkblue: "#00008B",
  mediumblue: "#0000CD",
  darkgreen: "#006400",
  darkcyan: "#008B8B",
  deepskyblue: "#00BFFF",
  darkturquoise: "#00CED1",
  mediumspringgreen: "#00FA9A",
  springgreen: "#00FF7F",
  cyan: "#00FFFF",
  midnightblue: "#191970",
  dodgerblue: "#1E90FF",
  lightseagreen: "#20B2AA",
  forestgreen: "#228B22",
  seagreen: "#2E8B57",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  limegreen: "#32CD32",
  mediumseagreen: "#3CB371",
  turquoise: "#40E0D0",
  royalblue: "#4169E1",
  steelblue: "#4682B4",
  darkslateblue: "#483D8B",
  mediumturquoise: "#48D1CC",
  indigo: "#4B0082",
  darkolivegreen: "#556B2F",
  cadetblue: "#5F9EA0",
  cornflowerblue: "#6495ED",
  rebeccapurple: "#663399",
  mediumaquamarine: "#66CDAA",
  dimgray: "#696969",
  dimgrey: "#696969",
  slateblue: "#6A5ACD",
  olivedrab: "#6B8E23",
  slategray: "#708090",
  slategrey: "#708090",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  mediumslateblue: "#7B68EE",
  lawngreen: "#7CFC00",
  chartreuse: "#7FFF00",
  aquamarine: "#7FFFD4",
  skyblue: "#87CEEB",
  lightskyblue: "#87CEFA",
  blueviolet: "#8A2BE2",
  darkred: "#8B0000",
  darkmagenta: "#8B008B",
  saddlebrown: "#8B4513",
  darkseagreen: "#8FBC8F",
  lightgreen: "#90EE90",
  mediumpurple: "#9370DB",
  darkviolet: "#9400D3",
  palegreen: "#98FB98",
  darkorchid: "#9932CC",
  yellowgreen: "#9ACD32",
  sienna: "#A0522D",
  brown: "#A52A2A",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  lightblue: "#ADD8E6",
  greenyellow: "#ADFF2F",
  paleturquoise: "#AFEEEE",
  lightsteelblue: "#B0C4DE",
  powderblue: "#B0E0E6",
  firebrick: "#B22222",
  darkgoldenrod: "#B8860B",
  mediumorchid: "#BA55D3",
  rosybrown: "#BC8F8F",
  darkkhaki: "#BDB76B",
  mediumvioletred: "#C71585",
  indianred: "#CD5C5C",
  peru: "#CD853F",
  chocolate: "#D2691E",
  tan: "#D2B48C",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  thistle: "#D8BFD8",
  orchid: "#DA70D6",
  goldenrod: "#DAA520",
  palevioletred: "#DB7093",
  crimson: "#DC143C",
  gainsboro: "#DCDCDC",
  plum: "#DDA0DD",
  burlywood: "#DEB887",
  lightcyan: "#E0FFFF",
  lavender: "#E6E6FA",
  darksalmon: "#E9967A",
  violet: "#EE82EE",
  palegoldenrod: "#EEE8AA",
  lightcoral: "#F08080",
  khaki: "#F0E68C",
  aliceblue: "#F0F8FF",
  honeydew: "#F0FFF0",
  azure: "#F0FFFF",
  sandybrown: "#F4A460",
  wheat: "#F5DEB3",
  beige: "#F5F5DC",
  whitesmoke: "#F5F5F5",
  mintcream: "#F5FFFA",
  ghostwhite: "#F8F8FF",
  salmon: "#FA8072",
  antiquewhite: "#FAEBD7",
  linen: "#FAF0E6",
  lightgoldenrodyellow: "#FAFAD2",
  oldlace: "#FDF5E6",
  magenta: "#FF00FF",
  deeppink: "#FF1493",
  orangered: "#FF4500",
  tomato: "#FF6347",
  hotpink: "#FF69B4",
  coral: "#FF7F50",
  darkorange: "#FF8C00",
  lightsalmon: "#FFA07A",
  orange: "#FFA500",
  lightpink: "#FFB6C1",
  pink: "#FFC0CB",
  gold: "#FFD700",
  peachpuff: "#FFDAB9",
  navajowhite: "#FFDEAD",
  moccasin: "#FFE4B5",
  bisque: "#FFE4C4",
  mistyrose: "#FFE4E1",
  blanchedalmond: "#FFEBCD",
  papayawhip: "#FFEFD5",
  lavenderblush: "#FFF0F5",
  seashell: "#FFF5EE",
  cornsilk: "#FFF8DC",
  lemonchiffon: "#FFFACD",
  floralwhite: "#FFFAF0",
  snow: "#FFFAFA",
  lightyellow: "#FFFFE0",
  ivory: "#FFFFF0"
}, Ur = new Int8Array(4), dn = new Int32Array(Ur.buffer, 0, 1), Da = new Float32Array(Ur.buffer, 0, 1), Ga = /^\s*rgba?\s*\(/, Pa = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
function Fa(t) {
  var e = 0, n = 0, i = 0, r = 1;
  if (t[0] === "#")
    t.length === 4 ? (e = parseInt(t.charAt(1) + t.charAt(1), 16), n = parseInt(t.charAt(2) + t.charAt(2), 16), i = parseInt(t.charAt(3) + t.charAt(3), 16)) : (e = parseInt(t.charAt(1) + t.charAt(2), 16), n = parseInt(t.charAt(3) + t.charAt(4), 16), i = parseInt(t.charAt(5) + t.charAt(6), 16)), t.length === 9 && (r = parseInt(t.charAt(7) + t.charAt(8), 16) / 255);
  else if (Ga.test(t)) {
    var o = t.match(Pa);
    o && (e = +o[1], n = +o[2], i = +o[3], o[4] && (r = +o[4]));
  }
  return {
    r: e,
    g: n,
    b: i,
    a: r
  };
}
var Be = {};
for (var vt in un)
  Be[vt] = Ke(un[vt]), Be[un[vt]] = Be[vt];
function Br(t, e, n, i, r) {
  return dn[0] = i << 24 | n << 16 | e << 8 | t, dn[0] = dn[0] & 4278190079, Da[0];
}
function Ke(t) {
  if (t = t.toLowerCase(), typeof Be[t] < "u") return Be[t];
  var e = Fa(t), n = e.r, i = e.g, r = e.b, o = e.a;
  o = o * 255 | 0;
  var a = Br(n, i, r, o);
  return Be[t] = a, a;
}
var ln = {};
function Hr(t) {
  if (typeof ln[t] < "u") return ln[t];
  var e = (t & 16711680) >>> 16, n = (t & 65280) >>> 8, i = t & 255, r = 255, o = Br(e, n, i, r);
  return ln[t] = o, o;
}
function Ci(t, e, n, i) {
  return n + (e << 8) + (t << 16);
}
function Ai(t, e, n, i, r, o) {
  var a = Math.floor(n / o * r), s = Math.floor(t.drawingBufferHeight / o - i / o * r), u = new Uint8Array(4);
  t.bindFramebuffer(t.FRAMEBUFFER, e), t.readPixels(a, s, 1, 1, t.RGBA, t.UNSIGNED_BYTE, u);
  var d = Ve(u, 4), h = d[0], l = d[1], c = d[2], f = d[3];
  return [h, l, c, f];
}
function w(t, e, n) {
  return (e = dt(e)) in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Ri(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function L(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ri(Object(n), !0).forEach(function(i) {
      w(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ri(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function $a(t, e) {
  for (; !{}.hasOwnProperty.call(t, e) && (t = je(t)) !== null; ) ;
  return t;
}
function Nn() {
  return Nn = typeof Reflect < "u" && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
    var i = $a(t, e);
    if (i) {
      var r = Object.getOwnPropertyDescriptor(i, e);
      return r.get ? r.get.call(arguments.length < 3 ? t : n) : r.value;
    }
  }, Nn.apply(null, arguments);
}
function Wr(t, e, n, i) {
  var r = Nn(je(t.prototype), e, n);
  return typeof r == "function" ? function(o) {
    return r.apply(n, o);
  } : r;
}
function Ia(t) {
  return t.normalized ? 1 : t.size;
}
function hn(t) {
  var e = 0;
  return t.forEach(function(n) {
    return e += Ia(n);
  }), e;
}
function jr(t, e, n) {
  var i = t === "VERTEX" ? e.VERTEX_SHADER : e.FRAGMENT_SHADER, r = e.createShader(i);
  if (r === null)
    throw new Error("loadShader: error while creating the shader");
  e.shaderSource(r, n), e.compileShader(r);
  var o = e.getShaderParameter(r, e.COMPILE_STATUS);
  if (!o) {
    var a = e.getShaderInfoLog(r);
    throw e.deleteShader(r), new Error(`loadShader: error while compiling the shader:
`.concat(a, `
`).concat(n));
  }
  return r;
}
function Ma(t, e) {
  return jr("VERTEX", t, e);
}
function za(t, e) {
  return jr("FRAGMENT", t, e);
}
function Oa(t, e) {
  var n = t.createProgram();
  if (n === null)
    throw new Error("loadProgram: error while creating the program.");
  var i, r;
  for (i = 0, r = e.length; i < r; i++) t.attachShader(n, e[i]);
  t.linkProgram(n);
  var o = t.getProgramParameter(n, t.LINK_STATUS);
  if (!o)
    throw t.deleteProgram(n), new Error("loadProgram: error while linking the program.");
  return n;
}
function Li(t) {
  var e = t.gl, n = t.buffer, i = t.program, r = t.vertexShader, o = t.fragmentShader;
  e.deleteShader(r), e.deleteShader(o), e.deleteProgram(i), e.deleteBuffer(n);
}
var Ni = `#define PICKING_MODE
`, Ua = w(w(w(w(w(w(w(w({}, WebGL2RenderingContext.BOOL, 1), WebGL2RenderingContext.BYTE, 1), WebGL2RenderingContext.UNSIGNED_BYTE, 1), WebGL2RenderingContext.SHORT, 2), WebGL2RenderingContext.UNSIGNED_SHORT, 2), WebGL2RenderingContext.INT, 4), WebGL2RenderingContext.UNSIGNED_INT, 4), WebGL2RenderingContext.FLOAT, 4), Vr = /* @__PURE__ */ (function() {
  function t(e, n, i) {
    Y(this, t), w(this, "array", new Float32Array()), w(this, "constantArray", new Float32Array()), w(this, "capacity", 0), w(this, "verticesCount", 0);
    var r = this.getDefinition();
    if (this.VERTICES = r.VERTICES, this.VERTEX_SHADER_SOURCE = r.VERTEX_SHADER_SOURCE, this.FRAGMENT_SHADER_SOURCE = r.FRAGMENT_SHADER_SOURCE, this.UNIFORMS = r.UNIFORMS, this.ATTRIBUTES = r.ATTRIBUTES, this.METHOD = r.METHOD, this.CONSTANT_ATTRIBUTES = "CONSTANT_ATTRIBUTES" in r ? r.CONSTANT_ATTRIBUTES : [], this.CONSTANT_DATA = "CONSTANT_DATA" in r ? r.CONSTANT_DATA : [], this.isInstanced = "CONSTANT_ATTRIBUTES" in r, this.ATTRIBUTES_ITEMS_COUNT = hn(this.ATTRIBUTES), this.STRIDE = this.VERTICES * this.ATTRIBUTES_ITEMS_COUNT, this.renderer = i, this.normalProgram = this.getProgramInfo("normal", e, r.VERTEX_SHADER_SOURCE, r.FRAGMENT_SHADER_SOURCE, null), this.pickProgram = n ? this.getProgramInfo("pick", e, Ni + r.VERTEX_SHADER_SOURCE, Ni + r.FRAGMENT_SHADER_SOURCE, n) : null, this.isInstanced) {
      var o = hn(this.CONSTANT_ATTRIBUTES);
      if (this.CONSTANT_DATA.length !== this.VERTICES) throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES, " items, received ").concat(this.CONSTANT_DATA.length, " instead)"));
      this.constantArray = new Float32Array(this.CONSTANT_DATA.length * o);
      for (var a = 0; a < this.CONSTANT_DATA.length; a++) {
        var s = this.CONSTANT_DATA[a];
        if (s.length !== o) throw new Error("Program: error while getting constant data (one vector has ".concat(s.length, " items instead of ").concat(o, ")"));
        for (var u = 0; u < s.length; u++) this.constantArray[a * o + u] = s[u];
      }
      this.STRIDE = this.ATTRIBUTES_ITEMS_COUNT;
    }
  }
  return q(t, [{
    key: "kill",
    value: function() {
      Li(this.normalProgram), this.pickProgram && (Li(this.pickProgram), this.pickProgram = null);
    }
  }, {
    key: "getProgramInfo",
    value: function(n, i, r, o, a) {
      var s = this.getDefinition(), u = i.createBuffer();
      if (u === null) throw new Error("Program: error while creating the WebGL buffer.");
      var d = Ma(i, r), h = za(i, o), l = Oa(i, [d, h]), c = {};
      s.UNIFORMS.forEach(function(v) {
        var y = i.getUniformLocation(l, v);
        y && (c[v] = y);
      });
      var f = {};
      s.ATTRIBUTES.forEach(function(v) {
        f[v.name] = i.getAttribLocation(l, v.name);
      });
      var g;
      if ("CONSTANT_ATTRIBUTES" in s && (s.CONSTANT_ATTRIBUTES.forEach(function(v) {
        f[v.name] = i.getAttribLocation(l, v.name);
      }), g = i.createBuffer(), g === null))
        throw new Error("Program: error while creating the WebGL constant buffer.");
      return {
        name: n,
        program: l,
        gl: i,
        frameBuffer: a,
        buffer: u,
        constantBuffer: g || {},
        uniformLocations: c,
        attributeLocations: f,
        isPicking: n === "pick",
        vertexShader: d,
        fragmentShader: h
      };
    }
  }, {
    key: "bindProgram",
    value: function(n) {
      var i = this, r = 0, o = n.gl, a = n.buffer;
      this.isInstanced ? (o.bindBuffer(o.ARRAY_BUFFER, n.constantBuffer), r = 0, this.CONSTANT_ATTRIBUTES.forEach(function(s) {
        return r += i.bindAttribute(s, n, r, !1);
      }), o.bufferData(o.ARRAY_BUFFER, this.constantArray, o.STATIC_DRAW), o.bindBuffer(o.ARRAY_BUFFER, n.buffer), r = 0, this.ATTRIBUTES.forEach(function(s) {
        return r += i.bindAttribute(s, n, r, !0);
      }), o.bufferData(o.ARRAY_BUFFER, this.array, o.DYNAMIC_DRAW)) : (o.bindBuffer(o.ARRAY_BUFFER, a), r = 0, this.ATTRIBUTES.forEach(function(s) {
        return r += i.bindAttribute(s, n, r);
      }), o.bufferData(o.ARRAY_BUFFER, this.array, o.DYNAMIC_DRAW)), o.bindBuffer(o.ARRAY_BUFFER, null);
    }
  }, {
    key: "unbindProgram",
    value: function(n) {
      var i = this;
      this.isInstanced ? (this.CONSTANT_ATTRIBUTES.forEach(function(r) {
        return i.unbindAttribute(r, n, !1);
      }), this.ATTRIBUTES.forEach(function(r) {
        return i.unbindAttribute(r, n, !0);
      })) : this.ATTRIBUTES.forEach(function(r) {
        return i.unbindAttribute(r, n);
      });
    }
  }, {
    key: "bindAttribute",
    value: function(n, i, r, o) {
      var a = Ua[n.type];
      if (typeof a != "number") throw new Error('Program.bind: yet unsupported attribute type "'.concat(n.type, '"'));
      var s = i.attributeLocations[n.name], u = i.gl;
      if (s !== -1) {
        u.enableVertexAttribArray(s);
        var d = this.isInstanced ? (o ? this.ATTRIBUTES_ITEMS_COUNT : hn(this.CONSTANT_ATTRIBUTES)) * Float32Array.BYTES_PER_ELEMENT : this.ATTRIBUTES_ITEMS_COUNT * Float32Array.BYTES_PER_ELEMENT;
        if (u.vertexAttribPointer(s, n.size, n.type, n.normalized || !1, d, r), this.isInstanced && o)
          if (u instanceof WebGL2RenderingContext)
            u.vertexAttribDivisor(s, 1);
          else {
            var h = u.getExtension("ANGLE_instanced_arrays");
            h && h.vertexAttribDivisorANGLE(s, 1);
          }
      }
      return n.size * a;
    }
  }, {
    key: "unbindAttribute",
    value: function(n, i, r) {
      var o = i.attributeLocations[n.name], a = i.gl;
      if (o !== -1 && (a.disableVertexAttribArray(o), this.isInstanced && r))
        if (a instanceof WebGL2RenderingContext)
          a.vertexAttribDivisor(o, 0);
        else {
          var s = a.getExtension("ANGLE_instanced_arrays");
          s && s.vertexAttribDivisorANGLE(o, 0);
        }
    }
  }, {
    key: "reallocate",
    value: function(n) {
      n !== this.capacity && (this.capacity = n, this.verticesCount = this.VERTICES * n, this.array = new Float32Array(this.isInstanced ? this.capacity * this.ATTRIBUTES_ITEMS_COUNT : this.verticesCount * this.ATTRIBUTES_ITEMS_COUNT));
    }
  }, {
    key: "hasNothingToRender",
    value: function() {
      return this.verticesCount === 0;
    }
  }, {
    key: "renderProgram",
    value: function(n, i) {
      var r = i.gl, o = i.program;
      r.enable(r.BLEND), r.useProgram(o), this.setUniforms(n, i), this.drawWebGL(this.METHOD, i);
    }
  }, {
    key: "render",
    value: function(n) {
      this.hasNothingToRender() || (this.pickProgram && (this.pickProgram.gl.viewport(0, 0, n.width * n.pixelRatio / n.downSizingRatio, n.height * n.pixelRatio / n.downSizingRatio), this.bindProgram(this.pickProgram), this.renderProgram(L(L({}, n), {}, {
        pixelRatio: n.pixelRatio / n.downSizingRatio
      }), this.pickProgram), this.unbindProgram(this.pickProgram)), this.normalProgram.gl.viewport(0, 0, n.width * n.pixelRatio, n.height * n.pixelRatio), this.bindProgram(this.normalProgram), this.renderProgram(n, this.normalProgram), this.unbindProgram(this.normalProgram));
    }
  }, {
    key: "drawWebGL",
    value: function(n, i) {
      var r = i.gl, o = i.frameBuffer;
      if (r.bindFramebuffer(r.FRAMEBUFFER, o), !this.isInstanced)
        r.drawArrays(n, 0, this.verticesCount);
      else if (r instanceof WebGL2RenderingContext)
        r.drawArraysInstanced(n, 0, this.VERTICES, this.capacity);
      else {
        var a = r.getExtension("ANGLE_instanced_arrays");
        a && a.drawArraysInstancedANGLE(n, 0, this.VERTICES, this.capacity);
      }
    }
  }]);
})(), Ba = /* @__PURE__ */ (function(t) {
  function e() {
    return Y(this, e), oe(this, e, arguments);
  }
  return ae(e, t), q(e, [{
    key: "kill",
    value: function() {
      Wr(e, "kill", this)([]);
    }
  }, {
    key: "process",
    value: function(i, r, o) {
      var a = r * this.STRIDE;
      if (o.hidden) {
        for (var s = a + this.STRIDE; a < s; a++)
          this.array[a] = 0;
        return;
      }
      return this.processVisibleItem(Hr(i), a, o);
    }
  }]);
})(Vr), qt = /* @__PURE__ */ (function(t) {
  function e() {
    var n;
    Y(this, e);
    for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++)
      r[o] = arguments[o];
    return n = oe(this, e, [].concat(r)), w(n, "drawLabel", void 0), n;
  }
  return ae(e, t), q(e, [{
    key: "kill",
    value: function() {
      Wr(e, "kill", this)([]);
    }
  }, {
    key: "process",
    value: function(i, r, o, a, s) {
      var u = r * this.STRIDE;
      if (s.hidden || o.hidden || a.hidden) {
        for (var d = u + this.STRIDE; u < d; u++)
          this.array[u] = 0;
        return;
      }
      return this.processVisibleItem(Hr(i), u, o, a, s);
    }
  }]);
})(Vr);
function Ha(t, e) {
  return /* @__PURE__ */ (function() {
    function n(i, r, o) {
      Y(this, n), w(this, "drawLabel", e), this.programs = t.map(function(a) {
        return new a(i, r, o);
      });
    }
    return q(n, [{
      key: "reallocate",
      value: function(r) {
        this.programs.forEach(function(o) {
          return o.reallocate(r);
        });
      }
    }, {
      key: "process",
      value: function(r, o, a, s, u) {
        this.programs.forEach(function(d) {
          return d.process(r, o, a, s, u);
        });
      }
    }, {
      key: "render",
      value: function(r) {
        this.programs.forEach(function(o) {
          return o.render(r);
        });
      }
    }, {
      key: "kill",
      value: function() {
        this.programs.forEach(function(r) {
          return r.kill();
        });
      }
    }]);
  })();
}
function Wa(t, e, n, i, r) {
  var o = r.edgeLabelSize, a = r.edgeLabelFont, s = r.edgeLabelWeight, u = r.edgeLabelColor.attribute ? e[r.edgeLabelColor.attribute] || r.edgeLabelColor.color || "#000" : r.edgeLabelColor.color, d = e.label;
  if (d) {
    t.fillStyle = u, t.font = "".concat(s, " ").concat(o, "px ").concat(a);
    var h = n.size, l = i.size, c = n.x, f = n.y, g = i.x, v = i.y, y = (c + g) / 2, x = (f + v) / 2, _ = g - c, S = v - f, p = Math.sqrt(_ * _ + S * S);
    if (!(p < h + l)) {
      c += _ * h / p, f += S * h / p, g -= _ * l / p, v -= S * l / p, y = (c + g) / 2, x = (f + v) / 2, _ = g - c, S = v - f, p = Math.sqrt(_ * _ + S * S);
      var m = t.measureText(d).width;
      if (m > p) {
        var b = "…";
        for (d = d + b, m = t.measureText(d).width; m > p && d.length > 1; )
          d = d.slice(0, -2) + b, m = t.measureText(d).width;
        if (d.length < 4) return;
      }
      var E;
      _ > 0 ? S > 0 ? E = Math.acos(_ / p) : E = Math.asin(S / p) : S > 0 ? E = Math.acos(_ / p) + Math.PI : E = Math.asin(_ / p) + Math.PI / 2, t.save(), t.translate(y, x), t.rotate(E), t.fillText(d, -m / 2, e.size / 2 + o), t.restore();
    }
  }
}
function Yr(t, e, n) {
  if (e.label) {
    var i = n.labelSize, r = n.labelFont, o = n.labelWeight, a = n.labelColor.attribute ? e[n.labelColor.attribute] || n.labelColor.color || "#000" : n.labelColor.color;
    t.fillStyle = a, t.font = "".concat(o, " ").concat(i, "px ").concat(r), t.fillText(e.label, e.x + e.size + 3, e.y + i / 3);
  }
}
function ja(t, e, n) {
  var i = n.labelSize, r = n.labelFont, o = n.labelWeight;
  t.font = "".concat(o, " ").concat(i, "px ").concat(r), t.fillStyle = "#FFF", t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 8, t.shadowColor = "#000";
  var a = 2;
  if (typeof e.label == "string") {
    var s = t.measureText(e.label).width, u = Math.round(s + 5), d = Math.round(i + 2 * a), h = Math.max(e.size, i / 2) + a, l = Math.asin(d / 2 / h), c = Math.sqrt(Math.abs(Math.pow(h, 2) - Math.pow(d / 2, 2)));
    t.beginPath(), t.moveTo(e.x + c, e.y + d / 2), t.lineTo(e.x + h + u, e.y + d / 2), t.lineTo(e.x + h + u, e.y - d / 2), t.lineTo(e.x + c, e.y - d / 2), t.arc(e.x, e.y, h, l, -l), t.closePath(), t.fill();
  } else
    t.beginPath(), t.arc(e.x, e.y, e.size + a, 0, Math.PI * 2), t.closePath(), t.fill();
  t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 0, Yr(t, e, n);
}
var Va = (
  /*glsl*/
  `
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

uniform float u_correctionRatio;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float border = u_correctionRatio * 2.0;
  float dist = length(v_diffVector) - v_radius + border;

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > border)
    gl_FragColor = transparent;
  else
    gl_FragColor = v_color;

  #else
  float t = 0.0;
  if (dist > border)
    t = 1.0;
  else if (dist > 0.0)
    t = dist / border;

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`
), Ya = Va, qa = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying float v_border;

const float bias = 255.0 / 254.0;

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_diffVector = diffVector;
  v_radius = size / 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), Ka = qa, qr = WebGLRenderingContext, Di = qr.UNSIGNED_BYTE, cn = qr.FLOAT, Xa = ["u_sizeRatio", "u_correctionRatio", "u_matrix"], Kt = /* @__PURE__ */ (function(t) {
  function e() {
    return Y(this, e), oe(this, e, arguments);
  }
  return ae(e, t), q(e, [{
    key: "getDefinition",
    value: function() {
      return {
        VERTICES: 3,
        VERTEX_SHADER_SOURCE: Ka,
        FRAGMENT_SHADER_SOURCE: Ya,
        METHOD: WebGLRenderingContext.TRIANGLES,
        UNIFORMS: Xa,
        ATTRIBUTES: [{
          name: "a_position",
          size: 2,
          type: cn
        }, {
          name: "a_size",
          size: 1,
          type: cn
        }, {
          name: "a_color",
          size: 4,
          type: Di,
          normalized: !0
        }, {
          name: "a_id",
          size: 4,
          type: Di,
          normalized: !0
        }],
        CONSTANT_ATTRIBUTES: [{
          name: "a_angle",
          size: 1,
          type: cn
        }],
        CONSTANT_DATA: [[e.ANGLE_1], [e.ANGLE_2], [e.ANGLE_3]]
      };
    }
  }, {
    key: "processVisibleItem",
    value: function(i, r, o) {
      var a = this.array, s = Ke(o.color);
      a[r++] = o.x, a[r++] = o.y, a[r++] = o.size, a[r++] = s, a[r++] = i;
    }
  }, {
    key: "setUniforms",
    value: function(i, r) {
      var o = r.gl, a = r.uniformLocations, s = a.u_sizeRatio, u = a.u_correctionRatio, d = a.u_matrix;
      o.uniform1f(u, i.correctionRatio), o.uniform1f(s, i.sizeRatio), o.uniformMatrix3fv(d, !1, i.matrix);
    }
  }]);
})(Ba);
w(Kt, "ANGLE_1", 0);
w(Kt, "ANGLE_2", 2 * Math.PI / 3);
w(Kt, "ANGLE_3", 4 * Math.PI / 3);
var Za = (
  /*glsl*/
  `
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`
), Ja = Za, Qa = (
  /*glsl*/
  `
attribute vec2 a_position;
attribute vec2 a_normal;
attribute float a_radius;
attribute vec3 a_barycentric;

#ifdef PICKING_MODE
attribute vec4 a_id;
#else
attribute vec4 a_color;
#endif

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float normalLength = length(a_normal);
  vec2 unitNormal = a_normal / normalLength;

  // These first computations are taken from edge.vert.glsl and
  // edge.clamped.vert.glsl. Please read it to get better comments on what's
  // happening:
  float pixelsThickness = max(normalLength / u_sizeRatio, minThickness);
  float webGLThickness = pixelsThickness * u_correctionRatio;
  float webGLNodeRadius = a_radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  float webGLArrowHeadThickness = webGLThickness * u_widenessToThicknessRatio;

  float da = a_barycentric.x;
  float db = a_barycentric.y;
  float dc = a_barycentric.z;

  vec2 delta = vec2(
      da * (webGLNodeRadius * unitNormal.y)
    + db * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y + webGLArrowHeadThickness * unitNormal.x)
    + dc * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y - webGLArrowHeadThickness * unitNormal.x),

      da * (-webGLNodeRadius * unitNormal.x)
    + db * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x + webGLArrowHeadThickness * unitNormal.y)
    + dc * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x - webGLArrowHeadThickness * unitNormal.y)
  );

  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;

  gl_Position = vec4(position, 0, 1);

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), es = Qa, Kr = WebGLRenderingContext, Gi = Kr.UNSIGNED_BYTE, mt = Kr.FLOAT, ts = ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_minEdgeThickness", "u_lengthToThicknessRatio", "u_widenessToThicknessRatio"], Xt = {
  extremity: "target",
  lengthToThicknessRatio: 2.5,
  widenessToThicknessRatio: 2
};
function Xr(t) {
  var e = L(L({}, Xt), {});
  return /* @__PURE__ */ (function(n) {
    function i() {
      return Y(this, i), oe(this, i, arguments);
    }
    return ae(i, n), q(i, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 3,
          VERTEX_SHADER_SOURCE: es,
          FRAGMENT_SHADER_SOURCE: Ja,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: ts,
          ATTRIBUTES: [{
            name: "a_position",
            size: 2,
            type: mt
          }, {
            name: "a_normal",
            size: 2,
            type: mt
          }, {
            name: "a_radius",
            size: 1,
            type: mt
          }, {
            name: "a_color",
            size: 4,
            type: Gi,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: Gi,
            normalized: !0
          }],
          CONSTANT_ATTRIBUTES: [{
            name: "a_barycentric",
            size: 3,
            type: mt
          }],
          CONSTANT_DATA: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(o, a, s, u, d) {
        if (e.extremity === "source") {
          var h = [u, s];
          s = h[0], u = h[1];
        }
        var l = d.size || 1, c = u.size || 1, f = s.x, g = s.y, v = u.x, y = u.y, x = Ke(d.color), _ = v - f, S = y - g, p = _ * _ + S * S, m = 0, b = 0;
        p && (p = 1 / Math.sqrt(p), m = -S * p * l, b = _ * p * l);
        var E = this.array;
        E[a++] = v, E[a++] = y, E[a++] = -m, E[a++] = -b, E[a++] = c, E[a++] = x, E[a++] = o;
      }
    }, {
      key: "setUniforms",
      value: function(o, a) {
        var s = a.gl, u = a.uniformLocations, d = u.u_matrix, h = u.u_sizeRatio, l = u.u_correctionRatio, c = u.u_minEdgeThickness, f = u.u_lengthToThicknessRatio, g = u.u_widenessToThicknessRatio;
        s.uniformMatrix3fv(d, !1, o.matrix), s.uniform1f(h, o.sizeRatio), s.uniform1f(l, o.correctionRatio), s.uniform1f(c, o.minEdgeThickness), s.uniform1f(f, e.lengthToThicknessRatio), s.uniform1f(g, e.widenessToThicknessRatio);
      }
    }]);
  })(qt);
}
Xr();
var ns = (
  /*glsl*/
  `
precision mediump float;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  // We only handle antialiasing for normal mode:
  #ifdef PICKING_MODE
  gl_FragColor = v_color;
  #else
  float dist = length(v_normal) * v_thickness;

  float t = smoothstep(
    v_thickness - v_feather,
    v_thickness,
    dist
  );

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`
), Zr = ns, is = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_radius;
attribute float a_radiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float radius = a_radius * a_radiusCoef;
  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow head:
  float direction = sign(radius);
  float webGLNodeRadius = direction * radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;

  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (webGLNodeRadius + webGLArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + compensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), rs = is, Jr = WebGLRenderingContext, Pi = Jr.UNSIGNED_BYTE, Pe = Jr.FLOAT, os = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness", "u_lengthToThicknessRatio"], as = {
  lengthToThicknessRatio: Xt.lengthToThicknessRatio
};
function Qr(t) {
  var e = L(L({}, as), {});
  return /* @__PURE__ */ (function(n) {
    function i() {
      return Y(this, i), oe(this, i, arguments);
    }
    return ae(i, n), q(i, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 6,
          VERTEX_SHADER_SOURCE: rs,
          FRAGMENT_SHADER_SOURCE: Zr,
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: os,
          ATTRIBUTES: [{
            name: "a_positionStart",
            size: 2,
            type: Pe
          }, {
            name: "a_positionEnd",
            size: 2,
            type: Pe
          }, {
            name: "a_normal",
            size: 2,
            type: Pe
          }, {
            name: "a_color",
            size: 4,
            type: Pi,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: Pi,
            normalized: !0
          }, {
            name: "a_radius",
            size: 1,
            type: Pe
          }],
          CONSTANT_ATTRIBUTES: [
            // If 0, then position will be a_positionStart
            // If 1, then position will be a_positionEnd
            {
              name: "a_positionCoef",
              size: 1,
              type: Pe
            },
            {
              name: "a_normalCoef",
              size: 1,
              type: Pe
            },
            {
              name: "a_radiusCoef",
              size: 1,
              type: Pe
            }
          ],
          CONSTANT_DATA: [[0, 1, 0], [0, -1, 0], [1, 1, 1], [1, 1, 1], [0, -1, 0], [1, -1, -1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(o, a, s, u, d) {
        var h = d.size || 1, l = s.x, c = s.y, f = u.x, g = u.y, v = Ke(d.color), y = f - l, x = g - c, _ = u.size || 1, S = y * y + x * x, p = 0, m = 0;
        S && (S = 1 / Math.sqrt(S), p = -x * S * h, m = y * S * h);
        var b = this.array;
        b[a++] = l, b[a++] = c, b[a++] = f, b[a++] = g, b[a++] = p, b[a++] = m, b[a++] = v, b[a++] = o, b[a++] = _;
      }
    }, {
      key: "setUniforms",
      value: function(o, a) {
        var s = a.gl, u = a.uniformLocations, d = u.u_matrix, h = u.u_zoomRatio, l = u.u_feather, c = u.u_pixelRatio, f = u.u_correctionRatio, g = u.u_sizeRatio, v = u.u_minEdgeThickness, y = u.u_lengthToThicknessRatio;
        s.uniformMatrix3fv(d, !1, o.matrix), s.uniform1f(h, o.zoomRatio), s.uniform1f(g, o.sizeRatio), s.uniform1f(f, o.correctionRatio), s.uniform1f(c, o.pixelRatio), s.uniform1f(l, o.antiAliasingFeather), s.uniform1f(v, o.minEdgeThickness), s.uniform1f(y, e.lengthToThicknessRatio);
      }
    }]);
  })(qt);
}
Qr();
function ss(t) {
  return Ha([Qr(), Xr()]);
}
var us = ss(), ds = us, ls = (
  /*glsl*/
  `
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_zoomRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // We require edges to be at least "minThickness" pixels thick *on screen*
  // (so we need to compensate the size ratio):
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);

  // Then, we need to retrieve the normalized thickness of the edge in the WebGL
  // referential (in a ([0, 1], [0, 1]) space), using our "magic" correction
  // ratio:
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness, 1)).xy, 0, 1);

  // For the fragment shader though, we need a thickness that takes the "magic"
  // correction ratio into account (as in webGLThickness), but so that the
  // antialiasing effect does not depend on the zoom level. So here's yet
  // another thickness version:
  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`
), hs = ls, eo = WebGLRenderingContext, Fi = eo.UNSIGNED_BYTE, Qe = eo.FLOAT, cs = ["u_matrix", "u_zoomRatio", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_feather", "u_minEdgeThickness"], fs = /* @__PURE__ */ (function(t) {
  function e() {
    return Y(this, e), oe(this, e, arguments);
  }
  return ae(e, t), q(e, [{
    key: "getDefinition",
    value: function() {
      return {
        VERTICES: 6,
        VERTEX_SHADER_SOURCE: hs,
        FRAGMENT_SHADER_SOURCE: Zr,
        METHOD: WebGLRenderingContext.TRIANGLES,
        UNIFORMS: cs,
        ATTRIBUTES: [{
          name: "a_positionStart",
          size: 2,
          type: Qe
        }, {
          name: "a_positionEnd",
          size: 2,
          type: Qe
        }, {
          name: "a_normal",
          size: 2,
          type: Qe
        }, {
          name: "a_color",
          size: 4,
          type: Fi,
          normalized: !0
        }, {
          name: "a_id",
          size: 4,
          type: Fi,
          normalized: !0
        }],
        CONSTANT_ATTRIBUTES: [
          // If 0, then position will be a_positionStart
          // If 2, then position will be a_positionEnd
          {
            name: "a_positionCoef",
            size: 1,
            type: Qe
          },
          {
            name: "a_normalCoef",
            size: 1,
            type: Qe
          }
        ],
        CONSTANT_DATA: [[0, 1], [0, -1], [1, 1], [1, 1], [0, -1], [1, -1]]
      };
    }
  }, {
    key: "processVisibleItem",
    value: function(i, r, o, a, s) {
      var u = s.size || 1, d = o.x, h = o.y, l = a.x, c = a.y, f = Ke(s.color), g = l - d, v = c - h, y = g * g + v * v, x = 0, _ = 0;
      y && (y = 1 / Math.sqrt(y), x = -v * y * u, _ = g * y * u);
      var S = this.array;
      S[r++] = d, S[r++] = h, S[r++] = l, S[r++] = c, S[r++] = x, S[r++] = _, S[r++] = f, S[r++] = i;
    }
  }, {
    key: "setUniforms",
    value: function(i, r) {
      var o = r.gl, a = r.uniformLocations, s = a.u_matrix, u = a.u_zoomRatio, d = a.u_feather, h = a.u_pixelRatio, l = a.u_correctionRatio, c = a.u_sizeRatio, f = a.u_minEdgeThickness;
      o.uniformMatrix3fv(s, !1, i.matrix), o.uniform1f(u, i.zoomRatio), o.uniform1f(c, i.sizeRatio), o.uniform1f(l, i.correctionRatio), o.uniform1f(h, i.pixelRatio), o.uniform1f(d, i.antiAliasingFeather), o.uniform1f(f, i.minEdgeThickness);
    }
  }]);
})(qt);
function ps(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var yt = { exports: {} }, $i;
function gs() {
  if ($i) return yt.exports;
  $i = 1;
  var t = typeof Reflect == "object" ? Reflect : null, e = t && typeof t.apply == "function" ? t.apply : function(m, b, E) {
    return Function.prototype.apply.call(m, b, E);
  }, n;
  t && typeof t.ownKeys == "function" ? n = t.ownKeys : Object.getOwnPropertySymbols ? n = function(m) {
    return Object.getOwnPropertyNames(m).concat(Object.getOwnPropertySymbols(m));
  } : n = function(m) {
    return Object.getOwnPropertyNames(m);
  };
  function i(p) {
    console && console.warn && console.warn(p);
  }
  var r = Number.isNaN || function(m) {
    return m !== m;
  };
  function o() {
    o.init.call(this);
  }
  yt.exports = o, yt.exports.once = x, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
  var a = 10;
  function s(p) {
    if (typeof p != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof p);
  }
  Object.defineProperty(o, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return a;
    },
    set: function(p) {
      if (typeof p != "number" || p < 0 || r(p))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + p + ".");
      a = p;
    }
  }), o.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, o.prototype.setMaxListeners = function(m) {
    if (typeof m != "number" || m < 0 || r(m))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + m + ".");
    return this._maxListeners = m, this;
  };
  function u(p) {
    return p._maxListeners === void 0 ? o.defaultMaxListeners : p._maxListeners;
  }
  o.prototype.getMaxListeners = function() {
    return u(this);
  }, o.prototype.emit = function(m) {
    for (var b = [], E = 1; E < arguments.length; E++) b.push(arguments[E]);
    var A = m === "error", R = this._events;
    if (R !== void 0)
      A = A && R.error === void 0;
    else if (!A)
      return !1;
    if (A) {
      var N;
      if (b.length > 0 && (N = b[0]), N instanceof Error)
        throw N;
      var P = new Error("Unhandled error." + (N ? " (" + N.message + ")" : ""));
      throw P.context = N, P;
    }
    var I = R[m];
    if (I === void 0)
      return !1;
    if (typeof I == "function")
      e(I, this, b);
    else
      for (var H = I.length, z = g(I, H), E = 0; E < H; ++E)
        e(z[E], this, b);
    return !0;
  };
  function d(p, m, b, E) {
    var A, R, N;
    if (s(b), R = p._events, R === void 0 ? (R = p._events = /* @__PURE__ */ Object.create(null), p._eventsCount = 0) : (R.newListener !== void 0 && (p.emit(
      "newListener",
      m,
      b.listener ? b.listener : b
    ), R = p._events), N = R[m]), N === void 0)
      N = R[m] = b, ++p._eventsCount;
    else if (typeof N == "function" ? N = R[m] = E ? [b, N] : [N, b] : E ? N.unshift(b) : N.push(b), A = u(p), A > 0 && N.length > A && !N.warned) {
      N.warned = !0;
      var P = new Error("Possible EventEmitter memory leak detected. " + N.length + " " + String(m) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      P.name = "MaxListenersExceededWarning", P.emitter = p, P.type = m, P.count = N.length, i(P);
    }
    return p;
  }
  o.prototype.addListener = function(m, b) {
    return d(this, m, b, !1);
  }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(m, b) {
    return d(this, m, b, !0);
  };
  function h() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function l(p, m, b) {
    var E = { fired: !1, wrapFn: void 0, target: p, type: m, listener: b }, A = h.bind(E);
    return A.listener = b, E.wrapFn = A, A;
  }
  o.prototype.once = function(m, b) {
    return s(b), this.on(m, l(this, m, b)), this;
  }, o.prototype.prependOnceListener = function(m, b) {
    return s(b), this.prependListener(m, l(this, m, b)), this;
  }, o.prototype.removeListener = function(m, b) {
    var E, A, R, N, P;
    if (s(b), A = this._events, A === void 0)
      return this;
    if (E = A[m], E === void 0)
      return this;
    if (E === b || E.listener === b)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete A[m], A.removeListener && this.emit("removeListener", m, E.listener || b));
    else if (typeof E != "function") {
      for (R = -1, N = E.length - 1; N >= 0; N--)
        if (E[N] === b || E[N].listener === b) {
          P = E[N].listener, R = N;
          break;
        }
      if (R < 0)
        return this;
      R === 0 ? E.shift() : v(E, R), E.length === 1 && (A[m] = E[0]), A.removeListener !== void 0 && this.emit("removeListener", m, P || b);
    }
    return this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(m) {
    var b, E, A;
    if (E = this._events, E === void 0)
      return this;
    if (E.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : E[m] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete E[m]), this;
    if (arguments.length === 0) {
      var R = Object.keys(E), N;
      for (A = 0; A < R.length; ++A)
        N = R[A], N !== "removeListener" && this.removeAllListeners(N);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (b = E[m], typeof b == "function")
      this.removeListener(m, b);
    else if (b !== void 0)
      for (A = b.length - 1; A >= 0; A--)
        this.removeListener(m, b[A]);
    return this;
  };
  function c(p, m, b) {
    var E = p._events;
    if (E === void 0)
      return [];
    var A = E[m];
    return A === void 0 ? [] : typeof A == "function" ? b ? [A.listener || A] : [A] : b ? y(A) : g(A, A.length);
  }
  o.prototype.listeners = function(m) {
    return c(this, m, !0);
  }, o.prototype.rawListeners = function(m) {
    return c(this, m, !1);
  }, o.listenerCount = function(p, m) {
    return typeof p.listenerCount == "function" ? p.listenerCount(m) : f.call(p, m);
  }, o.prototype.listenerCount = f;
  function f(p) {
    var m = this._events;
    if (m !== void 0) {
      var b = m[p];
      if (typeof b == "function")
        return 1;
      if (b !== void 0)
        return b.length;
    }
    return 0;
  }
  o.prototype.eventNames = function() {
    return this._eventsCount > 0 ? n(this._events) : [];
  };
  function g(p, m) {
    for (var b = new Array(m), E = 0; E < m; ++E)
      b[E] = p[E];
    return b;
  }
  function v(p, m) {
    for (; m + 1 < p.length; m++)
      p[m] = p[m + 1];
    p.pop();
  }
  function y(p) {
    for (var m = new Array(p.length), b = 0; b < m.length; ++b)
      m[b] = p[b].listener || p[b];
    return m;
  }
  function x(p, m) {
    return new Promise(function(b, E) {
      function A(N) {
        p.removeListener(m, R), E(N);
      }
      function R() {
        typeof p.removeListener == "function" && p.removeListener("error", A), b([].slice.call(arguments));
      }
      S(p, m, R, { once: !0 }), m !== "error" && _(p, A, { once: !0 });
    });
  }
  function _(p, m, b) {
    typeof p.on == "function" && S(p, "error", m, b);
  }
  function S(p, m, b, E) {
    if (typeof p.on == "function")
      E.once ? p.once(m, b) : p.on(m, b);
    else if (typeof p.addEventListener == "function")
      p.addEventListener(m, function A(R) {
        E.once && p.removeEventListener(m, A), b(R);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof p);
  }
  return yt.exports;
}
var to = gs(), ei = /* @__PURE__ */ (function(t) {
  function e() {
    var n;
    return Y(this, e), n = oe(this, e), n.rawEmitter = n, n;
  }
  return ae(e, t), q(e);
})(to.EventEmitter), fn, Ii;
function vs() {
  return Ii || (Ii = 1, fn = function(e) {
    return e !== null && typeof e == "object" && typeof e.addUndirectedEdgeWithKey == "function" && typeof e.dropNode == "function" && typeof e.multi == "boolean";
  }), fn;
}
var ms = vs();
const ys = /* @__PURE__ */ ps(ms);
var _s = function(e) {
  return e;
}, bs = function(e) {
  return e * e;
}, ws = function(e) {
  return e * (2 - e);
}, Es = function(e) {
  return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
}, xs = function(e) {
  return e * e * e;
}, Ss = function(e) {
  return --e * e * e + 1;
}, Ts = function(e) {
  return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
}, ks = {
  linear: _s,
  quadraticIn: bs,
  quadraticOut: ws,
  quadraticInOut: Es,
  cubicIn: xs,
  cubicOut: Ss,
  cubicInOut: Ts
}, Cs = {
  easing: "quadraticInOut",
  duration: 150
};
function de() {
  return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
}
function _t(t, e, n) {
  return t[0] = e, t[4] = typeof n == "number" ? n : e, t;
}
function Mi(t, e) {
  var n = Math.sin(e), i = Math.cos(e);
  return t[0] = i, t[1] = n, t[3] = -n, t[4] = i, t;
}
function zi(t, e, n) {
  return t[6] = e, t[7] = n, t;
}
function ke(t, e) {
  var n = t[0], i = t[1], r = t[2], o = t[3], a = t[4], s = t[5], u = t[6], d = t[7], h = t[8], l = e[0], c = e[1], f = e[2], g = e[3], v = e[4], y = e[5], x = e[6], _ = e[7], S = e[8];
  return t[0] = l * n + c * o + f * u, t[1] = l * i + c * a + f * d, t[2] = l * r + c * s + f * h, t[3] = g * n + v * o + y * u, t[4] = g * i + v * a + y * d, t[5] = g * r + v * s + y * h, t[6] = x * n + _ * o + S * u, t[7] = x * i + _ * a + S * d, t[8] = x * r + _ * s + S * h, t;
}
function Dn(t, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, i = t[0], r = t[1], o = t[3], a = t[4], s = t[6], u = t[7], d = e.x, h = e.y;
  return {
    x: d * i + h * o + s * n,
    y: d * r + h * a + u * n
  };
}
function As(t, e) {
  var n = t.height / t.width, i = e.height / e.width;
  return n < 1 && i > 1 || n > 1 && i < 1 ? 1 : Math.min(Math.max(i, 1 / i), Math.max(1 / n, n));
}
function et(t, e, n, i, r) {
  var o = t.angle, a = t.ratio, s = t.x, u = t.y, d = e.width, h = e.height, l = de(), c = Math.min(d, h) - 2 * i, f = As(e, n);
  return r ? (ke(l, zi(de(), s, u)), ke(l, _t(de(), a)), ke(l, Mi(de(), o)), ke(l, _t(de(), d / c / 2 / f, h / c / 2 / f))) : (ke(l, _t(de(), 2 * (c / d) * f, 2 * (c / h) * f)), ke(l, Mi(de(), -o)), ke(l, _t(de(), 1 / a)), ke(l, zi(de(), -s, -u))), l;
}
function Rs(t, e, n) {
  var i = Dn(t, {
    x: Math.cos(e.angle),
    y: Math.sin(e.angle)
  }, 0), r = i.x, o = i.y;
  return 1 / Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2)) / n.width;
}
function Ls(t) {
  if (!t.order) return {
    x: [0, 1],
    y: [0, 1]
  };
  var e = 1 / 0, n = -1 / 0, i = 1 / 0, r = -1 / 0;
  return t.forEachNode(function(o, a) {
    var s = a.x, u = a.y;
    s < e && (e = s), s > n && (n = s), u < i && (i = u), u > r && (r = u);
  }), {
    x: [e, n],
    y: [i, r]
  };
}
function Ns(t) {
  if (!ys(t)) throw new Error("Sigma: invalid graph instance.");
  t.forEachNode(function(e, n) {
    if (!Number.isFinite(n.x) || !Number.isFinite(n.y))
      throw new Error("Sigma: Coordinates of node ".concat(e, " are invalid. A node must have a numeric 'x' and 'y' attribute."));
  });
}
function Ds(t, e, n) {
  var i = document.createElement(t);
  if (e)
    for (var r in e)
      i.style[r] = e[r];
  if (n)
    for (var o in n)
      i.setAttribute(o, n[o]);
  return i;
}
function Oi() {
  return typeof window.devicePixelRatio < "u" ? window.devicePixelRatio : 1;
}
function Ui(t, e, n) {
  return n.sort(function(i, r) {
    var o = e(i) || 0, a = e(r) || 0;
    return o < a ? -1 : o > a ? 1 : 0;
  });
}
function Bi(t) {
  var e = Ve(t.x, 2), n = e[0], i = e[1], r = Ve(t.y, 2), o = r[0], a = r[1], s = Math.max(i - n, a - o), u = (i + n) / 2, d = (a + o) / 2;
  (s === 0 || Math.abs(s) === 1 / 0 || isNaN(s)) && (s = 1), isNaN(u) && (u = 0), isNaN(d) && (d = 0);
  var h = function(c) {
    return {
      x: 0.5 + (c.x - u) / s,
      y: 0.5 + (c.y - d) / s
    };
  };
  return h.applyTo = function(l) {
    l.x = 0.5 + (l.x - u) / s, l.y = 0.5 + (l.y - d) / s;
  }, h.inverse = function(l) {
    return {
      x: u + s * (l.x - 0.5),
      y: d + s * (l.y - 0.5)
    };
  }, h.ratio = s, h;
}
function Gn(t) {
  "@babel/helpers - typeof";
  return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Gn(t);
}
function Hi(t, e) {
  var n = e.size;
  if (n !== 0) {
    var i = t.length;
    t.length += n;
    var r = 0;
    e.forEach(function(o) {
      t[i + r] = o, r++;
    });
  }
}
function pn(t) {
  t = t || {};
  for (var e = 0, n = arguments.length <= 1 ? 0 : arguments.length - 1; e < n; e++) {
    var i = e + 1 < 1 || arguments.length <= e + 1 ? void 0 : arguments[e + 1];
    i && Object.assign(t, i);
  }
  return t;
}
var ti = {
  // Performance
  hideEdgesOnMove: !1,
  hideLabelsOnMove: !1,
  renderLabels: !0,
  renderEdgeLabels: !1,
  enableEdgeEvents: !1,
  // Component rendering
  defaultNodeColor: "#999",
  defaultNodeType: "circle",
  defaultEdgeColor: "#ccc",
  defaultEdgeType: "line",
  labelFont: "Arial",
  labelSize: 14,
  labelWeight: "normal",
  labelColor: {
    color: "#000"
  },
  edgeLabelFont: "Arial",
  edgeLabelSize: 14,
  edgeLabelWeight: "normal",
  edgeLabelColor: {
    attribute: "color"
  },
  stagePadding: 30,
  defaultDrawEdgeLabel: Wa,
  defaultDrawNodeLabel: Yr,
  defaultDrawNodeHover: ja,
  minEdgeThickness: 1.7,
  antiAliasingFeather: 1,
  // Mouse and touch settings
  dragTimeout: 100,
  draggedEventsTolerance: 3,
  inertiaDuration: 200,
  inertiaRatio: 3,
  zoomDuration: 250,
  zoomingRatio: 1.7,
  doubleClickTimeout: 300,
  doubleClickZoomingRatio: 2.2,
  doubleClickZoomingDuration: 200,
  tapMoveTolerance: 10,
  // Size and scaling
  zoomToSizeRatioFunction: Math.sqrt,
  itemSizesReference: "screen",
  autoRescale: !0,
  autoCenter: !0,
  // Labels
  labelDensity: 1,
  labelGridCellSize: 100,
  labelRenderedSizeThreshold: 6,
  // Reducers
  nodeReducer: null,
  edgeReducer: null,
  // Features
  zIndex: !1,
  minCameraRatio: null,
  maxCameraRatio: null,
  enableCameraZooming: !0,
  enableCameraPanning: !0,
  enableCameraRotation: !0,
  cameraPanBoundaries: null,
  // Lifecycle
  allowInvalidContainer: !1,
  // Program classes
  nodeProgramClasses: {},
  nodeHoverProgramClasses: {},
  edgeProgramClasses: {}
}, Gs = {
  circle: Kt
}, Ps = {
  arrow: ds,
  line: fs
};
function gn(t) {
  if (typeof t.labelDensity != "number" || t.labelDensity < 0)
    throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
  var e = t.minCameraRatio, n = t.maxCameraRatio;
  if (typeof e == "number" && typeof n == "number" && n < e)
    throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
}
function Fs(t) {
  var e = pn({}, ti, t);
  return e.nodeProgramClasses = pn({}, Gs, e.nodeProgramClasses), e.edgeProgramClasses = pn({}, Ps, e.edgeProgramClasses), e;
}
var bt = 1.5, Wi = /* @__PURE__ */ (function(t) {
  function e() {
    var n;
    return Y(this, e), n = oe(this, e), w(n, "x", 0.5), w(n, "y", 0.5), w(n, "angle", 0), w(n, "ratio", 1), w(n, "minRatio", null), w(n, "maxRatio", null), w(n, "enabledZooming", !0), w(n, "enabledPanning", !0), w(n, "enabledRotation", !0), w(n, "clean", null), w(n, "nextFrame", null), w(n, "previousState", null), w(n, "enabled", !0), n.previousState = n.getState(), n;
  }
  return ae(e, t), q(e, [{
    key: "enable",
    value: (
      /**
       * Method used to enable the camera.
       */
      function() {
        return this.enabled = !0, this;
      }
    )
    /**
     * Method used to disable the camera.
     */
  }, {
    key: "disable",
    value: function() {
      return this.enabled = !1, this;
    }
    /**
     * Method used to retrieve the camera's current state.
     */
  }, {
    key: "getState",
    value: function() {
      return {
        x: this.x,
        y: this.y,
        angle: this.angle,
        ratio: this.ratio
      };
    }
    /**
     * Method used to check whether the camera has the given state.
     */
  }, {
    key: "hasState",
    value: function(i) {
      return this.x === i.x && this.y === i.y && this.ratio === i.ratio && this.angle === i.angle;
    }
    /**
     * Method used to retrieve the camera's previous state.
     */
  }, {
    key: "getPreviousState",
    value: function() {
      var i = this.previousState;
      return i ? {
        x: i.x,
        y: i.y,
        angle: i.angle,
        ratio: i.ratio
      } : null;
    }
    /**
     * Method used to check minRatio and maxRatio values.
     */
  }, {
    key: "getBoundedRatio",
    value: function(i) {
      var r = i;
      return typeof this.minRatio == "number" && (r = Math.max(r, this.minRatio)), typeof this.maxRatio == "number" && (r = Math.min(r, this.maxRatio)), r;
    }
    /**
     * Method used to check various things to return a legit state candidate.
     */
  }, {
    key: "validateState",
    value: function(i) {
      var r = {};
      return this.enabledPanning && typeof i.x == "number" && (r.x = i.x), this.enabledPanning && typeof i.y == "number" && (r.y = i.y), this.enabledZooming && typeof i.ratio == "number" && (r.ratio = this.getBoundedRatio(i.ratio)), this.enabledRotation && typeof i.angle == "number" && (r.angle = i.angle), this.clean ? this.clean(L(L({}, this.getState()), r)) : r;
    }
    /**
     * Method used to check whether the camera is currently being animated.
     */
  }, {
    key: "isAnimated",
    value: function() {
      return !!this.nextFrame;
    }
    /**
     * Method used to set the camera's state.
     */
  }, {
    key: "setState",
    value: function(i) {
      if (!this.enabled) return this;
      this.previousState = this.getState();
      var r = this.validateState(i);
      return typeof r.x == "number" && (this.x = r.x), typeof r.y == "number" && (this.y = r.y), typeof r.ratio == "number" && (this.ratio = r.ratio), typeof r.angle == "number" && (this.angle = r.angle), this.hasState(this.previousState) || this.emit("updated", this.getState()), this;
    }
    /**
     * Method used to update the camera's state using a function.
     */
  }, {
    key: "updateState",
    value: function(i) {
      return this.setState(i(this.getState())), this;
    }
    /**
     * Method used to animate the camera.
     */
  }, {
    key: "animate",
    value: function(i) {
      var r = this, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments.length > 2 ? arguments[2] : void 0;
      if (!a) return new Promise(function(f) {
        return r.animate(i, o, f);
      });
      if (this.enabled) {
        var s = L(L({}, Cs), o), u = this.validateState(i), d = typeof s.easing == "function" ? s.easing : ks[s.easing], h = Date.now(), l = this.getState(), c = function() {
          var g = (Date.now() - h) / s.duration;
          if (g >= 1) {
            r.nextFrame = null, r.setState(u), r.animationCallback && (r.animationCallback.call(null), r.animationCallback = void 0);
            return;
          }
          var v = d(g), y = {};
          typeof u.x == "number" && (y.x = l.x + (u.x - l.x) * v), typeof u.y == "number" && (y.y = l.y + (u.y - l.y) * v), r.enabledRotation && typeof u.angle == "number" && (y.angle = l.angle + (u.angle - l.angle) * v), typeof u.ratio == "number" && (y.ratio = l.ratio + (u.ratio - l.ratio) * v), r.setState(y), r.nextFrame = requestAnimationFrame(c);
        };
        this.nextFrame ? (cancelAnimationFrame(this.nextFrame), this.animationCallback && this.animationCallback.call(null), this.nextFrame = requestAnimationFrame(c)) : c(), this.animationCallback = a;
      }
    }
    /**
     * Method used to zoom the camera.
     */
  }, {
    key: "animatedZoom",
    value: function(i) {
      return i ? typeof i == "number" ? this.animate({
        ratio: this.ratio / i
      }) : this.animate({
        ratio: this.ratio / (i.factor || bt)
      }, i) : this.animate({
        ratio: this.ratio / bt
      });
    }
    /**
     * Method used to unzoom the camera.
     */
  }, {
    key: "animatedUnzoom",
    value: function(i) {
      return i ? typeof i == "number" ? this.animate({
        ratio: this.ratio * i
      }) : this.animate({
        ratio: this.ratio * (i.factor || bt)
      }, i) : this.animate({
        ratio: this.ratio * bt
      });
    }
    /**
     * Method used to reset the camera.
     */
  }, {
    key: "animatedReset",
    value: function(i) {
      return this.animate({
        x: 0.5,
        y: 0.5,
        ratio: 1,
        angle: 0
      }, i);
    }
    /**
     * Returns a new Camera instance, with the same state as the current camera.
     */
  }, {
    key: "copy",
    value: function() {
      return e.from(this.getState());
    }
  }], [{
    key: "from",
    value: function(i) {
      var r = new e();
      return r.setState(i);
    }
  }]);
})(ei);
function le(t, e) {
  var n = e.getBoundingClientRect();
  return {
    x: t.clientX - n.left,
    y: t.clientY - n.top
  };
}
function me(t, e) {
  var n = L(L({}, le(t, e)), {}, {
    sigmaDefaultPrevented: !1,
    preventSigmaDefault: function() {
      n.sigmaDefaultPrevented = !0;
    },
    original: t
  });
  return n;
}
function tt(t) {
  var e = "x" in t ? t : L(L({}, t.touches[0] || t.previousTouches[0]), {}, {
    original: t.original,
    sigmaDefaultPrevented: t.sigmaDefaultPrevented,
    preventSigmaDefault: function() {
      t.sigmaDefaultPrevented = !0, e.sigmaDefaultPrevented = !0;
    }
  });
  return e;
}
function $s(t, e) {
  return L(L({}, me(t, e)), {}, {
    delta: no(t)
  });
}
var Is = 2;
function At(t) {
  for (var e = [], n = 0, i = Math.min(t.length, Is); n < i; n++) e.push(t[n]);
  return e;
}
function nt(t, e, n) {
  var i = {
    touches: At(t.touches).map(function(r) {
      return le(r, n);
    }),
    previousTouches: e.map(function(r) {
      return le(r, n);
    }),
    sigmaDefaultPrevented: !1,
    preventSigmaDefault: function() {
      i.sigmaDefaultPrevented = !0;
    },
    original: t
  };
  return i;
}
function no(t) {
  if (typeof t.deltaY < "u") return t.deltaY * -3 / 360;
  if (typeof t.detail < "u") return t.detail / -9;
  throw new Error("Captor: could not extract delta from event.");
}
var io = /* @__PURE__ */ (function(t) {
  function e(n, i) {
    var r;
    return Y(this, e), r = oe(this, e), r.container = n, r.renderer = i, r;
  }
  return ae(e, t), q(e);
})(ei), Ms = ["doubleClickTimeout", "doubleClickZoomingDuration", "doubleClickZoomingRatio", "dragTimeout", "draggedEventsTolerance", "inertiaDuration", "inertiaRatio", "zoomDuration", "zoomingRatio"], zs = Ms.reduce(function(t, e) {
  return L(L({}, t), {}, w({}, e, ti[e]));
}, {}), Os = /* @__PURE__ */ (function(t) {
  function e(n, i) {
    var r;
    return Y(this, e), r = oe(this, e, [n, i]), w(r, "enabled", !0), w(r, "draggedEvents", 0), w(r, "downStartTime", null), w(r, "lastMouseX", null), w(r, "lastMouseY", null), w(r, "isMouseDown", !1), w(r, "isMoving", !1), w(r, "movingTimeout", null), w(r, "startCameraState", null), w(r, "clicks", 0), w(r, "doubleClickTimeout", null), w(r, "currentWheelDirection", 0), w(r, "settings", zs), r.handleClick = r.handleClick.bind(r), r.handleRightClick = r.handleRightClick.bind(r), r.handleDown = r.handleDown.bind(r), r.handleUp = r.handleUp.bind(r), r.handleMove = r.handleMove.bind(r), r.handleWheel = r.handleWheel.bind(r), r.handleLeave = r.handleLeave.bind(r), r.handleEnter = r.handleEnter.bind(r), n.addEventListener("click", r.handleClick, {
      capture: !1
    }), n.addEventListener("contextmenu", r.handleRightClick, {
      capture: !1
    }), n.addEventListener("mousedown", r.handleDown, {
      capture: !1
    }), n.addEventListener("wheel", r.handleWheel, {
      capture: !1
    }), n.addEventListener("mouseleave", r.handleLeave, {
      capture: !1
    }), n.addEventListener("mouseenter", r.handleEnter, {
      capture: !1
    }), document.addEventListener("mousemove", r.handleMove, {
      capture: !1
    }), document.addEventListener("mouseup", r.handleUp, {
      capture: !1
    }), r;
  }
  return ae(e, t), q(e, [{
    key: "kill",
    value: function() {
      var i = this.container;
      i.removeEventListener("click", this.handleClick), i.removeEventListener("contextmenu", this.handleRightClick), i.removeEventListener("mousedown", this.handleDown), i.removeEventListener("wheel", this.handleWheel), i.removeEventListener("mouseleave", this.handleLeave), i.removeEventListener("mouseenter", this.handleEnter), document.removeEventListener("mousemove", this.handleMove), document.removeEventListener("mouseup", this.handleUp);
    }
  }, {
    key: "handleClick",
    value: function(i) {
      var r = this;
      if (this.enabled) {
        if (this.clicks++, this.clicks === 2)
          return this.clicks = 0, typeof this.doubleClickTimeout == "number" && (clearTimeout(this.doubleClickTimeout), this.doubleClickTimeout = null), this.handleDoubleClick(i);
        setTimeout(function() {
          r.clicks = 0, r.doubleClickTimeout = null;
        }, this.settings.doubleClickTimeout), this.draggedEvents < this.settings.draggedEventsTolerance && this.emit("click", me(i, this.container));
      }
    }
  }, {
    key: "handleRightClick",
    value: function(i) {
      this.enabled && this.emit("rightClick", me(i, this.container));
    }
  }, {
    key: "handleDoubleClick",
    value: function(i) {
      if (this.enabled) {
        i.preventDefault(), i.stopPropagation();
        var r = me(i, this.container);
        if (this.emit("doubleClick", r), !r.sigmaDefaultPrevented) {
          var o = this.renderer.getCamera(), a = o.getBoundedRatio(o.getState().ratio / this.settings.doubleClickZoomingRatio);
          o.animate(this.renderer.getViewportZoomedState(le(i, this.container), a), {
            easing: "quadraticInOut",
            duration: this.settings.doubleClickZoomingDuration
          });
        }
      }
    }
  }, {
    key: "handleDown",
    value: function(i) {
      if (this.enabled) {
        if (i.button === 0) {
          this.startCameraState = this.renderer.getCamera().getState();
          var r = le(i, this.container), o = r.x, a = r.y;
          this.lastMouseX = o, this.lastMouseY = a, this.draggedEvents = 0, this.downStartTime = Date.now(), this.isMouseDown = !0;
        }
        this.emit("mousedown", me(i, this.container));
      }
    }
  }, {
    key: "handleUp",
    value: function(i) {
      var r = this;
      if (!(!this.enabled || !this.isMouseDown)) {
        var o = this.renderer.getCamera();
        this.isMouseDown = !1, typeof this.movingTimeout == "number" && (clearTimeout(this.movingTimeout), this.movingTimeout = null);
        var a = le(i, this.container), s = a.x, u = a.y, d = o.getState(), h = o.getPreviousState() || {
          x: 0,
          y: 0
        };
        this.isMoving ? o.animate({
          x: d.x + this.settings.inertiaRatio * (d.x - h.x),
          y: d.y + this.settings.inertiaRatio * (d.y - h.y)
        }, {
          duration: this.settings.inertiaDuration,
          easing: "quadraticOut"
        }) : (this.lastMouseX !== s || this.lastMouseY !== u) && o.setState({
          x: d.x,
          y: d.y
        }), this.isMoving = !1, setTimeout(function() {
          var l = r.draggedEvents > 0;
          r.draggedEvents = 0, l && r.renderer.getSetting("hideEdgesOnMove") && r.renderer.refresh();
        }, 0), this.emit("mouseup", me(i, this.container));
      }
    }
  }, {
    key: "handleMove",
    value: function(i) {
      var r = this;
      if (this.enabled) {
        var o = me(i, this.container);
        if (this.emit("mousemovebody", o), (i.target === this.container || i.composedPath()[0] === this.container) && this.emit("mousemove", o), !o.sigmaDefaultPrevented && this.isMouseDown) {
          this.isMoving = !0, this.draggedEvents++, typeof this.movingTimeout == "number" && clearTimeout(this.movingTimeout), this.movingTimeout = window.setTimeout(function() {
            r.movingTimeout = null, r.isMoving = !1;
          }, this.settings.dragTimeout);
          var a = this.renderer.getCamera(), s = le(i, this.container), u = s.x, d = s.y, h = this.renderer.viewportToFramedGraph({
            x: this.lastMouseX,
            y: this.lastMouseY
          }), l = this.renderer.viewportToFramedGraph({
            x: u,
            y: d
          }), c = h.x - l.x, f = h.y - l.y, g = a.getState(), v = g.x + c, y = g.y + f;
          a.setState({
            x: v,
            y
          }), this.lastMouseX = u, this.lastMouseY = d, i.preventDefault(), i.stopPropagation();
        }
      }
    }
  }, {
    key: "handleLeave",
    value: function(i) {
      this.emit("mouseleave", me(i, this.container));
    }
  }, {
    key: "handleEnter",
    value: function(i) {
      this.emit("mouseenter", me(i, this.container));
    }
  }, {
    key: "handleWheel",
    value: function(i) {
      var r = this, o = this.renderer.getCamera();
      if (!(!this.enabled || !o.enabledZooming)) {
        var a = no(i);
        if (a) {
          var s = $s(i, this.container);
          if (this.emit("wheel", s), s.sigmaDefaultPrevented) {
            i.preventDefault(), i.stopPropagation();
            return;
          }
          var u = o.getState().ratio, d = a > 0 ? 1 / this.settings.zoomingRatio : this.settings.zoomingRatio, h = o.getBoundedRatio(u * d), l = a > 0 ? 1 : -1, c = Date.now();
          u !== h && (i.preventDefault(), i.stopPropagation(), !(this.currentWheelDirection === l && this.lastWheelTriggerTime && c - this.lastWheelTriggerTime < this.settings.zoomDuration / 5) && (o.animate(this.renderer.getViewportZoomedState(le(i, this.container), h), {
            easing: "quadraticOut",
            duration: this.settings.zoomDuration
          }, function() {
            r.currentWheelDirection = 0;
          }), this.currentWheelDirection = l, this.lastWheelTriggerTime = c));
        }
      }
    }
  }, {
    key: "setSettings",
    value: function(i) {
      this.settings = i;
    }
  }]);
})(io), Us = ["dragTimeout", "inertiaDuration", "inertiaRatio", "doubleClickTimeout", "doubleClickZoomingRatio", "doubleClickZoomingDuration", "tapMoveTolerance"], Bs = Us.reduce(function(t, e) {
  return L(L({}, t), {}, w({}, e, ti[e]));
}, {}), Hs = /* @__PURE__ */ (function(t) {
  function e(n, i) {
    var r;
    return Y(this, e), r = oe(this, e, [n, i]), w(r, "enabled", !0), w(r, "isMoving", !1), w(r, "hasMoved", !1), w(r, "touchMode", 0), w(r, "startTouchesPositions", []), w(r, "lastTouches", []), w(r, "lastTap", null), w(r, "settings", Bs), r.handleStart = r.handleStart.bind(r), r.handleLeave = r.handleLeave.bind(r), r.handleMove = r.handleMove.bind(r), n.addEventListener("touchstart", r.handleStart, {
      capture: !1
    }), n.addEventListener("touchcancel", r.handleLeave, {
      capture: !1
    }), document.addEventListener("touchend", r.handleLeave, {
      capture: !1,
      passive: !1
    }), document.addEventListener("touchmove", r.handleMove, {
      capture: !1,
      passive: !1
    }), r;
  }
  return ae(e, t), q(e, [{
    key: "kill",
    value: function() {
      var i = this.container;
      i.removeEventListener("touchstart", this.handleStart), i.removeEventListener("touchcancel", this.handleLeave), document.removeEventListener("touchend", this.handleLeave), document.removeEventListener("touchmove", this.handleMove);
    }
  }, {
    key: "getDimensions",
    value: function() {
      return {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight
      };
    }
  }, {
    key: "handleStart",
    value: function(i) {
      var r = this;
      if (this.enabled) {
        i.preventDefault();
        var o = At(i.touches);
        if (this.touchMode = o.length, this.startCameraState = this.renderer.getCamera().getState(), this.startTouchesPositions = o.map(function(f) {
          return le(f, r.container);
        }), this.touchMode === 2) {
          var a = Ve(this.startTouchesPositions, 2), s = a[0], u = s.x, d = s.y, h = a[1], l = h.x, c = h.y;
          this.startTouchesAngle = Math.atan2(c - d, l - u), this.startTouchesDistance = Math.sqrt(Math.pow(l - u, 2) + Math.pow(c - d, 2));
        }
        this.emit("touchdown", nt(i, this.lastTouches, this.container)), this.lastTouches = o, this.lastTouchesPositions = this.startTouchesPositions;
      }
    }
  }, {
    key: "handleLeave",
    value: function(i) {
      if (!(!this.enabled || !this.startTouchesPositions.length)) {
        switch (i.cancelable && i.preventDefault(), this.movingTimeout && (this.isMoving = !1, clearTimeout(this.movingTimeout)), this.touchMode) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          case 2:
            if (i.touches.length === 1) {
              this.handleStart(i), i.preventDefault();
              break;
            }
          /* falls through */
          case 1:
            if (this.isMoving) {
              var r = this.renderer.getCamera(), o = r.getState(), a = r.getPreviousState() || {
                x: 0,
                y: 0
              };
              r.animate({
                x: o.x + this.settings.inertiaRatio * (o.x - a.x),
                y: o.y + this.settings.inertiaRatio * (o.y - a.y)
              }, {
                duration: this.settings.inertiaDuration,
                easing: "quadraticOut"
              });
            }
            this.hasMoved = !1, this.isMoving = !1, this.touchMode = 0;
            break;
        }
        if (this.emit("touchup", nt(i, this.lastTouches, this.container)), !i.touches.length) {
          var s = le(this.lastTouches[0], this.container), u = this.startTouchesPositions[0], d = Math.pow(s.x - u.x, 2) + Math.pow(s.y - u.y, 2);
          if (!i.touches.length && d < Math.pow(this.settings.tapMoveTolerance, 2))
            if (this.lastTap && Date.now() - this.lastTap.time < this.settings.doubleClickTimeout) {
              var h = nt(i, this.lastTouches, this.container);
              if (this.emit("doubletap", h), this.lastTap = null, !h.sigmaDefaultPrevented) {
                var l = this.renderer.getCamera(), c = l.getBoundedRatio(l.getState().ratio / this.settings.doubleClickZoomingRatio);
                l.animate(this.renderer.getViewportZoomedState(s, c), {
                  easing: "quadraticInOut",
                  duration: this.settings.doubleClickZoomingDuration
                });
              }
            } else {
              var f = nt(i, this.lastTouches, this.container);
              this.emit("tap", f), this.lastTap = {
                time: Date.now(),
                position: f.touches[0] || f.previousTouches[0]
              };
            }
        }
        this.lastTouches = At(i.touches), this.startTouchesPositions = [];
      }
    }
  }, {
    key: "handleMove",
    value: function(i) {
      var r = this;
      if (!(!this.enabled || !this.startTouchesPositions.length)) {
        i.preventDefault();
        var o = At(i.touches), a = o.map(function(te) {
          return le(te, r.container);
        }), s = this.lastTouches;
        this.lastTouches = o, this.lastTouchesPositions = a;
        var u = nt(i, s, this.container);
        if (this.emit("touchmove", u), !u.sigmaDefaultPrevented && (this.hasMoved || (this.hasMoved = a.some(function(te, ge) {
          var ne = r.startTouchesPositions[ge];
          return ne && (te.x !== ne.x || te.y !== ne.y);
        })), !!this.hasMoved)) {
          this.isMoving = !0, this.movingTimeout && clearTimeout(this.movingTimeout), this.movingTimeout = window.setTimeout(function() {
            r.isMoving = !1;
          }, this.settings.dragTimeout);
          var d = this.renderer.getCamera(), h = this.startCameraState, l = this.renderer.getSetting("stagePadding");
          switch (this.touchMode) {
            case 1: {
              var c = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]), f = c.x, g = c.y, v = this.renderer.viewportToFramedGraph(a[0]), y = v.x, x = v.y;
              d.setState({
                x: h.x + f - y,
                y: h.y + g - x
              });
              break;
            }
            case 2: {
              var _ = {
                x: 0.5,
                y: 0.5,
                angle: 0,
                ratio: 1
              }, S = a[0], p = S.x, m = S.y, b = a[1], E = b.x, A = b.y, R = Math.atan2(A - m, E - p) - this.startTouchesAngle, N = Math.hypot(A - m, E - p) / this.startTouchesDistance, P = d.getBoundedRatio(h.ratio / N);
              _.ratio = P, _.angle = h.angle + R;
              var I = this.getDimensions(), H = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], {
                cameraState: h
              }), z = Math.min(I.width, I.height) - 2 * l, Z = z / I.width, ee = z / I.height, De = P / z, pe = p - z / 2 / Z, ce = m - z / 2 / ee, se = [pe * Math.cos(-_.angle) - ce * Math.sin(-_.angle), ce * Math.cos(-_.angle) + pe * Math.sin(-_.angle)];
              pe = se[0], ce = se[1], _.x = H.x - pe * De, _.y = H.y + ce * De, d.setState(_);
              break;
            }
          }
        }
      }
    }
  }, {
    key: "setSettings",
    value: function(i) {
      this.settings = i;
    }
  }]);
})(io);
function Ws(t) {
  if (Array.isArray(t)) return Ln(t);
}
function js(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function Vs() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ji(t) {
  return Ws(t) || js(t) || Or(t) || Vs();
}
function Ys(t, e) {
  if (t == null) return {};
  var n = {};
  for (var i in t) if ({}.hasOwnProperty.call(t, i)) {
    if (e.indexOf(i) !== -1) continue;
    n[i] = t[i];
  }
  return n;
}
function vn(t, e) {
  if (t == null) return {};
  var n, i, r = Ys(t, e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++) n = o[i], e.indexOf(n) === -1 && {}.propertyIsEnumerable.call(t, n) && (r[n] = t[n]);
  }
  return r;
}
var Vi = /* @__PURE__ */ (function() {
  function t(e, n) {
    Y(this, t), this.key = e, this.size = n;
  }
  return q(t, null, [{
    key: "compare",
    value: function(n, i) {
      return n.size > i.size ? -1 : n.size < i.size || n.key > i.key ? 1 : -1;
    }
  }]);
})(), Yi = /* @__PURE__ */ (function() {
  function t() {
    Y(this, t), w(this, "width", 0), w(this, "height", 0), w(this, "cellSize", 0), w(this, "columns", 0), w(this, "rows", 0), w(this, "cells", {});
  }
  return q(t, [{
    key: "resizeAndClear",
    value: function(n, i) {
      this.width = n.width, this.height = n.height, this.cellSize = i, this.columns = Math.ceil(n.width / i), this.rows = Math.ceil(n.height / i), this.cells = {};
    }
  }, {
    key: "getIndex",
    value: function(n) {
      var i = Math.floor(n.x / this.cellSize), r = Math.floor(n.y / this.cellSize);
      return r * this.columns + i;
    }
  }, {
    key: "add",
    value: function(n, i, r) {
      var o = new Vi(n, i), a = this.getIndex(r), s = this.cells[a];
      s || (s = [], this.cells[a] = s), s.push(o);
    }
  }, {
    key: "organize",
    value: function() {
      for (var n in this.cells) {
        var i = this.cells[n];
        i.sort(Vi.compare);
      }
    }
  }, {
    key: "getLabelsToDisplay",
    value: function(n, i) {
      var r = this.cellSize * this.cellSize, o = r / n / n, a = o * i / r, s = Math.ceil(a), u = [];
      for (var d in this.cells)
        for (var h = this.cells[d], l = 0; l < Math.min(s, h.length); l++)
          u.push(h[l].key);
      return u;
    }
  }]);
})();
function qs(t) {
  var e = t.graph, n = t.hoveredNode, i = t.highlightedNodes, r = t.displayedNodeLabels, o = [];
  return e.forEachEdge(function(a, s, u, d) {
    (u === n || d === n || i.has(u) || i.has(d) || r.has(u) && r.has(d)) && o.push(a);
  }), o;
}
var qi = 150, Ki = 50, ye = Object.prototype.hasOwnProperty;
function Ks(t, e, n) {
  if (!ye.call(n, "x") || !ye.call(n, "y")) throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(e, '". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?'));
  return n.color || (n.color = t.defaultNodeColor), !n.label && n.label !== "" && (n.label = null), n.label !== void 0 && n.label !== null ? n.label = "" + n.label : n.label = null, n.size || (n.size = 2), ye.call(n, "hidden") || (n.hidden = !1), ye.call(n, "highlighted") || (n.highlighted = !1), ye.call(n, "forceLabel") || (n.forceLabel = !1), (!n.type || n.type === "") && (n.type = t.defaultNodeType), n.zIndex || (n.zIndex = 0), n;
}
function Xs(t, e, n) {
  return n.color || (n.color = t.defaultEdgeColor), n.label || (n.label = ""), n.size || (n.size = 0.5), ye.call(n, "hidden") || (n.hidden = !1), ye.call(n, "forceLabel") || (n.forceLabel = !1), (!n.type || n.type === "") && (n.type = t.defaultEdgeType), n.zIndex || (n.zIndex = 0), n;
}
var Zs = /* @__PURE__ */ (function(t) {
  function e(n, i) {
    var r, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (Y(this, e), r = oe(this, e), w(r, "elements", {}), w(r, "canvasContexts", {}), w(r, "webGLContexts", {}), w(r, "pickingLayers", /* @__PURE__ */ new Set()), w(r, "textures", {}), w(r, "frameBuffers", {}), w(r, "activeListeners", {}), w(r, "labelGrid", new Yi()), w(r, "nodeDataCache", {}), w(r, "edgeDataCache", {}), w(r, "nodeProgramIndex", {}), w(r, "edgeProgramIndex", {}), w(r, "nodesWithForcedLabels", /* @__PURE__ */ new Set()), w(r, "edgesWithForcedLabels", /* @__PURE__ */ new Set()), w(r, "nodeExtent", {
      x: [0, 1],
      y: [0, 1]
    }), w(r, "nodeZExtent", [1 / 0, -1 / 0]), w(r, "edgeZExtent", [1 / 0, -1 / 0]), w(r, "matrix", de()), w(r, "invMatrix", de()), w(r, "correctionRatio", 1), w(r, "customBBox", null), w(r, "normalizationFunction", Bi({
      x: [0, 1],
      y: [0, 1]
    })), w(r, "graphToViewportRatio", 1), w(r, "itemIDsIndex", {}), w(r, "nodeIndices", {}), w(r, "edgeIndices", {}), w(r, "width", 0), w(r, "height", 0), w(r, "pixelRatio", Oi()), w(r, "pickingDownSizingRatio", 2 * r.pixelRatio), w(r, "displayedNodeLabels", /* @__PURE__ */ new Set()), w(r, "displayedEdgeLabels", /* @__PURE__ */ new Set()), w(r, "highlightedNodes", /* @__PURE__ */ new Set()), w(r, "hoveredNode", null), w(r, "hoveredEdge", null), w(r, "renderFrame", null), w(r, "renderHighlightedNodesFrame", null), w(r, "needToProcess", !1), w(r, "checkEdgesEventsFrame", null), w(r, "nodePrograms", {}), w(r, "nodeHoverPrograms", {}), w(r, "edgePrograms", {}), r.settings = Fs(o), gn(r.settings), Ns(n), !(i instanceof HTMLElement)) throw new Error("Sigma: container should be an html element.");
    r.graph = n, r.container = i, r.createWebGLContext("edges", {
      picking: o.enableEdgeEvents
    }), r.createCanvasContext("edgeLabels"), r.createWebGLContext("nodes", {
      picking: !0
    }), r.createCanvasContext("labels"), r.createCanvasContext("hovers"), r.createWebGLContext("hoverNodes"), r.createCanvasContext("mouse", {
      style: {
        touchAction: "none",
        userSelect: "none"
      }
    }), r.resize();
    for (var a in r.settings.nodeProgramClasses)
      r.registerNodeProgram(a, r.settings.nodeProgramClasses[a], r.settings.nodeHoverProgramClasses[a]);
    for (var s in r.settings.edgeProgramClasses)
      r.registerEdgeProgram(s, r.settings.edgeProgramClasses[s]);
    return r.camera = new Wi(), r.bindCameraHandlers(), r.mouseCaptor = new Os(r.elements.mouse, r), r.mouseCaptor.setSettings(r.settings), r.touchCaptor = new Hs(r.elements.mouse, r), r.touchCaptor.setSettings(r.settings), r.bindEventHandlers(), r.bindGraphHandlers(), r.handleSettingsUpdate(), r.refresh(), r;
  }
  return ae(e, t), q(e, [{
    key: "registerNodeProgram",
    value: function(i, r, o) {
      return this.nodePrograms[i] && this.nodePrograms[i].kill(), this.nodeHoverPrograms[i] && this.nodeHoverPrograms[i].kill(), this.nodePrograms[i] = new r(this.webGLContexts.nodes, this.frameBuffers.nodes, this), this.nodeHoverPrograms[i] = new (o || r)(this.webGLContexts.hoverNodes, null, this), this;
    }
    /**
     * Internal function used to register an edge program
     *
     * @param  {string}          key              - The program's key, matching the related edges "type" values.
     * @param  {EdgeProgramType} EdgeProgramClass - An edges program class.
     * @return {Sigma}
     */
  }, {
    key: "registerEdgeProgram",
    value: function(i, r) {
      return this.edgePrograms[i] && this.edgePrograms[i].kill(), this.edgePrograms[i] = new r(this.webGLContexts.edges, this.frameBuffers.edges, this), this;
    }
    /**
     * Internal function used to unregister a node program
     *
     * @param  {string} key - The program's key, matching the related nodes "type" values.
     * @return {Sigma}
     */
  }, {
    key: "unregisterNodeProgram",
    value: function(i) {
      if (this.nodePrograms[i]) {
        var r = this.nodePrograms, o = r[i], a = vn(r, [i].map(dt));
        o.kill(), this.nodePrograms = a;
      }
      if (this.nodeHoverPrograms[i]) {
        var s = this.nodeHoverPrograms, u = s[i], d = vn(s, [i].map(dt));
        u.kill(), this.nodePrograms = d;
      }
      return this;
    }
    /**
     * Internal function used to unregister an edge program
     *
     * @param  {string} key - The program's key, matching the related edges "type" values.
     * @return {Sigma}
     */
  }, {
    key: "unregisterEdgeProgram",
    value: function(i) {
      if (this.edgePrograms[i]) {
        var r = this.edgePrograms, o = r[i], a = vn(r, [i].map(dt));
        o.kill(), this.edgePrograms = a;
      }
      return this;
    }
    /**
     * Method (re)binding WebGL texture (for picking).
     *
     * @return {Sigma}
     */
  }, {
    key: "resetWebGLTexture",
    value: function(i) {
      var r = this.webGLContexts[i], o = this.frameBuffers[i], a = this.textures[i];
      a && r.deleteTexture(a);
      var s = r.createTexture();
      return r.bindFramebuffer(r.FRAMEBUFFER, o), r.bindTexture(r.TEXTURE_2D, s), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, this.width, this.height, 0, r.RGBA, r.UNSIGNED_BYTE, null), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, s, 0), this.textures[i] = s, this;
    }
    /**
     * Method binding camera handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "bindCameraHandlers",
    value: function() {
      var i = this;
      return this.activeListeners.camera = function() {
        i.scheduleRender();
      }, this.camera.on("updated", this.activeListeners.camera), this;
    }
    /**
     * Method unbinding camera handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "unbindCameraHandlers",
    value: function() {
      return this.camera.removeListener("updated", this.activeListeners.camera), this;
    }
    /**
     * Method that returns the closest node to a given position.
     */
  }, {
    key: "getNodeAtPosition",
    value: function(i) {
      var r = i.x, o = i.y, a = Ai(this.webGLContexts.nodes, this.frameBuffers.nodes, r, o, this.pixelRatio, this.pickingDownSizingRatio), s = Ci.apply(void 0, ji(a)), u = this.itemIDsIndex[s];
      return u && u.type === "node" ? u.id : null;
    }
    /**
     * Method binding event handlers.
     *
     * @return {Sigma}
     */
  }, {
    key: "bindEventHandlers",
    value: function() {
      var i = this;
      this.activeListeners.handleResize = function() {
        i.scheduleRefresh();
      }, window.addEventListener("resize", this.activeListeners.handleResize), this.activeListeners.handleMove = function(o) {
        var a = tt(o), s = {
          event: a,
          preventSigmaDefault: function() {
            a.preventSigmaDefault();
          }
        }, u = i.getNodeAtPosition(a);
        if (u && i.hoveredNode !== u && !i.nodeDataCache[u].hidden) {
          i.hoveredNode && i.emit("leaveNode", L(L({}, s), {}, {
            node: i.hoveredNode
          })), i.hoveredNode = u, i.emit("enterNode", L(L({}, s), {}, {
            node: u
          })), i.scheduleHighlightedNodesRender();
          return;
        }
        if (i.hoveredNode && i.getNodeAtPosition(a) !== i.hoveredNode) {
          var d = i.hoveredNode;
          i.hoveredNode = null, i.emit("leaveNode", L(L({}, s), {}, {
            node: d
          })), i.scheduleHighlightedNodesRender();
          return;
        }
        if (i.settings.enableEdgeEvents) {
          var h = i.hoveredNode ? null : i.getEdgeAtPoint(s.event.x, s.event.y);
          h !== i.hoveredEdge && (i.hoveredEdge && i.emit("leaveEdge", L(L({}, s), {}, {
            edge: i.hoveredEdge
          })), h && i.emit("enterEdge", L(L({}, s), {}, {
            edge: h
          })), i.hoveredEdge = h);
        }
      }, this.activeListeners.handleMoveBody = function(o) {
        var a = tt(o);
        i.emit("moveBody", {
          event: a,
          preventSigmaDefault: function() {
            a.preventSigmaDefault();
          }
        });
      }, this.activeListeners.handleLeave = function(o) {
        var a = tt(o), s = {
          event: a,
          preventSigmaDefault: function() {
            a.preventSigmaDefault();
          }
        };
        i.hoveredNode && (i.emit("leaveNode", L(L({}, s), {}, {
          node: i.hoveredNode
        })), i.scheduleHighlightedNodesRender()), i.settings.enableEdgeEvents && i.hoveredEdge && (i.emit("leaveEdge", L(L({}, s), {}, {
          edge: i.hoveredEdge
        })), i.scheduleHighlightedNodesRender()), i.emit("leaveStage", L({}, s));
      }, this.activeListeners.handleEnter = function(o) {
        var a = tt(o), s = {
          event: a,
          preventSigmaDefault: function() {
            a.preventSigmaDefault();
          }
        };
        i.emit("enterStage", L({}, s));
      };
      var r = function(a) {
        return function(s) {
          var u = tt(s), d = {
            event: u,
            preventSigmaDefault: function() {
              u.preventSigmaDefault();
            }
          }, h = i.getNodeAtPosition(u);
          if (h) return i.emit("".concat(a, "Node"), L(L({}, d), {}, {
            node: h
          }));
          if (i.settings.enableEdgeEvents) {
            var l = i.getEdgeAtPoint(u.x, u.y);
            if (l) return i.emit("".concat(a, "Edge"), L(L({}, d), {}, {
              edge: l
            }));
          }
          return i.emit("".concat(a, "Stage"), d);
        };
      };
      return this.activeListeners.handleClick = r("click"), this.activeListeners.handleRightClick = r("rightClick"), this.activeListeners.handleDoubleClick = r("doubleClick"), this.activeListeners.handleWheel = r("wheel"), this.activeListeners.handleDown = r("down"), this.activeListeners.handleUp = r("up"), this.mouseCaptor.on("mousemove", this.activeListeners.handleMove), this.mouseCaptor.on("mousemovebody", this.activeListeners.handleMoveBody), this.mouseCaptor.on("click", this.activeListeners.handleClick), this.mouseCaptor.on("rightClick", this.activeListeners.handleRightClick), this.mouseCaptor.on("doubleClick", this.activeListeners.handleDoubleClick), this.mouseCaptor.on("wheel", this.activeListeners.handleWheel), this.mouseCaptor.on("mousedown", this.activeListeners.handleDown), this.mouseCaptor.on("mouseup", this.activeListeners.handleUp), this.mouseCaptor.on("mouseleave", this.activeListeners.handleLeave), this.mouseCaptor.on("mouseenter", this.activeListeners.handleEnter), this.touchCaptor.on("touchdown", this.activeListeners.handleDown), this.touchCaptor.on("touchdown", this.activeListeners.handleMove), this.touchCaptor.on("touchup", this.activeListeners.handleUp), this.touchCaptor.on("touchmove", this.activeListeners.handleMove), this.touchCaptor.on("tap", this.activeListeners.handleClick), this.touchCaptor.on("doubletap", this.activeListeners.handleDoubleClick), this.touchCaptor.on("touchmove", this.activeListeners.handleMoveBody), this;
    }
    /**
     * Method binding graph handlers
     *
     * @return {Sigma}
     */
  }, {
    key: "bindGraphHandlers",
    value: function() {
      var i = this, r = this.graph, o = /* @__PURE__ */ new Set(["x", "y", "zIndex", "type"]);
      return this.activeListeners.eachNodeAttributesUpdatedGraphUpdate = function(a) {
        var s, u = (s = a.hints) === null || s === void 0 ? void 0 : s.attributes;
        i.graph.forEachNode(function(h) {
          return i.updateNode(h);
        });
        var d = !u || u.some(function(h) {
          return o.has(h);
        });
        i.refresh({
          partialGraph: {
            nodes: r.nodes()
          },
          skipIndexation: !d,
          schedule: !0
        });
      }, this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate = function(a) {
        var s, u = (s = a.hints) === null || s === void 0 ? void 0 : s.attributes;
        i.graph.forEachEdge(function(h) {
          return i.updateEdge(h);
        });
        var d = u && ["zIndex", "type"].some(function(h) {
          return u == null ? void 0 : u.includes(h);
        });
        i.refresh({
          partialGraph: {
            edges: r.edges()
          },
          skipIndexation: !d,
          schedule: !0
        });
      }, this.activeListeners.addNodeGraphUpdate = function(a) {
        var s = a.key;
        i.addNode(s), i.refresh({
          partialGraph: {
            nodes: [s]
          },
          skipIndexation: !1,
          schedule: !0
        });
      }, this.activeListeners.updateNodeGraphUpdate = function(a) {
        var s = a.key;
        i.refresh({
          partialGraph: {
            nodes: [s]
          },
          skipIndexation: !1,
          schedule: !0
        });
      }, this.activeListeners.dropNodeGraphUpdate = function(a) {
        var s = a.key;
        i.removeNode(s), i.refresh({
          schedule: !0
        });
      }, this.activeListeners.addEdgeGraphUpdate = function(a) {
        var s = a.key;
        i.addEdge(s), i.refresh({
          partialGraph: {
            edges: [s]
          },
          schedule: !0
        });
      }, this.activeListeners.updateEdgeGraphUpdate = function(a) {
        var s = a.key;
        i.refresh({
          partialGraph: {
            edges: [s]
          },
          skipIndexation: !1,
          schedule: !0
        });
      }, this.activeListeners.dropEdgeGraphUpdate = function(a) {
        var s = a.key;
        i.removeEdge(s), i.refresh({
          schedule: !0
        });
      }, this.activeListeners.clearEdgesGraphUpdate = function() {
        i.clearEdgeState(), i.clearEdgeIndices(), i.refresh({
          schedule: !0
        });
      }, this.activeListeners.clearGraphUpdate = function() {
        i.clearEdgeState(), i.clearNodeState(), i.clearEdgeIndices(), i.clearNodeIndices(), i.refresh({
          schedule: !0
        });
      }, r.on("nodeAdded", this.activeListeners.addNodeGraphUpdate), r.on("nodeDropped", this.activeListeners.dropNodeGraphUpdate), r.on("nodeAttributesUpdated", this.activeListeners.updateNodeGraphUpdate), r.on("eachNodeAttributesUpdated", this.activeListeners.eachNodeAttributesUpdatedGraphUpdate), r.on("edgeAdded", this.activeListeners.addEdgeGraphUpdate), r.on("edgeDropped", this.activeListeners.dropEdgeGraphUpdate), r.on("edgeAttributesUpdated", this.activeListeners.updateEdgeGraphUpdate), r.on("eachEdgeAttributesUpdated", this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate), r.on("edgesCleared", this.activeListeners.clearEdgesGraphUpdate), r.on("cleared", this.activeListeners.clearGraphUpdate), this;
    }
    /**
     * Method used to unbind handlers from the graph.
     *
     * @return {undefined}
     */
  }, {
    key: "unbindGraphHandlers",
    value: function() {
      var i = this.graph;
      i.removeListener("nodeAdded", this.activeListeners.addNodeGraphUpdate), i.removeListener("nodeDropped", this.activeListeners.dropNodeGraphUpdate), i.removeListener("nodeAttributesUpdated", this.activeListeners.updateNodeGraphUpdate), i.removeListener("eachNodeAttributesUpdated", this.activeListeners.eachNodeAttributesUpdatedGraphUpdate), i.removeListener("edgeAdded", this.activeListeners.addEdgeGraphUpdate), i.removeListener("edgeDropped", this.activeListeners.dropEdgeGraphUpdate), i.removeListener("edgeAttributesUpdated", this.activeListeners.updateEdgeGraphUpdate), i.removeListener("eachEdgeAttributesUpdated", this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate), i.removeListener("edgesCleared", this.activeListeners.clearEdgesGraphUpdate), i.removeListener("cleared", this.activeListeners.clearGraphUpdate);
    }
    /**
     * Method looking for an edge colliding with a given point at (x, y). Returns
     * the key of the edge if any, or null else.
     */
  }, {
    key: "getEdgeAtPoint",
    value: function(i, r) {
      var o = Ai(this.webGLContexts.edges, this.frameBuffers.edges, i, r, this.pixelRatio, this.pickingDownSizingRatio), a = Ci.apply(void 0, ji(o)), s = this.itemIDsIndex[a];
      return s && s.type === "edge" ? s.id : null;
    }
    /**
     * Method used to process the whole graph's data.
     *  - extent
     *  - normalizationFunction
     *  - compute node's coordinate
     *  - labelgrid
     *  - program data allocation
     * @return {Sigma}
     */
  }, {
    key: "process",
    value: function() {
      var i = this;
      this.emit("beforeProcess");
      var r = this.graph, o = this.settings, a = this.getDimensions();
      if (this.nodeExtent = Ls(this.graph), !this.settings.autoRescale) {
        var s = a.width, u = a.height, d = this.nodeExtent, h = d.x, l = d.y;
        this.nodeExtent = {
          x: [(h[0] + h[1]) / 2 - s / 2, (h[0] + h[1]) / 2 + s / 2],
          y: [(l[0] + l[1]) / 2 - u / 2, (l[0] + l[1]) / 2 + u / 2]
        };
      }
      this.normalizationFunction = Bi(this.customBBox || this.nodeExtent);
      var c = new Wi(), f = et(c.getState(), a, this.getGraphDimensions(), this.getStagePadding());
      this.labelGrid.resizeAndClear(a, o.labelGridCellSize);
      for (var g = {}, v = {}, y = {}, x = {}, _ = 1, S = r.nodes(), p = 0, m = S.length; p < m; p++) {
        var b = S[p], E = this.nodeDataCache[b], A = r.getNodeAttributes(b);
        E.x = A.x, E.y = A.y, this.normalizationFunction.applyTo(E), typeof E.label == "string" && !E.hidden && this.labelGrid.add(b, E.size, this.framedGraphToViewport(E, {
          matrix: f
        })), g[E.type] = (g[E.type] || 0) + 1;
      }
      this.labelGrid.organize();
      for (var R in this.nodePrograms) {
        if (!ye.call(this.nodePrograms, R))
          throw new Error('Sigma: could not find a suitable program for node type "'.concat(R, '"!'));
        this.nodePrograms[R].reallocate(g[R] || 0), g[R] = 0;
      }
      this.settings.zIndex && this.nodeZExtent[0] !== this.nodeZExtent[1] && (S = Ui(this.nodeZExtent, function(Ge) {
        return i.nodeDataCache[Ge].zIndex;
      }, S));
      for (var N = 0, P = S.length; N < P; N++) {
        var I = S[N];
        v[I] = _, x[v[I]] = {
          type: "node",
          id: I
        }, _++;
        var H = this.nodeDataCache[I];
        this.addNodeToProgram(I, v[I], g[H.type]++);
      }
      for (var z = {}, Z = r.edges(), ee = 0, De = Z.length; ee < De; ee++) {
        var pe = Z[ee], ce = this.edgeDataCache[pe];
        z[ce.type] = (z[ce.type] || 0) + 1;
      }
      this.settings.zIndex && this.edgeZExtent[0] !== this.edgeZExtent[1] && (Z = Ui(this.edgeZExtent, function(Ge) {
        return i.edgeDataCache[Ge].zIndex;
      }, Z));
      for (var se in this.edgePrograms) {
        if (!ye.call(this.edgePrograms, se))
          throw new Error('Sigma: could not find a suitable program for edge type "'.concat(se, '"!'));
        this.edgePrograms[se].reallocate(z[se] || 0), z[se] = 0;
      }
      for (var te = 0, ge = Z.length; te < ge; te++) {
        var ne = Z[te];
        y[ne] = _, x[y[ne]] = {
          type: "edge",
          id: ne
        }, _++;
        var ft = this.edgeDataCache[ne];
        this.addEdgeToProgram(ne, y[ne], z[ft.type]++);
      }
      return this.itemIDsIndex = x, this.nodeIndices = v, this.edgeIndices = y, this.emit("afterProcess"), this;
    }
    /**
     * Method that backports potential settings updates where it's needed.
     * @private
     */
  }, {
    key: "handleSettingsUpdate",
    value: function(i) {
      var r = this, o = this.settings;
      if (this.camera.minRatio = o.minCameraRatio, this.camera.maxRatio = o.maxCameraRatio, this.camera.enabledZooming = o.enableCameraZooming, this.camera.enabledPanning = o.enableCameraPanning, this.camera.enabledRotation = o.enableCameraRotation, o.cameraPanBoundaries ? this.camera.clean = function(h) {
        return r.cleanCameraState(h, o.cameraPanBoundaries && Gn(o.cameraPanBoundaries) === "object" ? o.cameraPanBoundaries : {});
      } : this.camera.clean = null, this.camera.setState(this.camera.validateState(this.camera.getState())), i) {
        if (i.edgeProgramClasses !== o.edgeProgramClasses) {
          for (var a in o.edgeProgramClasses)
            o.edgeProgramClasses[a] !== i.edgeProgramClasses[a] && this.registerEdgeProgram(a, o.edgeProgramClasses[a]);
          for (var s in i.edgeProgramClasses)
            o.edgeProgramClasses[s] || this.unregisterEdgeProgram(s);
        }
        if (i.nodeProgramClasses !== o.nodeProgramClasses || i.nodeHoverProgramClasses !== o.nodeHoverProgramClasses) {
          for (var u in o.nodeProgramClasses)
            (o.nodeProgramClasses[u] !== i.nodeProgramClasses[u] || o.nodeHoverProgramClasses[u] !== i.nodeHoverProgramClasses[u]) && this.registerNodeProgram(u, o.nodeProgramClasses[u], o.nodeHoverProgramClasses[u]);
          for (var d in i.nodeProgramClasses)
            o.nodeProgramClasses[d] || this.unregisterNodeProgram(d);
        }
      }
      return this.mouseCaptor.setSettings(this.settings), this.touchCaptor.setSettings(this.settings), this;
    }
  }, {
    key: "cleanCameraState",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = r.tolerance, a = o === void 0 ? 0 : o, s = r.boundaries, u = L({}, i), d = s || this.nodeExtent, h = Ve(d.x, 2), l = h[0], c = h[1], f = Ve(d.y, 2), g = f[0], v = f[1], y = [this.graphToViewport({
        x: l,
        y: g
      }, {
        cameraState: i
      }), this.graphToViewport({
        x: c,
        y: g
      }, {
        cameraState: i
      }), this.graphToViewport({
        x: l,
        y: v
      }, {
        cameraState: i
      }), this.graphToViewport({
        x: c,
        y: v
      }, {
        cameraState: i
      })], x = 1 / 0, _ = -1 / 0, S = 1 / 0, p = -1 / 0;
      y.forEach(function(z) {
        var Z = z.x, ee = z.y;
        x = Math.min(x, Z), _ = Math.max(_, Z), S = Math.min(S, ee), p = Math.max(p, ee);
      });
      var m = _ - x, b = p - S, E = this.getDimensions(), A = E.width, R = E.height, N = 0, P = 0;
      if (m >= A ? _ < A - a ? N = _ - (A - a) : x > a && (N = x - a) : _ > A + a ? N = _ - (A + a) : x < -a && (N = x + a), b >= R ? p < R - a ? P = p - (R - a) : S > a && (P = S - a) : p > R + a ? P = p - (R + a) : S < -a && (P = S + a), N || P) {
        var I = this.viewportToFramedGraph({
          x: 0,
          y: 0
        }, {
          cameraState: i
        }), H = this.viewportToFramedGraph({
          x: N,
          y: P
        }, {
          cameraState: i
        });
        N = H.x - I.x, P = H.y - I.y, u.x += N, u.y += P;
      }
      return u;
    }
    /**
     * Method used to render labels.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderLabels",
    value: function() {
      if (!this.settings.renderLabels) return this;
      var i = this.camera.getState(), r = this.labelGrid.getLabelsToDisplay(i.ratio, this.settings.labelDensity);
      Hi(r, this.nodesWithForcedLabels), this.displayedNodeLabels = /* @__PURE__ */ new Set();
      for (var o = this.canvasContexts.labels, a = 0, s = r.length; a < s; a++) {
        var u = r[a], d = this.nodeDataCache[u];
        if (!this.displayedNodeLabels.has(u) && !d.hidden) {
          var h = this.framedGraphToViewport(d), l = h.x, c = h.y, f = this.scaleSize(d.size);
          if (!(!d.forceLabel && f < this.settings.labelRenderedSizeThreshold) && !(l < -qi || l > this.width + qi || c < -Ki || c > this.height + Ki)) {
            this.displayedNodeLabels.add(u);
            var g = this.settings.defaultDrawNodeLabel, v = this.nodePrograms[d.type], y = (v == null ? void 0 : v.drawLabel) || g;
            y(o, L(L({
              key: u
            }, d), {}, {
              size: f,
              x: l,
              y: c
            }), this.settings);
          }
        }
      }
      return this;
    }
    /**
     * Method used to render edge labels, based on which node labels were
     * rendered.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderEdgeLabels",
    value: function() {
      if (!this.settings.renderEdgeLabels) return this;
      var i = this.canvasContexts.edgeLabels;
      i.clearRect(0, 0, this.width, this.height);
      var r = qs({
        graph: this.graph,
        hoveredNode: this.hoveredNode,
        displayedNodeLabels: this.displayedNodeLabels,
        highlightedNodes: this.highlightedNodes
      });
      Hi(r, this.edgesWithForcedLabels);
      for (var o = /* @__PURE__ */ new Set(), a = 0, s = r.length; a < s; a++) {
        var u = r[a], d = this.graph.extremities(u), h = this.nodeDataCache[d[0]], l = this.nodeDataCache[d[1]], c = this.edgeDataCache[u];
        if (!o.has(u) && !(c.hidden || h.hidden || l.hidden)) {
          var f = this.settings.defaultDrawEdgeLabel, g = this.edgePrograms[c.type], v = (g == null ? void 0 : g.drawLabel) || f;
          v(i, L(L({
            key: u
          }, c), {}, {
            size: this.scaleSize(c.size)
          }), L(L(L({
            key: d[0]
          }, h), this.framedGraphToViewport(h)), {}, {
            size: this.scaleSize(h.size)
          }), L(L(L({
            key: d[1]
          }, l), this.framedGraphToViewport(l)), {}, {
            size: this.scaleSize(l.size)
          }), this.settings), o.add(u);
        }
      }
      return this.displayedEdgeLabels = o, this;
    }
    /**
     * Method used to render the highlighted nodes.
     *
     * @return {Sigma}
     */
  }, {
    key: "renderHighlightedNodes",
    value: function() {
      var i = this, r = this.canvasContexts.hovers;
      r.clearRect(0, 0, this.width, this.height);
      var o = function(f) {
        var g = i.nodeDataCache[f], v = i.framedGraphToViewport(g), y = v.x, x = v.y, _ = i.scaleSize(g.size), S = i.settings.defaultDrawNodeHover, p = i.nodePrograms[g.type], m = (p == null ? void 0 : p.drawHover) || S;
        m(r, L(L({
          key: f
        }, g), {}, {
          size: _,
          x: y,
          y: x
        }), i.settings);
      }, a = [];
      this.hoveredNode && !this.nodeDataCache[this.hoveredNode].hidden && a.push(this.hoveredNode), this.highlightedNodes.forEach(function(c) {
        c !== i.hoveredNode && a.push(c);
      }), a.forEach(function(c) {
        return o(c);
      });
      var s = {};
      a.forEach(function(c) {
        var f = i.nodeDataCache[c].type;
        s[f] = (s[f] || 0) + 1;
      });
      for (var u in this.nodeHoverPrograms)
        this.nodeHoverPrograms[u].reallocate(s[u] || 0), s[u] = 0;
      a.forEach(function(c) {
        var f = i.nodeDataCache[c];
        i.nodeHoverPrograms[f.type].process(0, s[f.type]++, f);
      }), this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
      var d = this.getRenderParams();
      for (var h in this.nodeHoverPrograms) {
        var l = this.nodeHoverPrograms[h];
        l.render(d);
      }
    }
    /**
     * Method used to schedule a hover render.
     *
     */
  }, {
    key: "scheduleHighlightedNodesRender",
    value: function() {
      var i = this;
      this.renderHighlightedNodesFrame || this.renderFrame || (this.renderHighlightedNodesFrame = requestAnimationFrame(function() {
        i.renderHighlightedNodesFrame = null, i.renderHighlightedNodes(), i.renderEdgeLabels();
      }));
    }
    /**
     * Method used to render.
     *
     * @return {Sigma}
     */
  }, {
    key: "render",
    value: function() {
      var i = this;
      this.emit("beforeRender");
      var r = function() {
        return i.emit("afterRender"), i;
      };
      if (this.renderFrame && (cancelAnimationFrame(this.renderFrame), this.renderFrame = null), this.resize(), this.needToProcess && this.process(), this.needToProcess = !1, this.clear(), this.pickingLayers.forEach(function(y) {
        return i.resetWebGLTexture(y);
      }), !this.graph.order) return r();
      var o = this.mouseCaptor, a = this.camera.isAnimated() || o.isMoving || o.draggedEvents || o.currentWheelDirection, s = this.camera.getState(), u = this.getDimensions(), d = this.getGraphDimensions(), h = this.getStagePadding();
      this.matrix = et(s, u, d, h), this.invMatrix = et(s, u, d, h, !0), this.correctionRatio = Rs(this.matrix, s, u), this.graphToViewportRatio = this.getGraphToViewportRatio();
      var l = this.getRenderParams();
      for (var c in this.nodePrograms) {
        var f = this.nodePrograms[c];
        f.render(l);
      }
      if (!this.settings.hideEdgesOnMove || !a)
        for (var g in this.edgePrograms) {
          var v = this.edgePrograms[g];
          v.render(l);
        }
      return this.settings.hideLabelsOnMove && a || (this.renderLabels(), this.renderEdgeLabels(), this.renderHighlightedNodes()), r();
    }
    /**
     * Add a node in the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "addNode",
    value: function(i) {
      var r = Object.assign({}, this.graph.getNodeAttributes(i));
      this.settings.nodeReducer && (r = this.settings.nodeReducer(i, r));
      var o = Ks(this.settings, i, r);
      this.nodeDataCache[i] = o, this.nodesWithForcedLabels.delete(i), o.forceLabel && !o.hidden && this.nodesWithForcedLabels.add(i), this.highlightedNodes.delete(i), o.highlighted && !o.hidden && this.highlightedNodes.add(i), this.settings.zIndex && (o.zIndex < this.nodeZExtent[0] && (this.nodeZExtent[0] = o.zIndex), o.zIndex > this.nodeZExtent[1] && (this.nodeZExtent[1] = o.zIndex));
    }
    /**
     * Update a node the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "updateNode",
    value: function(i) {
      this.addNode(i);
      var r = this.nodeDataCache[i];
      this.normalizationFunction.applyTo(r);
    }
    /**
     * Remove a node from the internal data structures.
     * @private
     * @param key The node's graphology ID
     */
  }, {
    key: "removeNode",
    value: function(i) {
      delete this.nodeDataCache[i], delete this.nodeProgramIndex[i], this.highlightedNodes.delete(i), this.hoveredNode === i && (this.hoveredNode = null), this.nodesWithForcedLabels.delete(i);
    }
    /**
     * Add an edge into the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "addEdge",
    value: function(i) {
      var r = Object.assign({}, this.graph.getEdgeAttributes(i));
      this.settings.edgeReducer && (r = this.settings.edgeReducer(i, r));
      var o = Xs(this.settings, i, r);
      this.edgeDataCache[i] = o, this.edgesWithForcedLabels.delete(i), o.forceLabel && !o.hidden && this.edgesWithForcedLabels.add(i), this.settings.zIndex && (o.zIndex < this.edgeZExtent[0] && (this.edgeZExtent[0] = o.zIndex), o.zIndex > this.edgeZExtent[1] && (this.edgeZExtent[1] = o.zIndex));
    }
    /**
     * Update an edge in the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "updateEdge",
    value: function(i) {
      this.addEdge(i);
    }
    /**
     * Remove an edge from the internal data structures.
     * @private
     * @param key The edge's graphology ID
     */
  }, {
    key: "removeEdge",
    value: function(i) {
      delete this.edgeDataCache[i], delete this.edgeProgramIndex[i], this.hoveredEdge === i && (this.hoveredEdge = null), this.edgesWithForcedLabels.delete(i);
    }
    /**
     * Clear all indices related to nodes.
     * @private
     */
  }, {
    key: "clearNodeIndices",
    value: function() {
      this.labelGrid = new Yi(), this.nodeExtent = {
        x: [0, 1],
        y: [0, 1]
      }, this.nodeDataCache = {}, this.edgeProgramIndex = {}, this.nodesWithForcedLabels = /* @__PURE__ */ new Set(), this.nodeZExtent = [1 / 0, -1 / 0], this.highlightedNodes = /* @__PURE__ */ new Set();
    }
    /**
     * Clear all indices related to edges.
     * @private
     */
  }, {
    key: "clearEdgeIndices",
    value: function() {
      this.edgeDataCache = {}, this.edgeProgramIndex = {}, this.edgesWithForcedLabels = /* @__PURE__ */ new Set(), this.edgeZExtent = [1 / 0, -1 / 0];
    }
    /**
     * Clear all indices.
     * @private
     */
  }, {
    key: "clearIndices",
    value: function() {
      this.clearEdgeIndices(), this.clearNodeIndices();
    }
    /**
     * Clear all graph state related to nodes.
     * @private
     */
  }, {
    key: "clearNodeState",
    value: function() {
      this.displayedNodeLabels = /* @__PURE__ */ new Set(), this.highlightedNodes = /* @__PURE__ */ new Set(), this.hoveredNode = null;
    }
    /**
     * Clear all graph state related to edges.
     * @private
     */
  }, {
    key: "clearEdgeState",
    value: function() {
      this.displayedEdgeLabels = /* @__PURE__ */ new Set(), this.highlightedNodes = /* @__PURE__ */ new Set(), this.hoveredEdge = null;
    }
    /**
     * Clear all graph state.
     * @private
     */
  }, {
    key: "clearState",
    value: function() {
      this.clearEdgeState(), this.clearNodeState();
    }
    /**
     * Add the node data to its program.
     * @private
     * @param node The node's graphology ID
     * @param fingerprint A fingerprint used to identity the node with picking
     * @param position The index where to place the node in the program
     */
  }, {
    key: "addNodeToProgram",
    value: function(i, r, o) {
      var a = this.nodeDataCache[i], s = this.nodePrograms[a.type];
      if (!s) throw new Error('Sigma: could not find a suitable program for node type "'.concat(a.type, '"!'));
      s.process(r, o, a), this.nodeProgramIndex[i] = o;
    }
    /**
     * Add the edge data to its program.
     * @private
     * @param edge The edge's graphology ID
     * @param fingerprint A fingerprint used to identity the edge with picking
     * @param position The index where to place the edge in the program
     */
  }, {
    key: "addEdgeToProgram",
    value: function(i, r, o) {
      var a = this.edgeDataCache[i], s = this.edgePrograms[a.type];
      if (!s) throw new Error('Sigma: could not find a suitable program for edge type "'.concat(a.type, '"!'));
      var u = this.graph.extremities(i), d = this.nodeDataCache[u[0]], h = this.nodeDataCache[u[1]];
      s.process(r, o, d, h, a), this.edgeProgramIndex[i] = o;
    }
    /**---------------------------------------------------------------------------
     * Public API.
     **---------------------------------------------------------------------------
     */
    /**
     * Function used to get the render params.
     *
     * @return {RenderParams}
     */
  }, {
    key: "getRenderParams",
    value: function() {
      return {
        matrix: this.matrix,
        invMatrix: this.invMatrix,
        width: this.width,
        height: this.height,
        pixelRatio: this.pixelRatio,
        zoomRatio: this.camera.ratio,
        cameraAngle: this.camera.angle,
        sizeRatio: 1 / this.scaleSize(),
        correctionRatio: this.correctionRatio,
        downSizingRatio: this.pickingDownSizingRatio,
        minEdgeThickness: this.settings.minEdgeThickness,
        antiAliasingFeather: this.settings.antiAliasingFeather
      };
    }
    /**
     * Function used to retrieve the actual stage padding value.
     *
     * @return {number}
     */
  }, {
    key: "getStagePadding",
    value: function() {
      var i = this.settings, r = i.stagePadding, o = i.autoRescale;
      return o && r || 0;
    }
    /**
     * Function used to create a layer element.
     *
     * @param {string} id - Context's id.
     * @param {string} tag - The HTML tag to use.
     * @param options
     * @return {Sigma}
     */
  }, {
    key: "createLayer",
    value: function(i, r) {
      var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (this.elements[i]) throw new Error('Sigma: a layer named "'.concat(i, '" already exists'));
      var a = Ds(r, {
        position: "absolute"
      }, {
        class: "sigma-".concat(i)
      });
      return o.style && Object.assign(a.style, o.style), this.elements[i] = a, "beforeLayer" in o && o.beforeLayer ? this.elements[o.beforeLayer].before(a) : "afterLayer" in o && o.afterLayer ? this.elements[o.afterLayer].after(a) : this.container.appendChild(a), a;
    }
    /**
     * Function used to create a canvas element.
     *
     * @param {string} id - Context's id.
     * @param options
     * @return {Sigma}
     */
  }, {
    key: "createCanvas",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.createLayer(i, "canvas", r);
    }
    /**
     * Function used to create a canvas context and add the relevant DOM elements.
     *
     * @param  {string} id - Context's id.
     * @param  options
     * @return {Sigma}
     */
  }, {
    key: "createCanvasContext",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = this.createCanvas(i, r), a = {
        preserveDrawingBuffer: !1,
        antialias: !1
      };
      return this.canvasContexts[i] = o.getContext("2d", a), this;
    }
    /**
     * Function used to create a WebGL context and add the relevant DOM
     * elements.
     *
     * @param  {string}  id      - Context's id.
     * @param  {object?} options - #getContext params to override (optional)
     * @return {WebGLRenderingContext}
     */
  }, {
    key: "createWebGLContext",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = (r == null ? void 0 : r.canvas) || this.createCanvas(i, r);
      r.hidden && o.remove();
      var a = L({
        preserveDrawingBuffer: !1,
        antialias: !1
      }, r), s;
      s = o.getContext("webgl2", a), s || (s = o.getContext("webgl", a)), s || (s = o.getContext("experimental-webgl", a));
      var u = s;
      if (this.webGLContexts[i] = u, u.blendFunc(u.ONE, u.ONE_MINUS_SRC_ALPHA), r.picking) {
        this.pickingLayers.add(i);
        var d = u.createFramebuffer();
        if (!d) throw new Error("Sigma: cannot create a new frame buffer for layer ".concat(i));
        this.frameBuffers[i] = d;
      }
      return u;
    }
    /**
     * Function used to properly kill a layer.
     *
     * @param  {string} id - Layer id.
     * @return {Sigma}
     */
  }, {
    key: "killLayer",
    value: function(i) {
      var r = this.elements[i];
      if (!r) throw new Error("Sigma: cannot kill layer ".concat(i, ", which does not exist"));
      if (this.webGLContexts[i]) {
        var o, a = this.webGLContexts[i];
        (o = a.getExtension("WEBGL_lose_context")) === null || o === void 0 || o.loseContext(), delete this.webGLContexts[i];
      } else this.canvasContexts[i] && delete this.canvasContexts[i];
      return r.remove(), delete this.elements[i], this;
    }
    /**
     * Method returning the renderer's camera.
     *
     * @return {Camera}
     */
  }, {
    key: "getCamera",
    value: function() {
      return this.camera;
    }
    /**
     * Method setting the renderer's camera.
     *
     * @param  {Camera} camera - New camera.
     * @return {Sigma}
     */
  }, {
    key: "setCamera",
    value: function(i) {
      this.unbindCameraHandlers(), this.camera = i, this.bindCameraHandlers();
    }
    /**
     * Method returning the container DOM element.
     *
     * @return {HTMLElement}
     */
  }, {
    key: "getContainer",
    value: function() {
      return this.container;
    }
    /**
     * Method returning the renderer's graph.
     *
     * @return {Graph}
     */
  }, {
    key: "getGraph",
    value: function() {
      return this.graph;
    }
    /**
     * Method used to set the renderer's graph.
     *
     * @return {Graph}
     */
  }, {
    key: "setGraph",
    value: function(i) {
      i !== this.graph && (this.hoveredNode && !i.hasNode(this.hoveredNode) && (this.hoveredNode = null), this.hoveredEdge && !i.hasEdge(this.hoveredEdge) && (this.hoveredEdge = null), this.unbindGraphHandlers(), this.checkEdgesEventsFrame !== null && (cancelAnimationFrame(this.checkEdgesEventsFrame), this.checkEdgesEventsFrame = null), this.graph = i, this.bindGraphHandlers(), this.refresh());
    }
    /**
     * Method returning the mouse captor.
     *
     * @return {MouseCaptor}
     */
  }, {
    key: "getMouseCaptor",
    value: function() {
      return this.mouseCaptor;
    }
    /**
     * Method returning the touch captor.
     *
     * @return {TouchCaptor}
     */
  }, {
    key: "getTouchCaptor",
    value: function() {
      return this.touchCaptor;
    }
    /**
     * Method returning the current renderer's dimensions.
     *
     * @return {Dimensions}
     */
  }, {
    key: "getDimensions",
    value: function() {
      return {
        width: this.width,
        height: this.height
      };
    }
    /**
     * Method returning the current graph's dimensions.
     *
     * @return {Dimensions}
     */
  }, {
    key: "getGraphDimensions",
    value: function() {
      var i = this.customBBox || this.nodeExtent;
      return {
        width: i.x[1] - i.x[0] || 1,
        height: i.y[1] - i.y[0] || 1
      };
    }
    /**
     * Method used to get all the sigma node attributes.
     * It's useful for example to get the position of a node
     * and to get values that are set by the nodeReducer
     *
     * @param  {string} key - The node's key.
     * @return {NodeDisplayData | undefined} A copy of the desired node's attribute or undefined if not found
     */
  }, {
    key: "getNodeDisplayData",
    value: function(i) {
      var r = this.nodeDataCache[i];
      return r ? Object.assign({}, r) : void 0;
    }
    /**
     * Method used to get all the sigma edge attributes.
     * It's useful for example to get values that are set by the edgeReducer.
     *
     * @param  {string} key - The edge's key.
     * @return {EdgeDisplayData | undefined} A copy of the desired edge's attribute or undefined if not found
     */
  }, {
    key: "getEdgeDisplayData",
    value: function(i) {
      var r = this.edgeDataCache[i];
      return r ? Object.assign({}, r) : void 0;
    }
    /**
     * Method used to get the set of currently displayed node labels.
     *
     * @return {Set<string>} A set of node keys whose label is displayed.
     */
  }, {
    key: "getNodeDisplayedLabels",
    value: function() {
      return new Set(this.displayedNodeLabels);
    }
    /**
     * Method used to get the set of currently displayed edge labels.
     *
     * @return {Set<string>} A set of edge keys whose label is displayed.
     */
  }, {
    key: "getEdgeDisplayedLabels",
    value: function() {
      return new Set(this.displayedEdgeLabels);
    }
    /**
     * Method returning a copy of the settings collection.
     *
     * @return {Settings} A copy of the settings collection.
     */
  }, {
    key: "getSettings",
    value: function() {
      return L({}, this.settings);
    }
    /**
     * Method returning the current value for a given setting key.
     *
     * @param  {string} key - The setting key to get.
     * @return {any} The value attached to this setting key or undefined if not found
     */
  }, {
    key: "getSetting",
    value: function(i) {
      return this.settings[i];
    }
    /**
     * Method setting the value of a given setting key. Note that this will schedule
     * a new render next frame.
     *
     * @param  {string} key - The setting key to set.
     * @param  {any}    value - The value to set.
     * @return {Sigma}
     */
  }, {
    key: "setSetting",
    value: function(i, r) {
      var o = L({}, this.settings);
      return this.settings[i] = r, gn(this.settings), this.handleSettingsUpdate(o), this.scheduleRefresh(), this;
    }
    /**
     * Method updating the value of a given setting key using the provided function.
     * Note that this will schedule a new render next frame.
     *
     * @param  {string}   key     - The setting key to set.
     * @param  {function} updater - The update function.
     * @return {Sigma}
     */
  }, {
    key: "updateSetting",
    value: function(i, r) {
      return this.setSetting(i, r(this.settings[i])), this;
    }
    /**
     * Method setting multiple settings at once.
     *
     * @param  {Partial<Settings>} settings - The settings to set.
     * @return {Sigma}
     */
  }, {
    key: "setSettings",
    value: function(i) {
      var r = L({}, this.settings);
      return this.settings = L(L({}, this.settings), i), gn(this.settings), this.handleSettingsUpdate(r), this.scheduleRefresh(), this;
    }
    /**
     * Method used to resize the renderer.
     *
     * @param  {boolean} force - If true, then resize is processed even if size is unchanged (optional).
     * @return {Sigma}
     */
  }, {
    key: "resize",
    value: function(i) {
      var r = this.width, o = this.height;
      if (this.width = this.container.offsetWidth, this.height = this.container.offsetHeight, this.pixelRatio = Oi(), this.width === 0)
        if (this.settings.allowInvalidContainer) this.width = 1;
        else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");
      if (this.height === 0)
        if (this.settings.allowInvalidContainer) this.height = 1;
        else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");
      if (!i && r === this.width && o === this.height) return this;
      for (var a in this.elements) {
        var s = this.elements[a];
        s.style.width = this.width + "px", s.style.height = this.height + "px";
      }
      for (var u in this.canvasContexts)
        this.elements[u].setAttribute("width", this.width * this.pixelRatio + "px"), this.elements[u].setAttribute("height", this.height * this.pixelRatio + "px"), this.pixelRatio !== 1 && this.canvasContexts[u].scale(this.pixelRatio, this.pixelRatio);
      for (var d in this.webGLContexts) {
        this.elements[d].setAttribute("width", this.width * this.pixelRatio + "px"), this.elements[d].setAttribute("height", this.height * this.pixelRatio + "px");
        var h = this.webGLContexts[d];
        if (h.viewport(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio), this.pickingLayers.has(d)) {
          var l = this.textures[d];
          l && h.deleteTexture(l);
        }
      }
      return this.emit("resize"), this;
    }
    /**
     * Method used to clear all the canvases.
     *
     * @return {Sigma}
     */
  }, {
    key: "clear",
    value: function() {
      return this.emit("beforeClear"), this.webGLContexts.nodes.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null), this.webGLContexts.nodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT), this.webGLContexts.edges.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null), this.webGLContexts.edges.clear(WebGLRenderingContext.COLOR_BUFFER_BIT), this.webGLContexts.hoverNodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT), this.canvasContexts.labels.clearRect(0, 0, this.width, this.height), this.canvasContexts.hovers.clearRect(0, 0, this.width, this.height), this.canvasContexts.edgeLabels.clearRect(0, 0, this.width, this.height), this.emit("afterClear"), this;
    }
    /**
     * Method used to refresh, i.e. force the renderer to reprocess graph
     * data and render, but keep the state.
     * - if a partialGraph is provided, we only reprocess those nodes & edges.
     * - if schedule is TRUE, we schedule a render instead of sync render
     * - if skipIndexation is TRUE, then labelGrid & program indexation are skipped (can be used if you haven't modify x, y, zIndex & size)
     *
     * @return {Sigma}
     */
  }, {
    key: "refresh",
    value: function(i) {
      var r = this, o = (i == null ? void 0 : i.skipIndexation) !== void 0 ? i == null ? void 0 : i.skipIndexation : !1, a = (i == null ? void 0 : i.schedule) !== void 0 ? i.schedule : !1, s = !i || !i.partialGraph;
      if (s)
        this.clearEdgeIndices(), this.clearNodeIndices(), this.graph.forEachNode(function(p) {
          return r.addNode(p);
        }), this.graph.forEachEdge(function(p) {
          return r.addEdge(p);
        });
      else {
        for (var u, d, h = ((u = i.partialGraph) === null || u === void 0 ? void 0 : u.nodes) || [], l = 0, c = (h == null ? void 0 : h.length) || 0; l < c; l++) {
          var f = h[l];
          if (this.updateNode(f), o) {
            var g = this.nodeProgramIndex[f];
            if (g === void 0) throw new Error('Sigma: node "'.concat(f, `" can't be repaint`));
            this.addNodeToProgram(f, this.nodeIndices[f], g);
          }
        }
        for (var v = (i == null || (d = i.partialGraph) === null || d === void 0 ? void 0 : d.edges) || [], y = 0, x = v.length; y < x; y++) {
          var _ = v[y];
          if (this.updateEdge(_), o) {
            var S = this.edgeProgramIndex[_];
            if (S === void 0) throw new Error('Sigma: edge "'.concat(_, `" can't be repaint`));
            this.addEdgeToProgram(_, this.edgeIndices[_], S);
          }
        }
      }
      return (s || !o) && (this.needToProcess = !0), a ? this.scheduleRender() : this.render(), this;
    }
    /**
     * Method used to schedule a render at the next available frame.
     * This method can be safely called on a same frame because it basically
     * debounces refresh to the next frame.
     *
     * @return {Sigma}
     */
  }, {
    key: "scheduleRender",
    value: function() {
      var i = this;
      return this.renderFrame || (this.renderFrame = requestAnimationFrame(function() {
        i.render();
      })), this;
    }
    /**
     * Method used to schedule a refresh (i.e. fully reprocess graph data and render)
     * at the next available frame.
     * This method can be safely called on a same frame because it basically
     * debounces refresh to the next frame.
     *
     * @return {Sigma}
     */
  }, {
    key: "scheduleRefresh",
    value: function(i) {
      return this.refresh(L(L({}, i), {}, {
        schedule: !0
      }));
    }
    /**
     * Method used to (un)zoom, while preserving the position of a viewport point.
     * Used for instance to zoom "on the mouse cursor".
     *
     * @param viewportTarget
     * @param newRatio
     * @return {CameraState}
     */
  }, {
    key: "getViewportZoomedState",
    value: function(i, r) {
      var o = this.camera.getState(), a = o.ratio, s = o.angle, u = o.x, d = o.y, h = this.settings, l = h.minCameraRatio, c = h.maxCameraRatio;
      typeof c == "number" && (r = Math.min(r, c)), typeof l == "number" && (r = Math.max(r, l));
      var f = r / a, g = {
        x: this.width / 2,
        y: this.height / 2
      }, v = this.viewportToFramedGraph(i), y = this.viewportToFramedGraph(g);
      return {
        angle: s,
        x: (v.x - y.x) * (1 - f) + u,
        y: (v.y - y.y) * (1 - f) + d,
        ratio: r
      };
    }
    /**
     * Method returning the abstract rectangle containing the graph according
     * to the camera's state.
     *
     * @return {object} - The view's rectangle.
     */
  }, {
    key: "viewRectangle",
    value: function() {
      var i = this.viewportToFramedGraph({
        x: 0,
        y: 0
      }), r = this.viewportToFramedGraph({
        x: this.width,
        y: 0
      }), o = this.viewportToFramedGraph({
        x: 0,
        y: this.height
      });
      return {
        x1: i.x,
        y1: i.y,
        x2: r.x,
        y2: r.y,
        height: r.y - o.y
      };
    }
    /**
     * Method returning the coordinates of a point from the framed graph system to the viewport system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
  }, {
    key: "framedGraphToViewport",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = !!r.cameraState || !!r.viewportDimensions || !!r.graphDimensions, a = r.matrix ? r.matrix : o ? et(r.cameraState || this.camera.getState(), r.viewportDimensions || this.getDimensions(), r.graphDimensions || this.getGraphDimensions(), r.padding || this.getStagePadding()) : this.matrix, s = Dn(a, i);
      return {
        x: (1 + s.x) * this.width / 2,
        y: (1 - s.y) * this.height / 2
      };
    }
    /**
     * Method returning the coordinates of a point from the viewport system to the framed graph system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
  }, {
    key: "viewportToFramedGraph",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = !!r.cameraState || !!r.viewportDimensions || !r.graphDimensions, a = r.matrix ? r.matrix : o ? et(r.cameraState || this.camera.getState(), r.viewportDimensions || this.getDimensions(), r.graphDimensions || this.getGraphDimensions(), r.padding || this.getStagePadding(), !0) : this.invMatrix, s = Dn(a, {
        x: i.x / this.width * 2 - 1,
        y: 1 - i.y / this.height * 2
      });
      return isNaN(s.x) && (s.x = 0), isNaN(s.y) && (s.y = 0), s;
    }
    /**
     * Method used to translate a point's coordinates from the viewport system (pixel distance from the top-left of the
     * stage) to the graph system (the reference system of data as they are in the given graph instance).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates}                  viewportPoint
     * @param {CoordinateConversionOverride} override
     */
  }, {
    key: "viewportToGraph",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.normalizationFunction.inverse(this.viewportToFramedGraph(i, r));
    }
    /**
     * Method used to translate a point's coordinates from the graph system (the reference system of data as they are in
     * the given graph instance) to the viewport system (pixel distance from the top-left of the stage).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates}                  graphPoint
     * @param {CoordinateConversionOverride} override
     */
  }, {
    key: "graphToViewport",
    value: function(i) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.framedGraphToViewport(this.normalizationFunction(i), r);
    }
    /**
     * Method returning the distance multiplier between the graph system and the
     * viewport system.
     */
  }, {
    key: "getGraphToViewportRatio",
    value: function() {
      var i = {
        x: 0,
        y: 0
      }, r = {
        x: 1,
        y: 1
      }, o = Math.sqrt(Math.pow(i.x - r.x, 2) + Math.pow(i.y - r.y, 2)), a = this.graphToViewport(i), s = this.graphToViewport(r), u = Math.sqrt(Math.pow(a.x - s.x, 2) + Math.pow(a.y - s.y, 2));
      return u / o;
    }
    /**
     * Method returning the graph's bounding box.
     *
     * @return {{ x: Extent, y: Extent }}
     */
  }, {
    key: "getBBox",
    value: function() {
      return this.nodeExtent;
    }
    /**
     * Method returning the graph's custom bounding box, if any.
     *
     * @return {{ x: Extent, y: Extent } | null}
     */
  }, {
    key: "getCustomBBox",
    value: function() {
      return this.customBBox;
    }
    /**
     * Method used to override the graph's bounding box with a custom one. Give `null` as the argument to stop overriding.
     *
     * @return {Sigma}
     */
  }, {
    key: "setCustomBBox",
    value: function(i) {
      return this.customBBox = i, this.scheduleRender(), this;
    }
    /**
     * Method used to shut the container & release event listeners.
     *
     * @return {undefined}
     */
  }, {
    key: "kill",
    value: function() {
      this.emit("kill"), this.removeAllListeners(), this.unbindCameraHandlers(), window.removeEventListener("resize", this.activeListeners.handleResize), this.mouseCaptor.kill(), this.touchCaptor.kill(), this.unbindGraphHandlers(), this.clearIndices(), this.clearState(), this.nodeDataCache = {}, this.edgeDataCache = {}, this.highlightedNodes.clear(), this.renderFrame && (cancelAnimationFrame(this.renderFrame), this.renderFrame = null), this.renderHighlightedNodesFrame && (cancelAnimationFrame(this.renderHighlightedNodesFrame), this.renderHighlightedNodesFrame = null);
      for (var i = this.container; i.firstChild; ) i.removeChild(i.firstChild);
      for (var r in this.nodePrograms)
        this.nodePrograms[r].kill();
      for (var o in this.nodeHoverPrograms)
        this.nodeHoverPrograms[o].kill();
      for (var a in this.edgePrograms)
        this.edgePrograms[a].kill();
      this.nodePrograms = {}, this.nodeHoverPrograms = {}, this.edgePrograms = {};
      for (var s in this.elements)
        this.killLayer(s);
      this.canvasContexts = {}, this.webGLContexts = {}, this.elements = {};
    }
    /**
     * Method used to scale the given size according to the camera's ratio, i.e.
     * zooming state.
     *
     * @param  {number?} size -        The size to scale (node size, edge thickness etc.).
     * @param  {number?} cameraRatio - A camera ratio (defaults to the actual camera ratio).
     * @return {number}              - The scaled size.
     */
  }, {
    key: "scaleSize",
    value: function() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.camera.ratio;
      return i / this.settings.zoomToSizeRatioFunction(r) * (this.getSetting("itemSizesReference") === "positions" ? r * this.graphToViewportRatio : 1);
    }
    /**
     * Method that returns the collection of all used canvases.
     * At the moment, the instantiated canvases are the following, and in the
     * following order in the DOM:
     * - `edges`
     * - `nodes`
     * - `edgeLabels`
     * - `labels`
     * - `hovers`
     * - `hoverNodes`
     * - `mouse`
     *
     * @return {PlainObject<HTMLCanvasElement>} - The collection of canvases.
     */
  }, {
    key: "getCanvases",
    value: function() {
      var i = {};
      for (var r in this.elements) this.elements[r] instanceof HTMLCanvasElement && (i[r] = this.elements[r]);
      return i;
    }
  }]);
})(ei), Js = Zs;
function Qs() {
  const t = arguments[0];
  for (let e = 1, n = arguments.length; e < n; e++)
    if (arguments[e])
      for (const i in arguments[e]) t[i] = arguments[e][i];
  return t;
}
let B = Qs;
typeof Object.assign == "function" && (B = Object.assign);
function re(t, e, n, i) {
  const r = t._nodes.get(e);
  let o = null;
  return r && (i === "mixed" ? o = r.out && r.out[n] || r.undirected && r.undirected[n] : i === "directed" ? o = r.out && r.out[n] : o = r.undirected && r.undirected[n]), o;
}
function W(t) {
  return typeof t == "object" && t !== null;
}
function ro(t) {
  let e;
  for (e in t) return !1;
  return !0;
}
function ie(t, e, n) {
  Object.defineProperty(t, e, {
    enumerable: !1,
    configurable: !1,
    writable: !0,
    value: n
  });
}
function ue(t, e, n) {
  const i = {
    enumerable: !0,
    configurable: !0
  };
  typeof n == "function" ? i.get = n : (i.value = n, i.writable = !1), Object.defineProperty(t, e, i);
}
function Xi(t) {
  return !(!W(t) || t.attributes && !Array.isArray(t.attributes));
}
function eu() {
  let t = Math.floor(Math.random() * 256) & 255;
  return () => t++;
}
function xe() {
  const t = arguments;
  let e = null, n = -1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let i = null;
      do {
        if (e === null) {
          if (n++, n >= t.length) return { done: !0 };
          e = t[n][Symbol.iterator]();
        }
        if (i = e.next(), i.done) {
          e = null;
          continue;
        }
        break;
      } while (!0);
      return i;
    }
  };
}
function Xe() {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { done: !0 };
    }
  };
}
class ni extends Error {
  constructor(e) {
    super(), this.name = "GraphError", this.message = e;
  }
}
class C extends ni {
  constructor(e) {
    super(e), this.name = "InvalidArgumentsGraphError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(
      this,
      C.prototype.constructor
    );
  }
}
class T extends ni {
  constructor(e) {
    super(e), this.name = "NotFoundGraphError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, T.prototype.constructor);
  }
}
class D extends ni {
  constructor(e) {
    super(e), this.name = "UsageGraphError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, D.prototype.constructor);
  }
}
function oo(t, e) {
  this.key = t, this.attributes = e, this.clear();
}
oo.prototype.clear = function() {
  this.inDegree = 0, this.outDegree = 0, this.undirectedDegree = 0, this.undirectedLoops = 0, this.directedLoops = 0, this.in = {}, this.out = {}, this.undirected = {};
};
function ao(t, e) {
  this.key = t, this.attributes = e, this.clear();
}
ao.prototype.clear = function() {
  this.inDegree = 0, this.outDegree = 0, this.directedLoops = 0, this.in = {}, this.out = {};
};
function so(t, e) {
  this.key = t, this.attributes = e, this.clear();
}
so.prototype.clear = function() {
  this.undirectedDegree = 0, this.undirectedLoops = 0, this.undirected = {};
};
function Ze(t, e, n, i, r) {
  this.key = e, this.attributes = r, this.undirected = t, this.source = n, this.target = i;
}
Ze.prototype.attach = function() {
  let t = "out", e = "in";
  this.undirected && (t = e = "undirected");
  const n = this.source.key, i = this.target.key;
  this.source[t][i] = this, !(this.undirected && n === i) && (this.target[e][n] = this);
};
Ze.prototype.attachMulti = function() {
  let t = "out", e = "in";
  const n = this.source.key, i = this.target.key;
  this.undirected && (t = e = "undirected");
  const r = this.source[t], o = r[i];
  if (typeof o > "u") {
    r[i] = this, this.undirected && n === i || (this.target[e][n] = this);
    return;
  }
  o.previous = this, this.next = o, r[i] = this, this.target[e][n] = this;
};
Ze.prototype.detach = function() {
  const t = this.source.key, e = this.target.key;
  let n = "out", i = "in";
  this.undirected && (n = i = "undirected"), delete this.source[n][e], delete this.target[i][t];
};
Ze.prototype.detachMulti = function() {
  const t = this.source.key, e = this.target.key;
  let n = "out", i = "in";
  this.undirected && (n = i = "undirected"), this.previous === void 0 ? this.next === void 0 ? (delete this.source[n][e], delete this.target[i][t]) : (this.next.previous = void 0, this.source[n][e] = this.next, this.target[i][t] = this.next) : (this.previous.next = this.next, this.next !== void 0 && (this.next.previous = this.previous));
};
const uo = 0, lo = 1, tu = 2, ho = 3;
function Te(t, e, n, i, r, o, a) {
  let s, u, d, h;
  if (i = "" + i, n === uo) {
    if (s = t._nodes.get(i), !s)
      throw new T(
        `Graph.${e}: could not find the "${i}" node in the graph.`
      );
    d = r, h = o;
  } else if (n === ho) {
    if (r = "" + r, u = t._edges.get(r), !u)
      throw new T(
        `Graph.${e}: could not find the "${r}" edge in the graph.`
      );
    const l = u.source.key, c = u.target.key;
    if (i === l)
      s = u.target;
    else if (i === c)
      s = u.source;
    else
      throw new T(
        `Graph.${e}: the "${i}" node is not attached to the "${r}" edge (${l}, ${c}).`
      );
    d = o, h = a;
  } else {
    if (u = t._edges.get(i), !u)
      throw new T(
        `Graph.${e}: could not find the "${i}" edge in the graph.`
      );
    n === lo ? s = u.source : s = u.target, d = r, h = o;
  }
  return [s, d, h];
}
function nu(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    const [a, s] = Te(
      this,
      e,
      n,
      i,
      r,
      o
    );
    return a.attributes[s];
  };
}
function iu(t, e, n) {
  t.prototype[e] = function(i, r) {
    const [o] = Te(
      this,
      e,
      n,
      i,
      r
    );
    return o.attributes;
  };
}
function ru(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    const [a, s] = Te(
      this,
      e,
      n,
      i,
      r,
      o
    );
    return a.attributes.hasOwnProperty(s);
  };
}
function ou(t, e, n) {
  t.prototype[e] = function(i, r, o, a) {
    const [s, u, d] = Te(
      this,
      e,
      n,
      i,
      r,
      o,
      a
    );
    return s.attributes[u] = d, this.emit("nodeAttributesUpdated", {
      key: s.key,
      type: "set",
      attributes: s.attributes,
      name: u
    }), this;
  };
}
function au(t, e, n) {
  t.prototype[e] = function(i, r, o, a) {
    const [s, u, d] = Te(
      this,
      e,
      n,
      i,
      r,
      o,
      a
    );
    if (typeof d != "function")
      throw new C(
        `Graph.${e}: updater should be a function.`
      );
    const h = s.attributes, l = d(h[u]);
    return h[u] = l, this.emit("nodeAttributesUpdated", {
      key: s.key,
      type: "set",
      attributes: s.attributes,
      name: u
    }), this;
  };
}
function su(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    const [a, s] = Te(
      this,
      e,
      n,
      i,
      r,
      o
    );
    return delete a.attributes[s], this.emit("nodeAttributesUpdated", {
      key: a.key,
      type: "remove",
      attributes: a.attributes,
      name: s
    }), this;
  };
}
function uu(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    const [a, s] = Te(
      this,
      e,
      n,
      i,
      r,
      o
    );
    if (!W(s))
      throw new C(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return a.attributes = s, this.emit("nodeAttributesUpdated", {
      key: a.key,
      type: "replace",
      attributes: a.attributes
    }), this;
  };
}
function du(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    const [a, s] = Te(
      this,
      e,
      n,
      i,
      r,
      o
    );
    if (!W(s))
      throw new C(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return B(a.attributes, s), this.emit("nodeAttributesUpdated", {
      key: a.key,
      type: "merge",
      attributes: a.attributes,
      data: s
    }), this;
  };
}
function lu(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    const [a, s] = Te(
      this,
      e,
      n,
      i,
      r,
      o
    );
    if (typeof s != "function")
      throw new C(
        `Graph.${e}: provided updater is not a function.`
      );
    return a.attributes = s(a.attributes), this.emit("nodeAttributesUpdated", {
      key: a.key,
      type: "update",
      attributes: a.attributes
    }), this;
  };
}
const hu = [
  {
    name: (t) => `get${t}Attribute`,
    attacher: nu
  },
  {
    name: (t) => `get${t}Attributes`,
    attacher: iu
  },
  {
    name: (t) => `has${t}Attribute`,
    attacher: ru
  },
  {
    name: (t) => `set${t}Attribute`,
    attacher: ou
  },
  {
    name: (t) => `update${t}Attribute`,
    attacher: au
  },
  {
    name: (t) => `remove${t}Attribute`,
    attacher: su
  },
  {
    name: (t) => `replace${t}Attributes`,
    attacher: uu
  },
  {
    name: (t) => `merge${t}Attributes`,
    attacher: du
  },
  {
    name: (t) => `update${t}Attributes`,
    attacher: lu
  }
];
function cu(t) {
  hu.forEach(function({ name: e, attacher: n }) {
    n(t, e("Node"), uo), n(t, e("Source"), lo), n(t, e("Target"), tu), n(t, e("Opposite"), ho);
  });
}
function fu(t, e, n) {
  t.prototype[e] = function(i, r) {
    let o;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, s = "" + r;
      if (r = arguments[2], o = re(this, a, s, n), !o)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${s}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return o.attributes[r];
  };
}
function pu(t, e, n) {
  t.prototype[e] = function(i) {
    let r;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 1) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const o = "" + i, a = "" + arguments[1];
      if (r = re(this, o, a, n), !r)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, r = this._edges.get(i), !r)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return r.attributes;
  };
}
function gu(t, e, n) {
  t.prototype[e] = function(i, r) {
    let o;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, s = "" + r;
      if (r = arguments[2], o = re(this, a, s, n), !o)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${s}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return o.attributes.hasOwnProperty(r);
  };
}
function vu(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    let a;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const s = "" + i, u = "" + r;
      if (r = arguments[2], o = arguments[3], a = re(this, s, u, n), !a)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${s}" - "${u}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, a = this._edges.get(i), !a)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return a.attributes[r] = o, this.emit("edgeAttributesUpdated", {
      key: a.key,
      type: "set",
      attributes: a.attributes,
      name: r
    }), this;
  };
}
function mu(t, e, n) {
  t.prototype[e] = function(i, r, o) {
    let a;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const s = "" + i, u = "" + r;
      if (r = arguments[2], o = arguments[3], a = re(this, s, u, n), !a)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${s}" - "${u}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, a = this._edges.get(i), !a)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (typeof o != "function")
      throw new C(
        `Graph.${e}: updater should be a function.`
      );
    return a.attributes[r] = o(a.attributes[r]), this.emit("edgeAttributesUpdated", {
      key: a.key,
      type: "set",
      attributes: a.attributes,
      name: r
    }), this;
  };
}
function yu(t, e, n) {
  t.prototype[e] = function(i, r) {
    let o;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, s = "" + r;
      if (r = arguments[2], o = re(this, a, s, n), !o)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${s}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    return delete o.attributes[r], this.emit("edgeAttributesUpdated", {
      key: o.key,
      type: "remove",
      attributes: o.attributes,
      name: r
    }), this;
  };
}
function _u(t, e, n) {
  t.prototype[e] = function(i, r) {
    let o;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, s = "" + r;
      if (r = arguments[2], o = re(this, a, s, n), !o)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${s}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (!W(r))
      throw new C(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return o.attributes = r, this.emit("edgeAttributesUpdated", {
      key: o.key,
      type: "replace",
      attributes: o.attributes
    }), this;
  };
}
function bu(t, e, n) {
  t.prototype[e] = function(i, r) {
    let o;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, s = "" + r;
      if (r = arguments[2], o = re(this, a, s, n), !o)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${s}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (!W(r))
      throw new C(
        `Graph.${e}: provided attributes are not a plain object.`
      );
    return B(o.attributes, r), this.emit("edgeAttributesUpdated", {
      key: o.key,
      type: "merge",
      attributes: o.attributes,
      data: r
    }), this;
  };
}
function wu(t, e, n) {
  t.prototype[e] = function(i, r) {
    let o;
    if (this.type !== "mixed" && n !== "mixed" && n !== this.type)
      throw new D(
        `Graph.${e}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new D(
          `Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const a = "" + i, s = "" + r;
      if (r = arguments[2], o = re(this, a, s, n), !o)
        throw new T(
          `Graph.${e}: could not find an edge for the given path ("${a}" - "${s}").`
        );
    } else {
      if (n !== "mixed")
        throw new D(
          `Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      if (i = "" + i, o = this._edges.get(i), !o)
        throw new T(
          `Graph.${e}: could not find the "${i}" edge in the graph.`
        );
    }
    if (typeof r != "function")
      throw new C(
        `Graph.${e}: provided updater is not a function.`
      );
    return o.attributes = r(o.attributes), this.emit("edgeAttributesUpdated", {
      key: o.key,
      type: "update",
      attributes: o.attributes
    }), this;
  };
}
const Eu = [
  {
    name: (t) => `get${t}Attribute`,
    attacher: fu
  },
  {
    name: (t) => `get${t}Attributes`,
    attacher: pu
  },
  {
    name: (t) => `has${t}Attribute`,
    attacher: gu
  },
  {
    name: (t) => `set${t}Attribute`,
    attacher: vu
  },
  {
    name: (t) => `update${t}Attribute`,
    attacher: mu
  },
  {
    name: (t) => `remove${t}Attribute`,
    attacher: yu
  },
  {
    name: (t) => `replace${t}Attributes`,
    attacher: _u
  },
  {
    name: (t) => `merge${t}Attributes`,
    attacher: bu
  },
  {
    name: (t) => `update${t}Attributes`,
    attacher: wu
  }
];
function xu(t) {
  Eu.forEach(function({ name: e, attacher: n }) {
    n(t, e("Edge"), "mixed"), n(t, e("DirectedEdge"), "directed"), n(t, e("UndirectedEdge"), "undirected");
  });
}
const Su = [
  {
    name: "edges",
    type: "mixed"
  },
  {
    name: "inEdges",
    type: "directed",
    direction: "in"
  },
  {
    name: "outEdges",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundEdges",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundEdges",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedEdges",
    type: "directed"
  },
  {
    name: "undirectedEdges",
    type: "undirected"
  }
];
function Tu(t, e, n, i) {
  let r = !1;
  for (const o in e) {
    if (o === i) continue;
    const a = e[o];
    if (r = n(
      a.key,
      a.attributes,
      a.source.key,
      a.target.key,
      a.source.attributes,
      a.target.attributes,
      a.undirected
    ), t && r) return a.key;
  }
}
function ku(t, e, n, i) {
  let r, o, a, s = !1;
  for (const u in e)
    if (u !== i) {
      r = e[u];
      do {
        if (o = r.source, a = r.target, s = n(
          r.key,
          r.attributes,
          o.key,
          a.key,
          o.attributes,
          a.attributes,
          r.undirected
        ), t && s) return r.key;
        r = r.next;
      } while (r !== void 0);
    }
}
function mn(t, e) {
  const n = Object.keys(t), i = n.length;
  let r, o = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      do
        if (r)
          r = r.next;
        else {
          if (o >= i) return { done: !0 };
          const a = n[o++];
          if (a === e) {
            r = void 0;
            continue;
          }
          r = t[a];
        }
      while (!r);
      return {
        done: !1,
        value: {
          edge: r.key,
          attributes: r.attributes,
          source: r.source.key,
          target: r.target.key,
          sourceAttributes: r.source.attributes,
          targetAttributes: r.target.attributes,
          undirected: r.undirected
        }
      };
    }
  };
}
function Cu(t, e, n, i) {
  const r = e[n];
  if (!r) return;
  const o = r.source, a = r.target;
  if (i(
    r.key,
    r.attributes,
    o.key,
    a.key,
    o.attributes,
    a.attributes,
    r.undirected
  ) && t)
    return r.key;
}
function Au(t, e, n, i) {
  let r = e[n];
  if (!r) return;
  let o = !1;
  do {
    if (o = i(
      r.key,
      r.attributes,
      r.source.key,
      r.target.key,
      r.source.attributes,
      r.target.attributes,
      r.undirected
    ), t && o) return r.key;
    r = r.next;
  } while (r !== void 0);
}
function yn(t, e) {
  let n = t[e];
  if (n.next !== void 0)
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (!n) return { done: !0 };
        const r = {
          edge: n.key,
          attributes: n.attributes,
          source: n.source.key,
          target: n.target.key,
          sourceAttributes: n.source.attributes,
          targetAttributes: n.target.attributes,
          undirected: n.undirected
        };
        return n = n.next, {
          done: !1,
          value: r
        };
      }
    };
  let i = !1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return i === !0 ? { done: !0 } : (i = !0, {
        done: !1,
        value: {
          edge: n.key,
          attributes: n.attributes,
          source: n.source.key,
          target: n.target.key,
          sourceAttributes: n.source.attributes,
          targetAttributes: n.target.attributes,
          undirected: n.undirected
        }
      });
    }
  };
}
function Ru(t, e) {
  if (t.size === 0) return [];
  if (e === "mixed" || e === t.type)
    return Array.from(t._edges.keys());
  const n = e === "undirected" ? t.undirectedSize : t.directedSize, i = new Array(n), r = e === "undirected", o = t._edges.values();
  let a = 0, s, u;
  for (; s = o.next(), s.done !== !0; )
    u = s.value, u.undirected === r && (i[a++] = u.key);
  return i;
}
function co(t, e, n, i) {
  if (e.size === 0) return;
  const r = n !== "mixed" && n !== e.type, o = n === "undirected";
  let a, s, u = !1;
  const d = e._edges.values();
  for (; a = d.next(), a.done !== !0; ) {
    if (s = a.value, r && s.undirected !== o) continue;
    const { key: h, attributes: l, source: c, target: f } = s;
    if (u = i(
      h,
      l,
      c.key,
      f.key,
      c.attributes,
      f.attributes,
      s.undirected
    ), t && u) return h;
  }
}
function Lu(t, e) {
  if (t.size === 0) return Xe();
  const n = e !== "mixed" && e !== t.type, i = e === "undirected", r = t._edges.values();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let o, a;
      for (; ; ) {
        if (o = r.next(), o.done) return o;
        if (a = o.value, !(n && a.undirected !== i))
          break;
      }
      return { value: {
        edge: a.key,
        attributes: a.attributes,
        source: a.source.key,
        target: a.target.key,
        sourceAttributes: a.source.attributes,
        targetAttributes: a.target.attributes,
        undirected: a.undirected
      }, done: !1 };
    }
  };
}
function ii(t, e, n, i, r, o) {
  const a = e ? ku : Tu;
  let s;
  if (n !== "undirected" && (i !== "out" && (s = a(t, r.in, o), t && s) || i !== "in" && (s = a(
    t,
    r.out,
    o,
    i ? void 0 : r.key
  ), t && s)) || n !== "directed" && (s = a(t, r.undirected, o), t && s))
    return s;
}
function Nu(t, e, n, i) {
  const r = [];
  return ii(!1, t, e, n, i, function(o) {
    r.push(o);
  }), r;
}
function Du(t, e, n) {
  let i = Xe();
  return t !== "undirected" && (e !== "out" && typeof n.in < "u" && (i = xe(i, mn(n.in))), e !== "in" && typeof n.out < "u" && (i = xe(
    i,
    mn(n.out, e ? void 0 : n.key)
  ))), t !== "directed" && typeof n.undirected < "u" && (i = xe(i, mn(n.undirected))), i;
}
function ri(t, e, n, i, r, o, a) {
  const s = n ? Au : Cu;
  let u;
  if (e !== "undirected" && (typeof r.in < "u" && i !== "out" && (u = s(t, r.in, o, a), t && u) || typeof r.out < "u" && i !== "in" && (i || r.key !== o) && (u = s(t, r.out, o, a), t && u)) || e !== "directed" && typeof r.undirected < "u" && (u = s(t, r.undirected, o, a), t && u))
    return u;
}
function Gu(t, e, n, i, r) {
  const o = [];
  return ri(
    !1,
    t,
    e,
    n,
    i,
    r,
    function(a) {
      o.push(a);
    }
  ), o;
}
function Pu(t, e, n, i) {
  let r = Xe();
  return t !== "undirected" && (typeof n.in < "u" && e !== "out" && i in n.in && (r = xe(r, yn(n.in, i))), typeof n.out < "u" && e !== "in" && i in n.out && (e || n.key !== i) && (r = xe(r, yn(n.out, i)))), t !== "directed" && typeof n.undirected < "u" && i in n.undirected && (r = xe(
    r,
    yn(n.undirected, i)
  )), r;
}
function Fu(t, e) {
  const { name: n, type: i, direction: r } = e;
  t.prototype[n] = function(o, a) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return [];
    if (!arguments.length) return Ru(this, i);
    if (arguments.length === 1) {
      o = "" + o;
      const s = this._nodes.get(o);
      if (typeof s > "u")
        throw new T(
          `Graph.${n}: could not find the "${o}" node in the graph.`
        );
      return Nu(
        this.multi,
        i === "mixed" ? this.type : i,
        r,
        s
      );
    }
    if (arguments.length === 2) {
      o = "" + o, a = "" + a;
      const s = this._nodes.get(o);
      if (!s)
        throw new T(
          `Graph.${n}:  could not find the "${o}" source node in the graph.`
        );
      if (!this._nodes.has(a))
        throw new T(
          `Graph.${n}:  could not find the "${a}" target node in the graph.`
        );
      return Gu(
        i,
        this.multi,
        r,
        s,
        a
      );
    }
    throw new C(
      `Graph.${n}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function $u(t, e) {
  const { name: n, type: i, direction: r } = e, o = "forEach" + n[0].toUpperCase() + n.slice(1, -1);
  t.prototype[o] = function(d, h, l) {
    if (!(i !== "mixed" && this.type !== "mixed" && i !== this.type)) {
      if (arguments.length === 1)
        return l = d, co(!1, this, i, l);
      if (arguments.length === 2) {
        d = "" + d, l = h;
        const c = this._nodes.get(d);
        if (typeof c > "u")
          throw new T(
            `Graph.${o}: could not find the "${d}" node in the graph.`
          );
        return ii(
          !1,
          this.multi,
          i === "mixed" ? this.type : i,
          r,
          c,
          l
        );
      }
      if (arguments.length === 3) {
        d = "" + d, h = "" + h;
        const c = this._nodes.get(d);
        if (!c)
          throw new T(
            `Graph.${o}:  could not find the "${d}" source node in the graph.`
          );
        if (!this._nodes.has(h))
          throw new T(
            `Graph.${o}:  could not find the "${h}" target node in the graph.`
          );
        return ri(
          !1,
          i,
          this.multi,
          r,
          c,
          h,
          l
        );
      }
      throw new C(
        `Graph.${o}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
      );
    }
  };
  const a = "map" + n[0].toUpperCase() + n.slice(1);
  t.prototype[a] = function() {
    const d = Array.prototype.slice.call(arguments), h = d.pop();
    let l;
    if (d.length === 0) {
      let c = 0;
      i !== "directed" && (c += this.undirectedSize), i !== "undirected" && (c += this.directedSize), l = new Array(c);
      let f = 0;
      d.push((g, v, y, x, _, S, p) => {
        l[f++] = h(g, v, y, x, _, S, p);
      });
    } else
      l = [], d.push((c, f, g, v, y, x, _) => {
        l.push(h(c, f, g, v, y, x, _));
      });
    return this[o].apply(this, d), l;
  };
  const s = "filter" + n[0].toUpperCase() + n.slice(1);
  t.prototype[s] = function() {
    const d = Array.prototype.slice.call(arguments), h = d.pop(), l = [];
    return d.push((c, f, g, v, y, x, _) => {
      h(c, f, g, v, y, x, _) && l.push(c);
    }), this[o].apply(this, d), l;
  };
  const u = "reduce" + n[0].toUpperCase() + n.slice(1);
  t.prototype[u] = function() {
    let d = Array.prototype.slice.call(arguments);
    if (d.length < 2 || d.length > 4)
      throw new C(
        `Graph.${u}: invalid number of arguments (expecting 2, 3 or 4 and got ${d.length}).`
      );
    if (typeof d[d.length - 1] == "function" && typeof d[d.length - 2] != "function")
      throw new C(
        `Graph.${u}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    let h, l;
    d.length === 2 ? (h = d[0], l = d[1], d = []) : d.length === 3 ? (h = d[1], l = d[2], d = [d[0]]) : d.length === 4 && (h = d[2], l = d[3], d = [d[0], d[1]]);
    let c = l;
    return d.push((f, g, v, y, x, _, S) => {
      c = h(c, f, g, v, y, x, _, S);
    }), this[o].apply(this, d), c;
  };
}
function Iu(t, e) {
  const { name: n, type: i, direction: r } = e, o = "find" + n[0].toUpperCase() + n.slice(1, -1);
  t.prototype[o] = function(u, d, h) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return !1;
    if (arguments.length === 1)
      return h = u, co(!0, this, i, h);
    if (arguments.length === 2) {
      u = "" + u, h = d;
      const l = this._nodes.get(u);
      if (typeof l > "u")
        throw new T(
          `Graph.${o}: could not find the "${u}" node in the graph.`
        );
      return ii(
        !0,
        this.multi,
        i === "mixed" ? this.type : i,
        r,
        l,
        h
      );
    }
    if (arguments.length === 3) {
      u = "" + u, d = "" + d;
      const l = this._nodes.get(u);
      if (!l)
        throw new T(
          `Graph.${o}:  could not find the "${u}" source node in the graph.`
        );
      if (!this._nodes.has(d))
        throw new T(
          `Graph.${o}:  could not find the "${d}" target node in the graph.`
        );
      return ri(
        !0,
        i,
        this.multi,
        r,
        l,
        d,
        h
      );
    }
    throw new C(
      `Graph.${o}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };
  const a = "some" + n[0].toUpperCase() + n.slice(1, -1);
  t.prototype[a] = function() {
    const u = Array.prototype.slice.call(arguments), d = u.pop();
    return u.push((l, c, f, g, v, y, x) => d(l, c, f, g, v, y, x)), !!this[o].apply(this, u);
  };
  const s = "every" + n[0].toUpperCase() + n.slice(1, -1);
  t.prototype[s] = function() {
    const u = Array.prototype.slice.call(arguments), d = u.pop();
    return u.push((l, c, f, g, v, y, x) => !d(l, c, f, g, v, y, x)), !this[o].apply(this, u);
  };
}
function Mu(t, e) {
  const { name: n, type: i, direction: r } = e, o = n.slice(0, -1) + "Entries";
  t.prototype[o] = function(a, s) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return Xe();
    if (!arguments.length) return Lu(this, i);
    if (arguments.length === 1) {
      a = "" + a;
      const u = this._nodes.get(a);
      if (!u)
        throw new T(
          `Graph.${o}: could not find the "${a}" node in the graph.`
        );
      return Du(i, r, u);
    }
    if (arguments.length === 2) {
      a = "" + a, s = "" + s;
      const u = this._nodes.get(a);
      if (!u)
        throw new T(
          `Graph.${o}:  could not find the "${a}" source node in the graph.`
        );
      if (!this._nodes.has(s))
        throw new T(
          `Graph.${o}:  could not find the "${s}" target node in the graph.`
        );
      return Pu(i, r, u, s);
    }
    throw new C(
      `Graph.${o}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function zu(t) {
  Su.forEach((e) => {
    Fu(t, e), $u(t, e), Iu(t, e), Mu(t, e);
  });
}
const Ou = [
  {
    name: "neighbors",
    type: "mixed"
  },
  {
    name: "inNeighbors",
    type: "directed",
    direction: "in"
  },
  {
    name: "outNeighbors",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundNeighbors",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundNeighbors",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedNeighbors",
    type: "directed"
  },
  {
    name: "undirectedNeighbors",
    type: "undirected"
  }
];
function Zt() {
  this.A = null, this.B = null;
}
Zt.prototype.wrap = function(t) {
  this.A === null ? this.A = t : this.B === null && (this.B = t);
};
Zt.prototype.has = function(t) {
  return this.A !== null && t in this.A || this.B !== null && t in this.B;
};
function it(t, e, n, i, r) {
  for (const o in i) {
    const a = i[o], s = a.source, u = a.target, d = s === n ? u : s;
    if (e && e.has(d.key)) continue;
    const h = r(d.key, d.attributes);
    if (t && h) return d.key;
  }
}
function oi(t, e, n, i, r) {
  if (e !== "mixed") {
    if (e === "undirected")
      return it(
        t,
        null,
        i,
        i.undirected,
        r
      );
    if (typeof n == "string")
      return it(
        t,
        null,
        i,
        i[n],
        r
      );
  }
  const o = new Zt();
  let a;
  if (e !== "undirected") {
    if (n !== "out") {
      if (a = it(
        t,
        null,
        i,
        i.in,
        r
      ), t && a) return a;
      o.wrap(i.in);
    }
    if (n !== "in") {
      if (a = it(
        t,
        o,
        i,
        i.out,
        r
      ), t && a) return a;
      o.wrap(i.out);
    }
  }
  if (e !== "directed" && (a = it(
    t,
    o,
    i,
    i.undirected,
    r
  ), t && a))
    return a;
}
function Uu(t, e, n) {
  if (t !== "mixed") {
    if (t === "undirected") return Object.keys(n.undirected);
    if (typeof e == "string") return Object.keys(n[e]);
  }
  const i = [];
  return oi(!1, t, e, n, function(r) {
    i.push(r);
  }), i;
}
function rt(t, e, n) {
  const i = Object.keys(n), r = i.length;
  let o = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let a = null;
      do {
        if (o >= r)
          return t && t.wrap(n), { done: !0 };
        const s = n[i[o++]], u = s.source, d = s.target;
        if (a = u === e ? d : u, t && t.has(a.key)) {
          a = null;
          continue;
        }
      } while (a === null);
      return {
        done: !1,
        value: { neighbor: a.key, attributes: a.attributes }
      };
    }
  };
}
function Bu(t, e, n) {
  if (t !== "mixed") {
    if (t === "undirected")
      return rt(null, n, n.undirected);
    if (typeof e == "string")
      return rt(null, n, n[e]);
  }
  let i = Xe();
  const r = new Zt();
  return t !== "undirected" && (e !== "out" && (i = xe(
    i,
    rt(r, n, n.in)
  )), e !== "in" && (i = xe(
    i,
    rt(r, n, n.out)
  ))), t !== "directed" && (i = xe(
    i,
    rt(r, n, n.undirected)
  )), i;
}
function Hu(t, e) {
  const { name: n, type: i, direction: r } = e;
  t.prototype[n] = function(o) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return [];
    o = "" + o;
    const a = this._nodes.get(o);
    if (typeof a > "u")
      throw new T(
        `Graph.${n}: could not find the "${o}" node in the graph.`
      );
    return Uu(
      i === "mixed" ? this.type : i,
      r,
      a
    );
  };
}
function Wu(t, e) {
  const { name: n, type: i, direction: r } = e, o = "forEach" + n[0].toUpperCase() + n.slice(1, -1);
  t.prototype[o] = function(d, h) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type) return;
    d = "" + d;
    const l = this._nodes.get(d);
    if (typeof l > "u")
      throw new T(
        `Graph.${o}: could not find the "${d}" node in the graph.`
      );
    oi(
      !1,
      i === "mixed" ? this.type : i,
      r,
      l,
      h
    );
  };
  const a = "map" + n[0].toUpperCase() + n.slice(1);
  t.prototype[a] = function(d, h) {
    const l = [];
    return this[o](d, (c, f) => {
      l.push(h(c, f));
    }), l;
  };
  const s = "filter" + n[0].toUpperCase() + n.slice(1);
  t.prototype[s] = function(d, h) {
    const l = [];
    return this[o](d, (c, f) => {
      h(c, f) && l.push(c);
    }), l;
  };
  const u = "reduce" + n[0].toUpperCase() + n.slice(1);
  t.prototype[u] = function(d, h, l) {
    if (arguments.length < 3)
      throw new C(
        `Graph.${u}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    let c = l;
    return this[o](d, (f, g) => {
      c = h(c, f, g);
    }), c;
  };
}
function ju(t, e) {
  const { name: n, type: i, direction: r } = e, o = n[0].toUpperCase() + n.slice(1, -1), a = "find" + o;
  t.prototype[a] = function(d, h) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type) return;
    d = "" + d;
    const l = this._nodes.get(d);
    if (typeof l > "u")
      throw new T(
        `Graph.${a}: could not find the "${d}" node in the graph.`
      );
    return oi(
      !0,
      i === "mixed" ? this.type : i,
      r,
      l,
      h
    );
  };
  const s = "some" + o;
  t.prototype[s] = function(d, h) {
    return !!this[a](d, h);
  };
  const u = "every" + o;
  t.prototype[u] = function(d, h) {
    return !this[a](d, (c, f) => !h(c, f));
  };
}
function Vu(t, e) {
  const { name: n, type: i, direction: r } = e, o = n.slice(0, -1) + "Entries";
  t.prototype[o] = function(a) {
    if (i !== "mixed" && this.type !== "mixed" && i !== this.type)
      return Xe();
    a = "" + a;
    const s = this._nodes.get(a);
    if (typeof s > "u")
      throw new T(
        `Graph.${o}: could not find the "${a}" node in the graph.`
      );
    return Bu(
      i === "mixed" ? this.type : i,
      r,
      s
    );
  };
}
function Yu(t) {
  Ou.forEach((e) => {
    Hu(t, e), Wu(t, e), ju(t, e), Vu(t, e);
  });
}
function wt(t, e, n, i, r) {
  const o = i._nodes.values(), a = i.type;
  let s, u, d, h, l, c;
  for (; s = o.next(), s.done !== !0; ) {
    let f = !1;
    if (u = s.value, a !== "undirected") {
      h = u.out;
      for (d in h) {
        l = h[d];
        do
          c = l.target, f = !0, r(
            u.key,
            c.key,
            u.attributes,
            c.attributes,
            l.key,
            l.attributes,
            l.undirected
          ), l = l.next;
        while (l);
      }
    }
    if (a !== "directed") {
      h = u.undirected;
      for (d in h)
        if (!(e && u.key > d)) {
          l = h[d];
          do
            c = l.target, c.key !== d && (c = l.source), f = !0, r(
              u.key,
              c.key,
              u.attributes,
              c.attributes,
              l.key,
              l.attributes,
              l.undirected
            ), l = l.next;
          while (l);
        }
    }
    n && !f && r(
      u.key,
      null,
      u.attributes,
      null,
      null,
      null,
      null
    );
  }
}
function qu(t, e) {
  const n = { key: t };
  return ro(e.attributes) || (n.attributes = B({}, e.attributes)), n;
}
function Ku(t, e, n) {
  const i = {
    key: e,
    source: n.source.key,
    target: n.target.key
  };
  return ro(n.attributes) || (i.attributes = B({}, n.attributes)), t === "mixed" && n.undirected && (i.undirected = !0), i;
}
function Xu(t) {
  if (!W(t))
    throw new C(
      'Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.'
    );
  if (!("key" in t))
    throw new C(
      "Graph.import: serialized node is missing its key."
    );
  if ("attributes" in t && (!W(t.attributes) || t.attributes === null))
    throw new C(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
}
function Zu(t) {
  if (!W(t))
    throw new C(
      'Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.'
    );
  if (!("source" in t))
    throw new C(
      "Graph.import: serialized edge is missing its source."
    );
  if (!("target" in t))
    throw new C(
      "Graph.import: serialized edge is missing its target."
    );
  if ("attributes" in t && (!W(t.attributes) || t.attributes === null))
    throw new C(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
  if ("undirected" in t && typeof t.undirected != "boolean")
    throw new C(
      "Graph.import: invalid undirectedness information. Undirected should be boolean or omitted."
    );
}
const Ju = eu(), Qu = /* @__PURE__ */ new Set(["directed", "undirected", "mixed"]), Zi = /* @__PURE__ */ new Set([
  "domain",
  "_events",
  "_eventsCount",
  "_maxListeners"
]), ed = [
  {
    name: (t) => `${t}Edge`,
    generateKey: !0
  },
  {
    name: (t) => `${t}DirectedEdge`,
    generateKey: !0,
    type: "directed"
  },
  {
    name: (t) => `${t}UndirectedEdge`,
    generateKey: !0,
    type: "undirected"
  },
  {
    name: (t) => `${t}EdgeWithKey`
  },
  {
    name: (t) => `${t}DirectedEdgeWithKey`,
    type: "directed"
  },
  {
    name: (t) => `${t}UndirectedEdgeWithKey`,
    type: "undirected"
  }
], td = {
  allowSelfLoops: !0,
  multi: !1,
  type: "mixed"
};
function nd(t, e, n) {
  if (n && !W(n))
    throw new C(
      `Graph.addNode: invalid attributes. Expecting an object but got "${n}"`
    );
  if (e = "" + e, n = n || {}, t._nodes.has(e))
    throw new D(
      `Graph.addNode: the "${e}" node already exist in the graph.`
    );
  const i = new t.NodeDataClass(e, n);
  return t._nodes.set(e, i), t.emit("nodeAdded", {
    key: e,
    attributes: n
  }), i;
}
function Ji(t, e, n) {
  const i = new t.NodeDataClass(e, n);
  return t._nodes.set(e, i), t.emit("nodeAdded", {
    key: e,
    attributes: n
  }), i;
}
function fo(t, e, n, i, r, o, a, s) {
  if (!i && t.type === "undirected")
    throw new D(
      `Graph.${e}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`
    );
  if (i && t.type === "directed")
    throw new D(
      `Graph.${e}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`
    );
  if (s && !W(s))
    throw new C(
      `Graph.${e}: invalid attributes. Expecting an object but got "${s}"`
    );
  if (o = "" + o, a = "" + a, s = s || {}, !t.allowSelfLoops && o === a)
    throw new D(
      `Graph.${e}: source & target are the same ("${o}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  const u = t._nodes.get(o), d = t._nodes.get(a);
  if (!u)
    throw new T(
      `Graph.${e}: source node "${o}" not found.`
    );
  if (!d)
    throw new T(
      `Graph.${e}: target node "${a}" not found.`
    );
  const h = {
    key: null,
    undirected: i,
    source: o,
    target: a,
    attributes: s
  };
  if (n)
    r = t._edgeKeyGenerator();
  else if (r = "" + r, t._edges.has(r))
    throw new D(
      `Graph.${e}: the "${r}" edge already exists in the graph.`
    );
  if (!t.multi && (i ? typeof u.undirected[a] < "u" : typeof u.out[a] < "u"))
    throw new D(
      `Graph.${e}: an edge linking "${o}" to "${a}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`
    );
  const l = new Ze(
    i,
    r,
    u,
    d,
    s
  );
  t._edges.set(r, l);
  const c = o === a;
  return i ? (u.undirectedDegree++, d.undirectedDegree++, c && (u.undirectedLoops++, t._undirectedSelfLoopCount++)) : (u.outDegree++, d.inDegree++, c && (u.directedLoops++, t._directedSelfLoopCount++)), t.multi ? l.attachMulti() : l.attach(), i ? t._undirectedSize++ : t._directedSize++, h.key = r, t.emit("edgeAdded", h), r;
}
function id(t, e, n, i, r, o, a, s, u) {
  if (!i && t.type === "undirected")
    throw new D(
      `Graph.${e}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`
    );
  if (i && t.type === "directed")
    throw new D(
      `Graph.${e}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`
    );
  if (s) {
    if (u) {
      if (typeof s != "function")
        throw new C(
          `Graph.${e}: invalid updater function. Expecting a function but got "${s}"`
        );
    } else if (!W(s))
      throw new C(
        `Graph.${e}: invalid attributes. Expecting an object but got "${s}"`
      );
  }
  o = "" + o, a = "" + a;
  let d;
  if (u && (d = s, s = void 0), !t.allowSelfLoops && o === a)
    throw new D(
      `Graph.${e}: source & target are the same ("${o}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  let h = t._nodes.get(o), l = t._nodes.get(a), c, f;
  if (!n && (c = t._edges.get(r), c)) {
    if ((c.source.key !== o || c.target.key !== a) && (!i || c.source.key !== a || c.target.key !== o))
      throw new D(
        `Graph.${e}: inconsistency detected when attempting to merge the "${r}" edge with "${o}" source & "${a}" target vs. ("${c.source.key}", "${c.target.key}").`
      );
    f = c;
  }
  if (!f && !t.multi && h && (f = i ? h.undirected[a] : h.out[a]), f) {
    const _ = [f.key, !1, !1, !1];
    if (u ? !d : !s) return _;
    if (u) {
      const S = f.attributes;
      f.attributes = d(S), t.emit("edgeAttributesUpdated", {
        type: "replace",
        key: f.key,
        attributes: f.attributes
      });
    } else
      B(f.attributes, s), t.emit("edgeAttributesUpdated", {
        type: "merge",
        key: f.key,
        attributes: f.attributes,
        data: s
      });
    return _;
  }
  s = s || {}, u && d && (s = d(s));
  const g = {
    key: null,
    undirected: i,
    source: o,
    target: a,
    attributes: s
  };
  if (n)
    r = t._edgeKeyGenerator();
  else if (r = "" + r, t._edges.has(r))
    throw new D(
      `Graph.${e}: the "${r}" edge already exists in the graph.`
    );
  let v = !1, y = !1;
  h || (h = Ji(t, o, {}), v = !0, o === a && (l = h, y = !0)), l || (l = Ji(t, a, {}), y = !0), c = new Ze(i, r, h, l, s), t._edges.set(r, c);
  const x = o === a;
  return i ? (h.undirectedDegree++, l.undirectedDegree++, x && (h.undirectedLoops++, t._undirectedSelfLoopCount++)) : (h.outDegree++, l.inDegree++, x && (h.directedLoops++, t._directedSelfLoopCount++)), t.multi ? c.attachMulti() : c.attach(), i ? t._undirectedSize++ : t._directedSize++, g.key = r, t.emit("edgeAdded", g), [r, !0, v, y];
}
function ze(t, e) {
  t._edges.delete(e.key);
  const { source: n, target: i, attributes: r } = e, o = e.undirected, a = n === i;
  o ? (n.undirectedDegree--, i.undirectedDegree--, a && (n.undirectedLoops--, t._undirectedSelfLoopCount--)) : (n.outDegree--, i.inDegree--, a && (n.directedLoops--, t._directedSelfLoopCount--)), t.multi ? e.detachMulti() : e.detach(), o ? t._undirectedSize-- : t._directedSize--, t.emit("edgeDropped", {
    key: e.key,
    attributes: r,
    source: n.key,
    target: i.key,
    undirected: o
  });
}
class M extends to.EventEmitter {
  constructor(e) {
    if (super(), e = B({}, td, e), typeof e.multi != "boolean")
      throw new C(
        `Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${e.multi}".`
      );
    if (!Qu.has(e.type))
      throw new C(
        `Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${e.type}".`
      );
    if (typeof e.allowSelfLoops != "boolean")
      throw new C(
        `Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${e.allowSelfLoops}".`
      );
    const n = e.type === "mixed" ? oo : e.type === "directed" ? ao : so;
    ie(this, "NodeDataClass", n);
    const i = "geid_" + Ju() + "_";
    let r = 0;
    const o = () => {
      let a;
      do
        a = i + r++;
      while (this._edges.has(a));
      return a;
    };
    ie(this, "_attributes", {}), ie(this, "_nodes", /* @__PURE__ */ new Map()), ie(this, "_edges", /* @__PURE__ */ new Map()), ie(this, "_directedSize", 0), ie(this, "_undirectedSize", 0), ie(this, "_directedSelfLoopCount", 0), ie(this, "_undirectedSelfLoopCount", 0), ie(this, "_edgeKeyGenerator", o), ie(this, "_options", e), Zi.forEach((a) => ie(this, a, this[a])), ue(this, "order", () => this._nodes.size), ue(this, "size", () => this._edges.size), ue(this, "directedSize", () => this._directedSize), ue(this, "undirectedSize", () => this._undirectedSize), ue(
      this,
      "selfLoopCount",
      () => this._directedSelfLoopCount + this._undirectedSelfLoopCount
    ), ue(
      this,
      "directedSelfLoopCount",
      () => this._directedSelfLoopCount
    ), ue(
      this,
      "undirectedSelfLoopCount",
      () => this._undirectedSelfLoopCount
    ), ue(this, "multi", this._options.multi), ue(this, "type", this._options.type), ue(this, "allowSelfLoops", this._options.allowSelfLoops), ue(this, "implementation", () => "graphology");
  }
  _resetInstanceCounters() {
    this._directedSize = 0, this._undirectedSize = 0, this._directedSelfLoopCount = 0, this._undirectedSelfLoopCount = 0;
  }
  /**---------------------------------------------------------------------------
   * Read
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning whether the given node is found in the graph.
   *
   * @param  {any}     node - The node.
   * @return {boolean}
   */
  hasNode(e) {
    return this._nodes.has("" + e);
  }
  /**
   * Method returning whether the given directed edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasDirectedEdge(e, n) {
    if (this.type === "undirected") return !1;
    if (arguments.length === 1) {
      const i = "" + e, r = this._edges.get(i);
      return !!r && !r.undirected;
    } else if (arguments.length === 2) {
      e = "" + e, n = "" + n;
      const i = this._nodes.get(e);
      return i ? i.out.hasOwnProperty(n) : !1;
    }
    throw new C(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given undirected edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasUndirectedEdge(e, n) {
    if (this.type === "directed") return !1;
    if (arguments.length === 1) {
      const i = "" + e, r = this._edges.get(i);
      return !!r && r.undirected;
    } else if (arguments.length === 2) {
      e = "" + e, n = "" + n;
      const i = this._nodes.get(e);
      return i ? i.undirected.hasOwnProperty(n) : !1;
    }
    throw new C(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasEdge(e, n) {
    if (arguments.length === 1) {
      const i = "" + e;
      return this._edges.has(i);
    } else if (arguments.length === 2) {
      e = "" + e, n = "" + n;
      const i = this._nodes.get(e);
      return i ? typeof i.out < "u" && i.out.hasOwnProperty(n) || typeof i.undirected < "u" && i.undirected.hasOwnProperty(n) : !1;
    }
    throw new C(
      `Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning the edge matching source & target in a directed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  directedEdge(e, n) {
    if (this.type === "undirected") return;
    if (e = "" + e, n = "" + n, this.multi)
      throw new D(
        "Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead."
      );
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.directedEdge: could not find the "${e}" source node in the graph.`
      );
    if (!this._nodes.has(n))
      throw new T(
        `Graph.directedEdge: could not find the "${n}" target node in the graph.`
      );
    const r = i.out && i.out[n] || void 0;
    if (r) return r.key;
  }
  /**
   * Method returning the edge matching source & target in a undirected fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  undirectedEdge(e, n) {
    if (this.type === "directed") return;
    if (e = "" + e, n = "" + n, this.multi)
      throw new D(
        "Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead."
      );
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.undirectedEdge: could not find the "${e}" source node in the graph.`
      );
    if (!this._nodes.has(n))
      throw new T(
        `Graph.undirectedEdge: could not find the "${n}" target node in the graph.`
      );
    const r = i.undirected && i.undirected[n] || void 0;
    if (r) return r.key;
  }
  /**
   * Method returning the edge matching source & target in a mixed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  edge(e, n) {
    if (this.multi)
      throw new D(
        "Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead."
      );
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.edge: could not find the "${e}" source node in the graph.`
      );
    if (!this._nodes.has(n))
      throw new T(
        `Graph.edge: could not find the "${n}" target node in the graph.`
      );
    const r = i.out && i.out[n] || i.undirected && i.undirected[n] || void 0;
    if (r) return r.key;
  }
  /**
   * Method returning whether two nodes are directed neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areDirectedNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areDirectedNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? !1 : n in i.in || n in i.out;
  }
  /**
   * Method returning whether two nodes are out neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areOutNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? !1 : n in i.out;
  }
  /**
   * Method returning whether two nodes are in neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areInNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? !1 : n in i.in;
  }
  /**
   * Method returning whether two nodes are undirected neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areUndirectedNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areUndirectedNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type === "directed" ? !1 : n in i.undirected;
  }
  /**
   * Method returning whether two nodes are neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type !== "undirected" && (n in i.in || n in i.out) || this.type !== "directed" && n in i.undirected;
  }
  /**
   * Method returning whether two nodes are inbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInboundNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areInboundNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type !== "undirected" && n in i.in || this.type !== "directed" && n in i.undirected;
  }
  /**
   * Method returning whether two nodes are outbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutboundNeighbors(e, n) {
    e = "" + e, n = "" + n;
    const i = this._nodes.get(e);
    if (!i)
      throw new T(
        `Graph.areOutboundNeighbors: could not find the "${e}" node in the graph.`
      );
    return this.type !== "undirected" && n in i.out || this.type !== "directed" && n in i.undirected;
  }
  /**
   * Method returning the given node's in degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.inDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : n.inDegree;
  }
  /**
   * Method returning the given node's out degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.outDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : n.outDegree;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.directedDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : n.inDegree + n.outDegree;
  }
  /**
   * Method returning the given node's undirected degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.undirectedDegree: could not find the "${e}" node in the graph.`
      );
    return this.type === "directed" ? 0 : n.undirectedDegree;
  }
  /**
   * Method returning the given node's inbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.inboundDegree: could not find the "${e}" node in the graph.`
      );
    let i = 0;
    return this.type !== "directed" && (i += n.undirectedDegree), this.type !== "undirected" && (i += n.inDegree), i;
  }
  /**
   * Method returning the given node's outbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.outboundDegree: could not find the "${e}" node in the graph.`
      );
    let i = 0;
    return this.type !== "directed" && (i += n.undirectedDegree), this.type !== "undirected" && (i += n.outDegree), i;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degree(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.degree: could not find the "${e}" node in the graph.`
      );
    let i = 0;
    return this.type !== "directed" && (i += n.undirectedDegree), this.type !== "undirected" && (i += n.inDegree + n.outDegree), i;
  }
  /**
   * Method returning the given node's in degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.inDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : n.inDegree - n.directedLoops;
  }
  /**
   * Method returning the given node's out degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.outDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : n.outDegree - n.directedLoops;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.directedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "undirected" ? 0 : n.inDegree + n.outDegree - n.directedLoops * 2;
  }
  /**
   * Method returning the given node's undirected degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.undirectedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    return this.type === "directed" ? 0 : n.undirectedDegree - n.undirectedLoops * 2;
  }
  /**
   * Method returning the given node's inbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.inboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    let i = 0, r = 0;
    return this.type !== "directed" && (i += n.undirectedDegree, r += n.undirectedLoops * 2), this.type !== "undirected" && (i += n.inDegree, r += n.directedLoops), i - r;
  }
  /**
   * Method returning the given node's outbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.outboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    let i = 0, r = 0;
    return this.type !== "directed" && (i += n.undirectedDegree, r += n.undirectedLoops * 2), this.type !== "undirected" && (i += n.outDegree, r += n.directedLoops), i - r;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degreeWithoutSelfLoops(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.degreeWithoutSelfLoops: could not find the "${e}" node in the graph.`
      );
    let i = 0, r = 0;
    return this.type !== "directed" && (i += n.undirectedDegree, r += n.undirectedLoops * 2), this.type !== "undirected" && (i += n.inDegree + n.outDegree, r += n.directedLoops * 2), i - r;
  }
  /**
   * Method returning the given edge's source.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's source.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  source(e) {
    e = "" + e;
    const n = this._edges.get(e);
    if (!n)
      throw new T(
        `Graph.source: could not find the "${e}" edge in the graph.`
      );
    return n.source.key;
  }
  /**
   * Method returning the given edge's target.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's target.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  target(e) {
    e = "" + e;
    const n = this._edges.get(e);
    if (!n)
      throw new T(
        `Graph.target: could not find the "${e}" edge in the graph.`
      );
    return n.target.key;
  }
  /**
   * Method returning the given edge's extremities.
   *
   * @param  {any}   edge - The edge's key.
   * @return {array}      - The edge's extremities.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  extremities(e) {
    e = "" + e;
    const n = this._edges.get(e);
    if (!n)
      throw new T(
        `Graph.extremities: could not find the "${e}" edge in the graph.`
      );
    return [n.source.key, n.target.key];
  }
  /**
   * Given a node & an edge, returns the other extremity of the edge.
   *
   * @param  {any}   node - The node's key.
   * @param  {any}   edge - The edge's key.
   * @return {any}        - The related node.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph or if the
   *                   edge & node are not related.
   */
  opposite(e, n) {
    e = "" + e, n = "" + n;
    const i = this._edges.get(n);
    if (!i)
      throw new T(
        `Graph.opposite: could not find the "${n}" edge in the graph.`
      );
    const r = i.source.key, o = i.target.key;
    if (e === r) return o;
    if (e === o) return r;
    throw new T(
      `Graph.opposite: the "${e}" node is not attached to the "${n}" edge (${r}, ${o}).`
    );
  }
  /**
   * Returns whether the given edge has the given node as extremity.
   *
   * @param  {any}     edge - The edge's key.
   * @param  {any}     node - The node's key.
   * @return {boolean}      - The related node.
   *
   * @throws {Error} - Will throw if either the node or the edge isn't in the graph.
   */
  hasExtremity(e, n) {
    e = "" + e, n = "" + n;
    const i = this._edges.get(e);
    if (!i)
      throw new T(
        `Graph.hasExtremity: could not find the "${e}" edge in the graph.`
      );
    return i.source.key === n || i.target.key === n;
  }
  /**
   * Method returning whether the given edge is undirected.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isUndirected(e) {
    e = "" + e;
    const n = this._edges.get(e);
    if (!n)
      throw new T(
        `Graph.isUndirected: could not find the "${e}" edge in the graph.`
      );
    return n.undirected;
  }
  /**
   * Method returning whether the given edge is directed.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isDirected(e) {
    e = "" + e;
    const n = this._edges.get(e);
    if (!n)
      throw new T(
        `Graph.isDirected: could not find the "${e}" edge in the graph.`
      );
    return !n.undirected;
  }
  /**
   * Method returning whether the given edge is a self loop.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isSelfLoop(e) {
    e = "" + e;
    const n = this._edges.get(e);
    if (!n)
      throw new T(
        `Graph.isSelfLoop: could not find the "${e}" edge in the graph.`
      );
    return n.source === n.target;
  }
  /**---------------------------------------------------------------------------
   * Mutation
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to add a node to the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   *
   * @throws {Error} - Will throw if the given node already exist.
   * @throws {Error} - Will throw if the given attributes are not an object.
   */
  addNode(e, n) {
    return nd(this, e, n).key;
  }
  /**
   * Method used to merge a node into the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   */
  mergeNode(e, n) {
    if (n && !W(n))
      throw new C(
        `Graph.mergeNode: invalid attributes. Expecting an object but got "${n}"`
      );
    e = "" + e, n = n || {};
    let i = this._nodes.get(e);
    return i ? (n && (B(i.attributes, n), this.emit("nodeAttributesUpdated", {
      type: "merge",
      key: e,
      attributes: i.attributes,
      data: n
    })), [e, !1]) : (i = new this.NodeDataClass(e, n), this._nodes.set(e, i), this.emit("nodeAdded", {
      key: e,
      attributes: n
    }), [e, !0]);
  }
  /**
   * Method used to add a node if it does not exist in the graph or else to
   * update its attributes using a function.
   *
   * @param  {any}      node      - The node.
   * @param  {function} [updater] - Optional updater function.
   * @return {any}                - The node.
   */
  updateNode(e, n) {
    if (n && typeof n != "function")
      throw new C(
        `Graph.updateNode: invalid updater function. Expecting a function but got "${n}"`
      );
    e = "" + e;
    let i = this._nodes.get(e);
    if (i) {
      if (n) {
        const o = i.attributes;
        i.attributes = n(o), this.emit("nodeAttributesUpdated", {
          type: "replace",
          key: e,
          attributes: i.attributes
        });
      }
      return [e, !1];
    }
    const r = n ? n({}) : {};
    return i = new this.NodeDataClass(e, r), this._nodes.set(e, i), this.emit("nodeAdded", {
      key: e,
      attributes: r
    }), [e, !0];
  }
  /**
   * Method used to drop a single node & all its attached edges from the graph.
   *
   * @param  {any}    node - The node.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node doesn't exist.
   */
  dropNode(e) {
    e = "" + e;
    const n = this._nodes.get(e);
    if (!n)
      throw new T(
        `Graph.dropNode: could not find the "${e}" node in the graph.`
      );
    let i;
    if (this.type !== "undirected") {
      for (const r in n.out) {
        i = n.out[r];
        do
          ze(this, i), i = i.next;
        while (i);
      }
      for (const r in n.in) {
        i = n.in[r];
        do
          ze(this, i), i = i.next;
        while (i);
      }
    }
    if (this.type !== "directed")
      for (const r in n.undirected) {
        i = n.undirected[r];
        do
          ze(this, i), i = i.next;
        while (i);
      }
    this._nodes.delete(e), this.emit("nodeDropped", {
      key: e,
      attributes: n.attributes
    });
  }
  /**
   * Method used to drop a single edge from the graph.
   *
   * Arity 1:
   * @param  {any}    edge - The edge.
   *
   * Arity 2:
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropEdge(e) {
    let n;
    if (arguments.length > 1) {
      const i = "" + arguments[0], r = "" + arguments[1];
      if (n = re(this, i, r, this.type), !n)
        throw new T(
          `Graph.dropEdge: could not find the "${i}" -> "${r}" edge in the graph.`
        );
    } else if (e = "" + e, n = this._edges.get(e), !n)
      throw new T(
        `Graph.dropEdge: could not find the "${e}" edge in the graph.`
      );
    return ze(this, n), this;
  }
  /**
   * Method used to drop a single directed edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropDirectedEdge(e, n) {
    if (arguments.length < 2)
      throw new D(
        "Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new D(
        "Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    e = "" + e, n = "" + n;
    const i = re(this, e, n, "directed");
    if (!i)
      throw new T(
        `Graph.dropDirectedEdge: could not find a "${e}" -> "${n}" edge in the graph.`
      );
    return ze(this, i), this;
  }
  /**
   * Method used to drop a single undirected edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropUndirectedEdge(e, n) {
    if (arguments.length < 2)
      throw new D(
        "Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new D(
        "Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    const i = re(this, e, n, "undirected");
    if (!i)
      throw new T(
        `Graph.dropUndirectedEdge: could not find a "${e}" -> "${n}" edge in the graph.`
      );
    return ze(this, i), this;
  }
  /**
   * Method used to remove every edge & every node from the graph.
   *
   * @return {Graph}
   */
  clear() {
    this._edges.clear(), this._nodes.clear(), this._resetInstanceCounters(), this.emit("cleared");
  }
  /**
   * Method used to remove every edge from the graph.
   *
   * @return {Graph}
   */
  clearEdges() {
    const e = this._nodes.values();
    let n;
    for (; n = e.next(), n.done !== !0; )
      n.value.clear();
    this._edges.clear(), this._resetInstanceCounters(), this.emit("edgesCleared");
  }
  /**---------------------------------------------------------------------------
   * Attributes-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning the desired graph's attribute.
   *
   * @param  {string} name - Name of the attribute.
   * @return {any}
   */
  getAttribute(e) {
    return this._attributes[e];
  }
  /**
   * Method returning the graph's attributes.
   *
   * @return {object}
   */
  getAttributes() {
    return this._attributes;
  }
  /**
   * Method returning whether the graph has the desired attribute.
   *
   * @param  {string}  name - Name of the attribute.
   * @return {boolean}
   */
  hasAttribute(e) {
    return this._attributes.hasOwnProperty(e);
  }
  /**
   * Method setting a value for the desired graph's attribute.
   *
   * @param  {string}  name  - Name of the attribute.
   * @param  {any}     value - Value for the attribute.
   * @return {Graph}
   */
  setAttribute(e, n) {
    return this._attributes[e] = n, this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name: e
    }), this;
  }
  /**
   * Method using a function to update the desired graph's attribute's value.
   *
   * @param  {string}   name    - Name of the attribute.
   * @param  {function} updater - Function use to update the attribute's value.
   * @return {Graph}
   */
  updateAttribute(e, n) {
    if (typeof n != "function")
      throw new C(
        "Graph.updateAttribute: updater should be a function."
      );
    const i = this._attributes[e];
    return this._attributes[e] = n(i), this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name: e
    }), this;
  }
  /**
   * Method removing the desired graph's attribute.
   *
   * @param  {string} name  - Name of the attribute.
   * @return {Graph}
   */
  removeAttribute(e) {
    return delete this._attributes[e], this.emit("attributesUpdated", {
      type: "remove",
      attributes: this._attributes,
      name: e
    }), this;
  }
  /**
   * Method replacing the graph's attributes.
   *
   * @param  {object} attributes - New attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  replaceAttributes(e) {
    if (!W(e))
      throw new C(
        "Graph.replaceAttributes: provided attributes are not a plain object."
      );
    return this._attributes = e, this.emit("attributesUpdated", {
      type: "replace",
      attributes: this._attributes
    }), this;
  }
  /**
   * Method merging the graph's attributes.
   *
   * @param  {object} attributes - Attributes to merge.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  mergeAttributes(e) {
    if (!W(e))
      throw new C(
        "Graph.mergeAttributes: provided attributes are not a plain object."
      );
    return B(this._attributes, e), this.emit("attributesUpdated", {
      type: "merge",
      attributes: this._attributes,
      data: e
    }), this;
  }
  /**
   * Method updating the graph's attributes.
   *
   * @param  {function} updater - Function used to update the attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given updater is not a function.
   */
  updateAttributes(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.updateAttributes: provided updater is not a function."
      );
    return this._attributes = e(this._attributes), this.emit("attributesUpdated", {
      type: "update",
      attributes: this._attributes
    }), this;
  }
  /**
   * Method used to update each node's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachNodeAttributes(e, n) {
    if (typeof e != "function")
      throw new C(
        "Graph.updateEachNodeAttributes: expecting an updater function."
      );
    if (n && !Xi(n))
      throw new C(
        "Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const i = this._nodes.values();
    let r, o;
    for (; r = i.next(), r.done !== !0; )
      o = r.value, o.attributes = e(o.key, o.attributes);
    this.emit("eachNodeAttributesUpdated", {
      hints: n || null
    });
  }
  /**
   * Method used to update each edge's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachEdgeAttributes(e, n) {
    if (typeof e != "function")
      throw new C(
        "Graph.updateEachEdgeAttributes: expecting an updater function."
      );
    if (n && !Xi(n))
      throw new C(
        "Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const i = this._edges.values();
    let r, o, a, s;
    for (; r = i.next(), r.done !== !0; )
      o = r.value, a = o.source, s = o.target, o.attributes = e(
        o.key,
        o.attributes,
        a.key,
        s.key,
        a.attributes,
        s.attributes,
        o.undirected
      );
    this.emit("eachEdgeAttributesUpdated", {
      hints: n || null
    });
  }
  /**---------------------------------------------------------------------------
   * Iteration-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method iterating over the graph's adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAdjacencyEntry(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.forEachAdjacencyEntry: expecting a callback."
      );
    wt(!1, !1, !1, this, e);
  }
  forEachAdjacencyEntryWithOrphans(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.forEachAdjacencyEntryWithOrphans: expecting a callback."
      );
    wt(!1, !1, !0, this, e);
  }
  /**
   * Method iterating over the graph's assymetric adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAssymetricAdjacencyEntry(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.forEachAssymetricAdjacencyEntry: expecting a callback."
      );
    wt(!1, !0, !1, this, e);
  }
  forEachAssymetricAdjacencyEntryWithOrphans(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback."
      );
    wt(!1, !0, !0, this, e);
  }
  /**
   * Method returning the list of the graph's nodes.
   *
   * @return {array} - The nodes.
   */
  nodes() {
    return Array.from(this._nodes.keys());
  }
  /**
   * Method iterating over the graph's nodes using the given callback.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNode(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.forEachNode: expecting a callback."
      );
    const n = this._nodes.values();
    let i, r;
    for (; i = n.next(), i.done !== !0; )
      r = i.value, e(r.key, r.attributes);
  }
  /**
   * Method iterating attempting to find a node matching the given predicate
   * function.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  findNode(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.findNode: expecting a callback."
      );
    const n = this._nodes.values();
    let i, r;
    for (; i = n.next(), i.done !== !0; )
      if (r = i.value, e(r.key, r.attributes)) return r.key;
  }
  /**
   * Method mapping nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  mapNodes(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.mapNode: expecting a callback."
      );
    const n = this._nodes.values();
    let i, r;
    const o = new Array(this.order);
    let a = 0;
    for (; i = n.next(), i.done !== !0; )
      r = i.value, o[a++] = e(r.key, r.attributes);
    return o;
  }
  /**
   * Method returning whether some node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  someNode(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.someNode: expecting a callback."
      );
    const n = this._nodes.values();
    let i, r;
    for (; i = n.next(), i.done !== !0; )
      if (r = i.value, e(r.key, r.attributes)) return !0;
    return !1;
  }
  /**
   * Method returning whether all node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  everyNode(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.everyNode: expecting a callback."
      );
    const n = this._nodes.values();
    let i, r;
    for (; i = n.next(), i.done !== !0; )
      if (r = i.value, !e(r.key, r.attributes)) return !1;
    return !0;
  }
  /**
   * Method filtering nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  filterNodes(e) {
    if (typeof e != "function")
      throw new C(
        "Graph.filterNodes: expecting a callback."
      );
    const n = this._nodes.values();
    let i, r;
    const o = [];
    for (; i = n.next(), i.done !== !0; )
      r = i.value, e(r.key, r.attributes) && o.push(r.key);
    return o;
  }
  /**
   * Method reducing nodes.
   *
   * @param  {function}  callback - Callback (accumulator, key, attributes).
   */
  reduceNodes(e, n) {
    if (typeof e != "function")
      throw new C(
        "Graph.reduceNodes: expecting a callback."
      );
    if (arguments.length < 2)
      throw new C(
        "Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."
      );
    let i = n;
    const r = this._nodes.values();
    let o, a;
    for (; o = r.next(), o.done !== !0; )
      a = o.value, i = e(i, a.key, a.attributes);
    return i;
  }
  /**
   * Method returning an iterator over the graph's node entries.
   *
   * @return {Iterator}
   */
  nodeEntries() {
    const e = this._nodes.values();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const n = e.next();
        if (n.done) return n;
        const i = n.value;
        return {
          value: { node: i.key, attributes: i.attributes },
          done: !1
        };
      }
    };
  }
  /**---------------------------------------------------------------------------
   * Serialization
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to export the whole graph.
   *
   * @return {object} - The serialized graph.
   */
  export() {
    const e = new Array(this._nodes.size);
    let n = 0;
    this._nodes.forEach((r, o) => {
      e[n++] = qu(o, r);
    });
    const i = new Array(this._edges.size);
    return n = 0, this._edges.forEach((r, o) => {
      i[n++] = Ku(this.type, o, r);
    }), {
      options: {
        type: this.type,
        multi: this.multi,
        allowSelfLoops: this.allowSelfLoops
      },
      attributes: this.getAttributes(),
      nodes: e,
      edges: i
    };
  }
  /**
   * Method used to import a serialized graph.
   *
   * @param  {object|Graph} data  - The serialized graph.
   * @param  {boolean}      merge - Whether to merge data.
   * @return {Graph}              - Returns itself for chaining.
   */
  import(e, n = !1) {
    if (e instanceof M)
      return e.forEachNode((u, d) => {
        n ? this.mergeNode(u, d) : this.addNode(u, d);
      }), e.forEachEdge((u, d, h, l, c, f, g) => {
        n ? g ? this.mergeUndirectedEdgeWithKey(u, h, l, d) : this.mergeDirectedEdgeWithKey(u, h, l, d) : g ? this.addUndirectedEdgeWithKey(u, h, l, d) : this.addDirectedEdgeWithKey(u, h, l, d);
      }), this;
    if (!W(e))
      throw new C(
        "Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance."
      );
    if (e.attributes) {
      if (!W(e.attributes))
        throw new C(
          "Graph.import: invalid attributes. Expecting a plain object."
        );
      n ? this.mergeAttributes(e.attributes) : this.replaceAttributes(e.attributes);
    }
    let i, r, o, a, s;
    if (e.nodes) {
      if (o = e.nodes, !Array.isArray(o))
        throw new C(
          "Graph.import: invalid nodes. Expecting an array."
        );
      for (i = 0, r = o.length; i < r; i++) {
        a = o[i], Xu(a);
        const { key: u, attributes: d } = a;
        n ? this.mergeNode(u, d) : this.addNode(u, d);
      }
    }
    if (e.edges) {
      let u = !1;
      if (this.type === "undirected" && (u = !0), o = e.edges, !Array.isArray(o))
        throw new C(
          "Graph.import: invalid edges. Expecting an array."
        );
      for (i = 0, r = o.length; i < r; i++) {
        s = o[i], Zu(s);
        const {
          source: d,
          target: h,
          attributes: l,
          undirected: c = u
        } = s;
        let f;
        "key" in s ? (f = n ? c ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey : c ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey, f.call(this, s.key, d, h, l)) : (f = n ? c ? this.mergeUndirectedEdge : this.mergeDirectedEdge : c ? this.addUndirectedEdge : this.addDirectedEdge, f.call(this, d, h, l));
      }
    }
    return this;
  }
  /**---------------------------------------------------------------------------
   * Utils
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning a null copy of the graph, i.e. a graph without nodes
   * & edges but with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The null copy.
   */
  nullCopy(e) {
    const n = new M(B({}, this._options, e));
    return n.replaceAttributes(B({}, this.getAttributes())), n;
  }
  /**
   * Method returning an empty copy of the graph, i.e. a graph without edges but
   * with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The empty copy.
   */
  emptyCopy(e) {
    const n = this.nullCopy(e);
    return this._nodes.forEach((i, r) => {
      const o = B({}, i.attributes);
      i = new n.NodeDataClass(r, o), n._nodes.set(r, i);
    }), n;
  }
  /**
   * Method returning an exact copy of the graph.
   *
   * @param  {object} options - Upgrade options.
   * @return {Graph}          - The copy.
   */
  copy(e) {
    if (e = e || {}, typeof e.type == "string" && e.type !== this.type && e.type !== "mixed")
      throw new D(
        `Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${e.type}" because this would mean losing information about the current graph.`
      );
    if (typeof e.multi == "boolean" && e.multi !== this.multi && e.multi !== !0)
      throw new D(
        "Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph."
      );
    if (typeof e.allowSelfLoops == "boolean" && e.allowSelfLoops !== this.allowSelfLoops && e.allowSelfLoops !== !0)
      throw new D(
        "Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph."
      );
    const n = this.emptyCopy(e), i = this._edges.values();
    let r, o;
    for (; r = i.next(), r.done !== !0; )
      o = r.value, fo(
        n,
        "copy",
        !1,
        o.undirected,
        o.key,
        o.source.key,
        o.target.key,
        B({}, o.attributes)
      );
    return n;
  }
  /**---------------------------------------------------------------------------
   * Known methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method used by JavaScript to perform JSON serialization.
   *
   * @return {object} - The serialized graph.
   */
  toJSON() {
    return this.export();
  }
  /**
   * Method returning [object Graph].
   */
  toString() {
    return "[object Graph]";
  }
  /**
   * Method used internally by node's console to display a custom object.
   *
   * @return {object} - Formatted object representation of the graph.
   */
  inspect() {
    const e = {};
    this._nodes.forEach((o, a) => {
      e[a] = o.attributes;
    });
    const n = {}, i = {};
    this._edges.forEach((o, a) => {
      const s = o.undirected ? "--" : "->";
      let u = "", d = o.source.key, h = o.target.key, l;
      o.undirected && d > h && (l = d, d = h, h = l);
      const c = `(${d})${s}(${h})`;
      a.startsWith("geid_") ? this.multi && (typeof i[c] > "u" ? i[c] = 0 : i[c]++, u += `${i[c]}. `) : u += `[${a}]: `, u += c, n[u] = o.attributes;
    });
    const r = {};
    for (const o in this)
      this.hasOwnProperty(o) && !Zi.has(o) && typeof this[o] != "function" && typeof o != "symbol" && (r[o] = this[o]);
    return r.attributes = this._attributes, r.nodes = e, r.edges = n, ie(r, "constructor", this.constructor), r;
  }
}
typeof Symbol < "u" && (M.prototype[Symbol.for("nodejs.util.inspect.custom")] = M.prototype.inspect);
ed.forEach((t) => {
  ["add", "merge", "update"].forEach((e) => {
    const n = t.name(e), i = e === "add" ? fo : id;
    t.generateKey ? M.prototype[n] = function(r, o, a) {
      return i(
        this,
        n,
        !0,
        (t.type || this.type) === "undirected",
        null,
        r,
        o,
        a,
        e === "update"
      );
    } : M.prototype[n] = function(r, o, a, s) {
      return i(
        this,
        n,
        !1,
        (t.type || this.type) === "undirected",
        r,
        o,
        a,
        s,
        e === "update"
      );
    };
  });
});
cu(M);
xu(M);
zu(M);
Yu(M);
class po extends M {
  constructor(e) {
    const n = B({ type: "directed" }, e);
    if ("multi" in n && n.multi !== !1)
      throw new C(
        "DirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (n.type !== "directed")
      throw new C(
        'DirectedGraph.from: inconsistent "' + n.type + '" type in given options!'
      );
    super(n);
  }
}
class go extends M {
  constructor(e) {
    const n = B({ type: "undirected" }, e);
    if ("multi" in n && n.multi !== !1)
      throw new C(
        "UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (n.type !== "undirected")
      throw new C(
        'UndirectedGraph.from: inconsistent "' + n.type + '" type in given options!'
      );
    super(n);
  }
}
class ai extends M {
  constructor(e) {
    const n = B({ multi: !0 }, e);
    if ("multi" in n && n.multi !== !0)
      throw new C(
        "MultiGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    super(n);
  }
}
class vo extends M {
  constructor(e) {
    const n = B({ type: "directed", multi: !0 }, e);
    if ("multi" in n && n.multi !== !0)
      throw new C(
        "MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (n.type !== "directed")
      throw new C(
        'MultiDirectedGraph.from: inconsistent "' + n.type + '" type in given options!'
      );
    super(n);
  }
}
class mo extends M {
  constructor(e) {
    const n = B({ type: "undirected", multi: !0 }, e);
    if ("multi" in n && n.multi !== !0)
      throw new C(
        "MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (n.type !== "undirected")
      throw new C(
        'MultiUndirectedGraph.from: inconsistent "' + n.type + '" type in given options!'
      );
    super(n);
  }
}
function Je(t) {
  t.from = function(e, n) {
    const i = B({}, e.options, n), r = new t(i);
    return r.import(e), r;
  };
}
Je(M);
Je(po);
Je(go);
Je(ai);
Je(vo);
Je(mo);
M.Graph = M;
M.DirectedGraph = po;
M.UndirectedGraph = go;
M.MultiGraph = ai;
M.MultiDirectedGraph = vo;
M.MultiUndirectedGraph = mo;
M.InvalidArgumentsGraphError = C;
M.NotFoundGraphError = T;
M.UsageGraphError = D;
function rd(t, e) {
  if (typeof t != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function yo(t) {
  var e = rd(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function _o(t, e, n) {
  return (e = yo(e)) in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Qi(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function zt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Qi(Object(n), !0).forEach(function(i) {
      _o(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Qi(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function od(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function ad(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, yo(i.key), i);
  }
}
function sd(t, e, n) {
  return e && ad(t.prototype, e), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function Ot(t) {
  return Ot = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ot(t);
}
function bo() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (bo = function() {
    return !!t;
  })();
}
function wo(t) {
  if (t === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function ud(t, e) {
  if (e && (typeof e == "object" || typeof e == "function")) return e;
  if (e !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return wo(t);
}
function dd(t, e, n) {
  return e = Ot(e), ud(t, bo() ? Reflect.construct(e, n || [], Ot(t).constructor) : e.apply(t, n));
}
function Pn(t, e) {
  return Pn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Pn(t, e);
}
function ld(t, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Pn(t, e);
}
function Fn(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function hd(t) {
  if (Array.isArray(t)) return Fn(t);
}
function cd(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function fd(t, e) {
  if (t) {
    if (typeof t == "string") return Fn(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Fn(t, e) : void 0;
  }
}
function pd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _n(t) {
  return hd(t) || cd(t) || fd(t) || pd();
}
function Eo(t, e, n, i) {
  var r = Math.pow(1 - t, 2) * e.x + 2 * (1 - t) * t * n.x + Math.pow(t, 2) * i.x, o = Math.pow(1 - t, 2) * e.y + 2 * (1 - t) * t * n.y + Math.pow(t, 2) * i.y;
  return {
    x: r,
    y: o
  };
}
function gd(t, e, n) {
  for (var i = 20, r = 0, o = t, a = 0; a < i; a++) {
    var s = Eo((a + 1) / i, t, e, n);
    r += Math.sqrt(Math.pow(o.x - s.x, 2) + Math.pow(o.y - s.y, 2)), o = s;
  }
  return r;
}
function vd(t) {
  var e = t.curvatureAttribute, n = t.defaultCurvature, i = t.keepLabelUpright, r = i === void 0 ? !0 : i;
  return function(o, a, s, u, d) {
    var h = d.edgeLabelSize, l = a[e] || n, c = d.edgeLabelFont, f = d.edgeLabelWeight, g = d.edgeLabelColor.attribute ? a[d.edgeLabelColor.attribute] || d.edgeLabelColor.color || "#000" : d.edgeLabelColor.color, v = a.label;
    if (v) {
      o.fillStyle = g, o.font = "".concat(f, " ").concat(h, "px ").concat(c);
      var y = !r || s.x < u.x, x = y ? s.x : u.x, _ = y ? s.y : u.y, S = y ? u.x : s.x, p = y ? u.y : s.y, m = (x + S) / 2, b = (_ + p) / 2, E = S - x, A = p - _, R = Math.sqrt(Math.pow(E, 2) + Math.pow(A, 2)), N = y ? 1 : -1, P = m + A * l * N, I = b - E * l * N, H = a.size * 0.7 + 5, z = {
        x: I - _,
        y: -(P - x)
      }, Z = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2)), ee = {
        x: p - I,
        y: -(S - P)
      }, De = Math.sqrt(Math.pow(ee.x, 2) + Math.pow(ee.y, 2));
      x += H * z.x / Z, _ += H * z.y / Z, S += H * ee.x / De, p += H * ee.y / De, P += H * A / R, I -= H * E / R;
      var pe = {
        x: P,
        y: I
      }, ce = {
        x,
        y: _
      }, se = {
        x: S,
        y: p
      }, te = gd(ce, pe, se);
      if (!(te < s.size + u.size)) {
        var ge = o.measureText(v).width, ne = te - s.size - u.size;
        if (ge > ne) {
          var ft = "…";
          for (v = v + ft, ge = o.measureText(v).width; ge > ne && v.length > 1; )
            v = v.slice(0, -2) + ft, ge = o.measureText(v).width;
          if (v.length < 4) return;
        }
        for (var Ge = {}, Qt = 0, Go = v.length; Qt < Go; Qt++) {
          var en = v[Qt];
          Ge[en] || (Ge[en] = o.measureText(en).width * (1 + l * 0.35));
        }
        for (var Me = 0.5 - ge / te / 2, tn = 0, Po = v.length; tn < Po; tn++) {
          var di = v[tn], li = Eo(Me, ce, pe, se), Fo = 2 * (1 - Me) * (P - x) + 2 * Me * (S - P), $o = 2 * (1 - Me) * (I - _) + 2 * Me * (p - I), Io = Math.atan2($o, Fo);
          o.save(), o.translate(li.x, li.y), o.rotate(Io), o.fillText(di, 0, 0), o.restore(), Me += Ge[di] / te;
        }
      }
    }
  };
}
function md(t) {
  var e = t.arrowHead, n = (e == null ? void 0 : e.extremity) === "target" || (e == null ? void 0 : e.extremity) === "both", i = (e == null ? void 0 : e.extremity) === "source" || (e == null ? void 0 : e.extremity) === "both", r = (
    /*glsl*/
    `
precision highp float;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`.concat(n ? `
varying float v_targetSize;
varying vec2 v_targetPoint;` : "", `
`).concat(i ? `
varying float v_sourceSize;
varying vec2 v_sourcePoint;` : "", `
`).concat(e ? `
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;` : "", `

float det(vec2 a, vec2 b) {
  return a.x * b.y - b.x * a.y;
}

vec2 getDistanceVector(vec2 b0, vec2 b1, vec2 b2) {
  float a = det(b0, b2), b = 2.0 * det(b1, b0), d = 2.0 * det(b2, b1);
  float f = b * d - a * a;
  vec2 d21 = b2 - b1, d10 = b1 - b0, d20 = b2 - b0;
  vec2 gf = 2.0 * (b * d21 + d * d10 + a * d20);
  gf = vec2(gf.y, -gf.x);
  vec2 pp = -f * gf / dot(gf, gf);
  vec2 d0p = b0 - pp;
  float ap = det(d0p, d20), bp = 2.0 * det(d10, d0p);
  float t = clamp((ap + bp) / (2.0 * a + b + d), 0.0, 1.0);
  return mix(mix(b0, b1, t), mix(b1, b2, t), t);
}

float distToQuadraticBezierCurve(vec2 p, vec2 b0, vec2 b1, vec2 b2) {
  return length(getDistanceVector(b0 - p, b1 - p, b2 - p));
}

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float dist = distToQuadraticBezierCurve(gl_FragCoord.xy, v_cpA, v_cpB, v_cpC);
  float thickness = v_thickness;
`).concat(n ? `
  float distToTarget = length(gl_FragCoord.xy - v_targetPoint);
  float targetArrowLength = v_targetSize + thickness * u_lengthToThicknessRatio;
  if (distToTarget < targetArrowLength) {
    thickness = (distToTarget - v_targetSize) / (targetArrowLength - v_targetSize) * u_widenessToThicknessRatio * thickness;
  }` : "", `
`).concat(i ? `
  float distToSource = length(gl_FragCoord.xy - v_sourcePoint);
  float sourceArrowLength = v_sourceSize + thickness * u_lengthToThicknessRatio;
  if (distToSource < sourceArrowLength) {
    thickness = (distToSource - v_sourceSize) / (sourceArrowLength - v_sourceSize) * u_widenessToThicknessRatio * thickness;
  }` : "", `

  float halfThickness = thickness / 2.0;
  if (dist < halfThickness) {
    #ifdef PICKING_MODE
    gl_FragColor = v_color;
    #else
    float t = smoothstep(
      halfThickness - v_feather,
      halfThickness,
      dist
    );

    gl_FragColor = mix(v_color, transparent, t);
    #endif
  } else {
    gl_FragColor = transparent;
  }
}
`)
  );
  return r;
}
function yd(t) {
  var e = t.arrowHead, n = (e == null ? void 0 : e.extremity) === "target" || (e == null ? void 0 : e.extremity) === "both", i = (e == null ? void 0 : e.extremity) === "source" || (e == null ? void 0 : e.extremity) === "both", r = (
    /*glsl*/
    `
attribute vec4 a_id;
attribute vec4 a_color;
attribute float a_direction;
attribute float a_thickness;
attribute vec2 a_source;
attribute vec2 a_target;
attribute float a_current;
attribute float a_curvature;
`.concat(n ? `attribute float a_targetSize;
` : "", `
`).concat(i ? `attribute float a_sourceSize;
` : "", `

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform vec2 u_dimensions;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`).concat(n ? `
varying float v_targetSize;
varying vec2 v_targetPoint;` : "", `
`).concat(i ? `
varying float v_sourceSize;
varying vec2 v_sourcePoint;` : "", `
`).concat(e ? `
uniform float u_widenessToThicknessRatio;` : "", `

const float bias = 255.0 / 254.0;
const float epsilon = 0.7;

vec2 clipspaceToViewport(vec2 pos, vec2 dimensions) {
  return vec2(
    (pos.x + 1.0) * dimensions.x / 2.0,
    (pos.y + 1.0) * dimensions.y / 2.0
  );
}

vec2 viewportToClipspace(vec2 pos, vec2 dimensions) {
  return vec2(
    pos.x / dimensions.x * 2.0 - 1.0,
    pos.y / dimensions.y * 2.0 - 1.0
  );
}

void main() {
  float minThickness = u_minEdgeThickness;

  // Selecting the correct position
  // Branchless "position = a_source if a_current == 1.0 else a_target"
  vec2 position = a_source * max(0.0, a_current) + a_target * max(0.0, 1.0 - a_current);
  position = (u_matrix * vec3(position, 1)).xy;

  vec2 source = (u_matrix * vec3(a_source, 1)).xy;
  vec2 target = (u_matrix * vec3(a_target, 1)).xy;

  vec2 viewportPosition = clipspaceToViewport(position, u_dimensions);
  vec2 viewportSource = clipspaceToViewport(source, u_dimensions);
  vec2 viewportTarget = clipspaceToViewport(target, u_dimensions);

  vec2 delta = viewportTarget.xy - viewportSource.xy;
  float len = length(delta);
  vec2 normal = vec2(-delta.y, delta.x) * a_direction;
  vec2 unitNormal = normal / len;
  float boundingBoxThickness = len * a_curvature;

  float curveThickness = max(minThickness, a_thickness / u_sizeRatio);
  v_thickness = curveThickness * u_pixelRatio;
  v_feather = u_feather;

  v_cpA = viewportSource;
  v_cpB = 0.5 * (viewportSource + viewportTarget) + unitNormal * a_direction * boundingBoxThickness;
  v_cpC = viewportTarget;

  vec2 viewportOffsetPosition = (
    viewportPosition +
    unitNormal * (boundingBoxThickness / 2.0 + sign(boundingBoxThickness) * (`).concat(e ? "curveThickness * u_widenessToThicknessRatio" : "curveThickness", ` + epsilon)) *
    max(0.0, a_direction) // NOTE: cutting the bounding box in half to avoid overdraw
  );

  position = viewportToClipspace(viewportOffsetPosition, u_dimensions);
  gl_Position = vec4(position, 0, 1);
    
`).concat(n ? `
  v_targetSize = a_targetSize * u_pixelRatio / u_sizeRatio;
  v_targetPoint = viewportTarget;
` : "", `
`).concat(i ? `
  v_sourceSize = a_sourceSize * u_pixelRatio / u_sizeRatio;
  v_sourcePoint = viewportSource;
` : "", `

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`)
  );
  return r;
}
var xo = 0.25, _d = {
  arrowHead: null,
  curvatureAttribute: "curvature",
  defaultCurvature: xo
}, So = WebGLRenderingContext, er = So.UNSIGNED_BYTE, Ce = So.FLOAT;
function si(t) {
  var e = zt(zt({}, _d), t || {}), n = e, i = n.arrowHead, r = n.curvatureAttribute, o = n.drawLabel, a = (i == null ? void 0 : i.extremity) === "target" || (i == null ? void 0 : i.extremity) === "both", s = (i == null ? void 0 : i.extremity) === "source" || (i == null ? void 0 : i.extremity) === "both", u = ["u_matrix", "u_sizeRatio", "u_dimensions", "u_pixelRatio", "u_feather", "u_minEdgeThickness"].concat(_n(i ? ["u_lengthToThicknessRatio", "u_widenessToThicknessRatio"] : []));
  return /* @__PURE__ */ (function(d) {
    ld(h, d);
    function h() {
      var l;
      od(this, h);
      for (var c = arguments.length, f = new Array(c), g = 0; g < c; g++)
        f[g] = arguments[g];
      return l = dd(this, h, [].concat(f)), _o(wo(l), "drawLabel", o || vd(e)), l;
    }
    return sd(h, [{
      key: "getDefinition",
      value: function() {
        return {
          VERTICES: 6,
          VERTEX_SHADER_SOURCE: yd(e),
          FRAGMENT_SHADER_SOURCE: md(e),
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: u,
          ATTRIBUTES: [{
            name: "a_source",
            size: 2,
            type: Ce
          }, {
            name: "a_target",
            size: 2,
            type: Ce
          }].concat(_n(a ? [{
            name: "a_targetSize",
            size: 1,
            type: Ce
          }] : []), _n(s ? [{
            name: "a_sourceSize",
            size: 1,
            type: Ce
          }] : []), [{
            name: "a_thickness",
            size: 1,
            type: Ce
          }, {
            name: "a_curvature",
            size: 1,
            type: Ce
          }, {
            name: "a_color",
            size: 4,
            type: er,
            normalized: !0
          }, {
            name: "a_id",
            size: 4,
            type: er,
            normalized: !0
          }]),
          CONSTANT_ATTRIBUTES: [
            {
              name: "a_current",
              size: 1,
              type: Ce
            },
            // TODO: could optimize to bool
            {
              name: "a_direction",
              size: 1,
              type: Ce
            }
            // TODO: could optimize to byte
          ],
          CONSTANT_DATA: [[0, 1], [0, -1], [1, 1], [0, -1], [1, 1], [1, -1]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function(c, f, g, v, y) {
        var x, _ = y.size || 1, S = g.x, p = g.y, m = v.x, b = v.y, E = Ke(y.color), A = (x = y[r]) !== null && x !== void 0 ? x : xo, R = this.array;
        R[f++] = S, R[f++] = p, R[f++] = m, R[f++] = b, a && (R[f++] = v.size), s && (R[f++] = g.size), R[f++] = _, R[f++] = A, R[f++] = E, R[f++] = c;
      }
    }, {
      key: "setUniforms",
      value: function(c, f) {
        var g = f.gl, v = f.uniformLocations, y = v.u_matrix, x = v.u_pixelRatio, _ = v.u_feather, S = v.u_sizeRatio, p = v.u_dimensions, m = v.u_minEdgeThickness;
        if (g.uniformMatrix3fv(y, !1, c.matrix), g.uniform1f(x, c.pixelRatio), g.uniform1f(S, c.sizeRatio), g.uniform1f(_, c.antiAliasingFeather), g.uniform2f(p, c.width * c.pixelRatio, c.height * c.pixelRatio), g.uniform1f(m, c.minEdgeThickness), i) {
          var b = v.u_lengthToThicknessRatio, E = v.u_widenessToThicknessRatio;
          g.uniform1f(b, i.lengthToThicknessRatio), g.uniform1f(E, i.widenessToThicknessRatio);
        }
      }
    }]), h;
  })(qt);
}
var bd = si();
si({
  arrowHead: Xt
});
si({
  arrowHead: zt(zt({}, Xt), {}, {
    extremity: "both"
  })
});
const tr = [5, 9, 15];
function $n(t, e, n) {
  const i = e / 100, r = n / 100, o = i * Math.min(r, 1 - r), a = (u) => {
    const d = (u + t / 30) % 12;
    return r - o * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  }, s = (u) => Math.round(u * 255).toString(16).padStart(2, "0");
  return `#${s(a(0))}${s(a(8))}${s(a(4))}`;
}
function wd(t, e) {
  const n = parseInt(t.slice(1, 3), 16) || 0, i = parseInt(t.slice(3, 5), 16) || 0, r = parseInt(t.slice(5, 7), 16) || 0, o = (a, s) => Math.round(tr[s] + (a - tr[s]) * e).toString(16).padStart(2, "0");
  return `#${o(n, 0)}${o(i, 1)}${o(r, 2)}`;
}
function Et(t, e, n) {
  const i = parseInt(t.slice(1, 3), 16) || 0, r = parseInt(t.slice(3, 5), 16) || 0, o = parseInt(t.slice(5, 7), 16) || 0, a = parseInt(e.slice(1, 3), 16) || 0, s = parseInt(e.slice(3, 5), 16) || 0, u = parseInt(e.slice(5, 7), 16) || 0, d = (h, l) => Math.round(h + (l - h) * n).toString(16).padStart(2, "0");
  return `#${d(i, a)}${d(r, s)}${d(o, u)}`;
}
function Ed(t, e = 0, n = 0) {
  var u;
  const i = (u = t == null ? void 0 : t.metadata) == null ? void 0 : u.cluster, r = Number(i);
  if (i != null && i !== "" && Number.isFinite(r)) {
    const d = (Math.abs(r) * 137.508 + 30) % 360;
    return $n(d, 100, 58);
  }
  const s = (Math.atan2(n, e) * (180 / Math.PI) + 180) % 360;
  return $n(s, 100, 58);
}
function xd(t) {
  const e = t.map((l) => {
    var c;
    return Number(((c = l.coords) == null ? void 0 : c[0]) ?? 0);
  }), n = t.map((l) => {
    var c;
    return Number(((c = l.coords) == null ? void 0 : c[1]) ?? 0);
  }), i = Math.min(...e), r = Math.max(...e), o = Math.min(...n), a = Math.max(...n), s = (i + r) / 2, u = (o + a) / 2, h = 1 / Math.max(r - i, a - o, 1e-3);
  return {
    normX: (l) => (l - s) * h,
    normY: (l) => -((l - u) * h)
  };
}
function Sd(t, e, n, i) {
  var d, h, l, c;
  i.length = 0, t.clear();
  const { points: r, edges: o, degrees: a } = e;
  if (!r.length) return;
  const { normX: s, normY: u } = xd(r);
  for (const f of r) {
    const g = a.get(String(f.id)) ?? 0;
    t.addNode(String(f.id), {
      x: s(Number(((d = f.coords) == null ? void 0 : d[0]) ?? 0)),
      y: u(Number(((h = f.coords) == null ? void 0 : h[1]) ?? 0)),
      size: 4 + Math.min(g * 0.6, 6),
      color: Ed(
        f,
        s(Number(((l = f.coords) == null ? void 0 : l[0]) ?? 0)),
        u(Number(((c = f.coords) == null ? void 0 : c[1]) ?? 0))
      ),
      label: f.label ?? String(f.id)
    });
  }
  for (const f of o) {
    const g = String(f.source), v = String(f.target);
    t.hasNode(g) && t.hasNode(v) && t.addEdge(g, v, {
      type: "curved",
      curvature: 0.08,
      color: "rgba(100,130,165,0.32)",
      size: 1.2
    });
  }
  To(t, n, i);
}
function To(t, e, n) {
  for (const r of n)
    t.hasEdge(r) && t.dropEdge(r);
  if (n.length = 0, !e || e.operation !== "nearest_neighbor") return;
  const i = nr(
    e.source_point_id ?? e.source_point_ids
  );
  if (!(!i || !t.hasNode(i)))
    for (const r of e.neighbors ?? []) {
      const o = nr(r.point_id ?? r.id);
      if (!o || !t.hasNode(o)) continue;
      const a = t.addEdge(i, o, {
        type: "curved",
        curvature: 0.2,
        color: "rgba(250,204,21,0.78)",
        size: 2.2,
        isOverlay: !0,
        zIndex: 2
      });
      n.push(a);
    }
}
function nr(t) {
  return Array.isArray(t) ? String(t[0] ?? "") : String(t ?? "");
}
let G = null, U = null;
const ui = [], Jt = /* @__PURE__ */ new Map(), Ut = /* @__PURE__ */ new Map();
let Re = null, Fe = null, In = 0;
const lt = [], X = {
  selectedIds: /* @__PURE__ */ new Set(),
  emphasizedIds: /* @__PURE__ */ new Set(),
  hoverNodeId: null
};
function ko(t) {
  G || (U = new ai({ multi: !0, allowSelfLoops: !1 }), G = new Js(U, t, {
    edgeProgramClasses: { curved: bd },
    defaultDrawNodeHover: Dd,
    nodeReducer: Ld,
    edgeReducer: Nd,
    zIndex: !0,
    renderEdgeLabels: !1,
    allowInvalidContainer: !0,
    defaultNodeColor: "#40a0ff",
    labelFont: "ui-monospace, SFMono-Regular, Consolas, monospace",
    labelSize: 11,
    labelColor: { color: "#9aaabb" },
    labelRenderedSizeThreshold: 12,
    minCameraRatio: 0.04,
    maxCameraRatio: 20,
    stagePadding: 50
  }), lt.push(
    Le(() => {
      const e = Se.value, n = ct.value;
      !G || !U || (Sd(U, e, n, ui), Ut.clear(), U.forEachNode((i) => {
        Ut.set(i, {
          x: U.getNodeAttribute(i, "x"),
          y: U.getNodeAttribute(i, "y")
        });
      }), G.refresh());
    })
  ), lt.push(
    Le(() => {
      X.selectedIds = Ne.value, X.emphasizedIds = ua.value, X.hoverNodeId = Cn.value, G == null || G.refresh();
    })
  ), lt.push(
    Le(() => {
      We.value === "graph" && setTimeout(() => G == null ? void 0 : G.refresh(), 0), We.value === "graph" && Se.value.points.length > 0 && Oe.value ? Pd() : No();
    })
  ));
}
function Co() {
  for (const t of lt) t();
  lt.length = 0, Re && (cancelAnimationFrame(Re), Re = null), No(), G == null || G.kill(), G = null, U = null, ui.length = 0, Jt.clear();
}
function Td() {
  G == null || G.refresh();
}
function Mn() {
  var t;
  (t = G == null ? void 0 : G.resize) == null || t.call(G), G == null || G.refresh();
}
function kd() {
  var e;
  const t = (e = G == null ? void 0 : G.getCamera()) == null ? void 0 : e.getState();
  return { x: (t == null ? void 0 : t.x) ?? 0, y: (t == null ? void 0 : t.y) ?? 0, ratio: (t == null ? void 0 : t.ratio) ?? 1 };
}
function Cd(t) {
  if (!G || !t) return;
  const e = t.ratio != null ? Number(t.ratio) : 1;
  G.getCamera().setState({
    x: Number(t.x ?? 0),
    y: Number(t.y ?? 0),
    ratio: Math.max(0.01, e)
  });
}
function Ao() {
  G == null || G.getCamera().animate({ x: 0, y: 0, ratio: 1, angle: 0 }, { duration: 200 });
}
function Ad() {
  U && To(U, ct.value, ui);
}
function Ro(t) {
  const e = Date.now() + 1100;
  for (const n of t)
    n && Jt.set(n, e);
  Fd();
}
function Rd(t) {
  var n;
  const e = [];
  t != null && t.source_point_id && e.push(String(t.source_point_id));
  for (const i of (t == null ? void 0 : t.source_point_ids) ?? []) e.push(String(i));
  for (const i of (t == null ? void 0 : t.neighbors) ?? []) {
    const r = i.point_id ?? i.id;
    r && e.push(String(r));
  }
  for (const i of ((n = t == null ? void 0 : t.selection) == null ? void 0 : n.selected_point_ids) ?? [])
    e.push(String(i));
  Ro(e);
}
function zn() {
  return G;
}
function Ld(t, e) {
  const n = Gd(t), i = 0.5 + 0.5 * Math.sin(n), r = 0.5 + 0.5 * Math.sin(n * 0.72 + 1.7), o = X.selectedIds.has(t), a = X.hoverNodeId === t, s = X.selectedIds.size > 0 || X.emphasizedIds.size > 0 || !!X.hoverNodeId, u = s && X.emphasizedIds.has(t), d = s && !o && !a && !u, h = Jt.get(t) ?? 0, l = h > Date.now();
  if (!o && !a && !u && !d && !l) {
    const v = { ...e };
    return v.color = Et(e.color || "#40a0ff", "#ffffff", 0.02 + r * 0.04), v.size = (e.size || 6) * (0.94 + i * 0.08), v;
  }
  const c = { ...e }, f = e.size || 6, g = e.color || "#607890";
  if (o ? (c.color = Et("#facc15", "#fff7a8", r * 0.14), c.size = f * (1.5 + i * 0.04), c.zIndex = 3, c.highlighted = !0) : a ? (c.color = Et(g, "#ffffff", 0.08 + r * 0.08), c.size = f * (1.4 + i * 0.05), c.zIndex = 2, c.highlighted = !0) : u ? (c.color = Et("#7dd3fc", "#dff4ff", r * 0.16), c.size = f * (1.25 + i * 0.03), c.zIndex = 1) : d && (c.color = wd(g, 0.22 + i * 0.03), c.size = f * (0.72 + i * 0.04), c.zIndex = 0), l) {
    const v = (h - Date.now()) / 1100;
    c.size = (c.size || f) * (1 + v * 0.65), c.color = $n(217, 91, Math.round(45 + v * 20)), c.zIndex = 4;
  }
  return c;
}
function Nd(t, e) {
  if (e.isOverlay || !(X.selectedIds.size > 0 || X.emphasizedIds.size > 0)) return e;
  const i = U.source(t), r = U.target(t), o = X.selectedIds.has(i) || X.selectedIds.has(r) || X.emphasizedIds.has(i) || X.emphasizedIds.has(r), a = { ...e };
  return o ? (a.color = "rgba(125,211,252,0.65)", a.size = 2) : (a.color = "rgba(100,120,145,0.08)", a.size = 0.7), a;
}
function Dd(t, e, n) {
  const i = e.x, r = e.y, o = e.size || 6, a = e.color || "#6080a0", s = e.label;
  if (t.beginPath(), t.arc(i, r, o + 4, 0, Math.PI * 2), t.strokeStyle = a, t.lineWidth = 2, t.globalAlpha = 0.5, t.shadowColor = a, t.shadowBlur = 12, t.stroke(), t.globalAlpha = 1, t.shadowBlur = 0, !s) return;
  const u = n.labelSize || 11, d = n.labelFont || "ui-monospace, monospace";
  t.font = `${u}px ${d}`;
  const h = t.measureText(s).width, l = 8, c = 5, f = h + l * 2, g = u + c * 2, v = i - f / 2, y = r - o - 10 - g;
  t.fillStyle = "#0f1a28", t.beginPath(), t.roundRect ? t.roundRect(v, y, f, g, 4) : t.rect(v, y, f, g), t.fill(), t.strokeStyle = a, t.lineWidth = 1.5, t.shadowColor = a, t.shadowBlur = 8, t.stroke(), t.shadowBlur = 0, t.fillStyle = "#e8f0f8", t.textAlign = "center", t.textBaseline = "middle", t.fillText(s, i, y + g / 2);
}
function Gd(t) {
  return In / 900 + Lo(t) * 7e-4;
}
function Lo(t) {
  let e = 2166136261;
  for (let n = 0; n < t.length; n++)
    e ^= t.charCodeAt(n), e = Math.imul(e, 16777619);
  return e >>> 0;
}
function Pd() {
  if (Fe) return;
  const t = () => {
    if (!G || !U || We.value !== "graph" || !Oe.value) {
      Fe = null, Do();
      return;
    }
    In = performance.now();
    const e = In / 1e3;
    Ut.forEach(({ x: n, y: i }, r) => {
      if (U.hasNode(r)) {
        const o = Lo(r), a = (o & 65535) * (Math.PI * 2 / 65535), s = (o >>> 16) * (Math.PI * 2 / 65535), u = Math.sin(e * 0.6 + a) * 0.035 + Math.sin(e * 0.35 + a + 1.2) * 0.02, d = Math.cos(e * 0.45 + s) * 0.03 + Math.cos(e * 0.25 + s + 2.1) * 0.015;
        U.setNodeAttribute(r, "x", n + u), U.setNodeAttribute(r, "y", i + d);
      }
    }), G.refresh(), Fe = requestAnimationFrame(t);
  };
  Fe = requestAnimationFrame(t);
}
function No() {
  Fe && (cancelAnimationFrame(Fe), Fe = null, Do());
}
function Do() {
  U && (Ut.forEach(({ x: t, y: e }, n) => {
    U.hasNode(n) && (U.setNodeAttribute(n, "x", t), U.setNodeAttribute(n, "y", e));
  }), G == null || G.refresh());
}
function Fd() {
  if (Re) return;
  const t = () => {
    if (!G) {
      Re = null;
      return;
    }
    G.refresh(), [...Jt.values()].some((e) => e > Date.now()) ? Re = requestAnimationFrame(t) : Re = null;
  };
  Re = requestAnimationFrame(t);
}
const $d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addOverlayEdges: Ad,
  applySigmaViewport: Cd,
  destroyRenderer: Co,
  fitCamera: Ao,
  getCameraState: kd,
  getSigma: zn,
  initRenderer: ko,
  pulseIds: Ro,
  pulseOperationResult: Rd,
  resizeRenderer: Mn,
  sigmaRefresh: Td
}, Symbol.toStringTag, { value: "Module" }));
function xt(t, e) {
  return (n) => {
    Dr({ [t]: e(n.target.value) }), Ue();
  };
}
function Id() {
  const t = we.value;
  return /* @__PURE__ */ k("details", { class: "nels-panel-card", open: !0, children: [
    /* @__PURE__ */ k("summary", { children: "Operation" }),
    /* @__PURE__ */ k("div", { class: "nels-panel-controls", children: [
      /* @__PURE__ */ k("label", { children: [
        /* @__PURE__ */ k("span", { children: "operation" }),
        /* @__PURE__ */ k("select", { value: t.operation, onChange: xt("operation", String), children: [
          /* @__PURE__ */ k("option", { value: "inspect", children: "inspect" }),
          /* @__PURE__ */ k("option", { value: "nearest_neighbor", children: "nearest neighbor" }),
          /* @__PURE__ */ k("option", { value: "lerp", children: "lerp" }),
          /* @__PURE__ */ k("option", { value: "slerp", children: "slerp" }),
          /* @__PURE__ */ k("option", { value: "delta_walk", children: "delta walk" })
        ] })
      ] }),
      /* @__PURE__ */ k("label", { children: [
        /* @__PURE__ */ k("span", { children: "metric" }),
        /* @__PURE__ */ k("select", { value: t.metric_mode, onChange: xt("metric_mode", String), children: [
          /* @__PURE__ */ k("option", { value: "step_distance", children: "step distance" }),
          /* @__PURE__ */ k("option", { value: "similarity_matrix", children: "similarity matrix" }),
          /* @__PURE__ */ k("option", { value: "distance_to_start", children: "distance to start" }),
          /* @__PURE__ */ k("option", { value: "distance_to_target", children: "distance to target" }),
          /* @__PURE__ */ k("option", { value: "norm_drift", children: "norm drift" })
        ] })
      ] }),
      /* @__PURE__ */ k("label", { children: [
        /* @__PURE__ */ k("span", { children: "neighbors" }),
        /* @__PURE__ */ k(
          "input",
          {
            type: "number",
            min: 1,
            max: 128,
            step: 1,
            value: t.neighbor_count,
            onChange: xt("neighbor_count", Number)
          }
        )
      ] }),
      /* @__PURE__ */ k("label", { children: [
        /* @__PURE__ */ k("span", { children: "alpha" }),
        /* @__PURE__ */ k(
          "input",
          {
            type: "text",
            value: t.alpha_schedule,
            onChange: xt("alpha_schedule", String)
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { class: "nels-panel-row", children: [
        /* @__PURE__ */ k("button", { onClick: () => {
          Pr(), Xn(null), Ue();
        }, children: "Clear" }),
        /* @__PURE__ */ k("button", { onClick: () => {
          Ao(), Ue();
        }, children: "Fit" })
      ] })
    ] })
  ] });
}
function Md() {
  var i, r;
  const t = ct.value ?? {}, e = Nr.value ?? {}, n = [
    ["operation", String(t.operation ?? "-")],
    ["request", String(t.request_id ?? "-")],
    ["metric", String(e.metric_mode ?? "-")],
    ["neighbors", String(((i = t.neighbors) == null ? void 0 : i.length) ?? "-")],
    ["trajectory", String(((r = t.points) == null ? void 0 : r.length) ?? "-")],
    ["status", String(t.status ?? e.status ?? "-")]
  ];
  return /* @__PURE__ */ k("details", { class: "nels-panel-card", open: !0, children: [
    /* @__PURE__ */ k("summary", { children: "Result" }),
    /* @__PURE__ */ k("dl", { children: n.map(([o, a]) => /* @__PURE__ */ k($e, { children: [
      /* @__PURE__ */ k("dt", { children: o }, `dt-${o}`),
      /* @__PURE__ */ k("dd", { children: a }, `dd-${o}`)
    ] })) })
  ] });
}
function bn(t) {
  return String(t ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function zd() {
  const t = Vn(null), e = Mt.value;
  jn(() => {
    t.current && (t.current.scrollTop = t.current.scrollHeight);
  }, [e.length]);
  const n = e.slice(-180);
  return /* @__PURE__ */ k("div", { class: "nels-panel-card", style: { height: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ k("h3", { children: "Event Log" }),
    /* @__PURE__ */ k("div", { class: "nels-panel-log", ref: t, children: n.map((i, r) => {
      const o = new Date(i.timestamp).toLocaleTimeString(), a = i.status === "failed" ? " nels-panel-log-status-failed" : "";
      return /* @__PURE__ */ k("div", { class: `nels-panel-log-line${i.stale ? " stale" : ""}`, children: [
        /* @__PURE__ */ k("span", { class: "nels-panel-log-time", children: [
          "[",
          o,
          "]"
        ] }),
        " ",
        /* @__PURE__ */ k("span", { class: "nels-panel-log-node", children: bn(i.node_name) }),
        " ",
        /* @__PURE__ */ k("span", { class: `nels-panel-log-type${a}`, children: bn(i.event_type) }),
        " ",
        bn(i.message),
        i.stale ? " [stale]" : ""
      ] }, r);
    }) })
  ] });
}
let On = { x: 0, y: 0 };
function Od(t, e) {
  On = { x: t, y: e };
}
function Ud({ containerRef: t }) {
  var o, a;
  const e = Vn(null), n = ht.value;
  if (jn(() => {
    if (!n || !e.current || !t.current) return;
    const s = t.current.getBoundingClientRect();
    e.current.style.left = `${On.x - s.left + 12}px`, e.current.style.top = `${On.y - s.top + 12}px`;
  }), !n) return null;
  const i = n.metadata ?? {}, r = [
    ["id", n.id],
    ["label", n.label ?? "-"],
    ["cluster", i.cluster ?? "-"],
    ["x", Number(((o = n.coords) == null ? void 0 : o[0]) ?? 0).toFixed(3)],
    ["y", Number(((a = n.coords) == null ? void 0 : a[1]) ?? 0).toFixed(3)]
  ];
  return /* @__PURE__ */ k("div", { class: "nels-panel-hover", ref: e, children: r.map(([s, u]) => /* @__PURE__ */ k("div", { children: [
    /* @__PURE__ */ k("strong", { children: String(s) }),
    ": ",
    String(u)
  ] }, s)) });
}
function Bd() {
  const t = zn();
  t && (t.on("clickNode", ({ node: e, event: n }) => {
    const i = (n == null ? void 0 : n.original) ?? {}, r = i.shiftKey || i.ctrlKey || i.metaKey;
    da(e, r), Ue(), t.refresh();
  }), t.on("clickStage", () => {
    zn() && (Pr(), Ue(), t.refresh());
  }), t.on("enterNode", ({ node: e }) => {
    Cn.value = e, ht.value = Se.value.byId.get(e) ?? null, t.refresh();
  }), t.on("leaveNode", () => {
    Cn.value = null, ht.value = null, t.refresh();
  }), t.getCamera().on("updated", () => Ue()));
}
function Hd() {
  const t = Vn(null), e = We.value === "graph";
  jn(() => {
    if (!t.current) return;
    ko(t.current), Bd(), setTimeout(() => Mn(), 0);
    const i = new ResizeObserver(() => Mn());
    return i.observe(t.current), () => {
      i.disconnect(), Co();
    };
  }, []);
  function n(i) {
    Od(i.clientX, i.clientY), ht.value;
  }
  return /* @__PURE__ */ k("div", { class: "nels-panel", children: [
    /* @__PURE__ */ k(Sa, {}),
    /* @__PURE__ */ k("div", { class: `nels-panel-body${e ? "" : " hidden"}`, children: [
      /* @__PURE__ */ k("section", { class: "nels-panel-main", children: [
        /* @__PURE__ */ k(
          "div",
          {
            ref: t,
            class: "nels-sigma-container",
            onMouseMove: n
          }
        ),
        ht.value && /* @__PURE__ */ k(Ud, { containerRef: t }),
        Se.value.points.length === 0 && /* @__PURE__ */ k("div", { class: "nels-panel-empty", children: "Add NELS Data Source → NELS Session, then press Sessions." })
      ] }),
      /* @__PURE__ */ k("aside", { class: "nels-panel-side", children: [
        /* @__PURE__ */ k(Ta, {}),
        /* @__PURE__ */ k(Id, {}),
        /* @__PURE__ */ k(Md, {})
      ] })
    ] }),
    /* @__PURE__ */ k("div", { class: `nels-panel-logs-view${e ? " hidden" : ""}`, children: /* @__PURE__ */ k(zd, {}) })
  ] });
}
const Wd = "nels_GraphPanelLauncher";
let ve = null;
function jd() {
  var r, o;
  const t = (r = _e.extensionManager) == null ? void 0 : r.bottomPanel;
  if (t != null && t.toggleBottomPanelTab) {
    t.toggleBottomPanelTab("nels-graph-panel");
    return;
  }
  const e = (o = _e.extensionManager) == null ? void 0 : o.command;
  if (e != null && e.execute) {
    e.execute("Workspace.ToggleBottomPanelTab.nels-graph-panel");
    return;
  }
  const i = [
    ...document.querySelectorAll("button, [role='tab'], .p-tab, .tab")
  ].find((a) => {
    const s = (a.textContent ?? "").trim().toLowerCase();
    return s === "nels graph" || s === "nels graph panel";
  });
  i == null || i.click();
}
_e.registerExtension({
  name: "nels.graph.panel",
  beforeRegisterNodeDef(t, e) {
    if (e.name !== Wd) return;
    const n = t.prototype.onNodeCreated;
    t.prototype.onNodeCreated = function() {
      n == null || n.apply(this, []), this.addWidget(
        "button",
        "Open NELS Graph Panel",
        "open",
        () => jd()
      ), this.size = [260, 82];
    };
  },
  bottomPanelTabs: [
    {
      id: "nels-graph-panel",
      title: "NELS Graph",
      type: "custom",
      render(t) {
        ve == null || ve(), ve = null, t.style.width = "100%", t.style.height = "100%", t.style.minWidth = "0", t.style.minHeight = "0", t.style.position = "relative", t.style.overflow = "hidden", Wo(), gi(dr(Hd, null), t);
        const e = new AbortController();
        _a(e.signal), ve = () => {
          e.abort(), gi(null, t);
        };
      },
      destroy() {
        ve == null || ve(), ve = null;
      }
    }
  ]
});
