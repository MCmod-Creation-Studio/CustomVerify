// ==UserScript==
// @name         CustomVerify
// @namespace    mcmod
// @version      0.1
// @description  Custom verify content in editor before submitting
// @author       寒冽
// @match        https://www.mcmod.cn/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Original getDataVerify function reference
    const originalGetDataVerify = window.getDataVerify;

    // Override the getDataVerify function
    window.getDataVerify = function(t) {

        const result = originalGetDataVerify(t);

        // Info
        const customErrors = {
            "exampleError1": "Error1",
            "exampleError2": "Error2"
        };

        const customWarnings = {
            "exampleWarning1": "Warning1",
            "exampleWarning2": "Warning2"
        };

        const customInfos = {
            "exampleInfo1": "Info1",
            "exampleInfo2": "Info2"
        };

        // Example
        const content = removeHtmlTag(editor.getContent()).trim();

        if (content.length > 100) {
            result.warning[Object.keys(result.warning).length] = customWarnings.exampleWarning1;
        }

        if (content.includes("测试")) {
            result.error[Object.keys(result.error).length] = customErrors.exampleError1;
        }

        if (content.length > 200) {
            result.info[Object.keys(result.info).length] = customInfos.exampleInfo1;
        }

        return result;
    };

})();
