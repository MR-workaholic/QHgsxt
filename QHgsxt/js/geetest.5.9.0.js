"5.9.0";
"use strict"; !
function(a, b) {
    a.Geetest = b(a, a.jQuery || a.Zepto || a.ender || a.$),
    "function" == typeof define && define.amd ? define("Geetest", ["jquery"],
    function(c) {
        return b(a, c)
    }) : "undefined" != typeof exports && (exports = b(a))
} (this,
function(a, b) {
    function c(a, b) {
        if (! (this instanceof c)) return new c(a, b);
        if ("string" != typeof a.gt) throw new Error(e.gtError);
        var d = this;
        return d.id = o(),
        k.z(d.id),
        Q.z(d.id, d),
        k.B("error", ra.onError, d.id),
        d.config = B(a, d),
        d.config.protocol = d.config.https ? "https://": location.protocol + "//",
        "https://" === d.config.protocol && (d.config.https = !0),
        b || a.offline ? (P(!1, a, d), a.popupbtnid && d.bindOn("#" + a.popupbtnid)) : G(d.config.apiserver + "get.php?" + m(a), P, d),
        O(d),
        d
    }
    function d(a, b) {
        return a.type || (a.type = "slide"),
        new d[a.type](a, b)
    }
    var e = {
        gtError: "初始化gt传参错误",
        challengeError: "初始化challenge传参错误",
        domSelectorError: "参数必须为ID选择器或DOM元素",
        callbackError: "回调接口参数必须为函数",
        getError: "initGeetest接口配置参数错误，请检查gt与challenge"
    },
    f = {};
    f.serial = function(a, b) {
        var c = a.length,
        d = [!1],
        e = 1,
        f = function(g, h) {
            return h ? (d = [!0], void b.apply(null, d)) : (d[e] = g, e += 1, void(e > c ? b.apply(null, d) : a[e - 1](f)))
        };
        a[0](f)
    },
    f.parallel = function(a, b) {
        for (var c = a.length,
        d = [!1], e = 0, f = function(a) {
            return function(f, g) {
                if (e !== -1) {
                    if (g) return d = [!0],
                    b.apply(null, d),
                    d = [],
                    void(e = -1);
                    e += 1,
                    d[a] = f,
                    e === c && b.apply(null, d)
                }
            }
        },
        g = 1; g <= c; g += 1) a[g - 1](f(g), g)
    };
    var g = {},
    h = {},
    i = function(a) {
        return h[a] && h[a].content
    },
    j = function(a, b, c) {
        b in h ? "loaded" === h[b].status ? c && c(h[b].content) : "loading" === h[b].status ? k.u(b + "Loaded",
        function() {
            c && c(h[b].content)
        }) : w("module " + b + " lost!") : (h[b] = {
            status: "loading"
        },
        F(a, "js/" + b.toLowerCase() + "." + a.config.version + ".js",
        function(d) {
            return d ? (w("module " + b + " can not loaded"), void k.v("error", a.id)) : void j(a, b, c)
        }))
    };
    g.x = function(a, b, c) {
        var d;
        if (v(b)) {
            for (var e = [], f = 0; f < b.length; f++) e[f] = i(b[f]);
            d = c.apply(null, e)
        } else d = b();
        return h[a] = {},
        h[a].status = "loaded",
        h[a].content = d,
        k.y(a + "Loaded"),
        d
    };
    var k = {};
    k.b = {},
    k.b.global = {},
    k.z = function(a) {
        k.b[a] = {}
    },
    k.A = function(a) {
        k.b[a] = void 0
    },
    k.B = function(a, b, c) {
        return c ? (k.b[c][a] || (k.b[c][a] = []), void k.b[c][a].push({
            once: !1,
            callback: b
        })) : (k.b.global[a] || (k.b.global[a] = []), void k.b.global[a].push({
            once: !1,
            callback: b
        }))
    },
    k.u = function(a, b, c) {
        c ? (k.b[c][a] || (k.b[c][a] = []), k.b[c][a].push({
            once: !0,
            callback: b
        })) : (k.b.global[a] || (k.b.global[a] = []), k.b.global[a].push({
            once: !0,
            callback: b
        }))
    },
    k.C = function(a, b, c) {
        var d;
        d = c ? k.b[c][a] : k.b.global[a],
        d.splice(p(b, d), 1)
    },
    k.D = function(a, b) {
        q(k.b, b)
    },
    k.v = function(a, b) {
        var c, d = k.b[b][a];
        if (d) for (var e = 0; e < d.length; e++) c = d[e],
        c && (c.callback.call(Q.t("self", b)), c.once && (k.C(a, c, b), e -= 1))
    },
    k.y = function(a) {
        var b, c = k.b.global[a];
        if (c) for (var d = 0; d < c.length; d++) b = c[d],
        b && (b.callback(), b.once && (k.C(a, b), d -= 1))
    };
    var l = function(a, b) {
        var c = b || {};
        for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
        return c
    },
    m = function(a) {
        var b = [];
        for (var c in a) if (a.hasOwnProperty(c)) {
            var d = typeof a[c];
            "number" !== d && "string" !== d && "boolean" !== d || b.push(c + "=" + a[c])
        }
        return b.join("&")
    },
    n = function(a) {
        return "function" == typeof a
    },
    o = function() {
        return parseInt(1e4 * Math.random()) + (new Date).valueOf()
    },
    p = function(a, b, c) {
        var d, e = Array.prototype.indexOf;
        if (b) {
            if (e) return e.call(b, a, c);
            for (d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c: 0; c < d; c++) if (c in b && b[c] === a) return c
        }
        return - 1
    },
    q = function(a, b) {
        a[b] = void 0;
        try {
            delete a[b]
        } catch(c) {}
    },
    r = function(a, b) {
        try {
            a.innerHTML = b
        } catch(c) {
            a.innerText = b
        }
    },
    s = function(a, b) {
        return Array.prototype.slice.call(a, b)
    },
    t = function(a, b) {
        if (a === b) return ! 0;
        if (null == a || null == b) return ! 1;
        if (a.length != b.length) return ! 1;
        for (var c = 0; c < a.length; ++c) if (a[c] !== b[c]) return ! 1;
        return ! 0
    },
    u = function(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c.push(a[d] - b[d]);
        return c
    },
    v = function(a) {
        return Array.isArray ? Array.isArray(a) : "[object Array]" === Object.prototype.toString.call(a)
    },
    w = function(a) {
        try {
            console && console.log(a)
        } catch(b) {}
    },
    x = function() {
        var a = function(a, b) {
            var c;
            if (v(a)) {
                c = [];
                for (var d = 0,
                e = a.length; d < e; d += 1) c[d] = b(d, a[d])
            } else {
                c = {};
                for (var f in a) a.hasOwnProperty(f) && (c[f] = b(f, a[f]))
            }
            return c
        },
        b = function(a) {
            var b = 0;
            if (v(a)) b = a.length;
            else for (var c in a) a.hasOwnProperty(c) && (b += 1);
            return b
        };
        return {
            n: a,
            F: b
        }
    } (),
    y = {
        challenge: "",
        type: "slide",
        fullbg: "",
        bg: "",
        slice: "",
        xpos: 0,
        ypos: 0,
        height: 116,
        link: "javascript:;",
        https: !1,
        logo: !0,
        product: "float",
        id: "",
        version: "5.9.0",
        theme: "golden",
        theme_version: "3.2.0",
        show_delay: 250,
        hide_delay: 800,
        lang: "zh-cn",
        clean: !1,
        protocol: "http://",
        apiserver: "api.geetest.com/",
        staticservers: ["static.geetest.com/", "dn-staticdown.qbox.me/"],
        retry: 0,
        debugConfig: {}
    },
    z = {
        loaded_theme: {},
        loaded_skin: {},
        loaded_sprite: {},
        mobileSkins: {},
        mobileSprites: {},
        feedback: "http://www.geetest.com/contact/#report",
        homepage: "http://www.geetest.com/first_page"
    },
    A = function(a, b) {
        for (var c in a) a.hasOwnProperty(c) && "undefined" != typeof b[c] && (a[c] = b[c])
    },
    B = function(a, b) {
        return A(z, a),
        b.config ? l(a, l(b.config)) : l(a, l(y))
    },
    C = function(a, b) {
        var c = document.createElement("img");
        c.crossOrigin = "Anonymous",
        c.onerror = function() {
            b(!0, c),
            c.onerror = null
        },
        c.onload = c.onreadystatechange = function() {
            c.readyState && "loaded" !== c.readyState && "complete" !== c.readyState || (b(!1, c), c.onload = c.onreadystatechange = null)
        },
        c.src = a
    },
    D = function(a, b, c) {
        var d = document.createElement("link");
        d.setAttribute("rel", "stylesheet"),
        d.setAttribute("href", b),
        d.onerror = function() {
            c(!0),
            d.onload = d.onerror = null
        },
        d.onload = function() {
            c(!N(a)),
            d.onload = d.onerror = null
        },
        document.getElementsByTagName("head")[0].appendChild(d)
    },
    E = function(a, b) {
        var c = document.createElement("script");
        c.charset = "UTF-8",
        c.async = !1,
        c.onerror = function() {
            b(!0),
            c.onerror = null
        },
        c.onload = c.onreadystatechange = function() {
            c.readyState && "loaded" !== c.readyState && "complete" !== c.readyState || (b(!1, null), c.onload = c.onreadystatechange = null)
        },
        c.src = a,
        document.getElementsByTagName("head")[0].appendChild(c)
    },
    F = function(a, b, c) {
        var d = a.config.staticservers,
        e = a.config.protocol,
        f = d.length,
        g = 0,
        h = function(a, b) {
            return b.indexOf("pictures/") > -1 ? e + d[a] + b: e + d[a] + "static/" + b
        };
        "function" != typeof c && (c = function() {});
        var i = function(a, b) {
            return a ? (g += 1, void j(b)) : void c(!1, b)
        },
        j = function(d) {
            return g >= f ? (b.indexOf("pictures") === -1 && k.v("error", a.id), void c(!0, d)) : void(b.indexOf(".js") > -1 ? E(h(g, b), i) : b.indexOf(".png") > -1 || b.indexOf(".jpg") > -1 || b.indexOf(".webp") > -1 || b.indexOf(".svg") > -1 ? C(h(g, b), i) : b.indexOf(".css") > -1 ? D(a, h(g, b), i) : (b && w("no such resource: " + b), c(!0, d)))
        };
        j(null)
    },
    G = function(a, b, c) {
        a = c.config.protocol + a.replace(/http:\/\/|https:\/\//, "");
        var d = "geetest_" + o();
        window[d] = function(a) {
            a.error && (w(a.error), k.v("error", c.id), k.v("statusChange", c.id), q(window, d)),
            b.call(c, !1, a, c)
        },
        E(a + "&callback=" + d,
        function(b) {
            b && (w("GeeTest Error: request " + a + " can not access"), k.v("error", c.id), k.v("statusChange", c.id), q(window, d))
        })
    },
    H = document.createElement("img");
    H.onload = H.onerror = function() {
        var a = ".jpg";
        2 === H.height && (a = ".webp"),
        z.webp = a,
        k.y("WebPLoaded")
    },
    H.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";
    var I = /msie 6/i.test(navigator.userAgent),
    J = -1,
    K = /msie|trident\/|edge/i.test(navigator.userAgent),
    L = function() {
        return J = "transition" in document.body.style || "webkitTransition" in document.body.style || "mozTransition" in document.body.style || "msTransition" in document.body.style
    };
    document && document.body && L(),
    I && (z.webp = ".jpg");
    var M = function(a, b) {
        var c;
        return a.currentStyle ? c = a.currentStyle[b] : window.getComputedStyle && (c = window.getComputedStyle(a, null).getPropertyValue(b)),
        c
    },
    N = function(a) {
        if (!K) return ! 0;
        var b = "178273px",
        c = Q.t("styleDetectEle", a.id);
        return ! (!c || M(c, "width") !== b) && (c.parentNode.removeChild(c), Q.G("styleDetectEle", !1, a.id), !0)
    },
    O = function(a) {
        if (K) {
            var b = document.createElement("div");
            b.id = "geetest_style_detect_178273px",
            Q.G("styleDetectEle", b, a.id),
            document.getElementsByTagName("body")[0].appendChild(b)
        }
    };
    c.type = "slide";
    var P = function(a, b, c) {
        return ! (a || !b) && (c.config.debugConfig && (b = l(c.config.debugConfig, b), c.config = B(b, c)), J == -1 && L(), void f.parallel([function(a) {
            b.offline ? j(c, "Offline",
            function(b) {
                a(b)
            }) : a(null)
        },
        function(a) {
            b.fullpage ? j(c, "Fullpage",
            function(b) {
                a(b)
            }) : a(null)
        },
        function(a) {
            b.benchmark ? j(c, "Benchmark",
            function(b) {
                a(b)
            }) : a(null)
        }],
        function(a, d, e, g) {
            e && e.c(),
            b.offline ? c.config = B(d.c(c), c) : c.config = B(b, c),
            k.B("success", ra.onSuccess, c.id),
            k.B("refresh", ra.onRefresh, c.id),
            k.B("fail", ra.onFail, c.id),
            k.B("forbidden", ra.onForbidden, c.id),
            k.B("abuse", ra.onAbuse, c.id),
            k.u("DOMReady",
            function() {
                c.config.benchmark && i("Benchmark").c(c),
                "popup" === c.config.product && ia.c(c)
            },
            c.id),
            k.u("DOMReady", ra.onReady, c.id),
            f.serial([function(a) {
                c.config.mobile ? j(c, "SVG",
                function(b) {
                    a(b)
                }) : "curtain" === c.config.type ? j(c, "Curtain",
                function(b) {
                    a(b)
                }) : a(null)
            }],
            function() {
                if (z.loaded_theme[c.config.theme]) c.config.mobile && !z.mobileSkins[c.config.theme] ? k.u(c.config.theme + "Loaded",
                function() {
                    Q.G("loaded", !0, c.id),
                    k.v("loaded", c.id)
                }) : (Q.G("loaded", !0, c.id), k.v("loaded", c.id));
                else if (z.loaded_theme[c.config.theme] = !0, c.config.mobile) {
                    if (window.GeeTestSkins && window.GeeTestSkins[c.config.theme]) return z.mobileSkins[c.config.theme] = window.GeeTestSkins[c.config.theme],
                    Q.G("loaded", !0, c.id),
                    void k.v("loaded", c.id);
                    F(c, c.config.theme + "/skin." + c.config.theme_version + ".js",
                    function(a) {
                        return a ? (w("svg " + c.config.theme + " skin.js can not loaded"), void k.v("error", c.id)) : (z.mobileSkins[c.config.theme] = window.GeeTestSkins[c.config.theme], k.y(c.config.theme + "Loaded"), Q.G("loaded", !0, c.id), void k.v("loaded", c.id))
                    })
                } else f.parallel([function(a) {
                    F(c, c.config.theme + "/style" + (c.config.https ? "_https": "") + "." + c.config.theme_version + ".css",
                    function(b) {
                        b && k.v("error", c.id),
                        a(null, !0)
                    })
                },
                function(a) {
                    setTimeout(function() {
                        a(null, !0)
                    },
                    600)
                }],
                function() {
                    Q.G("loaded", !0, c.id),
                    k.v("loaded", c.id)
                })
            })
        }))
    },
    Q = {};
    Q.b = {},
    Q.z = function(a, b) {
        Q.b[a] = {},
        Q.b[a].self = b
    },
    Q.G = function(a, b, c) {
        return Q.b[c][a] = b,
        b
    },
    Q.t = function(a, b) {
        return Q.b[b][a]
    },
    Q.A = function(a) {
        Q.b[a] = void 0
    };
    var R = function(a) {
        var b = {
            "zh-cn": {
                popup_ready: "请先完成下方验证",
                popup_finish: "页面将在2秒后跳转",
                loading: "加载中...",
                slide: "按住左边滑块，拖动完成上方拼图",
                refresh: "刷新验证",
                help: "帮助反馈",
                feedback: "反馈",
                fail: ["验证失败:", "拖动滑块将悬浮图像正确拼合"],
                success: ["验证通过:", "sec 秒的速度超过 score% 的用户"],
                abuse: ["尝试过多:", "系统正在自动刷新图片"],
                forbidden: ["再来一次:", "哇哦～怪物吃了拼图 count 秒后重试"],
                error: ["出现错误:", "请关闭验证重试"],
                curtain: "点击上图按钮并沿道路拖动到终点处",
                curtain_knob: "移动到此开始验证"
            },
            "zh-tw": {
                popup_ready: "請先完成下方驗證",
                popup_finish: "頁面將在2秒後跳轉",
                loading: "載入中...",
                slide: "按住左邊滑塊，拖動完成上方拼圖",
                refresh: "更新驗證圖",
                help: "幫助",
                feedback: "回報問題",
                fail: ["驗證失敗:", "請將懸浮圖片拼合"],
                success: ["驗證通過:", "sec 秒的速度超過 score% 的用戶"],
                abuse: ["嘗試過多次:", "系統正在更新圖片"],
                forbidden: ["再來一次:", "小怪物吃掉了拼圖 count 秒後重試"],
                error: ["出現錯誤:", "請關閉驗證後重試"],
                curtain: "點擊上圖並沿路線滑至終點",
                curtain_knob: "滑動至此完成驗證"
            },
            ja: {
                popup_ready: "ログイン認証を行ってください",
                popup_finish: "2秒後でリダイレクトします",
                loading: "読み込み中…",
                slide: "スライドして認証を完成させてください",
                refresh: "画像更新",
                help: "ヘルプ",
                feedback: "コメント",
                fail: ["認証失敗:", "パズルを合わせてください"],
                success: ["認証完了:", "認証が完了しました"],
                abuse: ["", "画像が更新されています"],
                forbidden: ["もう一度:", "count秒後もう一度やり直してください"],
                error: ["エラーです:", "もう一度やり直してください"],
                curtain: "ボタンを終点までドラックしてください",
                curtain_knob: "ここから認証を始めます"
            },
            ko: {
                popup_ready: "다음 인증을 완성하세요",
                popup_finish: "불러오는 중",
                loading: "불러오는 중...",
                slide: "버튼 드리그하여 인증하세요",
                refresh: "갱신",
                help: "문의",
                feedback: "문의",
                fail: ["인증실패", ""],
                success: ["인증성공", ""],
                abuse: ["자동재행 중", ""],
                forbidden: ["다시 시도하세요", ""],
                error: ["다시 시도하세요", ""],
                curtain: "길을 따라 버튼을 드래그",
                curtain_knob: "확인하기 위해 여기로 이동"
            },
            en: {
                popup_ready: "Complete verification below",
                popup_finish: "You will be redirected in 2 seconds",
                loading: "loading...",
                slide: "Drag the left slider to verify",
                refresh: "Refresh",
                help: "Support",
                feedback: "Feedback",
                fail: ["Unsuccessful:", "Complete the puzzles"],
                success: ["Success:", "Take secs and defeat score% users"],
                abuse: ["Excessive:", "Server is refreshing the image"],
                forbidden: ["Try Again:", "Wow~ Monster eats the image"],
                error: ["Server Error:", "Please try again later"],
                curtain: "Drag the button along the road",
                curtain_knob: "Move here to verify"
            },
            th: {
                popup_ready: "กรุณาดำเนินการตรวจสอบด้านล่าง",
                popup_finish: "กรุณารอสักครู่",
                loading: "กำลังดาวน์โหลด...",
                slide: "กดค้างและลากเพื่อต่อภาพให้สมบูรณ์",
                refresh: "รีเฟรช",
                help: "ช่วยเหลือ",
                feedback: "ช่วยเหลือ",
                fail: ["ล้มเหลว:", "กดและลากเพื่อประกอบภาพ"],
                success: ["", "สำเร็จ ความเร็ว sec วินาที เร็วมากๆ"],
                abuse: ["", "ระบบกำลังดำเนินการเปลี่ยนภาพใหม่"],
                forbidden: ["", "อุ๊ย! ต่อภาพไม่ถูกต้องกรุณาลองใหม่"],
                error: ["", "กรุณาปิดและเปิดใหม่อีกครั้ง"],
                curtain: "Drag the button along the road",
                curtain_knob: "Move here to verify"
            }
        };
        if ("string" != typeof a) return b["zh-CN"];
        a = a.toLowerCase();
        var c = a.indexOf("-"),
        d = c > -1 ? a.slice(0, c) : a;
        return "zh" === d && (d += a.indexOf("tw") > -1 || a.indexOf("hk") > -1 ? "-tw": "-cn"),
        b[d] || b["zh-cn"]
    },
    S = {};
    S.H = function ta(a, b, c) {
        var d, e = document.createElement("div");
        if (b = b || e.cloneNode(), "string" == typeof a) return void b.appendChild(document.createTextNode(a));
        for (d in a) if (a.hasOwnProperty(d)) {
            var f, g = d.split("."),
            h = "" === g[0] ? "div": g[0],
            i = g[1];
            "input" === h ? (f = document.createElement(h), f.className = i, f.type = "hidden", f.name = i) : (f = document.createElement(h), f.className = i),
            b.appendChild(f),
            c(f, "." + i.split(" ")[0]),
            ta(a[d], f, c)
        }
        return b.childNodes ? b: null
    },
    S.I = function(a) {
        var b = R(a);
        return {
            ".gt_widget": {
                ".gt_holder_top": {},
                ".gt_box_holder": {
                    ".gt_box": {
                        ".gt_loading": {
                            ".gt_loading_icon": {},
                            ".gt_loading_text": b.loading
                        },
                        "a.gt_bg": {
                            ".gt_cut_bg": {},
                            ".gt_slice": {}
                        },
                        "a.gt_fullbg": {
                            ".gt_cut_fullbg": {},
                            ".gt_flash": {},
                            ".gt_ie_success": {}
                        },
                        "a.gt_curtain": {
                            ".gt_curtain_bg_wrap": {
                                ".gt_curtain_bg": {
                                    ".gt_cut_curtain": {}
                                }
                            },
                            ".gt_curtain_button": {}
                        },
                        "a.gt_box_tips": {}
                    },
                    ".gt_info": {
                        ".gt_info_tip": {
                            ".gt_info_icon": {},
                            ".gt_info_text": {}
                        }
                    }
                },
                ".gt_bottom": {
                    "a.gt_refresh_button": {
                        ".gt_refresh_tips": b.refresh
                    },
                    "a.gt_help_button": {
                        ".gt_help_tips": b.help
                    },
                    "a.gt_logo_button": {}
                }
            },
            ".gt_input": {
                "input.geetest_challenge": {},
                "input.geetest_validate": {},
                "input.geetest_seccode": {}
            },
            ".gt_slider": {
                ".gt_guide_tip": b.slide,
                ".gt_slider_knob": {},
                ".gt_curtain_tip": b.curtain,
                ".gt_curtain_knob": b.curtain_knob,
                ".gt_ajax_tip": {}
            }
        }
    },
    S.J = function(a, b) {
        return a.parentNode.insertBefore(b, a.nextSibling),
        b
    },
    S.K = function(a, b) {
        "string" == typeof a ? 0 == a.indexOf("#") ? a = document.getElementById(a.replace("#", "")) : "querySelector" in document ? a = document.querySelector(a) : n(window.jQuery) && (a = window.jQuery(a)[0]) : a.length && (a = a[0]);
        var c;
        try {
            c = Node.ELEMENT_NODE
        } catch(d) {
            c = 1
        }
        try {
            if (a.nodeType === c) return a
        } catch(d) {
            throw new Error("接口" + b + "传参错误:" + e.domSelectorError)
        }
    },
    S.L = function(a) {
        try {
            for (var b = a; a.parentNode != document.body && b.offsetTop - a.parentNode.offsetTop < 160;) a = a.parentNode,
            "hidden" == M(a, "overflow") && (a.style.overflow = "visible")
        } catch(c) {}
    },
    S.M = function(a) {
        for (var b = a.offsetLeft,
        c = a.offsetParent; null !== c;) b += c.offsetLeft,
        c = c.offsetParent;
        return b
    },
    S.N = function(a) {
        for (var b = a.offsetTop,
        c = a.offsetParent; null !== c;) b += c.offsetTop,
        c = c.offsetParent;
        return b
    },
    S.O = function(a, b) {
        a.style.top = S.N(b) - 160 + "px",
        a.style.left = S.M(b) + "px"
    },
    S.P = function(a, b) {
        var c = this;
        a = S.K(a, "appendTo"),
        S.Q(c);
        var d = c.$;
        if ("gyroscope" === c.config.type) i("Gyro").c(c).S(c).R(c);
        else if (c.config.mobile) {
            var e = i("SVG");
            e.c(c),
            e.S(c),
            e.R(c)
        } else {
            if ("popup" !== c.config.product) c.dom = S.H(S.I(c.config.lang), !1, d);
            else {
                var f = i("Popup");
                c.dom = S.H(f.I(c.config.lang), !1, d)
            }
            if (S.T(c, !0), S.U(c), S.V(c), S.W(c, !0), ba.X(c), "curtain" === c.config.type) {
                var g = i("Curtain");
                g.X(c)
            }
            d(".gt_flash").style.height = c.config.height - 22 + "px"
        }
        if (c.dom.style["touch-action"] = "none", c.dom.style["ms-touch-action"] = "none", ma(c), c.dom.id = "geetest_" + c.id, c.config.mobile ? c.dom.className = "gt_mobile_holder " + c.config.product: c.dom.className = "gt_holder " + c.config.product + " gt_" + c.config.product, "float" != c.config.product || c.config.mobile || ha(c), "popup" != c.config.product || c.config.mobile) b ? S.J(a, c.dom) : a.appendChild(c.dom);
        else {
            document.body.appendChild(c.dom);
            var h = d(".gt_input");
            b ? S.J(a, h) : a.appendChild(h)
        }
        if ("gyroscope" === c.config.type && Q.G("scale", c.dom.clientWidth / 260, c.id), "float" === c.config.product && !c.config.mobile) if (c.config.sandbox) {
            var j = d(".gt_widget");
            c.dom.removeChild(j);
            var l = document.createElement("div");
            l.className = c.dom.className + " gt_clone",
            l.appendChild(j),
            document.getElementsByTagName("body")[0].appendChild(l),
            S.O(l, c.dom),
            c.cloneDom = l
        } else setTimeout(function() {
            S.L(c.dom)
        },
        2e3);
        Q.G("DOMReady", !0, c.id),
        k.v("DOMReady", c.id)
    },
    S.T = function(a, b) {
        var c = a.$;
        if (T.Y(c(".gt_curtain")), T.Y(c(".gt_curtain_button")), T.Y(c(".gt_curtain_tip")), T.Y(c(".gt_curtain_knob")), "slide" == a.config.type) ba.Z(a, b);
        else {
            var d = i("Curtain");
            ba.Y(a, b),
            d.Z(a, b)
        }
    },
    S.V = function(a) {
        var b = a.$,
        c = b(".gt_logo_button");
        a.config.logo ? (c.href = z.homepage, c.target = "_blank") : (S._(c, "no_logo"), S._(c, "gt_no_logo")),
        a.config.clean && (S._(b(".gt_widget"), "clean"), S._(b(".gt_widget"), "gt_clean"));
        var d = b(".gt_help_button");
        d.href = z.feedback,
        d.target = "_blank"
    },
    S.U = function(a) {
        var b = a.$(".gt_fullbg"),
        c = a.$(".gt_box_tips");
        a.config.link ? (b.href = c.href = a.config.link, b.target = c.target = "_blank") : (c.style.display = "none", b.removeAttribute("href"), b.style.cursor = "default")
    },
    S._ = function(a, b) {
        if (a) {
            for (var c = b.split(" "), d = a.className.split(" "), e = 0, f = c.length; e < f; e++) p(c[e], d) == -1 && d.push(c[e]);
            a.className = d.join(" ")
        }
    },
    S.aa = function(a, c) {
        if (a) {
            "string" == typeof a && (a = b(a));
            for (var d, e = c.split(" "), f = a.className.split(" "), g = 0, h = e.length; g < h; g++) d = p(e[g], f),
            d != -1 && f.splice(d, 1);
            a.className = f.join(" ")
        }
    },
    S.ba = function(a, b) {
        var c = a.className.split(" ");
        return p(b, c) != -1
    },
    S.ca = function(a, b, c) {
        var d = function() {
            var d = new Date,
            e = x.F(b),
            f = {},
            g = !1,
            h = 0,
            i = function() {
                if (! (h < e)) if (g) a.config.retry += 1,
                Q.G("status", "auto", a.id),
                a.refresh();
                else {
                    a.config.retry = 0;
                    var b = I ? -2 : (new Date).getTime() - d.getTime();
                    c(f, b)
                }
            };
            x.n(b,
            function(b, c) {
                F(a, c.replace(".jpg", z.webp),
                function(a, c) {
                    h += 1,
                    g || (a ? "fullbg" !== b ? g = !0 : f[b] = !1 : !I && c.src && c.src.indexOf(".webp") > -1 && (!c.width || c.width < 10) ? (z.webp = ".jpg", g = !0) : f[b] = c),
                    i()
                })
            })
        };
        z.webp ? d() : k.u("WebPLoaded", d)
    },
    S.W = function(a, b) {
        var c = a.$,
        d = a.config.height;
        c(".gt_box_holder").style.height = d + "px",
        I && (c(".gt_cut_fullbg").style.height = d + "px", c(".gt_cut_bg").style.height = d + "px", c(".gt_curtain_bg_wrap").style.height = d + "px", c(".gt_curtain_bg").style.height = d + "px", c(".gt_cut_curtain").style.height = d + "px");
        var e = a.config.type;
        if ("slide" == e) S.ca(a, {
            fullbg: a.config.fullbg,
            bg: a.config.bg,
            slice: a.config.slice
        },
        function(d, e) {
            U.da(d.fullbg.src, d.bg.src, a, b),
            Q.G("imgload", e, a.id);
            var f = c(".gt_slice");
            I ? f.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + d.slice.src + '")': (f.style.backgroundImage = "url(" + d.slice.src + ")", f.style.width = (d.slice.width || 60) + "px", f.style.height = (d.slice.height || 60) + "px"),
            f.style.left = a.config.xpos + "px",
            f.style.top = a.config.ypos + "px",
            setTimeout(function() {
                Q.G("status", "ready", a.id),
                pa.Z("ready", a),
                k.v("statusChange", a.id)
            },
            400)
        });
        else {
            var f = 900;
            b && (f = 0),
            S.ca(a, {
                fullbg: a.config.fullbg,
                bg: a.config.bg
            },
            function(d, e) {
                var g = c(".gt_curtain_button");
                Q.G("imgload", e, a.id),
                g.style.top = a.config.ypos + "px",
                g.style.left = a.config.xpos + "px",
                U.da(d.fullbg.src, d.bg.src, a, b),
                setTimeout(function() {
                    Q.G("status", "ready", a.id),
                    pa.Z("ready", a),
                    k.v("statusChange", a.id)
                },
                f)
            })
        }
    },
    c.prototype.appendTo = function(a, b) {
        return Q.t("loaded", this.id) ? S.P.call(this, a, b) : k.u("loaded",
        function() {
            S.P.call(this, a, b)
        },
        this.id),
        this
    },
    S.Q = function(a) {
        var b = {};
        a.$ = function(a, c) {
            return a && c ? void(b[c] = a) : b[a]
        }
    };
    var T = function() {
        var a = S._,
        b = S.aa,
        c = function(c, d, e) {
            var f = function() {
                J && d ? (a(c, "gt_animate"), setTimeout(function() {
                    a(c, "gt_hide")
                }), setTimeout(function() {
                    b(c, "gt_show")
                },
                20), setTimeout(function() {
                    b(c, "gt_animate")
                },
                d)) : (b(c, "gt_show"), a(c, "gt_hide"))
            };
            return e ? setTimeout(f, e) : void f()
        },
        d = function(c, d, e) {
            var f = function() {
                J && d ? (a(c, "gt_animate"), setTimeout(function() {
                    b(c, "gt_hide")
                }), setTimeout(function() {
                    a(c, "gt_show")
                },
                20), setTimeout(function() {
                    b(c, "gt_animate")
                },
                d + 20)) : (b(c, "gt_hide"), a(c, "gt_show"))
            };
            return e ? setTimeout(f, e) : void f()
        },
        e = function(c, d, e, f, g) {
            var h = function() {
                J && d ? (a(c, "gt_animate"), "function" == typeof f && f(), "function" == typeof g && setTimeout(g, 0), setTimeout(function() {
                    b(c, "gt_animate")
                },
                d)) : "function" == typeof g && g()
            };
            return e ? setTimeout(h, e) : void h()
        };
        return {
            Y: c,
            Z: d,
            ea: e
        }
    } (),
    U = function() {
        var a = function() {
            for (var a, b = "6_11_7_10_4_12_3_1_0_5_2_9_8".split("_"), c = [], d = 0, e = 52; d < e; d++) a = 2 * parseInt(b[parseInt(d % 26 / 2)]) + d % 2,
            parseInt(d / 2) % 2 || (a += d % 2 ? -1 : 1),
            a += d < 26 ? 26 : 0,
            c.push(a);
            return c
        },
        b = function(a) {
            var b = a(".gt_fullbg"),
            c = a(".gt_cut_fullbg"),
            d = a(".gt_bg"),
            e = a(".gt_cut_bg"),
            f = a(".gt_slice"),
            g = a(".gt_curtain");
            b.style.backgroundImage = "none",
            d.style.backgroundImage = "none",
            g.style.backgroundImage = "none",
            f.style.backgroundImage = "none",
            T.Y(b),
            T.Y(d),
            T.Y(g),
            T.Y(f),
            T.Y(c),
            T.Y(e)
        },
        c = function(a, b) {
            var c = 300,
            d = 600;
            b && (c = d = 0);
            var e = a.$;
            T.Z(e(".gt_fullbg"), c),
            "slide" == a.config.type ? (T.Z(e(".gt_bg"), 0, c), T.Z(e(".gt_slice"), 0, c)) : (T.Z(e(".gt_curtain"), d), T.Z(e(".gt_curtain_button"), d))
        },
        d = function(b, c, d, e, f) {
            var g = c.split("/pictures/gt/")[1].split("/"),
            h = 8 !== g[0].length;
            if (!h) return void(d.style.backgroundImage = "url(" + c + ")");
            var i, j, k, l = [];
            if (Q.t(b + "Arr", f.id)) for (l = Q.t(b + "Arr", f.id), i = 0, j = l.length; i < j; i++) l[i].style.backgroundImage = "url(" + c + ")";
            else {
                Q.G(b + "Arr", l, f.id);
                var m, n = a(),
                o = document.createElement("div");
                for (o.className = "gt_cut_" + b + "_slice", i = 0, j = n.length; i < j; i++) k = "-" + (n[i] % 26 * 12 + 1) + "px " + (n[i] > 25 ? -f.config.height / 2 : 0) + "px",
                m = o.cloneNode(),
                m.style.backgroundImage = "url(" + c + ")",
                l.push(m),
                e.appendChild(m),
                m.style.backgroundPosition = k
            }
            T.Z(f.$(".gt_cut_" + b))
        },
        e = function(a, e, f, g) {
            var h = f.$;
            b(h),
            a && d("fullbg", a, h(".gt_fullbg"), h(".gt_cut_fullbg"), f),
            "slide" == f.config.type ? d("bg", e, h(".gt_bg"), h(".gt_cut_bg"), f) : d("curtain", e, h(".gt_curtain_bg"), h(".gt_cut_curtain"), f),
            setTimeout(function() {
                c(f, g)
            },
            100)
        },
        f = function(b) {
            var c, d, e = {
                h: null,
                w: 11
            },
            f = [],
            g = a(),
            h = 0,
            i = b / 2;
            e.h = i + 1;
            for (var j = 0,
            k = g.length; j < k; j++) c = g[j] % 26 * 12 + 1,
            d = g[j] > 25 ? i: 0,
            j > 25 && (h = i),
            f[j] = {},
            f[j].cx = j % 26 * 10,
            f[j].cy = h,
            f[j].ix = -c + f[j].cx,
            f[j].iy = -d + h;
            return e.all = f,
            e
        },
        g = function(b, c, d, e) {
            var f = document.createElement("canvas");
            f.width = b.width,
            f.height = d;
            var g = f.getContext("2d");
            g.drawImage(b, 0, 0);
            var h = c.getContext("2d");
            c.height = d,
            c.width = e;
            for (var i = d / 2,
            j = 10,
            k = a(), l = 0, m = k.length; l < m; l += 1) {
                var n = k[l] % 26 * 12 + 1,
                o = k[l] > 25 ? i: 0,
                p = g.getImageData(n, o, j, i);
                h.putImageData(p, l % 26 * 10, l > 25 ? i: 0)
            }
        };
        return {
            da: e,
            fa: b,
            ga: f,
            ha: g
        }
    } (),
    V = "move",
    W = "down",
    X = "up",
    Y = "scroll",
    Z = "blur",
    $ = "focus",
    _ = "unload",
    aa = {};
    aa.evts = {
        down: ["mousedown", "touchstart", "pointerdown", "MSPointerDown"],
        move: ["mousemove", "touchmove", "pointermove", "MSPointerMove"],
        up: ["mouseup", "touchend", "pointerup", "MSPointerUp"],
        cancel: ["touchcancel"],
        scroll: [Y],
        gyroscope: ["deviceorientation"],
        click: ["click"],
        blur: [Z],
        focus: [$],
        unload: [_]
    },
    aa.b = [],
    aa.t = function(a, b) {
        for (var c, d = 0,
        e = aa.b.length; d < e; d++) if (c = aa.b[d], c.dom == a && c.event == b) return c;
        return c = {
            dom: a,
            event: b,
            handlerList: [],
            ia: function() {}
        },
        aa.b.push(c),
        c
    },
    aa.e = function(a, b, c) {
        for (var d, e = aa.evts[b], f = aa.t(a, b), g = 0, h = e.length; g < h; g++) f.handlerList.length && (d = f.ia, window.addEventListener ? a.removeEventListener(e[g], d, !1) : window.attachEvent && a.detachEvent("on" + e[g], d)),
        window.addEventListener ? (f.handlerList.push(c), f.ia = function(b) {
            for (var c = 0,
            d = f.handlerList.length; c < d; c++) f.handlerList[c](b).call(a)
        },
        a.addEventListener(e[g], c, !1)) : window.attachEvent && a.attachEvent("on" + e[g], c)
    },
    aa.ka = function(a, b, c) {
        var d = aa.evts[b],
        e = aa.t(a, b);
        e.handlerList = [];
        for (var f = 0,
        g = d.length; f < g; f++) window.removeEventListener ? a.removeEventListener(d[f], c, !1) : window.detachEvent && a.detachEvent("on" + d[f], c)
    };
    var ba = {};
    ba.Z = function(a) {
        var b = a.$;
        ba.ea(0, a, !0),
        T.Z(b(".gt_guide_tip"), 500),
        T.Z(b(".gt_slider_knob"), 500)
    },
    ba.Y = function(a) {
        var b = a.$;
        T.Y(b(".gt_bg"), 500),
        T.Y(b(".gt_slider_knob"), 500),
        T.Y(b(".gt_guide_tip"), 500),
        setTimeout(function() {
            ba.ea(0, a, 0)
        },
        500)
    },
    ba.ia = function(a, b) {
        var c = this,
        d = c.$,
        e = d(".gt_slice"),
        f = d(".gt_slider_knob");
        if (b && b.type) return oa.Z("fail", c, 3e3),
        pa.Z("lock", c),
        T.Z(d(".gt_fullbg"), 300),
        void setTimeout(function() {
            la(b, c)
        },
        500);
        if (a || "error" === b.message) oa.Z("error", c),
        pa.Z("error", c),
        Q.G("status", "error", c.id),
        k.v("error", c.id);
        else if (b.success) {
            var g = d(".gt_flash");
            Q.G("score", b.score, c.id),
            oa.Z("success", c),
            pa.Z("success", c),
            J || T.Z(d(".gt_ie_success")),
            T.Z(g, 1500),
            T.Y(g, 0, 1600),
            T.Z(d(".gt_fullbg"), 1500),
            qa.la(b.validate, c),
            k.v("success", c.id),
            setTimeout(function() {
                Q.G("status", "success", c.id),
                k.v("statusChange", c.id)
            },
            400)
        } else "fail" == b.message ? (oa.Z("fail", c), pa.Z("fail", c), T.Y(e, 100), T.Z(e, 100, 100), T.Y(e, 100, 200), T.Z(e, 100, 300), T.ea(e, 400, 500, !1,
        function() {
            ba.ea(0, c, !0)
        }), T.ea(f, 400, 500), k.v("fail", c.id), setTimeout(function() {
            Q.G("status", "ready", c.id),
            pa.Z("ready", c),
            k.v("statusChange", c.id),
            T.Z(d(".gt_guide_tip"), 500)
        },
        1e3)) : "forbidden" == b.message ? (oa.Z("forbidden", c), pa.Z("forbidden", c), k.v("forbidden", c.id), setTimeout(function() {
            Q.G("status", "auto", c.id),
            c.refresh()
        },
        4e3)) : "abuse" == b.message && (oa.Z("abuse", c), pa.Z("fail", c), k.v("abuse", c.id), setTimeout(function() {
            Q.G("status", "auto", c.id),
            c.refresh()
        },
        1500))
    },
    ba.ea = function(a, b, c) {
        var d = b.$,
        e = d(".gt_slider_knob"),
        f = d(".gt_slice");
        a = a < 2 ? 2 : a > 198 ? 198 : a,
        c && (a = 0),
        e.style.left = a + "px",
        f.style.left = b.config.xpos + a + "px"
    },
    ba.ma = function(a) {
        var b = a.$;
        return function(c) {
            var d = Q.t("status", a.id);
            if ("ready" == d && "slide" == a.config.type && 2 != c.button) {
                if (a.config.fullpage) {
                    var e = i("Fullpage");
                    e.g(a),
                    e.i()
                }
                "pointerdown" !== c.type || Q.t("pointerdown", a.id) || Q.G("pointerdown", !0, a.id),
                Q.G("startTime", new Date, a.id),
                Q.G("status", "moving", a.id),
                k.v("statusChange", a.id),
                c.preventDefault ? c.preventDefault() : c.returnValue = !1;
                var f = b(".gt_slider_knob");
                S._(b(".gt_slice"), "moving"),
                S._(f, "moving"),
                S._(b(".gt_slice"), "gt_moving"),
                S._(f, "gt_moving");
                var g = c.clientX || c.changedTouches && c.changedTouches[0].clientX,
                h = c.clientY || c.changedTouches && c.changedTouches[0].clientY,
                j = f.getBoundingClientRect();
                Q.G("startX", g, a.id),
                Q.G("startY", h, a.id),
                na.c([Math.round(j.left - g), Math.round(j.top - h), 0], a.id),
                na.na([0, 0, 0], a.id),
                T.Y(b(".gt_fullbg"), 300),
                T.Y(b(".gt_guide_tip"), 500)
            }
        }
    },
    ba.oa = function(a) {
        return function(b) {
            var c = Q.t("status", a.id);
            if ("moving" == c && "slide" == a.config.type && (!Q.t("pointerdown", a.id) || "pointermove" === b.type)) {
                b.preventDefault ? b.preventDefault() : b.returnValue = !1;
                var d = Q.t("startX", a.id),
                e = Q.t("startY", a.id),
                f = (b.changedTouches && b.changedTouches[0].clientX || b.clientX) - d,
                g = e - (b.changedTouches && b.changedTouches[0].clientY || b.clientY),
                h = parseInt(f);
                ba.ea(h, a),
                na.na([Math.round(f), Math.round(g), (new Date).getTime() - Q.t("startTime", a.id)], a.id),
                a.config.benchmark && i("Benchmark").f(a)
            }
        }
    },
    ba.pa = function(a) {
        var b = a.$;
        return function(c) {
            var d = Q.t("status", a.id);
            if ("moving" == d && "slide" == a.config.type && (!Q.t("pointerdown", a.id) || "pointerup" === c.type)) {
                if (a.config.fullpage) {
                    var e = i("Fullpage");
                    e.j()
                }
                d = Q.G("status", "lock", a.id),
                pa.Z("lock", a),
                S.aa(b(".gt_slice"), "moving"),
                S.aa(b(".gt_slider_knob"), "moving"),
                S.aa(b(".gt_slice"), "gt_moving"),
                S.aa(b(".gt_slider_knob"), "gt_moving");
                var f = Q.t("startX", a.id),
                g = Q.t("startY", a.id),
                h = (c.changedTouches && c.changedTouches[0].clientX || c.clientX) - f,
                j = g - (c.changedTouches && c.changedTouches[0].clientY || c.clientY),
                k = new Date;
                Q.G("endTime", k, a.id),
                na.na([Math.round(h), Math.round(j), k.getTime() - Q.t("startTime", a.id)], a.id);
                var l = parseInt(h),
                n = na.qa(a.id);
                if (a.config.offline) {
                    var o = i("Offline");
                    return void ba.ia.call(a, !1, o.ajax(l, Q.t("endTime", a.id).getTime() - Q.t("startTime", a.id), a))
                }
                var p = {
                    gt: a.config.gt,
                    challenge: a.config.challenge,
                    userresponse: ba.ra(l, a.config.challenge),
                    passtime: Q.t("endTime", a.id).getTime() - Q.t("startTime", a.id),
                    imgload: Q.t("imgload", a.id),
                    a: n
                };
                if (a.config.benchmark) {
                    var q = i("Benchmark").sa(a);
                    p.b1 = q.b1,
                    p.b2 = q.b2
                }
                G(a.config.apiserver + "ajax.php?" + m(p), ba.ia, a)
            }
        }
    },
    ba.X = function(a) {
        var b = a.$,
        c = b(".gt_slider_knob"),
        d = ba.oa(a),
        e = ba.pa(a);
        Q.G("moveHandler", d, a.id),
        Q.G("upHandler", e, a.id),
        aa.e(c, W, ba.ma(a)),
        aa.e(document, V, d),
        aa.e(document, X, e)
    },
    ba.ra = function(a, b) {
        for (var c = b.slice(32), d = [], e = 0; e < c.length; e++) {
            var f = c.charCodeAt(e);
            d[e] = f > 57 ? f - 87 : f - 48
        }
        c = 36 * d[0] + d[1];
        var g = Math.round(a) + c;
        b = b.slice(0, 32);
        var h, i = [[], [], [], [], []],
        j = {},
        k = 0;
        e = 0;
        for (var l = b.length; e < l; e++) h = b.charAt(e),
        j[h] || (j[h] = 1, i[k].push(h), k++, k = 5 == k ? 0 : k);
        for (var m, n = g,
        o = 4,
        p = "",
        q = [1, 2, 5, 10, 50]; n > 0;) n - q[o] >= 0 ? (m = parseInt(Math.random() * i[o].length, 10), p += i[o][m], n -= q[o]) : (i.splice(o, 1), q.splice(o, 1), o -= 1);
        return p
    };
    var ca = function(a) {
        return function() {
            da(a)
        }
    },
    da = function(a) {
        for (var b = a.config.show_delay,
        c = a.config.hide_delay,
        d = Q.t("status", a.id), e = "ready" == d || "success" == d || "error" == d, f = Q.t("in", a.id), g = a.$(".gt_widget"), h = Q.t("hideDelay", a.id) || [], j = 0, k = h.length; j < k; j++) clearTimeout(h[j]);
        h = [];
        var l;
        if (e && !f) {
            if (S.ba(g, "gt_hide")) return;
            if ("curtain" == a.config.type) {
                var m = i("Curtain");
                l = m.setFloat(!1, a, c),
                h = h.concat(l)
            }
            h.push(T.Y(g, 400, c)),
            Q.G("hideDelay", h, a.id)
        } else {
            if (S.ba(g, "gt_show")) return;
            if (b = e ? b: 0, "curtain" == a.config.type) {
                var m = i("Curtain");
                l = m.setFloat(!0, a, b),
                h = h.concat(l)
            }
            h.push(T.Z(g, 400, b)),
            Q.G("hideDelay", h, a.id)
        }
    },
    ea = function(a, b) {
        if (!a || null == a || "undefined" == typeof a) return ! 1;
        if (b.compareDocumentPosition) {
            var c = b.compareDocumentPosition(a);
            return ! (20 !== c && 0 !== c)
        }
        if (b.contains) return b.contains(a);
        for (; a != b && a;) a = a.parentNode;
        return !! a
    },
    fa = function(a) {
        return function(b) {
            ga(b, a)
        }
    },
    ga = function(a, b) {
        var c = a.target || a.srcElement,
        d = Q.t("in", b.id),
        e = ea(c, b.dom);
        b.config.sandbox && !e && (e = ea(c, b.cloneDom)),
        d != e && (b.config.sandbox && S.O(b.cloneDom, b.dom), Q.G("in", e, b.id), k.v("hoverChange", b.id))
    },
    ha = function(a) {
        var b = a.$;
        Q.G("in", !1, a.id),
        T.Y(b(".gt_widget")),
        aa.e(document, "move", fa(a)),
        aa.e(document, "up", fa(a)),
        k.B("statusChange", ca(a), a.id),
        k.B("hoverChange", ca(a), a.id)
    },
    ia = {};
    ia.I = function(a, b) {
        a = a || z.lang;
        var c = R(a);
        return {
            ".gt_mask": {},
            ".gt_popup_wrap": {
                ".gt_popup_header": {
                    ".gt_popup_ready": c.popup_ready,
                    ".gt_popup_finish": c.popup_finish,
                    ".gt_popup_cross": {}
                },
                ".gt_popup_box": b ? b.I(a) : S.I(a)
            }
        }
    },
    ia.Z = function(a) {
        var b = a.$;
        T.Z(a.dom, 400),
        "success" == Q.t("status", a.id) && a.refresh(),
        T.Y(b(".gt_popup_finish")),
        T.Z(b(".gt_popup_ready"))
    },
    ia.Y = function(a) {
        T.Y(a.dom, 400)
    },
    ia.c = function(a) {
        if (a.config.mobile) return a;
        var b = Q.t("enablePopup", a.id);
        void 0 == b && Q.G("enablePopup", !0, a.id),
        k.B("success",
        function() {
            var b = a.$;
            T.Z(b(".gt_popup_finish")),
            T.Y(b(".gt_popup_ready")),
            setTimeout(function() {
                ia.Y(a);
                var b = Q.t("popup_btn", a.id);
                b && b.click()
            },
            1e3)
        },
        a.id);
        var c = a.$;
        aa.e(c(".gt_mask"), "click",
        function() {
            ia.Y(a)
        }),
        aa.e(c(".gt_popup_cross"), "click",
        function() {
            ia.Y(a)
        })
    },
    ia.ta = function(a) {
        var b = this;
        b.$;
        if (b.config.mobile) return b;
        if (!Q.t("DOMReady", b.id)) return void k.u("DOMReady",
        function() {
            ia.ta.call(b, a)
        },
        b.id);
        if ("popup" === b.config.product) {
            var c = S.K(a, "bindOn");
            if (!c) return void setTimeout(function() {
                ia.ta.call(b, a)
            },
            100);
            Q.G("popup_btn", c, b.id);
            var d = document.createElement("div");
            d.innerHTML = c.outerHTML,
            d = d.childNodes[0],
            c.style.display = "none",
            c.id = "origin_" + c.id,
            S.J(c, d);
            try {
                d.href = "javascript:;"
            } catch(e) {}
            Q.G("popup_copy_btn", d, b.id),
            aa.e(d, "click",
            function(a) {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                var c = Q.t("enablePopup", b.id);
                c && ia.Z(b)
            })
        }
    },
    c.prototype.bindOn = function(a) {
        return Q.t("loaded", this.id) ? ia.ta.call(this, a) : k.u("loaded",
        function() {
            ia.ta.call(this, a)
        },
        this.id),
        this
    },
    c.prototype.enable = function() {
        Q.G("enablePopup", !0, this.id)
    },
    c.prototype.disable = function() {
        Q.G("enablePopup", !1, this.id)
    },
    c.prototype.show = function() {
        var a = this,
        b = Q.t("enablePopup", a.id);
        return b && ia.Z(a),
        a
    },
    c.prototype.hide = function() {
        var a = this;
        return ia.Y(a),
        a
    };
    var ja = function(a) {
        return function() {
            ka(a)
        }
    },
    ka = function(a) {
        if (a.config.retry > 3) return w("can not loaded imgs"),
        void k.v("error", a.id);
        var b = Q.t("status", a.id);
        if ("ready" === b || "success" === b || "auto" === b) {
            if (k.v("statusChange", a.id), Q.G("status", "lock", a.id), qa.fa(a), a.config.mobile) {
                var c = i("SVG");
                c.S(a, !0)
            } else if ("gyroscope" === a.config.type) {
                var d = i("Gyro");
                d.S(a)
            } else {
                var e = a.$;
                U.fa(a.$),
                T.Y(e(".gt_ie_success")),
                pa.Z("lock", a)
            }
            if (a.config.offline) {
                var f = i("Offline");
                return void la(f.c(a), a)
            }
            G(a.config.apiserver + "refresh.php?" + m({
                challenge: a.config.challenge,
                gt: a.config.gt
            }),
            function(b, c) {
                return b ? (w("refresh error"), void k.v("error", a.id)) : void la(c, a)
            },
            a)
        }
    },
    la = function(a, b) {
        if (k.v("refresh", b.id), b.config.debugConfig && (a = l(b.config.debugConfig, a)), A(b.config, a), b.config.mobile) {
            var c = i("SVG");
            c.R(b)
        } else "gyroscope" === b.config.type ? i("Gyro").R(b) : (S.T(b), S.U(b), S.W(b));
        clearTimeout(Q.t("autoRefresh", b.id)),
        Q.G("autoRefresh", setTimeout(function() {
            b.refresh()
        },
        54e4), b.id)
    };
    c.prototype.refresh = function() {
        ka(this)
    };
    var ma = function(a) {
        if (a.config.mobile) {
            var b = Q.t("eles", a.id);
            aa.e(b.refresh, "click", ja(a));
        } else aa.e(a.$(".gt_refresh_button"), "click", ja(a));
        Q.G("autoRefresh", setTimeout(function() {
            a.refresh()
        },
        54e4), a.id),
        k.B("success",
        function() {
            clearTimeout(Q.t("autoRefresh", a.id))
        },
        a.id)
    },
    na = function() {
        var a = function(a, b) {
            Q.G("arr", [a], b)
        },
        b = function(a, b) {
            Q.t("arr", b).push(a)
        },
        c = function(a) {
            for (var b, c, d, e = [], f = 0, g = [], h = 0, i = a.length - 1; h < i; h++) b = Math.round(a[h + 1][0] - a[h][0]),
            c = Math.round(a[h + 1][1] - a[h][1]),
            d = Math.round(a[h + 1][2] - a[h][2]),
            g.push([b, c, d]),
            0 == b && 0 == c && 0 == d || (0 == b && 0 == c ? f += d: (e.push([b, c, d + f]), f = 0));
            return 0 !== f && e.push([b, c, f]),
            e
        },
        d = function(a) {
            var b = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr",
            c = b.length,
            d = "",
            e = Math.abs(a),
            f = parseInt(e / c);
            f >= c && (f = c - 1),
            f && (d = b.charAt(f)),
            e %= c;
            var g = "";
            return a < 0 && (g += "!"),
            d && (g += "$"),
            g + d + b.charAt(e)
        },
        e = function(a) {
            for (var b = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]], c = "stuvwxyz~", d = 0, e = b.length; d < e; d++) if (a[0] == b[d][0] && a[1] == b[d][1]) return c[d];
            return 0
        },
        f = function(a) {
            for (var b, f = c(Q.t("arr", a)), g = [], h = [], i = [], j = 0, k = f.length; j < k; j++) b = e(f[j]),
            b ? h.push(b) : (g.push(d(f[j][0])), h.push(d(f[j][1]))),
            i.push(d(f[j][2]));
            return g.join("") + "!!" + h.join("") + "!!" + i.join("")
        };
        return {
            qa: f,
            na: b,
            c: a
        }
    } (),
    oa = {};
    oa.da = function(a, b, c, d) {
        var e = l(R(c)[b]);
        if (d) for (var f in d) d.hasOwnProperty(f) && (e[1] = e[1].replace(f, d[f]));
        var g = document.createElement("span");
        g.className = "gt_info_type",
        r(g, e[0]);
        var h = document.createElement("span");
        h.className = "gt_info_content",
        r(h, e[1]),
        r(a, ""),
        a.appendChild(g),
        a.appendChild(h)
    },
    oa.Z = function(a, b, c) {
        var d = b.$;
        "undefined" == typeof c && (c = 2e3);
        var e = d(".gt_info"),
        f = d(".gt_info_tip");
        f.className = "gt_info_tip " + a + " gt_" + a;
        var g = Q.t("infoHide", b.id);
        g && clearTimeout(g);
        var h, i = 3,
        j = function() {
            oa.da(k, a, b.config.lang, {
                count: i
            }),
            i--,
            i == -1 && clearInterval(h)
        },
        k = d(".gt_info_text"),
        l = {};
        if ("success" == a) {
            var m = (Q.t("endTime", b.id).getTime() - Q.t("startTime", b.id)) / 1e3;
            l.sec = m.toFixed(1),
            l.score = 100 - Q.t("score", b.id)
        } else "forbidden" == a && (j(), h = setInterval(j, 1e3), c = 4e3);
        "forbidden" != a && oa.da(k, a, b.config.lang, l),
        T.Z(e, 200),
        c && Q.G("infoHide", T.Y(e, 300, c), b.id)
    };
    var pa = {};
    pa.Z = function(a, b) {
        var c = b.$;
        c(".gt_ajax_tip").className = "gt_ajax_tip " + a + " gt_" + a
    };
    var qa = {};
    qa.ua = function(a, b) {
        var c = b.$,
        d = a ? b.config.challenge: "",
        e = a ? a.split("|")[0] : "",
        f = a ? a.split("|")[0] + "|jordan": "";
        Q.G("geetest_challenge", d, b.id),
        Q.G("geetest_validate", e, b.id),
        Q.G("geetest_seccode", f, b.id),
        c(".geetest_challenge").value = d,
        c(".geetest_validate").value = e,
        c(".geetest_seccode").value = f
    },
    qa.la = function(a, b) {
        qa.ua(a, b)
    },
    qa.fa = function(a) {
        qa.ua(!1, a)
    },
    c.prototype.getValidate = function() {
        var a = {
            geetest_challenge: Q.t("geetest_challenge", this.id),
            geetest_validate: Q.t("geetest_validate", this.id),
            geetest_seccode: Q.t("geetest_seccode", this.id)
        };
        return !! a.geetest_challenge && a
    };
    var ra = {};
    ra.onStatusChange = function(a, b) {
        var c = Q.t("onStatusChange", b.id);
        "function" == typeof c && c.call(b, a);
        var d = "Success" == a ? 1 : 0;
        "function" == typeof window.gt_custom_ajax && (b.config.mobile ? window.gt_custom_ajax(d, b.dom.id, a) : window.gt_custom_ajax(d, b.$, a))
    },
    ra.onSuccess = function() {
        var a = this,
        b = Q.t("onSuccess", a.id);
        "function" == typeof b && b.call(a),
        ra.onStatusChange("Success", a)
    },
    ra.onRefresh = function() {
        var a = this,
        b = Q.t("onRefresh", a.id);
        "function" == typeof b && b.call(a),
        "function" == typeof window.gt_custom_refresh && window.gt_custom_refresh(a.$)
    },
    ra.onFail = function() {
        var a = Q.t("onFail", this.id);
        "function" == typeof a && a.call(this),
        ra.onStatusChange("Fail", this)
    },
    ra.onForbidden = function() {
        ra.onStatusChange("Forbidden", this)
    },
    ra.onAbuse = function() {
        ra.onStatusChange("Abuse", this)
    },
    ra.onError = function(a) {
        var b = this,
        c = Q.t("onError", b.id);
        "function" == typeof c && c.call(b),
        "function" == typeof window.gt_custom_error && window.gt_custom_error(b, b.$),
        a || (b.config.mobile ? k.v("SvgError", b.id) : (Q.G("status", "error", b.id), pa.Z("error", b), oa.Z("error", b, !1)), clearTimeout(Q.t("autoRefresh", b.id)))
    },
    ra.onReady = function() {
        var a = Q.t("onReady", this.id);
        "function" == typeof a && a.call(this),
        "function" == typeof window.onGeetestLoaded && window.onGeetestLoaded(this)
    },
    c.prototype.onSuccess = function(a) {
        if ("function" == typeof a) return Q.G("onSuccess", a, this.id),
        this;
        throw new Error(e.callbackError)
    },
    c.prototype.onFail = function(a) {
        if ("function" == typeof a) return Q.G("onFail", a, this.id),
        this;
        throw new Error(e.callbackError)
    },
    c.prototype.onRefresh = function(a) {
        if ("function" == typeof a) return Q.G("onRefresh", a, this.id),
        this;
        throw new Error(e.callbackError)
    },
    c.prototype.onError = function(a) {
        if ("function" == typeof a) return Q.G("onError", a, this.id),
        this;
        throw new Error(e.callbackError)
    },
    c.prototype.onStatusChange = function(a) {
        if ("function" == typeof a) return Q.G("onStatusChange", a, this.id),
        this;
        throw new Error(e.callbackError)
    },
    c.prototype.onReady = function(a) {
        if ("function" == typeof a) return Q.G("onReady", a, this.id),
        this;
        throw new Error(e.callbackError)
    },
    c.prototype.getPasstime = function() {
        return Q.t("endTime", this.id) - Q.t("startTime", this.id)
    },
    c.prototype.hideRefresh = function() {
        var a = this;
        if (!Q.t("DOMReady", a.id)) return k.u("DOMReady",
        function() {
            a.hideRefresh()
        },
        a.id),
        this;
        if (a.config.mobile) {
            var b = Q.t("eles", a.id);
            b.refresh.parentNode.removeChild(b.refresh),
            b.refresh = {
                style: {}
            }
        } else {
            var c = this.$ && this.$(".gt_refresh_button");
            if (!c) return;
            c.style.width = "0";
            try {
                c.style.setProperty("margin-left", "0", "important")
            } catch(d) {}
        }
    };
    var sa = function(a, b) {
        Q.G("scale", b / 260, a.id);
        var c = Q.t("eles", a.id);
        a.dom.style.width = b + "px",
        c.svg.style.width = b + "px",
        c.svg.style.height = Math.ceil(b * (a.config.height + Q.t("panelHeight", a.id)) / 260) + "px"
    };
    c.prototype.zoom = function(a) {
        var b = this;
        if (!Q.t("DOMReady", b.id)) return k.u("DOMReady",
        function() {
            b.zoom(a)
        },
        b.id),
        this;
        if (!b.config.mobile && "gyroscope" !== b.config.type) return this;
        if ("string" == typeof a && a.indexOf("%") > -1) {
            var c = getComputedStyle ? getComputedStyle(b.dom.parentNode).width: b.dom.parentNode.currentStyle.width;
            a = parseInt(a) * parseInt(c) / 100
        }
        return sa(b, parseInt(a)),
        this
    },
    c.prototype.destroy = function() {
        var a = this;
        if (!Q.t("DOMReady", a.id)) return k.u("DOMReady",
        function() {
            a.destroy()
        },
        a.id),
        this;
        if (a.dom && a.dom.parentNode && a.dom.parentNode.removeChild(a.dom), "popup" === a.config.product) {
            var b = Q.t("popup_btn", a.id),
            c = Q.t("popup_copy_btn", a.id);
            c && c.parentNode && c.parentNode.removeChild(c),
            b && (b.style.display = "inline-block", b.id = b.id.replace("origin_", ""));
            var d = a.$(".gt_input");
            d && d.parentNode && d.parentNode.removeChild(d)
        }
        aa.ka(document, "move", Q.t("moveHandler", a.id)),
        aa.ka(document, "up", Q.t("upHandler", a.id)),
        Q.A(a.id),
        k.A(a.id)
    },
    g.x("Event",
    function() {
        return k
    }),
    g.x("Animate",
    function() {
        return T
    }),
    g.x("Browser",
    function() {
        return {
            getCSS3: L
        }
    }),
    g.x("Request",
    function() {
        return G
    }),
    g.x("Data",
    function() {
        return Q
    }),
    g.x("Decoder",
    function() {
        return U
    }),
    g.x("Dom",
    function() {
        return S
    }),
    g.x("DomEvent",
    function() {
        return aa
    }),
    g.x("Info",
    function() {
        return oa
    }),
    g.x("Input",
    function() {
        return qa
    }),
    g.x("getLang",
    function() {
        return R
    }),
    g.x("Popup",
    function() {
        return ia
    }),
    g.x("Slide",
    function() {
        return ba
    }),
    g.x("Tip",
    function() {
        return pa
    }),
    g.x("Tool",
    function() {
        return {
            copy: l,
            toParam: m,
            isFunction: n,
            random: o,
            inArray: p,
            removeProperty: q,
            setText: r,
            slice: s,
            arrayEqual: t,
            diff: u,
            isArray: v,
            getResource: F,
            log: w
        }
    }),
    g.x("Analyse",
    function() {
        return na
    }),
    g.x("Global",
    function() {
        return z
    }),
    g.x("Flow",
    function() {
        return f
    }),
    g.x("Modules",
    function() {
        return h
    }),
    g.x("Flow",
    function() {
        return f
    }),
    g.x("getModule",
    function() {
        return i
    }),
    g.x("Utility",
    function() {
        return x
    }),
    d.type = "shell";
    var a = a || window;
    return a.Geetest ? (a.Geetest.type = a.Geetest.type || void 0, a.Geetest.type !== d.type ? ("slide" === c.type ? d.slide = c: (d.slide = a.Geetest, d[c.type] = c), a.Geetest = d) : a.Geetest[c.type] || (a.Geetest[c.type] = c)) : (d[c.type] = c, a.Geetest = d),
    a.Geetest.define || (a.Geetest.define = function(a, b, c) {
        g.x(a, b, c)
    }),
    a.Geetest
});
