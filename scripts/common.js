$(function () {

    var $commonHeader = $(".mobile-top-menu, .content-header");
    var $contentSection = $(".content-wrapper");

    var $mobileSideNav = $(".main-nav-m");
    var $navToggle = $(".ion-menu-icon, .ion-back-icon, .shadow");

    var lastScroll = 0;
    $contentSection.scroll(function () {
        var scrollTopPotision = $(this).scrollTop();
        if ((scrollTopPotision > lastScroll) && scrollTopPotision > $commonHeader.height()) {
            toggleHeader(true);
        } else {
            toggleHeader(false);
        }
        lastScroll = scrollTopPotision;
    });

    function toggleHeader(isSlideIn) {
        if (isSlideIn) {
            $commonHeader.addClass("slide-in");
            $commonHeader.removeClass("slide-out");
        } else {
            $commonHeader.addClass("slide-out");
            $commonHeader.removeClass("slide-in");
        }
    }
});