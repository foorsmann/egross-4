/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4558:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConceptSGMEvents": function() { return /* binding */ ConceptSGMEvents; },
/* harmony export */   "ConceptSGMTheme": function() { return /* binding */ ConceptSGMTheme; },
/* harmony export */   "ConceptSGMSettings": function() { return /* binding */ ConceptSGMSettings; },
/* harmony export */   "ConceptSGMStrings": function() { return /* binding */ ConceptSGMStrings; },
/* harmony export */   "ConceptSGMLibs": function() { return /* binding */ ConceptSGMLibs; }
/* harmony export */ });
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8971);
/* harmony import */ var _libs_loadjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9280);
/* harmony import */ var _libs_loadjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_libs_loadjs__WEBPACK_IMPORTED_MODULE_0__);


window.ConceptSGMEvents = window.ConceptSGMEvents || new _utils_events__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z();
window._ThemeEvent = window.ConceptSGMEvents;
window.ConceptSGMLibs.loadjs = __loadjs;
const ConceptSGMEvents = window.ConceptSGMEvents;
const ConceptSGMTheme = window.ConceptSGMTheme || {};
const ConceptSGMSettings = window.ConceptSGMSettings || {};
const ConceptSGMStrings = window.ConceptSGMStrings || {};
const ConceptSGMLibs = window.ConceptSGMLibs || {};

/***/ }),

/***/ 9280:
/***/ (function() {

__loadjs = function () {
  var h = function () {},
      c = {},
      u = {},
      f = {};

  function o(e, n) {
    if (e) {
      var r = f[e];
      if (u[e] = n, r) for (; r.length;) r[0](e, n), r.splice(0, 1);
    }
  }

  function l(e, n) {
    e.call && (e = {
      success: e
    }), n.length ? (e.error || h)(n) : (e.success || h)(e);
  }

  function d(r, t, s, i) {
    var c,
        o,
        e = document,
        n = s.async,
        u = (s.numRetries || 0) + 1,
        f = s.before || h,
        l = r.replace(/[\?|#].*$/, ""),
        a = r.replace(/^(css|img)!/, "");
    i = i || 0, /(^css!|\.css$)/.test(l) ? ((o = e.createElement("link")).rel = "stylesheet", o.href = a, (c = "hideFocus" in o) && o.relList && (c = 0, o.rel = "preload", o.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l) ? (o = e.createElement("img")).src = a : ((o = e.createElement("script")).src = r, o.async = void 0 === n || n), !(o.onload = o.onerror = o.onbeforeload = function (e) {
      var n = e.type[0];
      if (c) try {
        o.sheet.cssText.length || (n = "e");
      } catch (e) {
        18 != e.code && (n = "e");
      }

      if ("e" == n) {
        if ((i += 1) < u) return d(r, t, s, i);
      } else if ("preload" == o.rel && "style" == o.as) return o.rel = "stylesheet";

      t(r, n, e.defaultPrevented);
    }) !== f(r, o) && e.head.appendChild(o);
  }

  function r(e, n, r) {
    var t, s;

    if (n && n.trim && (t = n), s = (t ? r : n) || {}, t) {
      if (t in c) throw "LoadJS";
      c[t] = !0;
    }

    function i(n, r) {
      !function (e, t, n) {
        var r,
            s,
            i = (e = e.push ? e : [e]).length,
            c = i,
            o = [];

        for (r = function (e, n, r) {
          if ("e" == n && o.push(e), "b" == n) {
            if (!r) return;
            o.push(e);
          }

          --i || t(o);
        }, s = 0; s < c; s++) d(e[s], r, n);
      }(e, function (e) {
        l(s, e), n && l({
          success: n,
          error: r
        }, e), o(t, e);
      }, s);
    }

    if (s.returnPromise) return new Promise(i);
    i();
  }

  return r.ready = function (e, n) {
    return function (e, r) {
      e = e.push ? e : [e];
      var n,
          t,
          s,
          i = [],
          c = e.length,
          o = c;

      for (n = function (e, n) {
        n.length && i.push(e), --o || r(i);
      }; c--;) t = e[c], (s = u[t]) ? n(t, s) : (f[t] = f[t] || []).push(n);
    }(e, function (e) {
      l(n, e);
    }), r;
  }, r.done = function (e) {
    o(e, []);
  }, r.reset = function () {
    c = {}, u = {}, f = {};
  }, r.isDefined = function (e) {
    return e in c;
  }, r;
}();

/***/ }),

/***/ 8971:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Event; }
/* harmony export */ });
/* unused harmony export addEventDelegate */
const addEventDelegate = _ref => {
  let {
    context = document.documentElement,
    event = 'click',
    selector,
    handler,
    capture = false
  } = _ref;

  const listener = function (e) {
    // loop parent nodes from the target to the delegation node
    for (let target = e.target; target && target !== this; target = target.parentNode) {
      if (target.matches(selector)) {
        handler.call(target, e, target);
        break;
      }
    }
  };

  context.addEventListener(event, listener, capture);
  return () => {
    context.removeEventListener(event, listener, capture);
  };
};
class Event {
  constructor() {
    this.events = {};
  }

  get evts() {
    return Object.keys(this.events);
  }

  subscribe(event, handler) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(handler);
    return () => this.unSubscribe(event, handler);
  }

  unSubscribe(event, handler) {
    const handlers = this.events[event];

    if (handlers && Array.isArray(handlers)) {
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i, 1);
          break;
        }
      }
    }
  }

  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    console.groupCollapsed(`Event emitted: ${event}`);
    console.trace();
    console.groupEnd();
    (this.events[event] || []).forEach(handler => {
      handler(...args);
    });
  }

}

/***/ }),

/***/ 5618:
/***/ (function(module) {

!function (e, t) {
   true ? module.exports = t() : 0;
}(this, function () {
  "use strict";

  function e(t) {
    return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(t);
  }

  function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function i(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  function n(e, t, n) {
    return t && i(e.prototype, t), n && i(e, n), e;
  }

  var s = Date.now();

  function l() {
    var e = {},
        t = !0,
        i = 0,
        n = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], i++);

    for (var s = function (i) {
      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t && "[object Object]" === Object.prototype.toString.call(i[n]) ? e[n] = l(!0, e[n], i[n]) : e[n] = i[n]);
    }; i < n; i++) {
      var o = arguments[i];
      s(o);
    }

    return e;
  }

  function o(e, t) {
    if ((k(e) || e === window || e === document) && (e = [e]), A(e) || L(e) || (e = [e]), 0 != P(e)) if (A(e) && !L(e)) for (var i = e.length, n = 0; n < i && !1 !== t.call(e[n], e[n], n, e); n++);else if (L(e)) for (var s in e) if (O(e, s) && !1 === t.call(e[s], e[s], s, e)) break;
  }

  function r(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
        n = e[s] = e[s] || [],
        l = {
      all: n,
      evt: null,
      found: null
    };
    return t && i && P(n) > 0 && o(n, function (e, n) {
      if (e.eventName == t && e.fn.toString() == i.toString()) return l.found = !0, l.evt = n, !1;
    }), l;
  }

  function a(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = t.onElement,
        n = t.withCallback,
        s = t.avoidDuplicate,
        l = void 0 === s || s,
        a = t.once,
        h = void 0 !== a && a,
        d = t.useCapture,
        c = void 0 !== d && d,
        u = arguments.length > 2 ? arguments[2] : void 0,
        g = i || [];

    function v(e) {
      T(n) && n.call(u, e, this), h && v.destroy();
    }

    return C(g) && (g = document.querySelectorAll(g)), v.destroy = function () {
      o(g, function (t) {
        var i = r(t, e, v);
        i.found && i.all.splice(i.evt, 1), t.removeEventListener && t.removeEventListener(e, v, c);
      });
    }, o(g, function (t) {
      var i = r(t, e, v);
      (t.addEventListener && l && !i.found || !l) && (t.addEventListener(e, v, c), i.all.push({
        eventName: e,
        fn: v
      }));
    }), v;
  }

  function h(e, t) {
    o(t.split(" "), function (t) {
      return e.classList.add(t);
    });
  }

  function d(e, t) {
    o(t.split(" "), function (t) {
      return e.classList.remove(t);
    });
  }

  function c(e, t) {
    return e.classList.contains(t);
  }

  function u(e, t) {
    for (; e !== document.body;) {
      if (!(e = e.parentElement)) return !1;
      if ("function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e;
    }
  }

  function g(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!e || "" === t) return !1;
    if ("none" == t) return T(i) && i(), !1;
    var n = x(),
        s = t.split(" ");
    o(s, function (t) {
      h(e, "g" + t);
    }), a(n, {
      onElement: e,
      avoidDuplicate: !1,
      once: !0,
      withCallback: function (e, t) {
        o(s, function (e) {
          d(t, "g" + e);
        }), T(i) && i();
      }
    });
  }

  function v(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if ("" == t) return e.style.webkitTransform = "", e.style.MozTransform = "", e.style.msTransform = "", e.style.OTransform = "", e.style.transform = "", !1;
    e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t;
  }

  function f(e) {
    e.style.display = "block";
  }

  function p(e) {
    e.style.display = "none";
  }

  function m(e) {
    var t = document.createDocumentFragment(),
        i = document.createElement("div");

    for (i.innerHTML = e; i.firstChild;) t.appendChild(i.firstChild);

    return t;
  }

  function y() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
  }

  function x() {
    var e,
        t = document.createElement("fakeelement"),
        i = {
      animation: "animationend",
      OAnimation: "oAnimationEnd",
      MozAnimation: "animationend",
      WebkitAnimation: "webkitAnimationEnd"
    };

    for (e in i) if (void 0 !== t.style[e]) return i[e];
  }

  function b(e, t, i, n) {
    if (e()) t();else {
      var s;
      i || (i = 100);
      var l = setInterval(function () {
        e() && (clearInterval(l), s && clearTimeout(s), t());
      }, i);
      n && (s = setTimeout(function () {
        clearInterval(l);
      }, n));
    }
  }

  function S(e, t, i) {
    if (I(e)) console.error("Inject assets error");else if (T(t) && (i = t, t = !1), C(t) && t in window) T(i) && i();else {
      var n;

      if (-1 !== e.indexOf(".css")) {
        if ((n = document.querySelectorAll('link[href="' + e + '"]')) && n.length > 0) return void (T(i) && i());
        var s = document.getElementsByTagName("head")[0],
            l = s.querySelectorAll('link[rel="stylesheet"]'),
            o = document.createElement("link");
        return o.rel = "stylesheet", o.type = "text/css", o.href = e, o.media = "all", l ? s.insertBefore(o, l[0]) : s.appendChild(o), void (T(i) && i());
      }

      if ((n = document.querySelectorAll('script[src="' + e + '"]')) && n.length > 0) {
        if (T(i)) {
          if (C(t)) return b(function () {
            return void 0 !== window[t];
          }, function () {
            i();
          }), !1;
          i();
        }
      } else {
        var r = document.createElement("script");
        r.type = "text/javascript", r.src = e, r.onload = function () {
          if (T(i)) {
            if (C(t)) return b(function () {
              return void 0 !== window[t];
            }, function () {
              i();
            }), !1;
            i();
          }
        }, document.body.appendChild(r);
      }
    }
  }

  function w() {
    return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
  }

  function T(e) {
    return "function" == typeof e;
  }

  function C(e) {
    return "string" == typeof e;
  }

  function k(e) {
    return !(!e || !e.nodeType || 1 != e.nodeType);
  }

  function E(e) {
    return Array.isArray(e);
  }

  function A(e) {
    return e && e.length && isFinite(e.length);
  }

  function L(t) {
    return "object" === e(t) && null != t && !T(t) && !E(t);
  }

  function I(e) {
    return null == e;
  }

  function O(e, t) {
    return null !== e && hasOwnProperty.call(e, t);
  }

  function P(e) {
    if (L(e)) {
      if (e.keys) return e.keys().length;
      var t = 0;

      for (var i in e) O(e, i) && t++;

      return t;
    }

    return e.length;
  }

  function z(e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  }

  function M() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
        t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
    if (!t.length) return !1;
    if (1 == t.length) return t[0];
    "string" == typeof e && (e = parseInt(e));
    var i = e < 0 ? 1 : e + 1;
    i > t.length && (i = "1");
    var n = [];
    o(t, function (e) {
      n.push(e.getAttribute("data-taborder"));
    });
    var s = n.filter(function (e) {
      return e >= parseInt(i);
    }),
        l = s.sort()[0];
    return document.querySelector('.gbtn[data-taborder="'.concat(l, '"]'));
  }

  function X(e) {
    if (e.events.hasOwnProperty("keyboard")) return !1;
    e.events.keyboard = a("keydown", {
      onElement: window,
      withCallback: function (t, i) {
        var n = (t = t || window.event).keyCode;

        if (9 == n) {
          var s = document.querySelector(".gbtn.focused");

          if (!s) {
            var l = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
            if ("input" == l || "textarea" == l || "button" == l) return;
          }

          t.preventDefault();
          var o = document.querySelectorAll(".gbtn[data-taborder]");
          if (!o || o.length <= 0) return;

          if (!s) {
            var r = M();
            return void (r && (r.focus(), h(r, "focused")));
          }

          var a = M(s.getAttribute("data-taborder"));
          d(s, "focused"), a && (a.focus(), h(a, "focused"));
        }

        39 == n && e.nextSlide(), 37 == n && e.prevSlide(), 27 == n && e.close();
      }
    });
  }

  function Y(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
  }

  function q(e, t) {
    var i = function (e, t) {
      var i = Y(e) * Y(t);
      if (0 === i) return 0;

      var n = function (e, t) {
        return e.x * t.x + e.y * t.y;
      }(e, t) / i;

      return n > 1 && (n = 1), Math.acos(n);
    }(e, t);

    return function (e, t) {
      return e.x * t.y - t.x * e.y;
    }(e, t) > 0 && (i *= -1), 180 * i / Math.PI;
  }

  var N = function () {
    function e(i) {
      t(this, e), this.handlers = [], this.el = i;
    }

    return n(e, [{
      key: "add",
      value: function (e) {
        this.handlers.push(e);
      }
    }, {
      key: "del",
      value: function (e) {
        e || (this.handlers = []);

        for (var t = this.handlers.length; t >= 0; t--) this.handlers[t] === e && this.handlers.splice(t, 1);
      }
    }, {
      key: "dispatch",
      value: function () {
        for (var e = 0, t = this.handlers.length; e < t; e++) {
          var i = this.handlers[e];
          "function" == typeof i && i.apply(this.el, arguments);
        }
      }
    }]), e;
  }();

  function D(e, t) {
    var i = new N(e);
    return i.add(t), i;
  }

  var _ = function () {
    function e(i, n) {
      t(this, e), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
        x: null,
        y: null
      }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;

      var s = function () {};

      this.rotate = D(this.element, n.rotate || s), this.touchStart = D(this.element, n.touchStart || s), this.multipointStart = D(this.element, n.multipointStart || s), this.multipointEnd = D(this.element, n.multipointEnd || s), this.pinch = D(this.element, n.pinch || s), this.swipe = D(this.element, n.swipe || s), this.tap = D(this.element, n.tap || s), this.doubleTap = D(this.element, n.doubleTap || s), this.longTap = D(this.element, n.longTap || s), this.singleTap = D(this.element, n.singleTap || s), this.pressMove = D(this.element, n.pressMove || s), this.twoFingerPressMove = D(this.element, n.twoFingerPressMove || s), this.touchMove = D(this.element, n.touchMove || s), this.touchEnd = D(this.element, n.touchEnd || s), this.touchCancel = D(this.element, n.touchCancel || s), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
        x: null,
        y: null
      };
    }

    return n(e, [{
      key: "start",
      value: function (e) {
        if (e.touches) {
          if (e.target && e.target.nodeName && ["a", "button", "input"].indexOf(e.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase());else {
            this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
            var t = this.preV;

            if (e.touches.length > 1) {
              this._cancelLongTap(), this._cancelSingleTap();
              var i = {
                x: e.touches[1].pageX - this.x1,
                y: e.touches[1].pageY - this.y1
              };
              t.x = i.x, t.y = i.y, this.pinchStartLen = Y(t), this.multipointStart.dispatch(e, this.element);
            }

            this._preventTap = !1, this.longTapTimeout = setTimeout(function () {
              this.longTap.dispatch(e, this.element), this._preventTap = !0;
            }.bind(this), 750);
          }
        }
      }
    }, {
      key: "move",
      value: function (e) {
        if (e.touches) {
          var t = this.preV,
              i = e.touches.length,
              n = e.touches[0].pageX,
              s = e.touches[0].pageY;

          if (this.isDoubleTap = !1, i > 1) {
            var l = e.touches[1].pageX,
                o = e.touches[1].pageY,
                r = {
              x: e.touches[1].pageX - n,
              y: e.touches[1].pageY - s
            };
            null !== t.x && (this.pinchStartLen > 0 && (e.zoom = Y(r) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = q(r, t), this.rotate.dispatch(e, this.element)), t.x = r.x, t.y = r.y, null !== this.x2 && null !== this.sx2 ? (e.deltaX = (n - this.x2 + l - this.sx2) / 2, e.deltaY = (s - this.y2 + o - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = l, this.sy2 = o;
          } else {
            if (null !== this.x2) {
              e.deltaX = n - this.x2, e.deltaY = s - this.y2;
              var a = Math.abs(this.x1 - this.x2),
                  h = Math.abs(this.y1 - this.y2);
              (a > 10 || h > 10) && (this._preventTap = !0);
            } else e.deltaX = 0, e.deltaY = 0;

            this.pressMove.dispatch(e, this.element);
          }

          this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, i > 1 && e.preventDefault();
        }
      }
    }, {
      key: "end",
      value: function (e) {
        if (e.changedTouches) {
          this._cancelLongTap();

          var t = this;
          e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function () {
            t.swipe.dispatch(e, t.element);
          }, 0)) : (this.tapTimeout = setTimeout(function () {
            t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1);
          }, 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout(function () {
            t.singleTap.dispatch(e, t.element);
          }, 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
        }
      }
    }, {
      key: "cancelAll",
      value: function () {
        this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
      }
    }, {
      key: "cancel",
      value: function (e) {
        this.cancelAll(), this.touchCancel.dispatch(e, this.element);
      }
    }, {
      key: "_cancelLongTap",
      value: function () {
        clearTimeout(this.longTapTimeout);
      }
    }, {
      key: "_cancelSingleTap",
      value: function () {
        clearTimeout(this.singleTapTimeout);
      }
    }, {
      key: "_swipeDirection",
      value: function (e, t, i, n) {
        return Math.abs(e - t) >= Math.abs(i - n) ? e - t > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down";
      }
    }, {
      key: "on",
      value: function (e, t) {
        this[e] && this[e].add(t);
      }
    }, {
      key: "off",
      value: function (e, t) {
        this[e] && this[e].del(t);
      }
    }, {
      key: "destroy",
      value: function () {
        return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
      }
    }]), e;
  }();

  function W(e) {
    var t = function () {
      var e,
          t = document.createElement("fakeelement"),
          i = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
      };

      for (e in i) if (void 0 !== t.style[e]) return i[e];
    }(),
        i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        n = c(e, "gslide-media") ? e : e.querySelector(".gslide-media"),
        s = u(n, ".ginner-container"),
        l = e.querySelector(".gslide-description");

    i > 769 && (n = s), h(n, "greset"), v(n, "translate3d(0, 0, 0)"), a(t, {
      onElement: n,
      once: !0,
      withCallback: function (e, t) {
        d(n, "greset");
      }
    }), n.style.opacity = "", l && (l.style.opacity = "");
  }

  function B(e) {
    if (e.events.hasOwnProperty("touch")) return !1;
    var t,
        i,
        n,
        s = y(),
        l = s.width,
        o = s.height,
        r = !1,
        a = null,
        g = null,
        f = null,
        p = !1,
        m = 1,
        x = 1,
        b = !1,
        S = !1,
        w = null,
        T = null,
        C = null,
        k = null,
        E = 0,
        A = 0,
        L = !1,
        I = !1,
        O = {},
        P = {},
        z = 0,
        M = 0,
        X = document.getElementById("glightbox-slider"),
        Y = document.querySelector(".goverlay"),
        q = new _(X, {
      touchStart: function (t) {
        if (r = !0, (c(t.targetTouches[0].target, "ginner-container") || u(t.targetTouches[0].target, ".gslide-desc") || "a" == t.targetTouches[0].target.nodeName.toLowerCase()) && (r = !1), u(t.targetTouches[0].target, ".gslide-inline") && !c(t.targetTouches[0].target.parentNode, "gslide-inline") && (r = !1), r) {
          if (P = t.targetTouches[0], O.pageX = t.targetTouches[0].pageX, O.pageY = t.targetTouches[0].pageY, z = t.targetTouches[0].clientX, M = t.targetTouches[0].clientY, a = e.activeSlide, g = a.querySelector(".gslide-media"), n = a.querySelector(".gslide-inline"), f = null, c(g, "gslide-image") && (f = g.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (g = a.querySelector(".ginner-container")), d(Y, "greset"), t.pageX > 20 && t.pageX < window.innerWidth - 20) return;
          t.preventDefault();
        }
      },
      touchMove: function (s) {
        if (r && (P = s.targetTouches[0], !b && !S)) {
          if (n && n.offsetHeight > o) {
            var a = O.pageX - P.pageX;
            if (Math.abs(a) <= 13) return !1;
          }

          p = !0;
          var h,
              d = s.targetTouches[0].clientX,
              c = s.targetTouches[0].clientY,
              u = z - d,
              m = M - c;
          if (Math.abs(u) > Math.abs(m) ? (L = !1, I = !0) : (I = !1, L = !0), t = P.pageX - O.pageX, E = 100 * t / l, i = P.pageY - O.pageY, A = 100 * i / o, L && f && (h = 1 - Math.abs(i) / o, Y.style.opacity = h, e.settings.touchFollowAxis && (E = 0)), I && (h = 1 - Math.abs(t) / l, g.style.opacity = h, e.settings.touchFollowAxis && (A = 0)), !f) return v(g, "translate3d(".concat(E, "%, 0, 0)"));
          v(g, "translate3d(".concat(E, "%, ").concat(A, "%, 0)"));
        }
      },
      touchEnd: function () {
        if (r) {
          if (p = !1, S || b) return C = w, void (k = T);
          var t = Math.abs(parseInt(A)),
              i = Math.abs(parseInt(E));
          if (!(t > 29 && f)) return t < 29 && i < 25 ? (h(Y, "greset"), Y.style.opacity = 1, W(g)) : void 0;
          e.close();
        }
      },
      multipointEnd: function () {
        setTimeout(function () {
          b = !1;
        }, 50);
      },
      multipointStart: function () {
        b = !0, m = x || 1;
      },
      pinch: function (e) {
        if (!f || p) return !1;
        b = !0, f.scaleX = f.scaleY = m * e.zoom;
        var t = m * e.zoom;
        if (S = !0, t <= 1) return S = !1, t = 1, k = null, C = null, w = null, T = null, void f.setAttribute("style", "");
        t > 4.5 && (t = 4.5), f.style.transform = "scale3d(".concat(t, ", ").concat(t, ", 1)"), x = t;
      },
      pressMove: function (e) {
        if (S && !b) {
          var t = P.pageX - O.pageX,
              i = P.pageY - O.pageY;
          C && (t += C), k && (i += k), w = t, T = i;
          var n = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
          x && (n += " scale3d(".concat(x, ", ").concat(x, ", 1)")), v(f, n);
        }
      },
      swipe: function (t) {
        if (!S) if (b) b = !1;else {
          if ("Left" == t.direction) {
            if (e.index == e.elements.length - 1) return W(g);
            e.nextSlide();
          }

          if ("Right" == t.direction) {
            if (0 == e.index) return W(g);
            e.prevSlide();
          }
        }
      }
    });
    e.events.touch = q;
  }

  var H = function () {
    function e(i, n) {
      var s = this,
          l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
      if (t(this, e), this.img = i, this.slide = n, this.onclose = l, this.img.setZoomEvents) return !1;
      this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function (e) {
        return s.dragStart(e);
      }, !1), this.img.addEventListener("mouseup", function (e) {
        return s.dragEnd(e);
      }, !1), this.img.addEventListener("mousemove", function (e) {
        return s.drag(e);
      }, !1), this.img.addEventListener("click", function (e) {
        return s.slide.classList.contains("dragging-nav") ? (s.zoomOut(), !1) : s.zoomedIn ? void (s.zoomedIn && !s.dragging && s.zoomOut()) : s.zoomIn();
      }, !1), this.img.setZoomEvents = !0;
    }

    return n(e, [{
      key: "zoomIn",
      value: function () {
        var e = this.widowWidth();

        if (!(this.zoomedIn || e <= 768)) {
          var t = this.img;

          if (t.setAttribute("data-style", t.getAttribute("style")), t.style.maxWidth = t.naturalWidth + "px", t.style.maxHeight = t.naturalHeight + "px", t.naturalWidth > e) {
            var i = e / 2 - t.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, i, 0);
          }

          this.slide.classList.add("zoomed"), this.zoomedIn = !0;
        }
      }
    }, {
      key: "zoomOut",
      value: function () {
        this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose();
      }
    }, {
      key: "dragStart",
      value: function (e) {
        e.preventDefault(), this.zoomedIn ? ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
      }
    }, {
      key: "dragEnd",
      value: function (e) {
        var t = this;
        e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function () {
          t.dragging = !1, t.img.isDragging = !1, t.img.classList.remove("dragging");
        }, 100);
      }
    }, {
      key: "drag",
      value: function (e) {
        this.active && (e.preventDefault(), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
      }
    }, {
      key: "onMove",
      value: function (e) {
        if (this.zoomedIn) {
          var t = e.clientX - this.img.naturalWidth / 2,
              i = e.clientY - this.img.naturalHeight / 2;
          this.setTranslate(this.img, t, i);
        }
      }
    }, {
      key: "setTranslate",
      value: function (e, t, i) {
        e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)";
      }
    }, {
      key: "widowWidth",
      value: function () {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      }
    }]), e;
  }(),
      V = function () {
    function e() {
      var i = this,
          n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e);
      var s = n.dragEl,
          l = n.toleranceX,
          o = void 0 === l ? 40 : l,
          r = n.toleranceY,
          a = void 0 === r ? 65 : r,
          h = n.slide,
          d = void 0 === h ? null : h,
          c = n.instance,
          u = void 0 === c ? null : c;
      this.el = s, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = o, this.toleranceY = a, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = d, this.instance = u, this.el.addEventListener("mousedown", function (e) {
        return i.dragStart(e);
      }, !1), this.el.addEventListener("mouseup", function (e) {
        return i.dragEnd(e);
      }, !1), this.el.addEventListener("mousemove", function (e) {
        return i.drag(e);
      }, !1);
    }

    return n(e, [{
      key: "dragStart",
      value: function (e) {
        if (this.slide.classList.contains("zoomed")) this.active = !1;else {
          "touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset);
          var t = e.target.nodeName.toLowerCase();
          e.target.classList.contains("nodrag") || u(e.target, ".nodrag") || -1 !== ["input", "select", "textarea", "button", "a"].indexOf(t) ? this.active = !1 : (e.preventDefault(), (e.target === this.el || "img" !== t && u(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = u(e.target, ".ginner-container")));
        }
      }
    }, {
      key: "dragEnd",
      value: function (e) {
        var t = this;
        e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function () {
          t.instance.preventOutsideClick = !1, t.toleranceReached = !1, t.lastDirection = null, t.dragging = !1, t.el.isDragging = !1, t.el.classList.remove("dragging"), t.slide.classList.remove("dragging-nav"), t.dragContainer.style.transform = "", t.dragContainer.style.transition = "";
        }, 100);
      }
    }, {
      key: "drag",
      value: function (e) {
        if (this.active) {
          e.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
          var t = Math.abs(this.currentX),
              i = Math.abs(this.currentY);

          if (t > 0 && t >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
            var n = this.shouldChange();
            if (!this.instance.settings.dragAutoSnap && n && (this.doSlideChange = n), this.instance.settings.dragAutoSnap && n) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == n && this.instance.prevSlide(), void ("left" == n && this.instance.nextSlide());
          }

          if (this.toleranceY > 0 && i > 0 && i >= t && (!this.lastDirection || "y" == this.lastDirection)) {
            this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
            var s = this.shouldClose();
            return !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0), void (this.instance.settings.dragAutoSnap && s && this.instance.close());
          }
        }
      }
    }, {
      key: "shouldChange",
      value: function () {
        var e = !1;

        if (Math.abs(this.currentX) >= this.toleranceX) {
          var t = this.currentX > 0 ? "right" : "left";
          ("left" == t && this.slide !== this.slide.parentNode.lastChild || "right" == t && this.slide !== this.slide.parentNode.firstChild) && (e = t);
        }

        return e;
      }
    }, {
      key: "shouldClose",
      value: function () {
        var e = !1;
        return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e;
      }
    }, {
      key: "setTranslate",
      value: function (e, t, i) {
        var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        e.style.transition = n ? "all .2s ease" : "", e.style.transform = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
      }
    }]), e;
  }();

  function j(e, t, i, n) {
    var s = e.querySelector(".gslide-media"),
        l = new Image(),
        o = "gSlideTitle_" + i,
        r = "gSlideDesc_" + i;
    l.addEventListener("load", function () {
      T(n) && n();
    }, !1), l.src = t.href, "" != t.sizes && "" != t.srcset && (l.sizes = t.sizes, l.srcset = t.srcset), l.alt = "", I(t.alt) || "" === t.alt || (l.alt = t.alt), "" !== t.title && l.setAttribute("aria-labelledby", o), "" !== t.description && l.setAttribute("aria-describedby", r), t.hasOwnProperty("_hasCustomWidth") && t._hasCustomWidth && (l.style.width = t.width), t.hasOwnProperty("_hasCustomHeight") && t._hasCustomHeight && (l.style.height = t.height), s.insertBefore(l, s.firstChild);
  }

  function F(e, t, i, n) {
    var s = this,
        l = e.querySelector(".ginner-container"),
        o = "gvideo" + i,
        r = e.querySelector(".gslide-media"),
        a = this.getAllPlayers();
    h(l, "gvideo-container"), r.insertBefore(m('<div class="gvideo-wrapper"></div>'), r.firstChild);
    var d = e.querySelector(".gvideo-wrapper");
    S(this.settings.plyr.css, "Plyr");
    var c = t.href,
        u = location.protocol.replace(":", ""),
        g = "",
        v = "",
        f = !1;
    "file" == u && (u = "http"), r.style.maxWidth = t.width, S(this.settings.plyr.js, "Plyr", function () {
      if (c.match(/vimeo\.com\/([0-9]*)/)) {
        var l = /vimeo.*\/(\d+)/i.exec(c);
        g = "vimeo", v = l[1];
      }

      if (c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
        var r = function (e) {
          var t = "";
          t = void 0 !== (e = e.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] ? (t = e[2].split(/[^0-9a-z_\-]/i))[0] : e;
          return t;
        }(c);

        g = "youtube", v = r;
      }

      if (null !== c.match(/\.(mp4|ogg|webm|mov)$/)) {
        g = "local";
        var u = '<video id="' + o + '" ';
        u += 'style="background:#000; max-width: '.concat(t.width, ';" '), u += 'preload="metadata" ', u += 'x-webkit-airplay="allow" ', u += "playsinline ", u += "controls ", u += 'class="gvideo-local">';
        var p = c.toLowerCase().split(".").pop(),
            y = {
          mp4: "",
          ogg: "",
          webm: ""
        };

        for (var x in y[p = "mov" == p ? "mp4" : p] = c, y) if (y.hasOwnProperty(x)) {
          var S = y[x];
          t.hasOwnProperty(x) && (S = t[x]), "" !== S && (u += '<source src="'.concat(S, '" type="video/').concat(x, '">'));
        }

        f = m(u += "</video>");
      }

      var w = f || m('<div id="'.concat(o, '" data-plyr-provider="').concat(g, '" data-plyr-embed-id="').concat(v, '"></div>'));
      h(d, "".concat(g, "-video gvideo")), d.appendChild(w), d.setAttribute("data-id", o), d.setAttribute("data-index", i);
      var C = O(s.settings.plyr, "config") ? s.settings.plyr.config : {},
          k = new Plyr("#" + o, C);
      k.on("ready", function (e) {
        var t = e.detail.plyr;
        a[o] = t, T(n) && n();
      }), b(function () {
        return e.querySelector("iframe") && "true" == e.querySelector("iframe").dataset.ready;
      }, function () {
        s.resize(e);
      }), k.on("enterfullscreen", R), k.on("exitfullscreen", R);
    });
  }

  function R(e) {
    var t = u(e.target, ".gslide-media");
    "enterfullscreen" == e.type && h(t, "fullscreen"), "exitfullscreen" == e.type && d(t, "fullscreen");
  }

  function G(e, t, i, n) {
    var s,
        l = this,
        o = e.querySelector(".gslide-media"),
        r = !(!O(t, "href") || !t.href) && t.href.split("#").pop().trim(),
        d = !(!O(t, "content") || !t.content) && t.content;

    if (d && (C(d) && (s = m('<div class="ginlined-content">'.concat(d, "</div>"))), k(d))) {
      "none" == d.style.display && (d.style.display = "block");
      var c = document.createElement("div");
      c.className = "ginlined-content", c.appendChild(d), s = c;
    }

    if (r) {
      var u = document.getElementById(r);
      if (!u) return !1;
      var g = u.cloneNode(!0);
      g.style.height = t.height, g.style.maxWidth = t.width, h(g, "ginlined-content"), s = g;
    }

    if (!s) return console.error("Unable to append inline slide content", t), !1;
    o.style.height = t.height, o.style.width = t.width, o.appendChild(s), this.events["inlineclose" + r] = a("click", {
      onElement: o.querySelectorAll(".gtrigger-close"),
      withCallback: function (e) {
        e.preventDefault(), l.close();
      }
    }), T(n) && n();
  }

  function Z(e, t, i, n) {
    var s = e.querySelector(".gslide-media"),
        l = function (e) {
      var t = e.url,
          i = e.allow,
          n = e.callback,
          s = e.appendTo,
          l = document.createElement("iframe");
      return l.className = "vimeo-video gvideo", l.src = t, l.style.width = "100%", l.style.height = "100%", i && l.setAttribute("allow", i), l.onload = function () {
        h(l, "node-ready"), T(n) && n();
      }, s && s.appendChild(l), l;
    }({
      url: t.href,
      callback: n
    });

    s.parentNode.style.maxWidth = t.width, s.parentNode.style.height = t.height, s.appendChild(l);
  }

  var $ = function () {
    function e() {
      var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e), this.defaults = {
        href: "",
        sizes: "",
        srcset: "",
        title: "",
        type: "",
        description: "",
        alt: "",
        descPosition: "bottom",
        effect: "",
        width: "",
        height: "",
        content: !1,
        zoomable: !0,
        draggable: !0
      }, L(i) && (this.defaults = l(this.defaults, i));
    }

    return n(e, [{
      key: "sourceType",
      value: function (e) {
        var t = e;
        if (null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/)) return "image";
        if (e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) return "video";
        if (e.match(/vimeo\.com\/([0-9]*)/)) return "video";
        if (null !== e.match(/\.(mp4|ogg|webm|mov)/)) return "video";
        if (null !== e.match(/\.(mp3|wav|wma|aac|ogg)/)) return "audio";
        if (e.indexOf("#") > -1 && "" !== t.split("#").pop().trim()) return "inline";
        return e.indexOf("goajax=true") > -1 ? "ajax" : "external";
      }
    }, {
      key: "parseConfig",
      value: function (e, t) {
        var i = this,
            n = l({
          descPosition: t.descPosition
        }, this.defaults);

        if (L(e) && !k(e)) {
          O(e, "type") || (O(e, "content") && e.content ? e.type = "inline" : O(e, "href") && (e.type = this.sourceType(e.href)));
          var s = l(n, e);
          return this.setSize(s, t), s;
        }

        var r = "",
            a = e.getAttribute("data-glightbox"),
            h = e.nodeName.toLowerCase();

        if ("a" === h && (r = e.href), "img" === h && (r = e.src, n.alt = e.alt), n.href = r, o(n, function (s, l) {
          O(t, l) && "width" !== l && (n[l] = t[l]);
          var o = e.dataset[l];
          I(o) || (n[l] = i.sanitizeValue(o));
        }), n.content && (n.type = "inline"), !n.type && r && (n.type = this.sourceType(r)), I(a)) {
          if (!n.title && "a" == h) {
            var d = e.title;
            I(d) || "" === d || (n.title = d);
          }

          if (!n.title && "img" == h) {
            var c = e.alt;
            I(c) || "" === c || (n.title = c);
          }
        } else {
          var u = [];
          o(n, function (e, t) {
            u.push(";\\s?" + t);
          }), u = u.join("\\s?:|"), "" !== a.trim() && o(n, function (e, t) {
            var s = a,
                l = new RegExp("s?" + t + "s?:s?(.*?)(" + u + "s?:|$)"),
                o = s.match(l);

            if (o && o.length && o[1]) {
              var r = o[1].trim().replace(/;\s*$/, "");
              n[t] = i.sanitizeValue(r);
            }
          });
        }

        if (n.description && "." === n.description.substring(0, 1)) {
          var g;

          try {
            g = document.querySelector(n.description).innerHTML;
          } catch (e) {
            if (!(e instanceof DOMException)) throw e;
          }

          g && (n.description = g);
        }

        if (!n.description) {
          var v = e.querySelector(".glightbox-desc");
          v && (n.description = v.innerHTML);
        }

        return this.setSize(n, t, e), this.slideConfig = n, n;
      }
    }, {
      key: "setSize",
      value: function (e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            n = "video" == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
            s = this.checkSize(t.height);
        return e.width = O(e, "width") && "" !== e.width ? this.checkSize(e.width) : n, e.height = O(e, "height") && "" !== e.height ? this.checkSize(e.height) : s, i && "image" == e.type && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e;
      }
    }, {
      key: "checkSize",
      value: function (e) {
        return z(e) ? "".concat(e, "px") : e;
      }
    }, {
      key: "sanitizeValue",
      value: function (e) {
        return "true" !== e && "false" !== e ? e : "true" === e;
      }
    }]), e;
  }(),
      U = function () {
    function e(i, n, s) {
      t(this, e), this.element = i, this.instance = n, this.index = s;
    }

    return n(e, [{
      key: "setContent",
      value: function () {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (c(t, "loaded")) return !1;
        var n = this.instance.settings,
            s = this.slideConfig,
            l = w();
        T(n.beforeSlideLoad) && n.beforeSlideLoad({
          index: this.index,
          slide: t,
          player: !1
        });
        var o = s.type,
            r = s.descPosition,
            a = t.querySelector(".gslide-media"),
            d = t.querySelector(".gslide-title"),
            u = t.querySelector(".gslide-desc"),
            g = t.querySelector(".gdesc-inner"),
            v = i,
            f = "gSlideTitle_" + this.index,
            p = "gSlideDesc_" + this.index;

        if (T(n.afterSlideLoad) && (v = function () {
          T(i) && i(), n.afterSlideLoad({
            index: e.index,
            slide: t,
            player: e.instance.getSlidePlayerInstance(e.index)
          });
        }), "" == s.title && "" == s.description ? g && g.parentNode.parentNode.removeChild(g.parentNode) : (d && "" !== s.title ? (d.id = f, d.innerHTML = s.title) : d.parentNode.removeChild(d), u && "" !== s.description ? (u.id = p, l && n.moreLength > 0 ? (s.smallDescription = this.slideShortDesc(s.description, n.moreLength, n.moreText), u.innerHTML = s.smallDescription, this.descriptionEvents(u, s)) : u.innerHTML = s.description) : u.parentNode.removeChild(u), h(a.parentNode, "desc-".concat(r)), h(g.parentNode, "description-".concat(r))), h(a, "gslide-".concat(o)), h(t, "loaded"), "video" !== o) {
          if ("external" !== o) return "inline" === o ? (G.apply(this.instance, [t, s, this.index, v]), void (s.draggable && new V({
            dragEl: t.querySelector(".gslide-inline"),
            toleranceX: n.dragToleranceX,
            toleranceY: n.dragToleranceY,
            slide: t,
            instance: this.instance
          }))) : void ("image" !== o ? T(v) && v() : j(t, s, this.index, function () {
            var i = t.querySelector("img");
            s.draggable && new V({
              dragEl: i,
              toleranceX: n.dragToleranceX,
              toleranceY: n.dragToleranceY,
              slide: t,
              instance: e.instance
            }), s.zoomable && i.naturalWidth > i.offsetWidth && (h(i, "zoomable"), new H(i, t, function () {
              e.instance.resize();
            })), T(v) && v();
          }));
          Z.apply(this, [t, s, this.index, v]);
        } else F.apply(this.instance, [t, s, this.index, v]);
      }
    }, {
      key: "slideShortDesc",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = document.createElement("div");
        n.innerHTML = e;
        var s = n.innerText,
            l = i;
        if ((e = s.trim()).length <= t) return e;
        var o = e.substr(0, t - 1);
        return l ? (n = null, o + '... <a href="#" class="desc-more">' + i + "</a>") : o;
      }
    }, {
      key: "descriptionEvents",
      value: function (e, t) {
        var i = this,
            n = e.querySelector(".desc-more");
        if (!n) return !1;
        a("click", {
          onElement: n,
          withCallback: function (e, n) {
            e.preventDefault();
            var s = document.body,
                l = u(n, ".gslide-desc");
            if (!l) return !1;
            l.innerHTML = t.description, h(s, "gdesc-open");
            var o = a("click", {
              onElement: [s, u(l, ".gslide-description")],
              withCallback: function (e, n) {
                "a" !== e.target.nodeName.toLowerCase() && (d(s, "gdesc-open"), h(s, "gdesc-closed"), l.innerHTML = t.smallDescription, i.descriptionEvents(l, t), setTimeout(function () {
                  d(s, "gdesc-closed");
                }, 400), o.destroy());
              }
            });
          }
        });
      }
    }, {
      key: "create",
      value: function () {
        return m(this.instance.settings.slideHTML);
      }
    }, {
      key: "getConfig",
      value: function () {
        k(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var e = new $(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig;
      }
    }]), e;
  }(),
      J = w(),
      K = null !== w() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
      Q = document.getElementsByTagName("html")[0],
      ee = {
    selector: ".glightbox",
    elements: null,
    skin: "clean",
    theme: "clean",
    closeButton: !0,
    startAt: null,
    autoplayVideos: !0,
    autofocusVideos: !0,
    descPosition: "bottom",
    width: "900px",
    height: "506px",
    videosWidth: "960px",
    beforeSlideChange: null,
    afterSlideChange: null,
    beforeSlideLoad: null,
    afterSlideLoad: null,
    slideInserted: null,
    slideRemoved: null,
    slideExtraAttributes: null,
    onOpen: null,
    onClose: null,
    loop: !1,
    zoomable: !0,
    draggable: !0,
    dragAutoSnap: !1,
    dragToleranceX: 40,
    dragToleranceY: 65,
    preload: !0,
    oneSlidePerOpen: !1,
    touchNavigation: !0,
    touchFollowAxis: !0,
    keyboardNavigation: !0,
    closeOnOutsideClick: !0,
    plugins: !1,
    plyr: {
      css: "https://cdn.plyr.io/3.6.8/plyr.css",
      js: "https://cdn.plyr.io/3.6.8/plyr.js",
      config: {
        ratio: "16:9",
        fullscreen: {
          enabled: !0,
          iosNative: !0
        },
        youtube: {
          noCookie: !0,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        vimeo: {
          byline: !1,
          portrait: !1,
          title: !1,
          transparent: !1
        }
      }
    },
    openEffect: "zoom",
    closeEffect: "zoom",
    slideEffect: "slide",
    moreText: "See more",
    moreLength: 60,
    cssEfects: {
      fade: {
        in: "fadeIn",
        out: "fadeOut"
      },
      zoom: {
        in: "zoomIn",
        out: "zoomOut"
      },
      slide: {
        in: "slideInRight",
        out: "slideOutLeft"
      },
      slideBack: {
        in: "slideInLeft",
        out: "slideOutRight"
      },
      none: {
        in: "none",
        out: "none"
      }
    },
    svg: {
      close: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
      next: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
      prev: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
    },
    slideHTML: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
    lightboxHTML: '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'
  },
      te = function () {
    function e() {
      var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e), this.customOptions = i, this.settings = l(ee, i), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
    }

    return n(e, [{
      key: "init",
      value: function () {
        var e = this,
            t = this.getSelector();
        t && (this.baseEvents = a("click", {
          onElement: t,
          withCallback: function (t, i) {
            t.preventDefault(), e.open(i);
          }
        })), this.elements = this.getElements();
      }
    }, {
      key: "open",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (0 == this.elements.length) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var i = z(t) ? t : this.settings.startAt;

        if (k(e)) {
          var n = e.getAttribute("data-gallery");
          n && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, n)), I(i) && (i = this.getElementIndex(e)) < 0 && (i = 0);
        }

        z(i) || (i = 0), this.build(), g(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
        var s = document.body,
            l = window.innerWidth - document.documentElement.clientWidth;

        if (l > 0) {
          var o = document.createElement("style");
          o.type = "text/css", o.className = "gcss-styles", o.innerText = ".gscrollbar-fixer {margin-right: ".concat(l, "px}"), document.head.appendChild(o), h(s, "gscrollbar-fixer");
        }

        h(s, "glightbox-open"), h(Q, "glightbox-open"), J && (h(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), 1 == this.elements.length ? (h(this.prevButton, "glightbox-button-hidden"), h(this.nextButton, "glightbox-button-hidden")) : (d(this.prevButton, "glightbox-button-hidden"), d(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), T(this.settings.onOpen) && this.settings.onOpen(), K && this.settings.touchNavigation && B(this), this.settings.keyboardNavigation && X(this);
      }
    }, {
      key: "openAt",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.open(null, e);
      }
    }, {
      key: "showSlide",
      value: function () {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        f(this.loader), this.index = parseInt(t);
        var n = this.slidesContainer.querySelector(".current");
        n && d(n, "current"), this.slideAnimateOut();
        var s = this.slidesContainer.querySelectorAll(".gslide")[t];
        if (c(s, "loaded")) this.slideAnimateIn(s, i), p(this.loader);else {
          f(this.loader);
          var l = this.elements[t],
              o = {
            index: this.index,
            slide: s,
            slideNode: s,
            slideConfig: l.slideConfig,
            slideIndex: this.index,
            trigger: l.node,
            player: null
          };
          this.trigger("slide_before_load", o), l.instance.setContent(s, function () {
            p(e.loader), e.resize(), e.slideAnimateIn(s, i), e.trigger("slide_after_load", o);
          });
        }
        this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && c(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)), this.updateNavigationClasses(), this.activeSlide = s;
      }
    }, {
      key: "preloadSlide",
      value: function (e) {
        var t = this;
        if (e < 0 || e > this.elements.length - 1) return !1;
        if (I(this.elements[e])) return !1;
        var i = this.slidesContainer.querySelectorAll(".gslide")[e];
        if (c(i, "loaded")) return !1;
        var n = this.elements[e],
            s = n.type,
            l = {
          index: e,
          slide: i,
          slideNode: i,
          slideConfig: n.slideConfig,
          slideIndex: e,
          trigger: n.node,
          player: null
        };
        this.trigger("slide_before_load", l), "video" == s || "external" == s ? setTimeout(function () {
          n.instance.setContent(i, function () {
            t.trigger("slide_after_load", l);
          });
        }, 200) : n.instance.setContent(i, function () {
          t.trigger("slide_after_load", l);
        });
      }
    }, {
      key: "prevSlide",
      value: function () {
        this.goToSlide(this.index - 1);
      }
    }, {
      key: "nextSlide",
      value: function () {
        this.goToSlide(this.index + 1);
      }
    }, {
      key: "goToSlide",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1)) return !1;
        e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e);
      }
    }, {
      key: "insertSlide",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
        t < 0 && (t = this.elements.length);
        var i = new U(e, this, t),
            n = i.getConfig(),
            s = l({}, n),
            o = i.create(),
            r = this.elements.length - 1;
        s.index = t, s.node = !1, s.instance = i, s.slideConfig = n, this.elements.splice(t, 0, s);
        var a = null,
            h = null;

        if (this.slidesContainer) {
          if (t > r) this.slidesContainer.appendChild(o);else {
            var d = this.slidesContainer.querySelectorAll(".gslide")[t];
            this.slidesContainer.insertBefore(o, d);
          }
          (this.settings.preload && 0 == this.index && 0 == t || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), 0 == this.index && 0 == t && (this.index = 1), this.updateNavigationClasses(), a = this.slidesContainer.querySelectorAll(".gslide")[t], h = this.getSlidePlayerInstance(t), s.slideNode = a;
        }

        this.trigger("slide_inserted", {
          index: t,
          slide: a,
          slideNode: a,
          slideConfig: n,
          slideIndex: t,
          trigger: null,
          player: h
        }), T(this.settings.slideInserted) && this.settings.slideInserted({
          index: t,
          slide: a,
          player: h
        });
      }
    }, {
      key: "removeSlide",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
        if (e < 0 || e > this.elements.length - 1) return !1;
        var t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
        t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), T(this.settings.slideRemoved) && this.settings.slideRemoved(e);
      }
    }, {
      key: "slideAnimateIn",
      value: function (e, t) {
        var i = this,
            n = e.querySelector(".gslide-media"),
            s = e.querySelector(".gslide-description"),
            l = {
          index: this.prevActiveSlideIndex,
          slide: this.prevActiveSlide,
          slideNode: this.prevActiveSlide,
          slideIndex: this.prevActiveSlide,
          slideConfig: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
          trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
          player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
        },
            o = {
          index: this.index,
          slide: this.activeSlide,
          slideNode: this.activeSlide,
          slideConfig: this.elements[this.index].slideConfig,
          slideIndex: this.index,
          trigger: this.elements[this.index].node,
          player: this.getSlidePlayerInstance(this.index)
        };
        if (n.offsetWidth > 0 && s && (p(s), s.style.display = ""), d(e, this.effectsClasses), t) g(e, this.settings.cssEfects[this.settings.openEffect].in, function () {
          i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
            prev: l,
            current: o
          }), T(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o]);
        });else {
          var r = this.settings.slideEffect,
              a = "none" !== r ? this.settings.cssEfects[r].in : r;
          this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (a = this.settings.cssEfects.slideBack.in), g(e, a, function () {
            i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
              prev: l,
              current: o
            }), T(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o]);
          });
        }
        setTimeout(function () {
          i.resize(e);
        }, 100), h(e, "current");
      }
    }, {
      key: "slideAnimateOut",
      value: function () {
        if (!this.prevActiveSlide) return !1;
        var e = this.prevActiveSlide;
        d(e, this.effectsClasses), h(e, "prev");
        var t = this.settings.slideEffect,
            i = "none" !== t ? this.settings.cssEfects[t].out : t;
        this.slidePlayerPause(e), this.trigger("slide_before_change", {
          prev: {
            index: this.prevActiveSlideIndex,
            slide: this.prevActiveSlide,
            slideNode: this.prevActiveSlide,
            slideIndex: this.prevActiveSlideIndex,
            slideConfig: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
            trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
          },
          current: {
            index: this.index,
            slide: this.activeSlide,
            slideNode: this.activeSlide,
            slideIndex: this.index,
            slideConfig: this.elements[this.index].slideConfig,
            trigger: this.elements[this.index].node,
            player: this.getSlidePlayerInstance(this.index)
          }
        }), T(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
          index: this.prevActiveSlideIndex,
          slide: this.prevActiveSlide,
          player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
        }, {
          index: this.index,
          slide: this.activeSlide,
          player: this.getSlidePlayerInstance(this.index)
        }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slideBack.out), g(e, i, function () {
          var t = e.querySelector(".ginner-container"),
              i = e.querySelector(".gslide-media"),
              n = e.querySelector(".gslide-description");
          t.style.transform = "", i.style.transform = "", d(i, "greset"), i.style.opacity = "", n && (n.style.opacity = ""), d(e, "prev");
        });
      }
    }, {
      key: "getAllPlayers",
      value: function () {
        return this.videoPlayers;
      }
    }, {
      key: "getSlidePlayerInstance",
      value: function (e) {
        var t = "gvideo" + e,
            i = this.getAllPlayers();
        return !(!O(i, t) || !i[t]) && i[t];
      }
    }, {
      key: "stopSlideVideo",
      value: function (e) {
        if (k(e)) {
          var t = e.querySelector(".gvideo-wrapper");
          t && (e = t.getAttribute("data-index"));
        }

        console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var i = this.getSlidePlayerInstance(e);
        i && i.playing && i.pause();
      }
    }, {
      key: "slidePlayerPause",
      value: function (e) {
        if (k(e)) {
          var t = e.querySelector(".gvideo-wrapper");
          t && (e = t.getAttribute("data-index"));
        }

        var i = this.getSlidePlayerInstance(e);
        i && i.playing && i.pause();
      }
    }, {
      key: "playSlideVideo",
      value: function (e) {
        if (k(e)) {
          var t = e.querySelector(".gvideo-wrapper");
          t && (e = t.getAttribute("data-index"));
        }

        console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var i = this.getSlidePlayerInstance(e);
        i && !i.playing && i.play();
      }
    }, {
      key: "slidePlayerPlay",
      value: function (e) {
        if (k(e)) {
          var t = e.querySelector(".gvideo-wrapper");
          t && (e = t.getAttribute("data-index"));
        }

        var i = this.getSlidePlayerInstance(e);
        i && !i.playing && (i.play(), this.settings.autofocusVideos && i.elements.container.focus());
      }
    }, {
      key: "setElements",
      value: function (e) {
        var t = this;
        this.settings.elements = !1;
        var i = [];
        e && e.length && o(e, function (e, n) {
          var s = new U(e, t, n),
              o = s.getConfig(),
              r = l({}, o);
          r.slideConfig = o, r.instance = s, r.index = n, i.push(r);
        }), this.elements = i, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (o(this.elements, function () {
          var e = m(t.settings.slideHTML);
          t.slidesContainer.appendChild(e);
        }), this.showSlide(0, !0)));
      }
    }, {
      key: "getElementIndex",
      value: function (e) {
        var t = !1;
        return o(this.elements, function (i, n) {
          if (O(i, "node") && i.node == e) return t = n, !0;
        }), t;
      }
    }, {
      key: "getElements",
      value: function () {
        var e = this,
            t = [];
        this.elements = this.elements ? this.elements : [], !I(this.settings.elements) && E(this.settings.elements) && this.settings.elements.length && o(this.settings.elements, function (i, n) {
          var s = new U(i, e, n),
              o = s.getConfig(),
              r = l({}, o);
          r.node = !1, r.index = n, r.instance = s, r.slideConfig = o, t.push(r);
        });
        var i = !1;
        return this.getSelector() && (i = document.querySelectorAll(this.getSelector())), i ? (o(i, function (i, n) {
          var s = new U(i, e, n),
              o = s.getConfig(),
              r = l({}, o);
          r.node = i, r.index = n, r.instance = s, r.slideConfig = o, r.gallery = i.getAttribute("data-gallery"), t.push(r);
        }), t) : t;
      }
    }, {
      key: "getGalleryElements",
      value: function (e, t) {
        return e.filter(function (e) {
          return e.gallery == t;
        });
      }
    }, {
      key: "getSelector",
      value: function () {
        return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
      }
    }, {
      key: "getActiveSlide",
      value: function () {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index];
      }
    }, {
      key: "getActiveSlideIndex",
      value: function () {
        return this.index;
      }
    }, {
      key: "getAnimationClasses",
      value: function () {
        var e = [];

        for (var t in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(t)) {
          var i = this.settings.cssEfects[t];
          e.push("g".concat(i.in)), e.push("g".concat(i.out));
        }

        return e.join(" ");
      }
    }, {
      key: "build",
      value: function () {
        var e = this;
        if (this.built) return !1;
        var t = document.body.childNodes,
            i = [];
        o(t, function (e) {
          e.parentNode == document.body && "#" !== e.nodeName.charAt(0) && e.hasAttribute && !e.hasAttribute("aria-hidden") && (i.push(e), e.setAttribute("aria-hidden", "true"));
        });
        var n = O(this.settings.svg, "next") ? this.settings.svg.next : "",
            s = O(this.settings.svg, "prev") ? this.settings.svg.prev : "",
            l = O(this.settings.svg, "close") ? this.settings.svg.close : "",
            r = this.settings.lightboxHTML;
        r = m(r = (r = (r = r.replace(/{nextSVG}/g, n)).replace(/{prevSVG}/g, s)).replace(/{closeSVG}/g, l)), document.body.appendChild(r);
        var d = document.getElementById("glightbox-body");
        this.modal = d;
        var g = d.querySelector(".gclose");
        this.prevButton = d.querySelector(".gprev"), this.nextButton = d.querySelector(".gnext"), this.overlay = d.querySelector(".goverlay"), this.loader = d.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = i, this.events = {}, h(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && g && (this.events.close = a("click", {
          onElement: g,
          withCallback: function (t, i) {
            t.preventDefault(), e.close();
          }
        })), g && !this.settings.closeButton && g.parentNode.removeChild(g), this.nextButton && (this.events.next = a("click", {
          onElement: this.nextButton,
          withCallback: function (t, i) {
            t.preventDefault(), e.nextSlide();
          }
        })), this.prevButton && (this.events.prev = a("click", {
          onElement: this.prevButton,
          withCallback: function (t, i) {
            t.preventDefault(), e.prevSlide();
          }
        })), this.settings.closeOnOutsideClick && (this.events.outClose = a("click", {
          onElement: d,
          withCallback: function (t, i) {
            e.preventOutsideClick || c(document.body, "glightbox-mobile") || u(t.target, ".ginner-container") || u(t.target, ".gbtn") || c(t.target, "gnext") || c(t.target, "gprev") || e.close();
          }
        })), o(this.elements, function (t, i) {
          e.slidesContainer.appendChild(t.instance.create()), t.slideNode = e.slidesContainer.querySelectorAll(".gslide")[i];
        }), K && h(document.body, "glightbox-touch"), this.events.resize = a("resize", {
          onElement: window,
          withCallback: function () {
            e.resize();
          }
        }), this.built = !0;
      }
    }, {
      key: "resize",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;

        if ((e = e || this.activeSlide) && !c(e, "zoomed")) {
          var t = y(),
              i = e.querySelector(".gvideo-wrapper"),
              n = e.querySelector(".gslide-image"),
              s = this.slideDescription,
              l = t.width,
              o = t.height;

          if (l <= 768 ? h(document.body, "glightbox-mobile") : d(document.body, "glightbox-mobile"), i || n) {
            var r = !1;
            if (s && (c(s, "description-bottom") || c(s, "description-top")) && !c(s, "gabsolute") && (r = !0), n) if (l <= 768) n.querySelector("img");else if (r) {
              var a = s.offsetHeight,
                  u = n.querySelector("img");
              u.setAttribute("style", "max-height: calc(100vh - ".concat(a, "px)")), s.setAttribute("style", "max-width: ".concat(u.offsetWidth, "px;"));
            }

            if (i) {
              var g = O(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";

              if (!g) {
                var v = i.clientWidth,
                    f = i.clientHeight,
                    p = v / f;
                g = "".concat(v / p, ":").concat(f / p);
              }

              var m = g.split(":"),
                  x = this.settings.videosWidth,
                  b = this.settings.videosWidth,
                  S = (b = z(x) || -1 !== x.indexOf("px") ? parseInt(x) : -1 !== x.indexOf("vw") ? l * parseInt(x) / 100 : -1 !== x.indexOf("vh") ? o * parseInt(x) / 100 : -1 !== x.indexOf("%") ? l * parseInt(x) / 100 : parseInt(i.clientWidth)) / (parseInt(m[0]) / parseInt(m[1]));

              if (S = Math.floor(S), r && (o -= s.offsetHeight), b > l || S > o || o < S && l > b) {
                var w = i.offsetWidth,
                    T = i.offsetHeight,
                    C = o / T,
                    k = {
                  width: w * C,
                  height: T * C
                };
                i.parentNode.setAttribute("style", "max-width: ".concat(k.width, "px")), r && s.setAttribute("style", "max-width: ".concat(k.width, "px;"));
              } else i.parentNode.style.maxWidth = "".concat(x), r && s.setAttribute("style", "max-width: ".concat(x, ";"));
            }
          }
        }
      }
    }, {
      key: "reload",
      value: function () {
        this.init();
      }
    }, {
      key: "updateNavigationClasses",
      value: function () {
        var e = this.loop();
        d(this.nextButton, "disabled"), d(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (h(this.prevButton, "disabled"), h(this.nextButton, "disabled")) : 0 !== this.index || e ? this.index !== this.elements.length - 1 || e || h(this.nextButton, "disabled") : h(this.prevButton, "disabled");
      }
    }, {
      key: "loop",
      value: function () {
        var e = O(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return e = O(this.settings, "loop") ? this.settings.loop : e, e;
      }
    }, {
      key: "close",
      value: function () {
        var e = this;

        if (!this.lightboxOpen) {
          if (this.events) {
            for (var t in this.events) this.events.hasOwnProperty(t) && this.events[t].destroy();

            this.events = null;
          }

          return !1;
        }

        if (this.closing) return !1;
        this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && o(this.bodyHiddenChildElms, function (e) {
          e.removeAttribute("aria-hidden");
        }), h(this.modal, "glightbox-closing"), g(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), g(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function () {
          if (e.activeSlide = null, e.prevActiveSlideIndex = null, e.prevActiveSlide = null, e.built = !1, e.events) {
            for (var t in e.events) e.events.hasOwnProperty(t) && e.events[t].destroy();

            e.events = null;
          }

          var i = document.body;
          d(Q, "glightbox-open"), d(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), e.modal.parentNode.removeChild(e.modal), e.trigger("close"), T(e.settings.onClose) && e.settings.onClose();
          var n = document.querySelector(".gcss-styles");
          n && n.parentNode.removeChild(n), e.lightboxOpen = !1, e.closing = null;
        });
      }
    }, {
      key: "destroy",
      value: function () {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
      }
    }, {
      key: "on",
      value: function (e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!e || !T(t)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({
          evt: e,
          once: i,
          callback: t
        });
      }
    }, {
      key: "once",
      value: function (e, t) {
        this.on(e, t, !0);
      }
    }, {
      key: "trigger",
      value: function (e) {
        var t = this,
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = [];
        o(this.apiEvents, function (t, s) {
          var l = t.evt,
              o = t.once,
              r = t.callback;
          l == e && (r(i), o && n.push(s));
        }), n.length && o(n, function (e) {
          return t.apiEvents.splice(e, 1);
        });
      }
    }, {
      key: "clearAllEvents",
      value: function () {
        this.apiEvents.splice(0, this.apiEvents.length);
      }
    }, {
      key: "version",
      value: function () {
        return "3.1.1";
      }
    }]), e;
  }();

  return function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = new te(e);
    return t.init(), t;
  };
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/* harmony import */ var glightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5618);
/* harmony import */ var glightbox__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(glightbox__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var ConceptSGMLibs = __webpack_require__(4558)["ConceptSGMLibs"];


ConceptSGMLibs.GLightbox = (glightbox__WEBPACK_IMPORTED_MODULE_0___default());
}();
/******/ })()
;