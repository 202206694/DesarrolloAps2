module.exports = {

"[externals]/next/dist/compiled/next-server/pages.runtime.dev.js [external] (next/dist/compiled/next-server/pages.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages.runtime.dev.js", () => require("next/dist/compiled/next-server/pages.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}}),
"[externals]/react [external] (react, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[project]/pages/login.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "apple": "login-module__lgJPRG__apple",
  "btnBack": "login-module__lgJPRG__btnBack",
  "btnPrimary": "login-module__lgJPRG__btnPrimary",
  "btnSocial": "login-module__lgJPRG__btnSocial",
  "customFooter": "login-module__lgJPRG__customFooter",
  "divider": "login-module__lgJPRG__divider",
  "facebook": "login-module__lgJPRG__facebook",
  "google": "login-module__lgJPRG__google",
  "header": "login-module__lgJPRG__header",
  "input": "login-module__lgJPRG__input",
  "link": "login-module__lgJPRG__link",
  "loginContainer": "login-module__lgJPRG__loginContainer",
  "logo": "login-module__lgJPRG__logo",
  "navCenter": "login-module__lgJPRG__navCenter",
  "pageContainer": "login-module__lgJPRG__pageContainer",
  "socialLogin": "login-module__lgJPRG__socialLogin",
});
}}),
"[project]/pages/login.jsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/login.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
'use client';
;
;
;
;
const Login = ()=>{
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const login = async (username, password)=>{
        setLoading(true);
        try {
            const response = await fetch('https://backend-the-muffins.onrender.com/api/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('username', data.username);
                alert('✅ Has entrado a tu cuenta correctamente.');
                window.location.href = '/perfilUsuario';
            } else {
                throw new Error(data.detail || 'Credenciales incorrectas');
            }
        } catch (error) {
            alert('❌ Error: ' + error.message);
        } finally{
            setLoading(false);
        }
    };
    const handleSubmit = (event)=>{
        event.preventDefault();
        login(username, password);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navCenter,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: "/images/logo2.png",
                        alt: "Logo de la joyería",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo,
                        onClick: ()=>window.location.href = '/'
                    }, void 0, false, {
                        fileName: "[project]/pages/login.jsx",
                        lineNumber: 48,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/login.jsx",
                    lineNumber: 47,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/login.jsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loginContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "Iniciar sesión en Jewelbay"
                        }, void 0, false, {
                            fileName: "[project]/pages/login.jsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "usuario",
                                    children: "Usuario"
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 61,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "usuario",
                                    name: "usuario",
                                    value: username,
                                    onChange: (e)=>setUsername(e.target.value),
                                    placeholder: "Introduce tu usuario",
                                    required: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    htmlFor: "contrasena",
                                    children: "Contraseña"
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 73,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    id: "contrasena",
                                    name: "contrasena",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    placeholder: "Introduce tu contraseña",
                                    required: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 74,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnPrimary,
                                    disabled: loading,
                                    children: loading ? 'Cargando...' : 'Iniciar sesión'
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/login.jsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].divider,
                            children: "o continúa con"
                        }, void 0, false, {
                            fileName: "[project]/pages/login.jsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].socialLogin,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnSocial} ${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].google}`,
                                    children: "🔍 Google"
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnSocial} ${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].facebook}`,
                                    children: "📘 Facebook"
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 93,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnSocial} ${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].apple}`,
                                    children: "🍏 Apple"
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.jsx",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/login.jsx",
                            lineNumber: 91,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnBack,
                            onClick: ()=>window.location.href = '/',
                            children: "⬅ Volver atrás"
                        }, void 0, false, {
                            fileName: "[project]/pages/login.jsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/login.jsx",
                    lineNumber: 58,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/login.jsx",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$login$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customFooter,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    children: [
                        "¿No tienes cuenta? ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/registro",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "Registrarse"
                            }, void 0, false, {
                                fileName: "[project]/pages/login.jsx",
                                lineNumber: 104,
                                columnNumber: 62
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/login.jsx",
                            lineNumber: 104,
                            columnNumber: 39
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/login.jsx",
                    lineNumber: 104,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/login.jsx",
                lineNumber: 103,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = Login;
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__7b00028a._.js.map