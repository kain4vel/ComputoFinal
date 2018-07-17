/*
 Highcharts JS v6.1.0 (2018-04-13)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (S, L) {
    "object" === typeof module && module.exports ? module.exports = S.document ? L(S) : L : S.Highcharts = L(S)
})("undefined" !== typeof window ? window : this, function (S) {
    var L = function () {
        var a = "undefined" === typeof S ? window : S,
            A = a.document,
            E = a.navigator && a.navigator.userAgent || "",
            D = A && A.createElementNS && !!A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            q = /(edge|msie|trident)/i.test(E) && !a.opera,
            f = -1 !== E.indexOf("Firefox"),
            d = -1 !== E.indexOf("Chrome"),
            n = f && 4 > parseInt(E.split("Firefox/")[1],
                10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "6.1.0",
            deg2rad: 2 * Math.PI / 360,
            doc: A,
            hasBidiBug: n,
            hasTouch: A && void 0 !== A.documentElement.ontouchstart,
            isMS: q,
            isWebKit: -1 !== E.indexOf("AppleWebKit"),
            isFirefox: f,
            isChrome: d,
            isSafari: !d && -1 !== E.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(E),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var A = a.charts,
            E = a.doc,
            D = a.win;
        a.error = function (q, f) {
            q = a.isNumber(q) ? "Highcharts error #" + q + ": www.highcharts.com/errors/" + q : q;
            if (f) throw Error(q);
            D.console && console.log(q)
        };
        a.Fx = function (a, f, d) {
            this.options = f;
            this.elem = a;
            this.prop = d
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    f = this.paths[1],
                    d = [],
                    n = this.now,
                    x = a.length,
                    t;
                if (1 === n) d = this.toD;
                else if (x === f.length && 1 > n)
                    for (; x--;) t = parseFloat(a[x]), d[x] = isNaN(t) ? f[x] : n * parseFloat(f[x] - t) + t;
                else d = f;
                this.elem.attr("d",
                    d, null, !0)
            },
            update: function () {
                var a = this.elem,
                    f = this.prop,
                    d = this.now,
                    n = this.options.step;
                if (this[f + "Setter"]) this[f + "Setter"]();
                else a.attr ? a.element && a.attr(f, d, null, !0) : a.style[f] = d + this.unit;
                n && n.call(a, d, this)
            },
            run: function (q, f, d) {
                var n = this,
                    x = n.options,
                    t = function (a) {
                        return t.stopped ? !1 : n.step(a)
                    },
                    k = D.requestAnimationFrame || function (a) {
                        setTimeout(a, 13)
                    },
                    c = function () {
                        for (var e = 0; e < a.timers.length; e++) a.timers[e]() || a.timers.splice(e--, 1);
                        a.timers.length && k(c)
                    };
                q !== f || this.elem["forceAnimate:" +
                    this.prop] ? (this.startTime = +new Date, this.start = q, this.end = f, this.unit = d, this.now = this.start, this.pos = 0, t.elem = this.elem, t.prop = this.prop, t() && 1 === a.timers.push(t) && k(c)) : (delete x.curAnim[this.prop], x.complete && 0 === a.keys(x.curAnim).length && x.complete.call(this.elem))
            },
            step: function (q) {
                var f = +new Date,
                    d, n = this.options,
                    x = this.elem,
                    t = n.complete,
                    k = n.duration,
                    c = n.curAnim;
                x.attr && !x.element ? q = !1 : q || f >= k + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), d = c[this.prop] = !0, a.objectEach(c, function (a) {
                    !0 !==
                        a && (d = !1)
                }), d && t && t.call(x), q = !1) : (this.pos = n.easing((f - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0);
                return q
            },
            initPath: function (q, f, d) {
                function n(a) {
                    var b, c;
                    for (g = a.length; g--;) b = "M" === a[g] || "L" === a[g], c = /[a-zA-Z]/.test(a[g + 3]), b && c && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
                }

                function x(a, b) {
                    for (; a.length < m;) {
                        a[0] = b[m - a.length];
                        var c = a.slice(0, u);
                        [].splice.apply(a, [0, 0].concat(c));
                        r && (c = a.slice(a.length - u), [].splice.apply(a, [a.length, 0].concat(c)), g--)
                    }
                    a[0] =
                        "M"
                }

                function t(a, c) {
                    for (var g = (m - a.length) / u; 0 < g && g--;) b = a.slice().splice(a.length / F - u, u * F), b[0] = c[m - u - g * u], y && (b[u - 6] = b[u - 2], b[u - 5] = b[u - 1]), [].splice.apply(a, [a.length / F, 0].concat(b)), r && g--
                }
                f = f || "";
                var k, c = q.startX,
                    e = q.endX,
                    y = -1 < f.indexOf("C"),
                    u = y ? 7 : 3,
                    m, b, g;
                f = f.split(" ");
                d = d.slice();
                var r = q.isArea,
                    F = r ? 2 : 1,
                    J;
                y && (n(f), n(d));
                if (c && e) {
                    for (g = 0; g < c.length; g++)
                        if (c[g] === e[0]) {
                            k = g;
                            break
                        } else if (c[0] === e[e.length - c.length + g]) {
                        k = g;
                        J = !0;
                        break
                    }
                    void 0 === k && (f = [])
                }
                f.length && a.isNumber(k) && (m = d.length + k * F * u,
                    J ? (x(f, d), t(d, f)) : (x(d, f), t(f, d)));
                return [f, d]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.merge = function () {
            var q, f = arguments,
                d, n = {},
                x = function (d, k) {
                    "object" !== typeof d && (d = {});
                    a.objectEach(k, function (c, e) {
                        !a.isObject(c, !0) || a.isClass(c) || a.isDOMElement(c) ? d[e] = k[e] : d[e] = x(d[e] || {}, c)
                    });
                    return d
                };
            !0 === f[0] && (n = f[1], f = Array.prototype.slice.call(f, 2));
            d = f.length;
            for (q = 0; q < d; q++) n = x(n,
                f[q]);
            return n
        };
        a.pInt = function (a, f) {
            return parseInt(a, f || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (q, f) {
            return !!q && "object" === typeof q && (!f || !a.isArray(q))
        };
        a.isDOMElement = function (q) {
            return a.isObject(q) && "number" === typeof q.nodeType
        };
        a.isClass = function (q) {
            var f = q && q.constructor;
            return !(!a.isObject(q, !0) || a.isDOMElement(q) || !f || !f.name || "Object" ===
                f.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, f) {
            for (var d = a.length; d--;)
                if (a[d] === f) {
                    a.splice(d, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (q, f, d) {
            var n;
            a.isString(f) ? a.defined(d) ? q.setAttribute(f, d) : q && q.getAttribute && ((n = q.getAttribute(f)) || "class" !== f || (n = q.getAttribute(f + "Name"))) : a.defined(f) && a.isObject(f) && a.objectEach(f, function (a, d) {
                q.setAttribute(d, a)
            });
            return n
        };
        a.splat = function (q) {
            return a.isArray(q) ?
                q : [q]
        };
        a.syncTimeout = function (a, f, d) {
            if (f) return setTimeout(a, f, d);
            a.call(0, d)
        };
        a.clearTimeout = function (q) {
            a.defined(q) && clearTimeout(q)
        };
        a.extend = function (a, f) {
            var d;
            a || (a = {});
            for (d in f) a[d] = f[d];
            return a
        };
        a.pick = function () {
            var a = arguments,
                f, d, n = a.length;
            for (f = 0; f < n; f++)
                if (d = a[f], void 0 !== d && null !== d) return d
        };
        a.css = function (q, f) {
            a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter = "alpha(opacity\x3d" + 100 * f.opacity + ")");
            a.extend(q.style, f)
        };
        a.createElement = function (q, f, d, n, x) {
            q = E.createElement(q);
            var t =
                a.css;
            f && a.extend(q, f);
            x && t(q, {
                padding: 0,
                border: "none",
                margin: 0
            });
            d && t(q, d);
            n && n.appendChild(q);
            return q
        };
        a.extendClass = function (q, f) {
            var d = function () {};
            d.prototype = new q;
            a.extend(d.prototype, f);
            return d
        };
        a.pad = function (a, f, d) {
            return Array((f || 2) + 1 - String(a).replace("-", "").length).join(d || 0) + a
        };
        a.relativeLength = function (a, f, d) {
            return /%$/.test(a) ? f * parseFloat(a) / 100 + (d || 0) : parseFloat(a)
        };
        a.wrap = function (a, f, d) {
            var n = a[f];
            a[f] = function () {
                var a = Array.prototype.slice.call(arguments),
                    f = arguments,
                    k = this;
                k.proceed = function () {
                    n.apply(k, arguments.length ? arguments : f)
                };
                a.unshift(n);
                a = d.apply(this, a);
                k.proceed = null;
                return a
            }
        };
        a.formatSingle = function (q, f, d) {
            var n = /\.([0-9])/,
                x = a.defaultOptions.lang;
            /f$/.test(q) ? (d = (d = q.match(n)) ? d[1] : -1, null !== f && (f = a.numberFormat(f, d, x.decimalPoint, -1 < q.indexOf(",") ? x.thousandsSep : ""))) : f = (d || a.time).dateFormat(q, f);
            return f
        };
        a.format = function (q, f, d) {
            for (var n = "{", x = !1, t, k, c, e, y = [], u; q;) {
                n = q.indexOf(n);
                if (-1 === n) break;
                t = q.slice(0, n);
                if (x) {
                    t = t.split(":");
                    k = t.shift().split(".");
                    e = k.length;
                    u = f;
                    for (c = 0; c < e; c++) u && (u = u[k[c]]);
                    t.length && (u = a.formatSingle(t.join(":"), u, d));
                    y.push(u)
                } else y.push(t);
                q = q.slice(n + 1);
                n = (x = !x) ? "}" : "{"
            }
            y.push(q);
            return y.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (q, f, d, n, x) {
            var t, k = q;
            d = a.pick(d, 1);
            t = q / d;
            f || (f = x ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === n && (1 === d ? f = a.grep(f, function (a) {
                return 0 === a % 1
            }) : .1 >= d && (f = [1 / d])));
            for (n = 0; n < f.length && !(k = f[n], x && k * d >= q ||
                    !x && t <= (f[n] + (f[n + 1] || f[n])) / 2); n++);
            return k = a.correctFloat(k * d, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, f) {
            var d = a.length,
                n, x;
            for (x = 0; x < d; x++) a[x].safeI = x;
            a.sort(function (a, d) {
                n = f(a, d);
                return 0 === n ? a.safeI - d.safeI : n
            });
            for (x = 0; x < d; x++) delete a[x].safeI
        };
        a.arrayMin = function (a) {
            for (var f = a.length, d = a[0]; f--;) a[f] < d && (d = a[f]);
            return d
        };
        a.arrayMax = function (a) {
            for (var f = a.length, d = a[0]; f--;) a[f] > d && (d = a[f]);
            return d
        };
        a.destroyObjectProperties = function (q, f) {
            a.objectEach(q, function (a,
                n) {
                a && a !== f && a.destroy && a.destroy();
                delete q[n]
            })
        };
        a.discardElement = function (q) {
            var f = a.garbageBin;
            f || (f = a.createElement("div"));
            q && f.appendChild(q);
            f.innerHTML = ""
        };
        a.correctFloat = function (a, f) {
            return parseFloat(a.toPrecision(f || 14))
        };
        a.setAnimation = function (q, f) {
            f.renderer.globalAnimation = a.pick(q, f.options.chart.animation, !0)
        };
        a.animObject = function (q) {
            return a.isObject(q) ? a.merge(q) : {
                duration: q ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (q, f, d, n) {
            q = +q || 0;
            f = +f;
            var x = a.defaultOptions.lang,
                t = (q.toString().split(".")[1] || "").split("e")[0].length,
                k, c, e = q.toString().split("e"); - 1 === f ? f = Math.min(t, 20) : a.isNumber(f) ? f && e[1] && 0 > e[1] && (k = f + +e[1], 0 <= k ? (e[0] = (+e[0]).toExponential(k).split("e")[0], f = k) : (e[0] = e[0].split(".")[0] || 0, q = 20 > f ? (e[0] * Math.pow(10, e[1])).toFixed(f) : 0, e[1] = 0)) : f = 2;
            c = (Math.abs(e[1] ? e[0] : q) + Math.pow(10, -Math.max(f, t) - 1)).toFixed(f);
            t = String(a.pInt(c));
            k = 3 < t.length ? t.length % 3 : 0;
            d = a.pick(d,
                x.decimalPoint);
            n = a.pick(n, x.thousandsSep);
            q = (0 > q ? "-" : "") + (k ? t.substr(0, k) + n : "");
            q += t.substr(k).replace(/(\d{3})(?=\d)/g, "$1" + n);
            f && (q += d + c.slice(-f));
            e[1] && 0 !== +q && (q += "e" + e[1]);
            return q
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (q, f, d) {
            if ("width" === f) return Math.min(q.offsetWidth, q.scrollWidth) - a.getStyle(q, "padding-left") - a.getStyle(q, "padding-right");
            if ("height" === f) return Math.min(q.offsetHeight, q.scrollHeight) - a.getStyle(q, "padding-top") - a.getStyle(q,
                "padding-bottom");
            D.getComputedStyle || a.error(27, !0);
            if (q = D.getComputedStyle(q, void 0)) q = q.getPropertyValue(f), a.pick(d, "opacity" !== f) && (q = a.pInt(q));
            return q
        };
        a.inArray = function (q, f, d) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(f, q, d)
        };
        a.grep = function (q, f) {
            return (a.filterPolyfill || Array.prototype.filter).call(q, f)
        };
        a.find = Array.prototype.find ? function (a, f) {
            return a.find(f)
        } : function (a, f) {
            var d, n = a.length;
            for (d = 0; d < n; d++)
                if (f(a[d], d)) return a[d]
        };
        a.some = function (q, f, d) {
            return (a.somePolyfill ||
                Array.prototype.some).call(q, f, d)
        };
        a.map = function (a, f) {
            for (var d = [], n = 0, x = a.length; n < x; n++) d[n] = f.call(a[n], a[n], n, a);
            return d
        };
        a.keys = function (q) {
            return (a.keysPolyfill || Object.keys).call(void 0, q)
        };
        a.reduce = function (q, f, d) {
            return (a.reducePolyfill || Array.prototype.reduce).call(q, f, d)
        };
        a.offset = function (a) {
            var f = E.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (D.pageYOffset || f.scrollTop) - (f.clientTop || 0),
                left: a.left + (D.pageXOffset || f.scrollLeft) - (f.clientLeft ||
                    0)
            }
        };
        a.stop = function (q, f) {
            for (var d = a.timers.length; d--;) a.timers[d].elem !== q || f && f !== a.timers[d].prop || (a.timers[d].stopped = !0)
        };
        a.each = function (q, f, d) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(q, f, d)
        };
        a.objectEach = function (a, f, d) {
            for (var n in a) a.hasOwnProperty(n) && f.call(d || a[n], a[n], n, a)
        };
        a.addEvent = function (q, f, d) {
            var n, x = q.addEventListener || a.addEventListenerPolyfill;
            n = "function" === typeof q && q.prototype ? q.prototype.protoEvents = q.prototype.protoEvents || {} : q.hcEvents = q.hcEvents || {};
            x && x.call(q, f, d, !1);
            n[f] || (n[f] = []);
            n[f].push(d);
            return function () {
                a.removeEvent(q, f, d)
            }
        };
        a.removeEvent = function (q, f, d) {
            function n(c, e) {
                var d = q.removeEventListener || a.removeEventListenerPolyfill;
                d && d.call(q, c, e, !1)
            }

            function x(c) {
                var e, d;
                q.nodeName && (f ? (e = {}, e[f] = !0) : e = c, a.objectEach(e, function (a, e) {
                    if (c[e])
                        for (d = c[e].length; d--;) n(e, c[e][d])
                }))
            }
            var t, k;
            a.each(["protoEvents", "hcEvents"], function (c) {
                var e = q[c];
                e && (f ? (t = e[f] || [], d ? (k = a.inArray(d, t), -1 < k && (t.splice(k, 1), e[f] = t), n(f, d)) : (x(e), e[f] = [])) : (x(e), q[c] = {}))
            })
        };
        a.fireEvent = function (q, f, d, n) {
            var x, t, k, c, e;
            d = d || {};
            E.createEvent && (q.dispatchEvent || q.fireEvent) ? (x = E.createEvent("Events"), x.initEvent(f, !0, !0), a.extend(x, d), q.dispatchEvent ? q.dispatchEvent(x) : q.fireEvent(f, x)) : a.each(["protoEvents", "hcEvents"], function (y) {
                if (q[y])
                    for (t = q[y][f] || [], k = t.length, d.target || a.extend(d, {
                            preventDefault: function () {
                                d.defaultPrevented = !0
                            },
                            target: q,
                            type: f
                        }), c = 0; c < k; c++)(e = t[c]) && !1 === e.call(q, d) && d.preventDefault()
            });
            n && !d.defaultPrevented && n.call(q,
                d)
        };
        a.animate = function (q, f, d) {
            var n, x = "",
                t, k, c;
            a.isObject(d) || (c = arguments, d = {
                duration: c[2],
                easing: c[3],
                complete: c[4]
            });
            a.isNumber(d.duration) || (d.duration = 400);
            d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine;
            d.curAnim = a.merge(f);
            a.objectEach(f, function (c, y) {
                a.stop(q, y);
                k = new a.Fx(q, d, y);
                t = null;
                "d" === y ? (k.paths = k.initPath(q, q.d, f.d), k.toD = f.d, n = 0, t = 1) : q.attr ? n = q.attr(y) : (n = parseFloat(a.getStyle(q, y)) || 0, "opacity" !== y && (x = "px"));
                t || (t = c);
                t && t.match && t.match("px") &&
                    (t = t.replace(/px/g, ""));
                k.run(n, t, x)
            })
        };
        a.seriesType = function (q, f, d, n, x) {
            var t = a.getOptions(),
                k = a.seriesTypes;
            t.plotOptions[q] = a.merge(t.plotOptions[f], d);
            k[q] = a.extendClass(k[f] || function () {}, n);
            k[q].prototype.type = q;
            x && (k[q].prototype.pointClass = a.extendClass(a.Point, x));
            return k[q]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9),
                f = 0;
            return function () {
                return "highcharts-" + a + "-" + f++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function () {
            var q = [].slice.call(arguments);
            if (this[0]) return q[0] ?
                (new(a[a.isString(q[0]) ? q.shift() : "Chart"])(this[0], q[0], q[1]), this) : A[a.attr(this[0], "data-highcharts-chart")]
        })
    })(L);
    (function (a) {
        var A = a.each,
            E = a.isNumber,
            D = a.map,
            q = a.merge,
            f = a.pInt;
        a.Color = function (d) {
            if (!(this instanceof a.Color)) return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [f(a[1]), f(a[2]), f(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [f(a[1]), f(a[2]), f(a[3]), 1]
                }
            }],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
            },
            init: function (d) {
                var f, x, t, k;
                if ((this.input = d = this.names[d && d.toLowerCase ? d.toLowerCase() : ""] || d) && d.stops) this.stops = D(d.stops, function (c) {
                    return new a.Color(c[1])
                });
                else if (d && d.charAt && "#" === d.charAt() && (f = d.length, d = parseInt(d.substr(1), 16), 7 === f ? x = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1] : 4 === f && (x = [(d & 3840) >> 4 | (d & 3840) >> 8, (d & 240) >> 4 | d & 240, (d & 15) << 4 | d & 15, 1])), !x)
                    for (t = this.parsers.length; t-- &&
                        !x;) k = this.parsers[t], (f = k.regex.exec(d)) && (x = k.parse(f));
                this.rgba = x || []
            },
            get: function (a) {
                var d = this.input,
                    f = this.rgba,
                    t;
                this.stops ? (t = q(d), t.stops = [].concat(t.stops), A(this.stops, function (d, c) {
                    t.stops[c] = [t.stops[c][0], d.get(a)]
                })) : t = f && E(f[0]) ? "rgb" === a || !a && 1 === f[3] ? "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")" : "a" === a ? f[3] : "rgba(" + f.join(",") + ")" : d;
                return t
            },
            brighten: function (a) {
                var d, x = this.rgba;
                if (this.stops) A(this.stops, function (d) {
                    d.brighten(a)
                });
                else if (E(a) && 0 !== a)
                    for (d = 0; 3 > d; d++) x[d] += f(255 * a), 0 >
                        x[d] && (x[d] = 0), 255 < x[d] && (x[d] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function (a, f) {
                var d = this.rgba,
                    t = a.rgba;
                t.length && d && d.length ? (a = 1 !== t[3] || 1 !== d[3], f = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (d[0] - t[0]) * (1 - f)) + "," + Math.round(t[1] + (d[1] - t[1]) * (1 - f)) + "," + Math.round(t[2] + (d[2] - t[2]) * (1 - f)) + (a ? "," + (t[3] + (d[3] - t[3]) * (1 - f)) : "") + ")") : f = a.input || "none";
                return f
            }
        };
        a.color = function (d) {
            return new a.Color(d)
        }
    })(L);
    (function (a) {
        var A, E, D = a.addEvent,
            q = a.animate,
            f = a.attr,
            d = a.charts,
            n = a.color,
            x = a.css,
            t = a.createElement,
            k = a.defined,
            c = a.deg2rad,
            e = a.destroyObjectProperties,
            y = a.doc,
            u = a.each,
            m = a.extend,
            b = a.erase,
            g = a.grep,
            r = a.hasTouch,
            F = a.inArray,
            J = a.isArray,
            v = a.isFirefox,
            H = a.isMS,
            w = a.isObject,
            p = a.isString,
            C = a.isWebKit,
            B = a.merge,
            G = a.noop,
            M = a.objectEach,
            h = a.pick,
            z = a.pInt,
            K = a.removeEvent,
            l = a.splat,
            I = a.stop,
            T = a.svg,
            Q = a.SVG_NS,
            O = a.symbolSizes,
            P = a.win;
        A = a.SVGElement = function () {
            return this
        };
        m(A.prototype, {
            opacity: 1,
            SVG_NS: Q,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, b) {
                this.element = "span" === b ? t(b) : y.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (b, l, c) {
                l = a.animObject(h(l, this.renderer.globalAnimation, !0));
                0 !== l.duration ? (c && (l.complete = c), q(this, b, l)) : (this.attr(b, null, c), l.step && l.step.call(this));
                return this
            },
            complexColor: function (b, h, l) {
                var c = this.renderer,
                    N, z, g, e, p, m, r, d, I, K, v, C = [],
                    w;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    b.radialGradient ? z = "radialGradient" : b.linearGradient && (z = "linearGradient");
                    z && (g = b[z], p = c.gradients, r = b.stops, K = l.radialReference, J(g) && (b[z] = g = {
                        x1: g[0],
                        y1: g[1],
                        x2: g[2],
                        y2: g[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === z && K && !k(g.gradientUnits) && (e = g, g = B(g, c.getRadialAttr(K, e), {
                        gradientUnits: "userSpaceOnUse"
                    })), M(g, function (a, b) {
                        "id" !== b && C.push(b, a)
                    }), M(r, function (a) {
                        C.push(a)
                    }), C = C.join(","), p[C] ? v = p[C].attr("id") : (g.id = v = a.uniqueKey(), p[C] = m = c.createElement(z).attr(g).add(c.defs), m.radAttr = e, m.stops = [], u(r, function (b) {
                        0 === b[1].indexOf("rgba") ? (N = a.color(b[1]),
                            d = N.get("rgb"), I = N.get("a")) : (d = b[1], I = 1);
                        b = c.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": d,
                            "stop-opacity": I
                        }).add(m);
                        m.stops.push(b)
                    })), w = "url(" + c.url + "#" + v + ")", l.setAttribute(h, w), l.gradient = C, b.toString = function () {
                        return w
                    })
                })
            },
            applyTextOutline: function (h) {
                var l = this.element,
                    c, z, N, g, e; - 1 !== h.indexOf("contrast") && (h = h.replace(/contrast/g, this.renderer.getContrast(l.style.fill)));
                h = h.split(" ");
                z = h[h.length - 1];
                if ((N = h[0]) && "none" !== N && a.svg) {
                    this.fakeTS = !0;
                    h = [].slice.call(l.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    N = N.replace(/(^[\d\.]+)(.*?)$/g, function (a, b, h) {
                        return 2 * b + h
                    });
                    for (e = h.length; e--;) c = h[e], "highcharts-text-outline" === c.getAttribute("class") && b(h, l.removeChild(c));
                    g = l.firstChild;
                    u(h, function (a, b) {
                        0 === b && (a.setAttribute("x", l.getAttribute("x")), b = l.getAttribute("y"), a.setAttribute("y", b || 0), null === b && l.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        f(a, {
                            "class": "highcharts-text-outline",
                            fill: z,
                            stroke: z,
                            "stroke-width": N,
                            "stroke-linejoin": "round"
                        });
                        l.insertBefore(a, g)
                    })
                }
            },
            attr: function (a,
                b, h, l) {
                var c, z = this.element,
                    N, g = this,
                    e, p;
                "string" === typeof a && void 0 !== b && (c = a, a = {}, a[c] = b);
                "string" === typeof a ? g = (this[a + "Getter"] || this._defaultGetter).call(this, a, z) : (M(a, function (b, h) {
                    e = !1;
                    l || I(this, h);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h) && (N || (this.symbolAttr(a), N = !0), e = !0);
                    !this.rotation || "x" !== h && "y" !== h || (this.doTransform = !0);
                    e || (p = this[h + "Setter"] || this._defaultSetter, p.call(this, b, h, z))
                }, this), this.afterSetters());
                h && h.call(this);
                return g
            },
            afterSetters: function () {
                this.doTransform &&
                    (this.updateTransform(), this.doTransform = !1)
            },
            addClass: function (a, b) {
                var h = this.attr("class") || ""; - 1 === h.indexOf(a) && (b || (a = (h + (h ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== F(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var b = this;
                u("x y r start end width height innerR anchorX anchorY".split(" "), function (l) {
                    b[l] = h(a[l], b[l])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x,
                        b.y, b.width, b.height, b)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var h;
                b = b || a.strokeWidth || 0;
                h = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + h;
                a.y = Math.floor(a.y || this.y || 0) + h;
                a.width = Math.floor((a.width || this.width || 0) - 2 * h);
                a.height = Math.floor((a.height || this.height || 0) - 2 * h);
                k(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function (a) {
                var b = this.styles,
                    h = {},
                    l = this.element,
                    c, g = "",
                    e, N = !b,
                    p = ["textOutline", "textOverflow",
                        "width"
                    ];
                a && a.color && (a.fill = a.color);
                b && M(a, function (a, l) {
                    a !== b[l] && (h[l] = a, N = !0)
                });
                N && (b && (a = m(b, h)), c = this.textWidth = a && a.width && "auto" !== a.width && "text" === l.nodeName.toLowerCase() && z(a.width), this.styles = a, c && !T && this.renderer.forExport && delete a.width, l.namespaceURI === this.SVG_NS ? (e = function (a, b) {
                    return "-" + b.toLowerCase()
                }, M(a, function (a, b) {
                    -1 === F(b, p) && (g += b.replace(/([A-Z])/g, e) + ":" + a + ";")
                }), g && f(l, "style", g)) : x(l, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                    a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function (a) {
                return P.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function () {
                var a = this.getStyle("stroke-width"),
                    b;
                a.indexOf("px") === a.length - 2 ? a = z(a) : (b = y.createElementNS(Q, "rect"), f(b, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(b), a = b.getBBox().width, b.parentNode.removeChild(b));
                return a
            },
            on: function (a, b) {
                var h = this,
                    l = h.element;
                r && "click" === a ? (l.ontouchstart = function (a) {
                    h.touchEventFired =
                        Date.now();
                    a.preventDefault();
                    b.call(l, a)
                }, l.onclick = function (a) {
                    (-1 === P.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (h.touchEventFired || 0)) && b.call(l, a)
                }) : l["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    l = this.scaleX,
                    c = this.scaleY,
                    z = this.inverted,
                    g = this.rotation,
                    e = this.matrix,
                    p = this.element;
                z && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                k(e) && a.push("matrix(" + e.join(",") + ")");
                z ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + h(this.rotationOriginX, p.getAttribute("x"), 0) + " " + h(this.rotationOriginY, p.getAttribute("y") || 0) + ")");
                (k(l) || k(c)) && a.push("scale(" + h(l, 1) + " " + h(c, 1) + ")");
                a.length &&
                    p.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, l, c) {
                var z, g, e, m, N = {};
                g = this.renderer;
                e = g.alignedObjects;
                var r, d;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = l, !c || p(c)) this.alignTo = z = c || "renderer", b(e, this), e.push(this), c = null
                } else a = this.alignOptions, l = this.alignByTranslate, z = this.alignTo;
                c = h(c, g[z], g);
                z = a.align;
                g = a.verticalAlign;
                e = (c.x || 0) + (a.x || 0);
                m = (c.y || 0) + (a.y || 0);
                "right" === z ? r = 1 : "center" === z && (r =
                    2);
                r && (e += (c.width - (a.width || 0)) / r);
                N[l ? "translateX" : "x"] = Math.round(e);
                "bottom" === g ? d = 1 : "middle" === g && (d = 2);
                d && (m += (c.height - (a.height || 0)) / d);
                N[l ? "translateY" : "y"] = Math.round(m);
                this[this.placed ? "animate" : "attr"](N);
                this.placed = !0;
                this.alignAttr = N;
                return this
            },
            getBBox: function (a, b) {
                var l, z = this.renderer,
                    g, e = this.element,
                    p = this.styles,
                    N, r = this.textStr,
                    d, B = z.cache,
                    I = z.cacheKeys,
                    K;
                b = h(b, this.rotation);
                g = b * c;
                N = e && A.prototype.getStyle.call(e, "font-size");
                k(r) && (K = r.toString(), -1 === K.indexOf("\x3c") &&
                    (K = K.replace(/[0-9]/g, "0")), K += ["", b || 0, N, this.textWidth, p && p.textOverflow].join());
                K && !a && (l = B[K]);
                if (!l) {
                    if (e.namespaceURI === this.SVG_NS || z.forExport) {
                        try {
                            (d = this.fakeTS && function (a) {
                                u(e.querySelectorAll(".highcharts-text-outline"), function (b) {
                                    b.style.display = a
                                })
                            }) && d("none"), l = e.getBBox ? m({}, e.getBBox()) : {
                                width: e.offsetWidth,
                                height: e.offsetHeight
                            }, d && d("")
                        } catch (V) {}
                        if (!l || 0 > l.width) l = {
                            width: 0,
                            height: 0
                        }
                    } else l = this.htmlGetBBox();
                    z.isSVG && (a = l.width, z = l.height, p && "11px" === p.fontSize && 17 === Math.round(z) &&
                        (l.height = z = 14), b && (l.width = Math.abs(z * Math.sin(g)) + Math.abs(a * Math.cos(g)), l.height = Math.abs(z * Math.cos(g)) + Math.abs(a * Math.sin(g))));
                    if (K && 0 < l.height) {
                        for (; 250 < I.length;) delete B[I.shift()];
                        B[K] || I.push(K);
                        B[K] = l
                    }
                }
                return l
            },
            show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var b = this.renderer,
                    h = this.element,
                    l;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) l = this.zIndexSetter();
                l || (a ? a.element : b.box).appendChild(h);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function () {
                var a = this,
                    h = a.element || {},
                    l = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup,
                    c = h.ownerSVGElement,
                    z = a.clipPath;
                h.onclick = h.onmouseout = h.onmouseover = h.onmousemove =
                    h.point = null;
                I(a);
                z && c && (u(c.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                    var b = a.getAttribute("clip-path"),
                        h = z.element.id;
                    (-1 < b.indexOf("(#" + h + ")") || -1 < b.indexOf('("#' + h + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = z.destroy());
                if (a.stops) {
                    for (c = 0; c < a.stops.length; c++) a.stops[c] = a.stops[c].destroy();
                    a.stops = null
                }
                for (a.safeRemoveChild(h); l && l.div && 0 === l.div.childNodes.length;) h = l.parentGroup, a.safeRemoveChild(l.div), delete l.div, l = h;
                a.alignTo && b(a.renderer.alignedObjects, a);
                M(a,
                    function (b, h) {
                        delete a[h]
                    });
                return null
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = h(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, h) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (h.setAttribute(b, a), this[b] = a)
            },
            alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function (a, b, h) {
                this[b] = a;
                h.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = y.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(y.createTextNode(String(h(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added &&
                    this.renderer.buildText(this))
            },
            fillSetter: function (a, b, h) {
                "string" === typeof a ? h.setAttribute(b, a) : a && this.complexColor(a, b, h)
            },
            visibilitySetter: function (a, b, h) {
                "inherit" === a ? h.removeAttribute(b) : this[b] !== a && h.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function (a, b) {
                var h = this.renderer,
                    l = this.parentGroup,
                    c = (l || h).element || h.box,
                    g, e = this.element,
                    p, m, h = c === h.box;
                g = this.added;
                var d;
                k(a) && (e.zIndex = a, a = +a, this[b] === a && (g = !1), this[b] = a);
                if (g) {
                    (a = this.zIndex) && l && (l.handleZ = !0);
                    b = c.childNodes;
                    for (d = b.length -
                        1; 0 <= d && !p; d--)
                        if (l = b[d], g = l.zIndex, m = !k(g), l !== e)
                            if (0 > a && m && !h && !d) c.insertBefore(e, b[d]), p = !0;
                            else if (z(g) <= a || m && (!k(a) || 0 <= a)) c.insertBefore(e, b[d + 1] || null), p = !0;
                    p || (c.insertBefore(e, b[h ? 3 : 0] || null), p = !0)
                }
                return p
            },
            _defaultSetter: function (a, b, h) {
                h.setAttribute(b, a)
            }
        });
        A.prototype.yGetter = A.prototype.xGetter;
        A.prototype.translateXSetter = A.prototype.translateYSetter = A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.rotationOriginXSetter = A.prototype.rotationOriginYSetter = A.prototype.scaleXSetter =
            A.prototype.scaleYSetter = A.prototype.matrixSetter = function (a, b) {
                this[b] = a;
                this.doTransform = !0
            };
        E = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        m(E.prototype, {
            Element: A,
            SVG_NS: Q,
            init: function (a, b, h, l, c, z) {
                var g;
                l = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                g = l.element;
                a.appendChild(g);
                f(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && f(g, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = g;
                this.boxWrapper = l;
                this.alignedObjects = [];
                this.url = (v || C) && y.getElementsByTagName("base").length ?
                    P.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 6.1.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = z;
                this.forExport = c;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, h, !1);
                var e;
                v && a.getBoundingClientRect && (b = function () {
                    x(a, {
                        left: 0,
                        top: 0
                    });
                    e = a.getBoundingClientRect();
                    x(a, {
                        left: Math.ceil(e.left) -
                            e.left + "px",
                        top: Math.ceil(e.top) - e.top + "px"
                    })
                }, b(), this.unSubPixelFix = D(P, "resize", b))
            },
            definition: function (a) {
                function b(a, c) {
                    var z;
                    u(l(a), function (a) {
                        var l = h.createElement(a.tagName),
                            g = {};
                        M(a, function (a, b) {
                            "tagName" !== b && "children" !== b && "textContent" !== b && (g[b] = a)
                        });
                        l.attr(g);
                        l.add(c || h.defs);
                        a.textContent && l.element.appendChild(y.createTextNode(a.textContent));
                        b(a.children || [], l);
                        z = l
                    });
                    return z
                }
                var h = this;
                return b(a)
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a =
                    this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                e(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: G,
            getRadialAttr: function (a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            getSpanWidth: function (a) {
                return a.getBBox(!0).width
            },
            applyEllipsis: function (a, b, h, l) {
                var c = a.rotation,
                    z = h,
                    g, e = 0,
                    p =
                    h.length,
                    m = function (a) {
                        b.removeChild(b.firstChild);
                        a && b.appendChild(y.createTextNode(a))
                    },
                    d;
                a.rotation = 0;
                z = this.getSpanWidth(a, b);
                if (d = z > l) {
                    for (; e <= p;) g = Math.ceil((e + p) / 2), z = h.substring(0, g) + "\u2026", m(z), z = this.getSpanWidth(a, b), e === p ? e = p + 1 : z > l ? p = g - 1 : e = g;
                    0 === p && m("")
                }
                a.rotation = c;
                return d
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function (a) {
                var b = a.element,
                    l = this,
                    c = l.forExport,
                    e = h(a.textStr, "").toString(),
                    p = -1 !== e.indexOf("\x3c"),
                    m = b.childNodes,
                    d, r = f(b, "x"),
                    B = a.styles,
                    I = a.textWidth,
                    k = B && B.lineHeight,
                    K = B && B.textOutline,
                    C = B && "ellipsis" === B.textOverflow,
                    v = B && "nowrap" === B.whiteSpace,
                    w, G = m.length,
                    H = I && !a.added && this.box,
                    t = function (a) {
                        return k ? z(k) : l.fontMetrics(void 0, a.getAttribute("style") ? a : b).h
                    },
                    N = function (a, b) {
                        M(l.escapes, function (h, l) {
                            b && -1 !== F(h, b) || (a = a.toString().replace(new RegExp(h, "g"), l))
                        });
                        return a
                    },
                    n = function (a, b) {
                        var h;
                        h = a.indexOf("\x3c");
                        a = a.substring(h, a.indexOf("\x3e") - h);
                        h = a.indexOf(b + "\x3d");
                        if (-1 !== h && (h = h + b.length + 1, b =
                                a.charAt(h), '"' === b || "'" === b)) return a = a.substring(h + 1), a.substring(0, a.indexOf(b))
                    },
                    B = [e, C, v, k, K, B && B.fontSize, I].join();
                if (B !== a.textCache) {
                    for (a.textCache = B; G--;) b.removeChild(m[G]);
                    p || K || C || I || -1 !== e.indexOf(" ") ? (H && H.appendChild(b), e = p ? e.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [e], e = g(e, function (a) {
                        return "" !==
                            a
                    }), u(e, function (h, z) {
                        var g, e = 0;
                        h = h.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        g = h.split("|||");
                        u(g, function (h) {
                            if ("" !== h || 1 === g.length) {
                                var p = {},
                                    m = y.createElementNS(l.SVG_NS, "tspan"),
                                    B, k;
                                (B = n(h, "class")) && f(m, "class", B);
                                if (B = n(h, "style")) B = B.replace(/(;| |^)color([ :])/, "$1fill$2"), f(m, "style", B);
                                (k = n(h, "href")) && !c && (f(m, "onclick", 'location.href\x3d"' + k + '"'), f(m, "class", "highcharts-anchor"));
                                h = N(h.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !==
                                    h) {
                                    m.appendChild(y.createTextNode(h));
                                    e ? p.dx = 0 : z && null !== r && (p.x = r);
                                    f(m, p);
                                    b.appendChild(m);
                                    !e && w && (!T && c && x(m, {
                                        display: "block"
                                    }), f(m, "dy", t(m)));
                                    if (I) {
                                        p = h.replace(/([^\^])-/g, "$1- ").split(" ");
                                        k = 1 < g.length || z || 1 < p.length && !v;
                                        var K = [],
                                            u, G = t(m),
                                            H = a.rotation;
                                        for (C && (d = l.applyEllipsis(a, m, h, I)); !C && k && (p.length || K.length);) a.rotation = 0, u = l.getSpanWidth(a, m), h = u > I, void 0 === d && (d = h), h && 1 !== p.length ? (m.removeChild(m.firstChild), K.unshift(p.pop())) : (p = K, K = [], p.length && !v && (m = y.createElementNS(Q, "tspan"),
                                            f(m, {
                                                dy: G,
                                                x: r
                                            }), B && f(m, "style", B), b.appendChild(m)), u > I && (I = u)), p.length && m.appendChild(y.createTextNode(p.join(" ").replace(/- /g, "-")));
                                        a.rotation = H
                                    }
                                    e++
                                }
                            }
                        });
                        w = w || b.childNodes.length
                    }), d && a.attr("title", N(a.textStr, ["\x26lt;", "\x26gt;"])), H && H.removeChild(b), K && a.applyTextOutline && a.applyTextOutline(K)) : b.appendChild(y.createTextNode(N(e)))
                }
            },
            getContrast: function (a) {
                a = n(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, b, h, l, c, z, g, e, p) {
                var m = this.label(a, b, h, p, null, null, null,
                        null, "button"),
                    d = 0;
                m.attr(B({
                    padding: 8,
                    r: 2
                }, c));
                D(m.element, H ? "mouseover" : "mouseenter", function () {
                    3 !== d && m.setState(1)
                });
                D(m.element, H ? "mouseout" : "mouseleave", function () {
                    3 !== d && m.setState(d)
                });
                m.setState = function (a) {
                    1 !== a && (m.state = d = a);
                    m.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0])
                };
                return m.on("click", function (a) {
                    3 !== d && l.call(m, a)
                })
            },
            crispLine: function (a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) -
                    b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function (a) {
                var b = {};
                J(a) ? b.d = a : w(a) && m(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function (a, b, h) {
                a = w(a) ? a : {
                    x: a,
                    y: b,
                    r: h
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, h) {
                    h.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function (a, b, h, l, c, z) {
                w(a) ? (l = a, b = l.y, h = l.r, a = l.x) : l = {
                    innerR: l,
                    start: c,
                    end: z
                };
                a = this.symbol("arc", a, b, h, h, l);
                a.r = h;
                return a
            },
            rect: function (a, b, h, l, c, z) {
                c = w(a) ? a.r : c;
                z = this.createElement("rect");
                a = w(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(h, 0),
                    height: Math.max(l, 0)
                };
                c && (a.r = c);
                z.rSetter = function (a, b, h) {
                    f(h, {
                        rx: a,
                        ry: a
                    })
                };
                return z.attr(a)
            },
            setSize: function (a, b, l) {
                var c = this.alignedObjects,
                    z = c.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: h(l, !0) ? void 0 : 0
                    }); z--;) c[z].align()
            },
            g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" +
                        a
                }) : b
            },
            image: function (a, b, h, l, c, z) {
                var g = {
                        preserveAspectRatio: "none"
                    },
                    e, p = function (a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
                    };
                1 < arguments.length && m(g, {
                    x: b,
                    y: h,
                    width: l,
                    height: c
                });
                e = this.createElement("image").attr(g);
                z ? (p(e.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), g = new P.Image, D(g, "load", function (b) {
                    p(e.element, a);
                    z.call(e, b)
                }), g.src = a) : p(e.element, a);
                return e
            },
            symbol: function (a,
                b, l, c, z, g) {
                var e = this,
                    p, B = /^url\((.*?)\)$/,
                    r = B.test(a),
                    I = !r && (this.symbols[a] ? a : "circle"),
                    K = I && this.symbols[I],
                    C = k(b) && K && K.call(this.symbols, Math.round(b), Math.round(l), c, z, g),
                    v, w;
                K ? (p = this.path(C), m(p, {
                    symbolName: I,
                    x: b,
                    y: l,
                    width: c,
                    height: z
                }), g && m(p, g)) : r && (v = a.match(B)[1], p = this.image(v), p.imgwidth = h(O[v] && O[v].width, g && g.width), p.imgheight = h(O[v] && O[v].height, g && g.height), w = function () {
                    p.attr({
                        width: p.width,
                        height: p.height
                    })
                }, u(["width", "height"], function (a) {
                    p[a + "Setter"] = function (a, b) {
                        var h = {},
                            l = this["img" + b],
                            c = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        k(l) && (this.element && this.element.setAttribute(b, l), this.alignByTranslate || (h[c] = ((this[b] || 0) - l) / 2, this.attr(h)))
                    }
                }), k(b) && p.attr({
                    x: b,
                    y: l
                }), p.isImg = !0, k(p.imgwidth) && k(p.imgheight) ? w() : (p.attr({
                    width: 0,
                    height: 0
                }), t("img", {
                    onload: function () {
                        var a = d[e.chartIndex];
                        0 === this.width && (x(this, {
                            position: "absolute",
                            top: "-999em"
                        }), y.body.appendChild(this));
                        O[v] = {
                            width: this.width,
                            height: this.height
                        };
                        p.imgwidth = this.width;
                        p.imgheight = this.height;
                        p.element && w();
                        this.parentNode && this.parentNode.removeChild(this);
                        e.imgCount--;
                        if (!e.imgCount && a && a.onload) a.onload()
                    },
                    src: v
                }), this.imgCount++));
                return p
            },
            symbols: {
                circle: function (a, b, h, l) {
                    return this.arc(a + h / 2, b + l / 2, h / 2, l / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function (a, b, h, l) {
                    return ["M", a, b, "L", a + h, b, a + h, b + l, a, b + l, "Z"]
                },
                triangle: function (a, b, h, l) {
                    return ["M", a + h / 2, b, "L", a + h, b + l, a, b + l, "Z"]
                },
                "triangle-down": function (a, b, h, l) {
                    return ["M", a, b, "L", a + h, b, a + h / 2, b + l, "Z"]
                },
                diamond: function (a, b, h, l) {
                    return ["M",
                        a + h / 2, b, "L", a + h, b + l / 2, a + h / 2, b + l, a, b + l / 2, "Z"
                    ]
                },
                arc: function (a, b, l, c, z) {
                    var g = z.start,
                        e = z.r || l,
                        p = z.r || c || l,
                        m = z.end - .001;
                    l = z.innerR;
                    c = h(z.open, .001 > Math.abs(z.end - z.start - 2 * Math.PI));
                    var d = Math.cos(g),
                        B = Math.sin(g),
                        r = Math.cos(m),
                        m = Math.sin(m);
                    z = .001 > z.end - g - Math.PI ? 0 : 1;
                    e = ["M", a + e * d, b + p * B, "A", e, p, 0, z, 1, a + e * r, b + p * m];
                    k(l) && e.push(c ? "M" : "L", a + l * r, b + l * m, "A", l, l, 0, z, 0, a + l * d, b + l * B);
                    e.push(c ? "" : "Z");
                    return e
                },
                callout: function (a, b, h, l, c) {
                    var z = Math.min(c && c.r || 0, h, l),
                        g = z + 6,
                        e = c && c.anchorX;
                    c = c && c.anchorY;
                    var p;
                    p = ["M", a + z, b, "L", a + h - z, b, "C", a + h, b, a + h, b, a + h, b + z, "L", a + h, b + l - z, "C", a + h, b + l, a + h, b + l, a + h - z, b + l, "L", a + z, b + l, "C", a, b + l, a, b + l, a, b + l - z, "L", a, b + z, "C", a, b, a, b, a + z, b];
                    e && e > h ? c > b + g && c < b + l - g ? p.splice(13, 3, "L", a + h, c - 6, a + h + 6, c, a + h, c + 6, a + h, b + l - z) : p.splice(13, 3, "L", a + h, l / 2, e, c, a + h, l / 2, a + h, b + l - z) : e && 0 > e ? c > b + g && c < b + l - g ? p.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, b + z) : p.splice(33, 3, "L", a, l / 2, e, c, a, l / 2, a, b + z) : c && c > l && e > a + g && e < a + h - g ? p.splice(23, 3, "L", e + 6, b + l, e, b + l + 6, e - 6, b + l, a + z, b + l) : c && 0 > c && e > a + g && e < a + h - g && p.splice(3, 3, "L",
                        e - 6, b, e, b - 6, e + 6, b, h - z, b);
                    return p
                }
            },
            clipRect: function (b, h, l, c) {
                var z = a.uniqueKey(),
                    g = this.createElement("clipPath").attr({
                        id: z
                    }).add(this.defs);
                b = this.rect(b, h, l, c, 0).add(g);
                b.id = z;
                b.clipPath = g;
                b.count = 0;
                return b
            },
            text: function (a, b, h, l) {
                var c = {};
                if (l && (this.allowHTML || !this.forExport)) return this.html(a, b, h);
                c.x = Math.round(b || 0);
                h && (c.y = Math.round(h));
                if (a || 0 === a) c.text = a;
                a = this.createElement("text").attr(c);
                l || (a.xSetter = function (a, b, h) {
                    var l = h.getElementsByTagName("tspan"),
                        c, z = h.getAttribute(b),
                        g;
                    for (g = 0; g < l.length; g++) c = l[g], c.getAttribute(b) === z && c.setAttribute(b, a);
                    h.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function (a, b) {
                a = b && A.prototype.getStyle.call(b, "font-size");
                a = /px/.test(a) ? z(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function (a, b, h) {
                var l = a;
                b && h && (l = Math.max(l * Math.cos(b * c), 4));
                return {
                    x: -a / 3 * Math.sin(b * c),
                    y: l
                }
            },
            label: function (b, h, l, c, z, g, e, p, d) {
                var r = this,
                    I = r.g("button" !==
                        d && "label"),
                    v = I.text = r.text("", 0, 0, e).attr({
                        zIndex: 1
                    }),
                    C, w, f = 0,
                    y = 3,
                    G = 0,
                    H, F, T, x, t, n = {},
                    Q, M = /^url\((.*?)\)$/.test(c),
                    J = M,
                    q, O, P, N;
                d && I.addClass("highcharts-" + d);
                J = !0;
                q = function () {
                    return C.strokeWidth() % 2 / 2
                };
                O = function () {
                    var a = v.element.style,
                        b = {};
                    w = (void 0 === H || void 0 === F || t) && k(v.textStr) && v.getBBox();
                    I.width = (H || w.width || 0) + 2 * y + G;
                    I.height = (F || w.height || 0) + 2 * y;
                    Q = y + r.fontMetrics(a && a.fontSize, v).b;
                    J && (C || (I.box = C = r.symbols[c] || M ? r.symbol(c) : r.rect(), C.addClass(("button" === d ? "" : "highcharts-label-box") +
                        (d ? " highcharts-" + d + "-box" : "")), C.add(I), a = q(), b.x = a, b.y = (p ? -Q : 0) + a), b.width = Math.round(I.width), b.height = Math.round(I.height), C.attr(m(b, n)), n = {})
                };
                P = function () {
                    var a = G + y,
                        b;
                    b = p ? 0 : Q;
                    k(H) && w && ("center" === t || "right" === t) && (a += {
                        center: .5,
                        right: 1
                    }[t] * (H - w.width));
                    if (a !== v.x || b !== v.y) v.attr("x", a), void 0 !== b && v.attr("y", b);
                    v.x = a;
                    v.y = b
                };
                N = function (a, b) {
                    C ? C.attr(a, b) : n[a] = b
                };
                I.onAdd = function () {
                    v.add(I);
                    I.attr({
                        text: b || 0 === b ? b : "",
                        x: h,
                        y: l
                    });
                    C && k(z) && I.attr({
                        anchorX: z,
                        anchorY: g
                    })
                };
                I.widthSetter = function (b) {
                    H =
                        a.isNumber(b) ? b : null
                };
                I.heightSetter = function (a) {
                    F = a
                };
                I["text-alignSetter"] = function (a) {
                    t = a
                };
                I.paddingSetter = function (a) {
                    k(a) && a !== y && (y = I.padding = a, P())
                };
                I.paddingLeftSetter = function (a) {
                    k(a) && a !== G && (G = a, P())
                };
                I.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== f && (f = a, w && I.attr({
                        x: T
                    }))
                };
                I.textSetter = function (a) {
                    void 0 !== a && v.textSetter(a);
                    O();
                    P()
                };
                I["stroke-widthSetter"] = function (a, b) {
                    a && (J = !0);
                    this["stroke-width"] = a;
                    N(b, a)
                };
                I.rSetter = function (a, b) {
                    N(b, a)
                };
                I.anchorXSetter = function (a, b) {
                    z =
                        I.anchorX = a;
                    N(b, Math.round(a) - q() - T)
                };
                I.anchorYSetter = function (a, b) {
                    g = I.anchorY = a;
                    N(b, a - x)
                };
                I.xSetter = function (a) {
                    I.x = a;
                    f && (a -= f * ((H || w.width) + 2 * y), I["forceAnimate:x"] = !0);
                    T = Math.round(a);
                    I.attr("translateX", T)
                };
                I.ySetter = function (a) {
                    x = I.y = Math.round(a);
                    I.attr("translateY", x)
                };
                var R = I.css;
                return m(I, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = B(a);
                            u(I.textProps, function (h) {
                                void 0 !== a[h] && (b[h] = a[h], delete a[h])
                            });
                            v.css(b);
                            "width" in b && O()
                        }
                        return R.call(I, a)
                    },
                    getBBox: function () {
                        return {
                            width: w.width + 2 * y,
                            height: w.height +
                                2 * y,
                            x: w.x - y,
                            y: w.y - y
                        }
                    },
                    destroy: function () {
                        K(I.element, "mouseenter");
                        K(I.element, "mouseleave");
                        v && (v = v.destroy());
                        C && (C = C.destroy());
                        A.prototype.destroy.call(I);
                        I = r = O = P = N = null
                    }
                })
            }
        });
        a.Renderer = E
    })(L);
    (function (a) {
        var A = a.attr,
            E = a.createElement,
            D = a.css,
            q = a.defined,
            f = a.each,
            d = a.extend,
            n = a.isFirefox,
            x = a.isMS,
            t = a.isWebKit,
            k = a.pick,
            c = a.pInt,
            e = a.SVGRenderer,
            y = a.win,
            u = a.wrap;
        d(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b,
                    this.htmlUpdateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = d(this.styles, a);
                D(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        g = this.x || 0,
                        e = this.y || 0,
                        d = this.textAlign || "left",
                        k = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[d],
                        v = this.styles,
                        u = v && v.whiteSpace;
                    D(b, {
                        marginLeft: this.translateX ||
                            0,
                        marginTop: this.translateY || 0
                    });
                    this.inverted && f(b.childNodes, function (c) {
                        a.invertChild(c, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var v = this.rotation,
                            w = this.textWidth && c(this.textWidth),
                            p = [v, d, b.innerHTML, this.textWidth, this.textAlign].join(),
                            C;
                        (C = w !== this.oldTextWidth) && !(C = w > this.oldTextWidth) && ((C = this.textPxLength) || (D(b, {
                            width: "",
                            whiteSpace: u || "nowrap"
                        }), C = b.offsetWidth), C = C > w);
                        C && /[ \-]/.test(b.textContent || b.innerText) && (D(b, {
                            width: w + "px",
                            display: "block",
                            whiteSpace: u || "normal"
                        }), this.oldTextWidth = w);
                        p !== this.cTT && (u = a.fontMetrics(b.style.fontSize).b, q(v) && v !== (this.oldRotation || 0) && this.setSpanRotation(v, k, u), this.getSpanCorrection(!q(v) && this.textPxLength || b.offsetWidth, u, k, v, d));
                        D(b, {
                            left: g + (this.xCorr || 0) + "px",
                            top: e + (this.yCorr || 0) + "px"
                        });
                        this.cTT = p;
                        this.oldRotation = v
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a, b, c) {
                var g = {},
                    e = this.renderer.getTransformKey();
                g[e] = g.transform = "rotate(" + a + "deg)";
                g[e + (n ? "Origin" : "-origin")] = g.transformOrigin = 100 * b + "% " + c + "px";
                D(this.element, g)
            },
            getSpanCorrection: function (a,
                b, c) {
                this.xCorr = -a * c;
                this.yCorr = -b
            }
        });
        d(e.prototype, {
            getTransformKey: function () {
                return x && !/Edge/.test(y.navigator.userAgent) ? "-ms-transform" : t ? "-webkit-transform" : n ? "MozTransform" : y.opera ? "-o-transform" : ""
            },
            html: function (a, b, c) {
                var g = this.createElement("span"),
                    e = g.element,
                    m = g.renderer,
                    v = m.isSVG,
                    y = function (a, b) {
                        f(["opacity", "visibility"], function (c) {
                            u(a, c + "Setter", function (a, c, g, h) {
                                a.call(this, c, g, h);
                                b[g] = c
                            })
                        });
                        a.addedSetters = !0
                    };
                g.textSetter = function (a) {
                    a !== e.innerHTML && delete this.bBox;
                    this.textStr =
                        a;
                    e.innerHTML = k(a, "");
                    g.doTransform = !0
                };
                v && y(g, g.element.style);
                g.xSetter = g.ySetter = g.alignSetter = g.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    g[b] = a;
                    g.doTransform = !0
                };
                g.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                g.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(c)
                }).css({
                    position: "absolute"
                });
                e.style.whiteSpace = "nowrap";
                g.css = g.htmlCss;
                v && (g.add = function (a) {
                    var b, c = m.box.parentNode,
                        B = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) B.push(a),
                                a = a.parentGroup;
                            f(B.reverse(), function (a) {
                                function e(b, l) {
                                    a[l] = b;
                                    "translateX" === l ? h.left = b + "px" : h.top = b + "px";
                                    a.doTransform = !0
                                }
                                var h, z = A(a.element, "class");
                                z && (z = {
                                    className: z
                                });
                                b = a.div = a.div || E("div", z, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || c);
                                h = b.style;
                                d(a, {
                                    classSetter: function (a) {
                                        return function (b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(b),
                                    on: function () {
                                        B[0].div &&
                                            g.on.apply({
                                                element: B[0].div
                                            }, arguments);
                                        return a
                                    },
                                    translateXSetter: e,
                                    translateYSetter: e
                                });
                                a.addedSetters || y(a, h)
                            })
                        }
                    } else b = c;
                    b.appendChild(e);
                    g.added = !0;
                    g.alignOnAdd && g.htmlUpdateTransform();
                    return g
                });
                return g
            }
        })
    })(L);
    (function (a) {
        var A = a.defined,
            E = a.each,
            D = a.extend,
            q = a.merge,
            f = a.pick,
            d = a.timeUnits,
            n = a.win;
        a.Time = function (a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function (d) {
                var t = f(d && d.useUTC, !0),
                    k = this;
                this.options = d = q(!0, this.options || {}, d);
                this.Date = d.Date || n.Date;
                this.timezoneOffset =
                    (this.useUTC = t) && d.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(t && !d.getTimezoneOffset && !d.timezone)) || this.timezoneOffset ? (this.get = function (a, e) {
                    var c = e.getTime(),
                        d = c - k.getTimezoneOffset(e);
                    e.setTime(d);
                    a = e["getUTC" + a]();
                    e.setTime(c);
                    return a
                }, this.set = function (c, e, d) {
                    var u;
                    if (-1 !== a.inArray(c, ["Milliseconds", "Seconds", "Minutes"])) e["set" + c](d);
                    else u = k.getTimezoneOffset(e), u = e.getTime() - u, e.setTime(u), e["setUTC" + c](d), c = k.getTimezoneOffset(e), u =
                        e.getTime() + c, e.setTime(u)
                }) : t ? (this.get = function (a, e) {
                    return e["getUTC" + a]()
                }, this.set = function (a, e, d) {
                    return e["setUTC" + a](d)
                }) : (this.get = function (a, e) {
                    return e["get" + a]()
                }, this.set = function (a, e, d) {
                    return e["set" + a](d)
                })
            },
            makeTime: function (d, t, k, c, e, y) {
                var u, m, b;
                this.useUTC ? (u = this.Date.UTC.apply(0, arguments), m = this.getTimezoneOffset(u), u += m, b = this.getTimezoneOffset(u), m !== b ? u += b - m : m - 36E5 !== this.getTimezoneOffset(u - 36E5) || a.isSafari || (u -= 36E5)) : u = (new this.Date(d, t, f(k, 1), f(c, 0), f(e, 0), f(y, 0))).getTime();
                return u
            },
            timezoneOffsetFunction: function () {
                var d = this,
                    f = this.options,
                    k = n.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (f.timezone) {
                    if (k) return function (a) {
                        return 6E4 * -k.tz(a, f.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && f.getTimezoneOffset ? function (a) {
                    return 6E4 * f.getTimezoneOffset(a)
                } : function () {
                    return 6E4 * (d.timezoneOffset || 0)
                }
            },
            dateFormat: function (d, f, k) {
                if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";
                d = a.pick(d, "%Y-%m-%d %H:%M:%S");
                var c = this,
                    e = new this.Date(f),
                    y = this.get("Hours", e),
                    u = this.get("Day", e),
                    m = this.get("Date", e),
                    b = this.get("Month", e),
                    g = this.get("FullYear", e),
                    r = a.defaultOptions.lang,
                    F = r.weekdays,
                    t = r.shortWeekdays,
                    v = a.pad,
                    e = a.extend({
                        a: t ? t[u] : F[u].substr(0, 3),
                        A: F[u],
                        d: v(m),
                        e: v(m, 2, " "),
                        w: u,
                        b: r.shortMonths[b],
                        B: r.months[b],
                        m: v(b + 1),
                        y: g.toString().substr(2, 2),
                        Y: g,
                        H: v(y),
                        k: y,
                        I: v(y % 12 || 12),
                        l: y % 12 || 12,
                        M: v(c.get("Minutes", e)),
                        p: 12 > y ? "AM" : "PM",
                        P: 12 > y ? "am" : "pm",
                        S: v(e.getSeconds()),
                        L: v(Math.round(f % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(e,
                    function (a, b) {
                        for (; - 1 !== d.indexOf("%" + b);) d = d.replace("%" + b, "function" === typeof a ? a.call(c, f) : a)
                    });
                return k ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
            },
            getTimeTicks: function (a, t, k, c) {
                var e = this,
                    y = [],
                    u = {},
                    m, b = new e.Date(t),
                    g = a.unitRange,
                    r = a.count || 1,
                    F;
                if (A(t)) {
                    e.set("Milliseconds", b, g >= d.second ? 0 : r * Math.floor(e.get("Milliseconds", b) / r));
                    g >= d.second && e.set("Seconds", b, g >= d.minute ? 0 : r * Math.floor(e.get("Seconds", b) / r));
                    g >= d.minute && e.set("Minutes", b, g >= d.hour ? 0 : r * Math.floor(e.get("Minutes", b) / r));
                    g >= d.hour &&
                        e.set("Hours", b, g >= d.day ? 0 : r * Math.floor(e.get("Hours", b) / r));
                    g >= d.day && e.set("Date", b, g >= d.month ? 1 : r * Math.floor(e.get("Date", b) / r));
                    g >= d.month && (e.set("Month", b, g >= d.year ? 0 : r * Math.floor(e.get("Month", b) / r)), m = e.get("FullYear", b));
                    g >= d.year && e.set("FullYear", b, m - m % r);
                    g === d.week && e.set("Date", b, e.get("Date", b) - e.get("Day", b) + f(c, 1));
                    m = e.get("FullYear", b);
                    c = e.get("Month", b);
                    var n = e.get("Date", b),
                        v = e.get("Hours", b);
                    t = b.getTime();
                    e.variableTimezone && (F = k - t > 4 * d.month || e.getTimezoneOffset(t) !== e.getTimezoneOffset(k));
                    b = b.getTime();
                    for (t = 1; b < k;) y.push(b), b = g === d.year ? e.makeTime(m + t * r, 0) : g === d.month ? e.makeTime(m, c + t * r) : !F || g !== d.day && g !== d.week ? F && g === d.hour && 1 < r ? e.makeTime(m, c, n, v + t * r) : b + g * r : e.makeTime(m, c, n + t * r * (g === d.day ? 1 : 7)), t++;
                    y.push(b);
                    g <= d.hour && 1E4 > y.length && E(y, function (a) {
                        0 === a % 18E5 && "000000000" === e.dateFormat("%H%M%S%L", a) && (u[a] = "day")
                    })
                }
                y.info = D(a, {
                    higherRanks: u,
                    totalRange: g * r
                });
                return y
            }
        }
    })(L);
    (function (a) {
        var A = a.merge;
        a.defaultOptions = {
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {}
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e\x3cbr/\x3e'
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (E) {
            a.defaultOptions = A(!0, a.defaultOptions, E);
            a.time.update(A(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(A(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function (A, D, q) {
            return a.time.dateFormat(A, D, q)
        }
    })(L);
    (function (a) {
        var A = a.correctFloat,
            E = a.defined,
            D = a.destroyObjectProperties,
            q = a.fireEvent,
            f = a.isNumber,
            d = a.pick,
            n = a.deg2rad;
        a.Tick = function (a, d, k, c) {
            this.axis = a;
            this.pos = d;
            this.type = k || "";
            this.isNewLabel = this.isNew = !0;
            k || c || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis,
                    f = a.options,
                    k = a.chart,
                    c =
                    a.categories,
                    e = a.names,
                    y = this.pos,
                    u = f.labels,
                    m = a.tickPositions,
                    b = y === m[0],
                    g = y === m[m.length - 1],
                    e = c ? d(c[y], e[y], y) : y,
                    c = this.label,
                    m = m.info,
                    r;
                a.isDatetimeAxis && m && (r = f.dateTimeLabelFormats[m.higherRanks[y] || m.unitName]);
                this.isFirst = b;
                this.isLast = g;
                f = a.labelFormatter.call({
                    axis: a,
                    chart: k,
                    isFirst: b,
                    isLast: g,
                    dateTimeLabelFormat: r,
                    value: a.isLog ? A(a.lin2log(e)) : e,
                    pos: y
                });
                if (E(c)) c && c.attr({
                    text: f
                });
                else {
                    if (this.label = c = E(f) && u.enabled ? k.renderer.text(f, 0, 0, u.useHTML).add(a.labelGroup) : null) c.textPxLength =
                        c.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var f = this.axis,
                    k = f.options.labels,
                    c = a.x,
                    e = f.chart.chartWidth,
                    y = f.chart.spacing,
                    u = d(f.labelLeft, Math.min(f.pos, y[3])),
                    y = d(f.labelRight, Math.max(f.isRadial ? 0 : f.pos + f.len, e - y[1])),
                    m = this.label,
                    b = this.rotation,
                    g = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[f.labelAlign || m.attr("align")],
                    r = m.getBBox().width,
                    F = f.getSlotWidth(),
                    x = F,
                    v = 1,
                    H, w = {};
                if (b || !1 === k.overflow) 0 >
                    b && c - g * r < u ? H = Math.round(c / Math.cos(b * n) - u) : 0 < b && c + g * r > y && (H = Math.round((e - c) / Math.cos(b * n)));
                else if (e = c + (1 - g) * r, c - g * r < u ? x = a.x + x * (1 - g) - u : e > y && (x = y - a.x + x * g, v = -1), x = Math.min(F, x), x < F && "center" === f.labelAlign && (a.x += v * (F - x - g * (F - Math.min(r, x)))), r > x || f.autoRotation && (m.styles || {}).width) H = x;
                H && (w.width = H, (k.style || {}).textOverflow || (w.textOverflow = "ellipsis"), m.css(w))
            },
            getPosition: function (d, f, k, c) {
                var e = this.axis,
                    y = e.chart,
                    u = c && y.oldChartHeight || y.chartHeight;
                d = {
                    x: d ? a.correctFloat(e.translate(f + k, null,
                        null, c) + e.transB) : e.left + e.offset + (e.opposite ? (c && y.oldChartWidth || y.chartWidth) - e.right - e.left : 0),
                    y: d ? u - e.bottom + e.offset - (e.opposite ? e.height : 0) : a.correctFloat(u - e.translate(f + k, null, null, c) - e.transB)
                };
                q(this, "afterGetPosition", {
                    pos: d
                });
                return d
            },
            getLabelPosition: function (a, d, k, c, e, f, u, m) {
                var b = this.axis,
                    g = b.transA,
                    r = b.reversed,
                    y = b.staggerLines,
                    t = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    v = e.y,
                    H = c || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                    w = {};
                E(v) || (v = 0 === b.side ? k.rotation ? -8 : -k.getBBox().height :
                    2 === b.side ? t.y + 8 : Math.cos(k.rotation * n) * (t.y - k.getBBox(!1, 0).height / 2));
                a = a + e.x + H + t.x - (f && c ? f * g * (r ? -1 : 1) : 0);
                d = d + v - (f && !c ? f * g * (r ? 1 : -1) : 0);
                y && (k = u / (m || 1) % y, b.opposite && (k = y - k - 1), d += b.labelOffset / y * k);
                w.x = a;
                w.y = Math.round(d);
                q(this, "afterGetLabelPosition", {
                    pos: w
                });
                return w
            },
            getMarkPath: function (a, d, k, c, e, f) {
                return f.crispLine(["M", a, d, "L", a + (e ? 0 : -k), d + (e ? k : 0)], c)
            },
            renderGridLine: function (a, d, k) {
                var c = this.axis,
                    e = this.gridLine,
                    f = {},
                    u = this.pos,
                    m = this.type,
                    b = c.tickmarkOffset,
                    g = c.chart.renderer;
                e || (m || (f.zIndex =
                    1), a && (f.opacity = 0), this.gridLine = e = g.path().attr(f).addClass("highcharts-" + (m ? m + "-" : "") + "grid-line").add(c.gridGroup));
                if (!a && e && (a = c.getPlotLinePath(u + b, e.strokeWidth() * k, a, !0))) e[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: d
                })
            },
            renderMark: function (a, d, k) {
                var c = this.axis,
                    e = c.chart.renderer,
                    f = this.type,
                    u = c.tickSize(f ? f + "Tick" : "tick"),
                    m = this.mark,
                    b = !m,
                    g = a.x;
                a = a.y;
                u && (c.opposite && (u[0] = -u[0]), b && (this.mark = m = e.path().addClass("highcharts-" + (f ? f + "-" : "") + "tick").add(c.axisGroup)), m[b ? "attr" : "animate"]({
                    d: this.getMarkPath(g,
                        a, u[0], m.strokeWidth() * k, c.horiz, e),
                    opacity: d
                }))
            },
            renderLabel: function (a, n, k, c) {
                var e = this.axis,
                    y = e.horiz,
                    u = e.options,
                    m = this.label,
                    b = u.labels,
                    g = b.step,
                    e = e.tickmarkOffset,
                    r = !0,
                    F = a.x;
                a = a.y;
                m && f(F) && (m.xy = a = this.getLabelPosition(F, a, m, y, b, e, c, g), this.isFirst && !this.isLast && !d(u.showFirstLabel, 1) || this.isLast && !this.isFirst && !d(u.showLastLabel, 1) ? r = !1 : !y || b.step || b.rotation || n || 0 === k || this.handleOverflow(a), g && c % g && (r = !1), r && f(a.y) ? (a.opacity = k, m[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) :
                    (m.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function (f, n, k) {
                var c = this.axis,
                    e = c.horiz,
                    y = this.getPosition(e, this.pos, c.tickmarkOffset, n),
                    u = y.x,
                    m = y.y,
                    c = e && u === c.pos + c.len || !e && m === c.pos ? -1 : 1;
                k = d(k, 1);
                this.isActive = !0;
                this.renderGridLine(n, k, c);
                this.renderMark(y, k, c);
                this.renderLabel(y, n, k, f);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function () {
                D(this, this.axis)
            }
        }
    })(L);
    var U = function (a) {
        var A = a.addEvent,
            E = a.animObject,
            D = a.arrayMax,
            q = a.arrayMin,
            f = a.correctFloat,
            d = a.defaultOptions,
            n = a.defined,
            x = a.deg2rad,
            t = a.destroyObjectProperties,
            k = a.each,
            c = a.extend,
            e = a.fireEvent,
            y = a.format,
            u = a.getMagnitude,
            m = a.grep,
            b = a.inArray,
            g = a.isArray,
            r = a.isNumber,
            F = a.isString,
            J = a.merge,
            v = a.normalizeTickInterval,
            H = a.objectEach,
            w = a.pick,
            p = a.removeEvent,
            C = a.splat,
            B = a.syncTimeout,
            G = a.Tick,
            M = function () {
                this.init.apply(this, arguments)
            };
        a.extend(M.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    x: 0
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle"
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, c) {
                var h = c.isX,
                    l = this;
                l.chart = a;
                l.horiz = a.inverted && !l.isZAxis ? !h : h;
                l.isXAxis = h;
                l.coll = l.coll || (h ? "xAxis" : "yAxis");
                e(this, "init", {
                    userOptions: c
                });
                l.opposite = c.opposite;
                l.side = c.side || (l.horiz ? l.opposite ? 0 :
                    2 : l.opposite ? 1 : 3);
                l.setOptions(c);
                var g = this.options,
                    z = g.type;
                l.labelFormatter = g.labels.formatter || l.defaultLabelFormatter;
                l.userOptions = c;
                l.minPixelPadding = 0;
                l.reversed = g.reversed;
                l.visible = !1 !== g.visible;
                l.zoomEnabled = !1 !== g.zoomEnabled;
                l.hasNames = "category" === z || !0 === g.categories;
                l.categories = g.categories || l.hasNames;
                l.names || (l.names = [], l.names.keys = {});
                l.plotLinesAndBandsGroups = {};
                l.isLog = "logarithmic" === z;
                l.isDatetimeAxis = "datetime" === z;
                l.positiveValuesOnly = l.isLog && !l.allowNegativeLog;
                l.isLinked =
                    n(g.linkedTo);
                l.ticks = {};
                l.labelEdge = [];
                l.minorTicks = {};
                l.plotLinesAndBands = [];
                l.alternateBands = {};
                l.len = 0;
                l.minRange = l.userMinRange = g.minRange || g.maxZoom;
                l.range = g.range;
                l.offset = g.offset || 0;
                l.stacks = {};
                l.oldStacks = {};
                l.stacksTouched = 0;
                l.max = null;
                l.min = null;
                l.crosshair = w(g.crosshair, C(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                c = l.options.events; - 1 === b(l, a.axes) && (h ? a.axes.splice(a.xAxis.length, 0, l) : a.axes.push(l), a[l.coll].push(l));
                l.series = l.series || [];
                a.inverted && !l.isZAxis && h && void 0 === l.reversed &&
                    (l.reversed = !0);
                H(c, function (a, b) {
                    A(l, b, a)
                });
                l.lin2log = g.linearToLogConverter || l.lin2log;
                l.isLog && (l.val2lin = l.log2lin, l.lin2val = l.lin2log);
                e(this, "afterInit")
            },
            setOptions: function (a) {
                this.options = J(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], J(d[this.coll], a));
                e(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function () {
                var b = this.axis,
                    c = this.value,
                    g = b.chart.time,
                    l = b.categories,
                    e = this.dateTimeLabelFormat,
                    p = d.lang,
                    m = p.numericSymbols,
                    p = p.numericSymbolMagnitude || 1E3,
                    B = m && m.length,
                    r, k = b.options.labels.format,
                    b = b.isLog ? Math.abs(c) : b.tickInterval;
                if (k) r = y(k, this, g);
                else if (l) r = c;
                else if (e) r = g.dateFormat(e, c);
                else if (B && 1E3 <= b)
                    for (; B-- && void 0 === r;) g = Math.pow(p, B + 1), b >= g && 0 === 10 * c % g && null !== m[B] && 0 !== c && (r = a.numberFormat(c / g, -1) + m[B]);
                void 0 === r && (r = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return r
            },
            getSeriesExtremes: function () {
                var a =
                    this,
                    b = a.chart;
                e(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    k(a.series, function (h) {
                        if (h.visible || !b.options.chart.ignoreHiddenSeries) {
                            var l = h.options,
                                c = l.threshold,
                                g;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= c && (c = null);
                            if (a.isXAxis) l = h.xData, l.length && (h = q(l), g = D(l), r(h) || h instanceof Date || (l = m(l, r), h = q(l), g = D(l)), l.length && (a.dataMin = Math.min(w(a.dataMin, l[0], h), h), a.dataMax =
                                Math.max(w(a.dataMax, l[0], g), g)));
                            else if (h.getExtremes(), g = h.dataMax, h = h.dataMin, n(h) && n(g) && (a.dataMin = Math.min(w(a.dataMin, h), h), a.dataMax = Math.max(w(a.dataMax, g), g)), n(c) && (a.threshold = c), !l.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                e(this, "afterGetSeriesExtremes")
            },
            translate: function (a, b, c, l, g, e) {
                var h = this.linkedParent || this,
                    z = 1,
                    p = 0,
                    d = l ? h.oldTransA : h.transA;
                l = l ? h.oldMin : h.min;
                var m = h.minPixelPadding;
                g = (h.isOrdinal || h.isBroken || h.isLog && g) && h.lin2val;
                d || (d = h.transA);
                c && (z *=
                    -1, p = h.len);
                h.reversed && (z *= -1, p -= z * (h.sector || h.len));
                b ? (a = (a * z + p - m) / d + l, g && (a = h.lin2val(a))) : (g && (a = h.val2lin(a)), a = r(l) ? z * (a - l) * d + p + z * m + (r(e) ? d * e : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, c, l, g) {
                var h = this.chart,
                    z = this.left,
                    e = this.top,
                    p, d, m = c && h.oldChartHeight || h.chartHeight,
                    B = c && h.oldChartWidth || h.chartWidth,
                    I;
                p = this.transB;
                var k = function (a, b, h) {
                    if (a < b || a > h) l ? a = Math.min(Math.max(b, a), h) : I = !0;
                    return a
                };
                g = w(g, this.translate(a, null, null, c));
                g = Math.min(Math.max(-1E5, g), 1E5);
                a = c = Math.round(g + p);
                p = d = Math.round(m - g - p);
                r(g) ? this.horiz ? (p = e, d = m - this.bottom, a = c = k(a, z, z + this.width)) : (a = z, c = B - this.right, p = d = k(p, e, e + this.height)) : (I = !0, l = !1);
                return I && !l ? null : h.renderer.crispLine(["M", a, p, "L", c, d], b || 1)
            },
            getLinearTickPositions: function (a, b, c) {
                var h, g = f(Math.floor(b / a) * a);
                c = f(Math.ceil(c / a) * a);
                var z = [],
                    e;
                f(g + a) === g && (e = 20);
                if (this.single) return [b];
                for (b = g; b <= c;) {
                    z.push(b);
                    b = f(b + a, e);
                    if (b === h) break;
                    h = b
                }
                return z
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? w(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this,
                    b = a.options,
                    c = a.tickPositions,
                    l = a.minorTickInterval,
                    g = [],
                    e = a.pointRangePadding || 0,
                    p = a.min - e,
                    e = a.max + e,
                    d = e - p;
                if (d && d / l < a.len / 3)
                    if (a.isLog) k(this.paddedTicks, function (b, h, c) {
                        h && g.push.apply(g, a.getLogTickPositions(l, c[h - 1], c[h], !0))
                    });
                    else if (a.isDatetimeAxis &&
                    "auto" === this.getMinorTickInterval()) g = g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(l), p, e, b.startOfWeek));
                else
                    for (b = p + (c[0] - p) % l; b <= e && b !== g[0]; b += l) g.push(b);
                0 !== g.length && a.trimTicks(g);
                return g
            },
            adjustForMinRange: function () {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    l, g, e, p, d, m, B, r;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (n(a.min) || n(a.max) ? this.minRange = null : (k(this.series, function (a) {
                        m = a.xData;
                        for (p = B = a.xIncrement ? 1 : m.length - 1; 0 < p; p--)
                            if (d = m[p] - m[p - 1], void 0 === e || d < e) e = d
                    }),
                    this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                c - b < this.minRange && (g = this.dataMax - this.dataMin >= this.minRange, r = this.minRange, l = (r - c + b) / 2, l = [b - l, w(a.min, b - l)], g && (l[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(l), c = [b + r, w(a.max, b + r)], g && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = q(c), c - b < r && (l[0] = c - r, l[1] = w(a.min, c - r), b = D(l)));
                this.min = b;
                this.max = c
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : k(this.series, function (b) {
                    var h = b.closestPointRange,
                        l = b.visible ||
                        !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && n(h) && l && (a = n(a) ? Math.min(a, h) : h)
                });
                return a
            },
            nameToX: function (a) {
                var h = g(this.categories),
                    c = h ? this.categories : this.names,
                    l = a.options.x,
                    e;
                a.series.requireSorting = !1;
                n(l) || (l = !1 === this.options.uniqueNames ? a.series.autoIncrement() : h ? b(a.name, c) : w(c.keys[a.name], -1)); - 1 === l ? h || (e = c.length) : e = l;
                void 0 !== e && (this.names[e] = a.name, this.names.keys[a.name] = e);
                return e
            },
            updateNames: function () {
                var b = this,
                    c = this.names;
                0 < c.length && (k(a.keys(c.keys),
                    function (a) {
                        delete c.keys[a]
                    }), c.length = 0, this.minRange = this.userMinRange, k(this.series || [], function (a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    k(a.points, function (h, c) {
                        var l;
                        h.options && (l = b.nameToX(h), void 0 !== l && l !== h.x && (h.x = l, a.xData[c] = l))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this,
                    h = b.max - b.min,
                    l = b.axisPointRange || 0,
                    c, g = 0,
                    p = 0,
                    d = b.linkedParent,
                    m = !!b.categories,
                    B = b.transA,
                    r = b.isXAxis;
                if (r || m || l) c = b.getClosest(), d ? (g = d.minPointOffset, p = d.pointRangePadding) :
                    k(b.series, function (a) {
                        var h = m ? 1 : r ? w(a.options.pointRange, c, 0) : b.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        l = Math.max(l, h);
                        b.single || (g = Math.max(g, F(a) ? 0 : h / 2), p = Math.max(p, "on" === a ? 0 : h))
                    }), d = b.ordinalSlope && c ? b.ordinalSlope / c : 1, b.minPointOffset = g *= d, b.pointRangePadding = p *= d, b.pointRange = Math.min(l, h), r && (b.closestPointRange = c);
                a && (b.oldTransA = B);
                b.translationSlope = b.transA = B = b.options.staticScale || b.len / (h + p || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = B * g;
                e(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (b) {
                var h = this,
                    c = h.chart,
                    l = h.options,
                    g = h.isLog,
                    p = h.isDatetimeAxis,
                    d = h.isXAxis,
                    m = h.isLinked,
                    B = l.maxPadding,
                    C = l.minPadding,
                    y = l.tickInterval,
                    H = l.tickPixelInterval,
                    G = h.categories,
                    F = r(h.threshold) ? h.threshold : null,
                    M = h.softThreshold,
                    t, q, x, J;
                p || G || m || this.getTickAmount();
                x = w(h.userMin, l.min);
                J = w(h.userMax, l.max);
                m ? (h.linkedParent = c[h.coll][l.linkedTo], c = h.linkedParent.getExtremes(), h.min = w(c.min, c.dataMin), h.max = w(c.max, c.dataMax),
                    l.type !== h.linkedParent.options.type && a.error(11, 1)) : (!M && n(F) && (h.dataMin >= F ? (t = F, C = 0) : h.dataMax <= F && (q = F, B = 0)), h.min = w(x, t, h.dataMin), h.max = w(J, q, h.dataMax));
                g && (h.positiveValuesOnly && !b && 0 >= Math.min(h.min, w(h.dataMin, h.min)) && a.error(10, 1), h.min = f(h.log2lin(h.min), 15), h.max = f(h.log2lin(h.max), 15));
                h.range && n(h.max) && (h.userMin = h.min = x = Math.max(h.dataMin, h.minFromRange()), h.userMax = J = h.max, h.range = null);
                e(h, "foundExtremes");
                h.beforePadding && h.beforePadding();
                h.adjustForMinRange();
                !(G || h.axisPointRange ||
                    h.usePercentage || m) && n(h.min) && n(h.max) && (c = h.max - h.min) && (!n(x) && C && (h.min -= c * C), !n(J) && B && (h.max += c * B));
                r(l.softMin) && !r(h.userMin) && (h.min = Math.min(h.min, l.softMin));
                r(l.softMax) && !r(h.userMax) && (h.max = Math.max(h.max, l.softMax));
                r(l.floor) && (h.min = Math.max(h.min, l.floor));
                r(l.ceiling) && (h.max = Math.min(h.max, l.ceiling));
                M && n(h.dataMin) && (F = F || 0, !n(x) && h.min < F && h.dataMin >= F ? h.min = F : !n(J) && h.max > F && h.dataMax <= F && (h.max = F));
                h.tickInterval = h.min === h.max || void 0 === h.min || void 0 === h.max ? 1 : m && !y && H ===
                    h.linkedParent.options.tickPixelInterval ? y = h.linkedParent.tickInterval : w(y, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (h.max - h.min) * H / Math.max(h.len, H));
                d && !b && k(h.series, function (a) {
                    a.processData(h.min !== h.oldMin || h.max !== h.oldMax)
                });
                h.setAxisTranslation(!0);
                h.beforeSetTickPositions && h.beforeSetTickPositions();
                h.postProcessTickInterval && (h.tickInterval = h.postProcessTickInterval(h.tickInterval));
                h.pointRange && !y && (h.tickInterval = Math.max(h.pointRange, h.tickInterval));
                b =
                    w(l.minTickInterval, h.isDatetimeAxis && h.closestPointRange);
                !y && h.tickInterval < b && (h.tickInterval = b);
                p || g || y || (h.tickInterval = v(h.tickInterval, null, u(h.tickInterval), w(l.allowDecimals, !(.5 < h.tickInterval && 5 > h.tickInterval && 1E3 < h.max && 9999 > h.max)), !!this.tickAmount));
                this.tickAmount || (h.tickInterval = h.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options,
                    b, c = a.tickPositions;
                b = this.getMinorTickInterval();
                var l = a.tickPositioner,
                    g = a.startOnTick,
                    p = a.endOnTick;
                this.tickmarkOffset =
                    this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && n(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ?
                    this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, l && (l = l.apply(this, [this.min, this.max]))) && (this.tickPositions = b = l);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, g, p);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c || l || this.adjustTickAmount());
                e(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, c) {
                var h = a[0],
                    g =
                    a[a.length - 1],
                    e = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== h) this.min = h;
                    else
                        for (; this.min - e > a[0];) a.shift();
                    if (c) this.max = g;
                    else
                        for (; this.max + e < a[a.length - 1];) a.pop();
                    0 === a.length && n(h) && !this.options.tickPositions && a.push((g + h) / 2)
                }
            },
            alignToOthers: function () {
                var a = {},
                    b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || k(this.chart[this.coll], function (h) {
                    var l = h.options,
                        l = [h.horiz ? l.left : l.top, l.width, l.height,
                            l.pane
                        ].join();
                    h.series.length && (a[l] ? b = !0 : a[l] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !n(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    l = this.finalTickAmt,
                    g = b && b.length,
                    e = w(this.threshold, this.softThreshold ?
                        0 : null);
                if (this.hasData()) {
                    if (g < c) {
                        for (; b.length < c;) b.length % 2 || this.min === e ? b.push(f(b[b.length - 1] + a)) : b.unshift(f(b[0] - a));
                        this.transA *= (g - 1) / (c - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else g > c && (this.tickInterval *= 2, this.setTickPositions());
                    if (n(l)) {
                        for (a = c = b.length; a--;)(3 === l && 1 === a % 2 || 2 >= l && 0 < a && a < c - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                k(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                e(this, "afterSetScale")
            },
            setExtremes: function (a, b, g, l, p) {
                var h = this,
                    d = h.chart;
                g = w(g, !0);
                k(h.series, function (a) {
                    delete a.kdTree
                });
                p = c(p, {
                    min: a,
                    max: b
                });
                e(h, "setExtremes", p, function () {
                    h.userMin = a;
                    h.userMax = b;
                    h.eventArgs = p;
                    g && d.redraw(l)
                })
            },
            zoom: function (a, b) {
                var h = this.dataMin,
                    l = this.dataMax,
                    c = this.options,
                    g = Math.min(h, w(c.min, h)),
                    c = Math.max(l, w(c.max, l));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (n(h) && (a < g && (a = g), a > c && (a = c)), n(l) && (b < g && (b = g), b > c && (b = c))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a,
                    b, !1, void 0, {
                        trigger: "zoom"
                    });
                return !0
            },
            setAxisSize: function () {
                var b = this.chart,
                    c = this.options,
                    g = c.offsets || [0, 0, 0, 0],
                    l = this.horiz,
                    e = this.width = Math.round(a.relativeLength(w(c.width, b.plotWidth - g[3] + g[1]), b.plotWidth)),
                    p = this.height = Math.round(a.relativeLength(w(c.height, b.plotHeight - g[0] + g[2]), b.plotHeight)),
                    d = this.top = Math.round(a.relativeLength(w(c.top, b.plotTop + g[0]), b.plotHeight, b.plotTop)),
                    c = this.left = Math.round(a.relativeLength(w(c.left, b.plotLeft + g[3]), b.plotWidth, b.plotLeft));
                this.bottom =
                    b.chartHeight - p - d;
                this.right = b.chartWidth - e - c;
                this.len = Math.max(l ? e : p, 0);
                this.pos = l ? c : d
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? f(this.lin2log(this.min)) : this.min,
                    max: a ? f(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    h = b ? this.lin2log(this.min) : this.min,
                    b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = h : Infinity === a ? a = b : h > a ? a = h : b < a && (a = b);
                return this.translate(a,
                    0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (w(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    h = b[a + "Length"],
                    c = w(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (c && h) return "inside" === b[a + "Position"] && (h = -h), [h, c]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a =
                    this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    l = c,
                    g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    e, p = a.rotation,
                    d = this.labelMetrics(),
                    m, B = Number.MAX_VALUE,
                    r, v = function (a) {
                        a /= g || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return f(a * c)
                    };
                b ? (r = !a.staggerLines && !a.step && (n(p) ? [p] : g < w(a.autoRotationLimit, 80) && a.autoRotation)) && k(r, function (a) {
                    var b;
                    if (a === p || a && -90 <= a && 90 >= a) m = v(Math.abs(d.h / Math.sin(x * a))), b = m + Math.abs(a / 360), b < B && (B = b, e = a, l = m)
                }) : a.step || (l = v(d.h));
                this.autoRotation = r;
                this.labelRotation =
                    w(e, p);
                return l
            },
            getSlotWidth: function () {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    l = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    g = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / l || !b && (c.style && parseInt(c.style.width, 10) || g && g - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    l = this.ticks,
                    g = this.options.labels,
                    e = this.horiz,
                    p = this.getSlotWidth(),
                    d = Math.max(1, Math.round(p - 2 * (g.padding ||
                        5))),
                    m = {},
                    B = this.labelMetrics(),
                    r = g.style && g.style.textOverflow,
                    f, v, C = 0,
                    u;
                F(g.rotation) || (m.rotation = g.rotation || 0);
                k(c, function (a) {
                    (a = l[a]) && a.label && a.label.textPxLength > C && (C = a.label.textPxLength)
                });
                this.maxLabelLength = C;
                if (this.autoRotation) C > d && C > B.h ? m.rotation = this.labelRotation : this.labelRotation = 0;
                else if (p && (f = d, !r))
                    for (v = "clip", d = c.length; !e && d--;)
                        if (u = c[d], u = l[u].label) u.styles && "ellipsis" === u.styles.textOverflow ? u.css({
                                textOverflow: "clip"
                            }) : u.textPxLength > p && u.css({
                                width: p + "px"
                            }), u.getBBox().height >
                            this.len / c.length - (B.h - B.f) && (u.specificTextOverflow = "ellipsis");
                m.rotation && (f = C > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, r || (v = "ellipsis"));
                if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation)) m.align = this.labelAlign;
                k(c, function (a) {
                    var b = (a = l[a]) && a.label,
                        h = {};
                    b && (b.attr(m), !f || g.style && g.style.width || !(f < b.textPxLength || "SPAN" === b.element.tagName) || (h.width = f, r || (h.textOverflow = b.specificTextOverflow || v), b.css(h)), delete b.specificTextOverflow, a.rotation = m.rotation)
                });
                this.tickRotCorr =
                    b.rotCorr(B.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || n(this.min) && n(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var b = this.chart.renderer,
                    h = this.horiz,
                    c = this.opposite,
                    g = this.options.title,
                    e;
                this.axisTitle || ((e = g.textAlign) || (e = (h ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: c ? "right" : "left",
                    middle: "center",
                    high: c ? "left" : "right"
                })[g.align]), this.axisTitle = b.text(g.text, 0, 0, g.useHTML).attr({
                    zIndex: 7,
                    rotation: g.rotation ||
                        0,
                    align: e
                }).addClass("highcharts-axis-title").add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new G(this, a)
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    l = a.options,
                    g = a.tickPositions,
                    e = a.ticks,
                    p = a.horiz,
                    d = a.side,
                    m = b.inverted && !a.isZAxis ? [1, 0, 3, 2][d] : d,
                    B, r, f = 0,
                    v, C = 0,
                    u = l.title,
                    y = l.labels,
                    G = 0,
                    F = b.axisOffset,
                    b = b.clipOffset,
                    M = [-1, 1, 1, -1][d],
                    t = l.className,
                    q = a.axisParent,
                    x = this.tickSize("tick");
                B = a.hasData();
                a.showAxis = r = B || w(l.showEmpty, !0);
                a.staggerLines = a.horiz && y.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: l.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(q), a.axisGroup = c.g("axis").attr({
                    zIndex: l.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(q), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: y.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t ||
                    "")).add(q));
                B || a.isLinked ? (k(g, function (b, c) {
                    a.generateTick(b, c)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === d || 2 === d || {
                    1: "left",
                    3: "right"
                }[d] === a.labelAlign, w(y.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && k(g, function (a) {
                    G = Math.max(e[a].getLabelSize(), G)
                }), a.staggerLines && (G *= a.staggerLines), a.labelOffset = G * (a.opposite ? -1 : 1)) : H(e, function (a, b) {
                    a.destroy();
                    delete e[b]
                });
                u && u.text && !1 !== u.enabled && (a.addTitle(r), r && !1 !== u.reserveSpace && (a.titleOffset = f = a.axisTitle.getBBox()[p ?
                    "height" : "width"], v = u.offset, C = n(v) ? 0 : w(u.margin, p ? 5 : 10)));
                a.renderLine();
                a.offset = M * w(l.offset, F[d]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
                C = Math.abs(G) + C;
                G && (C = C - c + M * (p ? w(y.y, a.tickRotCorr.y + 8 * M) : y.x));
                a.axisTitleMargin = w(v, C);
                F[d] = Math.max(F[d], a.axisTitleMargin + f + M * a.offset, C, B && g.length && x ? x[0] + M * a.offset : 0);
                l = l.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[m] = Math.max(b[m], l)
            },
            getLinePath: function (a) {
                var b = this.chart,
                    c = this.opposite,
                    h = this.offset,
                    g = this.horiz,
                    e = this.left + (c ? this.width : 0) + h,
                    h = b.chartHeight - this.bottom - (c ? this.height : 0) + h;
                c && (a *= -1);
                return b.renderer.crispLine(["M", g ? this.left : e, g ? h : this.top, "L", g ? b.chartWidth - this.right : e, g ? h : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    g = this.len,
                    e = this.options.title,
                    p = a ? b : c,
                    d = this.opposite,
                    m = this.offset,
                    B = e.x || 0,
                    r = e.y || 0,
                    k = this.axisTitle,
                    f = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, k),
                    k = Math.max(k.getBBox(null, 0).height - f.h - 1, 0),
                    g = {
                        low: p + (a ? 0 : g),
                        middle: p + g / 2,
                        high: p + (a ? g : 0)
                    }[e.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + [-k, k, f.f, -k][this.side];
                return {
                    x: a ? g + B : b + (d ? this.width : 0) + m + B,
                    y: a ? b + r - (d ? this.height : 0) + m : g + r
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && r(this.oldMin),
                    c = this.minorTicks;
                c[a] || (c[a] = new G(this, a, "minor"));
                b && c[a].isNew &&
                    c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var c = this.isLinked,
                    g = this.ticks,
                    h = this.chart.hasRendered && r(this.oldMin);
                if (!c || a >= this.min && a <= this.max) g[a] || (g[a] = new G(this, a)), h && g[a].isNew && g[a].render(b, !0, .1), g[a].render(b)
            },
            render: function () {
                var b = this,
                    c = b.chart,
                    g = b.options,
                    l = b.isLog,
                    p = b.isLinked,
                    d = b.tickPositions,
                    m = b.axisTitle,
                    f = b.ticks,
                    v = b.minorTicks,
                    C = b.alternateBands,
                    u = g.stackLabels,
                    w = g.alternateGridColor,
                    y = b.tickmarkOffset,
                    F = b.axisLine,
                    n = b.showAxis,
                    M = E(c.renderer.globalAnimation),
                    t, q;
                b.labelEdge.length = 0;
                b.overlap = !1;
                k([f, v, C], function (a) {
                    H(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || p) b.minorTickInterval && !b.categories && k(b.getMinorTickPositions(), function (a) {
                    b.renderMinorTick(a)
                }), d.length && (k(d, function (a, c) {
                    b.renderTick(a, c)
                }), y && (0 === b.min || b.single) && (f[-1] || (f[-1] = new G(b, -1, null, !0)), f[-1].render(-1))), w && k(d, function (g, h) {
                    q = void 0 !== d[h + 1] ? d[h + 1] + y : b.max - y;
                    0 === h % 2 && g < b.max && q <= b.max + (c.polar ? -y : y) && (C[g] || (C[g] = new a.PlotLineOrBand(b)), t = g + y, C[g].options = {
                        from: l ?
                            b.lin2log(t) : t,
                        to: l ? b.lin2log(q) : q,
                        color: w
                    }, C[g].render(), C[g].isActive = !0)
                }), b._addedPlotLB || (k((g.plotLines || []).concat(g.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                k([f, v, C], function (a) {
                    var b, g = [],
                        l = M.duration;
                    H(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, g.push(b))
                    });
                    B(function () {
                        for (b = g.length; b--;) a[g[b]] && !a[g[b]].isActive && (a[g[b]].destroy(), delete a[g[b]])
                    }, a !== C && c.hasRendered && l ? l : 0)
                });
                F && (F[F.isPlaced ? "animate" : "attr"]({
                        d: this.getLinePath(F.strokeWidth())
                    }),
                    F.isPlaced = !0, F[n ? "show" : "hide"](!0));
                m && n && (g = b.getTitlePosition(), r(g.y) ? (m[m.isNew ? "attr" : "animate"](g), m.isNew = !1) : (m.attr("y", -9999), m.isNew = !0));
                u && u.enabled && b.renderStackTotals();
                b.isDirty = !1;
                e(this, "afterRender")
            },
            redraw: function () {
                this.visible && (this.render(), k(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                k(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var c = this,
                    g = c.stacks,
                    l = c.plotLinesAndBands,
                    h;
                e(this,
                    "destroy", {
                        keepEvents: a
                    });
                a || p(c);
                H(g, function (a, b) {
                    t(a);
                    g[b] = null
                });
                k([c.ticks, c.minorTicks, c.alternateBands], function (a) {
                    t(a)
                });
                if (l)
                    for (a = l.length; a--;) l[a].destroy();
                k("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    c[a] && (c[a] = c[a].destroy())
                });
                for (h in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[h] = c.plotLinesAndBandsGroups[h].destroy();
                H(c, function (a, g) {
                    -1 === b(g, c.keepProps) && delete c[g]
                })
            },
            drawCrosshair: function (a, b) {
                var c, g = this.crosshair,
                    h = w(g.snap, !0),
                    p, d = this.cross;
                e(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (n(b) || !h)) {
                    h ? n(b) && (p = w(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : p = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    n(p) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : w(b.stackY, b.y)), null, null, null, p) || null);
                    if (!n(c)) {
                        this.hideCrosshair();
                        return
                    }
                    h = this.categories && !this.isRadial;
                    d || (this.cross = d = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" +
                        (h ? "category " : "thin ") + g.className).attr({
                        zIndex: w(g.zIndex, 2)
                    }).add());
                    d.show().attr({
                        d: c
                    });
                    h && !g.width && d.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                e(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = M
    }(L);
    (function (a) {
        var A = a.Axis,
            E = a.getMagnitude,
            D = a.normalizeTickInterval,
            q = a.timeUnits;
        A.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        A.prototype.normalizeTimeTickInterval =
            function (a, d) {
                var f = d || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null]
                ];
                d = f[f.length - 1];
                var x = q[d[0]],
                    t = d[1],
                    k;
                for (k = 0; k < f.length && !(d = f[k], x = q[d[0]], t = d[1], f[k + 1] && a <= (x * t[t.length - 1] + q[f[k + 1][0]]) / 2); k++);
                x === q.year && a < 5 * x && (t = [1, 2, 5]);
                a = D(a / x, t, "year" === d[0] ? Math.max(E(a / x), 1) : 1);
                return {
                    unitRange: x,
                    count: a,
                    unitName: d[0]
                }
            }
    })(L);
    (function (a) {
        var A = a.Axis,
            E = a.getMagnitude,
            D = a.map,
            q = a.normalizeTickInterval,
            f = a.pick;
        A.prototype.getLogTickPositions = function (a, n, x, t) {
            var d = this.options,
                c = this.len,
                e = [];
            t || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), e = this.getLinearTickPositions(a, n, x);
            else if (.08 <= a)
                for (var c = Math.floor(n), y, u, m, b, g, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; c < x + 1 && !g; c++)
                    for (u = d.length, y = 0; y < u && !g; y++) m = this.log2lin(this.lin2log(c) * d[y]), m > n && (!t || b <= x) && void 0 !== b && e.push(b), b > x && (g = !0), b = m;
            else n = this.lin2log(n),
                x = this.lin2log(x), a = t ? this.getMinorTickInterval() : d.tickInterval, a = f("auto" === a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (t ? 5 : 1) * (x - n) / ((t ? c / this.tickPositions.length : c) || 1)), a = q(a, null, E(a)), e = D(this.getLinearTickPositions(a, n, x), this.log2lin), t || (this._minorAutoInterval = a / 5);
            t || (this.tickInterval = a);
            return e
        };
        A.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        A.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(L);
    (function (a, A) {
        var E = a.arrayMax,
            D = a.arrayMin,
            q = a.defined,
            f = a.destroyObjectProperties,
            d = a.each,
            n = a.erase,
            x = a.merge,
            t = a.pick;
        a.PlotLineOrBand = function (a, c) {
            this.axis = a;
            c && (this.options = c, this.id = c.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var d = this,
                    c = d.axis,
                    e = c.horiz,
                    f = d.options,
                    u = f.label,
                    m = d.label,
                    b = f.to,
                    g = f.from,
                    r = f.value,
                    F = q(g) && q(b),
                    n = q(r),
                    v = d.svgElem,
                    H = !v,
                    w = [],
                    p = t(f.zIndex, 0),
                    C = f.events,
                    w = {
                        "class": "highcharts-plot-" + (F ? "band " : "line ") + (f.className || "")
                    },
                    B = {},
                    G = c.chart.renderer,
                    M = F ? "bands" : "lines",
                    h;
                c.isLog && (g = c.log2lin(g), b = c.log2lin(b),
                    r = c.log2lin(r));
                B.zIndex = p;
                M += "-" + p;
                (h = c.plotLinesAndBandsGroups[M]) || (c.plotLinesAndBandsGroups[M] = h = G.g("plot-" + M).attr(B).add());
                H && (d.svgElem = v = G.path().attr(w).add(h));
                if (n) w = c.getPlotLinePath(r, v.strokeWidth());
                else if (F) w = c.getPlotBandPath(g, b, f);
                else return;
                H && w && w.length ? (v.attr({
                    d: w
                }), C && a.objectEach(C, function (a, b) {
                    v.on(b, function (a) {
                        C[b].apply(d, [a])
                    })
                })) : v && (w ? (v.show(), v.animate({
                    d: w
                })) : (v.hide(), m && (d.label = m = m.destroy())));
                u && q(u.text) && w && w.length && 0 < c.width && 0 < c.height && !w.flat ?
                    (u = x({
                        align: e && F && "center",
                        x: e ? !F && 4 : 10,
                        verticalAlign: !e && F && "middle",
                        y: e ? F ? 16 : 10 : F ? 6 : -4,
                        rotation: e && !F && 90
                    }, u), this.renderLabel(u, w, F, p)) : m && m.hide();
                return d
            },
            renderLabel: function (a, c, e, d) {
                var f = this.label,
                    m = this.axis.chart.renderer;
                f || (f = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || "")
                }, f.zIndex = d, this.label = f = m.text(a.text, 0, 0, a.useHTML).attr(f).add());
                d = c.xBounds || [c[1], c[4], e ? c[6] : c[1]];
                c = c.yBounds || [c[2], c[5], e ? c[7] : c[2]];
                e = D(d);
                m = D(c);
                f.align(a, !1, {
                    x: e,
                    y: m,
                    width: E(d) - e,
                    height: E(c) - m
                });
                f.show()
            },
            destroy: function () {
                n(this.axis.plotLinesAndBands, this);
                delete this.axis;
                f(this)
            }
        };
        a.extend(A.prototype, {
            getPlotBandPath: function (a, c) {
                var e = this.getPlotLinePath(c, null, null, !0),
                    d = this.getPlotLinePath(a, null, null, !0),
                    f = [],
                    m = this.horiz,
                    b = 1,
                    g;
                a = a < this.min && c < this.min || a > this.max && c > this.max;
                if (d && e)
                    for (a && (g = d.toString() === e.toString(), b = 0), a = 0; a < d.length; a += 6) m && e[a + 1] === d[a + 1] ? (e[a + 1] += b, e[a + 4] += b) : m || e[a + 2] !== d[a + 2] || (e[a +
                        2] += b, e[a + 5] += b), f.push("M", d[a + 1], d[a + 2], "L", d[a + 4], d[a + 5], e[a + 4], e[a + 5], e[a + 1], e[a + 2], "z"), f.flat = g;
                return f
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function (d, c) {
                var e = (new a.PlotLineOrBand(this, d)).render(),
                    f = this.userOptions;
                e && (c && (f[c] = f[c] || [], f[c].push(d)), this.plotLinesAndBands.push(e));
                return e
            },
            removePlotBandOrLine: function (a) {
                for (var c = this.plotLinesAndBands, e = this.options,
                        f = this.userOptions, u = c.length; u--;) c[u].id === a && c[u].destroy();
                d([e.plotLines || [], f.plotLines || [], e.plotBands || [], f.plotBands || []], function (c) {
                    for (u = c.length; u--;) c[u].id === a && n(c, c[u])
                })
            },
            removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(L, U);
    (function (a) {
        var A = a.each,
            E = a.extend,
            D = a.format,
            q = a.isNumber,
            f = a.map,
            d = a.merge,
            n = a.pick,
            x = a.splat,
            t = a.syncTimeout,
            k = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, e) {
                this.chart = a;
                this.options = e;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = e.split && !a.inverted;
                this.shared = e.shared || this.split
            },
            cleanSplit: function (a) {
                A(this.chart.series, function (c) {
                    var e = c && c.tt;
                    e && (!e.isActive || a ? c.tt = e.destroy() : e.isActive = !1)
                })
            },
            applyFilter: function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        in: "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            in: "SourceGraphic"
                        }]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function () {
                var a = this.chart.renderer,
                    e = this.options;
                this.label || (this.label = this.split ? a.g("tooltip") : a.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                    padding: e.padding,
                    r: e.borderRadius
                }), this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                d(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, d(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function (c,
                e, d, f) {
                var m = this,
                    b = m.now,
                    g = !1 !== m.options.animation && !m.isHidden && (1 < Math.abs(c - b.x) || 1 < Math.abs(e - b.y)),
                    r = m.followPointer || 1 < m.len;
                E(b, {
                    x: g ? (2 * b.x + c) / 3 : c,
                    y: g ? (b.y + e) / 2 : e,
                    anchorX: r ? void 0 : g ? (2 * b.anchorX + d) / 3 : d,
                    anchorY: r ? void 0 : g ? (b.anchorY + f) / 2 : f
                });
                m.getLabel().attr(b);
                g && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    m && m.move(c, e, d, f)
                }, 32))
            },
            hide: function (c) {
                var e = this;
                a.clearTimeout(this.hideTimer);
                c = n(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer =
                    t(function () {
                        e.getLabel()[c ? "fadeOut" : "hide"]();
                        e.isHidden = !0
                    }, c))
            },
            getAnchor: function (a, e) {
                var c, d = this.chart,
                    m = d.inverted,
                    b = d.plotTop,
                    g = d.plotLeft,
                    r = 0,
                    k = 0,
                    n, v;
                a = x(a);
                c = a[0].tooltipPos;
                this.followPointer && e && (void 0 === e.chartX && (e = d.pointer.normalize(e)), c = [e.chartX - d.plotLeft, e.chartY - b]);
                c || (A(a, function (a) {
                    n = a.series.yAxis;
                    v = a.series.xAxis;
                    r += a.plotX + (!m && v ? v.left - g : 0);
                    k += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!m && n ? n.top - b : 0)
                }), r /= a.length, k /= a.length, c = [m ? d.plotWidth - k : r, this.shared &&
                    !m && 1 < a.length && e ? e.chartY - b : m ? d.plotHeight - r : k
                ]);
                return f(c, Math.round)
            },
            getPosition: function (a, e, d) {
                var c = this.chart,
                    m = this.distance,
                    b = {},
                    g = c.inverted && d.h || 0,
                    r, f = ["y", c.chartHeight, e, d.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight],
                    k = ["x", c.chartWidth, a, d.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
                    v = !this.followPointer && n(d.ttBelow, !c.inverted === !!d.negative),
                    H = function (a, c, e, h, d, p) {
                        var l = e < h - m,
                            B = h + m + e < c,
                            f = h - m - e;
                        h += m;
                        if (v && B) b[a] = h;
                        else if (!v && l) b[a] = f;
                        else if (l) b[a] = Math.min(p - e, 0 >
                            f - g ? f : f - g);
                        else if (B) b[a] = Math.max(d, h + g + e > c ? h : h + g);
                        else return !1
                    },
                    w = function (a, c, g, h) {
                        var e;
                        h < m || h > c - m ? e = !1 : b[a] = h < g / 2 ? 1 : h > c - g / 2 ? c - g - 2 : h - g / 2;
                        return e
                    },
                    p = function (a) {
                        var b = f;
                        f = k;
                        k = b;
                        r = a
                    },
                    C = function () {
                        !1 !== H.apply(0, f) ? !1 !== w.apply(0, k) || r || (p(!0), C()) : r ? b.x = b.y = 0 : (p(!0), C())
                    };
                (c.inverted || 1 < this.len) && p();
                C();
                return b
            },
            defaultFormatter: function (a) {
                var c = this.points || x(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(c[0])];
                d = d.concat(a.bodyFormatter(c));
                d.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return d
            },
            refresh: function (c, e) {
                var d, f = this.options,
                    m = c,
                    b, g = {},
                    r = [];
                d = f.formatter || this.defaultFormatter;
                var g = this.shared,
                    k;
                f.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = x(m)[0].series.tooltipOptions.followPointer, b = this.getAnchor(m, e), e = b[0], f = b[1], !g || m.series && m.series.noSharedTooltip ? g = m.getLabelConfig() : (A(m, function (a) {
                    a.setState("hover");
                    r.push(a.getLabelConfig())
                }), g = {
                    x: m[0].category,
                    y: m[0].y
                }, g.points = r, m = m[0]), this.len = r.length, g = d.call(g, this), k = m.series, this.distance = n(k.tooltipOptions.distance,
                    16), !1 === g ? this.hide() : (d = this.getLabel(), this.isHidden && d.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(g, x(c)) : (d.css({
                    width: this.chart.spacingBox.width
                }), d.attr({
                    text: g && g.join ? g.join("") : g
                }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + n(m.colorIndex, k.colorIndex)), this.updatePosition({
                    plotX: e,
                    plotY: f,
                    negative: m.negative,
                    ttBelow: m.ttBelow,
                    h: b[2] || 0
                })), this.isHidden = !1))
            },
            renderSplit: function (c, e) {
                var d = this,
                    f = [],
                    m = this.chart,
                    b = m.renderer,
                    g = !0,
                    r = this.options,
                    k = 0,
                    t = this.getLabel();
                a.isString(c) && (c = [!1, c]);
                A(c.slice(0, e.length + 1), function (a, c) {
                    if (!1 !== a) {
                        c = e[c - 1] || {
                            isHeader: !0,
                            plotX: e[0].plotX
                        };
                        var v = c.series || d,
                            p = v.tt,
                            C = "highcharts-color-" + n(c.colorIndex, (c.series || {}).colorIndex, "none");
                        p || (v.tt = p = b.label(null, null, null, "callout", null, null, r.useHTML).addClass("highcharts-tooltip-box " + C).attr({
                            padding: r.padding,
                            r: r.borderRadius
                        }).add(t));
                        p.isActive = !0;
                        p.attr({
                            text: a
                        });
                        a = p.getBBox();
                        C = a.width + p.strokeWidth();
                        c.isHeader ? (k = a.height, C = Math.max(0, Math.min(c.plotX +
                            m.plotLeft - C / 2, m.chartWidth - C))) : C = c.plotX + m.plotLeft - n(r.distance, 16) - C;
                        0 > C && (g = !1);
                        a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                        a -= m.plotTop;
                        f.push({
                            target: c.isHeader ? m.plotHeight + k : a,
                            rank: c.isHeader ? 1 : 0,
                            size: v.tt.getBBox().height + 1,
                            point: c,
                            x: C,
                            tt: p
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(f, m.plotHeight + k);
                A(f, function (a) {
                    var b = a.point,
                        c = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: g || b.isHeader ? a.x : b.plotX + m.plotLeft + n(r.distance, 16),
                        y: a.pos + m.plotTop,
                        anchorX: b.isHeader ?
                            b.plotX + m.plotLeft : b.plotX + c.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + m.plotTop - 15 : b.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function (a) {
                var c = this.chart,
                    d = this.getLabel(),
                    d = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);
                this.move(Math.round(d.x), Math.round(d.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            },
            getDateFormat: function (a, e, d, f) {
                var c = this.chart.time,
                    b = c.dateFormat("%m-%d %H:%M:%S.%L", e),
                    g, r, u = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    n = "millisecond";
                for (r in k) {
                    if (a ===
                        k.week && +c.dateFormat("%w", e) === d && "00:00:00.000" === b.substr(6)) {
                        r = "week";
                        break
                    }
                    if (k[r] > a) {
                        r = n;
                        break
                    }
                    if (u[r] && b.substr(u[r]) !== "01-01 00:00:00.000".substr(u[r])) break;
                    "week" !== r && (n = r)
                }
                r && (g = f[r]);
                return g
            },
            getXDateFormat: function (a, e, d) {
                e = e.dateTimeLabelFormats;
                var c = d && d.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, d.options.startOfWeek, e) : e.day) || e.year
            },
            tooltipFooterHeaderFormatter: function (a, e) {
                e = e ? "footer" : "header";
                var c = a.series,
                    d = c.tooltipOptions,
                    m = d.xDateFormat,
                    b = c.xAxis,
                    g = b && "datetime" ===
                    b.options.type && q(a.key),
                    f = d[e + "Format"];
                g && !m && (m = this.getXDateFormat(a, d, b));
                g && m && A(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    f = f.replace("{point." + a + "}", "{point." + a + ":" + m + "}")
                });
                return D(f, {
                    point: a,
                    series: c
                }, this.chart.time)
            },
            bodyFormatter: function (a) {
                return f(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(L);
    (function (a) {
        var A = a.addEvent,
            E =
            a.attr,
            D = a.charts,
            q = a.css,
            f = a.defined,
            d = a.each,
            n = a.extend,
            x = a.find,
            t = a.fireEvent,
            k = a.isNumber,
            c = a.isObject,
            e = a.offset,
            y = a.pick,
            u = a.splat,
            m = a.Tooltip;
        a.Pointer = function (a, c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                m && (a.tooltip = new m(a, c.tooltip), this.followTouchMove = y(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function (a) {
                var b = this.chart,
                    c = b.options.chart,
                    d = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (d = y(c.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a && !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            },
            normalize: function (a, c) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = e(this.chart.container));
                return n(a, {
                    chartX: Math.round(b.pageX - c.left),
                    chartY: Math.round(b.pageY - c.top)
                })
            },
            getCoordinates: function (a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                d(this.chart.axes,
                    function (c) {
                        b[c.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: c,
                            value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                        })
                    });
                return b
            },
            findNearestKDPoint: function (a, g, e) {
                var b;
                d(a, function (a) {
                    var d = !(a.noSharedTooltip && g) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(e, d);
                    if ((d = c(a, !0)) && !(d = !c(b, !0))) var d = b.distX - a.distX,
                        m = b.dist - a.dist,
                        f = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex),
                        d = 0 < (0 !== d && g ? d : 0 !== m ? m : 0 !== f ? f : b.series.index > a.series.index ? -1 : 1);
                    d && (b = a)
                });
                return b
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function (a, c) {
                var b = a.series,
                    g = b.xAxis,
                    b = b.yAxis,
                    d = y(a.clientX, a.plotX),
                    e = a.shapeArgs;
                if (g && b) return c ? {
                    chartX: g.len + g.pos - d,
                    chartY: b.len + b.pos - a.plotY
                } : {
                    chartX: d + g.pos,
                    chartY: a.plotY + b.pos
                };
                if (e && e.x && e.y) return {
                    chartX: e.x,
                    chartY: e.y
                }
            },
            getHoverData: function (b, g, e, m, f, v, k) {
                var r, p = [],
                    C = k && k.isBoosting;
                m = !(!m || !b);
                k = g && !g.stickyTracking ? [g] : a.grep(e, function (a) {
                    return a.visible &&
                        !(!f && a.directTouch) && y(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                g = (r = m ? b : this.findNearestKDPoint(k, f, v)) && r.series;
                r && (f && !g.noSharedTooltip ? (k = a.grep(e, function (a) {
                    return a.visible && !(!f && a.directTouch) && y(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), d(k, function (a) {
                    var b = x(a.points, function (a) {
                        return a.x === r.x && !a.isNull
                    });
                    c(b) && (C && (b = a.getPoint(b)), p.push(b))
                })) : p.push(r));
                return {
                    hoverPoint: r,
                    hoverSeries: g,
                    hoverPoints: p
                }
            },
            runPointActions: function (b, c) {
                var g = this.chart,
                    e = g.tooltip && g.tooltip.options.enabled ? g.tooltip : void 0,
                    m = e ? e.shared : !1,
                    f = c || g.hoverPoint,
                    k = f && f.series || g.hoverSeries,
                    k = this.getHoverData(f, k, g.series, !!c || k && k.directTouch && this.isDirectTouch, m, b, {
                        isBoosting: g.isBoosting
                    }),
                    w, f = k.hoverPoint;
                w = k.hoverPoints;
                c = (k = k.hoverSeries) && k.tooltipOptions.followPointer;
                m = m && k && !k.noSharedTooltip;
                if (f && (f !== g.hoverPoint || e && e.isHidden)) {
                    d(g.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, w) && b.setState()
                    });
                    d(w || [], function (a) {
                        a.setState("hover")
                    });
                    if (g.hoverSeries !==
                        k) k.onMouseOver();
                    g.hoverPoint && g.hoverPoint.firePointEvent("mouseOut");
                    if (!f.series) return;
                    f.firePointEvent("mouseOver");
                    g.hoverPoints = w;
                    g.hoverPoint = f;
                    e && e.refresh(m ? w : f, b)
                } else c && e && !e.isHidden && (f = e.getAnchor([{}], b), e.updatePosition({
                    plotX: f[0],
                    plotY: f[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = A(g.container.ownerDocument, "mousemove", function (b) {
                    var c = D[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                d(g.axes, function (c) {
                    var g = y(c.crosshair.snap, !0),
                        e = g ? a.find(w, function (a) {
                            return a.series[c.coll] ===
                                c
                        }) : void 0;
                    e || !g ? c.drawCrosshair(b, e) : c.hideCrosshair()
                })
            },
            reset: function (a, c) {
                var b = this.chart,
                    g = b.hoverSeries,
                    e = b.hoverPoint,
                    m = b.hoverPoints,
                    f = b.tooltip,
                    k = f && f.shared ? m : e;
                a && k && d(u(k), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) f && k && (f.refresh(k), e && (e.setState(e.state, !0), d(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, e)
                })));
                else {
                    if (e) e.onMouseOut();
                    m && d(m, function (a) {
                        a.setState()
                    });
                    if (g) g.onMouseOut();
                    f && f.hide(c);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    d(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            },
            scaleGroups: function (a, c) {
                var b = this.chart,
                    g;
                d(b.series, function (e) {
                    g = a || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(g), e.markerGroup && (e.markerGroup.attr(g), e.markerGroup.clip(c ? b.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(g))
                });
                b.clipRect.attr(c || b.clipBox)
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = a.chartX,
                    d = a.chartY,
                    m = this.zoomHor,
                    f = this.zoomVert,
                    k = b.plotLeft,
                    p = b.plotTop,
                    C = b.plotWidth,
                    B = b.plotHeight,
                    u, n = this.selectionMarker,
                    h = this.mouseDownX,
                    z = this.mouseDownY,
                    t = c.panKey && a[c.panKey + "Key"];
                n && n.touch || (e < k ? e = k : e > k + C && (e = k + C), d < p ? d = p : d > p + B && (d = p + B), this.hasDragged = Math.sqrt(Math.pow(h - e, 2) + Math.pow(z - d, 2)), 10 < this.hasDragged && (u = b.isInsidePlot(h - k, z - p), b.hasCartesianSeries && (this.zoomX || this.zoomY) &&
                    u && !t && !n && (this.selectionMarker = n = b.renderer.rect(k, p, m ? 1 : C, f ? 1 : B, 0).attr({
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), n && m && (e -= h, n.attr({
                        width: Math.abs(e),
                        x: (0 < e ? 0 : e) + h
                    })), n && f && (e = d - z, n.attr({
                        height: Math.abs(e),
                        y: (0 < e ? 0 : e) + z
                    })), u && !n && c.panning && b.pan(a, c.panning)))
            },
            drop: function (a) {
                var b = this,
                    c = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var m = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        v = this.selectionMarker,
                        u = v.attr ? v.attr("x") : v.x,
                        w = v.attr ? v.attr("y") : v.y,
                        p = v.attr ? v.attr("width") :
                        v.width,
                        C = v.attr ? v.attr("height") : v.height,
                        B;
                    if (this.hasDragged || e) d(c.axes, function (c) {
                        if (c.zoomEnabled && f(c.min) && (e || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[c.coll]])) {
                            var g = c.horiz,
                                h = "touchend" === a.type ? c.minPixelPadding : 0,
                                d = c.toValue((g ? u : w) + h),
                                g = c.toValue((g ? u + p : w + C) - h);
                            m[c.coll].push({
                                axis: c,
                                min: Math.min(d, g),
                                max: Math.max(d, g)
                            });
                            B = !0
                        }
                    }), B && t(c, "selection", m, function (a) {
                        c.zoom(n(a, e ? {
                            animation: !1
                        } : null))
                    });
                    k(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    e && this.scaleGroups()
                }
                c && k(c.index) &&
                    (q(c.container, {
                        cursor: c._cursor
                    }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function (b) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function (a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") ||
                    b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (b) {
                var c = D[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (b) {
                var c = this.chart;
                f(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX -
                    c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function (a, c) {
                for (var b; a;) {
                    if (b = E(a, "class")) {
                        if (-1 !== b.indexOf(c)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    e = b.plotLeft,
                    d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (t(c.series, "click", n(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (n(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - d) && t(b, "click", a)))
            },
            setDOMEvents: function () {
                var b = this,
                    c = b.chart.container,
                    e = c.ownerDocument;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = A(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = A(e, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = A(e, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) {
                    b[c] = null
                })
            }
        }
    })(L);
    (function (a) {
        var A = a.charts,
            E = a.each,
            D = a.extend,
            q = a.map,
            f = a.noop,
            d = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function (a, d, f, k, c, e) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, f, k, c, e);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, f, k,
                    c, e)
            },
            pinchTranslateDirection: function (a, d, f, k, c, e, q, u) {
                var m = this.chart,
                    b = a ? "x" : "y",
                    g = a ? "X" : "Y",
                    r = "chart" + g,
                    n = a ? "width" : "height",
                    t = m["plot" + (a ? "Left" : "Top")],
                    v, y, w = u || 1,
                    p = m.inverted,
                    C = m.bounds[a ? "h" : "v"],
                    B = 1 === d.length,
                    G = d[0][r],
                    M = f[0][r],
                    h = !B && d[1][r],
                    z = !B && f[1][r],
                    x;
                f = function () {
                    !B && 20 < Math.abs(G - h) && (w = u || Math.abs(M - z) / Math.abs(G - h));
                    y = (t - M) / w + G;
                    v = m["plot" + (a ? "Width" : "Height")] / w
                };
                f();
                d = y;
                d < C.min ? (d = C.min, x = !0) : d + v > C.max && (d = C.max - v, x = !0);
                x ? (M -= .8 * (M - q[b][0]), B || (z -= .8 * (z - q[b][1])), f()) : q[b] = [M, z];
                p || (e[b] = y - t, e[n] = v);
                e = p ? 1 / w : w;
                c[n] = v;
                c[b] = d;
                k[p ? a ? "scaleY" : "scaleX" : "scale" + g] = w;
                k["translate" + g] = e * t + (M - e * G)
            },
            pinch: function (a) {
                var n = this,
                    t = n.chart,
                    k = n.pinchDown,
                    c = a.touches,
                    e = c.length,
                    y = n.lastValidTouch,
                    u = n.hasZoom,
                    m = n.selectionMarker,
                    b = {},
                    g = 1 === e && (n.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || n.runChartClick),
                    r = {};
                1 < e && (n.initiated = !0);
                u && n.initiated && !g && a.preventDefault();
                q(c, function (a) {
                    return n.normalize(a)
                });
                "touchstart" === a.type ? (E(c, function (a, b) {
                    k[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), y.x = [k[0].chartX, k[1] && k[1].chartX], y.y = [k[0].chartY, k[1] && k[1].chartY], E(t.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = t.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            g = a.toPixels(d(a.options.min, a.dataMin)),
                            e = a.toPixels(d(a.options.max, a.dataMax)),
                            p = Math.max(g, e);
                        b.min = Math.min(a.pos, Math.min(g, e) - c);
                        b.max = Math.max(a.pos + a.len, p + c)
                    }
                }), n.res = !0) : n.followTouchMove && 1 === e ? this.runPointActions(n.normalize(a)) : k.length && (m || (n.selectionMarker = m = D({
                    destroy: f,
                    touch: !0
                }, t.plotBox)), n.pinchTranslate(k,
                    c, b, m, r, y), n.hasPinched = u, n.scaleGroups(b, r), n.res && (n.res = !1, this.reset(!1, 0)))
            },
            touch: function (f, q) {
                var n = this.chart,
                    k, c;
                if (n.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = n.index;
                1 === f.touches.length ? (f = this.normalize(f), (c = n.isInsidePlot(f.chartX - n.plotLeft, f.chartY - n.plotTop)) && !n.openMenu ? (q && this.runPointActions(f), "touchmove" === f.type && (q = this.pinchDown, k = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - f.chartX, 2) + Math.pow(q[0].chartY - f.chartY, 2)) : !1), d(k, !0) && this.pinch(f)) : q && this.reset()) : 2 === f.touches.length && this.pinch(f)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (d) {
                A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.charts,
            D = a.css,
            q = a.doc,
            f = a.extend,
            d = a.noop,
            n = a.Pointer,
            x = a.removeEvent,
            t = a.win,
            k = a.wrap;
        if (!a.hasTouch && (t.PointerEvent || t.MSPointerEvent)) {
            var c = {},
                e = !!t.PointerEvent,
                y = function () {
                    var e = [];
                    e.item = function (a) {
                        return this[a]
                    };
                    a.objectEach(c, function (a) {
                        e.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return e
                },
                u = function (c, b, g, e) {
                    "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !E[a.hoverChartIndex] || (e(c), e = E[a.hoverChartIndex].pointer, e[b]({
                        type: g,
                        target: c.currentTarget,
                        preventDefault: d,
                        touches: y()
                    }))
                };
            f(n.prototype, {
                onContainerPointerDown: function (a) {
                    u(a, "onContainerTouchStart", "touchstart", function (a) {
                        c[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (a) {
                    u(a, "onContainerTouchMove", "touchmove", function (a) {
                        c[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        c[a.pointerId].target || (c[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    u(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete c[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(q, e ?
                        "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            k(n.prototype, "init", function (a, b, c) {
                a.call(this, b, c);
                this.hasZoom && D(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            k(n.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
            });
            k(n.prototype, "destroy", function (a) {
                this.batchMSEvents(x);
                a.call(this)
            })
        }
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.css,
            D = a.discardElement,
            q = a.defined,
            f = a.each,
            d = a.fireEvent,
            n = a.isFirefox,
            x = a.marginNames,
            t = a.merge,
            k = a.pick,
            c = a.setAnimation,
            e = a.stableSort,
            y = a.win,
            u = a.wrap;
        a.Legend = function (a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), A(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var b = k(a.padding, 8);
                this.options = a;
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = k(a.symbolWidth, 16);
                this.pages = []
            },
            update: function (a, b) {
                var c = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                k(b, !0) && c.redraw();
                d(this, "afterUpdate")
            },
            colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                d(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            },
            positionItem: function (a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    e = a._legendItemPos,
                    d = e[0],
                    e = e[1],
                    f = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? d : this.legendWidth - d - 2 * c - 4, e);
                f && (f.x = d, f.y = e)
            },
            destroyItem: function (a) {
                var b =
                    a.checkbox;
                f(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && D(a.checkbox)
            },
            destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                f(this.getAllItems(), function (b) {
                    f(["legendItem", "legendGroup"], a, b)
                });
                f("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
                    b, c = this.clipHeight || this.legendHeight,
                    e = this.titleHeight;
                a && (b = a.translateY,
                    f(this.allItems, function (g) {
                        var d = g.checkbox,
                            f;
                        d && (f = b + e + d.y + (this.scrollOffset || 0) + 3, E(d, {
                            left: a.translateX + g.checkboxOffset + d.x - 20 + "px",
                            top: f + "px",
                            display: f > b - 6 && f < b + c - 6 ? "" : "none"
                        }))
                    }, this))
            },
            renderTitle: function () {
                var a = this.options,
                    b = this.padding,
                    c = a.title,
                    e = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).add(this.group)), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            },
            setText: function (c) {
                var b = this.options;
                c.legendItem.attr({
                    text: b.labelFormat ? a.format(b.labelFormat, c, this.chart.time) : b.labelFormatter.call(c)
                })
            },
            renderItem: function (a) {
                var b = this.chart,
                    c = b.renderer,
                    e = this.options,
                    d = this.symbolWidth,
                    f = e.symbolPadding,
                    m = "horizontal" === e.layout ? k(e.itemDistance, 20) : 0,
                    u = !e.rtl,
                    w = a.legendItem,
                    p = !a.series,
                    C = !p && a.series.drawLegendSymbol ? a.series : a,
                    B = C.options,
                    B = this.createCheckboxForItem && B && B.showCheckbox,
                    m = d + f + m + (B ? 20 : 0),
                    n = e.useHTML,
                    q = a.options.className;
                w || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + C.type + "-series highcharts-color-" + a.colorIndex + (q ? " " + q : "") + (p ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = w = c.text("", u ? d + f : -f, this.baseline || 0, n).attr({
                    align: u ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(12, w), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, w.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, C.drawLegendSymbol(this,
                    a), this.setItemEvents && this.setItemEvents(a, w, n), B && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                w.css({
                    width: (e.itemWidth || e.width || b.spacingBox.width) - m
                });
                this.setText(a);
                b = w.getBBox();
                a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + m;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function (a) {
                var b = this.options,
                    c = this.padding,
                    e = "horizontal" === b.layout,
                    d = a.itemHeight,
                    f = b.itemMarginBottom || 0,
                    m = this.itemMarginTop,
                    u = e ? k(b.itemDistance, 20) : 0,
                    w = b.width,
                    p = w || this.chart.spacingBox.width - 2 * c - b.x,
                    b = b.alignColumns && this.totalItemWidth > p ? this.maxItemWidth : a.itemWidth;
                e && this.itemX - c + b > p && (this.itemX = c, this.itemY += m + this.lastLineHeight + f, this.lastLineHeight = 0);
                this.lastItemY = m + this.itemY + f;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += b : (this.itemY += m + d + f, this.lastLineHeight =
                    d);
                this.offsetWidth = w || Math.max((e ? this.itemX - c - (a.checkbox ? 0 : u) : b) + c, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                f(this.chart.series, function (b) {
                    var c = b && b.options;
                    b && k(c.showInLegend, q(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                d(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function () {
                var a = this.options;
                return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function (a, b) {
                var c = this.chart,
                    e = this.options,
                    d = this.getAlignment();
                d && f([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (g, f) {
                    g.test(d) && !q(a[f]) && (c[x[f]] = Math.max(c[x[f]], c.legend[(f + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][f] * e[f % 2 ? "x" : "y"] + k(e.margin, 12) + b[f] + (0 === f && void 0 !== c.options.title.margin ? c.titleOffset + c.options.title.margin : 0)))
                })
            },
            render: function () {
                var a = this.chart,
                    b = a.renderer,
                    c = this.group,
                    d, k, u, v, n = this.box,
                    w = this.options,
                    p = this.padding;
                this.itemX = p;
                this.itemY = this.initialItemY;
                this.lastItemY =
                    this.offsetWidth = 0;
                c || (this.group = c = b.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(c), this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                d = this.getAllItems();
                e(d, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                w.reversed && d.reverse();
                this.allItems = d;
                this.display = k = !!d.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                f(d, this.renderItem, this);
                f(d, this.layoutItem, this);
                u = (w.width || this.offsetWidth) + p;
                v = this.lastItemY + this.lastLineHeight + this.titleHeight;
                v = this.handleOverflow(v);
                v += p;
                n || (this.box = n = b.rect().addClass("highcharts-legend-box").attr({
                    r: w.borderRadius
                }).add(c), n.isNew = !0);
                0 < u && 0 < v && (n[n.isNew ? "attr" : "animate"](n.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: u,
                    height: v
                }, n.strokeWidth())), n.isNew = !1);
                n[k ? "show" : "hide"]();
                "none" === c.getStyle("display") && (u = v = 0);
                this.legendWidth = u;
                this.legendHeight = v;
                f(d, this.positionItem, this);
                k && (b = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) &&
                    (b = t(b, {
                        y: b.y + a.titleOffset + a.options.title.margin
                    })), c.align(t(w, {
                        width: u,
                        height: v
                    }), !0, b));
                a.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function (a) {
                var b = this,
                    c = this.chart,
                    e = c.renderer,
                    d = this.options,
                    m = d.y,
                    u = this.padding,
                    c = c.spacingBox.height + ("top" === d.verticalAlign ? -m : m) - u,
                    m = d.maxHeight,
                    n, w = this.clipRect,
                    p = d.navigation,
                    C = k(p.animation, !0),
                    B = p.arrowSize || 12,
                    G = this.nav,
                    q = this.pages,
                    h, z = this.allItems,
                    t = function (a) {
                        "number" === typeof a ? w.attr({
                            height: a
                        }) : w && (b.clipRect = w.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + u + "px,9999px," + (u + a) + "px,0)" : "auto")
                    };
                "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (c /= 2);
                m && (c = Math.min(c, m));
                q.length = 0;
                a > c && !1 !== p.enabled ? (this.clipHeight = n = Math.max(c - 20 - this.titleHeight - u, 0), this.currentPage = k(this.currentPage, 1), this.fullHeight = a, f(z, function (a, b) {
                    var c = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        d = q.length;
                    if (!d || c - q[d - 1] > n && (h || c) !== q[d - 1]) q.push(h || c), d++;
                    a.pageIx = d - 1;
                    h &&
                        (z[b - 1].pageIx = d - 1);
                    b === z.length - 1 && c + e - q[d - 1] > n && (q.push(c), a.pageIx = d);
                    c !== h && (h = c)
                }), w || (w = b.clipRect = e.clipRect(0, u, 9999, 0), b.contentGroup.clip(w)), t(n), G || (this.nav = G = e.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = e.symbol("triangle", 0, 0, B, B).on("click", function () {
                    b.scroll(-1, C)
                }).add(G), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").add(G), this.down = e.symbol("triangle-down", 0, 0, B, B).on("click", function () {
                    b.scroll(1, C)
                }).add(G)), b.scroll(0), a = c) : G && (t(), this.nav = G.destroy(),
                    this.scrollGroup.attr({
                        translateY: 1
                    }), this.clipHeight = 0);
                return a
            },
            scroll: function (a, b) {
                var e = this.pages,
                    d = e.length;
                a = this.currentPage + a;
                var f = this.clipHeight,
                    m = this.pager,
                    k = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== b && c(b, this.chart), this.nav.attr({
                    translateX: k,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), m.attr({
                    text: a + "/" + d
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a ===
                        d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.scrollOffset = -e[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, b) {
                var c = a.symbolHeight,
                    e = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(e ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, e ? c : a.symbolWidth, c, k(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function (a) {
                var b = this.options.marker,
                    c, e = a.symbolWidth,
                    d = a.symbolHeight;
                c = d / 2;
                var f = this.chart.renderer,
                    m = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                this.legendLine = f.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr({}).add(m);
                b && !1 !== b.enabled && (c = Math.min(k(b.radius, c), c), 0 === this.symbol.indexOf("url") && (b = t(b, {
                    width: d,
                    height: d
                }), c = 0), this.legendSymbol = b = f.symbol(this.symbol, e / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(m), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(y.navigator.userAgent) ||
            n) && u(a.Legend.prototype, "positionItem", function (a, b) {
            var c = this,
                e = function () {
                    b._legendItemPos && a.call(c, b)
                };
            e();
            setTimeout(e)
        })
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.animObject,
            D = a.attr,
            q = a.doc,
            f = a.Axis,
            d = a.createElement,
            n = a.defaultOptions,
            x = a.discardElement,
            t = a.charts,
            k = a.defined,
            c = a.each,
            e = a.extend,
            y = a.find,
            u = a.fireEvent,
            m = a.grep,
            b = a.isNumber,
            g = a.isObject,
            r = a.isString,
            F = a.Legend,
            J = a.marginNames,
            v = a.merge,
            H = a.objectEach,
            w = a.Pointer,
            p = a.pick,
            C = a.pInt,
            B = a.removeEvent,
            G = a.seriesTypes,
            M = a.splat,
            h =
            a.syncTimeout,
            z = a.win,
            K = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new K(a, b, c)
        };
        e(K.prototype, {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (r(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function (b, c) {
                var e, d, h = b.series,
                    l = b.plotOptions || {};
                u(this, "init", {
                    args: arguments
                }, function () {
                    b.series = null;
                    e = v(n, b);
                    for (d in e.plotOptions) e.plotOptions[d].tooltip = l[d] && v(l[d].tooltip) || void 0;
                    e.tooltip.userOptions = b.chart &&
                        b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    e.series = b.series = h;
                    this.userOptions = b;
                    var g = e.chart,
                        p = g.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = c;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && a.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.hasCartesianSeries = g.showAxes;
                    var f = this;
                    f.index = t.length;
                    t.push(f);
                    a.chartCount++;
                    p && H(p, function (a, b) {
                        A(f, b, a)
                    });
                    f.xAxis = [];
                    f.yAxis = [];
                    f.pointCount = f.colorCounter =
                        f.symbolCounter = 0;
                    u(f, "afterInit");
                    f.firstRender()
                })
            },
            initSeries: function (b) {
                var c = this.options.chart;
                (c = G[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function (a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (b) {
                u(this, "beforeRedraw");
                var d = this.axes,
                    h = this.series,
                    g = this.pointer,
                    l = this.legend,
                    p = this.isDirtyLegend,
                    f, B, k = this.hasCartesianSeries,
                    m = this.isDirtyBox,
                    C, n = this.renderer,
                    w = n.isHidden(),
                    v = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                w && this.temporaryDisplay();
                this.layOutTitles();
                for (b = h.length; b--;)
                    if (C = h[b], C.options.stacking && (f = !0, C.isDirty)) {
                        B = !0;
                        break
                    }
                if (B)
                    for (b = h.length; b--;) C = h[b], C.options.stacking && (C.isDirty = !0);
                c(h, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), p = !0);
                    a.isDirtyData && u(a, "updatedData")
                });
                p && l.options.enabled && (l.render(), this.isDirtyLegend = !1);
                f && this.getStacks();
                k && c(d, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                k && (c(d, function (a) {
                    a.isDirty && (m = !0)
                }), c(d, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, v.push(function () {
                        u(a, "afterSetExtremes", e(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (m || f) && a.redraw()
                }));
                m && this.drawChartBox();
                u(this, "predraw");
                c(h, function (a) {
                    (m || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                n.draw();
                u(this, "redraw");
                u(this, "render");
                w && this.temporaryDisplay(!0);
                c(v, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                var c, e = this.series,
                    d;
                c = y(this.axes, b) || y(this.series, b);
                for (d = 0; !c && d < e.length; d++) c = y(e[d].points || [], b);
                return c
            },
            getAxes: function () {
                var a = this,
                    b = this.options,
                    e = b.xAxis = M(b.xAxis || {}),
                    b = b.yAxis = M(b.yAxis || {});
                u(this, "getAxes");
                c(e, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                c(b, function (a, b) {
                    a.index = b
                });
                e = e.concat(b);
                c(e, function (b) {
                    new f(a,
                        b)
                });
                u(this, "afterGetAxes")
            },
            getSelectedPoints: function () {
                var a = [];
                c(this.series, function (b) {
                    a = a.concat(m(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return m(this.series, function (a) {
                    return a.selected
                })
            },
            setTitle: function (a, b, e) {
                var d = this,
                    h = d.options,
                    g;
                g = h.title = v(h.title, a);
                h = h.subtitle = v(h.subtitle, b);
                c([
                    ["title", a, g],
                    ["subtitle", b, h]
                ], function (a, b) {
                    var c = a[0],
                        e = d[c],
                        h = a[1];
                    a = a[2];
                    e && h && (d[c] = e = e.destroy());
                    a && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    })
                });
                d.layOutTitles(e)
            },
            layOutTitles: function (a) {
                var b = 0,
                    d, h = this.renderer,
                    g = this.spacingBox;
                c(["title", "subtitle"], function (a) {
                    var c = this[a],
                        d = this.options[a];
                    a = "title" === a ? -3 : d.verticalAlign ? 0 : b + 2;
                    var l;
                    c && (l = h.fontMetrics(l, c).b, c.css({
                        width: (d.width || g.width + d.widthAdjust) + "px"
                    }).align(e({
                        y: a + l
                    }, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + c.getBBox(d.useHTML).height)))
                }, this);
                d =
                    this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && d && (this.isDirtyBox = this.isDirtyLegend = d, this.hasRendered && p(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    e = this.renderTo;
                k(c) || (this.containerWidth = a.getStyle(e, "width"));
                k(b) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight :
                    400))
            },
            temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (q.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        q.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, q.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                                display: c.style.display,
                                height: c.style.height,
                                overflow: c.style.overflow
                            }, b = {
                                display: "block",
                                overflow: "hidden"
                            }, c !==
                            this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === q.body) break
                    }
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function () {
                var c, e = this.options,
                    h = e.chart,
                    g, p;
                c = this.renderTo;
                var f = a.uniqueKey(),
                    B;
                c || (this.renderTo = c = h.renderTo);
                r(c) && (this.renderTo = c = q.getElementById(c));
                c || a.error(13, !0);
                g = C(D(c, "data-highcharts-chart"));
                b(g) && t[g] && t[g].hasRendered && t[g].destroy();
                D(c, "data-highcharts-chart",
                    this.index);
                c.innerHTML = "";
                h.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                g = this.chartWidth;
                p = this.chartHeight;
                this.container = c = d("div", {
                    id: f
                }, void 0, c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[h.renderer] || a.Renderer)(c, g, p, null, h.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(h.className);
                for (B in e.defs) this.renderer.definition(e.defs[B]);
                this.renderer.chartIndex = this.index;
                u(this, "afterGetContainer")
            },
            getMargins: function (a) {
                var b = this.spacing,
                    c = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !k(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    e = a.margin;
                a.hasCartesianSeries && c(a.axes, function (a) {
                    a.visible &&
                        a.getOffset()
                });
                c(J, function (c, d) {
                    k(e[d]) || (a[c] += b[d])
                });
                a.setChartSize()
            },
            reflow: function (b) {
                var c = this,
                    e = c.options.chart,
                    d = c.renderTo,
                    g = k(e.width) && k(e.height),
                    l = e.width || a.getStyle(d, "width"),
                    e = e.height || a.getStyle(d, "height"),
                    d = b ? b.target : z;
                if (!g && !c.isPrinting && l && e && (d === z || d === q)) {
                    if (l !== c.containerWidth || e !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = h(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = l;
                    c.containerHeight = e
                }
            },
            setReflow: function (a) {
                var b =
                    this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = A(z, "resize", function (a) {
                    b.reflow(a)
                }), A(this, "destroy", this.unbindReflow))
            },
            setSize: function (b, e, d) {
                var g = this,
                    l = g.renderer;
                g.isResizing += 1;
                a.setAnimation(d, g);
                g.oldChartHeight = g.chartHeight;
                g.oldChartWidth = g.chartWidth;
                void 0 !== b && (g.options.chart.width = b);
                void 0 !== e && (g.options.chart.height = e);
                g.getChartSize();
                g.setChartSize(!0);
                l.setSize(g.chartWidth, g.chartHeight, d);
                c(g.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                g.isDirtyLegend = !0;
                g.isDirtyBox = !0;
                g.layOutTitles();
                g.getMargins();
                g.redraw(d);
                g.oldChartHeight = null;
                u(g, "resize");
                h(function () {
                    g && u(g, "endResize", null, function () {
                        --g.isResizing
                    })
                }, E(void 0).duration)
            },
            setChartSize: function (a) {
                var b = this.inverted,
                    e = this.renderer,
                    d = this.chartWidth,
                    h = this.chartHeight,
                    g = this.options.chart,
                    l = this.spacing,
                    p = this.clipOffset,
                    f, B, k, m;
                this.plotLeft = f = Math.round(this.plotLeft);
                this.plotTop = B = Math.round(this.plotTop);
                this.plotWidth = k = Math.max(0, Math.round(d -
                    f - this.marginRight));
                this.plotHeight = m = Math.max(0, Math.round(h - B - this.marginBottom));
                this.plotSizeX = b ? m : k;
                this.plotSizeY = b ? k : m;
                this.plotBorderWidth = g.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = {
                    x: l[3],
                    y: l[0],
                    width: d - l[3] - l[1],
                    height: h - l[0] - l[2]
                };
                this.plotBox = e.plotBox = {
                    x: f,
                    y: B,
                    width: k,
                    height: m
                };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, p[3]) / 2);
                e = Math.ceil(Math.max(d, p[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(d, p[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY -
                        Math.max(d, p[2]) / 2 - e))
                };
                a || c(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                u(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                c(["margin", "spacing"], function (e) {
                    var d = b[e],
                        h = g(d) ? d : [d, d, d, d];
                    c(["Top", "Right", "Bottom", "Left"], function (c, d) {
                        a[e][d] = p(b[e + c], h[d])
                    })
                });
                c(J, function (b, c) {
                    a[b] = p(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    d = this.chartBackground,
                    h = this.plotBackground,
                    g = this.plotBorder,
                    p, f, B = this.plotLeft,
                    k = this.plotTop,
                    m = this.plotWidth,
                    C = this.plotHeight,
                    n = this.plotBox,
                    w = this.clipRect,
                    v = this.clipBox,
                    r = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), r = "attr");
                p = f = d.strokeWidth();
                d[r]({
                    x: f / 2,
                    y: f / 2,
                    width: c - f - p % 2,
                    height: e - f - p % 2,
                    r: a.borderRadius
                });
                r = "animate";
                h || (r = "attr", this.plotBackground = h = b.rect().addClass("highcharts-plot-background").add());
                h[r](n);
                w ? w.animate({
                    width: v.width,
                    height: v.height
                }) : this.clipRect = b.clipRect(v);
                r = "animate";
                g || (r = "attr", this.plotBorder = g = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                g[r](g.crisp({
                    x: B,
                    y: k,
                    width: m,
                    height: C
                }, -g.strokeWidth()));
                this.isDirtyBox = !1;
                u(this, "afterDrawChartBox")
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    e, d = a.options.series,
                    h, g;
                c(["inverted", "angular", "polar"], function (c) {
                    e = G[b.type || b.defaultSeriesType];
                    g = b[c] || e && e.prototype[c];
                    for (h = d && d.length; !g && h--;)(e = G[d[h].type]) && e.prototype[c] &&
                        (g = !0);
                    a[c] = g
                })
            },
            linkSeries: function () {
                var a = this,
                    b = a.series;
                c(b, function (a) {
                    a.linkedSeries.length = 0
                });
                c(b, function (b) {
                    var c = b.options.linkedTo;
                    r(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = p(b.options.visible, c.options.visible, b.visible))
                });
                u(this, "afterLinkSeries")
            },
            renderSeries: function () {
                c(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && c(b.items,
                    function (c) {
                        var d = e(b.style, c.style),
                            h = C(d.left) + a.plotLeft,
                            g = C(d.top) + a.plotTop + 12;
                        delete d.left;
                        delete d.top;
                        a.renderer.text(c.html, h, g).attr({
                            zIndex: 2
                        }).css(d).add()
                    })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    e = this.options,
                    d, h, g;
                this.setTitle();
                this.legend = new F(this, e.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                e = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                c(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                h = 1.1 < e / this.plotWidth;
                g = 1.05 < d / this.plotHeight;
                if (h || g) c(a, function (a) {
                    (a.horiz && h || !a.horiz && g) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && c(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b = this;
                a = v(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits =
                    this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        a.href && (z.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }).add().align(a.position), this.credits.update = function (a) {
                        b.credits = b.credits.destroy();
                        b.addCredits(a)
                    })
            },
            destroy: function () {
                var b = this,
                    e = b.axes,
                    d = b.series,
                    h = b.container,
                    g, p = h && h.parentNode;
                u(b, "destroy");
                b.renderer.forExport ? a.erase(t, b) : t[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                B(b);
                for (g = e.length; g--;) e[g] = e[g].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (g = d.length; g--;) d[g] = d[g].destroy();
                c("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                h && (h.innerHTML = "", B(h), p && x(h));
                H(b, function (a, c) {
                    delete b[c]
                })
            },
            firstRender: function () {
                var a = this,
                    b = a.options;
                if (!a.isReadyToRender ||
                    a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    c(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    u(a, "beforeRender");
                    w && (a.pointer = new w(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function () {
                c([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                u(this, "load");
                u(this, "render");
                k(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.Chart,
            D = a.each;
        A(E, "afterSetChartSize", function (q) {
            var f = this.options.chart.scrollablePlotArea;
            if (f = f && f.minWidth)
                if (this.scrollablePixels = f = Math.max(0, f - this.chartWidth)) this.plotWidth += f, this.clipBox.width += f, q.skipAxes || D(this.axes, function (d) {
                    1 === d.side ? d.getPlotLinePath = function () {
                        var f = this.right,
                            q;
                        this.right = f - d.chart.scrollablePixels;
                        q = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this.right = f;
                        return q
                    } : (d.setAxisSize(), d.setAxisTranslation())
                })
        });
        A(E, "render", function () {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        E.prototype.setUpScrolling = function () {
            this.scrollingContainer = a.createElement("div", {
                className: "highcharts-scrolling"
            }, {
                overflowX: "auto",
                WebkitOverflowScrolling: "touch"
            }, this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling =
                null
        };
        E.prototype.applyFixed = function () {
            var q = this.container,
                f, d;
            this.fixedDiv || (this.fixedDiv = a.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer = f = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = f.path().attr({
                    fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(),
                a.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title"], function (d) {
                    a.each(q.querySelectorAll(d), function (a) {
                        f.box.appendChild(a);
                        a.style.pointerEvents = "auto"
                    })
                }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            d = this.chartWidth + this.scrollablePixels;
            this.container.style.width = d + "px";
            this.renderer.boxWrapper.attr({
                width: d,
                height: this.chartHeight,
                viewBox: [0, 0, d, this.chartHeight].join(" ")
            });
            d = this.options.chart.scrollablePlotArea;
            d.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * d.scrollPositionX);
            var n = this.axisOffset;
            d = this.plotTop - n[0] - 1;
            var n = this.plotTop + this.plotHeight + n[2],
                x = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, d, "L", this.plotLeft - 1, d, "L", this.plotLeft - 1, n, "L", 0, n, "Z", "M", x, d, "L", this.chartWidth, d, "L", this.chartWidth,
                    n, "L", x, n, "Z"
                ] : ["M", 0, 0]
            })
        }
    })(L);
    (function (a) {
        var A, E = a.each,
            D = a.extend,
            q = a.erase,
            f = a.fireEvent,
            d = a.format,
            n = a.isArray,
            x = a.isNumber,
            t = a.pick,
            k = a.removeEvent;
        a.Point = A = function () {};
        a.Point.prototype = {
            init: function (a, e, d) {
                var c = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(e, d);
                a.options.colorByPoint ? (e = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : e = a.colorIndex;
                this.colorIndex = t(this.colorIndex, e);
                a.chart.pointCount++;
                f(this, "afterInit");
                return this
            },
            applyOptions: function (a,
                e) {
                var c = this.series,
                    d = c.options.pointValKey || c.pointValKey;
                a = A.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ? D(this.options, a) : a;
                a.group && delete this.group;
                d && (this.y = this[d]);
                this.isNull = t(this.isValid && !this.isValid(), null === this.x || !x(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === e && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                void 0 === this.x && c && (this.x = void 0 === e ? c.autoIncrement(this) : e);
                return this
            },
            setNestedProperty: function (c,
                e, d) {
                d = d.split(".");
                a.reduce(d, function (c, d, b, g) {
                    c[d] = g.length - 1 === b ? e : a.isObject(c[d], !0) ? c[d] : {};
                    return c[d]
                }, c);
                return c
            },
            optionsToObject: function (c) {
                var e = {},
                    d = this.series,
                    f = d.options.keys,
                    k = f || d.pointArrayMap || ["y"],
                    b = k.length,
                    g = 0,
                    r = 0;
                if (x(c) || null === c) e[k[0]] = c;
                else if (n(c))
                    for (!f && c.length > b && (d = typeof c[0], "string" === d ? e.name = c[0] : "number" === d && (e.x = c[0]), g++); r < b;) f && void 0 === c[g] || (0 < k[r].indexOf(".") ? a.Point.prototype.setNestedProperty(e, c[g], k[r]) : e[k[r]] = c[g]), g++, r++;
                else "object" ===
                    typeof c && (e = c, c.dataLabels && (d._hasPointLabels = !0), c.marker && (d._hasPointMarkers = !0));
                return e
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function () {
                var a =
                    this.series,
                    d = a.zones,
                    a = a.zoneAxis || "y",
                    f = 0,
                    k;
                for (k = d[f]; this[a] >= k.value;) k = d[++f];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = k && k.color && !this.options.color ? k.color : this.nonZonedColor;
                return k
            },
            destroy: function () {
                var a = this.series.chart,
                    d = a.hoverPoints,
                    f;
                a.pointCount--;
                d && (this.setState(), q(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) k(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (f in this) this[f] = null
            },
            destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, f = 6; f--;) d = a[f], this[d] && (this[d] = this[d].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var c = this.series,
                    f = c.tooltipOptions,
                    k = t(f.valueDecimals, ""),
                    m = f.valuePrefix || "",
                    b = f.valueSuffix || "";
                E(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (m || b) a = a.replace(RegExp(c + "}", "g"), m + c + "}" + b);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + k + "f}")
                });
                return d(a, {
                    point: this,
                    series: this.series
                }, c.chart.time)
            },
            firePointEvent: function (a, d, k) {
                var c = this,
                    e = this.series.options;
                (e.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (k = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                f(this, a, d, k)
            },
            visible: !0
        }
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.animObject,
            D = a.arrayMax,
            q = a.arrayMin,
            f = a.correctFloat,
            d = a.defaultOptions,
            n = a.defined,
            x = a.each,
            t = a.erase,
            k = a.extend,
            c = a.fireEvent,
            e = a.grep,
            y = a.isArray,
            u = a.isNumber,
            m = a.isString,
            b = a.merge,
            g = a.objectEach,
            r = a.pick,
            F = a.removeEvent,
            J = a.splat,
            v = a.SVGElement,
            H = a.syncTimeout,
            w = a.win;
        a.Series = a.seriesType("line", null, {
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var d = this,
                    e, f = a.series,
                    h;
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                k(d, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                g(e, function (a, b) {
                    A(d, b, a)
                });
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                x(d.parallelArrays, function (a) {
                    d[a + "Data"] = []
                });
                d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (h = f[f.length - 1]);
                d._i = r(h && h._i, -1) + 1;
                a.orderSeries(this.insert(f));
                c(this, "afterInit")
            },
            insert: function (a) {
                var b = this.options.index,
                    c;
                if (u(b)) {
                    for (c = a.length; c--;)
                        if (b >= r(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return r(c, a.length - 1)
            },
            bindAxes: function () {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                x(b.axisTypes || [], function (g) {
                    x(d[g], function (a) {
                        e = a.options;
                        if (c[g] === e.index ||
                            void 0 !== c[g] && c[g] === e.id || void 0 === c[g] && 0 === e.index) b.insert(a.series), b[g] = a, a.isDirty = !0
                    });
                    b[g] || b.optionalAxis === g || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series,
                    d = arguments,
                    e = u(b) ? function (d) {
                        var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = e
                    } : function (a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                x(c.parallelArrays, e)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    e = this.chart.time,
                    b = r(b, a.pointStart,
                        0);
                this.pointInterval = c = r(this.pointInterval, a.pointInterval, 1);
                d && (a = new e.Date(b), "day" === d ? e.set("Date", a, e.get("Date", a) + c) : "month" === d ? e.set("Month", a, e.get("Month", a) + c) : "year" === d && e.set("FullYear", a, e.get("FullYear", a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var e = this.chart,
                    g = e.options,
                    f = g.plotOptions,
                    p = (e.userOptions || {}).plotOptions || {},
                    h = f[this.type];
                this.userOptions = a;
                e = b(h, f.series, a);
                this.tooltipOptions = b(d.tooltip, d.plotOptions.series && d.plotOptions.series.tooltip,
                    d.plotOptions[this.type].tooltip, g.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, a.tooltip);
                this.stickyTracking = r(a.stickyTracking, p[this.type] && p[this.type].stickyTracking, p.series && p.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                null === h.marker && delete e.marker;
                this.zoneAxis = e.zoneAxis;
                a = this.zones = (e.zones || []).slice();
                !e.negativeColor && !e.negativeFillColor || e.zones || a.push({
                    value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                    className: "highcharts-negative"
                });
                a.length && n(a[a.length - 1].value) && a.push({});
                c(this, "afterSetOptions", {
                    options: e
                });
                return e
            },
            getName: function () {
                return this.name || "Series " + (this.index + 1)
            },
            getCyclic: function (a, b, c) {
                var d, e = this.chart,
                    g = this.userOptions,
                    f = a + "Index",
                    p = a + "Counter",
                    l = c ? c.length : r(e.options.chart[a + "Count"], e[a + "Count"]);
                b || (d = r(g[f], g["_" + f]), n(d) || (e.series.length || (e[p] = 0), g["_" + f] = d = e[p] % l, e[p] += 1), c && (b = c[d]));
                void 0 !== d && (this[f] = d);
                this[a] = b
            },
            getColor: function () {
                this.getCyclic("color")
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function (b) {
                var c = this.options,
                    d = this.points,
                    e = [],
                    g, h, f, p = this.requireSorting;
                x(b, function (b) {
                    var h;
                    h = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b).x;
                    u(h) && (h = a.inArray(h, this.xData, f), -1 === h ? e.push(b) : b !== c.data[h] ? (d[h].update(b, !1, null, !1), d[h].touched = !0, p && (f = h)) : d[h] && (d[h].touched = !0), g = !0)
                }, this);
                if (g)
                    for (b = d.length; b--;) h = d[b], h.touched || h.remove(!1), h.touched = !1;
                else if (b.length === d.length) x(b, function (a, b) {
                    d[b].update && a !== c.data[b] && d[b].update(a, !1, null, !1)
                });
                else return !1;
                x(e, function (a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function (b, c, d, e) {
                var g = this,
                    h = g.points,
                    f = h && h.length || 0,
                    p, l = g.options,
                    k = g.chart,
                    B = null,
                    C = g.xAxis,
                    w = l.turboThreshold,
                    n = this.xData,
                    v = this.yData,
                    q = (p = g.pointArrayMap) && p.length,
                    t;
                b = b || [];
                p = b.length;
                c = r(c, !0);
                !1 !== e && p && f && !g.cropped && !g.hasGroupedData && g.visible &&
                    (t = this.updateData(b));
                if (!t) {
                    g.xIncrement = null;
                    g.colorCounter = 0;
                    x(this.parallelArrays, function (a) {
                        g[a + "Data"].length = 0
                    });
                    if (w && p > w) {
                        for (d = 0; null === B && d < p;) B = b[d], d++;
                        if (u(B))
                            for (d = 0; d < p; d++) n[d] = this.autoIncrement(), v[d] = b[d];
                        else if (y(B))
                            if (q)
                                for (d = 0; d < p; d++) B = b[d], n[d] = B[0], v[d] = B.slice(1, q + 1);
                            else
                                for (d = 0; d < p; d++) B = b[d], n[d] = B[0], v[d] = B[1];
                        else a.error(12)
                    } else
                        for (d = 0; d < p; d++) void 0 !== b[d] && (B = {
                            series: g
                        }, g.pointClass.prototype.applyOptions.apply(B, [b[d]]), g.updateParallelArrays(B, d));
                    v && m(v[0]) &&
                        a.error(14, !0);
                    g.data = [];
                    g.options.data = g.userOptions.data = b;
                    for (d = f; d--;) h[d] && h[d].destroy && h[d].destroy();
                    C && (C.minRange = C.userMinRange);
                    g.isDirty = k.isDirtyBox = !0;
                    g.isDirtyData = !!h;
                    d = !1
                }
                "point" === l.legendType && (this.processData(), this.generatePoints());
                c && k.redraw(d)
            },
            processData: function (b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    g;
                g = 0;
                var h, f, p = this.xAxis,
                    l, k = this.options;
                l = k.cropThreshold;
                var m = this.getExtremesFromAll || k.getExtremesFromAll,
                    w = this.isCartesian,
                    k = p && p.val2lin,
                    n = p && p.isLog,
                    v = this.requireSorting,
                    u, r;
                if (w && !this.isDirty && !p.isDirty && !this.yAxis.isDirty && !b) return !1;
                p && (b = p.getExtremes(), u = b.min, r = b.max);
                if (w && this.sorted && !m && (!l || e > l || this.forceCrop))
                    if (c[e - 1] < u || c[0] > r) c = [], d = [];
                    else if (c[0] < u || c[e - 1] > r) g = this.cropData(this.xData, this.yData, u, r), c = g.xData, d = g.yData, g = g.start, h = !0;
                for (l = c.length || 1; --l;) e = n ? k(c[l]) - k(c[l - 1]) : c[l] - c[l - 1], 0 < e && (void 0 === f || e < f) ? f = e : 0 > e && v && (a.error(15), v = !1);
                this.cropped = h;
                this.cropStart = g;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange =
                    f
            },
            cropData: function (a, b, c, d, e) {
                var g = a.length,
                    f = 0,
                    p = g,
                    l;
                e = r(e, this.cropShoulder, 1);
                for (l = 0; l < g; l++)
                    if (a[l] >= c) {
                        f = Math.max(0, l - e);
                        break
                    }
                for (c = l; c < g; c++)
                    if (a[c] > d) {
                        p = c + e;
                        break
                    }
                return {
                    xData: a.slice(f, p),
                    yData: b.slice(f, p),
                    start: f,
                    end: p
                }
            },
            generatePoints: function () {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    d, e = this.processedXData,
                    g = this.processedYData,
                    f = this.pointClass,
                    k = e.length,
                    l = this.cropStart || 0,
                    m, w = this.hasGroupedData,
                    a = a.keys,
                    v, n = [],
                    u;
                c || w || (c = [], c.length = b.length, c = this.data = c);
                a && w && (this.options.keys = !1);
                for (u = 0; u < k; u++) m = l + u, w ? (v = (new f).init(this, [e[u]].concat(J(g[u]))), v.dataGroup = this.groupMap[u]) : (v = c[m]) || void 0 === b[m] || (c[m] = v = (new f).init(this, b[m], e[u])), v && (v.index = m, n[u] = v);
                this.options.keys = a;
                if (c && (k !== (d = c.length) || w))
                    for (u = 0; u < d; u++) u !== l || w || (u += k), c[u] && (c[u].destroyElements(), c[u].plotX = void 0);
                this.data = c;
                this.points = n
            },
            getExtremes: function (a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    d, e = [],
                    g = 0;
                d = this.xAxis.getExtremes();
                var f = d.min,
                    p = d.max,
                    l, k, m = this.requireSorting ? 1 : 0,
                    v, w;
                a =
                    a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (w = 0; w < d; w++)
                    if (k = c[w], v = a[w], l = (u(v, !0) || y(v)) && (!b.positiveValuesOnly || v.length || 0 < v), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[w + m] || k) >= f && (c[w - m] || k) <= p, l && k)
                        if (l = v.length)
                            for (; l--;) "number" === typeof v[l] && (e[g++] = v[l]);
                        else e[g++] = v;
                this.dataMin = q(e);
                this.dataMax = D(e)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    e =
                    d.categories,
                    g = this.yAxis,
                    h = this.points,
                    k = h.length,
                    m = !!this.modifyValue,
                    l = a.pointPlacement,
                    v = "between" === l || u(l),
                    w = a.threshold,
                    q = a.startFromThreshold ? w : 0,
                    t, H, y, x, F = Number.MAX_VALUE;
                "between" === l && (l = .5);
                u(l) && (l *= r(a.pointRange || d.pointRange));
                for (a = 0; a < k; a++) {
                    var J = h[a],
                        A = J.x,
                        D = J.y;
                    H = J.low;
                    var E = b && g.stacks[(this.negStacks && D < (q ? 0 : w) ? "-" : "") + this.stackKey],
                        L;
                    g.positiveValuesOnly && null !== D && 0 >= D && (J.isNull = !0);
                    J.plotX = t = f(Math.min(Math.max(-1E5, d.translate(A, 0, 0, 0, 1, l, "flags" === this.type)), 1E5));
                    b && this.visible && !J.isNull && E && E[A] && (x = this.getStackIndicator(x, A, this.index), L = E[A], D = L.points[x.key], H = D[0], D = D[1], H === q && x.key === E[A].base && (H = r(u(w) && w, g.min)), g.positiveValuesOnly && 0 >= H && (H = null), J.total = J.stackTotal = L.total, J.percentage = L.total && J.y / L.total * 100, J.stackY = D, L.setOffset(this.pointXOffset || 0, this.barW || 0));
                    J.yBottom = n(H) ? Math.min(Math.max(-1E5, g.translate(H, 0, 1, 0, 1)), 1E5) : null;
                    m && (D = this.modifyValue(D, J));
                    J.plotY = H = "number" === typeof D && Infinity !== D ? Math.min(Math.max(-1E5, g.translate(D,
                        0, 1, 0, 1)), 1E5) : void 0;
                    J.isInside = void 0 !== H && 0 <= H && H <= g.len && 0 <= t && t <= d.len;
                    J.clientX = v ? f(d.translate(A, 0, 0, 0, 1, l)) : t;
                    J.negative = J.y < (w || 0);
                    J.category = e && void 0 !== e[J.x] ? e[J.x] : J.x;
                    J.isNull || (void 0 !== y && (F = Math.min(F, Math.abs(t - y))), y = t);
                    J.zone = this.zones.length && J.getZone()
                }
                this.closestPointRangePx = F;
                c(this, "afterTranslate")
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return e(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b =
                    this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    g = this.clipBox,
                    f = g || b.clipBox,
                    p = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(),
                    l = b[p],
                    k = b[p + "m"];
                l || (a && (f.width = 0, e && (f.x = b.plotSizeX), b[p + "m"] = k = d.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[p] = l = d.clipRect(f), l.count = {
                    length: 0
                });
                a && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || g ? l : b.clipRect), this.markerGroup.clip(k),
                    this.sharedClipKey = p);
                a || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && p && b[p] && (g || (b[p] = b[p].destroy()), b[p + "m"] && (b[p + "m"] = b[p + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = E(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: 0
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                c(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, d, e, g, f = this.options.marker,
                    k, l, m, w = this[this.specialGroup] || this.markerGroup,
                    v, u = r(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) d = a[c], g = d.graphic, k = d.marker || {}, l = !!d.marker, e = u && void 0 === k.enabled || k.enabled, m = d.isInside, e && !d.isNull ? (e = r(k.symbol, this.symbol), v = this.markerAttribs(d, d.selected && "select"), g ? g[m ? "show" : "hide"](!0).animate(v) :
                        m && (0 < v.width || d.hasImage) && (d.graphic = g = b.renderer.symbol(e, v.x, v.y, v.width, v.height, l ? k : f).add(w)), g && g.addClass(d.getClassName(), !0)) : g && (d.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a.marker || {},
                    e = d.symbol || c.symbol,
                    g = r(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], g = r(b && b.radius, c && c.radius, g + (c && c.radiusPlus || 0)));
                a.hasImage = e && 0 === e.indexOf("url");
                a.hasImage && (g = 0);
                a = {
                    x: Math.floor(a.plotX) - g,
                    y: a.plotY - g
                };
                g && (a.width = a.height = 2 * g);
                return a
            },
            destroy: function () {
                var b = this,
                    d = b.chart,
                    e = /AppleWebKit\/533/.test(w.navigator.userAgent),
                    f, k, h = b.data || [],
                    m, u;
                c(b, "destroy");
                F(b);
                x(b.axisTypes || [], function (a) {
                    (u = b[a]) && u.series && (t(u.series, b), u.isDirty = u.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (k = h.length; k--;)(m = h[k]) && m.destroy && m.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                g(b, function (a, b) {
                    a instanceof v && !a.survive && (f = e && "group" === b ? "hide" : "destroy", a[f]())
                });
                d.hoverSeries === b && (d.hoverSeries = null);
                t(d.series, b);
                d.orderSeries();
                g(b, function (a, c) {
                    delete b[c]
                })
            },
            getGraphPath: function (a, b, c) {
                var d = this,
                    e = d.options,
                    g = e.step,
                    f, p = [],
                    l = [],
                    k;
                a = a || d.points;
                (f = a.reversed) && a.reverse();
                (g = {
                    right: 1,
                    center: 2
                }[g] || g && 3) && f && (g = 4 - g);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                x(a, function (h, f) {
                    var m = h.plotX,
                        v = h.plotY,
                        w = a[f - 1];
                    (h.leftCliff || w && w.rightCliff) && !c && (k = !0);
                    h.isNull && !n(b) && 0 < f ? k = !e.connectNulls : h.isNull && !b ? k = !0 : (0 === f || k ? f = ["M", h.plotX, h.plotY] : d.getPointSpline ? f = d.getPointSpline(a, h, f) :
                        g ? (f = 1 === g ? ["L", w.plotX, v] : 2 === g ? ["L", (w.plotX + m) / 2, w.plotY, "L", (w.plotX + m) / 2, v] : ["L", m, w.plotY], f.push("L", m, v)) : f = ["L", m, v], l.push(h.x), g && (l.push(h.x), 2 === g && l.push(h.x)), p.push.apply(p, f), k = !1)
                });
                p.xMap = l;
                return d.graphPath = p
            },
            drawGraph: function () {
                var a = this,
                    b = (this.gappedPath || this.getGraphPath).call(this),
                    c = [
                        ["graph", "highcharts-graph"]
                    ],
                    c = a.getZonesGraphs(c);
                x(c, function (c, d) {
                    d = c[0];
                    var e = a[d];
                    e ? (e.endX = a.preventGraphAnimation ? null : b.xMap, e.animate({
                        d: b
                    })) : b.length && (a[d] = a.chart.renderer.path(b).addClass(c[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    e && (e.startX = b.xMap, e.isArea = b.isArea)
                })
            },
            getZonesGraphs: function (a) {
                x(this.zones, function (b, c) {
                    a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")])
                }, this);
                return a
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    e, g, f = this.clips || [],
                    k, l = this.graph,
                    m = this.area,
                    v = Math.max(b.chartWidth, b.chartHeight),
                    w = this[(this.zoneAxis || "y") + "Axis"],
                    u, n, q = b.inverted,
                    t, H, y, F, J = !1;
                d.length && (l || m) && w && void 0 !== w.min && (n = w.reversed, t = w.horiz, l && !this.showLine &&
                    l.hide(), m && m.hide(), u = w.getExtremes(), x(d, function (d, h) {
                        e = n ? t ? b.plotWidth : 0 : t ? 0 : w.toPixels(u.min);
                        e = Math.min(Math.max(r(g, e), 0), v);
                        g = Math.min(Math.max(Math.round(w.toPixels(r(d.value, u.max), !0)), 0), v);
                        J && (e = g = w.toPixels(u.max));
                        H = Math.abs(e - g);
                        y = Math.min(e, g);
                        F = Math.max(e, g);
                        w.isXAxis ? (k = {
                            x: q ? F : y,
                            y: 0,
                            width: H,
                            height: v
                        }, t || (k.x = b.plotHeight - k.x)) : (k = {
                            x: 0,
                            y: q ? F : y,
                            width: v,
                            height: H
                        }, t && (k.y = b.plotWidth - k.y));
                        f[h] ? f[h].animate(k) : (f[h] = c.clipRect(k), l && a["zone-graph-" + h].clip(f[h]), m && a["zone-area-" + h].clip(f[h]));
                        J = d.value > u.max;
                        a.resetZones && 0 === g && (g = void 0)
                    }), this.clips = f)
            },
            invertGroups: function (a) {
                function b() {
                    x(["group", "markerGroup"], function (b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    e;
                c.xAxis && (e = A(d, "resize", b), A(c, "destroy", e), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d, e) {
                var g = this[a],
                    f = !g;
                f && (this[a] = g = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(e));
                g.addClass("highcharts-" +
                    b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (n(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                g.attr({
                    visibility: c
                })[f ? "attr" : "animate"](this.getPlotBox());
                return g
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a =
                    this,
                    b = a.chart,
                    d, e = a.options,
                    g = !!a.animate && b.renderer.isSVG && E(e.animation).duration,
                    h = a.visible ? "inherit" : "hidden",
                    f = e.zIndex,
                    k = a.hasRendered,
                    l = b.seriesGroup,
                    m = b.inverted;
                d = a.plotGroup("group", "series", h, f, l);
                a.markerGroup = a.plotGroup("markerGroup", "markers", h, f, l);
                g && a.animate(!0);
                d.inverted = a.isCartesian ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                !1 === e.clip || a.sharedClipKey || k || d.clip(b.clipRect);
                g && a.animate();
                k || (a.animationTimeout = H(function () {
                    a.afterAnimate()
                }, g));
                a.isDirty = !1;
                a.hasRendered = !0;
                c(a, "afterRender")
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: r(d && d.left, a.plotLeft),
                    translateY: r(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX",
                "plotY"
            ],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, e) {
                    var g, h;
                    if (h = c && c.length) return g = b.kdAxisArray[d % e], c.sort(function (a, b) {
                        return a[g] - b[g]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0, h), d + 1, e),
                        right: a(c.slice(h + 1), d + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ?
                    2 : 1;
                delete b.kdTree;
                H(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, h, k) {
                    var l = b.point,
                        m = d.kdAxisArray[h % k],
                        p, w, v = l;
                    w = n(a[e]) && n(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
                    p = n(a[g]) && n(l[g]) ? Math.pow(a[g] - l[g], 2) : null;
                    p = (w || 0) + (p || 0);
                    l.dist = n(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    l.distX = n(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                    m = a[m] - l[m];
                    p = 0 > m ? "left" : "right";
                    w = 0 > m ? "right" : "left";
                    b[p] && (p = c(a, b[p], h + 1, k), v = p[f] < v[f] ?
                        p : l);
                    b[w] && Math.sqrt(m * m) < v[f] && (a = c(a, b[w], h + 1, k), v = a[f] < v[f] ? a : v);
                    return v
                }
                var d = this,
                    e = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    f = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(L);
    (function (a) {
        var A = a.Axis,
            E = a.Chart,
            D = a.correctFloat,
            q = a.defined,
            f = a.destroyObjectProperties,
            d = a.each,
            n = a.format,
            x = a.objectEach,
            t = a.pick,
            k = a.Series;
        a.StackItem = function (a, d, f, k, m) {
            var b = a.chart.inverted;
            this.axis = a;
            this.isNegative = f;
            this.options = d;
            this.x = k;
            this.total = null;
            this.points = {};
            this.stack = m;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: d.align || (b ? f ? "left" : "right" : "center"),
                verticalAlign: d.verticalAlign || (b ? "middle" : f ? "bottom" : "top"),
                y: t(d.y, b ? 4 : f ? 14 : -6),
                x: t(d.x, b ? f ? -6 : 6 : 0)
            };
            this.textAlign = d.textAlign || (b ? f ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                f(this, this.axis)
            },
            render: function (a) {
                var c = this.axis.chart,
                    d = this.options,
                    f = d.format,
                    f = f ? n(f, this, c.time) :
                    d.formatter.call(this);
                this.label ? this.label.attr({
                    text: f,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(f, null, null, d.useHTML).css(d.style).attr({
                    align: this.textAlign,
                    rotation: d.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function (a, d) {
                var c = this.axis,
                    e = c.chart,
                    f = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    b = c.translate(0),
                    b = Math.abs(f - b);
                a = e.xAxis[0].translate(this.x) + a;
                c = this.getStackBox(e, this, a, f, d, b, c);
                if (d = this.label) d.align(this.alignOptions, null, c), c = d.alignAttr, d[!1 === this.options.crop ||
                    e.isInsidePlot(c.x, c.y) ? "show" : "hide"](!0)
            },
            getStackBox: function (a, d, f, k, m, b, g) {
                var c = d.axis.reversed,
                    e = a.inverted;
                a = g.height + g.pos - a.plotTop;
                d = d.isNegative && !c || !d.isNegative && c;
                return {
                    x: e ? d ? k : k - b : f,
                    y: e ? a - f - m : d ? a - k - b : a - k,
                    width: e ? b : m,
                    height: e ? m : b
                }
            }
        };
        E.prototype.getStacks = function () {
            var a = this;
            d(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            d(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + t(c.options.stack,
                    ""))
            })
        };
        A.prototype.buildStacks = function () {
            var a = this.series,
                d = t(this.options.reversedStacks, !0),
                f = a.length,
                k;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (k = f; k--;) a[d ? k : f - k - 1].setStackedPoints();
                for (k = 0; k < f; k++) a[k].modifyStacks()
            }
        };
        A.prototype.renderStackTotals = function () {
            var a = this.chart,
                d = a.renderer,
                f = this.stacks,
                k = this.stackTotalGroup;
            k || (this.stackTotalGroup = k = d.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            k.translate(a.plotLeft, a.plotTop);
            x(f, function (a) {
                x(a, function (a) {
                    a.render(k)
                })
            })
        };
        A.prototype.resetStacks = function () {
            var a = this,
                d = a.stacks;
            a.isXAxis || x(d, function (c) {
                x(c, function (d, e) {
                    d.touched < a.stacksTouched ? (d.destroy(), delete c[e]) : (d.total = null, d.cumulative = null)
                })
            })
        };
        A.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), x(a, function (a) {
                x(a, function (a) {
                    a.cumulative = a.total
                })
            }))
        };
        k.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var c = this.processedXData,
                    d = this.processedYData,
                    f = [],
                    k = d.length,
                    m = this.options,
                    b = m.threshold,
                    g = t(m.startFromThreshold && b, 0),
                    n = m.stack,
                    m = m.stacking,
                    x = this.stackKey,
                    J = "-" + x,
                    v = this.negStacks,
                    H = this.yAxis,
                    w = H.stacks,
                    p = H.oldStacks,
                    C, B, G, A, h, z, K;
                H.stacksTouched += 1;
                for (h = 0; h < k; h++) z = c[h], K = d[h], C = this.getStackIndicator(C, z, this.index), A = C.key, G = (B = v && K < (g ? 0 : b)) ? J : x, w[G] || (w[G] = {}), w[G][z] || (p[G] && p[G][z] ? (w[G][z] = p[G][z], w[G][z].total = null) : w[G][z] = new a.StackItem(H, H.options.stackLabels, B, z, n)), G = w[G][z], null !== K ? (G.points[A] = G.points[this.index] = [t(G.cumulative, g)], q(G.cumulative) || (G.base = A), G.touched = H.stacksTouched, 0 < C.index && !1 === this.singleStacks && (G.points[A][0] = G.points[this.index + "," + z + ",0"][0])) : G.points[A] = G.points[this.index] = null, "percent" === m ? (B = B ? x : J, v && w[B] && w[B][z] ? (B = w[B][z], G.total = B.total = Math.max(B.total, G.total) + Math.abs(K) || 0) : G.total = D(G.total + (Math.abs(K) || 0))) : G.total = D(G.total + (K || 0)), G.cumulative = t(G.cumulative, g) + (K || 0), null !== K && (G.points[A].push(G.cumulative), f[h] = G.cumulative);
                "percent" === m && (H.usePercentage = !0);
                this.stackedYData = f;
                H.oldStacks = {}
            }
        };
        k.prototype.modifyStacks = function () {
            var a = this,
                e = a.stackKey,
                f = a.yAxis.stacks,
                k = a.processedXData,
                m, b = a.options.stacking;
            a[b + "Stacker"] && d([e, "-" + e], function (c) {
                for (var d = k.length, e, g; d--;)
                    if (e = k[d], m = a.getStackIndicator(m, e, a.index, c), g = (e = f[c] && f[c][e]) && e.points[m.key]) a[b + "Stacker"](g, e, d)
            })
        };
        k.prototype.percentStacker = function (a, d, f) {
            d = d.total ? 100 / d.total : 0;
            a[0] = D(a[0] * d);
            a[1] = D(a[1] * d);
            this.stackedYData[f] = a[1]
        };
        k.prototype.getStackIndicator = function (a,
            d, f, k) {
            !q(a) || a.x !== d || k && a.key !== k ? a = {
                x: d,
                index: 0,
                key: k
            } : a.index++;
            a.key = [f, d, a.index].join();
            return a
        }
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.Axis,
            D = a.createElement,
            q = a.css,
            f = a.defined,
            d = a.each,
            n = a.erase,
            x = a.extend,
            t = a.fireEvent,
            k = a.inArray,
            c = a.isNumber,
            e = a.isObject,
            y = a.isArray,
            u = a.merge,
            m = a.objectEach,
            b = a.pick,
            g = a.Point,
            r = a.Series,
            F = a.seriesTypes,
            J = a.setAnimation,
            v = a.splat;
        x(a.Chart.prototype, {
            addSeries: function (a, c, d) {
                var e, g = this;
                a && (c = b(c, !0), t(g, "addSeries", {
                    options: a
                }, function () {
                    e = g.initSeries(a);
                    g.isDirtyLegend = !0;
                    g.linkSeries();
                    t(g, "afterAddSeries");
                    c && g.redraw(d)
                }));
                return e
            },
            addAxis: function (a, c, d, e) {
                var g = c ? "xAxis" : "yAxis",
                    f = this.options;
                a = u(a, {
                    index: this[g].length,
                    isX: c
                });
                c = new E(this, a);
                f[g] = v(f[g] || {});
                f[g].push(a);
                b(d, !0) && this.redraw(e);
                return c
            },
            showLoading: function (a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = function () {
                        d && q(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = D("div", {
                        className: "highcharts-loading highcharts-loading-hidden"
                    },
                    null, b.container), b.loadingSpan = D("span", {
                    className: "highcharts-loading-inner"
                }, null, d), A(b, "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                b.loadingShown = !0;
                e()
            },
            hideLoading: function () {
                var a = this.loadingDiv;
                a && (a.className = "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function (a, e, g, n) {
                var p = this,
                    w = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    r = a.chart,
                    h, q, H = [];
                t(p, "update", {
                    options: a
                });
                if (r) {
                    u(!0, p.options.chart, r);
                    "className" in r && p.setClassName(r.className);
                    "reflow" in r && p.setReflow(r.reflow);
                    if ("inverted" in r || "polar" in r) p.propFromSeries(), h = !0;
                    "alignTicks" in r && (h = !0);
                    m(r, function (a, b) {
                        -1 !== k("chart." +
                            b, p.propsRequireUpdateSeries) && (q = !0); - 1 !== k(b, p.propsRequireDirtyBox) && (p.isDirtyBox = !0)
                    })
                }
                a.plotOptions && u(!0, this.options.plotOptions, a.plotOptions);
                m(a, function (a, b) {
                    if (p[b] && "function" === typeof p[b].update) p[b].update(a, !1);
                    else if ("function" === typeof p[w[b]]) p[w[b]](a);
                    "chart" !== b && -1 !== k(b, p.propsRequireUpdateSeries) && (q = !0)
                });
                d("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (d(v(a[b]), function (a, c) {
                        (c = f(a.id) && p.get(a.id) || p[b][c]) && c.coll === b && (c.update(a, !1), g && (c.touched = !0));
                        if (!c && g)
                            if ("series" === b) p.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) p.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), g && d(p[b], function (a) {
                        a.touched ? delete a.touched : H.push(a)
                    }))
                });
                d(H, function (a) {
                    a.remove(!1)
                });
                h && d(p.axes, function (a) {
                    a.update({}, !1)
                });
                q && d(p.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && u(!0, p.options.loading, a.loading);
                h = r && r.width;
                r = r && r.height;
                c(h) && h !== p.chartWidth || c(r) && r !== p.chartHeight ? p.setSize(h, r, n) : b(e, !0) && p.redraw(n)
            },
            setSubtitle: function (a) {
                this.setTitle(void 0,
                    a)
            }
        });
        x(g.prototype, {
            update: function (a, c, d, g) {
                function f() {
                    k.applyOptions(a);
                    null === k.y && h && (k.graphic = h.destroy());
                    e(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol && (k.graphic = h.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()), k.connector && (k.connector = k.connector.destroy()));
                    m = k.index;
                    p.updateParallelArrays(k, m);
                    l.data[m] = e(l.data[m], !0) || e(a, !0) ? k.options : b(a, l.data[m]);
                    p.isDirty = p.isDirtyData = !0;
                    !p.fixedBox && p.hasCartesianSeries && (v.isDirtyBox = !0);
                    "point" ===
                    l.legendType && (v.isDirtyLegend = !0);
                    c && v.redraw(d)
                }
                var k = this,
                    p = k.series,
                    h = k.graphic,
                    m, v = p.chart,
                    l = p.options;
                c = b(c, !0);
                !1 === g ? f() : k.firePointEvent("update", {
                    options: a
                }, f)
            },
            remove: function (a, b) {
                this.series.removePoint(k(this, this.series.data), a, b)
            }
        });
        x(r.prototype, {
            addPoint: function (a, c, d, e) {
                var g = this.options,
                    f = this.data,
                    k = this.chart,
                    h = this.xAxis,
                    h = h && h.hasNames && h.names,
                    p = g.data,
                    m, l, v = this.xData,
                    w, n;
                c = b(c, !0);
                m = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(m, [a]);
                n = m.x;
                w = v.length;
                if (this.requireSorting &&
                    n < v[w - 1])
                    for (l = !0; w && v[w - 1] > n;) w--;
                this.updateParallelArrays(m, "splice", w, 0, 0);
                this.updateParallelArrays(m, w);
                h && m.name && (h[n] = m.name);
                p.splice(w, 0, a);
                l && (this.data.splice(w, 0, null), this.processData());
                "point" === g.legendType && this.generatePoints();
                d && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(m, "shift"), p.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && k.redraw(e)
            },
            removePoint: function (a, c, d) {
                var e = this,
                    g = e.data,
                    f = g[a],
                    k = e.points,
                    h = e.chart,
                    p = function () {
                        k && k.length === g.length &&
                            k.splice(a, 1);
                        g.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(f || {
                            series: e
                        }, "splice", a, 1);
                        f && f.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        c && h.redraw()
                    };
                J(d, h);
                c = b(c, !0);
                f ? f.firePointEvent("remove", null, p) : p()
            },
            remove: function (a, c, d) {
                function e() {
                    g.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    b(a, !0) && f.redraw(c)
                }
                var g = this,
                    f = g.chart;
                !1 !== d ? t(g, "remove", null, e) : e()
            },
            update: function (c, e) {
                var g = this,
                    f = g.chart,
                    m = g.userOptions,
                    v = g.oldType || g.type,
                    w = c.type || m.type || f.options.chart.type,
                    h = F[v].prototype,
                    n, r = ["group", "markerGroup", "dataLabelsGroup"],
                    l = ["navigatorSeries", "baseSeries"],
                    q = g.finishedAnimating && {
                        animation: !1
                    },
                    H = ["data", "name", "turboThreshold"],
                    y = a.keys(c),
                    J = 0 < y.length;
                d(y, function (a) {
                    -1 === k(a, H) && (J = !1)
                });
                if (J) c.data && this.setData(c.data, !1), c.name && this.setName(c.name, !1);
                else {
                    l = r.concat(l);
                    d(l, function (a) {
                        l[a] = g[a];
                        delete g[a]
                    });
                    c = u(m, q, {
                        index: g.index,
                        pointStart: b(m.pointStart, g.xData[0])
                    }, {
                        data: g.options.data
                    }, c);
                    g.remove(!1, null, !1);
                    for (n in h) g[n] = void 0;
                    F[w || v] ?
                        x(g, F[w || v].prototype) : a.error(17, !0);
                    d(l, function (a) {
                        g[a] = l[a]
                    });
                    g.init(f, c);
                    c.zIndex !== m.zIndex && d(r, function (a) {
                        g[a] && g[a].attr({
                            zIndex: c.zIndex
                        })
                    });
                    g.oldType = v;
                    f.linkSeries()
                }
                t(this, "afterUpdate");
                b(e, !0) && f.redraw(!1)
            },
            setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        x(E.prototype, {
            update: function (a, c) {
                var d = this.chart;
                a = u(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] =
                    a);
                this.destroy(!0);
                this.init(d, x(a, {
                    events: void 0
                }));
                d.isDirtyBox = !0;
                b(c, !0) && d.redraw()
            },
            remove: function (a) {
                for (var c = this.chart, e = this.coll, g = this.series, f = g.length; f--;) g[f] && g[f].remove(!1);
                n(c.axes, this);
                n(c[e], this);
                y(c.options[e]) ? c.options[e].splice(this.options.index, 1) : delete c.options[e];
                d(c[e], function (a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                c.isDirtyBox = !0;
                b(a, !0) && c.redraw()
            },
            setTitle: function (a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function (a, b) {
                this.update({
                        categories: a
                    },
                    b)
            }
        })
    })(L);
    (function (a) {
        var A = a.each,
            E = a.map,
            D = a.pick,
            q = a.Series,
            f = a.seriesType;
        f("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (d) {
                var f = [],
                    q = [],
                    t = this.xAxis,
                    k = this.yAxis,
                    c = k.stacks[this.stackKey],
                    e = {},
                    y = this.index,
                    u = k.series,
                    m = u.length,
                    b, g = D(k.options.reversedStacks, !0) ? 1 : -1,
                    r;
                d = d || this.points;
                if (this.options.stacking) {
                    for (r = 0; r < d.length; r++) d[r].leftNull = d[r].rightNull = null, e[d[r].x] = d[r];
                    a.objectEach(c, function (a, b) {
                        null !== a.total && q.push(b)
                    });
                    q.sort(function (a,
                        b) {
                        return a - b
                    });
                    b = E(u, function () {
                        return this.visible
                    });
                    A(q, function (a, d) {
                        var v = 0,
                            n, w;
                        if (e[a] && !e[a].isNull) f.push(e[a]), A([-1, 1], function (f) {
                            var k = 1 === f ? "rightNull" : "leftNull",
                                p = 0,
                                v = c[q[d + f]];
                            if (v)
                                for (r = y; 0 <= r && r < m;) n = v.points[r], n || (r === y ? e[a][k] = !0 : b[r] && (w = c[a].points[r]) && (p -= w[1] - w[0])), r += g;
                            e[a][1 === f ? "rightCliff" : "leftCliff"] = p
                        });
                        else {
                            for (r = y; 0 <= r && r < m;) {
                                if (n = c[a].points[r]) {
                                    v = n[1];
                                    break
                                }
                                r += g
                            }
                            v = k.translate(v, 0, 1, 0, 1);
                            f.push({
                                isNull: !0,
                                plotX: t.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: v,
                                yBottom: v
                            })
                        }
                    })
                }
                return f
            },
            getGraphPath: function (a) {
                var d = q.prototype.getGraphPath,
                    f = this.options,
                    t = f.stacking,
                    k = this.yAxis,
                    c, e, y = [],
                    u = [],
                    m = this.index,
                    b, g = k.stacks[this.stackKey],
                    r = f.threshold,
                    F = k.getThreshold(f.threshold),
                    J, f = f.connectNulls || "percent" === t,
                    v = function (c, d, e) {
                        var f = a[c];
                        c = t && g[f.x].points[m];
                        var p = f[e + "Null"] || 0;
                        e = f[e + "Cliff"] || 0;
                        var v, n, f = !0;
                        e || p ? (v = (p ? c[0] : c[1]) + e, n = c[0] + e, f = !!p) : !t && a[d] && a[d].isNull && (v = n = r);
                        void 0 !== v && (u.push({
                            plotX: b,
                            plotY: null === v ? F : k.getThreshold(v),
                            isNull: f,
                            isCliff: !0
                        }), y.push({
                            plotX: b,
                            plotY: null === n ? F : k.getThreshold(n),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                t && (a = this.getStackPoints(a));
                for (c = 0; c < a.length; c++)
                    if (e = a[c].isNull, b = D(a[c].rectPlotX, a[c].plotX), J = D(a[c].yBottom, F), !e || f) f || v(c, c - 1, "left"), e && !t && f || (u.push(a[c]), y.push({
                        x: c,
                        plotX: b,
                        plotY: J
                    })), f || v(c, c + 1, "right");
                c = d.call(this, u, !0, !0);
                y.reversed = !0;
                e = d.call(this, y, !0, !0);
                e.length && (e[0] = "L");
                e = c.concat(e);
                d = d.call(this, u, !1, f);
                e.xMap = c.xMap;
                this.areaPath = e;
                return d
            },
            drawGraph: function () {
                this.areaPath = [];
                q.prototype.drawGraph.apply(this);
                var a = this,
                    f = this.areaPath,
                    x = this.options,
                    t = [
                        ["area", "highcharts-area"]
                    ];
                A(this.zones, function (a, c) {
                    t.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + a.className])
                });
                A(t, function (d) {
                    var c = d[0],
                        e = a[c];
                    e ? (e.endX = a.preventGraphAnimation ? null : f.xMap, e.animate({
                        d: f
                    })) : (e = a[c] = a.chart.renderer.path(f).addClass(d[1]).attr({
                        zIndex: 0
                    }).add(a.group), e.isArea = !0);
                    e.startX = f.xMap;
                    e.shiftUnit = x.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var A = a.pick;
        a =
            a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, D, q) {
                var f = D.plotX,
                    d = D.plotY,
                    n = a[q - 1];
                q = a[q + 1];
                var x, t, k, c;
                if (n && !n.isNull && !1 !== n.doCurve && !D.isCliff && q && !q.isNull && !1 !== q.doCurve && !D.isCliff) {
                    a = n.plotY;
                    k = q.plotX;
                    q = q.plotY;
                    var e = 0;
                    x = (1.5 * f + n.plotX) / 2.5;
                    t = (1.5 * d + a) / 2.5;
                    k = (1.5 * f + k) / 2.5;
                    c = (1.5 * d + q) / 2.5;
                    k !== x && (e = (c - t) * (k - f) / (k - x) + d - c);
                    t += e;
                    c += e;
                    t > a && t > d ? (t = Math.max(a, d), c = 2 * d - t) : t < a && t < d && (t = Math.min(a, d), c = 2 * d - t);
                    c > q && c > d ? (c = Math.max(q, d), t = 2 * d - c) : c < q && c < d && (c = Math.min(q, d), t = 2 * d - c);
                    D.rightContX =
                        k;
                    D.rightContY = c
                }
                D = ["C", A(n.rightContX, n.plotX), A(n.rightContY, n.plotY), A(x, f), A(t, d), f, d];
                n.rightContX = n.rightContY = null;
                return D
            }
        })
    })(L);
    (function (a) {
        var A = a.seriesTypes.area.prototype,
            E = a.seriesType;
        E("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: A.getStackPoints,
            getGraphPath: A.getGraphPath,
            drawGraph: A.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function (a) {
        var A = a.animObject,
            E = a.each,
            D = a.extend,
            q = a.isNumber,
            f = a.merge,
            d = a.pick,
            n = a.Series,
            x = a.seriesType,
            t = a.svg;
        x("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                n.prototype.init.apply(this, arguments);
                var a = this,
                    c = a.chart;
                c.hasRendered && E(c.series, function (c) {
                    c.type ===
                        a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this,
                    c = a.options,
                    e = a.xAxis,
                    f = a.yAxis,
                    n = e.reversed,
                    m, b = {},
                    g = 0;
                !1 === c.grouping ? g = 1 : E(a.chart.series, function (c) {
                    var d = c.options,
                        e = c.yAxis,
                        k;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || f.len !== e.len || f.pos !== e.pos || (d.stacking ? (m = c.stackKey, void 0 === b[m] && (b[m] = g++), k = b[m]) : !1 !== d.grouping && (k = g++), c.columnIndex = k)
                });
                var r = Math.min(Math.abs(e.transA) * (e.ordinalSlope || c.pointRange || e.closestPointRange || e.tickInterval ||
                        1), e.len),
                    q = r * c.groupPadding,
                    t = (r - 2 * q) / (g || 1),
                    c = Math.min(c.maxPointWidth || e.len, d(c.pointWidth, t * (1 - 2 * c.pointPadding)));
                a.columnMetrics = {
                    width: c,
                    offset: (t - c) / 2 + (q + ((a.columnIndex || 0) + (n ? 1 : 0)) * t - r / 2) * (n ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, c, d, f) {
                var e = this.chart,
                    k = this.borderWidth,
                    b = -(k % 2 ? .5 : 0),
                    k = k % 2 ? .5 : 1;
                e.inverted && e.renderer.isVML && (k += 1);
                this.options.crisp && (d = Math.round(a + d) + b, a = Math.round(a) + b, d -= a);
                f = Math.round(c + f) + k;
                b = .5 >= Math.abs(c) && .5 < f;
                c = Math.round(c) + k;
                f -= c;
                b && f && (--c,
                    f += 1);
                return {
                    x: a,
                    y: c,
                    width: d,
                    height: f
                }
            },
            translate: function () {
                var a = this,
                    c = a.chart,
                    e = a.options,
                    f = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    f = a.borderWidth = d(e.borderWidth, f ? 0 : 1),
                    q = a.yAxis,
                    m = e.threshold,
                    b = a.translatedThreshold = q.getThreshold(m),
                    g = d(e.minPointLength, 5),
                    r = a.getColumnMetrics(),
                    t = r.width,
                    x = a.barW = Math.max(t, 1 + 2 * f),
                    v = a.pointXOffset = r.offset;
                c.inverted && (b -= .5);
                e.pointPadding && (x = Math.ceil(x));
                n.prototype.translate.apply(a);
                E(a.points, function (e) {
                    var f = d(e.yBottom, b),
                        k = 999 + Math.abs(f),
                        k = Math.min(Math.max(-k, e.plotY), q.len + k),
                        n = e.plotX + v,
                        r = x,
                        u = Math.min(k, f),
                        y, h = Math.max(k, f) - u;
                    g && Math.abs(h) < g && (h = g, y = !q.reversed && !e.negative || q.reversed && e.negative, e.y === m && a.dataMax <= m && q.min < m && (y = !y), u = Math.abs(u - b) > g ? f - g : b - (y ? g : 0));
                    e.barX = n;
                    e.pointWidth = t;
                    e.tooltipPos = c.inverted ? [q.len + q.pos - c.plotLeft - k, a.xAxis.len - n - r / 2, h] : [n + r / 2, k + q.pos - c.plotTop, h];
                    e.shapeType = "rect";
                    e.shapeArgs = a.crispCol.apply(a, e.isNull ? [n, b, r, 0] : [n, u, r, h])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            drawPoints: function () {
                var a = this,
                    c = this.chart,
                    d = a.options,
                    n = c.renderer,
                    u = d.animationLimit || 250,
                    m;
                E(a.points, function (b) {
                    var e = b.graphic,
                        k = e && c.pointCount < u ? "animate" : "attr";
                    if (q(b.plotY) && null !== b.y) {
                        m = b.shapeArgs;
                        if (e) e[k](f(m));
                        else b.graphic = e = n[b.shapeType](m).add(b.group || a.group);
                        d.borderRadius && e.attr({
                            r: d.borderRadius
                        });
                        e.addClass(b.getClassName(), !0)
                    } else e && (b.graphic = e.destroy())
                })
            },
            animate: function (a) {
                var c =
                    this,
                    d = this.yAxis,
                    f = c.options,
                    k = this.chart.inverted,
                    m = {},
                    b = k ? "translateX" : "translateY",
                    g;
                t && (a ? (m.scaleY = .001, a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(f.threshold))), k ? m.translateX = a - d.len : m.translateY = a, c.group.attr(m)) : (g = c.group.attr(b), c.group.animate({
                    scaleY: 1
                }, D(A(c.options.animation), {
                    step: function (a, e) {
                        m[b] = g + e.pos * (d.pos - g);
                        c.group.attr(m)
                    }
                })), c.animate = null))
            },
            remove: function () {
                var a = this,
                    c = a.chart;
                c.hasRendered && E(c.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                n.prototype.remove.apply(a,
                    arguments)
            }
        })
    })(L);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(L);
    (function (a) {
        var A = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && A.prototype.drawGraph.call(this)
            }
        })
    })(L);
    (function (a) {
        var A = a.deg2rad,
            E = a.isNumber,
            D = a.pick,
            q = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    d = this.chart,
                    n = 2 * (a.slicedOffset || 0),
                    x = d.plotWidth - 2 * n,
                    d = d.plotHeight - 2 * n,
                    t = a.center,
                    t = [D(t[0], "50%"), D(t[1], "50%"), a.size || "100%", a.innerSize || 0],
                    k = Math.min(x, d),
                    c, e;
                for (c = 0; 4 > c; ++c) e = t[c], a = 2 > c || 2 === c && /%$/.test(e), t[c] = q(e, [x, d, k, t[2]][c]) + (a ? n : 0);
                t[3] > t[2] && (t[3] = t[2]);
                return t
            },
            getStartAndEndRadians: function (a, d) {
                a = E(a) ? a : 0;
                d = E(d) && d > a && 360 > d - a ? d : a + 360;
                return {
                    start: A * (a + -90),
                    end: A * (d + -90)
                }
            }
        }
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.CenteredSeriesMixin,
            D = a.defined,
            q = a.each,
            f = a.extend,
            d = E.getStartAndEndRadians,
            n = a.inArray,
            x = a.noop,
            t = a.pick,
            k = a.Point,
            c = a.Series,
            e = a.seriesType,
            y = a.setAnimation;
        e("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this,
                    b = c.points,
                    d = c.startAngleRad;
                a || (q(b, function (a) {
                    var b = a.graphic,
                        e = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || c.center[3] / 2,
                        start: d,
                        end: d
                    }), b.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a, c = 0,
                    b = this.points,
                    d = b.length,
                    e, f = this.options.ignoreHiddenPoint;
                for (a = 0; a < d; a++) e = b[a], c += f && !e.visible ? 0 : e.isNull ? 0 : e.y;
                this.total = c;
                for (a = 0; a < d; a++) e = b[a], e.percentage = 0 < c && (e.visible || !f) ? e.y / c * 100 : 0, e.total = c
            },
            generatePoints: function () {
                c.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0,
                    b = this.options,
                    e = b.slicedOffset,
                    f = e + (b.borderWidth || 0),
                    k, n, v, q = d(b.startAngle, b.endAngle),
                    w = this.startAngleRad = q.start,
                    q = (this.endAngleRad = q.end) - w,
                    p = this.points,
                    u, x = b.dataLabels.distance,
                    b = b.ignoreHiddenPoint,
                    y, A = p.length,
                    h;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c, d) {
                    v = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(v) * (a[2] / 2 + d.labelDistance)
                };
                for (y = 0; y < A; y++) {
                    h = p[y];
                    h.labelDistance = t(h.options.dataLabels && h.options.dataLabels.distance,
                        x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, h.labelDistance);
                    k = w + c * q;
                    if (!b || h.visible) c += h.percentage / 100;
                    n = w + c * q;
                    h.shapeType = "arc";
                    h.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * k) / 1E3,
                        end: Math.round(1E3 * n) / 1E3
                    };
                    v = (n + k) / 2;
                    v > 1.5 * Math.PI ? v -= 2 * Math.PI : v < -Math.PI / 2 && (v += 2 * Math.PI);
                    h.slicedTranslation = {
                        translateX: Math.round(Math.cos(v) * e),
                        translateY: Math.round(Math.sin(v) * e)
                    };
                    n = Math.cos(v) * a[2] / 2;
                    u = Math.sin(v) * a[2] / 2;
                    h.tooltipPos = [a[0] + .7 * n, a[1] + .7 * u];
                    h.half = v < -Math.PI /
                        2 || v > Math.PI / 2 ? 1 : 0;
                    h.angle = v;
                    k = Math.min(f, h.labelDistance / 5);
                    h.labelPos = [a[0] + n + Math.cos(v) * h.labelDistance, a[1] + u + Math.sin(v) * h.labelDistance, a[0] + n + Math.cos(v) * k, a[1] + u + Math.sin(v) * k, a[0] + n, a[1] + u, 0 > h.labelDistance ? "center" : h.half ? "right" : "left", v]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this,
                    c = a.chart.renderer,
                    b, d, e;
                q(a.points, function (g) {
                    d = g.graphic;
                    g.isNull ? d && (g.graphic = d.destroy()) : (e = g.shapeArgs, b = g.getTranslate(), d ? d.setRadialReference(a.center).animate(f(e, b)) : (g.graphic = d = c[g.shapeType](e).setRadialReference(a.center).attr(b).add(a.group),
                        g.visible || d.attr({
                            visibility: "hidden"
                        })), d.addClass(g.getClassName()))
                })
            },
            searchPoint: x,
            sortByAngle: function (a, c) {
                a.sort(function (a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: E.getCenter,
            getSymbol: x
        }, {
            init: function () {
                k.prototype.init.apply(this, arguments);
                var a = this,
                    c;
                a.name = t(a.name, "Slice");
                c = function (b) {
                    a.slice("select" === b.type)
                };
                A(a, "select", c);
                A(a, "unselect", c);
                return a
            },
            isValid: function () {
                return a.isNumber(this.y, !0) && 0 <=
                    this.y
            },
            setVisible: function (a, c) {
                var b = this,
                    d = b.series,
                    e = d.chart,
                    f = d.options.ignoreHiddenPoint;
                c = t(c, f);
                a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, d.options.data[n(b, d.data)] = b.options, q(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
                    if (b[c]) b[c][a ? "show" : "hide"](!0)
                }), b.legendItem && e.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), f && (d.isDirty = !0), c && e.redraw())
            },
            slice: function (a, c, b) {
                var d = this.series;
                y(b, d.chart);
                t(c, !0);
                this.sliced = this.options.sliced =
                    D(a) ? a : !this.sliced;
                d.options.data[n(this, d.data)] = this.options;
                this.graphic.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r - 1,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.arrayMax,
            D = a.defined,
            q = a.each,
            f = a.extend,
            d = a.format,
            n = a.map,
            x = a.merge,
            t = a.noop,
            k = a.pick,
            c = a.relativeLength,
            e = a.Series,
            y = a.seriesTypes,
            u = a.some,
            m = a.stableSort;
        a.distribute = function (b, c, d) {
            function e(a, b) {
                return a.target - b.target
            }
            var g, f = !0,
                r = b,
                w = [],
                p;
            p = 0;
            var t = r.reducedLen || c;
            for (g = b.length; g--;) p += b[g].size;
            if (p > t) {
                m(b, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = g = 0; p <= t;) p += b[g].size, g++;
                w = b.splice(g - 1, b.length)
            }
            m(b, e);
            for (b = n(b, function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: k(a.align, .5)
                    }
                }); f;) {
                for (g = b.length; g--;) f = b[g], p = (Math.min.apply(0, f.targets) +
                    Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, p - f.size * f.align), c - f.size);
                g = b.length;
                for (f = !1; g--;) 0 < g && b[g - 1].pos + b[g - 1].size > b[g].pos && (b[g - 1].size += b[g].size, b[g - 1].targets = b[g - 1].targets.concat(b[g].targets), b[g - 1].align = .5, b[g - 1].pos + b[g - 1].size > c && (b[g - 1].pos = c - b[g - 1].size), b.splice(g, 1), f = !0)
            }
            r.push.apply(r, w);
            g = 0;
            u(b, function (b) {
                var e = 0;
                if (u(b.targets, function () {
                        r[g].pos = b.pos + e;
                        if (Math.abs(r[g].pos - r[g].target) > d) return q(r.slice(0, g + 1), function (a) {
                                delete a.pos
                            }), r.reducedLen =
                            (r.reducedLen || c) - .1 * c, r.reducedLen > .1 * c && a.distribute(r, c, d), !0;
                        e += r[g].size;
                        g++
                    })) return !0
            });
            m(r, e)
        };
        e.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }
            var c = this,
                e = c.chart,
                f = c.options,
                m = f.dataLabels,
                v = c.points,
                n, w, p = c.hasRendered || 0,
                t, u, y = k(m.defer, !!f.animation),
                E = e.renderer;
            if (m.enabled || c._hasPointLabels) c.dlProcessOptions &&
                c.dlProcessOptions(m), u = c.plotGroup("dataLabelsGroup", "data-labels", y && !p ? "hidden" : "visible", m.zIndex || 6), y && (u.attr({
                    opacity: +p
                }), p || A(c, "afterAnimate", function () {
                    c.visible && u.show(!0);
                    u[f.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), w = m, q(v, function (g) {
                    var f, h = g.dataLabel,
                        l, p, v = g.connector,
                        q = !h,
                        r;
                    n = g.dlOptions || g.options && g.options.dataLabels;
                    (f = k(n && n.enabled, w.enabled) && !g.isNull) && (f = !0 === b(g, n || m));
                    f && (m = x(w, n), l = g.getLabelConfig(), r = m[g.formatPrefix + "Format"] || m.format, t = D(r) ?
                        d(r, l, e.time) : (m[g.formatPrefix + "Formatter"] || m.formatter).call(l, m), l = m.rotation, p = {
                            r: m.borderRadius || 0,
                            rotation: l,
                            padding: m.padding,
                            zIndex: 1
                        }, a.objectEach(p, function (a, b) {
                            void 0 === a && delete p[b]
                        }));
                    !h || f && D(t) ? f && D(t) && (h ? p.text = t : (h = g.dataLabel = l ? E.text(t, 0, -9999).addClass("highcharts-data-label") : E.label(t, 0, -9999, m.shape, null, null, m.useHTML, null, "data-label"), h.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (m.className || "") + (m.useHTML ? "highcharts-tracker" : ""))), h.attr(p), h.added ||
                        h.add(u), c.alignDataLabel(g, h, m, null, q)) : (g.dataLabel = h = h.destroy(), v && (g.connector = v.destroy()))
                });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        e.prototype.alignDataLabel = function (a, c, d, e, m) {
            var b = this.chart,
                g = b.inverted,
                n = k(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                p = k(a.plotY, -9999),
                q = c.getBBox(),
                r, t = d.rotation,
                u = d.align,
                h = this.visible && (a.series.forceDL || b.isInsidePlot(n, Math.round(p), g) || e && b.isInsidePlot(n, g ? e.x + 1 : e.y + e.height - 1, g)),
                x = "justify" === k(d.overflow, "justify");
            if (h && (r = b.renderer.fontMetrics(void 0,
                        c).b, e = f({
                        x: g ? this.yAxis.len - p : n,
                        y: Math.round(g ? this.xAxis.len - n : p),
                        width: 0,
                        height: 0
                    }, e), f(d, {
                        width: q.width,
                        height: q.height
                    }), t ? (x = !1, n = b.renderer.rotCorr(r, t), n = {
                        x: e.x + d.x + e.width / 2 + n.x,
                        y: e.y + d.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[d.verticalAlign] * e.height
                    }, c[m ? "attr" : "animate"](n).attr({
                        align: u
                    }), p = (t + 720) % 360, p = 180 < p && 360 > p, "left" === u ? n.y -= p ? q.height : 0 : "center" === u ? (n.x -= q.width / 2, n.y -= q.height / 2) : "right" === u && (n.x -= q.width, n.y -= p ? 0 : q.height), c.placed = !0, c.alignAttr = n) : (c.align(d, null, e), n = c.alignAttr),
                    x ? a.isLabelJustified = this.justifyDataLabel(c, d, n, q, e, m) : k(d.crop, !0) && (h = b.isInsidePlot(n.x, n.y) && b.isInsidePlot(n.x + q.width, n.y + q.height)), d.shape && !t)) c[m ? "attr" : "animate"]({
                anchorX: g ? b.plotWidth - a.plotY : a.plotX,
                anchorY: g ? b.plotHeight - a.plotX : a.plotY
            });
            h || (c.attr({
                y: -9999
            }), c.placed = !1)
        };
        e.prototype.justifyDataLabel = function (a, c, d, e, f, k) {
            var b = this.chart,
                g = c.align,
                m = c.verticalAlign,
                n, v, q = a.box ? 0 : a.padding || 0;
            n = d.x + q;
            0 > n && ("right" === g ? c.align = "left" : c.x = -n, v = !0);
            n = d.x + e.width - q;
            n > b.plotWidth && ("left" ===
                g ? c.align = "right" : c.x = b.plotWidth - n, v = !0);
            n = d.y + q;
            0 > n && ("bottom" === m ? c.verticalAlign = "top" : c.y = -n, v = !0);
            n = d.y + e.height - q;
            n > b.plotHeight && ("top" === m ? c.verticalAlign = "bottom" : c.y = b.plotHeight - n, v = !0);
            v && (a.placed = !k, a.align(c, null, f));
            return v
        };
        y.pie && (y.pie.prototype.drawDataLabels = function () {
            var b = this,
                c = b.data,
                d, f = b.chart,
                m = b.options.dataLabels,
                n = k(m.connectorPadding, 10),
                t = k(m.connectorWidth, 1),
                w = f.plotWidth,
                p = f.plotHeight,
                u = Math.round(f.chartWidth / 3),
                x, y = b.center,
                A = y[2] / 2,
                h = y[1],
                z, K, l, I, L = [
                    [],
                    []
                ],
                Q, O, P, N, R = [0, 0, 0, 0];
            b.visible && (m.enabled || b._hasPointLabels) && (q(c, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), e.prototype.drawDataLabels.apply(b), q(c, function (a) {
                a.dataLabel && a.visible && (L[a.half].push(a), a.dataLabel._pos = null, a.dataLabel.getBBox().width > u && (a.dataLabel.css({
                    width: .7 * u
                }), a.dataLabel.shortened = !0))
            }), q(L, function (c, e) {
                var g, v, t = c.length,
                    r = [],
                    u;
                if (t)
                    for (b.sortByAngle(c,
                            e - .5), 0 < b.maxLabelDistance && (g = Math.max(0, h - A - b.maxLabelDistance), v = Math.min(h + A + b.maxLabelDistance, f.plotHeight), q(c, function (a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, h - A - a.labelDistance), a.bottom = Math.min(h + A + a.labelDistance, f.plotHeight), u = a.dataLabel.getBBox().height || 21, a.positionsIndex = r.push({
                                target: a.labelPos[1] - a.top + u / 2,
                                size: u,
                                rank: a.y
                            }) - 1)
                        }), g = v + u - g, a.distribute(r, g, g / 5)), N = 0; N < t; N++) d = c[N], v = d.positionsIndex, l = d.labelPos, z = d.dataLabel, P = !1 === d.visible ? "hidden" : "inherit", O =
                        g = l[1], r && D(r[v]) && (void 0 === r[v].pos ? P = "hidden" : (I = r[v].size, O = d.top + r[v].pos)), delete d.positionIndex, Q = m.justify ? y[0] + (e ? -1 : 1) * (A + d.labelDistance) : b.getX(O < d.top + 2 || O > d.bottom - 2 ? g : O, e, d), z._attr = {
                            visibility: P,
                            align: l[6]
                        }, z._pos = {
                            x: Q + m.x + ({
                                left: n,
                                right: -n
                            }[l[6]] || 0),
                            y: O + m.y - 10
                        }, l.x = Q, l.y = O, k(m.crop, !0) && (K = z.getBBox().width, g = null, Q - K < n && 1 === e ? (g = Math.round(K - Q + n), R[3] = Math.max(g, R[3])) : Q + K > w - n && 0 === e && (g = Math.round(Q + K - w + n), R[1] = Math.max(g, R[1])), 0 > O - I / 2 ? R[0] = Math.max(Math.round(-O + I / 2), R[0]) :
                            O + I / 2 > p && (R[2] = Math.max(Math.round(O + I / 2 - p), R[2])), z.sideOverflow = g)
            }), 0 === E(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), t && q(this.points, function (a) {
                var c;
                x = a.connector;
                if ((z = a.dataLabel) && z._pos && a.visible && 0 < a.labelDistance) {
                    P = z._attr.visibility;
                    if (c = !x) a.connector = x = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup);
                    x[c ? "attr" : "animate"]({
                        d: b.connectorPath(a.labelPos)
                    });
                    x.attr("visibility",
                        P)
                } else x && (a.connector = x.destroy())
            }))
        }, y.pie.prototype.connectorPath = function (a) {
            var b = a.x,
                c = a.y;
            return k(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, y.pie.prototype.placeDataLabels = function () {
            q(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width +
                        "px",
                    textOverflow: this.options.dataLabels.style.textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, y.pie.prototype.alignDataLabel = t, y.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center,
                d = this.options,
                e = d.center,
                f = d.minSize || 80,
                k, m = null !== d.size;
            m || (null !== e[0] ? k = Math.max(b[2] - Math.max(a[1], a[3]), f) : (k = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? k = Math.max(Math.min(k, b[2] - Math.max(a[0],
                a[2])), f) : (k = Math.max(Math.min(k, b[2] - a[0] - a[2]), f), b[1] += (a[0] - a[2]) / 2), k < b[2] ? (b[2] = k, b[3] = Math.min(c(d.innerSize || 0, k), k), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : m = !0);
            return m
        });
        y.column && (y.column.prototype.alignDataLabel = function (a, c, d, f, m) {
            var b = this.chart.inverted,
                g = a.series,
                n = a.dlBox || a.shapeArgs,
                p = k(a.below, a.plotY > k(this.translatedThreshold, g.yAxis.len)),
                q = k(d.inside, !!this.options.stacking);
            n && (f = x(n), 0 > f.y && (f.height += f.y, f.y = 0), n = f.y + f.height - g.yAxis.len, 0 < n && (f.height -=
                n), b && (f = {
                x: g.yAxis.len - f.y - f.height,
                y: g.xAxis.len - f.x - f.width,
                width: f.height,
                height: f.width
            }), q || (b ? (f.x += p ? 0 : f.width, f.width = 0) : (f.y += p ? f.height : 0, f.height = 0)));
            d.align = k(d.align, !b || q ? "center" : p ? "right" : "left");
            d.verticalAlign = k(d.verticalAlign, b || q ? "middle" : p ? "top" : "bottom");
            e.prototype.alignDataLabel.call(this, a, c, d, f, m);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(L);
    (function (a) {
        var A = a.Chart,
            E = a.each,
            D = a.objectEach,
            q = a.pick;
        a = a.addEvent;
        a(A, "render", function () {
            var a = [];
            E(this.labelCollectors || [], function (d) {
                a = a.concat(d())
            });
            E(this.yAxis || [], function (d) {
                d.options.stackLabels && !d.options.stackLabels.allowOverlap && D(d.stacks, function (d) {
                    D(d, function (d) {
                        a.push(d.label)
                    })
                })
            });
            E(this.series || [], function (d) {
                var f = d.options.dataLabels,
                    x = d.dataLabelCollections || ["dataLabel"];
                (f.enabled || d._hasPointLabels) && !f.allowOverlap && d.visible && E(x, function (f) {
                    E(d.points, function (d) {
                        d[f] && (d[f].labelrank = q(d.labelrank, d.shapeArgs && d.shapeArgs.height), a.push(d[f]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        A.prototype.hideOverlappingLabels = function (a) {
            var d = a.length,
                f, q, t, k, c, e, y, u, m, b = function (a, b, c, d, e, f, k, m) {
                    return !(e > a + c || e + k < a || f > b + d || f + m < b)
                };
            for (q = 0; q < d; q++)
                if (f = a[q]) f.oldOpacity = f.opacity, f.newOpacity = 1, f.width || (t = f.getBBox(), f.width = t.width, f.height = t.height);
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (q = 0; q < d; q++)
                for (t = a[q], f = q + 1; f < d; ++f)
                    if (k = a[f], t && k && t !== k && t.placed && k.placed && 0 !== t.newOpacity && 0 !== k.newOpacity && (c = t.alignAttr, e = k.alignAttr, y = t.parentGroup, u = k.parentGroup,
                            m = 2 * (t.box ? 0 : t.padding || 0), c = b(c.x + y.translateX, c.y + y.translateY, t.width - m, t.height - m, e.x + u.translateX, e.y + u.translateY, k.width - m, k.height - m)))(t.labelrank < k.labelrank ? t : k).newOpacity = 0;
            E(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function (a) {
        var A = a.addEvent,
            E = a.Chart,
            D = a.createElement,
            q = a.css,
            f = a.defaultOptions,
            d = a.defaultPlotOptions,
            n = a.each,
            x = a.extend,
            t = a.fireEvent,
            k = a.hasTouch,
            c = a.inArray,
            e = a.isObject,
            y = a.Legend,
            u = a.merge,
            m = a.pick,
            b = a.Point,
            g = a.Series,
            r = a.seriesTypes,
            F = a.svg,
            J;
        J = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    c = function (a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                n(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (n(a.trackerGroups, function (d) {
                    if (a[d] &&
                        (a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        }), k)) a[d].on("touchstart", c)
                }), a._hasTracking = !0);
                t(this, "afterDrawTracker")
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options.trackByArea,
                    c = [].concat(b ? a.areaPath : a.graphPath),
                    d = c.length,
                    e = a.chart,
                    f = e.pointer,
                    g = e.renderer,
                    m = e.options.tooltip.snap,
                    h = a.tracker,
                    q, r = function () {
                        if (e.hoverSeries !== a) a.onMouseOver()
                    },
                    l = "rgba(192,192,192," + (F ? .0001 : .002) + ")";
                if (d && !b)
                    for (q = d + 1; q--;) "M" === c[q] && c.splice(q +
                        1, 0, c[q + 1] - m, c[q + 2], "L"), (q && "M" === c[q] || q === d) && c.splice(q, 0, "L", c[q - 2] + m, c[q - 1]);
                h ? h.attr({
                    d: c
                }) : a.graph && (a.tracker = g.path(c).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: l,
                    fill: b ? l : "none",
                    "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * m),
                    zIndex: 2
                }).add(a.group), n([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function (a) {
                        f.onTrackerMouseOut(a)
                    });
                    if (k) a.on("touchstart", r)
                }));
                t(this, "afterDrawTracker")
            }
        };
        r.column &&
            (r.column.prototype.drawTracker = J.drawTrackerPoint);
        r.pie && (r.pie.prototype.drawTracker = J.drawTrackerPoint);
        r.scatter && (r.scatter.prototype.drawTracker = J.drawTrackerPoint);
        x(y.prototype, {
            setItemEvents: function (a, c, d) {
                var e = this.chart.renderer.boxWrapper,
                    f = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
                (d ? c : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.addClass(f)
                }).on("mouseout", function () {
                    e.removeClass(f);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible &&
                            a.setVisible()
                    };
                    e.removeClass(f);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : t(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = D("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                A(a.checkbox, "click", function (b) {
                    t(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        x(E.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = f.lang,
                    d = b.options.chart.resetZoomButton,
                    e = d.theme,
                    g = e.states,
                    k = "chart" === d.relativeTo ? null : "plotBox";
                t(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, g && g.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, k)
                })
            },
            zoomOut: function () {
                t(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function (a) {
                var b, c = this.pointer,
                    d = !1,
                    f;
                !a || a.resetSelection ? (n(this.axes,
                    function (a) {
                        b = a.zoom()
                    }), c.initiated = !1) : n(a.xAxis.concat(a.yAxis), function (a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                f = this.resetZoomButton;
                d && !f ? this.showResetZoom() : !d && e(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(m(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && n(d, function (a) {
                    a.setState()
                });
                n("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        f = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        g = c[d],
                        k = (b.pointRange || 0) / 2,
                        m = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                        l = b.getExtremes(),
                        n = b.toValue(g - f, !0) + k * m,
                        m = b.toValue(g + b.len - f, !0) - k * m,
                        p = m < n,
                        g = p ? m : n,
                        n = p ? n : m,
                        m = Math.min(l.dataMin, k ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                        k = Math.max(l.dataMax, k ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                        p = m - g;
                    0 < p && (n += p, g = m);
                    p = n - k;
                    0 < p && (n = k, g -= p);
                    b.series.length && g !== l.min && n !== l.max && (b.setExtremes(g, n, !1, !1, {
                            trigger: "pan"
                        }),
                        e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                q(c.container, {
                    cursor: "move"
                })
            }
        });
        x(b.prototype, {
            select: function (a, b) {
                var d = this,
                    e = d.series,
                    f = e.chart;
                a = m(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[c(d, e.data)] = d.options;
                    d.setState(a && "select");
                    b || n(f.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[c(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a) {
                var b =
                    this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                n(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = u(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        A(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, b) {
                var c = Math.floor(this.plotX),
                    e = this.plotY,
                    f = this.series,
                    g = f.options.states[a || "normal"] || {},
                    k = d[f.type].marker && f.options.marker,
                    n = k && !1 === k.enabled,
                    h = k && k.states && k.states[a || "normal"] || {},
                    q = !1 === h.enabled,
                    r = f.stateMarkerGraphic,
                    l = this.marker || {},
                    v = f.chart,
                    u = f.halo,
                    x, y = k && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (q || n && !1 === h.enabled) || a && l.states && l.states[a] && !1 === l.states[a].enabled)) {
                    y && (x = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" +
                        this.state), a && this.graphic.addClass("highcharts-point-" + a), x && this.graphic.animate(x, m(v.options.chart.animation, h.animation, k.animation)), r && r.hide();
                    else {
                        if (a && h)
                            if (k = l.symbol || f.symbol, r && r.currentSymbol !== k && (r = r.destroy()), r) r[b ? "animate" : "attr"]({
                                x: x.x,
                                y: x.y
                            });
                            else k && (f.stateMarkerGraphic = r = v.renderer.symbol(k, x.x, x.y, x.width, x.height).add(f.markerGroup), r.currentSymbol = k);
                        r && (r[a && v.isInsidePlot(c, e, v.inverted) ? "show" : "hide"](), r.element.point = this)
                    }(c = g.halo) && c.size ? (u || (f.halo = u = v.renderer.path().add((this.graphic ||
                        r).parentGroup)), u.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), u.attr({
                        "class": "highcharts-halo highcharts-color-" + m(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : "")
                    }), u.point = this) : u && u.point && u.point.haloPath && u.animate({
                        d: u.point.haloPath(0)
                    }, null, u.hide);
                    this.state = a;
                    t(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        x(g.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && t(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && t(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function (a) {
                var b = this;
                a = a || "";
                b.state !== a && (n([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                    c &&
                        (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a)
            },
            setVisible: function (a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, g = d.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                n(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && n(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                n(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                t(c, f)
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                t(this, a ? "select" : "unselect")
            },
            drawTracker: J.drawTrackerGraph
        })
    })(L);
    (function (a) {
        var A = a.Chart,
            E = a.each,
            D = a.inArray,
            q = a.isArray,
            f = a.isObject,
            d = a.pick,
            n = a.splat;
        A.prototype.setResponsive = function (d) {
            var f = this.options.responsive,
                k = [],
                c = this.currentResponsive;
            f && f.rules && E(f.rules, function (c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, k, d)
            }, this);
            var e = a.merge.apply(0, a.map(k, function (c) {
                    return a.find(f.rules, function (a) {
                        return a._id === c
                    }).chartOptions
                })),
                k = k.toString() || void 0;
            k !== (c && c.ruleIds) && (c && this.update(c.undoOptions, d), k ? (this.currentResponsive = {
                    ruleIds: k,
                    mergedOptions: e,
                    undoOptions: this.currentOptions(e)
                },
                this.update(e, d)) : this.currentResponsive = void 0)
        };
        A.prototype.matchResponsiveRule = function (a, f) {
            var k = a.condition;
            (k.callback || function () {
                return this.chartWidth <= d(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= d(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= d(k.minWidth, 0) && this.chartHeight >= d(k.minHeight, 0)
            }).call(this) && f.push(a._id)
        };
        A.prototype.currentOptions = function (d) {
            function t(c, d, k, u) {
                var e;
                a.objectEach(c, function (a, c) {
                    if (!u && -1 < D(c, ["series", "xAxis", "yAxis"]))
                        for (a = n(a), k[c] = [], e = 0; e <
                            a.length; e++) d[c][e] && (k[c][e] = {}, t(a[e], d[c][e], k[c][e], u + 1));
                    else f(a) ? (k[c] = q(a) ? [] : {}, t(a, d[c] || {}, k[c], u + 1)) : k[c] = d[c] || null
                })
            }
            var k = {};
            t(d, this.options, k, 0);
            return k
        }
    })(L);
    return L
});
