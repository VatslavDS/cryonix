$(function () {
    "use strict";

    function t() {
        var e = $("#intro").height();
        if (e > 660) {
            $(".welcome-text").addClass("auto-center")
        } else {
            $(".welcome-text").removeClass("auto-center")
        }
        var t = $("#countdown .story").height() + 160;
        if (t < $("#countdown").height()) {
            $("#countdown .story").addClass("auto-center")
        } else {
            $("#countdown .story").removeClass("auto-center")
        }
        var n = $("#ourteam .story").height() + 160;
        if (n < $("#ourteam").height()) {
            $("#ourteam .story").addClass("auto-center")
        } else {
            $("#ourteam .story").removeClass("auto-center")
        }
        var r = $("#subscribe .story").height() + 160;
        if (r < $("#subscribe").height()) {
            $("#subscribe .story").addClass("auto-center")
        } else {
            $("#subscribe .story").removeClass("auto-center")
        }
        var i = $("#contact .story").height() + 160;
        if (i < $("#contact").height()) {
            $("#contact .story").addClass("auto-center")
        } else {
            $("#contact .story").removeClass("auto-center")
        }
    }
    $(window).on("load", function () {
        setTimeout(function () {
            $("#preload-content").fadeOut(400, function () {
                $("#preload").fadeOut(400);
                if ($(window).width() > 767) {
                    (new WOW).init()
                }
            })
        }, 400)
    });

   


    var e = new Date;
    e = new Date(2014, 5, 25);
    $("#countdownclock").countdown({
        until: $.countdown.UTCDate(-6, e),
        layout: $("#countdownclock").html()
    });


    $(window).resize(function () {
        t()
    });

    $(document).ready(function () {
        t();
        if ($(window).width() > 800) {
            $(window).bind("load", function () {
                $("#intro").parallax("50%", .3, true);
                $("#countdown").parallax("50%", .3, true);
                $("#ourteam").parallax("50%", .3, true);
                $("#subscribe").parallax("50%", .3, true);
                $("#contact").parallax("50%", .3, true)
            })
        }
        $(".scroll").click(function () {
            var e = $(this).attr("href");
            $.scrollTo($(e), 800);
            return false
        });
        $("#navigation ul li:eq(0)").addClass("current-page-item");
        $("#navigation").onePageNav({
            currentClass: "current-page-item"
        });

        $('.bxslider').bxSlider({
        	minSlides: 3,
		  	maxSlides: 4,
		  	slideWidth: 270,
		  	slideMargin: 10,
        	auto: true,
        	nextSelector: '#slider-next',
  prevSelector: '#slider-prev',
  nextText: ' Next →',
  prevText: '← Back '
		  	
		});


        $("#navigation a").tooltipsy({
            offset: [10, 0],
            show: function (e, t) {
                t.css({
                    left: parseInt(t[0].style.left.replace(/[a-z]/g, "")) + 22 + "px",
                    opacity: "0.0",
                    display: "block"
                }).animate({
                    left: parseInt(t[0].style.left.replace(/[a-z]/g, "")) - 22 + "px",
                    opacity: "1.0"
                }, 400)
            },
            hide: function (e, t) {
                t.fadeOut(200)
            }
        });
        if ($("#owl-text").length > 0) {
            $("#owl-text").owlCarousel({
                autoPlay: 4e3,
                slideSpeed: 1e3,
                navigation: false,
                pagination: false,
                singleItem: true,
                transitionStyle: "goUp"
            })
        }
        if ($("#typer").length > 0) {
            $("[data-typer-targets]").typer()
        }
        if ($("#text-rotator").length > 0) {
            var e = "flipUp",
                n = 2e3;
            if ($.browser.msie & $.browser.version == 9) {
                e = "fade";
                n = 1500
            }
            if ($.browser.msie & $.browser.version == 10) {
                e = "spin"
            }
            $("#text-rotator .rotate").textrotator({
                animation: e,
                speed: n
            })
        }
        if ($("#contact-form").length > 0) {
            $("#contact-form").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                submitHandler: function (e) {
                    $("#submit-contact").html("Sending...");
                    $(e).ajaxSubmit({
                        success: function (e, t, n, r) {
                            $("#contact-content").slideUp(600, function () {
                                $("#contact-content").html(e).slideDown(600)
                            })
                        }
                    });
                    return false
                }
            })
        }
    })
})