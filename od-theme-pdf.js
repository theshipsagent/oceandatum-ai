/* =============================================================
   od-theme-pdf.js
   Auto-injects theme toggle + print button into navbar.
   Works with all oceandatum.ai project/report page variants.

   Requirements:
   - od-lightmode.css loaded in <head>
   - FOUC prevention in <head>:
       <script>if(localStorage.getItem('od-theme')==='light')document.body.classList.add('light-mode');</script>

   localStorage key: od-theme (consistent with inland-waterway-platform.html)
   ============================================================= */

(function () {
  'use strict';

  // -------------------------------------------------------
  // 1. Find the navbar-right container
  // -------------------------------------------------------
  var navRight = document.querySelector('.navbar-right')
    || document.querySelector('.od-navbar-right')
    || document.querySelector('.sn-r')
    || document.querySelector('.nav-links');

  if (!navRight) return;

  // -------------------------------------------------------
  // 2. Create theme toggle button — labeled for clarity
  // -------------------------------------------------------
  var toggleBtn = document.createElement('button');
  toggleBtn.className = 'od-theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle light/dark mode');
  toggleBtn.setAttribute('title', 'Toggle light/dark mode');
  toggleBtn.style.cssText =
    'background:none;' +
    'border:1px solid rgba(255,255,255,0.25);' +
    'color:rgba(255,255,255,0.8);' +
    'border-radius:6px;' +
    'padding:0.4rem 0.85rem;' +
    'cursor:pointer;' +
    'font-size:0.82rem;' +
    'font-family:inherit;' +
    'font-weight:500;' +
    'transition:all 0.3s;' +
    'flex-shrink:0;' +
    'line-height:1;' +
    'letter-spacing:0.03em;' +
    'white-space:nowrap;';

  function updateToggleLabel() {
    var isLight = document.body.classList.contains('light-mode');
    toggleBtn.innerHTML = isLight ? '&#9788; Dark' : '&#9790; Light';
  }
  updateToggleLabel();

  toggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    var isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('od-theme', isLight ? 'light' : 'dark');
    updateToggleLabel();
  });

  // -------------------------------------------------------
  // 3. Create print button
  // -------------------------------------------------------
  var printBtn = document.createElement('button');
  printBtn.className = 'od-print-btn';
  printBtn.setAttribute('aria-label', 'Print / Save as PDF');
  printBtn.setAttribute('title', 'Print / Save as PDF');
  printBtn.style.cssText =
    'background:none;' +
    'border:1px solid rgba(255,255,255,0.2);' +
    'color:rgba(255,255,255,0.7);' +
    'border-radius:6px;' +
    'padding:0.35rem 0.6rem;' +
    'cursor:pointer;' +
    'font-size:0.85rem;' +
    'font-family:inherit;' +
    'transition:all 0.3s;' +
    'flex-shrink:0;' +
    'line-height:1;';
  printBtn.innerHTML = '&#9113; Print';

  printBtn.addEventListener('click', function () {
    window.print();
  });

  // -------------------------------------------------------
  // 4. Insert buttons into navbar-right (before first link)
  // -------------------------------------------------------
  // Find the first nav link (skip nested social-icon links)
  var firstLink = navRight.querySelector('.navbar-link, .od-nav-link, .nav-link, .sn-a');
  if (!firstLink) {
    // Fallback: first direct-child <a>
    for (var i = 0; i < navRight.children.length; i++) {
      if (navRight.children[i].tagName === 'A') { firstLink = navRight.children[i]; break; }
    }
  }
  if (firstLink) {
    navRight.insertBefore(printBtn, firstLink);
    navRight.insertBefore(toggleBtn, printBtn);
  } else {
    navRight.appendChild(toggleBtn);
    navRight.appendChild(printBtn);
  }

  // -------------------------------------------------------
  // 5. Also add toggle to mobile menu if present
  // -------------------------------------------------------
  var mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    var mobileSection = mobileMenu.querySelector('.mobile-menu-section');
    if (mobileSection) {
      var mobileItem = document.createElement('div');
      mobileItem.className = 'mobile-menu-item';
      var mobileLink = document.createElement('a');
      mobileLink.href = '#';
      mobileLink.textContent = 'Toggle Light/Dark Mode';
      mobileLink.addEventListener('click', function (e) {
        e.preventDefault();
        toggleBtn.click();
      });
      mobileItem.appendChild(mobileLink);
      mobileSection.appendChild(mobileItem);
    }
  }

})();
