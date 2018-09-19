// ==UserScript==
// @name         PR Collapse All
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Allows you to easily toggle the collapsed state of all
// @author       You
// @include      /https://git.*/
// @grant        none
// https://git.rockfin.com/QLMS/qlms-toggle/pull/1/files
// ==/UserScript==

(function() {
    'use strict';

    function clickAll(selector) {
        document.querySelectorAll(selector).forEach(function(button) {
            button.click();
        });
    }

    function createToggleAllButton() {

        if(document.getElementById('expand-collapse-files')) { return; }

        var button = document.createElement("button");
        button.innerHTML = "Collapse All";
        button.collapsed = false;

        ['btn', 'btn-sm', 'js-details-target'].forEach(function(className) {
            button.classList.add(className);
        });

        button.id = 'expand-collapse-files';

        button.onclick = function(e) {
            button.disabled = true;
            e.stopPropagation();

            var selector = "button.btn-octicon[aria-expanded='" + !button.collapsed + "']";
            clickAll(selector);

            button.disabled = false;
            button.collapsed = !button.collapsed;
            button.innerHTML = button.collapsed ? 'Expand All' : 'Collapse All';
        }

        return button;
    }

    function getGitButtonGroup() {
        var headerActions = document.querySelector('.gh-header-actions');
        return headerActions;
    }

    function addFunctionalityToPage() {
        var toggleAllButton = createToggleAllButton();

        if(toggleAllButton) {
            var headerActions = document.querySelector('.gh-header-actions');
            headerActions && headerActions.appendChild(toggleAllButton);
        }
    }

    function urlChangeListener() {

        var currentPage = '';
        var prFilesRegex = /https:\/\/git.*\/pull\/.*\/files.*/;

        setInterval(function() {
            currentPage = window.location.href;
            if(currentPage.match(prFilesRegex)) {
                addFunctionalityToPage();
            }
        }, 500);
    }

    urlChangeListener();

})();