//custom jquery method for toggle attr
$.fn.toggleAttr = function (attr, attr1, attr2) {
    return this.each(function () {
        var self = $(this);
        if (self.attr(attr) == attr1) self.attr(attr, attr2);
        else self.attr(attr, attr1);
    });
};
(function ($) {
    // USE STRICT
    "use strict";

    AIZ.data = {
        csrf: $('meta[name="csrf-token"]').attr("content"),
        appUrl: $('meta[name="app-url"]').attr("content"),
        fileBaseUrl: $('meta[name="file-base-url"]').attr("content"),
    };

    AIZ.plugins = {
        metismenu: function () {
            $('[data-toggle="aiz-side-menu"]').metisMenu();
        },
        bootstrapSelect: function (refresh = "") {
            $(".aiz-selectpicker").each(function (el) {
                var $this = $(this);
                if (!$this.parent().hasClass('bootstrap-select')) {
                    var selected = $this.data('selected');
                    if (typeof selected !== 'undefined') {
                        $this.val(selected);
                    }
                    $this.selectpicker({
                        size: 5,
                        noneSelectedText: AIZ.local.nothing_selected,
                        virtualScroll: false
                    });
                }
                if (refresh === "refresh") {
                    $this.selectpicker("refresh");
                }
                if (refresh === "destroy") {
                    $this.selectpicker("destroy");
                }
            });
        },
        fooTable: function () {
            $(".aiz-table").each(function () {
                var $this = $(this);

                var empty = $this.data("empty");
                empty = !empty ? AIZ.local.nothing_found : empty;

                $this.footable({
                    breakpoints: {
                        xs: 576,
                        sm: 768,
                        md: 992,
                        lg: 1200,
                        xl: 1400,
                    },
                    cascade: true,
                    on: {
                        "ready.ft.table": function (e, ft) {
                            AIZ.extra.deleteConfirm();
                            AIZ.plugins.bootstrapSelect("refresh");
                        },
                    },
                    empty: empty,
                });
            });
        },
        notify: function (type = "dark", message = "") {
            $.notify(
                {
                    // options
                    message: message,
                },
                {
                    // settings
                    showProgressbar: true,
                    delay: 2500,
                    mouse_over: "pause",
                    placement: {
                        from: "bottom",
                        align: "left",
                    },
                    animate: {
                        enter: "animated fadeInUp",
                        exit: "animated fadeOutDown",
                    },
                    type: type,
                    template:
                        '<div data-notify="container" class="aiz-notify alert alert-{0}" role="alert">' +
                        '<button type="button" aria-hidden="true" data-notify="dismiss" class="close"><i class="las la-times"></i></button>' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                        "</div>" +
                        "</div>",
                }
            );
        },
        swal: function (type = "dark", message = "") {
            if (type == 'danger')
                type = 'error';
            Swal.fire({
                icon: type,
                // title: message,
                html: message,
                showConfirmButton: false,
                timer: 2000,
            });

        },
        tooltip: function () {
            $('body').tooltip({selector: '[data-toggle="tooltip"]'}).click(function () {
                $('[data-toggle="tooltip"]').tooltip("hide");
            });
        },
        slickCarousel: function () {
            $(".aiz-carousel").not(".slick-initialized").each(function () {
                var $this = $(this);


                var slidesPerViewXs = $this.data("xs-items");
                var slidesPerViewSm = $this.data("sm-items");
                var slidesPerViewMd = $this.data("md-items");
                var slidesPerViewLg = $this.data("lg-items");
                var slidesPerViewXl = $this.data("xl-items");
                var slidesPerView = $this.data("items");
                var slidesToScroll = $this.data("slides-to-scroll");

                var slidesCenterMode = $this.data("center");
                var slidesArrows = $this.data("arrows");
                var slidesDots = $this.data("dots");
                var slidesRows = $this.data("rows");
                var slidesAutoplay = $this.data("autoplay");
                var slidesFade = $this.data("fade");
                var asNavFor = $this.data("nav-for");
                var infinite = $this.data("infinite");
                var focusOnSelect = $this.data("focus-select");
                var adaptiveHeight = $this.data("auto-height");


                var vertical = $this.data("vertical");
                var verticalXs = $this.data("vertical-xs");
                var verticalSm = $this.data("vertical-sm");
                var verticalMd = $this.data("vertical-md");
                var verticalLg = $this.data("vertical-lg");
                var verticalXl = $this.data("vertical-xl");

                slidesPerView = !slidesPerView ? 1 : slidesPerView;
                slidesPerViewXl = !slidesPerViewXl ? slidesPerView : slidesPerViewXl;
                slidesPerViewLg = !slidesPerViewLg ? slidesPerViewXl : slidesPerViewLg;
                slidesPerViewMd = !slidesPerViewMd ? slidesPerViewLg : slidesPerViewMd;
                slidesPerViewSm = !slidesPerViewSm ? slidesPerViewMd : slidesPerViewSm;
                slidesPerViewXs = !slidesPerViewXs ? slidesPerViewSm : slidesPerViewXs;


                vertical = !vertical ? false : vertical;
                verticalXl = (typeof verticalXl == 'undefined') ? vertical : verticalXl;
                verticalLg = (typeof verticalLg == 'undefined') ? verticalXl : verticalLg;
                verticalMd = (typeof verticalMd == 'undefined') ? verticalLg : verticalMd;
                verticalSm = (typeof verticalSm == 'undefined') ? verticalMd : verticalSm;
                verticalXs = (typeof verticalXs == 'undefined') ? verticalSm : verticalXs;


                slidesCenterMode = !slidesCenterMode ? false : slidesCenterMode;
                slidesArrows = !slidesArrows ? false : slidesArrows;
                slidesDots = !slidesDots ? false : slidesDots;
                slidesRows = !slidesRows ? 1 : slidesRows;
                slidesAutoplay = !slidesAutoplay ? false : slidesAutoplay;
                slidesFade = !slidesFade ? false : slidesFade;
                asNavFor = !asNavFor ? null : asNavFor;
                infinite = !infinite ? false : infinite;
                focusOnSelect = !focusOnSelect ? false : focusOnSelect;
                adaptiveHeight = !adaptiveHeight ? false : adaptiveHeight;
                slidesToScroll = !slidesToScroll ? 1 : slidesToScroll;

                var slidesRtl = ($("html").attr("dir") === "rtl" && !vertical) ? true : false;
                var slidesRtlXL = ($("html").attr("dir") === "rtl" && !verticalXl) ? true : false;
                var slidesRtlLg = ($("html").attr("dir") === "rtl" && !verticalLg) ? true : false;
                var slidesRtlMd = ($("html").attr("dir") === "rtl" && !verticalMd) ? true : false;
                var slidesRtlSm = ($("html").attr("dir") === "rtl" && !verticalSm) ? true : false;
                var slidesRtlXs = ($("html").attr("dir") === "rtl" && !verticalXs) ? true : false;

                $this.slick({
                    slidesToShow: slidesPerView,
                    autoplay: slidesAutoplay,
                    dots: slidesDots,
                    arrows: slidesArrows,
                    infinite: infinite,
                    vertical: vertical,
                    rtl: slidesRtl,
                    rows: slidesRows,
                    centerPadding: "0px",
                    centerMode: slidesCenterMode,
                    fade: slidesFade,
                    asNavFor: asNavFor,
                    focusOnSelect: focusOnSelect,
                    adaptiveHeight: adaptiveHeight,
                    slidesToScroll: slidesToScroll,
                    prevArrow:
                        '<button type="button" class="mx-2 slick-prev"><i class="las la-angle-left"></i></button>',
                    nextArrow:
                        '<button type="button" class="mx-2 slick-next"><i class="las la-angle-right"></i></button>',
                    responsive: [
                        {
                            breakpoint: 1500,
                            settings: {
                                slidesToShow: slidesPerViewXl,
                                vertical: verticalXl,
                                rtl: slidesRtlXL,
                            },
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: slidesPerViewLg,
                                vertical: verticalLg,
                                rtl: slidesRtlLg,
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: slidesPerViewMd,
                                vertical: verticalMd,
                                rtl: slidesRtlMd,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: slidesPerViewSm,
                                vertical: verticalSm,
                                rtl: slidesRtlSm,
                            },
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: slidesPerViewXs,
                                vertical: verticalXs,
                                rtl: slidesRtlXs,
                            },
                        },
                    ],
                });
            });
        },
    };
    AIZ.extra = {
        refreshToken: function () {
            $.get(AIZ.data.appUrl + '/refresh-csrf').done(function (data) {
                AIZ.data.csrf = data;
            });
            // console.log(AIZ.data.csrf);
        },
        mobileNavToggle: function () {
            if (window.matchMedia('(max-width: 1200px)').matches) {
                $('body').addClass('side-menu-closed')
            }
            $('[data-toggle="aiz-mobile-nav"]').on("click", function () {
                if ($("body").hasClass("side-menu-open")) {
                    $("body").addClass("side-menu-closed").removeClass("side-menu-open");
                } else if ($("body").hasClass("side-menu-closed")) {
                    $("body").removeClass("side-menu-closed").addClass("side-menu-open");
                } else {
                    $("body").removeClass("side-menu-open").addClass("side-menu-closed");
                }
            });
            $(".aiz-sidebar-overlay").on("click", function () {
                $("body").removeClass("side-menu-open").addClass('side-menu-closed');
            });
        },
        initActiveMenu: function () {
            $('[data-toggle="aiz-side-menu"] a').each(function () {
                var pageUrl = window.location.href.split(/[?#]/)[0];
                if (this.href == pageUrl || $(this).hasClass("active")) {
                    $(this).addClass("active");
                    $(this).closest(".aiz-side-nav-item").addClass("mm-active");
                    $(this)
                        .closest(".level-2")
                        .siblings("a")
                        .addClass("level-2-active");
                    $(this)
                        .closest(".level-3")
                        .siblings("a")
                        .addClass("level-3-active");
                }
            });
        },
        multiModal: function () {
            $(document).on("show.bs.modal", ".modal", function (event) {
                var zIndex = 1040 + 10 * $(".modal:visible").length;
                $(this).css("z-index", zIndex);
                setTimeout(function () {
                    $(".modal-backdrop")
                        .not(".modal-stack")
                        .css("z-index", zIndex - 1)
                        .addClass("modal-stack");
                }, 0);
            });
            $(document).on('hidden.bs.modal', function () {
                if ($('.modal.show').length > 0) {
                    $('body').addClass('modal-open');
                }
            });
        },
        bsCustomFile: function () {
            $(".custom-file input").change(function (e) {
                var files = [];
                for (var i = 0; i < $(this)[0].files.length; i++) {
                    files.push($(this)[0].files[i].name);
                }
                if (files.length === 1) {
                    $(this).next(".custom-file-name").html(files[0]);
                } else if (files.length > 1) {
                    $(this)
                        .next(".custom-file-name")
                        .html(files.length + " " + AIZ.local.files_selected);
                } else {
                    $(this).next(".custom-file-name").html(AIZ.local.choose_file);
                }
            });
        },
        stopPropagation: function () {
            $(document).on('click', '.stop-propagation', function (e) {
                e.stopPropagation();
            });
        },
        outsideClickHide: function () {
            $(document).on('click', function (e) {
                $('.document-click-d-none').addClass('d-none');
            });
        },
        inputRating: function () {
            $(".rating-input").each(function () {
                $(this)
                    .find("label")
                    .on({
                        mouseover: function (event) {
                            $(this).find("i").addClass("hover");
                            $(this).prevAll().find("i").addClass("hover");
                        },
                        mouseleave: function (event) {
                            $(this).find("i").removeClass("hover");
                            $(this).prevAll().find("i").removeClass("hover");
                        },
                        click: function (event) {
                            $(this).siblings().find("i").removeClass("active");
                            $(this).find("i").addClass("active");
                            $(this).prevAll().find("i").addClass("active");
                        },
                    });
                if ($(this).find("input").is(":checked")) {
                    $(this)
                        .find("label")
                        .siblings()
                        .find("i")
                        .removeClass("active");
                    $(this)
                        .find("input:checked")
                        .closest("label")
                        .find("i")
                        .addClass("active");
                    $(this)
                        .find("input:checked")
                        .closest("label")
                        .prevAll()
                        .find("i")
                        .addClass("active");
                }
            });
        },
        scrollToBottom: function () {
            $(".scroll-to-btm").each(function (i, el) {
                el.scrollTop = el.scrollHeight;
            });
        },
        classToggle: function () {
            $(document).on('click', '[data-toggle="class-toggle"]', function () {
                var $this = $(this);
                var target = $this.data("target");
                var sameTriggers = $this.data("same");
                var backdrop = $(this).data("backdrop");

                if ($(target).hasClass("active")) {
                    $(target).removeClass("active");
                    $(sameTriggers).removeClass("active");
                    $this.removeClass("active");
                    $('body').removeClass("overflow-hidden");
                } else {
                    $(target).addClass("active");
                    $this.addClass("active");
                    if (backdrop == 'static') {
                        $('body').addClass("overflow-hidden");
                    }
                }
            });
        },
        collapseSidebar: function () {
            $(document).on('click', '[data-toggle="collapse-sidebar"]', function (i, el) {
                var $this = $(this);
                var target = $(this).data("target");
                var sameTriggers = $(this).data("siblings");

                // var showOverlay = $this.data('overlay');
                // var overlayMarkup = '<div class="overlay overlay-fixed dark c-pointer" data-toggle="collapse-sidebar" data-target="'+target+'"></div>';

                // showOverlay = !showOverlay ? true : showOverlay;

                // if (showOverlay && $(target).siblings('.overlay').length !== 1) {
                //     $(target).after(overlayMarkup);
                // }

                e.preventDefault();
                if ($(target).hasClass("opened")) {
                    $(target).removeClass("opened");
                    $(sameTriggers).removeClass("opened");
                    $($this).removeClass("opened");
                } else {
                    $(target).addClass("opened");
                    $($this).addClass("opened");
                }
            });
        },
        plusMinus: function () {
            $('.aiz-plus-minus input').each(function () {
                var $this = $(this);
                var min = parseInt($(this).attr("min"));
                var max = parseInt($(this).attr("max"));
                var value = parseInt($(this).val());
                if (value <= min) {
                    $this.siblings('[data-type="minus"]').attr('disabled', true)
                }
                if (value >= max) {
                    $this.siblings('[data-type="plus"]').attr('disabled', true)
                }
            });
            $('.aiz-plus-minus button').on('click', function (e) {
                e.preventDefault();

                var fieldName = $(this).attr("data-field");
                var type = $(this).attr("data-type");
                var input = $("input[name='" + fieldName + "']");
                var currentVal = parseInt(input.val());

                if (!isNaN(currentVal)) {
                    if (type == "minus") {
                        if (currentVal > input.attr("min")) {
                            input.val(currentVal - 1).change();
                        }
                        if (parseInt(input.val()) == input.attr("min")) {
                            $(this).attr("disabled", true);
                        }
                    } else if (type == "plus") {
                        if (currentVal < input.attr("max")) {
                            input.val(currentVal + 1).change();
                        }
                        if (parseInt(input.val()) == input.attr("max")) {
                            $(this).attr("disabled", true);
                        }
                    }
                } else {
                    input.val(0);
                }
            });
            $('.aiz-plus-minus input').on('change', function () {
                var minValue = parseInt($(this).attr("min"));
                var maxValue = parseInt($(this).attr("max"));
                var valueCurrent = parseInt($(this).val());

                name = $(this).attr("name");
                if (valueCurrent >= minValue) {
                    $(this).siblings("[data-type='minus']").removeAttr("disabled");
                } else {
                    alert("Sorry, the minimum limit has been reached");
                    $(this).val(minValue);
                }
                if (valueCurrent <= maxValue) {
                    $(this).siblings("[data-type='plus']").removeAttr("disabled");
                } else {
                    alert("Sorry, the maximum limit has been reached");
                    $(this).val(maxValue);
                }
            });
        },
        trimAppUrl: function () {
            if (AIZ.data.appUrl.slice(-1) == '/') {
                AIZ.data.appUrl = AIZ.data.appUrl.slice(0, AIZ.data.appUrl.length - 1);
                // console.log(AIZ.data.appUrl);
            }
        },
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        acceptCookie: function () {
            if (!AIZ.extra.getCookie("acceptCookies")) {
                $(".aiz-cookie-alert").addClass("show");
            }
            $(".aiz-cookie-accept").on("click", function () {
                AIZ.extra.setCookie("acceptCookies", true, 60);
                $(".aiz-cookie-alert").removeClass("show");
            });
        },
        setSession: function () {
            $('.set-session').each(function () {
                var $this = $(this);
                var key = $this.data('key');
                var value = $this.data('value');

                const now = new Date();
                const item = {
                    value: value,
                    expiry: now.getTime() + 3600000,
                };

                $this.on('click', function () {
                    localStorage.setItem(key, JSON.stringify(item));
                });
            });
        },
        showSessionPopup: function () {
            $('.removable-session').each(function () {
                var $this = $(this);
                var key = $this.data('key');
                var value = $this.data('value');
                var item = {};
                if (localStorage.getItem(key)) {
                    item = localStorage.getItem(key);
                    item = JSON.parse(item);
                }
                const now = new Date()
                if (typeof item.expiry == 'undefined' || now.getTime() > item.expiry) {
                    $this.removeClass('d-none');
                }
            });
        }
    };

    setInterval(function () {
        AIZ.extra.refreshToken();
    }, 3600000);

    // init aiz plugins, extra options
    AIZ.extra.initActiveMenu();
    AIZ.extra.mobileNavToggle();
    AIZ.extra.multiModal();
    AIZ.extra.inputRating();
    AIZ.extra.bsCustomFile();
    AIZ.extra.stopPropagation();
    AIZ.extra.outsideClickHide();
    AIZ.extra.scrollToBottom();
    AIZ.extra.classToggle();
    AIZ.extra.collapseSidebar();
    AIZ.extra.plusMinus();
    AIZ.extra.trimAppUrl();
    AIZ.extra.acceptCookie();
    AIZ.extra.setSession();
    AIZ.extra.showSessionPopup()

    AIZ.plugins.metismenu();
    AIZ.plugins.bootstrapSelect();

    AIZ.plugins.fooTable();
    AIZ.plugins.slickCarousel();


    // $(document).ajaxComplete(function(){
    //     AIZ.plugins.bootstrapSelect('refresh');
    // });

})(jQuery);
