module.exports = {

"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/react-dom [external] (react-dom, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}}),
"[project]/components/header.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "closeBtn": "header-module__bY5_QG__closeBtn",
  "header": "header-module__bY5_QG__header",
  "hidden": "header-module__bY5_QG__hidden",
  "logo": "header-module__bY5_QG__logo",
  "menuContent": "header-module__bY5_QG__menuContent",
  "menuIcon": "header-module__bY5_QG__menuIcon",
  "nav": "header-module__bY5_QG__nav",
  "navCenter": "header-module__bY5_QG__navCenter",
  "navItem": "header-module__bY5_QG__navItem",
  "navLeft": "header-module__bY5_QG__navLeft",
  "navLink": "header-module__bY5_QG__navLink",
  "navList": "header-module__bY5_QG__navList",
  "navRight": "header-module__bY5_QG__navRight",
  "open": "header-module__bY5_QG__open",
  "searchContainer": "header-module__bY5_QG__searchContainer",
  "searchIcon": "header-module__bY5_QG__searchIcon",
  "searchModal": "header-module__bY5_QG__searchModal",
  "sideMenu": "header-module__bY5_QG__sideMenu",
});
}}),
"[project]/components/header.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/header.module.css [ssr] (css module)");
'use client';
;
;
;
;
function Header() {
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [searchModalOpen, setSearchModalOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [authChecked, setAuthChecked] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false); // ✅ nuevo flag
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, []);
    const toggleMenu = ()=>setMenuOpen(!menuOpen);
    const toggleSearchModal = ()=>setSearchModalOpen(!searchModalOpen);
    const handleSearchChange = (e)=>setSearchTerm(e.target.value);
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        if (searchTerm.trim()) {
            window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
            setSearchModalOpen(false);
            setSearchTerm('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].nav,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navLeft,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].menuIcon,
                            onClick: toggleMenu,
                            children: "☰ Menú"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/header.js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navCenter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            passHref: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/images/logo2.png",
                                alt: "Logo de la joyería",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo
                            }, void 0, false, {
                                fileName: "[project]/components/header.js",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/header.js",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navRight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchIcon,
                                        onClick: toggleSearchModal,
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    searchModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchModal,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSearchSubmit,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                                                    placeholder: "Buscar productos...",
                                                    value: searchTerm,
                                                    onChange: handleSearchChange
                                                }, void 0, false, {
                                                    fileName: "[project]/components/header.js",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].searchBtn,
                                                    children: "🔎"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/header.js",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeBtn,
                                                    onClick: toggleSearchModal,
                                                    children: "✕"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/header.js",
                                                    lineNumber: 62,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/header.js",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/header.js",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navList,
                                children: !authChecked ? null : isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/perfilUsuario",
                                    passHref: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                        children: "Mi Perfil"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            passHref: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                                children: "Iniciar Sesión"
                                            }, void 0, false, {
                                                fileName: "[project]/components/header.js",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/header.js",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/registro",
                                            passHref: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                                children: "Registrarse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/header.js",
                                                lineNumber: 79,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/header.js",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/header.js",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/header.js",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/header.js",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sideMenu} ${menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].open : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].menuContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeBtn,
                            onClick: toggleMenu,
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "COLECCIONES"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Todo"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 94,
                                        columnNumber: 38
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=anillos",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Anillos"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 95,
                                        columnNumber: 56
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=collares",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Collares"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 96,
                                        columnNumber: 57
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=pulseras",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Pulseras"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 97,
                                        columnNumber: 57
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=pendientes",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Pendientes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 98,
                                        columnNumber: 59
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=relojes",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Relojes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 99,
                                        columnNumber: 56
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/createauction",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navItem,
                                        children: "Crear Subasta"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 100,
                                        columnNumber: 43
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            children: "FILTRAR POR PRECIO"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?price_range=under_100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Menos de 100 €"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 105,
                                        columnNumber: 60
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?price_range=between_100_1000",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "100 € - 1000 €"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 106,
                                        columnNumber: 67
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?price_range=over_1000",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        children: "Más de 1000 €"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 107,
                                        columnNumber: 60
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/header.js",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/header.js",
                    lineNumber: 89,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/header.js",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/header.js",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}}),
"[project]/pages/productDetail.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "comentarioBox": "productDetail-module__2sF0gG__comentarioBox",
  "comentariosContainer": "productDetail-module__2sF0gG__comentariosContainer",
  "detalleContainer": "productDetail-module__2sF0gG__detalleContainer",
  "detalleInfo": "productDetail-module__2sF0gG__detalleInfo",
  "productoImagenContainer": "productDetail-module__2sF0gG__productoImagenContainer",
  "pujarBtn": "productDetail-module__2sF0gG__pujarBtn",
  "ratingContainer": "productDetail-module__2sF0gG__ratingContainer",
});
}}),
"[project]/pages/productDetail.jsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/productDetail.module.css [ssr] (css module)");
'use client';
;
;
;
;
;
const ProductDetail = ()=>{
    const [producto, setProducto] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [pujas, setPujas] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [precioPuja, setPrecioPuja] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [pujaError, setPujaError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [accessToken, setAccessToken] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id, pujas: showPujas } = router.query;
    const [userRating, setUserRating] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [comentarios, setComentarios] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [nuevoComentario, setNuevoComentario] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        title: '',
        body: ''
    });
    const [comentarioEditado, setComentarioEditado] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const token = localStorage.getItem('accessToken');
        if (token) setAccessToken(token);
        if (id) {
            const fetchProduct = async ()=>{
                try {
                    const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/`);
                    if (!response.ok) throw new Error("Producto no encontrado");
                    const data = await response.json();
                    setProducto(data);
                } catch (error) {
                    setError(error.message);
                    console.error(error);
                }
            };
            fetchProduct();
        }
    }, [
        id
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (id && showPujas) {
            const fetchPujas = async ()=>{
                try {
                    const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/pujas/`);
                    if (!response.ok) throw new Error("No se encontraron pujas");
                    const data = await response.json();
                    setPujas(data.results);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPujas();
        }
    }, [
        id,
        showPujas
    ]);
    const handleSubmitPuja = async (e)=>{
        e.preventDefault();
        setPujaError('');
        if (!accessToken) {
            setPujaError("⚠️ Debes iniciar sesión para hacer una puja.");
            return;
        }
        const precioNumerico = parseFloat(precioPuja);
        const ultimaPuja = pujas.length > 0 ? Math.max(...pujas.map((p)=>p.amount)) : producto.price;
        if (isNaN(precioNumerico)) {
            setPujaError("Por favor, introduce un número válido.");
            return;
        }
        if (precioNumerico <= ultimaPuja) {
            setPujaError(`La puja debe ser superior a ${ultimaPuja}€`);
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/pujas/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    auction: id,
                    amount: precioNumerico
                })
            });
            if (response.ok) {
                const newPuja = await response.json();
                setPrecioPuja('');
                setPujas((prev)=>[
                        ...prev,
                        newPuja
                    ]);
            } else {
                const errorData = await response.json();
                setPujaError(errorData.detail || "Error al hacer la puja");
            }
        } catch (error) {
            setPujaError("Error de red o del servidor");
            console.error("Error al realizar la puja:", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const fetchUserRating = async ()=>{
            if (accessToken && id) {
                const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/rating/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserRating(data.score);
                }
            }
        };
        fetchUserRating();
    }, [
        accessToken,
        id
    ]);
    const handleRatingChange = async (e)=>{
        const newRating = parseInt(e.target.value);
        if (accessToken) {
            await fetch(`http://127.0.0.1:8000/subastas/${id}/rating/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    score: newRating
                })
            });
            setUserRating(newRating);
            router.reload(); // recargar para ver la media actualizada
        }
    };
    const handleDeleteRating = async ()=>{
        await fetch(`http://127.0.0.1:8000/subastas/${id}/rating/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setUserRating(null);
        router.reload();
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (id) {
            const fetchComentarios = async ()=>{
                try {
                    const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/comentarios/`);
                    if (response.ok) {
                        const data = await response.json();
                        setComentarios(data);
                    }
                } catch (error) {
                    console.error("Error al cargar comentarios:", error);
                }
            };
            fetchComentarios();
        }
    }, [
        id
    ]);
    const handleChangeComentario = (e)=>{
        setNuevoComentario({
            ...nuevoComentario,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmitComentario = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/subastas/${id}/comentarios/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(nuevoComentario)
            });
            if (response.ok) {
                setNuevoComentario({
                    title: '',
                    body: ''
                });
                const nuevo = await response.json();
                setComentarios([
                    nuevo,
                    ...comentarios
                ]);
            }
        } catch (error) {
            console.error("Error al enviar comentario:", error);
        }
    };
    const handleEditarComentario = (comentario)=>{
        setComentarioEditado(comentario);
    };
    const handleGuardarEdicion = async ()=>{
        try {
            const response = await fetch(`http://127.0.0.1:8000/comentarios/${comentarioEditado.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(comentarioEditado)
            });
            if (response.ok) {
                const actualizado = await response.json();
                setComentarios(comentarios.map((c)=>c.id === actualizado.id ? actualizado : c));
                setComentarioEditado(null);
            }
        } catch (error) {
            console.error("Error al editar comentario:", error);
        }
    };
    const handleEliminarComentario = async (idComentario)=>{
        try {
            await fetch(`http://127.0.0.1:8000/comentarios/${idComentario}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setComentarios(comentarios.filter((c)=>c.id !== idComentario));
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
        }
    };
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
        children: error
    }, void 0, false, {
        fileName: "[project]/pages/productDetail.jsx",
        lineNumber: 235,
        columnNumber: 23
    }, this);
    if (!producto) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
        children: "Cargando producto..."
    }, void 0, false, {
        fileName: "[project]/pages/productDetail.jsx",
        lineNumber: 236,
        columnNumber: 27
    }, this);
    const ultimaPuja = pujas.length > 0 ? Math.max(...pujas.map((p)=>p.amount)) : producto.price;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/productDetail.jsx",
                lineNumber: 244,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].detalleContainer,
                    children: showPujas ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pujasContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "Pujas en esta subasta"
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 249,
                                columnNumber: 29
                            }, this),
                            pujas.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                children: pujas.map((puja)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: [
                                            puja.bidder,
                                            ": ",
                                            puja.amount,
                                            "€ (Fecha: ",
                                            new Date(puja.timestamp).toLocaleString(),
                                            ")"
                                        ]
                                    }, puja.id, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 253,
                                        columnNumber: 41
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 251,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "No hay pujas aún."
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 259,
                                columnNumber: 33
                            }, this),
                            pujaError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'red'
                                },
                                children: pujaError
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 262,
                                columnNumber: 43
                            }, this),
                            accessToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmitPuja,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        htmlFor: "amount",
                                        children: "Monto de la puja:"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 266,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        id: "amount",
                                        type: "number",
                                        value: precioPuja,
                                        onChange: (e)=>setPrecioPuja(e.target.value),
                                        placeholder: `Mínimo: ${ultimaPuja + 1}€`,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 267,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        children: "Hacer puja"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 275,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 265,
                                columnNumber: 33
                            }, this),
                            !accessToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'orange'
                                },
                                children: "⚠️ Debes iniciar sesión para hacer una puja."
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 280,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(`/productDetail?id=${id}`),
                                children: "Volver a detalles"
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 283,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/productDetail.jsx",
                        lineNumber: 248,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].productoImagenContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: producto.thumbnail,
                                    alt: producto.title
                                }, void 0, false, {
                                    fileName: "[project]/pages/productDetail.jsx",
                                    lineNumber: 288,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 287,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].detalleInfo,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        children: producto.title
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 291,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: producto.description
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 292,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Precio inicial:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 293,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            producto.price,
                                            " €"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 293,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Fecha de creación:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 294,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            new Date(producto.creation_date).toLocaleDateString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 294,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Finaliza:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 295,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            new Date(producto.closing_date).toLocaleDateString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 295,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Stock:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 296,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            producto.stock
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 296,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Marca:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 297,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            producto.brand
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 297,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Categoría ID:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 298,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            producto.category
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 298,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Valoración media:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 301,
                                                columnNumber: 36
                                            }, this),
                                            " ",
                                            producto.average_rating
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 301,
                                        columnNumber: 33
                                    }, this),
                                    accessToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].ratingContainer,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Tu puntuación:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 305,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                value: userRating || '',
                                                onChange: handleRatingChange,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Selecciona"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 307,
                                                        columnNumber: 45
                                                    }, this),
                                                    [
                                                        1,
                                                        2,
                                                        3,
                                                        4,
                                                        5
                                                    ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: n,
                                                            children: n
                                                        }, n, false, {
                                                            fileName: "[project]/pages/productDetail.jsx",
                                                            lineNumber: 309,
                                                            columnNumber: 49
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 306,
                                                columnNumber: 41
                                            }, this),
                                            userRating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleDeleteRating,
                                                children: "Eliminar puntuación"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 313,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 304,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 290,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pujarBtn,
                                onClick: ()=>router.push(`/productDetail?id=${id}&pujas=true`),
                                children: "Ver pujas"
                            }, void 0, false, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 321,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].comentariosContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        children: "Comentarios"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 329,
                                        columnNumber: 29
                                    }, this),
                                    comentarios.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: "No hay comentarios aún."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 331,
                                        columnNumber: 58
                                    }, this),
                                    comentarios.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$productDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].comentarioBox,
                                            children: comentarioEditado?.id === c.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: comentarioEditado.title,
                                                        onChange: (e)=>setComentarioEditado({
                                                                ...comentarioEditado,
                                                                title: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 337,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                        value: comentarioEditado.body,
                                                        onChange: (e)=>setComentarioEditado({
                                                                ...comentarioEditado,
                                                                body: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 342,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: handleGuardarEdicion,
                                                        children: "Guardar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 346,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setComentarioEditado(null),
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 347,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        children: c.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 351,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: c.body
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 352,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                                                                children: c.user
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/productDetail.jsx",
                                                                lineNumber: 353,
                                                                columnNumber: 48
                                                            }, this),
                                                            " - ",
                                                            new Date(c.created_at).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/productDetail.jsx",
                                                        lineNumber: 353,
                                                        columnNumber: 45
                                                    }, this),
                                                    accessToken && c.user === localStorage.getItem("username") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleEditarComentario(c),
                                                                children: "Editar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/productDetail.jsx",
                                                                lineNumber: 356,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleEliminarComentario(c.id),
                                                                children: "Eliminar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/productDetail.jsx",
                                                                lineNumber: 357,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true)
                                        }, c.id, false, {
                                            fileName: "[project]/pages/productDetail.jsx",
                                            lineNumber: 334,
                                            columnNumber: 33
                                        }, this)),
                                    accessToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmitComentario,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: "Escribir un comentario"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 367,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                name: "title",
                                                value: nuevoComentario.title,
                                                onChange: handleChangeComentario,
                                                placeholder: "Título",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 368,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                name: "body",
                                                value: nuevoComentario.body,
                                                onChange: handleChangeComentario,
                                                placeholder: "Escribe tu comentario...",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 376,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                children: "Publicar comentario"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/productDetail.jsx",
                                                lineNumber: 383,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/productDetail.jsx",
                                        lineNumber: 366,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/productDetail.jsx",
                                lineNumber: 328,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/productDetail.jsx",
                        lineNumber: 286,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/productDetail.jsx",
                    lineNumber: 246,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/productDetail.jsx",
                lineNumber: 245,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/productDetail.jsx",
        lineNumber: 243,
        columnNumber: 9
    }, this);
};
const __TURBOPACK__default__export__ = ProductDetail;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b6e0c51f._.js.map