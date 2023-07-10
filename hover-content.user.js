// ==UserScript==
// @name         Hover Popup Links
// @namespace    https://example.com
// @version      1.0.1
// @description  昔の5chみたいな？　知らんけどポップアップ出てくるやつ
// @match        https://*.5ch.net/*
// @grant        none
// @license      MIT
// @supportURL   https://github.com/Chibiaoiro/5ch-scripts
// @updateURL    https://github.com/Chibiaoiro/5ch-scripts/raw/main/hover-content.user.js
// @downloadURL  https://github.com/Chibiaoiro/5ch-scripts/raw/main/hover-content.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if a link matches the desired pattern
    function matchesLinkPattern(url) {
        var pattern = /^https:\/\/[a-z]+\.5ch\.net\/test\/read\.cgi\/[a-z]?\/[a-z]+\/\d+\/\d+$/;
        return pattern.test(url);
    }

    // Function to extract the 'div.post' element from the target URL
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

    // Create a container for the extracted content
    var contentContainer = document.createElement('div');
    contentContainer.id = 'hover-popup-content';
    document.body.appendChild(contentContainer);

    // Apply CSS styles to the content container
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

    // Variables to track the hover state of the link and the popup content
    var linkHovered = false;
    var contentHovered = false;

    // Variable to store the initial position of the content container
    var initialContainerX = 0;
    var initialContainerY = 0;

    // Variable to store the timer for hiding the content container
    var hideTimer = null;

    // Get all the links on the page
    var links = document.getElementsByTagName('a');

    // Loop through each link and modify the behavior
    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        link.addEventListener('mouseover', function(event) {
            event.preventDefault(); // Prevent the link from opening in a new tab

            // Check if the link matches the desired pattern
            if (matchesLinkPattern(this.href)) {
                // Extract the 'div.post' element from the target URL
                extractPostContent(this.href, function(postElement) {
                    // Clear the content container
                    contentContainer.innerHTML = '';

                    // Append the extracted content to the content container
                    contentContainer.appendChild(postElement);

                    // Display the content container
                    contentContainer.style.display = 'block';

                    // Set the link hover state to true
                    linkHovered = true;
                });

                // Store the initial position of the content container
                initialContainerX = event.clientX + 20;
                initialContainerY = event.clientY - contentContainer.offsetHeight;
            }

            // Call the original click event handler if it exists
            if (typeof this.onclick === 'function') {
                this.onclick.call(this, event);
            }
        });

        link.addEventListener('mouseout', function(event) {
            // Set the link hover state to false
            linkHovered = false;

            // Hide the content container after 300 milliseconds if neither the link nor the content is hovered
            hideTimer = setTimeout(function() {
                if (!linkHovered && !contentHovered) {
                    contentContainer.style.display = 'none';
                    contentContainer.innerHTML = '';
                }
            }, 100);
        });
    }

    // Handle mouse events on the content container
    contentContainer.addEventListener('mouseover', function(event) {
        // Set the content hover state to true
        contentHovered = true;

        // Clear the hide timer
        clearTimeout(hideTimer);
    });

    contentContainer.addEventListener('mouseout', function(event) {
        // Set the content hover state to false
        contentHovered = false;

        // Hide the content container after 300 milliseconds if neither the link nor the content is hovered
        hideTimer = setTimeout(function() {
            if (!linkHovered && !contentHovered) {
                contentContainer.style.display = 'none';
                contentContainer.innerHTML = '';
            }
        }, 100);
    });

    // Handle mouse events on the document
    document.addEventListener('mousemove', function(event) {
        // Update the position of the content container when the link is hovered
        if (linkHovered) {
            // Set the position of the content container to the initial position
            contentContainer.style.left = initialContainerX + 'px';
            contentContainer.style.top = initialContainerY + 'px';

            // Clear the hide timer if the link is re-hovered
            clearTimeout(hideTimer);
        }
    });

    // Handle mouseover events on the content container (event delegation for links inside the popup)
    contentContainer.addEventListener('mouseover', function(event) {
        var target = event.target;
        if (target.tagName === 'A' && matchesLinkPattern(target.href)) {
            // Extract the 'div.post' element from the target URL
            extractPostContent(target.href, function(postElement) {
                // Clear the content container
                contentContainer.innerHTML = '';

                // Append the extracted content to the content container
                contentContainer.appendChild(postElement);

                // Display the content container
                contentContainer.style.display = 'block';

                // Set the link hover state to true
                linkHovered = true;
            });

            // Store the initial position of the content container
            initialContainerX = event.clientX + 20;
            initialContainerY = event.clientY - contentContainer.offsetHeight;
        }
    });
})();
