// ==UserScript==
// @name         5ch Filter Script
// @namespace
// @author       Chibiaoiro
// @version      1.0.1
// @description  スクリプト対策
// @match        https://*.5ch.net/test/read.cgi/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Chibiaoiro/5ch-scripts/main/filter-script.user.js
// @downloadURL  https://raw.githubusercontent.com/Chibiaoiro/5ch-scripts/main/filter-script.user.js
// @supportURL   https://raw.githubusercontent.com/Chibiaoiro/5ch-scripts/main/filter-script.user.js
// ==/UserScript==

(function() {
  'use strict';

  // Select the target posts using the 'div.post' class
  const posts = document.querySelectorAll('div.post');

  // Create the toggle button
  const toggleButton = document.createElement('div');
  toggleButton.style.position = 'absolute';
  toggleButton.style.top = '190px';
  toggleButton.style.right = '110px';
  toggleButton.style.width = '100px';
  toggleButton.style.height = '60px';
  toggleButton.style.padding = '10px';
  toggleButton.style.background = '#ffcccc';
  toggleButton.style.border = '1px solid #ccc';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.textAlign = 'center';
  toggleButton.style.lineHeight = '20px';
  toggleButton.style.color = 'red';
  toggleButton.style.fontWeight = 'bold';
  toggleButton.style.fontFamily = 'Arial, sans-serif';
  toggleButton.style.fontSize = '14px';
  toggleButton.innerHTML = 'フィルター有効';

  // Attach the toggle button to the document body
  document.body.appendChild(toggleButton);

  // Hide the posts by default
  let postsVisible = false;
  let filteredPostsCount = 0;
  showHidePosts(postsVisible);

  // Add event listener to toggle the posts visibility when the button is clicked
  toggleButton.addEventListener('click', function() {
    postsVisible = !postsVisible;
    showHidePosts(postsVisible);
    updateToggleButton(postsVisible);
  });

  // Function to show or hide the posts based on the provided visibility flag
  function showHidePosts(visible) {
    filteredPostsCount = 0;
    posts.forEach(post => {
      const escapedSpan = post.querySelector('span.escaped');
      if (escapedSpan && escapedSpan.textContent.trim() >= '------') {
        const nextElement = post.nextElementSibling;
        if (nextElement && nextElement.tagName.toLowerCase() === 'br') {
          nextElement.style.display = visible ? 'block' : 'none';
        }
        post.style.display = visible ? 'block' : 'none';
        filteredPostsCount++;
      }
    });
    console.log(`Filtered ${filteredPostsCount} post(s).`);
  }

  // Function to update the toggle button text, title, and colors based on the current visibility state
  function updateToggleButton(visible) {
    toggleButton.style.background = visible ? 'white' : '#ffcccc';
    toggleButton.style.color = visible ? '#485269' : 'red';
    toggleButton.innerHTML = visible ? 'フィルター無効' : 'フィルター有効'
  }
})();
