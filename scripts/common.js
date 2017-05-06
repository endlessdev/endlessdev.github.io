$(function () {

    var $commonHeader = $(".mobile-top-menu, .content-header");
    var $contentSection = $(".content-wrapper");

    var $mobileSideNav = $(".main-nav-m");
    var $navToggle = $(".ion-menu-icon, .ion-back-icon, .shadow");

    var lastScroll = 0;
    $contentSection.scroll(function () {
        console.log("asdf")
        var scrollTopPotision = $(this).scrollTop();
        if (scrollTopPotision > lastScroll) {
            toggleHeader(true);
        } else {
            toggleHeader(false);
        }
        lastScroll = scrollTopPotision;
    });

    $navToggle.click(function () {
        if ($mobileSideNav.hasClass("slide-in")) {
            $mobileSideNav.removeClass("slide-in");
            $mobileSideNav.addClass("slide-out");
        } else if ($mobileSideNav.hasClass("slide-out")) {
            $mobileSideNav.removeClass("slide-out");
            $mobileSideNav.addClass("slide-in");
        } else {

        }
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