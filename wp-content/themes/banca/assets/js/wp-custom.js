;
(function($) {

    "use strict";

    $(document).ready(function() {

        var $window = $(window);
        var didScroll,
            lastScrollTop = 0,
            delta = 5,
            $mainNav = $("#sticky"),
            $mainNavHeight = $mainNav.outerHeight(),
            scrollTop;

        $window.on("scroll", function() {
            didScroll = true;
            scrollTop = $(this).scrollTop();
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 200);

        function hasScrolled() {
            if (Math.abs(lastScrollTop - scrollTop) <= delta) {
                return;
            }
            if (scrollTop > lastScrollTop && scrollTop > $mainNavHeight) {
                $mainNav.css("top", -$mainNavHeight);
            } else {
                if (scrollTop + $(window).height() < $(document).height()) {
                    $mainNav.css("top", 0);
                }
            }
            lastScrollTop = scrollTop;
        }

        //sticky header
        function navbarFixed() {
            if ($("#sticky").length) {
                $(window).scroll(function() {
                    var scroll = $(window).scrollTop();
                    if (scroll) {
                        $("#sticky").addClass("navbar_fixed");
                    } else {
                        $("#sticky").removeClass("navbar_fixed");
                    }
                });
            }
        }

        navbarFixed();

        $(".navbar-nav > li .mobile_dropdown_icon").on("click", function(e) {
            $(this).parent().find("ul").first().toggle(300);
            $(this).parent().siblings().find("ul").hide(300);
        });

        if ($(".submenu").length) {
            $(".submenu > .dropdown-toggle").click(function() {
                var location = $(this).attr("href");
                window.location.href = location;
                return false;
            });
        } //End Sticky Header

        //initialize smmothscroll
        $("header").smoothScroll();


        // Blog Parallax Animations
        var $blog_banner_animation = $('blog_banner_animation');
        if ($blog_banner_animation.length > 0) {
            $blog_banner_animation.parallax({
                scalarX: 10.0,
                scalarY: 0.0,
            });
        }

        // === Back to Top Button
        var back_top_btn = $("#back-to-top");
        $(window).scroll(function() {
            if ($(window).scrollTop() > 300) {
                back_top_btn.addClass("show");
            } else {
                back_top_btn.removeClass("show");
            }
        });
        back_top_btn.on("click", function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, "300");
        });


        //============== Blog Post Share Icons ==============//
        let $blog_details_area = $('.blog_details_area')
        let $post_social_icon = $('.post_social_icon')

        if ($blog_details_area.length > 0) {
            var social_icon_offset = $blog_details_area.offset().top;
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= social_icon_offset) {
                    $post_social_icon.addClass("active");
                } else {
                    $post_social_icon.removeClass("active");
                }
                if (
                    $post_social_icon.offset().top + $post_social_icon.height() >
                    $(".footer").offset().top
                ) {
                    $post_social_icon.removeClass('active');
                }
            });
        }


        //================== sorting nice select ====================//
        let $sort_select = $('#sort-select')
        if ($sort_select.length > 0) {
            $sort_select.niceSelect();
        }

        //initilalize Telephone Input Country
        let $input_phone_number = $("#inputPhoneNumber")
        if ($input_phone_number.length > 0) {
            $input_phone_number.intlTelInput({
                separateDialCode: false,
                utilsScript: "js/utils.js",
            });
        }

        //initilalize DropeZone
        let $dropzone = $("#dropzone")
        if ($dropzone.length > 0) {
            $dropzone.dropzone({
                paramName: "file",
                url: "upload-target",
            });
        }


        //===================== Job Sorting filter =========================//

    });

})(jQuery);