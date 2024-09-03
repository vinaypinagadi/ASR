(function($, elementor) {
    "use strict";
    var $window = $(elementor);

    var bancaCore = {
        onInit: function() {
            var E_FRONT = elementorFrontend;
            var widgetHandlersMap = {
                "banca_counter.default": bancaCore.counterUp,
                "banca_hero.default": bancaCore.hero,
                "banca_cards.default": bancaCore.cards,
                "banca_testimonials.default": bancaCore.testimonials,
                "banca_images.default": bancaCore.images,
                "banca_loan_info.default": bancaCore.banca_loan_info,
                "banca_blog.default": bancaCore.blog_posts,
            };

            $.each(widgetHandlersMap, function(widgetName, callback) {
                E_FRONT.hooks.addAction("frontend/element_ready/" + widgetName, callback);
            });

        },


        //======================== Counter Up =========================== //
        counterUp: function($scope) {

            var counter = $scope.find(".counter span");
            var statCounter = $scope.find(".stat-counter");

            if (counter.length > 0) {
                counter.counterUp();
                statCounter.counterUp();
            }

            var $statistics_slider = $scope.find('.statistics-slider');
            if ($statistics_slider.length > 0) {
                $statistics_slider.slick({
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 3000,
                    slidesToScroll: 1,
                });
            }
        },


        //========================== Hero Section =========================//
        hero: function($scope) {

            //======= Hero Style 01 & 02
            var $animation = $scope.find('.hero_animation1');
            if ($animation.length > 0) {
                $animation.parallax({
                    scalarX: 10.0,
                    scalarY: 7.0,
                });
            }

            // Hero Style 03
            var $hero_style_3 = $scope.find('.hero_style_3');
            if ($hero_style_3.length > 0) {
                $hero_style_3.parallax({
                    scalarX: 10.0,
                    scalarY: 0.0,
                });
            }
        },

        //========================= Cards ==============================//
        cards: function($scope) {

            let $feature_slider = $scope.find('.feature-slider');
            let dataRtl = $feature_slider.data('rtl');

            if ($feature_slider.length > 0) {
                $feature_slider.slick({
                    dots: true,
                    arrows: false,
                    slidesToShow: 3,
                    autoplay: true,
                    infinite: true,
                    rtl: dataRtl,
                    autoplaySpeed: 4500,
                    slidesToScroll: 3,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }, ],
                });
            }
        },

        //======================== Testimonials =========================== //
        testimonials: function($scope) {

            //========= Style 01
            let $client_slider = $scope.find('.client-slider')
            let $data_rtl_1 = $client_slider.data('rtl')
            if ($client_slider.length > 0) {
                $client_slider.slick({
                    dots: true,
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 3,
                    autoplay: true,
                    infinite: true,
                    rtl: $data_rtl_1,
                    autoplaySpeed: 5000,
                    slidesToScroll: 3,
                    responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ],
                });
            }

            //====== Style 02
            let $testimonial_slider_2 = $scope.find(".testimonial-slider-2");
            let $testimonial_slider_3 = $scope.find('.testimonial-slider-3');
            let $data_fancybox = $('[data-fancybox]');
            let $data_rtl_2 = $testimonial_slider_2.data('rtl');
            let $data_rtl_3 = $testimonial_slider_3.data('rtl');

            if ($testimonial_slider_2.length > 0) {
                $testimonial_slider_2.slick({
                    dots: false,
                    arrows: true,
                    rtl: $data_rtl_2,
                    prevArrow: '<button type="button" class="slick-prev"><i class="arrow_left"></i></button>',
                    nextArrow: '<button type="button" class="slick-next"><i class="arrow_right"></i></button>',
                    slidesToShow: 3,
                    centerMode: false,
                    autoplay: false,
                    infinite: true,
                    autoplaySpeed: 7000,
                    slidesToScroll: 1,
                    asNavFor: $testimonial_slider_3,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                    ],
                });

            }

            if ($testimonial_slider_3.length > 0) {
                $testimonial_slider_3.slick({
                    dots: false,
                    rtl: $data_rtl_3,
                    asNavFor: $testimonial_slider_2,
                    arrows: false,
                    slidesToShow: 1,
                    centerMode: false,
                    autoplay: false,
                    infinite: true,
                    slidesToScroll: 1,
                    fade: true,
                });
            }

            if ($data_fancybox.length > 0) {
                $data_fancybox.fancybox({
                    animationEffect: "zoom-in-out",
                });
            }


            //====== Style 03
            let $testimonial_slider = $scope.find('.testimonial-slider')
            if ($testimonial_slider.length > 0) {
                $testimonial_slider.slick({
                    dots: false,
                    arrows: true,
                    prevArrow: '<button type="button" class="slick-prev"><i class="arrow_carrot-left"></i></button>',
                    nextArrow: '<button type="button" class="slick-next"><i class="arrow_carrot-right"></i></button>',
                    slidesToShow: 1,
                    centerPadding: "210px",
                    centerMode: true,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 7000,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1170,
                            settings: {
                                centerPadding: "100px",
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                centerPadding: "50px",
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                centerPadding: "0px",
                            },
                        },
                    ],
                });
            }


            //====== Style 04
            let slider4 = $scope.find('.client-slider-2');
            if (slider4.length > 0) {
                slider4.slick({
                    dots: true,
                    arrows: true,
                    prevArrow: '<button type="button" class="slick-prev"><i class="arrow_left"></i></button>',
                    nextArrow: '<button type="button" class="slick-next"><i class="arrow_right"></i></button>',
                    centerMode: false,
                    slidesToShow: 3,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                    slidesToScroll: 3,
                    responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ],
                });
            }

        },


        //=========================== Banca Images ============================//
        images: function($scope) {


            //============= Style 01
            var $images_animation = $scope.find('.banca_images_animation');
            if ($images_animation.length > 0) {
                $images_animation.parallax({
                    scalarX: 5.0,
                    scalarY: 10.0,
                });
            }

            //============== Style 02
            var $images_animation2 = $scope.find('.banca_images_animation2');
            if ($images_animation2.length > 0) {
                $images_animation2.parallax({
                    scalarX: 10.0,
                    scalarY: 7.0,
                });
            }
            //============== Style 02
            var $images_animation3 = $scope.find('.banca_images_animation3');
            if ($images_animation3.length > 0) {
                $images_animation3.parallax({
                    scalarX: 10.0,
                    scalarY: 0.0,
                });
            }

        },


        //============================ Loan Info ================================//
        banca_loan_info: function($scope) {

            let select_loan_type = $scope.find('#select-loan-type')

            if (select_loan_type.length > 0) {
                select_loan_type.niceSelect();
            }

            let readOnlyClose = $scope.find('#readOnlyClose')
            let locationSelect = $scope.find('#locationSelect')
            if (readOnlyClose.length > 0) {
                readOnlyClose.click(function() {
                    locationSelect.val("");
                    locationSelect.focus();
                });
            }

            //editableSelect location select
            if (locationSelect.length > 0) {
                locationSelect.editableSelect();
            }

        },


        //=============================== Blog Posts =================================//
        blog_posts: function($scope) {

            let $news_slider = $scope.find('.news-slider')
            let $data_rtl = $news_slider.data('rtl')

            if ($news_slider.length > 0) {
                $news_slider.slick({
                    dots: true,
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 3,
                    autoplay: false,
                    infinite: true,
                    rtl: $data_rtl,
                    autoplaySpeed: 7500,
                    slidesToScroll: 3,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ],
                });
            }
        }


    }

    $window.on("elementor/frontend/init", bancaCore.onInit);

})(jQuery, window);