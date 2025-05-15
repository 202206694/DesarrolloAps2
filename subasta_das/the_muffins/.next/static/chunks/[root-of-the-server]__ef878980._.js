(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/components/header.module.css [client] (css module)": ((__turbopack_context__) => {

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
"[project]/components/header.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/header.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Header() {
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchModalOpen, setSearchModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authChecked, setAuthChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false); // ✅ nuevo flag
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const token = localStorage.getItem('accessToken');
                setIsAuthenticated(!!token && token !== 'undefined' && token !== 'null');
                setAuthChecked(true); // ✅ ahora sí sabemos si hay token
            }
        }
    }["Header.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].nav,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navLeft,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].menuIcon,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navCenter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            passHref: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/logo2.png",
                                alt: "Logo de la joyería",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].logo
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navRight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchIcon,
                                        onClick: toggleSearchModal,
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/components/header.js",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    searchModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchModal,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSearchSubmit,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchInput,
                                                    placeholder: "Buscar productos...",
                                                    value: searchTerm,
                                                    onChange: handleSearchChange
                                                }, void 0, false, {
                                                    fileName: "[project]/components/header.js",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchBtn,
                                                    children: "🔎"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/header.js",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeBtn,
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navList,
                                children: !authChecked ? null : isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/perfilUsuario",
                                    passHref: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navItem,
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
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            passHref: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navItem,
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/registro",
                                            passHref: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navItem,
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
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sideMenu} ${menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].open : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].menuContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeBtn,
                            onClick: toggleMenu,
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "COLECCIONES"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=anillos",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=collares",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=pulseras",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=pendientes",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?categoria=relojes",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/createauction",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navItem,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "FILTRAR POR PRECIO"
                        }, void 0, false, {
                            fileName: "[project]/components/header.js",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?price_range=under_100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?price_range=between_100_1000",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/products?price_range=over_1000",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(Header, "hnxjYz8M2ihCve9PzbXNk+aOf2Y=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/footer.module.css [client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "footer": "footer-module__oqRDSq__footer",
});
}}),
"[project]/components/footer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/Footer.jsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$footer$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/footer.module.css [client] (css module)");
;
;
const Footer = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$footer$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].footer,
        children: "© 2025 Joyería Exclusiva. Todos los derechos reservados."
    }, void 0, false, {
        fileName: "[project]/components/footer.js",
        lineNumber: 5,
        columnNumber: 3
    }, this);
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/perfilUsuario.module.css [client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "buttonGroup": "perfilUsuario-module__xn26ja__buttonGroup",
  "container": "perfilUsuario-module__xn26ja__container",
  "customButton": "perfilUsuario-module__xn26ja__customButton",
  "error": "perfilUsuario-module__xn26ja__error",
  "info": "perfilUsuario-module__xn26ja__info",
  "listado": "perfilUsuario-module__xn26ja__listado",
  "loading": "perfilUsuario-module__xn26ja__loading",
  "logoutButton": "perfilUsuario-module__xn26ja__logoutButton",
  "passwordForm": "perfilUsuario-module__xn26ja__passwordForm",
  "passwordInput": "perfilUsuario-module__xn26ja__passwordInput",
  "passwordSection": "perfilUsuario-module__xn26ja__passwordSection",
  "productImage": "perfilUsuario-module__xn26ja__productImage",
  "productItem": "perfilUsuario-module__xn26ja__productItem",
  "productList": "perfilUsuario-module__xn26ja__productList",
  "success": "perfilUsuario-module__xn26ja__success",
  "title": "perfilUsuario-module__xn26ja__title",
});
}}),
"[project]/pages/perfilUsuario.jsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/header.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/footer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/perfilUsuario.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const PerfilUsuario = ()=>{
    _s();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accessToken, setAccessToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refreshToken, setRefreshToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subastas, setSubastas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pujas, setPujas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mostrarSubastas, setMostrarSubastas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mostrarPujas, setMostrarPujas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mensajeSubastas, setMensajeSubastas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mensajePujas, setMensajePujas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [oldPassword, setOldPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [confirmNewPassword, setConfirmNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordError, setPasswordError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [passwordSuccess, setPasswordSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerfilUsuario.useEffect": ()=>{
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            if (!storedAccessToken || !storedRefreshToken) {
                setError('⚠ Debes iniciar sesión para ver tu perfil.');
                return;
            }
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            const fetchProfile = {
                "PerfilUsuario.useEffect.fetchProfile": async ()=>{
                    try {
                        const res = await fetch('http://127.0.0.1:8000/api/users/profile/', {
                            headers: {
                                Authorization: `Bearer ${storedAccessToken}`
                            }
                        });
                        const data = await res.json();
                        if (res.ok) {
                            setProfile(data);
                        } else {
                            throw new Error(data.message || 'Error al obtener el perfil');
                        }
                    } catch (err) {
                        setError('⚠ Error al cargar el perfil.');
                        console.error(err);
                    }
                }
            }["PerfilUsuario.useEffect.fetchProfile"];
            fetchProfile();
        }
    }["PerfilUsuario.useEffect"], []);
    const handleVerSubastas = async ()=>{
        if (mostrarSubastas) return setMostrarSubastas(false);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/misSubastas/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            if (res.ok && data.length > 0) {
                setSubastas(data);
                setMensajeSubastas('');
            } else {
                setSubastas([]);
                setMensajeSubastas('Todavía no has realizado ninguna subasta.');
            }
            setMostrarSubastas(true);
            setMostrarPujas(false);
        } catch (err) {
            console.error(err);
            setMensajeSubastas('Error al cargar tus subastas.');
        }
    };
    const handleVerPujas = async ()=>{
        if (mostrarPujas) return setMostrarPujas(false);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/misPujas/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            if (res.ok && data.length > 0) {
                setPujas(data);
                setMensajePujas('');
            } else {
                setPujas([]);
                setMensajePujas('Todavía no has realizado ninguna puja.');
            }
            setMostrarPujas(true);
            setMostrarSubastas(false);
        } catch (err) {
            console.error(err);
            setMensajePujas('Error al cargar tus pujas.');
        }
    };
    const editarSubasta = async (id, nuevosDatos)=>{
        try {
            const res = await fetch(`http://127.0.0.1:8000/subastas/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(nuevosDatos)
            });
            if (!res.ok) throw new Error('Error al editar subasta');
            alert('✅ Subasta actualizada');
        } catch (err) {
            alert('❌ No se pudo actualizar la subasta');
            console.error(err);
        }
    };
    const eliminarSubasta = async (id)=>{
        try {
            const res = await fetch(`http://127.0.0.1:8000/subastas/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (res.ok) {
                setSubastas((prev)=>prev.filter((s)=>s.id !== id));
                alert('✅ Subasta eliminada');
            } else {
                throw new Error('Error al eliminar subasta');
            }
        } catch (err) {
            alert('❌ No se pudo eliminar la subasta');
            console.error(err);
        }
    };
    const editarPuja = async (auctionId, bidId, nuevoMonto)=>{
        try {
            const res = await fetch(`http://127.0.0.1:8000/subastas/${auctionId}/pujas/${bidId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    amount: parseFloat(nuevoMonto)
                })
            });
            if (!res.ok) throw new Error('Error al editar puja');
            alert('✅ Puja actualizada');
        } catch (err) {
            alert('❌ No se pudo actualizar la puja');
            console.error(err);
        }
    };
    const eliminarPuja = async (auctionId, bidId)=>{
        try {
            const res = await fetch(`http://127.0.0.1:8000/subastas/${auctionId}/pujas/${bidId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (res.ok) {
                setPujas((prev)=>prev.filter((p)=>p.id !== bidId));
                alert('✅ Puja eliminada');
            } else {
                throw new Error('Error al eliminar puja');
            }
        } catch (err) {
            alert('❌ No se pudo eliminar la puja');
            console.error(err);
        }
    };
    const handleLogout = async ()=>{
        try {
            const res = await fetch('http://127.0.0.1:8000/api/users/log-out/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    refresh: refreshToken
                })
            });
            if (res.ok || res.status === 205) {
                localStorage.clear();
                window.location.href = '/login';
            } else {
                const errorData = await res.json();
                setError(errorData.detail || 'Error al cerrar sesión.');
            }
        } catch (err) {
            console.error(err);
            setError('Error al cerrar sesión.');
        }
    };
    const handleChangePassword = async (e)=>{
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setPasswordError('Por favor, completa todos los campos de contraseña.');
            setPasswordSuccess('');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPasswordError('Las nuevas contraseñas no coinciden.');
            setPasswordSuccess('');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/change-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword
                })
            });
            const data = await response.json();
            if (response.ok) {
                setPasswordSuccess('✅ Contraseña actualizada correctamente.');
                setPasswordError('');
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setPasswordError(data.detail || 'Error al cambiar la contraseña.');
                setPasswordSuccess('');
            }
        } catch (err) {
            console.error(err);
            setPasswordError('Error al cambiar la contraseña.');
            setPasswordSuccess('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/perfilUsuario.jsx",
                lineNumber: 248,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
                children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/pages/perfilUsuario.jsx",
                    lineNumber: 251,
                    columnNumber: 21
                }, this) : profile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                            children: [
                                profile.first_name,
                                " ",
                                profile.last_name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 254,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].info,
                            children: [
                                "Email: ",
                                profile.email
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 255,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].info,
                            children: [
                                "Localidad: ",
                                profile.locality
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 256,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].info,
                            children: [
                                "Municipio: ",
                                profile.municipality
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 257,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].buttonGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].customButton,
                                    onClick: handleVerSubastas,
                                    children: "Ver mis subastas"
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfilUsuario.jsx",
                                    lineNumber: 260,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].customButton,
                                    onClick: handleVerPujas,
                                    children: "Ver mis pujas"
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfilUsuario.jsx",
                                    lineNumber: 261,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].logoutButton,
                                    onClick: handleLogout,
                                    children: "Cerrar sesión"
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfilUsuario.jsx",
                                    lineNumber: 262,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 259,
                            columnNumber: 25
                        }, this),
                        mostrarSubastas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].listado,
                            children: mensajeSubastas ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: mensajeSubastas
                            }, void 0, false, {
                                fileName: "[project]/pages/perfilUsuario.jsx",
                                lineNumber: 268,
                                columnNumber: 37
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Mis subastas:"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                        lineNumber: 271,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].productList,
                                        children: subastas.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].productItem,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: s.thumbnail,
                                                        alt: s.title,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].productImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                                        lineNumber: 275,
                                                        columnNumber: 53
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: s.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                                lineNumber: 277,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    s.price,
                                                                    " €"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                                lineNumber: 278,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>editarSubasta(s.id, s),
                                                                children: "Editar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                                lineNumber: 279,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>eliminarSubasta(s.id),
                                                                children: "Eliminar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                                lineNumber: 280,
                                                                columnNumber: 57
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                                        lineNumber: 276,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, s.id, true, {
                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                lineNumber: 274,
                                                columnNumber: 49
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                        lineNumber: 272,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 266,
                            columnNumber: 29
                        }, this),
                        mostrarPujas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].listado,
                            children: mensajePujas ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: mensajePujas
                            }, void 0, false, {
                                fileName: "[project]/pages/perfilUsuario.jsx",
                                lineNumber: 293,
                                columnNumber: 37
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Mis pujas:"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                        lineNumber: 296,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].productList,
                                        children: pujas.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].productItem,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    p.amount,
                                                                    " €"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                                lineNumber: 300,
                                                                columnNumber: 56
                                                            }, this),
                                                            " en subasta ID ",
                                                            p.auction
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                                        lineNumber: 300,
                                                        columnNumber: 53
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: new Date(p.timestamp).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                                        lineNumber: 301,
                                                        columnNumber: 53
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>editarPuja(p.auction, p.id, prompt("Nuevo monto:")),
                                                        children: "Editar puja"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                                        lineNumber: 302,
                                                        columnNumber: 53
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>eliminarPuja(p.auction, p.id),
                                                        children: "Eliminar puja"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                                        lineNumber: 303,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/pages/perfilUsuario.jsx",
                                                lineNumber: 299,
                                                columnNumber: 49
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfilUsuario.jsx",
                                        lineNumber: 297,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 291,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].passwordSection,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Cambiar contraseña"
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfilUsuario.jsx",
                                    lineNumber: 313,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleChangePassword,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].passwordForm,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            placeholder: "Contraseña actual",
                                            value: oldPassword,
                                            onChange: (e)=>setOldPassword(e.target.value),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/perfilUsuario.jsx",
                                            lineNumber: 315,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            placeholder: "Nueva contraseña",
                                            value: newPassword,
                                            onChange: (e)=>setNewPassword(e.target.value),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/perfilUsuario.jsx",
                                            lineNumber: 316,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            placeholder: "Confirmar nueva contraseña",
                                            value: confirmNewPassword,
                                            onChange: (e)=>setConfirmNewPassword(e.target.value),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/perfilUsuario.jsx",
                                            lineNumber: 317,
                                            columnNumber: 33
                                        }, this),
                                        passwordError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                                            children: passwordError
                                        }, void 0, false, {
                                            fileName: "[project]/pages/perfilUsuario.jsx",
                                            lineNumber: 318,
                                            columnNumber: 51
                                        }, this),
                                        passwordSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].success,
                                            children: passwordSuccess
                                        }, void 0, false, {
                                            fileName: "[project]/pages/perfilUsuario.jsx",
                                            lineNumber: 319,
                                            columnNumber: 53
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].customButton,
                                            children: "Actualizar contraseña"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/perfilUsuario.jsx",
                                            lineNumber: 320,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/perfilUsuario.jsx",
                                    lineNumber: 314,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfilUsuario.jsx",
                            lineNumber: 312,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfilUsuario$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loading,
                    children: "Cargando perfil..."
                }, void 0, false, {
                    fileName: "[project]/pages/perfilUsuario.jsx",
                    lineNumber: 325,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/perfilUsuario.jsx",
                lineNumber: 249,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/perfilUsuario.jsx",
                lineNumber: 328,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
};
_s(PerfilUsuario, "rpucnjZejzILCsPu9+My8Za84bc=");
_c = PerfilUsuario;
const __TURBOPACK__default__export__ = PerfilUsuario;
var _c;
__turbopack_context__.k.register(_c, "PerfilUsuario");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/perfilUsuario.jsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/perfilUsuario";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/perfilUsuario.jsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/pages/perfilUsuario (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/perfilUsuario.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__ef878980._.js.map