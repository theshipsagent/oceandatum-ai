/* oceandatum.ai — shared navbar behavior
   Hamburger toggle + outside-click-to-close + link-click-to-close.
   Safe to include on pages that don't have a #mobileMenu — it no-ops. */
(function () {
    function init() {
        var hamburgerBtn = document.getElementById('hamburgerBtn');
        var mobileMenu = document.getElementById('mobileMenu');
        if (!hamburgerBtn || !mobileMenu) return;

        hamburgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        var mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
