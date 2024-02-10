"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/Test/Todos/TodosPageByReactDataGrid",{

/***/ "./src/hooks/useApiForSaveTodoListForUserMutation.tsx":
/*!************************************************************!*\
  !*** ./src/hooks/useApiForSaveTodoListForUserMutation.tsx ***!
  \************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_apiForTodos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/apiForTodos */ \"./src/api/apiForTodos.ts\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/toast/dist/chunk-6RSEZNRH.mjs\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ \"./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ \"./node_modules/@tanstack/react-query/build/modern/useMutation.js\");\nvar _s = $RefreshSig$();\n\n\n\n\nconst useApiForSaveTodoListForUserMutation = (pageNum, userId, todoStatusOption)=>{\n    _s();\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    const toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.useToast)(); // useToast 훅 사용\n    const mutationForSaveTodoRows = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useMutation)({\n        mutationFn: _api_apiForTodos__WEBPACK_IMPORTED_MODULE_1__.apiForSaveTodoRows,\n        onSuccess: (result)=>{\n            console.log(\"result : \", result);\n            queryClient.refetchQueries({\n                queryKey: [\n                    \"uncompletedTodoList\",\n                    parseInt(pageNum),\n                    userId,\n                    todoStatusOption\n                ]\n            });\n            toast({\n                title: \"save todo rows success\",\n                description: result.message,\n                status: \"success\",\n                duration: 2000,\n                isClosable: true\n            });\n        },\n        onError: (error)=>{\n            // ...\n            console.log(\"error : \", error);\n            toast({\n                title: error.response.data.error,\n                description: error.response.data.message,\n                status: \"error\",\n                duration: 2000,\n                isClosable: true\n            });\n        }\n    });\n    return mutationForSaveTodoRows;\n};\n_s(useApiForSaveTodoListForUserMutation, \"WAdDhD19+Srw+3MTGu/AVm0xp+M=\", false, function() {\n    return [\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient,\n        _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.useToast,\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useMutation\n    ];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (useApiForSaveTodoListForUserMutation);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvdXNlQXBpRm9yU2F2ZVRvZG9MaXN0Rm9yVXNlck11dGF0aW9uLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUM2QjtBQUNYO0FBQ3dCO0FBRXBFLE1BQU1LLHVDQUF1QyxDQUFDQyxTQUFjQyxRQUFhQzs7SUFDckUsTUFBTUMsY0FBY0wscUVBQWNBO0lBQ2xDLE1BQU1NLFFBQVFSLDBEQUFRQSxJQUFJLGdCQUFnQjtJQUUxQyxNQUFNUywwQkFBMEJSLGtFQUFXQSxDQUFDO1FBQ3hDUyxZQUFZWCxnRUFBa0JBO1FBQzlCWSxXQUFXLENBQUNDO1lBQ1JDLFFBQVFDLEdBQUcsQ0FBQyxhQUFhRjtZQUV6QkwsWUFBWVEsY0FBYyxDQUFDO2dCQUN2QkMsVUFBVTtvQkFBQztvQkFBdUJDLFNBQVNiO29CQUFVQztvQkFBUUM7aUJBQWlCO1lBQ2xGO1lBRUFFLE1BQU07Z0JBQ0ZVLE9BQU87Z0JBQ1BDLGFBQWFQLE9BQU9RLE9BQU87Z0JBQzNCQyxRQUFRO2dCQUNSQyxVQUFVO2dCQUNWQyxZQUFZO1lBQ2hCO1FBQ0o7UUFDQUMsU0FBUyxDQUFDQztZQUNOLE1BQU07WUFDTlosUUFBUUMsR0FBRyxDQUFDLFlBQVlXO1lBQ3hCakIsTUFBTTtnQkFDRlUsT0FBT08sTUFBTUMsUUFBUSxDQUFDQyxJQUFJLENBQUNGLEtBQUs7Z0JBQ2hDTixhQUFhTSxNQUFNQyxRQUFRLENBQUNDLElBQUksQ0FBQ1AsT0FBTztnQkFDeENDLFFBQVE7Z0JBQ1JDLFVBQVU7Z0JBQ1ZDLFlBQVk7WUFDaEI7UUFFSjtJQUNKO0lBRUEsT0FBT2Q7QUFDWDtHQXBDTU47O1FBQ2tCRCxpRUFBY0E7UUFDcEJGLHNEQUFRQTtRQUVVQyw4REFBV0E7OztBQWtDL0MsK0RBQWVFLG9DQUFvQ0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvaG9va3MvdXNlQXBpRm9yU2F2ZVRvZG9MaXN0Rm9yVXNlck11dGF0aW9uLnRzeD9hMzQ1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGFwaUZvclNhdmVUb2RvUm93cyB9IGZyb20gJ0AvYXBpL2FwaUZvclRvZG9zJztcclxuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0JztcclxuaW1wb3J0IHsgdXNlTXV0YXRpb24sIHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JztcclxuXHJcbmNvbnN0IHVzZUFwaUZvclNhdmVUb2RvTGlzdEZvclVzZXJNdXRhdGlvbiA9IChwYWdlTnVtOiBhbnksIHVzZXJJZDogYW55LCB0b2RvU3RhdHVzT3B0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XHJcbiAgICBjb25zdCB0b2FzdCA9IHVzZVRvYXN0KCk7IC8vIHVzZVRvYXN0IO2bhSDsgqzsmqlcclxuXHJcbiAgICBjb25zdCBtdXRhdGlvbkZvclNhdmVUb2RvUm93cyA9IHVzZU11dGF0aW9uKHtcclxuICAgICAgICBtdXRhdGlvbkZuOiBhcGlGb3JTYXZlVG9kb1Jvd3MsXHJcbiAgICAgICAgb25TdWNjZXNzOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IDogXCIsIHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICBxdWVyeUNsaWVudC5yZWZldGNoUXVlcmllcyh7XHJcbiAgICAgICAgICAgICAgICBxdWVyeUtleTogWyd1bmNvbXBsZXRlZFRvZG9MaXN0JywgcGFyc2VJbnQocGFnZU51bSksIHVzZXJJZCwgdG9kb1N0YXR1c09wdGlvbl1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0b2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJzYXZlIHRvZG8gcm93cyBzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0Lm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8vIO2GoOyKpO2KuCDrqZTsi5zsp4DqsIAg67O07Jes7KeA64qUIOyLnOqwhCAoMuy0iClcclxuICAgICAgICAgICAgICAgIGlzQ2xvc2FibGU6IHRydWUsIC8vIOuLq+q4sCDrsoTtirwg7ZGc7IucXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25FcnJvcjogKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgOiBcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICB0b2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvLyDthqDsiqTtirgg66mU7Iuc7KeA6rCAIOuztOyXrOyngOuKlCDsi5zqsIQgKDLstIgpXHJcbiAgICAgICAgICAgICAgICBpc0Nsb3NhYmxlOiB0cnVlLCAvLyDri6vquLAg67KE7Yq8IO2RnOyLnFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBtdXRhdGlvbkZvclNhdmVUb2RvUm93cztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZUFwaUZvclNhdmVUb2RvTGlzdEZvclVzZXJNdXRhdGlvbiJdLCJuYW1lcyI6WyJSZWFjdCIsImFwaUZvclNhdmVUb2RvUm93cyIsInVzZVRvYXN0IiwidXNlTXV0YXRpb24iLCJ1c2VRdWVyeUNsaWVudCIsInVzZUFwaUZvclNhdmVUb2RvTGlzdEZvclVzZXJNdXRhdGlvbiIsInBhZ2VOdW0iLCJ1c2VySWQiLCJ0b2RvU3RhdHVzT3B0aW9uIiwicXVlcnlDbGllbnQiLCJ0b2FzdCIsIm11dGF0aW9uRm9yU2F2ZVRvZG9Sb3dzIiwibXV0YXRpb25GbiIsIm9uU3VjY2VzcyIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJyZWZldGNoUXVlcmllcyIsInF1ZXJ5S2V5IiwicGFyc2VJbnQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwibWVzc2FnZSIsInN0YXR1cyIsImR1cmF0aW9uIiwiaXNDbG9zYWJsZSIsIm9uRXJyb3IiLCJlcnJvciIsInJlc3BvbnNlIiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/hooks/useApiForSaveTodoListForUserMutation.tsx\n"));

/***/ })

});