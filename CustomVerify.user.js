// ==UserScript==
// @name         CustomVerify
// @namespace    mcmod
// @version      0.4
// @description  Custom verify content in editor before submitting
// @author       寒冽
// @match        https://www.mcmod.cn/*
// @icon         https://www.mcmod.cn/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Original getDataVerify function reference
    const originalGetDataVerify = window.getDataVerify;

    // Override the getDataVerify function
    window.getDataVerify = function(t) {

        const result = originalGetDataVerify(t);

        // main function
        function Verify(condition, level, message) {
            if (typeof condition !== 'boolean') {
                console.log('Invalid condition.');
                return;
            }

            if (condition) {
                switch (level) {
                    case "error":
                        result.error[Object.keys(result.error).length] = message;
                        break;
                    case "warning":
                        result.warning[Object.keys(result.warning).length] = message;
                        break;
                    case "info":
                        result.info[Object.keys(result.info).length] = message;
                        break;
                    default:
                        result.info[Object.keys(result.info).length] = message;
                }
            }
        }

        // Example
        Verify(isenameChineseInput(), "Warning", "次要名称含中文。");
        Verify(containsBilibiliSpmId(), "Warning", "相关链接含追踪。");
        Verify(!CurseForgeProjectID(), "error", "CurseForge Project ID格式错误。");
        Verify(isCategory15Selected(), "info", "是国创整合包。");
        Verify(isTooShort(), "warning", "正文过短。");

        return result;
    };


    function isenameChineseInput() {
        // 获取 次要名称 内容
        const input = document.querySelector('input[data-multi-id="ename"]').value;

        // 中文字符
        const chineseRegex = /[\u4e00-\u9fa5]/;
        return chineseRegex.test(input);
    }

    function CurseForgeProjectID() {
        const input = document.querySelector('input[data-multi-id="cfprojectid"]').value;

        // 数字（组）或空
        const numericRegex = /^(\d+(,\d+)*)?$/;
        return numericRegex.test(input);
    }

    function containsBilibiliSpmId() {
        // 获取 class="link-text-href" 的 input 元素
        const inputElement = document.querySelector('input.link-text-href');

        // 不存在直接返回 false
        if (!inputElement) {
            return false;
        }

        // 获取输入的值
        const inputValue = inputElement.value;

        // 检查输入的值是否包含 "/?spm_id_from="
        return inputValue.includes("/?spm_id_from=");
    }

    function isCategory15Selected() {
        // 标签为国创(id = 15)的整合包
        const element = document.querySelector('a[data-multi-name="modpack-data"][data-multi-id="category"][data-category-id="15"]');

        // 检查元素是否为true
        if (element && element.getAttribute('data-category-selected') === "true") {
            return true;
        }

        return false;
    }

    // 正文
    function isTooShort() {
        const content = removeHtmlTag(editor.getContent()).trim();
        if (content.length < 10) {
            return true;
        }
        return false;
    }

})();
