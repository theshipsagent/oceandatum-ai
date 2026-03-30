/* =============================================================
   od-theme-pdf.js
   Auto-injects print/PDF button into navbar.
   Works with all oceandatum.ai project/report page variants.
   ============================================================= */

(function () {
  'use strict';

  var navRight = document.querySelector('.navbar-right')
    || document.querySelector('.od-navbar-right')
    || document.querySelector('.nav-links');

  if (!navRight) return;

  // Create print button
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
  printBtn.innerHTML = '&#9113; PDF';

  printBtn.addEventListener('click', function () {
    window.print();
  });

  // Insert before first nav link
  var firstLink = navRight.querySelector('.navbar-link, .od-nav-link, .nav-link');
  if (firstLink) {
    navRight.insertBefore(printBtn, firstLink);
  } else {
    navRight.appendChild(printBtn);
  }

})();
