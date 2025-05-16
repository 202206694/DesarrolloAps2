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
"[project]/pages/registro.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "btnBack": "registro-module__TLiRYq__btnBack",
  "customButton": "registro-module__TLiRYq__customButton",
  "customFooter": "registro-module__TLiRYq__customFooter",
  "customInput": "registro-module__TLiRYq__customInput",
  "customSelect": "registro-module__TLiRYq__customSelect",
  "error": "registro-module__TLiRYq__error",
  "formContainer": "registro-module__TLiRYq__formContainer",
  "header": "registro-module__TLiRYq__header",
  "link": "registro-module__TLiRYq__link",
  "logo": "registro-module__TLiRYq__logo",
  "navCenter": "registro-module__TLiRYq__navCenter",
  "pageContainer": "registro-module__TLiRYq__pageContainer",
});
}}),
"[project]/pages/registro.jsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/registro.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
'use client';
;
;
;
;
const Registro = ()=>{
    const [dni, setDni] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [surname, setSurname] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [birthdate, setBirthdate] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [passwordError, setPasswordError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [comunidad, setComunidad] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [ciudad, setCiudad] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const comunidades = {
        "Andalucía": [
            "Sevilla",
            "Málaga"
        ],
        "Cataluña": [
            "Barcelona",
            "Tarragona"
        ],
        "Madrid": [
            "Madrid",
            "Alcalá de Henares"
        ]
    };
    const handleComunidadChange = (e)=>{
        setComunidad(e.target.value);
        setCiudad(comunidades[e.target.value][0]);
    };
    const handleConfirmPasswordChange = (e)=>{
        setConfirmPassword(e.target.value);
        validatePasswords(password, e.target.value);
    };
    const validatePasswords = (pass1, pass2)=>{
        if (pass1 && pass2 && pass1 !== pass2) {
            setPasswordError("Las contraseñas no coinciden.");
        } else {
            setPasswordError('');
        }
    };
    const validateForm = ()=>{
        if (!dni || !name || !surname || !birthdate || !email || !username || !password || !confirmPassword || !comunidad || !ciudad) {
            setFormError('Por favor, completa todos los campos.');
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setFormError('El correo electrónico no es válido.');
            return false;
        }
        if (password.length < 8) {
            setFormError('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }
        if (password !== confirmPassword) {
            setFormError('Las contraseñas no coinciden.');
            return false;
        }
        setFormError('');
        return true;
    };
    const handleRegister = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const userData = {
            username,
            first_name: name,
            last_name: surname,
            email,
            birth_date: birthdate,
            municipality: ciudad,
            locality: comunidad,
            password
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            if (response.ok) {
                // Guardar los tokens en localStorage
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirigir al usuario o mostrar mensaje de éxito
                window.location.href = '/products'; // o la ruta que prefieras
            } else {
                setFormError('Error al registrar usuario: ' + JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setFormError('Hubo un problema al intentar registrar el usuario.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navCenter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: "/images/logo2.png",
                            alt: "Logo de la joyería",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo,
                            onClick: ()=>window.location.href = '/'
                        }, void 0, false, {
                            fileName: "[project]/pages/registro.jsx",
                            lineNumber: 122,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/registro.jsx",
                        lineNumber: 121,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/registro.jsx",
                    lineNumber: 120,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/registro.jsx",
                lineNumber: 119,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: handleRegister,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "Crear Cuenta"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 129,
                                columnNumber: 25
                            }, this),
                            formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                                children: formError
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 130,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "dni",
                                children: "DNI:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 132,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "dni",
                                name: "dni",
                                placeholder: "12345678X",
                                required: true,
                                pattern: "[0-9]{8}[A-Za-z]{1}",
                                title: "Debe ser un DNI válido con 8 números y una letra",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setDni(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 133,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "name",
                                children: "Nombre:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 135,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "name",
                                name: "name",
                                placeholder: "Nombre",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setName(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 136,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "surname",
                                children: "Apellidos:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 138,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "surname",
                                name: "surname",
                                placeholder: "Apellidos",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setSurname(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 139,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "birthdate",
                                children: "Fecha de nacimiento:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 141,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "date",
                                id: "birthdate",
                                name: "birthdate",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setBirthdate(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 142,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "email",
                                children: "Email:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "email",
                                id: "email",
                                name: "email",
                                placeholder: "Email",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setEmail(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 145,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "username",
                                children: "Nombre de usuario:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 147,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "username",
                                name: "username",
                                placeholder: "Usuario",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setUsername(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 148,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "comunidad",
                                children: "Comunidad Autónoma:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                id: "comunidad",
                                value: comunidad,
                                onChange: handleComunidadChange,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customSelect,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Selecciona una comunidad"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/registro.jsx",
                                        lineNumber: 152,
                                        columnNumber: 29
                                    }, this),
                                    Object.keys(comunidades).map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: key,
                                            children: key
                                        }, key, false, {
                                            fileName: "[project]/pages/registro.jsx",
                                            lineNumber: 154,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 151,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "ciudad",
                                children: "Ciudad:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                id: "ciudad",
                                value: ciudad,
                                onChange: (e)=>setCiudad(e.target.value),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customSelect,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Selecciona una ciudad"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/registro.jsx",
                                        lineNumber: 160,
                                        columnNumber: 29
                                    }, this),
                                    comunidad ? comunidades[comunidad].map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: city,
                                            children: city
                                        }, city, false, {
                                            fileName: "[project]/pages/registro.jsx",
                                            lineNumber: 162,
                                            columnNumber: 33
                                        }, this)) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 159,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "password",
                                children: "Contraseña:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 166,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "password",
                                id: "password",
                                name: "password",
                                placeholder: "Contraseña",
                                minLength: "8",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: (e)=>setPassword(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 167,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                htmlFor: "confirm_password",
                                children: "Confirmar contraseña:"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 169,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "password",
                                id: "confirm_password",
                                name: "confirm_password",
                                placeholder: "Confirmar contraseña",
                                required: true,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customInput,
                                onChange: handleConfirmPasswordChange
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 170,
                                columnNumber: 25
                            }, this),
                            passwordError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                                children: passwordError
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 171,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customButton,
                                children: "Crear cuenta"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 173,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "reset",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].customButton,
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 174,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$registro$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].btnBack,
                                onClick: ()=>window.history.back(),
                                children: "⬅ Volver atrás"
                            }, void 0, false, {
                                fileName: "[project]/pages/registro.jsx",
                                lineNumber: 175,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/registro.jsx",
                        lineNumber: 128,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/registro.jsx",
                    lineNumber: 127,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/registro.jsx",
                lineNumber: 126,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/registro.jsx",
        lineNumber: 118,
        columnNumber: 9
    }, this);
};
const __TURBOPACK__default__export__ = Registro;
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__209857ec._.js.map