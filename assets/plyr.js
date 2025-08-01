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

/***/ 9792:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"object" == typeof navigator && function (e, t) {
   true ? module.exports = t() : 0;
}(this, function () {
  "use strict";

  function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function t(e, t) {
    for (var i = 0; i < t.length; i++) {
      var s = t[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
    }
  }

  function i(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function s(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t && (s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, s);
    }

    return i;
  }

  function n(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? s(Object(n), !0).forEach(function (t) {
        i(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  var a = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
  };

  function l(e, t) {
    return function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }.call(e, t);
  }

  var o = function (e) {
    return null != e ? e.constructor : null;
  },
      r = function (e, t) {
    return !!(e && t && e instanceof t);
  },
      c = function (e) {
    return null == e;
  },
      h = function (e) {
    return o(e) === Object;
  },
      u = function (e) {
    return o(e) === String;
  },
      d = function (e) {
    return Array.isArray(e);
  },
      m = function (e) {
    return r(e, NodeList);
  },
      p = u,
      g = d,
      f = m,
      b = function (e) {
    return r(e, Element);
  },
      y = function (e) {
    return r(e, Event);
  },
      v = function (e) {
    return c(e) || (u(e) || d(e) || m(e)) && !e.length || h(e) && !Object.keys(e).length;
  };

  function w(e, t) {
    if (1 > t) {
      var i = function (e) {
        var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
      }(t);

      return parseFloat(e.toFixed(i));
    }

    return Math.round(e / t) * t;
  }

  var T = function () {
    function e(t, i) {
      (function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      })(this, e), b(t) ? this.element = t : p(t) && (this.element = document.querySelector(t)), b(this.element) && v(this.element.rangeTouch) && (this.config = n({}, a, {}, i), this.init());
    }

    return function (e, i, s) {
      i && t(e.prototype, i), s && t(e, s);
    }(e, [{
      key: "init",
      value: function () {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      }
    }, {
      key: "destroy",
      value: function () {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
      }
    }, {
      key: "listeners",
      value: function (e) {
        var t = this,
            i = e ? "addEventListener" : "removeEventListener";
        ["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[i](e, function (e) {
            return t.set(e);
          }, !1);
        });
      }
    }, {
      key: "get",
      value: function (t) {
        if (!e.enabled || !y(t)) return null;
        var i,
            s = t.target,
            n = t.changedTouches[0],
            a = parseFloat(s.getAttribute("min")) || 0,
            l = parseFloat(s.getAttribute("max")) || 100,
            o = parseFloat(s.getAttribute("step")) || 1,
            r = s.getBoundingClientRect(),
            c = 100 / r.width * (this.config.thumbWidth / 2) / 100;
        return 0 > (i = 100 / r.width * (n.clientX - r.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + w(i / 100 * (l - a), o);
      }
    }, {
      key: "set",
      value: function (t) {
        e.enabled && y(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function (e, t) {
          if (e && t) {
            var i = new Event(t, {
              bubbles: !0
            });
            e.dispatchEvent(i);
          }
        }(t.target, "touchend" === t.type ? "change" : "input"));
      }
    }], [{
      key: "setup",
      value: function (t) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            s = null;
        if (v(t) || p(t) ? s = Array.from(document.querySelectorAll(p(t) ? t : 'input[type="range"]')) : b(t) ? s = [t] : f(t) ? s = Array.from(t) : g(t) && (s = t.filter(b)), v(s)) return null;
        var o = n({}, a, {}, i);

        if (p(t) && o.watch) {
          var r = new MutationObserver(function (i) {
            Array.from(i).forEach(function (i) {
              Array.from(i.addedNodes).forEach(function (i) {
                b(i) && l(i, t) && new e(i, o);
              });
            });
          });
          r.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        }

        return s.map(function (t) {
          return new e(t, i);
        });
      }
    }, {
      key: "enabled",
      get: function () {
        return "ontouchstart" in document.documentElement;
      }
    }]), e;
  }();

  const k = e => null != e ? e.constructor : null,
        C = (e, t) => Boolean(e && t && e instanceof t),
        A = e => null == e,
        S = e => k(e) === Object,
        E = e => k(e) === String,
        P = e => k(e) === Function,
        N = e => Array.isArray(e),
        x = e => C(e, NodeList),
        M = e => A(e) || (E(e) || N(e) || x(e)) && !e.length || S(e) && !Object.keys(e).length;

  var I = A,
      L = S,
      $ = e => k(e) === Number && !Number.isNaN(e),
      _ = E,
      O = e => k(e) === Boolean,
      j = P,
      q = N,
      D = x,
      H = e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
      F = e => C(e, Event),
      R = e => C(e, KeyboardEvent),
      V = e => C(e, TextTrack) || !A(e) && E(e.kind),
      B = e => C(e, Promise) && P(e.then),
      U = e => {
    if (C(e, window.URL)) return !0;
    if (!E(e)) return !1;
    let t = e;
    e.startsWith("http://") && e.startsWith("https://") || (t = `http://${e}`);

    try {
      return !M(new URL(t).hostname);
    } catch (e) {
      return !1;
    }
  },
      W = M;

  const z = (() => {
    const e = document.createElement("span"),
          t = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    },
          i = Object.keys(t).find(t => void 0 !== e.style[t]);
    return !!_(i) && t[i];
  })();

  function K(e, t) {
    setTimeout(() => {
      try {
        e.hidden = !0, e.offsetHeight, e.hidden = !1;
      } catch (e) {}
    }, t);
  }

  const Y = {
    isIE: Boolean(window.document.documentMode),
    isEdge: window.navigator.userAgent.includes("Edge"),
    isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
    isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
    isIos: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
  };

  function Q(e, t) {
    return t.split(".").reduce((e, t) => e && e[t], e);
  }

  function X() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      t[_key - 1] = arguments[_key];
    }

    if (!t.length) return e;
    const i = t.shift();
    return L(i) ? (Object.keys(i).forEach(t => {
      L(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, {
        [t]: {}
      }), X(e[t], i[t])) : Object.assign(e, {
        [t]: i[t]
      });
    }), X(e, ...t)) : e;
  }

  function J(e, t) {
    const i = e.length ? e : [e];
    Array.from(i).reverse().forEach((e, i) => {
      const s = i > 0 ? t.cloneNode(!0) : t,
            n = e.parentNode,
            a = e.nextSibling;
      s.appendChild(e), a ? n.insertBefore(s, a) : n.appendChild(s);
    });
  }

  function G(e, t) {
    H(e) && !W(t) && Object.entries(t).filter(_ref => {
      let [, e] = _ref;
      return !I(e);
    }).forEach(_ref2 => {
      let [t, i] = _ref2;
      return e.setAttribute(t, i);
    });
  }

  function Z(e, t, i) {
    const s = document.createElement(e);
    return L(t) && G(s, t), _(i) && (s.innerText = i), s;
  }

  function ee(e, t, i, s) {
    H(t) && t.appendChild(Z(e, i, s));
  }

  function te(e) {
    D(e) || q(e) ? Array.from(e).forEach(te) : H(e) && H(e.parentNode) && e.parentNode.removeChild(e);
  }

  function ie(e) {
    if (!H(e)) return;
    let {
      length: t
    } = e.childNodes;

    for (; t > 0;) e.removeChild(e.lastChild), t -= 1;
  }

  function se(e, t) {
    return H(t) && H(t.parentNode) && H(e) ? (t.parentNode.replaceChild(e, t), e) : null;
  }

  function ne(e, t) {
    if (!_(e) || W(e)) return {};
    const i = {},
          s = X({}, t);
    return e.split(",").forEach(e => {
      const t = e.trim(),
            n = t.replace(".", ""),
            a = t.replace(/[[\]]/g, "").split("="),
            [l] = a,
            o = a.length > 1 ? a[1].replace(/["']/g, "") : "";

      switch (t.charAt(0)) {
        case ".":
          _(s.class) ? i.class = `${s.class} ${n}` : i.class = n;
          break;

        case "#":
          i.id = t.replace("#", "");
          break;

        case "[":
          i[l] = o;
      }
    }), X(s, i);
  }

  function ae(e, t) {
    if (!H(e)) return;
    let i = t;
    O(i) || (i = !e.hidden), e.hidden = i;
  }

  function le(e, t, i) {
    if (D(e)) return Array.from(e).map(e => le(e, t, i));

    if (H(e)) {
      let s = "toggle";
      return void 0 !== i && (s = i ? "add" : "remove"), e.classList[s](t), e.classList.contains(t);
    }

    return !1;
  }

  function oe(e, t) {
    return H(e) && e.classList.contains(t);
  }

  function re(e, t) {
    const {
      prototype: i
    } = Element;
    return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }).call(e, t);
  }

  function ce(e) {
    return this.elements.container.querySelectorAll(e);
  }

  function he(e) {
    return this.elements.container.querySelector(e);
  }

  function ue() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    H(e) && (e.focus({
      preventScroll: !0
    }), t && le(e, this.config.classNames.tabFocus));
  }

  const de = {
    "audio/ogg": "vorbis",
    "audio/wav": "1",
    "video/webm": "vp8, vorbis",
    "video/mp4": "avc1.42E01E, mp4a.40.2",
    "video/ogg": "theora"
  },
        me = {
    audio: "canPlayType" in document.createElement("audio"),
    video: "canPlayType" in document.createElement("video"),

    check(e, t, i) {
      const s = Y.isIPhone && i && me.playsinline,
            n = me[e] || "html5" !== t;
      return {
        api: n,
        ui: n && me.rangeInput && ("video" !== e || !Y.isIPhone || s)
      };
    },

    pip: !(Y.isIPhone || !j(Z("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || Z("video").disablePictureInPicture)),
    airplay: j(window.WebKitPlaybackTargetAvailabilityEvent),
    playsinline: "playsInline" in document.createElement("video"),

    mime(e) {
      if (W(e)) return !1;
      const [t] = e.split("/");
      let i = e;
      if (!this.isHTML5 || t !== this.type) return !1;
      Object.keys(de).includes(i) && (i += `; codecs="${de[e]}"`);

      try {
        return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
      } catch (e) {
        return !1;
      }
    },

    textTracks: "textTracks" in document.createElement("video"),
    rangeInput: (() => {
      const e = document.createElement("input");
      return e.type = "range", "range" === e.type;
    })(),
    touch: "ontouchstart" in document.documentElement,
    transitions: !1 !== z,
    reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
  },
        pe = (() => {
    let e = !1;

    try {
      const t = Object.defineProperty({}, "passive", {
        get: () => (e = !0, null)
      });
      window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
    } catch (e) {}

    return e;
  })();

  function ge(e, t, i) {
    let s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    let n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
    let a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
    if (!e || !("addEventListener" in e) || W(t) || !j(i)) return;
    const l = t.split(" ");
    let o = a;
    pe && (o = {
      passive: n,
      capture: a
    }), l.forEach(t => {
      this && this.eventListeners && s && this.eventListeners.push({
        element: e,
        type: t,
        callback: i,
        options: o
      }), e[s ? "addEventListener" : "removeEventListener"](t, i, o);
    });
  }

  function fe(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let i = arguments.length > 2 ? arguments[2] : undefined;
    let s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    let n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    ge.call(this, e, t, i, !0, s, n);
  }

  function be(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let i = arguments.length > 2 ? arguments[2] : undefined;
    let s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    let n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    ge.call(this, e, t, i, !1, s, n);
  }

  function ye(e) {
    var _this = this;

    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let i = arguments.length > 2 ? arguments[2] : undefined;
    let s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    let n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;

    const a = function () {
      for (var _len2 = arguments.length, l = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        l[_key2] = arguments[_key2];
      }

      be(e, t, a, s, n), i.apply(_this, l);
    };

    ge.call(this, e, t, a, !0, s, n);
  }

  function ve(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    let s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!H(e) || W(t)) return;
    const n = new CustomEvent(t, {
      bubbles: i,
      detail: { ...s,
        plyr: this
      }
    });
    e.dispatchEvent(n);
  }

  function we() {
    this && this.eventListeners && (this.eventListeners.forEach(e => {
      const {
        element: t,
        type: i,
        callback: s,
        options: n
      } = e;
      t.removeEventListener(i, s, n);
    }), this.eventListeners = []);
  }

  function Te() {
    return new Promise(e => this.ready ? setTimeout(e, 0) : fe.call(this, this.elements.container, "ready", e)).then(() => {});
  }

  function ke(e) {
    B(e) && e.then(null, () => {});
  }

  function Ce(e) {
    return q(e) ? e.filter((t, i) => e.indexOf(t) === i) : e;
  }

  function Ae(e, t) {
    return q(e) && e.length ? e.reduce((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e) : null;
  }

  function Se(e) {
    return !(!window || !window.CSS) && window.CSS.supports(e);
  }

  const Ee = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce((e, _ref3) => {
    let [t, i] = _ref3;
    return { ...e,
      [t / i]: [t, i]
    };
  }, {});

  function Pe(e) {
    if (!(q(e) || _(e) && e.includes(":"))) return !1;
    return (q(e) ? e : e.split(":")).map(Number).every($);
  }

  function Ne(e) {
    if (!q(e) || !e.every($)) return null;

    const [t, i] = e,
          s = (e, t) => 0 === t ? e : s(t, e % t),
          n = s(t, i);

    return [t / n, i / n];
  }

  function xe(e) {
    const t = e => Pe(e) ? e.split(":").map(Number) : null;

    let i = t(e);

    if (null === i && (i = t(this.config.ratio)), null === i && !W(this.embed) && q(this.embed.ratio) && ({
      ratio: i
    } = this.embed), null === i && this.isHTML5) {
      const {
        videoWidth: e,
        videoHeight: t
      } = this.media;
      i = [e, t];
    }

    return Ne(i);
  }

  function Me(e) {
    if (!this.isVideo) return {};
    const {
      wrapper: t
    } = this.elements,
          i = xe.call(this, e);
    if (!q(i)) return {};
    const [s, n] = Ne(i),
          a = 100 / s * n;

    if (Se(`aspect-ratio: ${s}/${n}`) ? t.style.aspectRatio = `${s}/${n}` : t.style.paddingBottom = `${a}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
      const e = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
            i = (e - a) / (e / 50);
      this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`;
    } else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);

    return {
      padding: a,
      ratio: i
    };
  }

  function Ie(e, t) {
    let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .05;
    const s = e / t,
          n = Ae(Object.keys(Ee), s);
    return Math.abs(n - s) <= i ? Ee[n] : [e, t];
  }

  const Le = {
    getSources() {
      if (!this.isHTML5) return [];
      return Array.from(this.media.querySelectorAll("source")).filter(e => {
        const t = e.getAttribute("type");
        return !!W(t) || me.mime.call(this, t);
      });
    },

    getQualityOptions() {
      return this.config.quality.forced ? this.config.quality.options : Le.getSources.call(this).map(e => Number(e.getAttribute("size"))).filter(Boolean);
    },

    setup() {
      if (!this.isHTML5) return;
      const e = this;
      e.options.speed = e.config.speed.options, W(this.config.ratio) || Me.call(e), Object.defineProperty(e.media, "quality", {
        get() {
          const t = Le.getSources.call(e).find(t => t.getAttribute("src") === e.source);
          return t && Number(t.getAttribute("size"));
        },

        set(t) {
          if (e.quality !== t) {
            if (e.config.quality.forced && j(e.config.quality.onChange)) e.config.quality.onChange(t);else {
              const i = Le.getSources.call(e).find(e => Number(e.getAttribute("size")) === t);
              if (!i) return;
              const {
                currentTime: s,
                paused: n,
                preload: a,
                readyState: l,
                playbackRate: o
              } = e.media;
              e.media.src = i.getAttribute("src"), ("none" !== a || l) && (e.once("loadedmetadata", () => {
                e.speed = o, e.currentTime = s, n || ke(e.play());
              }), e.media.load());
            }
            ve.call(e, e.media, "qualitychange", !1, {
              quality: t
            });
          }
        }

      });
    },

    cancelRequests() {
      this.isHTML5 && (te(Le.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
    }

  };

  function $e(e) {
    for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      t[_key3 - 1] = arguments[_key3];
    }

    return W(e) ? e : e.toString().replace(/{(\d+)}/g, (e, i) => t[i].toString());
  }

  const _e = function () {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString());
  },
        Oe = function () {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return e.toString().replace(/\w\S*/g, e => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase());
  };

  function je() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    let t = e.toString();
    return t = function () {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      let t = e.toString();
      return t = _e(t, "-", " "), t = _e(t, "_", " "), t = Oe(t), _e(t, " ", "");
    }(t), t.charAt(0).toLowerCase() + t.slice(1);
  }

  function qe(e) {
    const t = document.createElement("div");
    return t.appendChild(e), t.innerHTML;
  }

  const De = {
    pip: "PIP",
    airplay: "AirPlay",
    html5: "HTML5",
    vimeo: "Vimeo",
    youtube: "YouTube"
  },
        He = {
    get() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (W(e) || W(t)) return "";
      let i = Q(t.i18n, e);
      if (W(i)) return Object.keys(De).includes(e) ? De[e] : "";
      const s = {
        "{seektime}": t.seekTime,
        "{title}": t.title
      };
      return Object.entries(s).forEach(_ref4 => {
        let [e, t] = _ref4;
        i = _e(i, e, t);
      }), i;
    }

  };

  class Fe {
    constructor(t) {
      e(this, "get", e => {
        if (!Fe.supported || !this.enabled) return null;
        const t = window.localStorage.getItem(this.key);
        if (W(t)) return null;
        const i = JSON.parse(t);
        return _(e) && e.length ? i[e] : i;
      }), e(this, "set", e => {
        if (!Fe.supported || !this.enabled) return;
        if (!L(e)) return;
        let t = this.get();
        W(t) && (t = {}), X(t, e);

        try {
          window.localStorage.setItem(this.key, JSON.stringify(t));
        } catch (e) {}
      }), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key;
    }

    static get supported() {
      try {
        if (!("localStorage" in window)) return !1;
        const e = "___test";
        return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0;
      } catch (e) {
        return !1;
      }
    }

  }

  function Re(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "text";
    return new Promise((i, s) => {
      try {
        const s = new XMLHttpRequest();
        if (!("withCredentials" in s)) return;
        s.addEventListener("load", () => {
          if ("text" === t) try {
            i(JSON.parse(s.responseText));
          } catch (e) {
            i(s.responseText);
          } else i(s.response);
        }), s.addEventListener("error", () => {
          throw new Error(s.status);
        }), s.open("GET", e, !0), s.responseType = t, s.send();
      } catch (e) {
        s(e);
      }
    });
  }

  function Ve(e, t) {
    if (!_(e)) return;

    const i = _(t);

    let s = !1;

    const n = () => null !== document.getElementById(t),
          a = (e, t) => {
      e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e);
    };

    if (!i || !n()) {
      const n = Fe.supported,
            l = document.createElement("div");

      if (l.setAttribute("hidden", ""), i && l.setAttribute("id", t), n) {
        const e = window.localStorage.getItem(`cache-${t}`);

        if (s = null !== e, s) {
          const t = JSON.parse(e);
          a(l, t.content);
        }
      }

      Re(e).then(e => {
        if (!W(e)) {
          if (n) try {
            window.localStorage.setItem(`cache-${t}`, JSON.stringify({
              content: e
            }));
          } catch (e) {}
          a(l, e);
        }
      }).catch(() => {});
    }
  }

  const Be = e => Math.trunc(e / 60 / 60 % 60, 10);

  function Ue() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    if (!$(e)) return Ue(void 0, t, i);

    const s = e => `0${e}`.slice(-2);

    let n = Be(e);
    const a = (l = e, Math.trunc(l / 60 % 60, 10));
    var l;

    const o = (e => Math.trunc(e % 60, 10))(e);

    return n = t || n > 0 ? `${n}:` : "", `${i && e > 0 ? "-" : ""}${n}${s(a)}:${s(o)}`;
  }

  const We = {
    getIconUrl() {
      const e = new URL(this.config.iconUrl, window.location),
            t = window.location.host ? window.location.host : window.top.location.host,
            i = e.host !== t || Y.isIE && !window.svg4everybody;
      return {
        url: this.config.iconUrl,
        cors: i
      };
    },

    findElements() {
      try {
        return this.elements.controls = he.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
          play: ce.call(this, this.config.selectors.buttons.play),
          pause: he.call(this, this.config.selectors.buttons.pause),
          restart: he.call(this, this.config.selectors.buttons.restart),
          rewind: he.call(this, this.config.selectors.buttons.rewind),
          fastForward: he.call(this, this.config.selectors.buttons.fastForward),
          mute: he.call(this, this.config.selectors.buttons.mute),
          pip: he.call(this, this.config.selectors.buttons.pip),
          airplay: he.call(this, this.config.selectors.buttons.airplay),
          settings: he.call(this, this.config.selectors.buttons.settings),
          captions: he.call(this, this.config.selectors.buttons.captions),
          fullscreen: he.call(this, this.config.selectors.buttons.fullscreen)
        }, this.elements.progress = he.call(this, this.config.selectors.progress), this.elements.inputs = {
          seek: he.call(this, this.config.selectors.inputs.seek),
          volume: he.call(this, this.config.selectors.inputs.volume)
        }, this.elements.display = {
          buffer: he.call(this, this.config.selectors.display.buffer),
          currentTime: he.call(this, this.config.selectors.display.currentTime),
          duration: he.call(this, this.config.selectors.display.duration)
        }, H(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), !0;
      } catch (e) {
        return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
      }
    },

    createIcon(e, t) {
      const i = "http://www.w3.org/2000/svg",
            s = We.getIconUrl.call(this),
            n = `${s.cors ? "" : s.url}#${this.config.iconPrefix}`,
            a = document.createElementNS(i, "svg");
      G(a, X(t, {
        "aria-hidden": "true",
        focusable: "false"
      }));
      const l = document.createElementNS(i, "use"),
            o = `${n}-${e}`;
      return "href" in l && l.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(l), a;
    },

    createLabel(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const i = He.get(e, this.config);
      return Z("span", { ...t,
        class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
      }, i);
    },

    createBadge(e) {
      if (W(e)) return null;
      const t = Z("span", {
        class: this.config.classNames.menu.value
      });
      return t.appendChild(Z("span", {
        class: this.config.classNames.menu.badge
      }, e)), t;
    },

    createButton(e, t) {
      const i = X({}, t);
      let s = je(e);
      const n = {
        element: "button",
        toggle: !1,
        label: null,
        icon: null,
        labelPressed: null,
        iconPressed: null
      };

      switch (["element", "icon", "label"].forEach(e => {
        Object.keys(i).includes(e) && (n[e] = i[e], delete i[e]);
      }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(e => e === this.config.classNames.control) || X(i, {
        class: `${i.class} ${this.config.classNames.control}`
      }) : i.class = this.config.classNames.control, e) {
        case "play":
          n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
          break;

        case "mute":
          n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
          break;

        case "captions":
          n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
          break;

        case "fullscreen":
          n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
          break;

        case "play-large":
          i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", n.label = "play", n.icon = "play";
          break;

        default:
          W(n.label) && (n.label = s), W(n.icon) && (n.icon = e);
      }

      const a = Z(n.element);
      return n.toggle ? (a.appendChild(We.createIcon.call(this, n.iconPressed, {
        class: "icon--pressed"
      })), a.appendChild(We.createIcon.call(this, n.icon, {
        class: "icon--not-pressed"
      })), a.appendChild(We.createLabel.call(this, n.labelPressed, {
        class: "label--pressed"
      })), a.appendChild(We.createLabel.call(this, n.label, {
        class: "label--not-pressed"
      }))) : (a.appendChild(We.createIcon.call(this, n.icon)), a.appendChild(We.createLabel.call(this, n.label))), X(i, ne(this.config.selectors.buttons[s], i)), G(a, i), "play" === s ? (q(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(a)) : this.elements.buttons[s] = a, a;
    },

    createRange(e, t) {
      const i = Z("input", X(ne(this.config.selectors.inputs[e]), {
        type: "range",
        min: 0,
        max: 100,
        step: .01,
        value: 0,
        autocomplete: "off",
        role: "slider",
        "aria-label": He.get(e, this.config),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 0
      }, t));
      return this.elements.inputs[e] = i, We.updateRangeFill.call(this, i), T.setup(i), i;
    },

    createProgress(e, t) {
      const i = Z("progress", X(ne(this.config.selectors.display[e]), {
        min: 0,
        max: 100,
        value: 0,
        role: "progressbar",
        "aria-hidden": !0
      }, t));

      if ("volume" !== e) {
        i.appendChild(Z("span", null, "0"));
        const t = {
          played: "played",
          buffer: "buffered"
        }[e],
              s = t ? He.get(t, this.config) : "";
        i.innerText = `% ${s.toLowerCase()}`;
      }

      return this.elements.display[e] = i, i;
    },

    createTime(e, t) {
      const i = ne(this.config.selectors.display[e], t),
            s = Z("div", X(i, {
        class: `${i.class ? i.class : ""} ${this.config.classNames.display.time} `.trim(),
        "aria-label": He.get(e, this.config)
      }), "00:00");
      return this.elements.display[e] = s, s;
    },

    bindMenuItemShortcuts(e, t) {
      fe.call(this, e, "keydown keyup", i => {
        if (![32, 38, 39, 40].includes(i.which)) return;
        if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
        const s = re(e, '[role="menuitemradio"]');
        if (!s && [32, 39].includes(i.which)) We.showMenuPanel.call(this, t, !0);else {
          let t;
          32 !== i.which && (40 === i.which || s && 39 === i.which ? (t = e.nextElementSibling, H(t) || (t = e.parentNode.firstElementChild)) : (t = e.previousElementSibling, H(t) || (t = e.parentNode.lastElementChild)), ue.call(this, t, !0));
        }
      }, !1), fe.call(this, e, "keyup", e => {
        13 === e.which && We.focusFirstMenuItem.call(this, null, !0);
      });
    },

    createMenuItem(_ref5) {
      let {
        value: e,
        list: t,
        type: i,
        title: s,
        badge: n = null,
        checked: a = !1
      } = _ref5;
      const l = ne(this.config.selectors.inputs[i]),
            o = Z("button", X(l, {
        type: "button",
        role: "menuitemradio",
        class: `${this.config.classNames.control} ${l.class ? l.class : ""}`.trim(),
        "aria-checked": a,
        value: e
      })),
            r = Z("span");
      r.innerHTML = s, H(n) && r.appendChild(n), o.appendChild(r), Object.defineProperty(o, "checked", {
        enumerable: !0,
        get: () => "true" === o.getAttribute("aria-checked"),

        set(e) {
          e && Array.from(o.parentNode.children).filter(e => re(e, '[role="menuitemradio"]')).forEach(e => e.setAttribute("aria-checked", "false")), o.setAttribute("aria-checked", e ? "true" : "false");
        }

      }), this.listeners.bind(o, "click keyup", t => {
        if (!R(t) || 32 === t.which) {
          switch (t.preventDefault(), t.stopPropagation(), o.checked = !0, i) {
            case "language":
              this.currentTrack = Number(e);
              break;

            case "quality":
              this.quality = e;
              break;

            case "speed":
              this.speed = parseFloat(e);
          }

          We.showMenuPanel.call(this, "home", R(t));
        }
      }, i, !1), We.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o);
    },

    formatTime() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (!$(e)) return e;
      return Ue(e, Be(this.duration) > 0, t);
    },

    updateTimeDisplay() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      H(e) && $(t) && (e.innerText = We.formatTime(t, i));
    },

    updateVolume() {
      this.supported.ui && (H(this.elements.inputs.volume) && We.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), H(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
    },

    setRange(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      H(e) && (e.value = t, We.updateRangeFill.call(this, e));
    },

    updateProgress(e) {
      if (!this.supported.ui || !F(e)) return;
      let t = 0;

      const i = (e, t) => {
        const i = $(t) ? t : 0,
              s = H(e) ? e : this.elements.display.buffer;

        if (H(s)) {
          s.value = i;
          const e = s.getElementsByTagName("span")[0];
          H(e) && (e.childNodes[0].nodeValue = i);
        }
      };

      if (e) switch (e.type) {
        case "timeupdate":
        case "seeking":
        case "seeked":
          s = this.currentTime, n = this.duration, t = 0 === s || 0 === n || Number.isNaN(s) || Number.isNaN(n) ? 0 : (s / n * 100).toFixed(2), "timeupdate" === e.type && We.setRange.call(this, this.elements.inputs.seek, t);
          break;

        case "playing":
        case "progress":
          i(this.elements.display.buffer, 100 * this.buffered);
      }
      var s, n;
    },

    updateRangeFill(e) {
      const t = F(e) ? e.target : e;

      if (H(t) && "range" === t.getAttribute("type")) {
        if (re(t, this.config.selectors.inputs.seek)) {
          t.setAttribute("aria-valuenow", this.currentTime);
          const e = We.formatTime(this.currentTime),
                i = We.formatTime(this.duration),
                s = He.get("seekLabel", this.config);
          t.setAttribute("aria-valuetext", s.replace("{currentTime}", e).replace("{duration}", i));
        } else if (re(t, this.config.selectors.inputs.volume)) {
          const e = 100 * t.value;
          t.setAttribute("aria-valuenow", e), t.setAttribute("aria-valuetext", `${e.toFixed(1)}%`);
        } else t.setAttribute("aria-valuenow", t.value);

        Y.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%");
      }
    },

    updateSeekTooltip(e) {
      if (!this.config.tooltips.seek || !H(this.elements.inputs.seek) || !H(this.elements.display.seekTooltip) || 0 === this.duration) return;

      const t = `${this.config.classNames.tooltip}--visible`,
            i = e => le(this.elements.display.seekTooltip, t, e);

      if (this.touch) return void i(!1);
      let s = 0;
      const n = this.elements.progress.getBoundingClientRect();
      if (F(e)) s = 100 / n.width * (e.pageX - n.left);else {
        if (!oe(this.elements.display.seekTooltip, t)) return;
        s = parseFloat(this.elements.display.seekTooltip.style.left, 10);
      }
      s < 0 ? s = 0 : s > 100 && (s = 100), We.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = `${s}%`, F(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type);
    },

    timeUpdate(e) {
      const t = !H(this.elements.display.duration) && this.config.invertTime;
      We.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || We.updateProgress.call(this, e);
    },

    durationUpdate() {
      if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
      if (this.duration >= 2 ** 32) return ae(this.elements.display.currentTime, !0), void ae(this.elements.progress, !0);
      H(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
      const e = H(this.elements.display.duration);
      !e && this.config.displayDuration && this.paused && We.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && We.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), We.updateSeekTooltip.call(this);
    },

    toggleMenuButton(e, t) {
      ae(this.elements.settings.buttons[e], !t);
    },

    updateSetting(e, t, i) {
      const s = this.elements.settings.panels[e];
      let n = null,
          a = t;
      if ("captions" === e) n = this.currentTrack;else {
        if (n = W(i) ? this[e] : i, W(n) && (n = this.config[e].default), !W(this.options[e]) && !this.options[e].includes(n)) return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);
        if (!this.config[e].options.includes(n)) return void this.debug.warn(`Disabled value of '${n}' for ${e}`);
      }
      if (H(a) || (a = s && s.querySelector('[role="menu"]')), !H(a)) return;
      this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = We.getLabel.call(this, e, n);
      const l = a && a.querySelector(`[value="${n}"]`);
      H(l) && (l.checked = !0);
    },

    getLabel(e, t) {
      switch (e) {
        case "speed":
          return 1 === t ? He.get("normal", this.config) : `${t}&times;`;

        case "quality":
          if ($(t)) {
            const e = He.get(`qualityLabel.${t}`, this.config);
            return e.length ? e : `${t}p`;
          }

          return Oe(t);

        case "captions":
          return Ye.getLabel.call(this);

        default:
          return null;
      }
    },

    setQualityMenu(e) {
      if (!H(this.elements.settings.panels.quality)) return;
      const t = "quality",
            i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
      q(e) && (this.options.quality = Ce(e).filter(e => this.config.quality.options.includes(e)));
      const s = !W(this.options.quality) && this.options.quality.length > 1;
      if (We.toggleMenuButton.call(this, t, s), ie(i), We.checkMenu.call(this), !s) return;

      const n = e => {
        const t = He.get(`qualityBadge.${e}`, this.config);
        return t.length ? We.createBadge.call(this, t) : null;
      };

      this.options.quality.sort((e, t) => {
        const i = this.config.quality.options;
        return i.indexOf(e) > i.indexOf(t) ? 1 : -1;
      }).forEach(e => {
        We.createMenuItem.call(this, {
          value: e,
          list: i,
          type: t,
          title: We.getLabel.call(this, "quality", e),
          badge: n(e)
        });
      }), We.updateSetting.call(this, t, i);
    },

    setCaptionsMenu() {
      if (!H(this.elements.settings.panels.captions)) return;
      const e = "captions",
            t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
            i = Ye.getTracks.call(this),
            s = Boolean(i.length);
      if (We.toggleMenuButton.call(this, e, s), ie(t), We.checkMenu.call(this), !s) return;
      const n = i.map((e, i) => ({
        value: i,
        checked: this.captions.toggled && this.currentTrack === i,
        title: Ye.getLabel.call(this, e),
        badge: e.language && We.createBadge.call(this, e.language.toUpperCase()),
        list: t,
        type: "language"
      }));
      n.unshift({
        value: -1,
        checked: !this.captions.toggled,
        title: He.get("disabled", this.config),
        list: t,
        type: "language"
      }), n.forEach(We.createMenuItem.bind(this)), We.updateSetting.call(this, e, t);
    },

    setSpeedMenu() {
      if (!H(this.elements.settings.panels.speed)) return;
      const e = "speed",
            t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
      this.options.speed = this.options.speed.filter(e => e >= this.minimumSpeed && e <= this.maximumSpeed);
      const i = !W(this.options.speed) && this.options.speed.length > 1;
      We.toggleMenuButton.call(this, e, i), ie(t), We.checkMenu.call(this), i && (this.options.speed.forEach(i => {
        We.createMenuItem.call(this, {
          value: i,
          list: t,
          type: e,
          title: We.getLabel.call(this, "speed", i)
        });
      }), We.updateSetting.call(this, e, t));
    },

    checkMenu() {
      const {
        buttons: e
      } = this.elements.settings,
            t = !W(e) && Object.values(e).some(e => !e.hidden);
      ae(this.elements.settings.menu, !t);
    },

    focusFirstMenuItem(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (this.elements.settings.popup.hidden) return;
      let i = e;
      H(i) || (i = Object.values(this.elements.settings.panels).find(e => !e.hidden));
      const s = i.querySelector('[role^="menuitem"]');
      ue.call(this, s, t);
    },

    toggleMenu(e) {
      const {
        popup: t
      } = this.elements.settings,
            i = this.elements.buttons.settings;
      if (!H(t) || !H(i)) return;
      const {
        hidden: s
      } = t;
      let n = s;
      if (O(e)) n = e;else if (R(e) && 27 === e.which) n = !1;else if (F(e)) {
        const s = j(e.composedPath) ? e.composedPath()[0] : e.target,
              a = t.contains(s);
        if (a || !a && e.target !== i && n) return;
      }
      i.setAttribute("aria-expanded", n), ae(t, !n), le(this.elements.container, this.config.classNames.menu.open, n), n && R(e) ? We.focusFirstMenuItem.call(this, null, !0) : n || s || ue.call(this, i, R(e));
    },

    getMenuSize(e) {
      const t = e.cloneNode(!0);
      t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
      const i = t.scrollWidth,
            s = t.scrollHeight;
      return te(t), {
        width: i,
        height: s
      };
    },

    showMenuPanel() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      const i = this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);
      if (!H(i)) return;
      const s = i.parentNode,
            n = Array.from(s.children).find(e => !e.hidden);

      if (me.transitions && !me.reducedMotion) {
        s.style.width = `${n.scrollWidth}px`, s.style.height = `${n.scrollHeight}px`;

        const e = We.getMenuSize.call(this, i),
              t = e => {
          e.target === s && ["width", "height"].includes(e.propertyName) && (s.style.width = "", s.style.height = "", be.call(this, s, z, t));
        };

        fe.call(this, s, z, t), s.style.width = `${e.width}px`, s.style.height = `${e.height}px`;
      }

      ae(n, !0), ae(i, !1), We.focusFirstMenuItem.call(this, i, t);
    },

    setDownloadUrl() {
      const e = this.elements.buttons.download;
      H(e) && e.setAttribute("href", this.download);
    },

    create(e) {
      const {
        bindMenuItemShortcuts: t,
        createButton: i,
        createProgress: s,
        createRange: n,
        createTime: a,
        setQualityMenu: l,
        setSpeedMenu: o,
        showMenuPanel: r
      } = We;
      this.elements.controls = null, q(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
      const c = Z("div", ne(this.config.selectors.controls.wrapper));
      this.elements.controls = c;
      const h = {
        class: "plyr__controls__item"
      };
      return Ce(q(this.config.controls) ? this.config.controls : []).forEach(l => {
        if ("restart" === l && c.appendChild(i.call(this, "restart", h)), "rewind" === l && c.appendChild(i.call(this, "rewind", h)), "play" === l && c.appendChild(i.call(this, "play", h)), "fast-forward" === l && c.appendChild(i.call(this, "fast-forward", h)), "progress" === l) {
          const t = Z("div", {
            class: `${h.class} plyr__progress__container`
          }),
                i = Z("div", ne(this.config.selectors.progress));

          if (i.appendChild(n.call(this, "seek", {
            id: `plyr-seek-${e.id}`
          })), i.appendChild(s.call(this, "buffer")), this.config.tooltips.seek) {
            const e = Z("span", {
              class: this.config.classNames.tooltip
            }, "00:00");
            i.appendChild(e), this.elements.display.seekTooltip = e;
          }

          this.elements.progress = i, t.appendChild(this.elements.progress), c.appendChild(t);
        }

        if ("current-time" === l && c.appendChild(a.call(this, "currentTime", h)), "duration" === l && c.appendChild(a.call(this, "duration", h)), "mute" === l || "volume" === l) {
          let {
            volume: t
          } = this.elements;

          if (H(t) && c.contains(t) || (t = Z("div", X({}, h, {
            class: `${h.class} plyr__volume`.trim()
          })), this.elements.volume = t, c.appendChild(t)), "mute" === l && t.appendChild(i.call(this, "mute")), "volume" === l && !Y.isIos) {
            const i = {
              max: 1,
              step: .05,
              value: this.config.volume
            };
            t.appendChild(n.call(this, "volume", X(i, {
              id: `plyr-volume-${e.id}`
            })));
          }
        }

        if ("captions" === l && c.appendChild(i.call(this, "captions", h)), "settings" === l && !W(this.config.settings)) {
          const s = Z("div", X({}, h, {
            class: `${h.class} plyr__menu`.trim(),
            hidden: ""
          }));
          s.appendChild(i.call(this, "settings", {
            "aria-haspopup": !0,
            "aria-controls": `plyr-settings-${e.id}`,
            "aria-expanded": !1
          }));
          const n = Z("div", {
            class: "plyr__menu__container",
            id: `plyr-settings-${e.id}`,
            hidden: ""
          }),
                a = Z("div"),
                l = Z("div", {
            id: `plyr-settings-${e.id}-home`
          }),
                o = Z("div", {
            role: "menu"
          });
          l.appendChild(o), a.appendChild(l), this.elements.settings.panels.home = l, this.config.settings.forEach(i => {
            const s = Z("button", X(ne(this.config.selectors.buttons.settings), {
              type: "button",
              class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
              role: "menuitem",
              "aria-haspopup": !0,
              hidden: ""
            }));
            t.call(this, s, i), fe.call(this, s, "click", () => {
              r.call(this, i, !1);
            });
            const n = Z("span", null, He.get(i, this.config)),
                  l = Z("span", {
              class: this.config.classNames.menu.value
            });
            l.innerHTML = e[i], n.appendChild(l), s.appendChild(n), o.appendChild(s);
            const c = Z("div", {
              id: `plyr-settings-${e.id}-${i}`,
              hidden: ""
            }),
                  h = Z("button", {
              type: "button",
              class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
            });
            h.appendChild(Z("span", {
              "aria-hidden": !0
            }, He.get(i, this.config))), h.appendChild(Z("span", {
              class: this.config.classNames.hidden
            }, He.get("menuBack", this.config))), fe.call(this, c, "keydown", e => {
              37 === e.which && (e.preventDefault(), e.stopPropagation(), r.call(this, "home", !0));
            }, !1), fe.call(this, h, "click", () => {
              r.call(this, "home", !1);
            }), c.appendChild(h), c.appendChild(Z("div", {
              role: "menu"
            })), a.appendChild(c), this.elements.settings.buttons[i] = s, this.elements.settings.panels[i] = c;
          }), n.appendChild(a), s.appendChild(n), c.appendChild(s), this.elements.settings.popup = n, this.elements.settings.menu = s;
        }

        if ("pip" === l && me.pip && c.appendChild(i.call(this, "pip", h)), "airplay" === l && me.airplay && c.appendChild(i.call(this, "airplay", h)), "download" === l) {
          const e = X({}, h, {
            element: "a",
            href: this.download,
            target: "_blank"
          });
          this.isHTML5 && (e.download = "");
          const {
            download: t
          } = this.config.urls;
          !U(t) && this.isEmbed && X(e, {
            icon: `logo-${this.provider}`,
            label: this.provider
          }), c.appendChild(i.call(this, "download", e));
        }

        "fullscreen" === l && c.appendChild(i.call(this, "fullscreen", h));
      }), this.isHTML5 && l.call(this, Le.getQualityOptions.call(this)), o.call(this), c;
    },

    inject() {
      if (this.config.loadSprite) {
        const e = We.getIconUrl.call(this);
        e.cors && Ve(e.url, "sprite-plyr");
      }

      this.id = Math.floor(1e4 * Math.random());
      let e = null;
      this.elements.controls = null;
      const t = {
        id: this.id,
        seektime: this.config.seekTime,
        title: this.config.title
      };
      let i = !0;
      j(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), H(this.config.controls) || _(this.config.controls) ? e = this.config.controls : (e = We.create.call(this, {
        id: this.id,
        seektime: this.config.seekTime,
        speed: this.speed,
        quality: this.quality,
        captions: Ye.getLabel.call(this)
      }), i = !1);
      let s;
      i && _(this.config.controls) && (e = (e => {
        let i = e;
        return Object.entries(t).forEach(_ref6 => {
          let [e, t] = _ref6;
          i = _e(i, `{${e}}`, t);
        }), i;
      })(e)), _(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), H(s) || (s = this.elements.container);

      if (s[H(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), H(this.elements.controls) || We.findElements.call(this), !W(this.elements.buttons)) {
        const e = e => {
          const t = this.config.classNames.controlPressed;
          Object.defineProperty(e, "pressed", {
            enumerable: !0,
            get: () => oe(e, t),

            set() {
              let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
              le(e, t, i);
            }

          });
        };

        Object.values(this.elements.buttons).filter(Boolean).forEach(t => {
          q(t) || D(t) ? Array.from(t).filter(Boolean).forEach(e) : e(t);
        });
      }

      if (Y.isEdge && K(s), this.config.tooltips.controls) {
        const {
          classNames: e,
          selectors: t
        } = this.config,
              i = `${t.controls.wrapper} ${t.labels} .${e.hidden}`,
              s = ce.call(this, i);
        Array.from(s).forEach(e => {
          le(e, this.config.classNames.hidden, !1), le(e, this.config.classNames.tooltip, !0);
        });
      }
    }

  };

  function ze(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    let i = e;

    if (t) {
      const e = document.createElement("a");
      e.href = i, i = e.href;
    }

    try {
      return new URL(i);
    } catch (e) {
      return null;
    }
  }

  function Ke(e) {
    const t = new URLSearchParams();
    return L(e) && Object.entries(e).forEach(_ref7 => {
      let [e, i] = _ref7;
      t.set(e, i);
    }), t;
  }

  const Ye = {
    setup() {
      if (!this.supported.ui) return;
      if (!this.isVideo || this.isYouTube || this.isHTML5 && !me.textTracks) return void (q(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this));
      var e, t;

      if (H(this.elements.captions) || (this.elements.captions = Z("div", ne(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, H(e) && H(t) && t.parentNode.insertBefore(e, t.nextSibling)), Y.isIE && window.URL) {
        const e = this.media.querySelectorAll("track");
        Array.from(e).forEach(e => {
          const t = e.getAttribute("src"),
                i = ze(t);
          null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && Re(t, "blob").then(t => {
            e.setAttribute("src", window.URL.createObjectURL(t));
          }).catch(() => {
            te(e);
          });
        });
      }

      const i = Ce((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(e => e.split("-")[0]));
      let s = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
      "auto" === s && ([s] = i);
      let n = this.storage.get("captions");

      if (O(n) || ({
        active: n
      } = this.config.captions), Object.assign(this.captions, {
        toggled: !1,
        active: n,
        language: s,
        languages: i
      }), this.isHTML5) {
        const e = this.config.captions.update ? "addtrack removetrack" : "removetrack";
        fe.call(this, this.media.textTracks, e, Ye.update.bind(this));
      }

      setTimeout(Ye.update.bind(this), 0);
    },

    update() {
      const e = Ye.getTracks.call(this, !0),
            {
        active: t,
        language: i,
        meta: s,
        currentTrackNode: n
      } = this.captions,
            a = Boolean(e.find(e => e.language === i));
      this.isHTML5 && this.isVideo && e.filter(e => !s.get(e)).forEach(e => {
        this.debug.log("Track added", e), s.set(e, {
          default: "showing" === e.mode
        }), "showing" === e.mode && (e.mode = "hidden"), fe.call(this, e, "cuechange", () => Ye.updateCues.call(this));
      }), (a && this.language !== i || !e.includes(n)) && (Ye.setLanguage.call(this, i), Ye.toggle.call(this, t && a)), this.elements && le(this.elements.container, this.config.classNames.captions.enabled, !W(e)), q(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this);
    },

    toggle(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!this.supported.ui) return;
      const {
        toggled: i
      } = this.captions,
            s = this.config.classNames.captions.active,
            n = I(e) ? !i : e;

      if (n !== i) {
        if (t || (this.captions.active = n, this.storage.set({
          captions: n
        })), !this.language && n && !t) {
          const e = Ye.getTracks.call(this),
                t = Ye.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);
          return this.captions.language = t.language, void Ye.set.call(this, e.indexOf(t));
        }

        this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), le(this.elements.container, s, n), this.captions.toggled = n, We.updateSetting.call(this, "captions"), ve.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
      }

      setTimeout(() => {
        n && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden");
      });
    },

    set(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      const i = Ye.getTracks.call(this);
      if (-1 !== e) {
        if ($(e)) {
          if (e in i) {
            if (this.captions.currentTrack !== e) {
              this.captions.currentTrack = e;
              const s = i[e],
                    {
                language: n
              } = s || {};
              this.captions.currentTrackNode = s, We.updateSetting.call(this, "captions"), t || (this.captions.language = n, this.storage.set({
                language: n
              })), this.isVimeo && this.embed.enableTextTrack(n), ve.call(this, this.media, "languagechange");
            }

            Ye.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Ye.updateCues.call(this);
          } else this.debug.warn("Track not found", e);
        } else this.debug.warn("Invalid caption argument", e);
      } else Ye.toggle.call(this, !1, t);
    },

    setLanguage(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!_(e)) return void this.debug.warn("Invalid language argument", e);
      const i = e.toLowerCase();
      this.captions.language = i;
      const s = Ye.getTracks.call(this),
            n = Ye.findTrack.call(this, [i]);
      Ye.set.call(this, s.indexOf(n), t);
    },

    getTracks() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      return Array.from((this.media || {}).textTracks || []).filter(t => !this.isHTML5 || e || this.captions.meta.has(t)).filter(e => ["captions", "subtitles"].includes(e.kind));
    },

    findTrack(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;

      const i = Ye.getTracks.call(this),
            s = e => Number((this.captions.meta.get(e) || {}).default),
            n = Array.from(i).sort((e, t) => s(t) - s(e));

      let a;
      return e.every(e => (a = n.find(t => t.language === e), !a)), a || (t ? n[0] : void 0);
    },

    getCurrentTrack() {
      return Ye.getTracks.call(this)[this.currentTrack];
    },

    getLabel(e) {
      let t = e;
      return !V(t) && me.textTracks && this.captions.toggled && (t = Ye.getCurrentTrack.call(this)), V(t) ? W(t.label) ? W(t.language) ? He.get("enabled", this.config) : e.language.toUpperCase() : t.label : He.get("disabled", this.config);
    },

    updateCues(e) {
      if (!this.supported.ui) return;
      if (!H(this.elements.captions)) return void this.debug.warn("No captions element to render to");
      if (!I(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
      let t = e;

      if (!t) {
        const e = Ye.getCurrentTrack.call(this);
        t = Array.from((e || {}).activeCues || []).map(e => e.getCueAsHTML()).map(qe);
      }

      const i = t.map(e => e.trim()).join("\n");

      if (i !== this.elements.captions.innerHTML) {
        ie(this.elements.captions);
        const e = Z("span", ne(this.config.selectors.caption));
        e.innerHTML = i, this.elements.captions.appendChild(e), ve.call(this, this.media, "cuechange");
      }
    }

  },
        Qe = {
    enabled: !0,
    title: "",
    debug: !1,
    autoplay: !1,
    autopause: !0,
    playsinline: !0,
    seekTime: 10,
    volume: 1,
    muted: !1,
    duration: null,
    displayDuration: !0,
    invertTime: !0,
    toggleInvert: !0,
    ratio: null,
    clickToPlay: !0,
    hideControls: !0,
    resetOnEnd: !1,
    disableContextMenu: !0,
    loadSprite: !0,
    iconPrefix: "plyr",
    iconUrl: "https://cdn.plyr.io/3.6.12/plyr.svg",
    blankVideo: "https://cdn.plyr.io/static/blank.mp4",
    quality: {
      default: 576,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      forced: !1,
      onChange: null
    },
    loop: {
      active: !1
    },
    speed: {
      selected: 1,
      options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
    },
    keyboard: {
      focused: !0,
      global: !1
    },
    tooltips: {
      controls: !1,
      seek: !0
    },
    captions: {
      active: !1,
      language: "auto",
      update: !1
    },
    fullscreen: {
      enabled: !0,
      fallback: !0,
      iosNative: !1
    },
    storage: {
      enabled: !0,
      key: "plyr"
    },
    controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
    settings: ["captions", "quality", "speed"],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      pip: "PIP",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
      start: "Start",
      end: "End",
      all: "All",
      reset: "Reset",
      disabled: "Disabled",
      enabled: "Enabled",
      advertisement: "Ad",
      qualityBadge: {
        2160: "4K",
        1440: "HD",
        1080: "HD",
        720: "HD",
        576: "SD",
        480: "SD"
      }
    },
    urls: {
      download: null,
      vimeo: {
        sdk: "https://player.vimeo.com/api/player.js",
        iframe: "https://player.vimeo.com/video/{0}?{1}",
        api: "https://vimeo.com/api/oembed.json?url={0}"
      },
      youtube: {
        sdk: "https://www.youtube.com/iframe_api",
        api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
      },
      googleIMA: {
        sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
      }
    },
    listeners: {
      seek: null,
      play: null,
      pause: null,
      restart: null,
      rewind: null,
      fastForward: null,
      mute: null,
      volume: null,
      captions: null,
      download: null,
      fullscreen: null,
      pip: null,
      airplay: null,
      speed: null,
      quality: null,
      loop: null,
      language: null
    },
    events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
    selectors: {
      editable: "input, textarea, select, [contenteditable]",
      container: ".plyr",
      controls: {
        container: null,
        wrapper: ".plyr__controls"
      },
      labels: "[data-plyr]",
      buttons: {
        play: '[data-plyr="play"]',
        pause: '[data-plyr="pause"]',
        restart: '[data-plyr="restart"]',
        rewind: '[data-plyr="rewind"]',
        fastForward: '[data-plyr="fast-forward"]',
        mute: '[data-plyr="mute"]',
        captions: '[data-plyr="captions"]',
        download: '[data-plyr="download"]',
        fullscreen: '[data-plyr="fullscreen"]',
        pip: '[data-plyr="pip"]',
        airplay: '[data-plyr="airplay"]',
        settings: '[data-plyr="settings"]',
        loop: '[data-plyr="loop"]'
      },
      inputs: {
        seek: '[data-plyr="seek"]',
        volume: '[data-plyr="volume"]',
        speed: '[data-plyr="speed"]',
        language: '[data-plyr="language"]',
        quality: '[data-plyr="quality"]'
      },
      display: {
        currentTime: ".plyr__time--current",
        duration: ".plyr__time--duration",
        buffer: ".plyr__progress__buffer",
        loop: ".plyr__progress__loop",
        volume: ".plyr__volume--display"
      },
      progress: ".plyr__progress",
      captions: ".plyr__captions",
      caption: ".plyr__caption"
    },
    classNames: {
      type: "plyr--{0}",
      provider: "plyr--{0}",
      video: "plyr__video-wrapper",
      embed: "plyr__video-embed",
      videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
      embedContainer: "plyr__video-embed__container",
      poster: "plyr__poster",
      posterEnabled: "plyr__poster-enabled",
      ads: "plyr__ads",
      control: "plyr__control",
      controlPressed: "plyr__control--pressed",
      playing: "plyr--playing",
      paused: "plyr--paused",
      stopped: "plyr--stopped",
      loading: "plyr--loading",
      hover: "plyr--hover",
      tooltip: "plyr__tooltip",
      cues: "plyr__cues",
      hidden: "plyr__sr-only",
      hideControls: "plyr--hide-controls",
      isIos: "plyr--is-ios",
      isTouch: "plyr--is-touch",
      uiSupported: "plyr--full-ui",
      noTransition: "plyr--no-transition",
      display: {
        time: "plyr__time"
      },
      menu: {
        value: "plyr__menu__value",
        badge: "plyr__badge",
        open: "plyr--menu-open"
      },
      captions: {
        enabled: "plyr--captions-enabled",
        active: "plyr--captions-active"
      },
      fullscreen: {
        enabled: "plyr--fullscreen-enabled",
        fallback: "plyr--fullscreen-fallback"
      },
      pip: {
        supported: "plyr--pip-supported",
        active: "plyr--pip-active"
      },
      airplay: {
        supported: "plyr--airplay-supported",
        active: "plyr--airplay-active"
      },
      tabFocus: "plyr__tab-focus",
      previewThumbnails: {
        thumbContainer: "plyr__preview-thumb",
        thumbContainerShown: "plyr__preview-thumb--is-shown",
        imageContainer: "plyr__preview-thumb__image-container",
        timeContainer: "plyr__preview-thumb__time-container",
        scrubbingContainer: "plyr__preview-scrubbing",
        scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
      }
    },
    attributes: {
      embed: {
        provider: "data-plyr-provider",
        id: "data-plyr-embed-id",
        hash: "data-plyr-embed-hash"
      }
    },
    ads: {
      enabled: !1,
      publisherId: "",
      tagUrl: ""
    },
    previewThumbnails: {
      enabled: !1,
      src: ""
    },
    vimeo: {
      byline: !1,
      portrait: !1,
      title: !1,
      speed: !0,
      transparent: !1,
      customControls: !0,
      referrerPolicy: null,
      premium: !1
    },
    youtube: {
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      customControls: !0,
      noCookie: !1
    }
  },
        Xe = "picture-in-picture",
        Je = "inline",
        Ge = {
    html5: "html5",
    youtube: "youtube",
    vimeo: "vimeo"
  },
        Ze = "audio",
        et = "video";

  const tt = () => {};

  class it {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
    }

    get log() {
      return this.enabled ? Function.prototype.bind.call(console.log, console) : tt;
    }

    get warn() {
      return this.enabled ? Function.prototype.bind.call(console.warn, console) : tt;
    }

    get error() {
      return this.enabled ? Function.prototype.bind.call(console.error, console) : tt;
    }

  }

  class st {
    constructor(t) {
      var _this2 = this;

      e(this, "onChange", () => {
        if (!this.enabled) return;
        const e = this.player.elements.buttons.fullscreen;
        H(e) && (e.pressed = this.active);
        const t = this.target === this.player.media ? this.target : this.player.elements.container;
        ve.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0);
      }), e(this, "toggleFallback", function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;

        if (e ? _this2.scrollPosition = {
          x: window.scrollX || 0,
          y: window.scrollY || 0
        } : window.scrollTo(_this2.scrollPosition.x, _this2.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", le(_this2.target, _this2.player.config.classNames.fullscreen.fallback, e), Y.isIos) {
          let t = document.head.querySelector('meta[name="viewport"]');
          const i = "viewport-fit=cover";
          t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
          const s = _(t.content) && t.content.includes(i);
          e ? (_this2.cleanupViewport = !s, s || (t.content += `,${i}`)) : _this2.cleanupViewport && (t.content = t.content.split(",").filter(e => e.trim() !== i).join(","));
        }

        _this2.onChange();
      }), e(this, "trapFocus", e => {
        if (Y.isIos || !this.active || "Tab" !== e.key || 9 !== e.keyCode) return;
        const t = document.activeElement,
              i = ce.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
              [s] = i,
              n = i[i.length - 1];
        t !== n || e.shiftKey ? t === s && e.shiftKey && (n.focus(), e.preventDefault()) : (s.focus(), e.preventDefault());
      }), e(this, "update", () => {
        if (this.enabled) {
          let e;
          e = this.forceFallback ? "Fallback (forced)" : st.native ? "Native" : "Fallback", this.player.debug.log(`${e} fullscreen enabled`);
        } else this.player.debug.log("Fullscreen not supported and fallback disabled");

        le(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
      }), e(this, "enter", () => {
        this.enabled && (Y.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !st.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? W(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({
          navigationUI: "hide"
        }));
      }), e(this, "exit", () => {
        if (this.enabled) if (Y.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), ke(this.player.play());else if (!st.native || this.forceFallback) this.toggleFallback(!1);else if (this.prefix) {
          if (!W(this.prefix)) {
            const e = "moz" === this.prefix ? "Cancel" : "Exit";
            document[`${this.prefix}${e}${this.property}`]();
          }
        } else (document.cancelFullScreen || document.exitFullscreen).call(document);
      }), e(this, "toggle", () => {
        this.active ? this.exit() : this.enter();
      }), this.player = t, this.prefix = st.prefix, this.property = st.property, this.scrollPosition = {
        x: 0,
        y: 0
      }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function (e, t) {
        const {
          prototype: i
        } = Element;
        return (i.closest || function () {
          let e = this;

          do {
            if (re.matches(e, t)) return e;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);

          return null;
        }).call(e, t);
      }(this.player.elements.container, t.config.fullscreen.container), fe.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, () => {
        this.onChange();
      }), fe.call(this.player, this.player.elements.container, "dblclick", e => {
        H(this.player.elements.controls) && this.player.elements.controls.contains(e.target) || this.player.listeners.proxy(e, this.toggle, "fullscreen");
      }), fe.call(this, this.player.elements.container, "keydown", e => this.trapFocus(e)), this.update();
    }

    static get native() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }

    get usingNative() {
      return st.native && !this.forceFallback;
    }

    static get prefix() {
      if (j(document.exitFullscreen)) return "";
      let e = "";
      return ["webkit", "moz", "ms"].some(t => !(!j(document[`${t}ExitFullscreen`]) && !j(document[`${t}CancelFullScreen`])) && (e = t, !0)), e;
    }

    static get property() {
      return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
    }

    get enabled() {
      return (st.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
    }

    get active() {
      if (!this.enabled) return !1;
      if (!st.native || this.forceFallback) return oe(this.target, this.player.config.classNames.fullscreen.fallback);
      const e = this.prefix ? this.target.getRootNode()[`${this.prefix}${this.property}Element`] : this.target.getRootNode().fullscreenElement;
      return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
    }

    get target() {
      return Y.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
    }

  }

  function nt(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return new Promise((i, s) => {
      const n = new Image(),
            a = () => {
        delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
      };

      Object.assign(n, {
        onload: a,
        onerror: a,
        src: e
      });
    });
  }

  const at = {
    addStyleHook() {
      le(this.elements.container, this.config.selectors.container.replace(".", ""), !0), le(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },

    toggleNativeControls() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
    },

    build() {
      if (this.listeners.media(), !this.supported.ui) return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void at.toggleNativeControls.call(this, !0);
      H(this.elements.controls) || (We.inject.call(this), this.listeners.controls()), at.toggleNativeControls.call(this), this.isHTML5 && Ye.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, We.updateVolume.call(this), We.timeUpdate.call(this), We.durationUpdate.call(this), at.checkPlaying.call(this), le(this.elements.container, this.config.classNames.pip.supported, me.pip && this.isHTML5 && this.isVideo), le(this.elements.container, this.config.classNames.airplay.supported, me.airplay && this.isHTML5), le(this.elements.container, this.config.classNames.isIos, Y.isIos), le(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(() => {
        ve.call(this, this.media, "ready");
      }, 0), at.setTitle.call(this), this.poster && at.setPoster.call(this, this.poster, !1).catch(() => {}), this.config.duration && We.durationUpdate.call(this);
    },

    setTitle() {
      let e = He.get("play", this.config);

      if (_(this.config.title) && !W(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach(t => {
        t.setAttribute("aria-label", e);
      }), this.isEmbed) {
        const e = he.call(this, "iframe");
        if (!H(e)) return;
        const t = W(this.config.title) ? "video" : this.config.title,
              i = He.get("frameTitle", this.config);
        e.setAttribute("title", i.replace("{title}", t));
      }
    },

    togglePoster(e) {
      le(this.elements.container, this.config.classNames.posterEnabled, e);
    },

    setPoster(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), Te.call(this).then(() => nt(e)).catch(t => {
        throw e === this.poster && at.togglePoster.call(this, !1), t;
      }).then(() => {
        if (e !== this.poster) throw new Error("setPoster cancelled by later call to setPoster");
      }).then(() => (Object.assign(this.elements.poster.style, {
        backgroundImage: `url('${e}')`,
        backgroundSize: ""
      }), at.togglePoster.call(this, !0), e)));
    },

    checkPlaying(e) {
      le(this.elements.container, this.config.classNames.playing, this.playing), le(this.elements.container, this.config.classNames.paused, this.paused), le(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(e => {
        Object.assign(e, {
          pressed: this.playing
        }), e.setAttribute("aria-label", He.get(this.playing ? "pause" : "play", this.config));
      }), F(e) && "timeupdate" === e.type || at.toggleControls.call(this);
    },

    checkLoading(e) {
      this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
        le(this.elements.container, this.config.classNames.loading, this.loading), at.toggleControls.call(this);
      }, this.loading ? 250 : 0);
    },

    toggleControls(e) {
      const {
        controls: t
      } = this.elements;

      if (t && this.config.hideControls) {
        const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
        this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
      }
    },

    migrateStyles() {
      Object.values({ ...this.media.style
      }).filter(e => !W(e) && _(e) && e.startsWith("--plyr")).forEach(e => {
        this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e);
      }), W(this.media.style) && this.media.removeAttribute("style");
    }

  };

  class lt {
    constructor(t) {
      var _this3 = this;

      e(this, "firstTouch", () => {
        const {
          player: e
        } = this,
              {
          elements: t
        } = e;
        e.touch = !0, le(t.container, e.config.classNames.isTouch, !0);
      }), e(this, "setTabFocus", e => {
        const {
          player: t
        } = this,
              {
          elements: i
        } = t;
        if (clearTimeout(this.focusTimer), "keydown" === e.type && 9 !== e.which) return;
        "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
        const s = e.timeStamp - this.lastKeyDown <= 20;
        ("focus" !== e.type || s) && ((() => {
          const e = t.config.classNames.tabFocus;
          le(ce.call(t, `.${e}`), e, !1);
        })(), "focusout" !== e.type && (this.focusTimer = setTimeout(() => {
          const e = document.activeElement;
          i.container.contains(e) && le(document.activeElement, t.config.classNames.tabFocus, !0);
        }, 10)));
      }), e(this, "global", function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        const {
          player: t
        } = _this3;
        t.config.keyboard.global && ge.call(t, window, "keydown keyup", _this3.handleKey, e, !1), ge.call(t, document.body, "click", _this3.toggleMenu, e), ye.call(t, document.body, "touchstart", _this3.firstTouch), ge.call(t, document.body, "keydown focus blur focusout", _this3.setTabFocus, e, !1, !0);
      }), e(this, "container", () => {
        const {
          player: e
        } = this,
              {
          config: t,
          elements: i,
          timers: s
        } = e;
        !t.keyboard.global && t.keyboard.focused && fe.call(e, i.container, "keydown keyup", this.handleKey, !1), fe.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", t => {
          const {
            controls: n
          } = i;
          n && "enterfullscreen" === t.type && (n.pressed = !1, n.hover = !1);
          let a = 0;
          ["touchstart", "touchmove", "mousemove"].includes(t.type) && (at.toggleControls.call(e, !0), a = e.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(() => at.toggleControls.call(e, !1), a);
        });

        const n = () => {
          if (!e.isVimeo || e.config.vimeo.premium) return;
          const t = i.wrapper,
                {
            active: s
          } = e.fullscreen,
                [n, a] = xe.call(e),
                l = Se(`aspect-ratio: ${n} / ${a}`);
          if (!s) return void (l ? (t.style.width = null, t.style.height = null) : (t.style.maxWidth = null, t.style.margin = null));
          const [o, r] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)],
                c = o / r > n / a;
          l ? (t.style.width = c ? "auto" : "100%", t.style.height = c ? "100%" : "auto") : (t.style.maxWidth = c ? r / a * n + "px" : null, t.style.margin = c ? "0 auto" : null);
        },
              a = () => {
          clearTimeout(s.resized), s.resized = setTimeout(n, 50);
        };

        fe.call(e, i.container, "enterfullscreen exitfullscreen", t => {
          const {
            target: s
          } = e.fullscreen;
          if (s !== i.container) return;
          if (!e.isEmbed && W(e.config.ratio)) return;
          n();
          ("enterfullscreen" === t.type ? fe : be).call(e, window, "resize", a);
        });
      }), e(this, "media", () => {
        const {
          player: e
        } = this,
              {
          elements: t
        } = e;

        if (fe.call(e, e.media, "timeupdate seeking seeked", t => We.timeUpdate.call(e, t)), fe.call(e, e.media, "durationchange loadeddata loadedmetadata", t => We.durationUpdate.call(e, t)), fe.call(e, e.media, "ended", () => {
          e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause());
        }), fe.call(e, e.media, "progress playing seeking seeked", t => We.updateProgress.call(e, t)), fe.call(e, e.media, "volumechange", t => We.updateVolume.call(e, t)), fe.call(e, e.media, "playing play pause ended emptied timeupdate", t => at.checkPlaying.call(e, t)), fe.call(e, e.media, "waiting canplay seeked playing", t => at.checkLoading.call(e, t)), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
          const i = he.call(e, `.${e.config.classNames.video}`);
          if (!H(i)) return;
          fe.call(e, t.container, "click", s => {
            ([t.container, i].includes(s.target) || i.contains(s.target)) && (e.touch && e.config.hideControls || (e.ended ? (this.proxy(s, e.restart, "restart"), this.proxy(s, () => {
              ke(e.play());
            }, "play")) : this.proxy(s, () => {
              ke(e.togglePlay());
            }, "play")));
          });
        }

        e.supported.ui && e.config.disableContextMenu && fe.call(e, t.wrapper, "contextmenu", e => {
          e.preventDefault();
        }, !1), fe.call(e, e.media, "volumechange", () => {
          e.storage.set({
            volume: e.volume,
            muted: e.muted
          });
        }), fe.call(e, e.media, "ratechange", () => {
          We.updateSetting.call(e, "speed"), e.storage.set({
            speed: e.speed
          });
        }), fe.call(e, e.media, "qualitychange", t => {
          We.updateSetting.call(e, "quality", null, t.detail.quality);
        }), fe.call(e, e.media, "ready qualitychange", () => {
          We.setDownloadUrl.call(e);
        });
        const i = e.config.events.concat(["keyup", "keydown"]).join(" ");
        fe.call(e, e.media, i, i => {
          let {
            detail: s = {}
          } = i;
          "error" === i.type && (s = e.media.error), ve.call(e, t.container, i.type, !0, s);
        });
      }), e(this, "proxy", (e, t, i) => {
        const {
          player: s
        } = this,
              n = s.config.listeners[i];
        let a = !0;
        j(n) && (a = n.call(s, e)), !1 !== a && j(t) && t.call(s, e);
      }), e(this, "bind", function (e, t, i, s) {
        let n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
        const {
          player: a
        } = _this3,
              l = a.config.listeners[s],
              o = j(l);
        fe.call(a, e, t, e => _this3.proxy(e, i, s), n && !o);
      }), e(this, "controls", () => {
        const {
          player: e
        } = this,
              {
          elements: t
        } = e,
              i = Y.isIE ? "change" : "input";

        if (t.buttons.play && Array.from(t.buttons.play).forEach(t => {
          this.bind(t, "click", () => {
            ke(e.togglePlay());
          }, "play");
        }), this.bind(t.buttons.restart, "click", e.restart, "restart"), this.bind(t.buttons.rewind, "click", () => {
          e.lastSeekTime = Date.now(), e.rewind();
        }, "rewind"), this.bind(t.buttons.fastForward, "click", () => {
          e.lastSeekTime = Date.now(), e.forward();
        }, "fastForward"), this.bind(t.buttons.mute, "click", () => {
          e.muted = !e.muted;
        }, "mute"), this.bind(t.buttons.captions, "click", () => e.toggleCaptions()), this.bind(t.buttons.download, "click", () => {
          ve.call(e, e.media, "download");
        }, "download"), this.bind(t.buttons.fullscreen, "click", () => {
          e.fullscreen.toggle();
        }, "fullscreen"), this.bind(t.buttons.pip, "click", () => {
          e.pip = "toggle";
        }, "pip"), this.bind(t.buttons.airplay, "click", e.airplay, "airplay"), this.bind(t.buttons.settings, "click", t => {
          t.stopPropagation(), t.preventDefault(), We.toggleMenu.call(e, t);
        }, null, !1), this.bind(t.buttons.settings, "keyup", t => {
          const i = t.which;
          [13, 32].includes(i) && (13 !== i ? (t.preventDefault(), t.stopPropagation(), We.toggleMenu.call(e, t)) : We.focusFirstMenuItem.call(e, null, !0));
        }, null, !1), this.bind(t.settings.menu, "keydown", t => {
          27 === t.which && We.toggleMenu.call(e, t);
        }), this.bind(t.inputs.seek, "mousedown mousemove", e => {
          const i = t.progress.getBoundingClientRect(),
                s = 100 / i.width * (e.pageX - i.left);
          e.currentTarget.setAttribute("seek-value", s);
        }), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", t => {
          const i = t.currentTarget,
                s = t.keyCode ? t.keyCode : t.which,
                n = "play-on-seeked";
          if (R(t) && 39 !== s && 37 !== s) return;
          e.lastSeekTime = Date.now();
          const a = i.hasAttribute(n),
                l = ["mouseup", "touchend", "keyup"].includes(t.type);
          a && l ? (i.removeAttribute(n), ke(e.play())) : !l && e.playing && (i.setAttribute(n, ""), e.pause());
        }), Y.isIos) {
          const t = ce.call(e, 'input[type="range"]');
          Array.from(t).forEach(e => this.bind(e, i, e => K(e.target)));
        }

        this.bind(t.inputs.seek, i, t => {
          const i = t.currentTarget;
          let s = i.getAttribute("seek-value");
          W(s) && (s = i.value), i.removeAttribute("seek-value"), e.currentTime = s / i.max * e.duration;
        }, "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", t => We.updateSeekTooltip.call(e, t)), this.bind(t.progress, "mousemove touchmove", t => {
          const {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.startMove(t);
        }), this.bind(t.progress, "mouseleave touchend click", () => {
          const {
            previewThumbnails: t
          } = e;
          t && t.loaded && t.endMove(!1, !0);
        }), this.bind(t.progress, "mousedown touchstart", t => {
          const {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.startScrubbing(t);
        }), this.bind(t.progress, "mouseup touchend", t => {
          const {
            previewThumbnails: i
          } = e;
          i && i.loaded && i.endScrubbing(t);
        }), Y.isWebkit && Array.from(ce.call(e, 'input[type="range"]')).forEach(t => {
          this.bind(t, "input", t => We.updateRangeFill.call(e, t.target));
        }), e.config.toggleInvert && !H(t.display.duration) && this.bind(t.display.currentTime, "click", () => {
          0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, We.timeUpdate.call(e));
        }), this.bind(t.inputs.volume, i, t => {
          e.volume = t.target.value;
        }, "volume"), this.bind(t.controls, "mouseenter mouseleave", i => {
          t.controls.hover = !e.touch && "mouseenter" === i.type;
        }), t.fullscreen && Array.from(t.fullscreen.children).filter(e => !e.contains(t.container)).forEach(i => {
          this.bind(i, "mouseenter mouseleave", i => {
            t.controls && (t.controls.hover = !e.touch && "mouseenter" === i.type);
          });
        }), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", e => {
          t.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
        }), this.bind(t.controls, "focusin", () => {
          const {
            config: i,
            timers: s
          } = e;
          le(t.controls, i.classNames.noTransition, !0), at.toggleControls.call(e, !0), setTimeout(() => {
            le(t.controls, i.classNames.noTransition, !1);
          }, 0);
          const n = this.touch ? 3e3 : 4e3;
          clearTimeout(s.controls), s.controls = setTimeout(() => at.toggleControls.call(e, !1), n);
        }), this.bind(t.inputs.volume, "wheel", t => {
          const i = t.webkitDirectionInvertedFromDevice,
                [s, n] = [t.deltaX, -t.deltaY].map(e => i ? -e : e),
                a = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);
          e.increaseVolume(a / 50);
          const {
            volume: l
          } = e.media;
          (1 === a && l < 1 || -1 === a && l > 0) && t.preventDefault();
        }, "volume", !1);
      }), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
    }

    handleKey(e) {
      const {
        player: t
      } = this,
            {
        elements: i
      } = t,
            s = e.keyCode ? e.keyCode : e.which,
            n = "keydown" === e.type,
            a = n && s === this.lastKey;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (!$(s)) return;

      if (n) {
        const n = document.activeElement;

        if (H(n)) {
          const {
            editable: s
          } = t.config.selectors,
                {
            seek: a
          } = i.inputs;
          if (n !== a && re(n, s)) return;
          if (32 === e.which && re(n, 'button, [role^="menuitem"]')) return;
        }

        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            a || (t.currentTime = t.duration / 10 * (s - 48));
            break;

          case 32:
          case 75:
            a || ke(t.togglePlay());
            break;

          case 38:
            t.increaseVolume(.1);
            break;

          case 40:
            t.decreaseVolume(.1);
            break;

          case 77:
            a || (t.muted = !t.muted);
            break;

          case 39:
            t.forward();
            break;

          case 37:
            t.rewind();
            break;

          case 70:
            t.fullscreen.toggle();
            break;

          case 67:
            a || t.toggleCaptions();
            break;

          case 76:
            t.loop = !t.loop;
        }

        27 === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
      } else this.lastKey = null;
    }

    toggleMenu(e) {
      We.toggleMenu.call(this.player, e);
    }

  }

  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self && self;

  var ot = function (e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }(function (e, t) {
    e.exports = function () {
      var e = function () {},
          t = {},
          i = {},
          s = {};

      function n(e, t) {
        e = e.push ? e : [e];
        var n,
            a,
            l,
            o = [],
            r = e.length,
            c = r;

        for (n = function (e, i) {
          i.length && o.push(e), --c || t(o);
        }; r--;) a = e[r], (l = i[a]) ? n(a, l) : (s[a] = s[a] || []).push(n);
      }

      function a(e, t) {
        if (e) {
          var n = s[e];
          if (i[e] = t, n) for (; n.length;) n[0](e, t), n.splice(0, 1);
        }
      }

      function l(t, i) {
        t.call && (t = {
          success: t
        }), i.length ? (t.error || e)(i) : (t.success || e)(t);
      }

      function o(t, i, s, n) {
        var a,
            l,
            r = document,
            c = s.async,
            h = (s.numRetries || 0) + 1,
            u = s.before || e,
            d = t.replace(/[\?|#].*$/, ""),
            m = t.replace(/^(css|img)!/, "");
        n = n || 0, /(^css!|\.css$)/.test(d) ? ((l = r.createElement("link")).rel = "stylesheet", l.href = m, (a = "hideFocus" in l) && l.relList && (a = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (l = r.createElement("img")).src = m : ((l = r.createElement("script")).src = t, l.async = void 0 === c || c), l.onload = l.onerror = l.onbeforeload = function (e) {
          var r = e.type[0];
          if (a) try {
            l.sheet.cssText.length || (r = "e");
          } catch (e) {
            18 != e.code && (r = "e");
          }

          if ("e" == r) {
            if ((n += 1) < h) return o(t, i, s, n);
          } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";

          i(t, r, e.defaultPrevented);
        }, !1 !== u(t, l) && r.head.appendChild(l);
      }

      function r(e, t, i) {
        var s,
            n,
            a = (e = e.push ? e : [e]).length,
            l = a,
            r = [];

        for (s = function (e, i, s) {
          if ("e" == i && r.push(e), "b" == i) {
            if (!s) return;
            r.push(e);
          }

          --a || t(r);
        }, n = 0; n < l; n++) o(e[n], s, i);
      }

      function c(e, i, s) {
        var n, o;

        if (i && i.trim && (n = i), o = (n ? s : i) || {}, n) {
          if (n in t) throw "LoadJS";
          t[n] = !0;
        }

        function c(t, i) {
          r(e, function (e) {
            l(o, e), t && l({
              success: t,
              error: i
            }, e), a(n, e);
          }, o);
        }

        if (o.returnPromise) return new Promise(c);
        c();
      }

      return c.ready = function (e, t) {
        return n(e, function (e) {
          l(t, e);
        }), c;
      }, c.done = function (e) {
        a(e, []);
      }, c.reset = function () {
        t = {}, i = {}, s = {};
      }, c.isDefined = function (e) {
        return e in t;
      }, c;
    }();
  });

  function rt(e) {
    return new Promise((t, i) => {
      ot(e, {
        success: t,
        error: i
      });
    });
  }

  function ct(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"));
  }

  const ht = {
    setup() {
      const e = this;
      le(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Me.call(e), L(window.Vimeo) ? ht.ready.call(e) : rt(e.config.urls.vimeo.sdk).then(() => {
        ht.ready.call(e);
      }).catch(t => {
        e.debug.warn("Vimeo SDK (player.js) failed to load", t);
      });
    },

    ready() {
      const e = this,
            t = e.config.vimeo,
            {
        premium: i,
        referrerPolicy: s,
        ...n
      } = t;
      let a = e.media.getAttribute("src"),
          l = "";
      W(a) ? (a = e.media.getAttribute(e.config.attributes.embed.id), l = e.media.getAttribute(e.config.attributes.embed.hash)) : l = function (e) {
        const t = e.match(/^.*(?:vimeo.com\/|video\/)(?:\d+)(?:\?.*&*h=|\/)+(?<hash>[\d,a-f]+)/);
        return t ? t.groups.hash : null;
      }(a);
      const o = l ? {
        h: l
      } : {};
      i && Object.assign(n, {
        controls: !1,
        sidedock: !1
      });
      const r = Ke({
        loop: e.config.loop.active,
        autoplay: e.autoplay,
        muted: e.muted,
        gesture: "media",
        playsinline: !this.config.fullscreen.iosNative,
        ...o,
        ...n
      }),
            c = W(h = a) ? null : $(Number(h)) ? h : h.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : h;
      var h;
      const u = Z("iframe"),
            d = $e(e.config.urls.vimeo.iframe, c, r);
      if (u.setAttribute("src", d), u.setAttribute("allowfullscreen", ""), u.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), W(s) || u.setAttribute("referrerPolicy", s), i || !t.customControls) u.setAttribute("data-poster", e.poster), e.media = se(u, e.media);else {
        const t = Z("div", {
          class: e.config.classNames.embedContainer,
          "data-poster": e.poster
        });
        t.appendChild(u), e.media = se(t, e.media);
      }
      t.customControls || Re($e(e.config.urls.vimeo.api, d)).then(t => {
        !W(t) && t.thumbnail_url && at.setPoster.call(e, t.thumbnail_url).catch(() => {});
      }), e.embed = new window.Vimeo.Player(u, {
        autopause: e.config.autopause,
        muted: e.muted
      }), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (ct.call(e, !0), e.embed.play()), e.media.pause = () => (ct.call(e, !1), e.embed.pause()), e.media.stop = () => {
        e.pause(), e.currentTime = 0;
      };
      let {
        currentTime: m
      } = e.media;
      Object.defineProperty(e.media, "currentTime", {
        get: () => m,

        set(t) {
          const {
            embed: i,
            media: s,
            paused: n,
            volume: a
          } = e,
                l = n && !i.hasPlayed;
          s.seeking = !0, ve.call(e, s, "seeking"), Promise.resolve(l && i.setVolume(0)).then(() => i.setCurrentTime(t)).then(() => l && i.pause()).then(() => l && i.setVolume(a)).catch(() => {});
        }

      });
      let p = e.config.speed.selected;
      Object.defineProperty(e.media, "playbackRate", {
        get: () => p,

        set(t) {
          e.embed.setPlaybackRate(t).then(() => {
            p = t, ve.call(e, e.media, "ratechange");
          }).catch(() => {
            e.options.speed = [1];
          });
        }

      });
      let {
        volume: g
      } = e.config;
      Object.defineProperty(e.media, "volume", {
        get: () => g,

        set(t) {
          e.embed.setVolume(t).then(() => {
            g = t, ve.call(e, e.media, "volumechange");
          });
        }

      });
      let {
        muted: f
      } = e.config;
      Object.defineProperty(e.media, "muted", {
        get: () => f,

        set(t) {
          const i = !!O(t) && t;
          e.embed.setVolume(i ? 0 : e.config.volume).then(() => {
            f = i, ve.call(e, e.media, "volumechange");
          });
        }

      });
      let b,
          {
        loop: y
      } = e.config;
      Object.defineProperty(e.media, "loop", {
        get: () => y,

        set(t) {
          const i = O(t) ? t : e.config.loop.active;
          e.embed.setLoop(i).then(() => {
            y = i;
          });
        }

      }), e.embed.getVideoUrl().then(t => {
        b = t, We.setDownloadUrl.call(e);
      }).catch(e => {
        this.debug.warn(e);
      }), Object.defineProperty(e.media, "currentSrc", {
        get: () => b
      }), Object.defineProperty(e.media, "ended", {
        get: () => e.currentTime === e.duration
      }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(t => {
        const [i, s] = t;
        e.embed.ratio = Ie(i, s), Me.call(this);
      }), e.embed.setAutopause(e.config.autopause).then(t => {
        e.config.autopause = t;
      }), e.embed.getVideoTitle().then(t => {
        e.config.title = t, at.setTitle.call(this);
      }), e.embed.getCurrentTime().then(t => {
        m = t, ve.call(e, e.media, "timeupdate");
      }), e.embed.getDuration().then(t => {
        e.media.duration = t, ve.call(e, e.media, "durationchange");
      }), e.embed.getTextTracks().then(t => {
        e.media.textTracks = t, Ye.setup.call(e);
      }), e.embed.on("cuechange", _ref8 => {
        let {
          cues: t = []
        } = _ref8;
        const i = t.map(e => function (e) {
          const t = document.createDocumentFragment(),
                i = document.createElement("div");
          return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
        }(e.text));
        Ye.updateCues.call(e, i);
      }), e.embed.on("loaded", () => {
        if (e.embed.getPaused().then(t => {
          ct.call(e, !t), t || ve.call(e, e.media, "playing");
        }), H(e.embed.element) && e.supported.ui) {
          e.embed.element.setAttribute("tabindex", -1);
        }
      }), e.embed.on("bufferstart", () => {
        ve.call(e, e.media, "waiting");
      }), e.embed.on("bufferend", () => {
        ve.call(e, e.media, "playing");
      }), e.embed.on("play", () => {
        ct.call(e, !0), ve.call(e, e.media, "playing");
      }), e.embed.on("pause", () => {
        ct.call(e, !1);
      }), e.embed.on("timeupdate", t => {
        e.media.seeking = !1, m = t.seconds, ve.call(e, e.media, "timeupdate");
      }), e.embed.on("progress", t => {
        e.media.buffered = t.percent, ve.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && ve.call(e, e.media, "canplaythrough"), e.embed.getDuration().then(t => {
          t !== e.media.duration && (e.media.duration = t, ve.call(e, e.media, "durationchange"));
        });
      }), e.embed.on("seeked", () => {
        e.media.seeking = !1, ve.call(e, e.media, "seeked");
      }), e.embed.on("ended", () => {
        e.media.paused = !0, ve.call(e, e.media, "ended");
      }), e.embed.on("error", t => {
        e.media.error = t, ve.call(e, e.media, "error");
      }), t.customControls && setTimeout(() => at.build.call(e), 0);
    }

  };

  function ut(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"));
  }

  function dt(e) {
    return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
  }

  const mt = {
    setup() {
      if (le(this.elements.wrapper, this.config.classNames.embed, !0), L(window.YT) && j(window.YT.Player)) mt.ready.call(this);else {
        const e = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          j(e) && e(), mt.ready.call(this);
        }, rt(this.config.urls.youtube.sdk).catch(e => {
          this.debug.warn("YouTube API failed to load", e);
        });
      }
    },

    getTitle(e) {
      Re($e(this.config.urls.youtube.api, e)).then(e => {
        if (L(e)) {
          const {
            title: t,
            height: i,
            width: s
          } = e;
          this.config.title = t, at.setTitle.call(this), this.embed.ratio = Ie(s, i);
        }

        Me.call(this);
      }).catch(() => {
        Me.call(this);
      });
    },

    ready() {
      const e = this,
            t = e.config.youtube,
            i = e.media && e.media.getAttribute("id");
      if (!W(i) && i.startsWith("youtube-")) return;
      let s = e.media.getAttribute("src");
      W(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
      const n = W(a = s) ? null : a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : a;
      var a;
      const l = Z("div", {
        id: `${e.provider}-${Math.floor(1e4 * Math.random())}`,
        "data-poster": t.customControls ? e.poster : void 0
      });

      if (e.media = se(l, e.media), t.customControls) {
        const t = e => `https://i.ytimg.com/vi/${n}/${e}default.jpg`;

        nt(t("maxres"), 121).catch(() => nt(t("sd"), 121)).catch(() => nt(t("hq"))).then(t => at.setPoster.call(e, t.src)).then(t => {
          t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
        }).catch(() => {});
      }

      e.embed = new window.YT.Player(e.media, {
        videoId: n,
        host: dt(t),
        playerVars: X({}, {
          autoplay: e.config.autoplay ? 1 : 0,
          hl: e.config.hl,
          controls: e.supported.ui && t.customControls ? 0 : 1,
          disablekb: 1,
          playsinline: e.config.fullscreen.iosNative ? 0 : 1,
          cc_load_policy: e.captions.active ? 1 : 0,
          cc_lang_pref: e.config.captions.language,
          widget_referrer: window ? window.location.href : null
        }, t),
        events: {
          onError(t) {
            if (!e.media.error) {
              const i = t.data,
                    s = {
                2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                101: "The owner of the requested video does not allow it to be played in embedded players.",
                150: "The owner of the requested video does not allow it to be played in embedded players."
              }[i] || "An unknown error occured";
              e.media.error = {
                code: i,
                message: s
              }, ve.call(e, e.media, "error");
            }
          },

          onPlaybackRateChange(t) {
            const i = t.target;
            e.media.playbackRate = i.getPlaybackRate(), ve.call(e, e.media, "ratechange");
          },

          onReady(i) {
            if (j(e.media.play)) return;
            const s = i.target;
            mt.getTitle.call(e, n), e.media.play = () => {
              ut.call(e, !0), s.playVideo();
            }, e.media.pause = () => {
              ut.call(e, !1), s.pauseVideo();
            }, e.media.stop = () => {
              s.stopVideo();
            }, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
              get: () => Number(s.getCurrentTime()),

              set(t) {
                e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ve.call(e, e.media, "seeking"), s.seekTo(t);
              }

            }), Object.defineProperty(e.media, "playbackRate", {
              get: () => s.getPlaybackRate(),

              set(e) {
                s.setPlaybackRate(e);
              }

            });
            let {
              volume: a
            } = e.config;
            Object.defineProperty(e.media, "volume", {
              get: () => a,

              set(t) {
                a = t, s.setVolume(100 * a), ve.call(e, e.media, "volumechange");
              }

            });
            let {
              muted: l
            } = e.config;
            Object.defineProperty(e.media, "muted", {
              get: () => l,

              set(t) {
                const i = O(t) ? t : l;
                l = i, s[i ? "mute" : "unMute"](), s.setVolume(100 * a), ve.call(e, e.media, "volumechange");
              }

            }), Object.defineProperty(e.media, "currentSrc", {
              get: () => s.getVideoUrl()
            }), Object.defineProperty(e.media, "ended", {
              get: () => e.currentTime === e.duration
            });
            const o = s.getAvailablePlaybackRates();
            e.options.speed = o.filter(t => e.config.speed.options.includes(t)), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), ve.call(e, e.media, "timeupdate"), ve.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(() => {
              e.media.buffered = s.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ve.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ve.call(e, e.media, "canplaythrough"));
            }, 200), t.customControls && setTimeout(() => at.build.call(e), 50);
          },

          onStateChange(i) {
            const s = i.target;
            clearInterval(e.timers.playing);

            switch (e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, ve.call(e, e.media, "seeked")), i.data) {
              case -1:
                ve.call(e, e.media, "timeupdate"), e.media.buffered = s.getVideoLoadedFraction(), ve.call(e, e.media, "progress");
                break;

              case 0:
                ut.call(e, !1), e.media.loop ? (s.stopVideo(), s.playVideo()) : ve.call(e, e.media, "ended");
                break;

              case 1:
                t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (ut.call(e, !0), ve.call(e, e.media, "playing"), e.timers.playing = setInterval(() => {
                  ve.call(e, e.media, "timeupdate");
                }, 50), e.media.duration !== s.getDuration() && (e.media.duration = s.getDuration(), ve.call(e, e.media, "durationchange")));
                break;

              case 2:
                e.muted || e.embed.unMute(), ut.call(e, !1);
                break;

              case 3:
                ve.call(e, e.media, "waiting");
            }

            ve.call(e, e.elements.container, "statechange", !1, {
              code: i.data
            });
          }

        }
      });
    }

  },
        pt = {
    setup() {
      this.media ? (le(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), le(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && le(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = Z("div", {
        class: this.config.classNames.video
      }), J(this.media, this.elements.wrapper), this.elements.poster = Z("div", {
        class: this.config.classNames.poster
      }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? Le.setup.call(this) : this.isYouTube ? mt.setup.call(this) : this.isVimeo && ht.setup.call(this)) : this.debug.warn("No media element found!");
    }

  };

  class gt {
    constructor(t) {
      var _this4 = this;

      e(this, "load", () => {
        this.enabled && (L(window.google) && L(window.google.ima) ? this.ready() : rt(this.player.config.urls.googleIMA.sdk).then(() => {
          this.ready();
        }).catch(() => {
          this.trigger("error", new Error("Google IMA SDK failed to load"));
        }));
      }), e(this, "ready", () => {
        var e;
        this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
          this.clearSafetyTimer("onAdsManagerLoaded()");
        }), this.listeners(), this.setupIMA();
      }), e(this, "setupIMA", () => {
        this.elements.container = Z("div", {
          class: this.player.config.classNames.ads
        }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, e => this.onAdsManagerLoaded(e), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e), !1), this.requestAds();
      }), e(this, "requestAds", () => {
        const {
          container: e
        } = this.player.elements;

        try {
          const t = new google.ima.AdsRequest();
          t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t);
        } catch (e) {
          this.onAdError(e);
        }
      }), e(this, "pollCountdown", function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        if (!e) return clearInterval(_this4.countdownTimer), void _this4.elements.container.removeAttribute("data-badge-text");
        _this4.countdownTimer = setInterval(() => {
          const e = Ue(Math.max(_this4.manager.getRemainingTime(), 0)),
                t = `${He.get("advertisement", _this4.player.config)} - ${e}`;

          _this4.elements.container.setAttribute("data-badge-text", t);
        }, 100);
      }), e(this, "onAdsManagerLoaded", e => {
        if (!this.enabled) return;
        const t = new google.ima.AdsRenderingSettings();
        t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e => this.onAdError(e)), Object.keys(google.ima.AdEvent.Type).forEach(e => {
          this.manager.addEventListener(google.ima.AdEvent.Type[e], e => this.onAdEvent(e));
        }), this.trigger("loaded");
      }), e(this, "addCuePoints", () => {
        W(this.cuePoints) || this.cuePoints.forEach(e => {
          if (0 !== e && -1 !== e && e < this.player.duration) {
            const t = this.player.elements.progress;

            if (H(t)) {
              const i = 100 / this.player.duration * e,
                    s = Z("span", {
                class: this.player.config.classNames.cues
              });
              s.style.left = `${i.toString()}%`, t.appendChild(s);
            }
          }
        });
      }), e(this, "onAdEvent", e => {
        const {
          container: t
        } = this.player.elements,
              i = e.getAd(),
              s = e.getAdData();

        switch ((e => {
          ve.call(this.player, this.player.media, `ads${e.replace(/_/g, "").toLowerCase()}`);
        })(e.type), e.type) {
          case google.ima.AdEvent.Type.LOADED:
            this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
            break;

          case google.ima.AdEvent.Type.STARTED:
            this.manager.setVolume(this.player.volume);
            break;

          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            this.player.ended ? this.loadAds() : this.loader.contentComplete();
            break;

          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            this.pauseContent();
            break;

          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            this.pollCountdown(), this.resumeContent();
            break;

          case google.ima.AdEvent.Type.LOG:
            s.adError && this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`);
        }
      }), e(this, "onAdError", e => {
        this.cancel(), this.player.debug.warn("Ads error", e);
      }), e(this, "listeners", () => {
        const {
          container: e
        } = this.player.elements;
        let t;
        this.player.on("canplay", () => {
          this.addCuePoints();
        }), this.player.on("ended", () => {
          this.loader.contentComplete();
        }), this.player.on("timeupdate", () => {
          t = this.player.currentTime;
        }), this.player.on("seeked", () => {
          const e = this.player.currentTime;
          W(this.cuePoints) || this.cuePoints.forEach((i, s) => {
            t < i && i < e && (this.manager.discardAdBreak(), this.cuePoints.splice(s, 1));
          });
        }), window.addEventListener("resize", () => {
          this.manager && this.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL);
        });
      }), e(this, "play", () => {
        const {
          container: e
        } = this.player.elements;
        this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
          this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();

          try {
            this.initialized || (this.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0;
          } catch (e) {
            this.onAdError(e);
          }
        }).catch(() => {});
      }), e(this, "resumeContent", () => {
        this.elements.container.style.zIndex = "", this.playing = !1, ke(this.player.media.play());
      }), e(this, "pauseContent", () => {
        this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause();
      }), e(this, "cancel", () => {
        this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
      }), e(this, "loadAds", () => {
        this.managerPromise.then(() => {
          this.manager && this.manager.destroy(), this.managerPromise = new Promise(e => {
            this.on("loaded", e), this.player.debug.log(this.manager);
          }), this.initialized = !1, this.requestAds();
        }).catch(() => {});
      }), e(this, "trigger", function (e) {
        for (var _len4 = arguments.length, t = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          t[_key4 - 1] = arguments[_key4];
        }

        const i = _this4.events[e];
        q(i) && i.forEach(e => {
          j(e) && e.apply(_this4, t);
        });
      }), e(this, "on", (e, t) => (q(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this)), e(this, "startSafetyTimer", (e, t) => {
        this.player.debug.log(`Safety timer invoked from: ${t}`), this.safetyTimer = setTimeout(() => {
          this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
        }, e);
      }), e(this, "clearSafetyTimer", e => {
        I(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${e}`), clearTimeout(this.safetyTimer), this.safetyTimer = null);
      }), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
        container: null,
        displayContainer: null
      }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((e, t) => {
        this.on("loaded", e), this.on("error", t);
      }), this.load();
    }

    get enabled() {
      const {
        config: e
      } = this;
      return this.player.isHTML5 && this.player.isVideo && e.enabled && (!W(e.publisherId) || U(e.tagUrl));
    }

    get tagUrl() {
      const {
        config: e
      } = this;
      if (U(e.tagUrl)) return e.tagUrl;
      return `https://go.aniview.com/api/adserver6/vast/?${Ke({
        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
        AV_CHANNELID: "5a0458dc28a06145e4519d21",
        AV_URL: window.location.hostname,
        cb: Date.now(),
        AV_WIDTH: 640,
        AV_HEIGHT: 480,
        AV_CDIM2: e.publisherId
      })}`;
    }

  }

  const ft = e => {
    const t = [];
    return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(e => {
      const i = {};
      e.split(/\r\n|\n|\r/).forEach(e => {
        if ($(i.startTime)) {
          if (!W(e.trim()) && W(i.text)) {
            const t = e.trim().split("#xywh=");
            [i.text] = t, t[1] && ([i.x, i.y, i.w, i.h] = t[1].split(","));
          }
        } else {
          const t = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
          t && (i.startTime = 60 * Number(t[1] || 0) * 60 + 60 * Number(t[2]) + Number(t[3]) + Number(`0.${t[4]}`), i.endTime = 60 * Number(t[6] || 0) * 60 + 60 * Number(t[7]) + Number(t[8]) + Number(`0.${t[9]}`));
        }
      }), i.text && t.push(i);
    }), t;
  },
        bt = (e, t) => {
    const i = {};
    return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
  };

  class yt {
    constructor(t) {
      var _this5 = this;

      e(this, "load", () => {
        this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
          this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0);
        });
      }), e(this, "getThumbnails", () => new Promise(e => {
        const {
          src: t
        } = this.player.config.previewThumbnails;
        if (W(t)) throw new Error("Missing previewThumbnails.src config attribute");

        const i = () => {
          this.thumbnails.sort((e, t) => e.height - t.height), this.player.debug.log("Preview thumbnails", this.thumbnails), e();
        };

        if (j(t)) t(e => {
          this.thumbnails = e, i();
        });else {
          const e = (_(t) ? [t] : t).map(e => this.getThumbnail(e));
          Promise.all(e).then(i);
        }
      })), e(this, "getThumbnail", e => new Promise(t => {
        Re(e).then(i => {
          const s = {
            frames: ft(i),
            height: null,
            urlPrefix: ""
          };
          s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
          const n = new Image();
          n.onload = () => {
            s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push(s), t();
          }, n.src = s.urlPrefix + s.frames[0].text;
        });
      })), e(this, "startMove", e => {
        if (this.loaded && F(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
          if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);else {
            const t = this.player.elements.progress.getBoundingClientRect(),
                  i = 100 / t.width * (e.pageX - t.left);
            this.seekTime = this.player.media.duration * (i / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Ue(this.seekTime);
          }
          this.showImageAtCurrentTime();
        }
      }), e(this, "endMove", () => {
        this.toggleThumbContainer(!1, !0);
      }), e(this, "startScrubbing", e => {
        (I(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()));
      }), e(this, "endScrubbing", () => {
        this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : ye.call(this.player, this.player.media, "timeupdate", () => {
          this.mouseDown || this.toggleScrubbingContainer(!1);
        });
      }), e(this, "listeners", () => {
        this.player.on("play", () => {
          this.toggleThumbContainer(!1, !0);
        }), this.player.on("seeked", () => {
          this.toggleThumbContainer(!1);
        }), this.player.on("timeupdate", () => {
          this.lastTime = this.player.media.currentTime;
        });
      }), e(this, "render", () => {
        this.elements.thumb.container = Z("div", {
          class: this.player.config.classNames.previewThumbnails.thumbContainer
        }), this.elements.thumb.imageContainer = Z("div", {
          class: this.player.config.classNames.previewThumbnails.imageContainer
        }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
        const e = Z("div", {
          class: this.player.config.classNames.previewThumbnails.timeContainer
        });
        this.elements.thumb.time = Z("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), H(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = Z("div", {
          class: this.player.config.classNames.previewThumbnails.scrubbingContainer
        }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
      }), e(this, "destroy", () => {
        this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
      }), e(this, "showImageAtCurrentTime", () => {
        this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
        const e = this.thumbnails[0].frames.findIndex(e => this.seekTime >= e.startTime && this.seekTime <= e.endTime),
              t = e >= 0;
        let i = 0;
        this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach((t, s) => {
          this.loadedImages.includes(t.frames[e].text) && (i = s);
        }), e !== this.showingThumb && (this.showingThumb = e, this.loadImage(i)));
      }), e(this, "loadImage", function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        const t = _this5.showingThumb,
              i = _this5.thumbnails[e],
              {
          urlPrefix: s
        } = i,
              n = i.frames[t],
              a = i.frames[t].text,
              l = s + a;
        if (_this5.currentImageElement && _this5.currentImageElement.dataset.filename === a) _this5.showImage(_this5.currentImageElement, n, e, t, a, !1), _this5.currentImageElement.dataset.index = t, _this5.removeOldImages(_this5.currentImageElement);else {
          _this5.loadingImage && _this5.usingSprites && (_this5.loadingImage.onload = null);
          const i = new Image();
          i.src = l, i.dataset.index = t, i.dataset.filename = a, _this5.showingThumbFilename = a, _this5.player.debug.log(`Loading image: ${l}`), i.onload = () => _this5.showImage(i, n, e, t, a, !0), _this5.loadingImage = i, _this5.removeOldImages(i);
        }
      }), e(this, "showImage", function (e, t, i, s, n) {
        let a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !0;
        _this5.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${a}`), _this5.setImageSizeAndOffset(e, t), a && (_this5.currentImageContainer.appendChild(e), _this5.currentImageElement = e, _this5.loadedImages.includes(n) || _this5.loadedImages.push(n)), _this5.preloadNearby(s, !0).then(_this5.preloadNearby(s, !1)).then(_this5.getHigherQuality(i, e, t, n));
      }), e(this, "removeOldImages", e => {
        Array.from(this.currentImageContainer.children).forEach(t => {
          if ("img" !== t.tagName.toLowerCase()) return;
          const i = this.usingSprites ? 500 : 1e3;

          if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
            t.dataset.deleting = !0;
            const {
              currentImageContainer: e
            } = this;
            setTimeout(() => {
              e.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`);
            }, i);
          }
        });
      }), e(this, "preloadNearby", function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        return new Promise(i => {
          setTimeout(() => {
            const s = _this5.thumbnails[0].frames[e].text;

            if (_this5.showingThumbFilename === s) {
              let n;
              n = t ? _this5.thumbnails[0].frames.slice(e) : _this5.thumbnails[0].frames.slice(0, e).reverse();
              let a = !1;
              n.forEach(e => {
                const t = e.text;

                if (t !== s && !_this5.loadedImages.includes(t)) {
                  a = !0, _this5.player.debug.log(`Preloading thumb filename: ${t}`);
                  const {
                    urlPrefix: e
                  } = _this5.thumbnails[0],
                        s = e + t,
                        n = new Image();
                  n.src = s, n.onload = () => {
                    _this5.player.debug.log(`Preloaded thumb filename: ${t}`), _this5.loadedImages.includes(t) || _this5.loadedImages.push(t), i();
                  };
                }
              }), a || i();
            }
          }, 300);
        });
      }), e(this, "getHigherQuality", (e, t, i, s) => {
        if (e < this.thumbnails.length - 1) {
          let n = t.naturalHeight;
          this.usingSprites && (n = i.h), n < this.thumbContainerHeight && setTimeout(() => {
            this.showingThumbFilename === s && (this.player.debug.log(`Showing higher quality thumb for: ${s}`), this.loadImage(e + 1));
          }, 300);
        }
      }), e(this, "toggleThumbContainer", function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        const i = _this5.player.config.classNames.previewThumbnails.thumbContainerShown;
        _this5.elements.thumb.container.classList.toggle(i, e), !e && t && (_this5.showingThumb = null, _this5.showingThumbFilename = null);
      }), e(this, "toggleScrubbingContainer", function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        const t = _this5.player.config.classNames.previewThumbnails.scrubbingContainerShown;
        _this5.elements.scrubbing.container.classList.toggle(t, e), e || (_this5.showingThumb = null, _this5.showingThumbFilename = null);
      }), e(this, "determineContainerAutoSizing", () => {
        (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0);
      }), e(this, "setThumbContainerSizeAndPos", () => {
        if (this.sizeSpecifiedInCSS) {
          if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
            const e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
            this.elements.thumb.imageContainer.style.width = `${e}px`;
          } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
            const e = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
            this.elements.thumb.imageContainer.style.height = `${e}px`;
          }
        } else {
          const e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
          this.elements.thumb.imageContainer.style.height = `${this.thumbContainerHeight}px`, this.elements.thumb.imageContainer.style.width = `${e}px`;
        }

        this.setThumbContainerPos();
      }), e(this, "setThumbContainerPos", () => {
        const e = this.player.elements.progress.getBoundingClientRect(),
              t = this.player.elements.container.getBoundingClientRect(),
              {
          container: i
        } = this.elements.thumb,
              s = t.left - e.left + 10,
              n = t.right - e.left - i.clientWidth - 10;
        let a = this.mousePosX - e.left - i.clientWidth / 2;
        a < s && (a = s), a > n && (a = n), i.style.left = `${a}px`;
      }), e(this, "setScrubbingContainerSize", () => {
        const {
          width: e,
          height: t
        } = bt(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        this.elements.scrubbing.container.style.width = `${e}px`, this.elements.scrubbing.container.style.height = `${t}px`;
      }), e(this, "setImageSizeAndOffset", (e, t) => {
        if (!this.usingSprites) return;
        const i = this.thumbContainerHeight / t.h;
        e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = `-${t.x * i}px`, e.style.top = `-${t.y * i}px`;
      }), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
        thumb: {},
        scrubbing: {}
      }, this.load();
    }

    get enabled() {
      return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
    }

    get currentImageContainer() {
      return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
    }

    get usingSprites() {
      return Object.keys(this.thumbnails[0].frames[0]).includes("w");
    }

    get thumbAspectRatio() {
      return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
    }

    get thumbContainerHeight() {
      if (this.mouseDown) {
        const {
          height: e
        } = bt(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight
        });
        return e;
      }

      return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
    }

    get currentImageElement() {
      return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
    }

    set currentImageElement(e) {
      this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
    }

  }

  const vt = {
    insertElements(e, t) {
      _(t) ? ee(e, this.media, {
        src: t
      }) : q(t) && t.forEach(t => {
        ee(e, this.media, t);
      });
    },

    change(e) {
      Q(e, "sources.length") ? (Le.cancelRequests.call(this), this.destroy.call(this, () => {
        this.options.quality = [], te(this.media), this.media = null, H(this.elements.container) && this.elements.container.removeAttribute("class");
        const {
          sources: t,
          type: i
        } = e,
              [{
          provider: s = Ge.html5,
          src: n
        }] = t,
              a = "html5" === s ? i : "div",
              l = "html5" === s ? {} : {
          src: n
        };
        Object.assign(this, {
          provider: s,
          type: i,
          supported: me.check(i, s, this.config.playsinline),
          media: Z(a, l)
        }), this.elements.container.appendChild(this.media), O(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), W(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), at.addStyleHook.call(this), this.isHTML5 && vt.insertElements.call(this, "source", t), this.config.title = e.title, pt.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && vt.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && at.build.call(this), this.isHTML5 && this.media.load(), W(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))), this.fullscreen.update();
      }, !0)) : this.debug.warn("Invalid source format");
    }

  };

  class wt {
    constructor(t, i) {
      var _this6 = this;

      if (e(this, "play", () => j(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => ke(this.media.play())), this.media.play()) : null), e(this, "pause", () => this.playing && j(this.media.pause) ? this.media.pause() : null), e(this, "togglePlay", e => (O(e) ? e : !this.playing) ? this.play() : this.pause()), e(this, "stop", () => {
        this.isHTML5 ? (this.pause(), this.restart()) : j(this.media.stop) && this.media.stop();
      }), e(this, "restart", () => {
        this.currentTime = 0;
      }), e(this, "rewind", e => {
        this.currentTime -= $(e) ? e : this.config.seekTime;
      }), e(this, "forward", e => {
        this.currentTime += $(e) ? e : this.config.seekTime;
      }), e(this, "increaseVolume", e => {
        const t = this.media.muted ? 0 : this.volume;
        this.volume = t + ($(e) ? e : 0);
      }), e(this, "decreaseVolume", e => {
        this.increaseVolume(-e);
      }), e(this, "airplay", () => {
        me.airplay && this.media.webkitShowPlaybackTargetPicker();
      }), e(this, "toggleControls", e => {
        if (this.supported.ui && !this.isAudio) {
          const t = oe(this.elements.container, this.config.classNames.hideControls),
                i = void 0 === e ? void 0 : !e,
                s = le(this.elements.container, this.config.classNames.hideControls, i);

          if (s && q(this.config.controls) && this.config.controls.includes("settings") && !W(this.config.settings) && We.toggleMenu.call(this, !1), s !== t) {
            const e = s ? "controlshidden" : "controlsshown";
            ve.call(this, this.media, e);
          }

          return !s;
        }

        return !1;
      }), e(this, "on", (e, t) => {
        fe.call(this, this.elements.container, e, t);
      }), e(this, "once", (e, t) => {
        ye.call(this, this.elements.container, e, t);
      }), e(this, "off", (e, t) => {
        be(this.elements.container, e, t);
      }), e(this, "destroy", function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        if (!_this6.ready) return;

        const i = () => {
          document.body.style.overflow = "", _this6.embed = null, t ? (Object.keys(_this6.elements).length && (te(_this6.elements.buttons.play), te(_this6.elements.captions), te(_this6.elements.controls), te(_this6.elements.wrapper), _this6.elements.buttons.play = null, _this6.elements.captions = null, _this6.elements.controls = null, _this6.elements.wrapper = null), j(e) && e()) : (we.call(_this6), Le.cancelRequests.call(_this6), se(_this6.elements.original, _this6.elements.container), ve.call(_this6, _this6.elements.original, "destroyed", !0), j(e) && e.call(_this6.elements.original), _this6.ready = !1, setTimeout(() => {
            _this6.elements = null, _this6.media = null;
          }, 200));
        };

        _this6.stop(), clearTimeout(_this6.timers.loading), clearTimeout(_this6.timers.controls), clearTimeout(_this6.timers.resized), _this6.isHTML5 ? (at.toggleNativeControls.call(_this6, !0), i()) : _this6.isYouTube ? (clearInterval(_this6.timers.buffering), clearInterval(_this6.timers.playing), null !== _this6.embed && j(_this6.embed.destroy) && _this6.embed.destroy(), i()) : _this6.isVimeo && (null !== _this6.embed && _this6.embed.unload().then(i), setTimeout(i, 200));
      }), e(this, "supports", e => me.mime.call(this, e)), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = me.touch, this.media = t, _(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || D(this.media) || q(this.media)) && (this.media = this.media[0]), this.config = X({}, Qe, wt.defaults, i || {}, (() => {
        try {
          return JSON.parse(this.media.getAttribute("data-plyr-config"));
        } catch (e) {
          return {};
        }
      })()), this.elements = {
        container: null,
        fullscreen: null,
        captions: null,
        buttons: {},
        display: {},
        progress: {},
        inputs: {},
        settings: {
          popup: null,
          menu: null,
          panels: {},
          buttons: {}
        }
      }, this.captions = {
        active: null,
        currentTrack: -1,
        meta: new WeakMap()
      }, this.fullscreen = {
        active: !1
      }, this.options = {
        speed: [],
        quality: []
      }, this.debug = new it(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", me), I(this.media) || !H(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
      if (this.media.plyr) return void this.debug.warn("Target already setup");
      if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
      if (!me.check().api) return void this.debug.error("Setup failed: no support");
      const s = this.media.cloneNode(!0);
      s.autoplay = !1, this.elements.original = s;
      const n = this.media.tagName.toLowerCase();
      let a = null,
          l = null;

      switch (n) {
        case "div":
          if (a = this.media.querySelector("iframe"), H(a)) {
            if (l = ze(a.getAttribute("src")), this.provider = function (e) {
              return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Ge.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Ge.vimeo : null;
            }(l.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", l.search.length) {
              const e = ["1", "true"];
              e.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), e.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = e.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0;
            }
          } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);

          if (W(this.provider) || !Object.values(Ge).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
          this.type = et;
          break;

        case "video":
        case "audio":
          this.type = n, this.provider = Ge.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
          break;

        default:
          return void this.debug.error("Setup failed: unsupported type");
      }

      this.supported = me.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new lt(this), this.storage = new Fe(this), this.media.plyr = this, H(this.elements.container) || (this.elements.container = Z("div", {
        tabindex: 0
      }), J(this.media, this.elements.container)), at.migrateStyles.call(this), at.addStyleHook.call(this), pt.setup.call(this), this.config.debug && fe.call(this, this.elements.container, this.config.events.join(" "), e => {
        this.debug.log(`event: ${e.type}`);
      }), this.fullscreen = new st(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && at.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new gt(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => ke(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))) : this.debug.error("Setup failed: no support");
    }

    get isHTML5() {
      return this.provider === Ge.html5;
    }

    get isEmbed() {
      return this.isYouTube || this.isVimeo;
    }

    get isYouTube() {
      return this.provider === Ge.youtube;
    }

    get isVimeo() {
      return this.provider === Ge.vimeo;
    }

    get isVideo() {
      return this.type === et;
    }

    get isAudio() {
      return this.type === Ze;
    }

    get playing() {
      return Boolean(this.ready && !this.paused && !this.ended);
    }

    get paused() {
      return Boolean(this.media.paused);
    }

    get stopped() {
      return Boolean(this.paused && 0 === this.currentTime);
    }

    get ended() {
      return Boolean(this.media.ended);
    }

    set currentTime(e) {
      if (!this.duration) return;
      const t = $(e) && e > 0;
      this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`);
    }

    get currentTime() {
      return Number(this.media.currentTime);
    }

    get buffered() {
      const {
        buffered: e
      } = this.media;
      return $(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
    }

    get seeking() {
      return Boolean(this.media.seeking);
    }

    get duration() {
      const e = parseFloat(this.config.duration),
            t = (this.media || {}).duration,
            i = $(t) && t !== 1 / 0 ? t : 0;
      return e || i;
    }

    set volume(e) {
      let t = e;
      _(t) && (t = Number(t)), $(t) || (t = this.storage.get("volume")), $(t) || ({
        volume: t
      } = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !W(e) && this.muted && t > 0 && (this.muted = !1);
    }

    get volume() {
      return Number(this.media.volume);
    }

    set muted(e) {
      let t = e;
      O(t) || (t = this.storage.get("muted")), O(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
    }

    get muted() {
      return Boolean(this.media.muted);
    }

    get hasAudio() {
      return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
    }

    set speed(e) {
      let t = null;
      $(e) && (t = e), $(t) || (t = this.storage.get("speed")), $(t) || (t = this.config.speed.selected);
      const {
        minimumSpeed: i,
        maximumSpeed: s
      } = this;
      t = function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
        return Math.min(Math.max(e, t), i);
      }(t, i, s), this.config.speed.selected = t, setTimeout(() => {
        this.media && (this.media.playbackRate = t);
      }, 0);
    }

    get speed() {
      return Number(this.media.playbackRate);
    }

    get minimumSpeed() {
      return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625;
    }

    get maximumSpeed() {
      return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16;
    }

    set quality(e) {
      const t = this.config.quality,
            i = this.options.quality;
      if (!i.length) return;
      let s = [!W(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find($),
          n = !0;

      if (!i.includes(s)) {
        const e = Ae(i, s);
        this.debug.warn(`Unsupported quality option: ${s}, using ${e} instead`), s = e, n = !1;
      }

      t.selected = s, this.media.quality = s, n && this.storage.set({
        quality: s
      });
    }

    get quality() {
      return this.media.quality;
    }

    set loop(e) {
      const t = O(e) ? e : this.config.loop.active;
      this.config.loop.active = t, this.media.loop = t;
    }

    get loop() {
      return Boolean(this.media.loop);
    }

    set source(e) {
      vt.change.call(this, e);
    }

    get source() {
      return this.media.currentSrc;
    }

    get download() {
      const {
        download: e
      } = this.config.urls;
      return U(e) ? e : this.source;
    }

    set download(e) {
      U(e) && (this.config.urls.download = e, We.setDownloadUrl.call(this));
    }

    set poster(e) {
      this.isVideo ? at.setPoster.call(this, e, !1).catch(() => {}) : this.debug.warn("Poster can only be set for video");
    }

    get poster() {
      return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
    }

    get ratio() {
      if (!this.isVideo) return null;
      const e = Ne(xe.call(this));
      return q(e) ? e.join(":") : e;
    }

    set ratio(e) {
      this.isVideo ? _(e) && Pe(e) ? (this.config.ratio = Ne(e), Me.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video");
    }

    set autoplay(e) {
      const t = O(e) ? e : this.config.autoplay;
      this.config.autoplay = t;
    }

    get autoplay() {
      return Boolean(this.config.autoplay);
    }

    toggleCaptions(e) {
      Ye.toggle.call(this, e, !1);
    }

    set currentTrack(e) {
      Ye.set.call(this, e, !1), Ye.setup();
    }

    get currentTrack() {
      const {
        toggled: e,
        currentTrack: t
      } = this.captions;
      return e ? t : -1;
    }

    set language(e) {
      Ye.setLanguage.call(this, e, !1);
    }

    get language() {
      return (Ye.getCurrentTrack.call(this) || {}).language;
    }

    set pip(e) {
      if (!me.pip) return;
      const t = O(e) ? e : !this.pip;
      j(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Xe : Je), j(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
    }

    get pip() {
      return me.pip ? W(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Xe : null;
    }

    setPreviewThumbnails(e) {
      this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this));
    }

    static supported(e, t, i) {
      return me.check(e, t, i);
    }

    static loadSprite(e, t) {
      return Ve(e, t);
    }

    static setup(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let i = null;
      return _(e) ? i = Array.from(document.querySelectorAll(e)) : D(e) ? i = Array.from(e) : q(e) && (i = e.filter(H)), W(i) ? null : i.map(e => new wt(e, t));
    }

  }

  var Tt;
  return wt.defaults = (Tt = Qe, JSON.parse(JSON.stringify(Tt))), wt;
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/* harmony import */ var plyr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9792);
/* harmony import */ var plyr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plyr__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var ConceptSGMLibs = __webpack_require__(4558)["ConceptSGMLibs"];


ConceptSGMLibs.Plyr = (plyr__WEBPACK_IMPORTED_MODULE_0___default());
}();
/******/ })()
;