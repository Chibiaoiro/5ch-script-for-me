// ==UserScript==
// @name         5ch アンカーでポップアップ
// @namespace    idk
// @author.      Chibiaoiro
// @version      1.0.2
// @description  昔の5chみたいな？　アンカーにカーソル合わせたらポップアップ出るようにするやつ。　なんでか最近できなくなったからね。
// @match        https://*.5ch.net/*
// @grant        none
// @license      MIT
// @supportURL   https://github.com/Chibiaoiro/5ch-scripts
// @updateURL    https://github.com/Chibiaoiro/5ch-scripts/raw/main/hover-content.user.js
// @downloadURL  https://github.com/Chibiaoiro/5ch-scripts/raw/main/hover-content.user.js
// ==/UserScript==

(function() {
    'use strict';

    // リンクがパターンにマッチしてるか確認
    function matchesLinkPattern(url) {
        var pattern = /^https:\/\/[a-z]+\.5ch\.net\/test\/read\.cgi\/[a-z]?\/[a-z]+\/\d+\/\d+$/;
        return pattern.test(url);
    }

    // div.postをリンクから抽出
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

    // 抽出したやつのためのコンテナ
    var contentContainer = document.createElement('div');
    contentContainer.id = 'hover-popup-content';
    document.body.appendChild(contentContainer);

    // CSSのスタイルを↑に適応
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

    // ホバーしてるか
    var linkHovered = false;
    var contentHovered = false;

    // コンテナの初期位置
    var initialContainerX = 0;
    var initialContainerY = 0;

    // タイマー作る
    var hideTimer = null;

    // リンクをゲット
    var links = document.getElementsByTagName('a');

    // リンクをループで動きを改造
    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        link.addEventListener('mouseover', function(event) {
            event.preventDefault(); // 新しいタブを開くの阻止

            // パターンにマッチしてるか
            if (matchesLinkPattern(this.href)) {
                // div.post　抽出
                extractPostContent(this.href, function(postElement) {
                    // コンテナ初期化
                    contentContainer.innerHTML = '';

                    // ↑をコンテナに追加
                    contentContainer.appendChild(postElement);

                    // コンテナ表示
                    contentContainer.style.display = 'block';

                    // リンクのホバーステート更新
                    linkHovered = true;
                });

                // 初期位置
                initialContainerX = event.clientX + 20;
                initialContainerY = event.clientY - contentContainer.offsetHeight;
            }

            // Call the original click event handler if it exists
            if (typeof this.onclick === 'function') {
                this.onclick.call(this, event);
            }
        });

        link.addEventListener('mouseout', function(event) {
            // リンクのホバーステート更新
            linkHovered = false;

            // 300msで隠す
            hideTimer = setTimeout(function() {
                if (!linkHovered && !contentHovered) {
                    contentContainer.style.display = 'none';
                    contentContainer.innerHTML = '';
                }
            }, 100);
        });
    }

    // コンテナのマウスの処理
    contentContainer.addEventListener('mouseover', function(event) {
        // ホバーステート更新
        contentHovered = true;

        // タイマー初期化
        clearTimeout(hideTimer);
    });

    contentContainer.addEventListener('mouseout', function(event) {
        // ホバーステートfalse
        contentHovered = false;

        //　300msで隠す
        hideTimer = setTimeout(function() {
            if (!linkHovered && !contentHovered) {
                contentContainer.style.display = 'none';
                contentContainer.innerHTML = '';
            }
        }, 100);
    });

    // ドキュメントのマウスイベント処理
    document.addEventListener('mousemove', function(event) {
        // コンテナの位置更新
        if (linkHovered) {
            // 初期位置
            contentContainer.style.left = initialContainerX + 'px';
            contentContainer.style.top = initialContainerY + 'px';

            // タイマー初期化もしまたホバー
            clearTimeout(hideTimer);
        }
    });

    // マウスオーバー処理
    contentContainer.addEventListener('mouseover', function(event) {
        var target = event.target;
        if (target.tagName === 'A' && matchesLinkPattern(target.href)) {
            // 絶対無駄なのあるやんこんなん
            extractPostContent(target.href, function(postElement) {
                // コンテナ初期化
                contentContainer.innerHTML = '';

                // ↑コンテナに追加
                contentContainer.appendChild(postElement);

                // コンテナ表示
                contentContainer.style.display = 'block';

                // ステート更新
                linkHovered = true;
            });

            // 初期位置
            initialContainerX = event.clientX + 20;
            initialContainerY = event.clientY - contentContainer.offsetHeight;
        }
    });
})();
