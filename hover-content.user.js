// ==UserScript==
// @name         5ch アンカーでポップアップ
// @namespace    idk
// @author      Chibiaoiro
// @version      1.0.5
// @description  昔の5chみたいな？　アンカーにカーソル合わせたらポップアップ出るようにするやつ。　なんでか最近できなくなったからね。
// @match        https://*.5ch.net/test/read.cgi/*
// @grant        none
// @license      MIT
// @supportURL   https://github.com/Chibiaoiro/5ch-scripts
// @updateURL    https://github.com/Chibiaoiro/5ch-scripts/raw/main/hover-content.user.js
// @downloadURL  https://github.com/Chibiaoiro/5ch-scripts/raw/main/hover-content.user.js
// ==/UserScript==

(function() {
    'use strict';

    function extractPostContent(url, callback) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const data = reader.result;
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = new DOMParser().parseFromString(data, 'text/html').body.innerHTML;
                    var postElement = tempDiv.querySelector('div.post');
                    if (postElement) {
                        callback(postElement);
                    }
                };
                reader.readAsText(blob, 'shift-jis');
            })
            .catch(error => console.error(error));
    }

    var contentContainer = document.createElement('div');
    contentContainer.id = 'hover-popup-content';
    document.body.appendChild(contentContainer);

    var styles = `
        #hover-popup-content {
            position: fixed;
            z-index: 9999;
            display: none;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            padding: 0;
            margin: 0;
            border: none;
        }

        #hover-popup-content .post {
            margin-bottom: 0;
        }
    `;
    document.head.insertAdjacentHTML('beforeend', '<style>' + styles + '</style>');

    var linkHovered = false;
    var contentHovered = false;
    var initialContainerX = 0;
    var initialContainerY = 0;
    var hideTimer = null;

    document.addEventListener('mousemove', function(event) {
        if (linkHovered) {
            contentContainer.style.left = initialContainerX + 'px';
            contentContainer.style.top = initialContainerY + 'px';
            clearTimeout(hideTimer);
        }
    });

    contentContainer.addEventListener('mouseover', function(event) {
        contentHovered = true;
        clearTimeout(hideTimer);
    });

    contentContainer.addEventListener('mouseout', function(event) {
        contentHovered = false;
        hideTimer = setTimeout(function() {
            if (!linkHovered && !contentHovered) {
                contentContainer.style.display = 'none';
                contentContainer.innerHTML = '';
            }
        }, 100);
    });

    document.addEventListener('mouseover', function(event) {
        var target = event.target;
        if (target.tagName === 'A' && target.classList.contains('reply_link')) {
            event.preventDefault();
            extractPostContent(target.href, function(postElement) {
                contentContainer.innerHTML = '';
                contentContainer.appendChild(postElement);
                contentContainer.style.display = 'block';
                linkHovered = true;
            });
            initialContainerX = event.clientX + 20;
            initialContainerY = event.clientY - contentContainer.offsetHeight;
        }
    });

    document.addEventListener('mouseout', function(event) {
        linkHovered = false;
        hideTimer = setTimeout(function() {
            if (!linkHovered && !contentHovered) {
                contentContainer.style.display = 'none';
                contentContainer.innerHTML = '';
            }
        }, 100);
    });
})();

