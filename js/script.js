var THEMEMASCOT = {};
(function($) {

	"use strict";


  /* ---------------------------------------------------------------------- */
  /* --------------------------- Start Demo Switcher  --------------------- */
  /* ---------------------------------------------------------------------- */
  var showSwitcher = true;
  var $body = $('body');
  var $style_switcher = $('#style-switcher');
  if( !$style_switcher.length && showSwitcher ) {
      /*$.ajax({
          url: "color-switcher/style-switcher.html",
          success: function (data) { $body.append(data); },
          dataType: 'html'
      });*/
  }
  /* ---------------------------------------------------------------------- */
  /* ----------------------------- En Demo Switcher  ---------------------- */
  /* ---------------------------------------------------------------------- */


  THEMEMASCOT.isRTL = {
    check: function() {
      if( $( "html" ).attr("dir") === "rtl" ) {
        return true;
      } else {
        return false;
      }
    }
  };

  THEMEMASCOT.isLTR = {
    check: function() {
      if( $( "html" ).attr("dir") !== "rtl" ) {
        return true;
      } else {
        return false;
      }
    }
  };


	//Hide Loading Box (Preloader)
	function loader() {
    $(window).on('load', function() {
      // Animate loader off screen
      $(".preloader").addClass('loaded');
      $(".preloader").delay(600).fadeOut();
    });
  }

  loader();

	// Call headerStyle on scroll
	$(window).on('scroll', function() {
		headerStyle();
	});

	// Also call on page load to handle reload
	$(document).ready(function() {
		headerStyle();
	});


	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.header-style-one');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				sticky_header.addClass("fixed-header animated slideInDown");
				scrollLink.fadeIn(300);
			}else {
				sticky_header.removeClass("fixed-header animated slideInDown");
				scrollLink.fadeOut(300);
			}
			if (windowpos > 1) {
				siteHeader.addClass("fixed-header");
			}else {
				siteHeader.removeClass("fixed-header");
			}
		}
	}
	headerStyle();
	
	// Header hide on scroll down, show on scroll up (optional)
	
	if ($(window).width() > 991) {
		if ($(window).width() > 768) {
			$('.parallaxie').parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){

		var mobileMenuContent = $('.main-header .main-menu .navigation').html();

		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		$('.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
			$(this).toggleClass('active');
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

	}

	//Header Search
	if ($(".search-btn").length) {
		$(".search-btn").on("click", function () {
			$(".main-header").addClass("moblie-search-active");
		});
		$(".close-search, .search-back-drop").on("click", function () {
			$(".main-header").removeClass("moblie-search-active");
		});
	}


	//Fact Counter + Text Count
	// if($('.count-box').length){
	// 	$('.count-box').appear(function(){
	// 		var $t = $(this),
	// 			n = $t.find(".count-text").attr("data-stop"),
	// 			r = parseInt($t.find(".count-text").attr("data-speed"), 10);

	// 		if (!$t.hasClass("counted")) {
	// 			$t.addClass("counted");
	// 			$({
	// 				countNum: $t.find(".count-text").text()
	// 			}).animate({
	// 				countNum: n
	// 			}, {
	// 				duration: r,
	// 				easing: "linear",
	// 				step: function() {
	// 					$t.find(".count-text").text(Math.floor(this.countNum));
	// 				},
	// 				complete: function() {
	// 					$t.find(".count-text").text(this.countNum);
	// 				}
	// 			});
	// 		}

	// 	},{accY: 0});
	// }
	
	//Fact Counter + Text Count
	if ($(".count-box").length) {
		$(".count-box").appear(
			function () {
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text(),
					}).animate(
						{
							countNum: n,
						},
						{
							duration: r,
							easing: "linear",
							step: function () {
								$t.find(".count-text").text(Math.floor(this.countNum));
							},
							complete: function () {
								$t.find(".count-text").text(this.countNum);
							},
						}
					);
				}
			},
			{ accY: 0 }
		);
	}


	//Price Range Slider
	if ($(".price-range-slider").length) {
		$(".price-range-slider").slider({
			range: true,
			min: 10,
			max: 99,
			values: [10, 60],
			slide: function (event, ui) {
				$("input.property-amount").val(ui.values[0] + " - " + ui.values[1]);
			},
		});

		$("input.property-amount").val(
			$(".price-range-slider").slider("values", 0) +
				" - $" +
				$(".price-range-slider").slider("values", 1)
		);
	}

	//product bxslider
	if ($(".product-details .bxslider").length) {
		$(".product-details .bxslider").bxSlider({
			nextSelector: ".product-details #slider-next",
			prevSelector: ".product-details #slider-prev",
			nextText: '<i class="fa fa-angle-right"></i>',
			prevText: '<i class="fa fa-angle-left"></i>',
			mode: "fade",
			auto: "true",
			speed: "700",
			pagerCustom: ".product-details .slider-pager .thumb-box",
		});
	}
	//Tabs Box

	//Quantity box
	$(".quantity-box .add").on("click", function () {
		if ($(this).prev().val() < 999) {
			$(this)
				.prev()
				.val(+$(this).prev().val() + 1);
		}
	});
	$(".quantity-box .sub").on("click", function () {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1)
				$(this)
					.next()
					.val(+$(this).next().val() - 1);
		}
	});
	
	//project-carousel
	if($('.project-slider').length > 0) {
		const ProjectSlider = new Swiper(".project-slider", {
			spaceBetween: 30,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},

			breakpoints: {
				1199: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	if($('.project-slider-2').length > 0) {
		const ProjectSlider2 = new Swiper(".project-slider-2", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},

			breakpoints: {
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//Team-carousel
	if($('.team-slider').length > 0) {
		const teamSlider = new Swiper(".team-slider", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				1399: {
					slidesPerView: 5,
				},
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	$(".feature-block-one").on("mouseenter", function () {
	    $(".feature-block-one").removeClass("active");
	    $(this).addClass("active");
	});

	// Horizontal accordion js area start here ***
	$(".hzAccordion__item").on("click", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	// Horizontal accordion js area end here ***


	if($('.team-slider-2').length > 0) {
		const teamSlider2 = new Swiper(".team-slider-2", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
			breakpoints: {
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				696: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	var marqueeSliderFive = new Swiper(".marqueeSwiper-five__slider", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 2000,
		autoplay: {
			delay: 1,
			disableOnInteraction: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
			},
			360: {
				slidesPerView: 3,
			},
			800: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
			1300: {
				slidesPerView: 5,
			},
		},
	});
	// Swiper marqee area end here ***

	// project panel
	let tl = gsap.timeline();
	const project_panel = gsap.matchMedia();
	project_panel.add("(min-width: 767px)", () => {
		let otherSections = document.querySelectorAll('.ks-project-panel')
		otherSections.forEach((section, index) => {
			gsap.set(otherSections, {
				scale: 1,
			});
			tl.to(section, {
				scale: 1,
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'top 100px',
					end: "bottom 82%",
					endTrigger: '.ks-project-area',
					pinSpacing: false,
					markers: false,
				},
			})
		})
	});

	//Testimonial-carousel
	if($('.testimonial-slider').length > 0) {
		const testimonialSlider = new Swiper(".testimonial-slider", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},

			pagination: {
				el: ".dot2",
				clickable: true,
			},

			breakpoints: {
				1199: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 2,
				},
				767: {
					slidesPerView: 2,
				},
				696: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//Team Block Five
	if ($('.team-block-five').length) {
		var $team_block = $('.team-block-five .inner-box');
		$($team_block).on('mouseenter', function (e) {
			$(this).find('.content-box .social-links').stop().slideDown(300);
			return false;
		});
		$($team_block).on('mouseleave', function (e) {
			$(this).find('.content-box .social-links').stop().slideUp(300);
			return false;
		});
	}

	if($('.testimonial-slider-2').length > 0) {
		const testimonialSlider2 = new Swiper(".testimonial-slider-2", {
			spaceBetween: 30,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot2",
				clickable: true,
			},
			breakpoints: {
				1499: {
					slidesPerView: 4,
				},
				1199: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 2.5,
				},
				767: {
					slidesPerView: 2,
				},
				696: {
					slidesPerView: 2,
				},
				476: {
					slidesPerView: 1.3,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	if($('.testimonial-slider-3').length > 0) {
		const testimonialSlider3 = new Swiper(".testimonial-slider-3", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
		});
	}

	//MixItup Gallery
	if ($(".filter-list").length) {
		$(".filter-list").mixItUp({});
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($(".dial").length) {
		$(".dial").appear(
			function () {
				var elm = $(this);
				var color = elm.attr("data-fgColor");
				var perc = elm.attr("value");

				elm.knob({
					value: 0,
					min: 0,
					max: 100,
					skin: "tron",
					readOnly: true,
					thickness: 0.15,
					dynamicDraw: true,
					displayInput: false,
				});
				$({ value: 0 }).animate(
					{ value: perc },
					{
						duration: 2000,
						easing: "swing",
						progress: function () {
							elm.val(Math.ceil(this.value)).trigger("change");
						},
					}
				);
				//circular progress bar color
				$(this).append(function () {
					// elm.parent().parent().find('.circular-bar-content').css('color',color);
					//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
				});
			},
			{ accY: 20 }
		);
	}

	//Accordion Box
	if ($('.accordion-box').length) {
		$(".accordion-box").on('click', '.acc-btn', function () {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	if ($(".tabs-box").length) {
		$(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
			e.preventDefault();
			var target = $($(this).attr("data-tab"));

			if ($(target).is(":visible")) {
				return false;
			} else {
				target
					.parents(".tabs-box")
					.find(".tab-buttons")
					.find(".tab-btn")
					.removeClass("active-btn");
				$(this).addClass("active-btn");
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.fadeOut(0);
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.removeClass("active-tab animated fadeIn");
				$(target).fadeIn(300);
				$(target).addClass("active-tab animated fadeIn");
			}
		});
	}
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
				}, 0);

		});
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
			{
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
			}
		);
		wow.init();
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($(".dial").length) {
		$(".dial").appear(
			function () {
				var elm = $(this);
				var color = elm.attr("data-fgColor");
				var perc = elm.attr("value");

				elm.knob({
					value: 0,
					min: 0,
					max: 100,
					skin: "tron",
					readOnly: true,
					thickness: 0.07,
					dynamicDraw: true,
					displayInput: false,
				});

				$({ value: 0 }).animate(
					{ value: perc },
					{
						duration: 2000,
						easing: "swing",
						progress: function () {
							elm.val(Math.ceil(this.value)).trigger("change");
						},
					}
				);

				//circular progress bar color
				$(this).append(function () {
					// elm.parent().parent().find('.circular-bar-content').css('color',color);
					//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
				});
			},
			{ accY: 20 }
		);
	}

	if($('.service-block-two .inner-box').length) {
	  const $boxes = $('.service-block-two .inner-box');

	  if ($boxes.length) {
	    // Activate the first box on load
	    // const $firstBox = $boxes.first();
	    // $firstBox.addClass('active');
	    // $firstBox.find('.content-box').addClass('active').slideDown();

	    // Click logic
	    $boxes.on('click', function () {
	      $boxes.removeClass('active');
	      $('.service-block-two .content-box').slideUp().removeClass('active');

	      $(this).addClass('active');
	      $(this).find('.content-box').slideDown().addClass('active');
	    });
	  }
	}

	$(document).ready(function () {
		$("select").niceSelect();
	});


	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
				var el = $(this);
				var percent = el.data("percent");
				$(el).css("width", percent).addClass("counted");
			},
			{
				accY: -50,
			}
		);
	}


	(function () {
		function animateProgress(id, valueId, endValue, speed) {
			const progress = document.getElementById(id);
			const valueContainer = document.getElementById(valueId);
	
			if (!progress || !valueContainer) return;
	
			let currentValue = 0;
	
			function updateProgress() {
				currentValue++;
				if (currentValue > endValue) {
					currentValue = endValue;
				}
				valueContainer.textContent = `${currentValue}%`;
				progress.style.background = `conic-gradient(
					#C8F169 ${currentValue * 3.6}deg,
					#D4D4D4 ${currentValue * 3.6}deg
				)`;
	
				if (currentValue < endValue) {
					setTimeout(() => requestAnimationFrame(updateProgress), speed);
				}
			}
	
			requestAnimationFrame(updateProgress);
		}
	
		// Initialize progress bars only if their elements exist
		document.addEventListener("DOMContentLoaded", function () {
			if (document.getElementById('progress1') && document.getElementById('value1')) {
				animateProgress('progress1', 'value1', 95, 20);
			}
			if (document.getElementById('progress2') && document.getElementById('value2')) {
				animateProgress('progress2', 'value2', 85, 20);
			}
			if (document.getElementById('progress3') && document.getElementById('value3')) {
				animateProgress('progress3', 'value3', 85, 20);
			}
			if (document.getElementById('progress4') && document.getElementById('value4')) {
				animateProgress('progress4', 'value4', 85, 20);
			}
			if (document.getElementById('progress5') && document.getElementById('value5')) {
				animateProgress('progress5', 'value5', 85, 20);
			}
			if (document.getElementById('progress6') && document.getElementById('value6')) {
				animateProgress('progress6', 'value6', 85, 20);
			}
			if (document.getElementById('progress7') && document.getElementById('value7')) {
				animateProgress('progress7', 'value7', 85, 20);
			}
			if (document.getElementById('progress8') && document.getElementById('value8')) {
				animateProgress('progress8', 'value8', 85, 20);
			}
		});
	})();
	
	
	


})(window.jQuery);
