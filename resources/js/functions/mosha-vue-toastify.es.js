var e = Object.defineProperty, t = Object.defineProperties, o = Object.getOwnPropertyDescriptors,
    n = Object.getOwnPropertySymbols, s = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable,
    r = (t, o, n) => o in t ? e(t, o, {enumerable: !0, configurable: !0, writable: !0, value: n}) : t[o] = n,
    l = (e, t) => {
        for (var o in t || (t = {})) s.call(t, o) && r(e, o, t[o]);
        if (n) for (var o of n(t)) i.call(t, o) && r(e, o, t[o]);
        return e
    }, a = (e, n) => t(e, o(n));
import {
    computed as h,
    createBlock as f,
    createCommentVNode as b,
    createVNode as d,
    defineComponent as v,
    onMounted as p,
    onUnmounted as c,
    openBlock as m,
    ref as u,
    render as x,
    renderSlot as T,
    resolveComponent as _,
    toDisplayString as I,
    Transition as w,
    watchEffect as g,
    withCtx as y
} from "vue";

const C = {
    type: "default",
    timeout: 5e3,
    showCloseButton: !0,
    position: "top-right",
    transition: "bounce",
    hideProgressBar: !1,
    swipeClose: !0
};
var M, E;
(E = M || (M = {}))[E.TITLE_ONLY = 0] = "TITLE_ONLY", E[E.TITLE_DESCRIPTION = 1] = "TITLE_DESCRIPTION", E[E.COMPONENT = 2] = "COMPONENT", E[E.VNODE = 3] = "VNODE";
const z = {
    "top-left": {bounce: "mosha__bounceInLeft", zoom: "mosha__zoomIn", slide: "mosha__slideInLeft"},
    "top-right": {bounce: "mosha__bounceInRight", zoom: "mosha__zoomIn", slide: "mosha__slideInRight"},
    "top-center": {bounce: "mosha__bounceInDown", zoom: "mosha__zoomIn", slide: "mosha__slideInDown"},
    "bottom-center": {bounce: "mosha__bounceInUp", zoom: "mosha__zoomIn", slide: "mosha__slideInUp"},
    "bottom-right": {bounce: "mosha__bounceInRight", zoom: "mosha__zoomIn", slide: "mosha__slideInRight"},
    "bottom-left": {bounce: "mosha__bounceInLeft", zoom: "mosha__zoomIn", slide: "mosha__slideInLeft"}
}, S = (e, t) => d(e, t), L = (e, t = 300) => {
    let o;
    return (...n) => {
        o && (clearTimeout(o), o = void 0), o = setTimeout((() => e(...n)), t)
    }
}, O = (e, t, o) => {
    const n = u(), s = u(void 0), i = u(), r = e => e instanceof MouseEvent, p = u => {
        !1 !== o && n.value && (r(u) ? s.value = n.value.clientX - u.clientX : s.value = n.value.touches[0].clientX - u.touches[0].clientX, i.value = a(l({}, i.value), {transition: "none"}), e.endsWith("left") ? i.value.left = -s.value + "px !important" : e.endsWith("right") ? i.value.right = `${s.value}px !important` : s.value > 0 ? i.value.left = -s.value + "px !important" : i.value.right = `${s.value}px !important`, Math.abs(s.value) > 200 && t())
    }, h = e => {
        !1 !== o && (n.value && (n.value = void 0), s.value && (s.value = void 0), removeEventListener(e, p))
    };
    return c((() => {
        !1 !== o && (h("mousemove"), h("touchmove"))
    })), {
        swipedDiff: s, swipeStart: n, swipeStyle: i, swipeHandler: p, startSwipeHandler: t => {
            if (!1 === o) return;
            n.value = t;
            const a = r(t) ? "mousemove" : "touchmove", u = r(t) ? "mouseup" : "touchend";
            addEventListener(a, p), addEventListener(u, (() => (t => {
                const o = {transition: "left .3s ease-out", left: 0}, r = {transition: "right .3s ease-out", right: 0},
                    a = {transition: "all .3s ease-out", left: 0, right: 0};
                e.endsWith("left") ? i.value = l(l({}, i.value), o) : e.endsWith("right") ? i.value = l(l({}, i.value), r) : i.value = l(l({}, i.value), a), n.value = void 0, s.value = void 0, removeEventListener(t, p)
            })(a)))
        }, cleanUpMove: h
    }
};
var N = v({props: {type: {type: String, default: "default"}}});
const B = {class: "mosha__icon"}, P = {
        key: 0,
        xmlns: "http://www.w3.org/2000/svg",
        height: "32px",
        viewBox: "0 0 24 24",
        width: "32px",
        fill: "#db5200"
    },
    D = d("path", {d: "M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"}, null, -1),
    H = {
        key: 1,
        xmlns: "http://www.w3.org/2000/svg",
        height: "32px",
        viewBox: "0 0 24 24",
        width: "32px",
        fill: "#bd3333"
    },
    k = d("path", {d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"}, null, -1),
    V = {
        key: 2,
        xmlns: "http://www.w3.org/2000/svg",
        height: "32px",
        viewBox: "0 0 24 24",
        width: "32px",
        fill: "#169716"
    }, R = d("path", {d: "M0 0h24v24H0V0z", fill: "none"}, null, -1),
    $ = d("path", {d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"}, null, -1),
    j = {
        key: 3,
        xmlns: "http://www.w3.org/2000/svg",
        height: "32px",
        viewBox: "0 0 24 24",
        width: "32px",
        fill: "#01b1e8"
    }, W = d("path", {d: "M0 0h24v24H0z", fill: "none"}, null, -1),

    q = d("path", {d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}, null, -1),
    U = {
        key: 4,
        xmlns: "http://www.w3.org/2000/svg",
        height: "32px",
        viewBox: "0 0 24 24",
        width: "32px",
        fill: "#F1F1F1F1"
    }, X = d("path", {d: "M0 0h24v24H0z", fill: "none"}, null, -1),
    F = d("path", {d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}, null, -1);
N.render = function (e, t, o, n, s, i) {
    return m(), f("span", B,
        ["warning" === e.type ? (m(), f("svg", P, [D]))
            : "danger" === e.type ? (m(), f("svg", H, [k]))
                : "success" === e.type ? (m(), f("svg", V, [R, $]))
                    : "default" === e.type ? (m(), f("svg", j, [W, q]))
                        : (m(), f("svg", U, [X, F]))])
};
var Y = v({
    name: "MToast",
    components: {MIcon: N},
    props: {
        visible: Boolean,
        text: {type: String, default: ""},
        description: {type: String, default: ""},
        toastBackgroundColor: {type: String, default: ""},
        type: {type: String, default: "default"},
        onClose: {type: Function, default: () => null},
        onCloseHandler: {type: Function, required: !0},
        offset: {type: Number, required: !0},
        id: {type: Number, required: !0},
        timeout: {type: Number, default: 5e3},
        position: {type: String, required: !0},
        showCloseButton: {type: Boolean, default: !0},
        swipeClose: {type: Boolean, default: !0},
        hideProgressBar: {type: Boolean, default: !1},
        showIcon: {type: Boolean, default: true},
        transition: {type: String, default: "bounce"}
    },
    setup(e, t) {
        const o = u(), {width: n} = (() => {
            const e = u(-1), t = u(-1), o = o => {
                null !== o && null !== o.currentTarget && (e.value = o.currentTarget.innerWidth, t.value = o.currentTarget.innerHeight)
            };
            return p((() => {
                window.innerWidth > 0 && (e.value = window.innerWidth, t.value = window.innerHeight), window.addEventListener("resize", L(o))
            })), c((() => {
                window.removeEventListener("resize", L(o))
            })), {width: e, height: t}
        })(), {
            swipedDiff: s,
            startSwipeHandler: i,
            swipeStyle: r,
            cleanUpMove: l
        } = O(e.position, e.onCloseHandler, e.swipeClose), {transitionType: a} = (d = e.position, v = e.transition, m = s, {transitionType: h((() => m.value > 200 ? "mosha__fadeOutLeft" : m.value < -200 ? "mosha__fadeOutRight" : z[d][v]))});
        var d, v, m;
        const {start: f, stop: _, progress: w} = ((e, t) => {
                const o = u(), n = u(0), s = u(t), i = u(), r = u(100), l = () => {
                    clearInterval(i.value), clearTimeout(o.value)
                };
                return p((() => {
                })), c((() => {
                    l()
                })), {
                    start: () => {
                        n.value = Date.now(), clearTimeout(o.value), i.value = setInterval((() => {
                            r.value--
                        }), t / 100 - 5), o.value = setTimeout(e, s.value)
                    }, stop: () => {
                        clearInterval(i.value), clearTimeout(o.value), s.value -= Date.now() - n.value
                    }, clear: l, progress: r
                }
            })((() => {
                e.onCloseHandler()
            }), e.timeout), y = h((() => t.slots.default)), b = h((() => /<\/?[a-z][\s\S]*>/i.test(e.description))),
            I = () => {
                e.timeout > 0 && f()
            };
        return g((() => {
            const {customStyle: t} = ((e, t, o) => {
                const n = h((() => {
                    switch (e) {
                        case"top-left":
                            return {left: "0", top: `${t}px`};
                        case"bottom-left":
                            return {left: "0", bottom: `${t}px`};
                        case"bottom-right":
                            return {right: "0", bottom: `${t}px`};
                        case"top-center":
                            return {top: `${t}px`, left: "0", right: "0", marginRight: "auto", marginLeft: "auto"};
                        case"bottom-center":
                            return {bottom: `${t}px`, left: "0", right: "0", marginRight: "auto", marginLeft: "auto"};
                        default:
                            return {right: "0", top: `${t}px`}
                    }
                }));
                return o.length > 0 && (n.value.backgroundColor = o), {customStyle: n}
            })(e.position, e.offset, e.toastBackgroundColor);
            o.value = t.value
        })), p((() => {
            I()
        })), {
            style: o, transitionType: a, startTimer: I, progress: w, onTouchStart: e => {
                i(e)
            }, onMouseLeave: () => {
                l("mousemove"), I()
            }, onMouseDown: e => {
                i(e)
            }, swipeStyle: r, isSlotPassed: y, isDescriptionHtml: b, onMouseEnter: () => {
                e.timeout > 0 && n.value > 425 && _()
            }
        }
    }
});
const A = {class: "mosha__toast__content-wrapper"}, G = {class: "mosha__toast__content"},
    J = {class: "mosha__toast__content__text"}, K = {key: 1, class: "mosha__toast__content__description"},
    Q = {key: 0, class: "mosha__toast__slot-wrapper"};
Y.render = function (e, t, o, n, s, i) {
    const r = _("MIcon");
    return m(), f(w, {name: e.transitionType, type: "animation"}, {
        default: y((() => [e.visible ? (m(), f("div", {
            key: 0,
            class: ["mosha__toast", e.toastBackgroundColor ? null : e.type],
            style: [e.style, e.swipeStyle],
            onMouseenter: t[2] || (t[2] = (...t) => e.onMouseEnter && e.onMouseEnter(...t)),
            onMouseleave: t[3] || (t[3] = (...t) => e.onMouseLeave && e.onMouseLeave(...t)),
            onTouchstartPassive: t[4] || (t[4] = (...t) => e.onTouchStart && e.onTouchStart(...t)),
            onMousedown: t[5] || (t[5] = (...t) => e.onMouseDown && e.onMouseDown(...t))
        }, [d("div", A, [e.showIcon ? (m(), f(r, {
            key: 0,
            type: e.type
        }, null, 8, ["type"])) : b("", !0), d("div", G, [d("div", J, I(e.text), 1), e.description.length > 0 && e.isDescriptionHtml ? (m(), f("div", {
            key: 0,
            class: "mosha__toast__content__description",
            innerHTML: e.description
        }, null, 8, ["innerHTML"])) : b("", !0), e.description.length > 0 && !e.isDescriptionHtml ? (m(), f("div", K, I(e.description), 1)) : b("", !0)])]), e.isSlotPassed ? (m(), f("div", Q, [T(e.$slots, "default")])) : b("", !0),
            e.showCloseButton ? (m(), f("div", {
                key: 1,
                class: "mosha__toast__close-icon",
                onClick: t[1] || (t[1] = (...t) => e.onCloseHandler && e.onCloseHandler(...t))
            })) : b("", !0), e.hideProgressBar ? b("", !0) : (m(), f("div", {
                key: 2,
                class: "mosha__toast__progress",
                style: {width: `${e.progress}%`}
            }, null, 4))], 38)) : b("", !0)])), _: 3
    }, 8, ["name"])
};
const Z = {
    "top-left": [],
    "top-right": [],
    "bottom-left": [],
    "bottom-right": [],
    "top-center": [],
    "bottom-center": []
};
let ee = 0;
const te = (e, t) => {
        const o = ee++, n = t ? se(t) : C;
        if (e.__v_isVNode) return oe(o, M.VNODE, n, e), {close: () => le(o, n.position)};
        if (e.hasOwnProperty("render")) return oe(o, M.COMPONENT, n, e), {close: () => le(o, n.position)};
        const s = ie(e);
        return oe(o, M.TITLE_DESCRIPTION, n, s), {close: () => le(o, n.position)}
    }, oe = (e, t, o, n) => {
        setTimeout((() => {
            const s = re(o, Z, 12), i = document.createElement("div");
            let r;
            document.body.appendChild(i), r = t === M.VNODE ? d(Y, ne(o, e, s, le), (() => [n])) : t === M.TITLE_DESCRIPTION ? d(Y, ne(o, e, s, le, n)) : d(Y, ne(o, e, s, le), (() => [d(n)])), x(r, i), Z[o.position].push({
                toastVNode: r,
                container: i
            }), r.component && (r.component.props.visible = !0)
        }), 1)
    }, ne = (e, t, o, n, s) => a(l(l({}, e), s), {
        id: t, offset: o, visible: !1, onCloseHandler: () => {
            n(t, e.position ? e.position : "top-right")
        }
    }), se = e => {
        const t = a(l({}, e), {
            type: e.type || C.type,
            timeout: e.timeout || C.timeout,
            showCloseButton: e.showCloseButton,
            position: e.position || C.position,
            showIcon: e.showIcon,
            swipeClose: e.swipeClose,
            transition: e.transition || C.transition
        });
        return t.hideProgressBar = void 0 !== t.timeout && t.timeout <= 0, void 0 !== e.hideProgressBar && (t.hideProgressBar = e.hideProgressBar), t
    }, ie = e => ({text: "string" == typeof e ? e : e.title, description: "string" == typeof e ? void 0 : e.description}),
    re = (e, t, o) => {
        let n = o;
        if (!e.position) throw new Error("no position");
        return t[e.position].forEach((({toastVNode: e}) => {
            const t = e.el.offsetHeight + o;
            n += t || 0
        })), n
    }, le = (e, t) => {
        const o = Z[t], n = o.findIndex((({toastVNode: t}) => t.props && e === t.props.id));
        if (-1 === n) return;
        const {container: s, toastVNode: i} = o[n];
        if (!i.el) return;
        const r = i.el.offsetHeight;
        Z[t].splice(n, 1), ((e, t, o, n) => {
            for (let s = e; s < t.length; s++) {
                const {toastVNode: e} = t[s];
                if (!e.el) return;
                const i = o.split("-")[0] || "top", r = parseInt(e.el.style[i], 10) - n - 12;
                if (!e.component) return;
                e.component.props.offset = r
            }
        })(n, o, t, r), i.component && (i.component.props.visible = !1, i.component.props.onClose && i.component.props.onClose(), setTimeout((() => {
            x(null, s), document.body.removeChild(s)
        }), 1e3))
    }, ae = () => {
        Object.entries(Z).forEach((([e, t]) => {
            if (t.length > 0) {
                t.map((e => e.toastVNode.props.id)).forEach((t => {
                    le(t, e)
                }))
            }
        }))
    };
var ue = {
    install: e => {
        e.config.globalProperties.$moshaToast = te, e.provide("moshaToast", te)
    }
};
export default ue;
export {M as ToastContentType, ae as clearToasts, te as createToast, S as withProps};
