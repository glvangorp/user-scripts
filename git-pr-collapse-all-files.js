// ==UserScript==
// @name         PR Collapse All
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Allows you to easily toggle the collapsed state of all
// @author       You
// @include      /https://git.*/pull/.*/
// @grant        none
// https://git.rockfin.com/QLMS/qlms-toggle/pull/1/files
// ==/UserScript==

(function() {
    'use strict';

    function clickAllFileToggles() {
        document.querySelectorAll('button.btn-octicon').forEach(function(button) {
            button.click();
        });
    }

    function createToggleAllButton() {
        var button = document.createElement("button");
        button.innerHTML = "Collapse All";
        button.collapsed = false;

        ['btn', 'btn-sm', 'js-details-target'].forEach(function(className) {
            button.classList.add(className);
        });

        button.onclick = function(e) {
            e.stopPropagation();
            clickAllFileToggles();
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
        console.log(location.origin + location.pathname);
        var toggleAllButton = createToggleAllButton();
        var headerActions = document.querySelector('.gh-header-actions');
        headerActions && headerActions.appendChild(toggleAllButton);
    }

    function urlChangeListener() {

        var currentPage = window.location.href;
        var prFilesRegex = /https:\/\/git.*\/pull\/.*\/files.*/;

        setInterval(function() {
            if (currentPage != window.location.href)
            {
                currentPage = window.location.href;
                if(currentPage.match(prFilesRegex)) {
                    addFunctionalityToPage();
                }
            }
        }, 500);
    }

    urlChangeListener();

})();