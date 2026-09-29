/* oceandatum.ai — shared navbar behavior
   The ONLY place the hamburger menu is wired. Pages must not add their own
   hamburger script: two click handlers cancel each other out (open, then close).
   1. Hamburger toggle + outside-click-to-close + link-click-to-close.
   2. Fit check above the phone breakpoint: if the bar doesn't fit on one row,
      hide the social icons; if it still doesn't fit, use the hamburger.
   Safe to include on pages that don't have a #mobileMenu — it no-ops. */
(function () {
    var PHONE = '(max-width: 640px)';   // keep in sync with od-navbar.css

    function barFits(nav) {
        var right = nav.querySelector('.navbar-right');
        if (!right) return true;
        if (nav.scrollWidth > nav.clientWidth + 1 || right.scrollWidth > right.clientWidth + 1) return false;
        var brand = nav.querySelector('.navbar-brand');
        if (brand && brand.getBoundingClientRect().right > right.getBoundingClientRect().left + 1) return false;
        var tops = {};
        var links = right.querySelectorAll('.navbar-link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].offsetParent) tops[Math.round(links[i].getBoundingClientRect().top)] = true;
        }
        return Object.keys(tops).length <= 1;
    }

    function fitNavbar(nav, closeMenu) {
        var root = document.documentElement;
        root.classList.remove('od-nav-no-social', 'od-nav-collapsed');
        if (window.matchMedia(PHONE).matches) return;
        if (barFits(nav)) { closeMenu(); return; }
        root.classList.add('od-nav-no-social');
        if (barFits(nav)) { closeMenu(); return; }
        root.classList.add('od-nav-collapsed');
    }

    function init() {
        var hamburgerBtn = document.getElementById('hamburgerBtn');
        var mobileMenu = document.getElementById('mobileMenu');
        if (!hamburgerBtn || !mobileMenu) return;

        // Wire once, even if this file is included twice.
        if (hamburgerBtn.getAttribute('data-od-nav') === '1') return;
        hamburgerBtn.setAttribute('data-od-nav', '1');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-controls', 'mobileMenu');

        function setOpen(open) {
            mobileMenu.classList.toggle('active', open);
            hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        hamburgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            setOpen(!mobileMenu.classList.contains('active'));
        });

        document.addEventListener('click', function (e) {
            if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                setOpen(false);
            }
        });

        var mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                setOpen(false);
            });
        });

        var nav = hamburgerBtn.closest('.navbar');
        if (!nav) return;
        var fit = function () { fitNavbar(nav, function () { setOpen(false); }); };
        var pending = false;
        window.addEventListener('resize', function () {
            if (pending) return;
            pending = true;
            window.requestAnimationFrame(function () { pending = false; fit(); });
        });
        // Re-check once web fonts and late additions (e.g. the PDF button) are in.
        window.addEventListener('load', fit);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
        fit();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
