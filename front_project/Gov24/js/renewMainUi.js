/* renewMainUi.js | ����24 ���� | PCN UIT dw.do */
/*
	Required(vendor)
	- Swiper 3.4.2
*/
var rmUI = rmUI || {};
(function (rmUI, $, window, document, undefined) {
	'use strict';
	// Common variable
	var ClassName = {
		ACTIVE: 'active',
		DISABLED: 'disabled',
		OUTLINE_DISABLED: 'OUTLINE_DISABLED'
	};
	var EVENT_KEY = '.rmUI',
		EVENT = {
			KEYDOWN: 'keydown' + EVENT_KEY,
			KEYUP: 'keyup' + EVENT_KEY,
			CLICK: 'click' + EVENT_KEY,
			RESIZE: 'resize' + EVENT_KEY,
			SCROLL: 'scroll' + EVENT_KEY,
			FOCUSIN: 'focusin' + EVENT_KEY
		};
	var $WINDOW = $(window),
		WINDOW_WIDTH = $WINDOW.width(),
		WINDOW_HEIGHT = $WINDOW.height(),
		SCROLLTOP_POS = $WINDOW.scrollTop();
	var $DOCUMENT = $(document),
		$HTML = $('html').addClass(ClassName.OUTLINE_DISABLED),
		$BODY = $HTML.find('body').off(EVENT_KEY).on(EVENT.KEYDOWN, function(e) {
			if (e.keyCode === 9) $HTML.removeClass(ClassName.OUTLINE_DISABLED);
		}).on(EVENT.KEYUP, function(e) {
			if (e.keyCode === 13) $HTML.removeClass(ClassName.OUTLINE_DISABLED);
		}).on(EVENT.CLICK, function() {
			$HTML.addClass(ClassName.OUTLINE_DISABLED);
		});
	var isMobile,
		isTablet;

	// tab
	var RmTab = function(target, startIdx) {	//target = class name(object), startIdx = number(number)
		this.$tabGroup = $DOCUMENT.find(target);
		this.$tabMenu = this.$tabGroup.find('.tab-menu').attr('role', 'tablist');
		this.$tabMenuList = this.$tabMenu.find('li');
		this.$tabCont = this.$tabGroup.find('.tab-cont').hide().attr({
			'role': 'tabpanel',
			'aria-hidden': true
		});
		this.$tabMenuListAnchor = this.$tabMenuList.find('> a[data-tg]').attr({
			'role': 'tab',
			'aria-selected': false
		});
		this.targetId = null;
		this.startId = null;
		this.startIdx = null;
		if (arguments[0] !== null && typeof arguments[0] === 'number') {	// startIdx
			this.startIdx = startIdx - 1;
			this.startId = this.$tabMenuListAnchor.eq(this.startIdx).attr('data-tg');
		} else {
			if (this.$tabMenuList.hasClass(ClassName.ACTIVE)) {		// element has class name 'active'
				this.startIdx = this.$tabMenuList.filter('.' + ClassName.ACTIVE).index();
				this.startId = this.$tabMenuList.filter('.' + ClassName.ACTIVE).find('> a').attr('data-tg');
			} else {	// element has not class name and no startIdx (default)
				this.startIdx = 0;
				this.startId = this.$tabMenuListAnchor.eq(this.startIdx).attr('data-tg');
			}
		}
		this.$tabMenuList.removeClass(ClassName.ACTIVE);
		this.$tabMenuListAnchor.eq(this.startIdx).parent('li').addClass(ClassName.ACTIVE);
		this.$tabMenuListAnchor.eq(this.startIdx).attr('aria-selected', true);
		this.$tabCont.filter("[data-tg = '" + this.startId + "']").show().attr('aria-hidden', false);
	}
	RmTab.prototype.tabOpen = function(target, cbFunc) {	//target = object or number, cbFunc = callback function
		this.$tabMenuList.removeClass(ClassName.ACTIVE);
		this.$tabMenuListAnchor.attr('aria-selected', false);
		this.$tabCont.hide().attr('aria-hidden', true);

		if (arguments[0] !== null && typeof arguments[0] === 'object') {
			this.targetId = $(target).attr('data-tg');
			this.$tabMenuListAnchor.filter(target).parent('li').addClass(ClassName.ACTIVE);
			this.$tabMenuListAnchor.filter(target).attr('aria-selected', true);
		}

		if (arguments[0] !== null && typeof arguments[0] === 'number') {
			this.targetId = this.$tabMenuListAnchor.eq(target - 1).attr('data-tg');
			this.$tabMenuListAnchor.eq(target - 1).parent('li').addClass(ClassName.ACTIVE);
			this.$tabMenuListAnchor.eq(target - 1).attr('aria-selected', true);
		}

		this.$tabCont.filter("[data-tg = '" + this.targetId + "']").show().attr('aria-hidden', false);

		if (arguments[1] !== null && typeof arguments[1] === 'function') cbFunc();
	}
	RmTab.prototype.tabClose = function(e, target, cbFunc) {	// e = e, target = object or number, cbFunc = callback function
		if (arguments[1] !== null && typeof arguments[1] === 'number') {
			this.targetId = this.$tabMenuListAnchor.eq(target - 1).attr('data-tg');
			this.$tabMenuList.eq(target - 1).removeClass(ClassName.ACTIVE);
			this.$tabMenuListAnchor.eq(target - 1).attr('aria-selected', false);
			this.$tabCont.filter("[data-tg = '" + this.targetId + "']").hide().attr('aria-hidden', true);
		} else {
			this.$tabMenuList.removeClass(ClassName.ACTIVE);
			this.$tabMenuListAnchor.attr('aria-selected', false);
			this.$tabCont.hide().attr('aria-hidden', true);
		}
		if (arguments[2] !== null && typeof arguments[2] === 'function') cbFunc();

		e.preventDefault();
	}

	// toggleLang
	rmUI.toggleLang = (function() {
		var toggleGroup = '.toggle-group',
			toggleTarget = '.toggle-target',
			toggleBtn = '.toggle-btn',
			aniSpeed = 150;

		function toggleOpen(target, cbFunc) {
			$(target).addClass(ClassName.ACTIVE).parents(toggleGroup).find(toggleTarget).addClass(ClassName.ACTIVE)
				.stop().slideDown(aniSpeed);
			if (arguments[1] !== undefined && typeof cbFunc === 'function') cbFunc();
		}
		function toggleClose(target, cbFunc) {
			$(target).removeClass(ClassName.ACTIVE).parents(toggleGroup).find(toggleTarget).removeClass(ClassName.ACTIVE)
				.stop().slideUp(aniSpeed);
			if (arguments[1] !== undefined && typeof cbFunc === 'function') cbFunc();
		}
		return {
			execution: function () {
				$(toggleBtn).off().on(EVENT.CLICK, function(e) {
					var $this = $(this);

					($this.hasClass(ClassName.ACTIVE)) ? toggleClose(this) : toggleOpen(this);
					e.preventDefault();
				});
				$(toggleTarget).find("li").last().on("focusout", function(e) {
					var $this = toggleBtn;
					toggleClose($this);
				});
				$(toggleTarget).on("mouseleave", function(e){
					var $this = toggleBtn;
					toggleClose($this);
				});
			},
			// method
			toggleOpen: function() {
				toggleOpen(target, cbFunc);
			},
			toggleClose: function() {
				toggleClose(target, cbFunc);
			}
		}
	})();
	rmUI.toggleLang.execution();

	// SlideControl
	var SlideControl = function(target) {
		if (!target.length) return false;
		this.sliderEl = null;
		this.target = target;
		this.preset = {
			container: 'swiper-container',
			wrapper: 'swiper-wrapper',
			slide: 'swiper-slide'
		}
	}
	SlideControl.prototype.activate = function(option) {
		this.option = option;
		if ($(this.target).length && this.sliderEl == null) {
			$(this.target).addClass(this.preset.container);
			$(this.target).find('.sl-wrapper').addClass(this.preset.wrapper);
			$(this.target).find('.item').addClass(this.preset.slide);
			this.sliderEl = new Swiper(this.target, this.option);
		}
		return this.sliderEl;
	};
	SlideControl.prototype.deactivate = function() {
		if ($(this.target).length && this.sliderEl !== null) {
			this.sliderEl.destroy(true, true);
			this.sliderEl = null;
			$(this.target).removeClass(this.preset.container);
			$(this.target).find('.sl-wrapper').removeClass(this.preset.wrapper);
			$(this.target).find('.item').removeClass(this.preset.slide);
		}
		return this.sliderEl;
	}

	// keywordSearch
	rmUI.keywordSearch = (function() {
		if(WINDOW_WIDTH < 721){
			var $keywordGroup = $DOCUMENT.find('.keyword-group.mo-only');
		}
		if (WINDOW_WIDTH > 720){
			var $keywordGroup = $DOCUMENT.find('.keyword-group.pc-only');
		}
		var $keywordGroupInner = $keywordGroup.find('.inner'),
			$keywordSearch = $keywordGroup.find('.keyword-search'),
			$keywordForm = $keywordSearch.find('.form'),
			$keywordInput = $keywordSearch.find('.search input'),
			$keywordLayer = $keywordSearch.find('.keyword-layer'),
			aniSpeed = 200;

		var EVENT_KEY = '.rmUI.keywordSearch',
			EVENT = {
				CLICK: 'click' + EVENT_KEY,
				KEYUP: 'keyup' + EVENT_KEY,
				KEYDOWN: 'keydown' + EVENT_KEY
			};

		function keywordOpen() {
			$keywordForm.css('z-index', '205');
			$keywordLayer.fadeIn(aniSpeed);
		}
		function keywordClose() {
			$keywordForm.removeAttr('style');
			$keywordLayer.fadeOut(aniSpeed);
		}
		function keywordReset() {
			$keywordInput.val('');
		}
		return {
			execution: function() {
				$keywordInput.off(EVENT_KEY).on(EVENT.KEYUP + ' ' + EVENT.CLICK, function(e) {
					if (!$keywordInput.val()) {
						keywordClose();
						return false;
					}
					if (($keywordInput.val()).trim().length > 0) {
						keywordOpen();
					}
				});
				$DOCUMENT.off(EVENT_KEY).on(EVENT.CLICK, function(e) {
					if (!$(e.target).closest($keywordGroupInner).length) keywordClose();
				});
			},
			// public method
			keywordOpen: function() {
				keywordOpen();
			},
			keywordClose: function() {
				keywordClose();
			},
			keywordReset: function() {
				keywordReset();
			}
		}
	})();
	rmUI.keywordSearch.execution();

	// visual slide
	var visualSlide = new SlideControl('.visual-banner');
	rmUI.visualSlideSet = function() {
		var $visualGroup = $DOCUMENT.find('.visual-group'),
			$slideItem = $visualGroup.find('.swiper-slide'),
			$number = $visualGroup.find('.swiper-number'),
			$currentNum = $visualGroup.find('.swiper-current-number'),
			$totalNum = $visualGroup.find('.swiper-total-number'),
			$autoPlay = $visualGroup.find('.swiper-button-autoplay'),
			$btnStart = $visualGroup.find('.btn-start').addClass(ClassName.DISABLED),
			$btnStop = $visualGroup.find('.btn-stop').removeClass(ClassName.DISABLED),
			$btnPrevNext = $visualGroup.find('.swiper-button-prev, .swiper-button-next'),
			slideIdx,
			totalIdx;

		visualSlide.activate(
			{
				onInit: function() {
					totalIdx = $slideItem.length;
					$totalNum.text(totalIdx);
					slideIdx = 1;
					$currentNum.text(slideIdx);
				},
				effect: 'fade',
				autoplay: 7000,
				preventClicks: false,
				pagination: '.visual-group .swiper-pagination',
				nextButton: '.visual-group .swiper-button-next',
				prevButton: '.visual-group .swiper-button-prev',
				loop: false
			}
		);
		if (totalIdx == 1) {
			$autoPlay.addClass(ClassName.DISABLED);
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
			$btnPrevNext.addClass(ClassName.DISABLED);
			visualSlide.activate().stopAutoplay();
			visualSlide.activate().lockSwipes();
		};
		$btnStart.on(EVENT.CLICK, function() {
			visualSlide.activate().startAutoplay();
			$(this).addClass(ClassName.DISABLED);
			$btnStop.removeClass(ClassName.DISABLED);
		});
		$btnStop.on(EVENT.CLICK, function() {
			visualSlide.activate().stopAutoplay();
			$(this).addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
		$btnPrevNext.on(EVENT.CLICK, function() {
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
		visualSlide.activate().on('transitionStart', function() {
			slideIdx = visualSlide.activate().realIndex + 1;
			$currentNum.text(slideIdx);
		});
		visualSlide.activate().on('sliderMove', function() {
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
	}
	rmUI.visualSlideSet();

	// keyword slide
	var keywordSlide = new SlideControl('.keyword-roll');

	// keywordRoll
	rmUI.keywordRoll = (function() {
		var $keywordRecom = $DOCUMENT.find('.keyword-recom'),
			$keywordRoll = $keywordRecom.find('.keyword-roll'),
			$expandRoll = $keywordRecom.find('.expand-roll'),
			$shrinkRoll = $keywordRecom.find('.shrink-roll').addClass(ClassName.DISABLED),
			$keywordCont = $keywordRecom.find('.keyword-roll-cont'),
			$keywordSwiper = $keywordRecom.find('.swiper-slide-active'),
			aniSpeed = 200;

		function activateRoll() {
			keywordSlide.activate({
				direction: 'vertical',
				autoplay: 4000,
				observer: true,
				observeParents: true,
				loop: true
				//loop: false	//웹접근성 조치 보류 소스 211125
				/*,onInit: function() {
					$('.keyword-list li a').attr('tabIndex',-1);
					$('.keyword-list li:first a').attr('tabIndex',0);
				}*/
			});
			/*keywordSlide.activate().on('transitionStart', function() {
				$('.keyword-list').find('.swiper-slide-active a').attr('tabIndex', 0);
				$('.keyword-list .swiper-slide-active').siblings().find('a').attr('tabIndex',-1);
			});*/
		}
		function deactivateRoll() {
			keywordSlide.deactivate();
		}
		function expandRoll() {
			$expandRoll.addClass(ClassName.DISABLED);
			$shrinkRoll.removeClass(ClassName.DISABLED);
			keywordSlide.activate().stopAutoplay();
			$keywordCont.fadeIn(aniSpeed);
		}
		function shrinkRoll() {
			$shrinkRoll.addClass(ClassName.DISABLED);
			$expandRoll.removeClass(ClassName.DISABLED);
			keywordSlide.activate().startAutoplay();
			$keywordCont.fadeOut(aniSpeed);
		}
		function focusInRoll() {
			keywordSlide.activate().stopAutoplay();
		}
		function focusOutRoll() {
			keywordSlide.activate().startAutoplay();
		}
		return {
			execution: function() {
				$expandRoll.on(EVENT.CLICK, function() {
					expandRoll();
				});
				$shrinkRoll.on(EVENT.CLICK, function() {
					shrinkRoll();
				});
				$keywordRoll.on('mouseover focusin', function() {
					focusInRoll();
				});
				$keywordRoll.on('mouseout focusout', function() {
					focusOutRoll();
				});
			},
			// public method
			activateRoll: function() {
				activateRoll();
			},
			deactivateRoll: function() {
				deactivateRoll();
			},
			expandRoll: function() {
				expandRoll();
			},
			shrinkRoll: function() {
				shrinkRoll();
			}
		}
	})();
	rmUI.keywordRoll.execution();

	// frequent slide
	var frequentSlide = new SlideControl('.frequent-service-slide');

	// event slide
	var eventSlide = new SlideControl('.event-slide');
	eventSlide.activate({
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop:false
	});

	// contest slide
	var contestSlide = new SlideControl('.contest-slide');
	contestSlide.activate({
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop:false
	});
    //frq slide
	var frqSlide = new SlideControl('.frq-slide');
	var frqSlide1 = new SlideControl('.frq-slide1');
	rmUI.frqSlideSet = function() {
		var $frqFind = $DOCUMENT.find('.frq-slide'),
			$frqFind1 = $DOCUMENT.find('.frq-slide1'),
			$slideItem = $frqFind.find('.swiper-slide'),
			$slideItem1 = $frqFind1.find('.swiper-slide1'),
			$number = $frqFind.find('.swiper-number'),
			$currentNum = $frqFind.find('.swiper-current-number'),
			$totalNum = $frqFind.find('.swiper-total-number'),
			$currentNum1 = $frqFind1.find('.swiper-current-number1'),
			$totalNum1 = $frqFind1.find('.swiper-total-number1'),
			$autoPlay = $frqFind.find('.swiper-button-autoplay'),
			$btnStart = $frqFind.find('.btn-start').addClass(ClassName.DISABLED),
			$btnStop = $frqFind.find('.btn-stop').removeClass(ClassName.DISABLED),
			$btnPrevNext = $frqFind.find('.swiper-button-prev.frqfindsvc_swiper, .swiper-button-next.frqfindsvc_swiper'),
			slideIdx,
			totalIdx;

		frqSlide.activate(
			{
				onInit: function() {
					totalIdx = $slideItem.length;
					$totalNum.text(totalIdx);
					slideIdx = 1;
					$currentNum.text(slideIdx);
				},
				//autoplay: 3000,
				pagination: '.frq-slide .swiper-pagination.frqfindsvc_swiper',
				nextButton: '.frq-slide .swiper-button-next.frqfindsvc_swiper',
				prevButton: '.frq-slide .swiper-button-prev.frqfindsvc_swiper',
				loop: false
			}
		);
		
		frqSlide1.activate(
			{
				onInit: function() {
					totalIdx = $slideItem1.length;
					$totalNum1.text(totalIdx);
					slideIdx = 1;
					$currentNum1.text(slideIdx);
				},
				//autoplay: 3000,
				pagination: '.frq-slide1 .swiper-pagination.frqfindsvc_swiper',
				nextButton: '.frq-slide1 .swiper-button-next.frqfindsvc_swiper',
				prevButton: '.frq-slide1 .swiper-button-prev.frqfindsvc_swiper',
				loop: false
			}
		);
		
		if (totalIdx == 1) {
			$autoPlay.addClass(ClassName.DISABLED);
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
			$btnPrevNext.addClass(ClassName.DISABLED);
			frqSlide.activate().stopAutoplay();
			frqSlide.activate().lockSwipes();
		};
		$btnStart.on(EVENT.CLICK, function() {
			frqSlide.activate().startAutoplay();
			$(this).addClass(ClassName.DISABLED);
			$btnStop.removeClass(ClassName.DISABLED);
		});
		$btnStop.on(EVENT.CLICK, function() {
			frqSlide.activate().stopAutoplay();
			$(this).addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
		$btnPrevNext.on(EVENT.CLICK, function() {
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
		frqSlide.activate().on('transitionStart', function() {
			slideIdx = frqSlide.activate().realIndex + 1;
			$currentNum.text(slideIdx);
		});
		frqSlide1.activate().on('transitionStart', function() {
			slideIdx = frqSlide1.activate().realIndex + 1;
			$currentNum1.text(slideIdx);
		});
		frqSlide.activate().on('sliderMove', function() {
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
	}
	rmUI.frqSlideSet();
	// pr slide
	var prSlide = new SlideControl('.pr-slide');
	rmUI.prSlideSet = function() {
		var $prBanner = $DOCUMENT.find('.pr-slide'),
			$slideItem = $prBanner.find('.swiper-slide'),
			$number = $prBanner.find('.swiper-number'),
			$currentNum = $prBanner.find('.swiper-current-number'),
			$totalNum = $prBanner.find('.swiper-total-number'),
			$autoPlay = $prBanner.find('.swiper-button-autoplay'),
			$btnStart = $prBanner.find('.btn-start').addClass(ClassName.DISABLED),
			$btnStop = $prBanner.find('.btn-stop').removeClass(ClassName.DISABLED),
			$btnPrevNext = $prBanner.find('.swiper-button-prev, .swiper-button-next'),
			slideIdx,
			totalIdx;

		prSlide.activate(
			{
				onInit: function() {
					totalIdx = $slideItem.length;
					$totalNum.text(totalIdx);
					slideIdx = 1;
					$currentNum.text(slideIdx);
				},
				autoplay: 3000,
				preventClicks: false,
				pagination: '.pr-slide .swiper-pagination',
				nextButton: '.pr-slide .swiper-button-next',
				prevButton: '.pr-slide .swiper-button-prev',
				loop: false
			}
		);
		if (totalIdx == 1) {
			$autoPlay.addClass(ClassName.DISABLED);
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
			$btnPrevNext.addClass(ClassName.DISABLED);
			prSlide.activate().stopAutoplay();
			prSlide.activate().lockSwipes();
		};
		$btnStart.on(EVENT.CLICK, function() {
			prSlide.activate().startAutoplay();
			$(this).addClass(ClassName.DISABLED);
			$btnStop.removeClass(ClassName.DISABLED);
		});
		$btnStop.on(EVENT.CLICK, function() {
			prSlide.activate().stopAutoplay();
			$(this).addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
		$btnPrevNext.on(EVENT.CLICK, function() {
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
		prSlide.activate().on('transitionStart', function() {
			slideIdx = prSlide.activate().realIndex + 1;
			$currentNum.text(slideIdx);
		});
		prSlide.activate().on('sliderMove', function() {
			$btnStop.addClass(ClassName.DISABLED);
			$btnStart.removeClass(ClassName.DISABLED);
		});
	}
	rmUI.prSlideSet();

	// channel slide
	var channelSlide = new SlideControl('.channel-slide');
	channelSlide.activate({
		slidesPerView: 5,
		spaceBetween: 12,
		preventClicks: false,
		nextButton: '.channel-slide-wrap .swiper-button-next',
		prevButton: '.channel-slide-wrap .swiper-button-prev',
		loop:false,
		slidesPerGroup:5,
		breakpoints: {
			1024: {
				slidesPerView: 4,
				slidesPerGroup:4,
				spaceBetween: 10
			},
			720: {
				slidesPerView: 3,
				slidesPerGroup:3,
				spaceBetween: 6
			}
		}
	});

	// tab
	// match service tab
	var matchTab = new RmTab('.match-service-tab', 1);
	$('.match-service-tab .tab-menu li > a[data-tg]').on(EVENT.CLICK, function(e) {
		if (!$(this).next('.tab-cont').length) return false;
		matchTab.tabOpen(this);
		e.preventDefault();
	});

	// news-tab01
	var newsTab01 = new RmTab('.news-tab01', 1);
	$('.news-tab01 .tab-menu li > a[data-tg]').on(EVENT.CLICK, function(e) {
		newsTab01.tabOpen(this);
		e.preventDefault();
	});

	// news-tab2
	var newsTab02 = new RmTab('.news-tab02', 2); // open 2nd tab by covid19 (temporary)
	$('.news-tab02 .tab-menu li > a[data-tg]').on(EVENT.CLICK, function(e) {
		newsTab02.tabOpen(this);
		if (eventSlide.activate() !== null) eventSlide.activate().update(true);
		if (contestSlide.activate() !== null) contestSlide.activate().update(true);
		e.preventDefault();
	});

	// 210406 추가
	// tab rolling
	var timer = undefined;

	function autoTab(){
		if(timer == undefined){
			var tabListLength = $('.match-service-tab .tab-menu > li').length;
			var number = 0;

			timer = setInterval(function(){
				number++;

				for(var i = 0; i < tabListLength; i++){
					if(number % tabListLength == i){
						$('.match-service-tab .tab-menu > li').removeClass('active');
						$('.match-service-tab .tab-menu > li').eq(i).addClass('active');
					};
				};
			}, 3000);
		};
	};

	function stopTab(){
		clearInterval(timer);
		timer = undefined;
	}

	// 210514 수정
	$('.match-service-tab').on('mouseenter focusin',function(){
		stopTab();
		
		if($(window).width() <= 1279) {
			stopTab();
		};
	});

	// 210514 수정
	$('.match-service-tab').on('mouseleave focusout',function(){
		autoTab();
		
		if($(window).width() <= 1279) {
			stopTab();
		};
	});

	// 210514 수정
	$('.match-service-tab .tab-menu > li').on('click', function(){
		autoTab();

		if($(window).width() <= 1279) {
			stopTab();
		};
	});

	// 210504 수정
	$(window).on('resize load', function(){
		if($('.link-script2').text() == "보조금24 이용동의하기" || $('.link-script2').text() == "보조금24 이용동의"){
			if($(window).width() <= 1279){
				$('.link-script1').text('나의 생활정보');
				$('.link-script2').text('보조금24 이용동의');
			}else {
				$('.link-script1').text('나의 생활정보 (인증서 로그인 후 확인)');
				$('.link-script2').text('보조금24 이용 동의하기');
			};
		}

		if($(window).width() <= 1279){
			stopTab();

			// 210514 추가
			if($('.match-service-tab .tab-menu > li:nth-child(3)').hasClass('active')){
				$('.match-service-tab .tab-menu > li:nth-child(3)').removeClass('active');
				$('.subsidy-tab').addClass('active');
			};
		}else {
			autoTab();
		}
	});

	if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
		stopTab();
		
		$('.match-service-tab .tab-menu > li').on('click', function(){
			stopTab();
		});

		// 210504 추가
		$('.match-service-tab').on('mouseleave',function(){
			stopTab();
		});
		
	};

	// 211025 보조금24 탭 Slide
	if($('.benefit-slide .item').length > 3){
		$('.owl-carousel').owlCarousel({
			loop: false,
			nav: true,
			dots: false
		})
	}else{
		$('.subsidy-benefit-right').addClass('slide-disabled');
	};

	$('.owl-next').addClass('sr-only-text').find('span').text('다음');
	$('.owl-prev').addClass('sr-only-text').find('span').text('이전');

	// fixedAnchor
	rmUI.fixedAnchor = (function() {
		var $anchorGroup = $DOCUMENT.find('.anchor-group'),
			// $btnHome = $anchorGroup.find('.btn-home'), 210406 삭제
			$linkAnchor1 = $anchorGroup.find('.linkAnchor1'), // 보조금24 anchor
			$linkAnchor2 = $anchorGroup.find('.linkAnchor2'), // onestop service service anchor
			$linkAnchor3 = $anchorGroup.find('.linkAnchor3'), // customer service anchor
			$linkAnchor4 = $anchorGroup.find('.linkAnchor4'), // foreigner service anchor
			$matchTab = $DOCUMENT.find('.match-service-tab'),
			$customer = $DOCUMENT.find('.customer-center.mo-only'),
			anchorGroupH = 54;

		var EVENT_KEY = '.rmUI.fixedAnchor',
			EVENT = {
				CLICK: 'click' + EVENT_KEY
			};

		if (!$anchorGroup.length) return false;

		function scrollAnchor() {
			if (isMobile && !$DOCUMENT.find('.gnb-mobile-element').hasClass(ClassName.ACTIVE)) {
				if (SCROLLTOP_POS > 0) {
					$anchorGroup.addClass(ClassName.ACTIVE);
					$BODY.css('padding-top', anchorGroupH);
				} else {
					$anchorGroup.removeClass(ClassName.ACTIVE);
					$BODY.removeAttr('style');
				}
			}
		}
		return {
			// anchor event
			execution: function() {
				// 210406 삭제
				// $btnHome.off(EVENT_KEY).on(EVENT.CLICK, function(e) {
				// 	$WINDOW.scrollTop(0);
				// 	$(this).parent('li').addClass(ClassName.ACTIVE).siblings('li').removeClass(ClassName.ACTIVE);
				// 	e.preventDefault();
				// });
				$linkAnchor1.off(EVENT_KEY).on(EVENT.CLICK, function(e) {
					$WINDOW.scrollTop($matchTab.offset().top - anchorGroupH + 58);
					matchTab.tabOpen(1);
					$(this).parent('li').addClass(ClassName.ACTIVE).siblings('li').removeClass(ClassName.ACTIVE);
					e.preventDefault();
				});
				$linkAnchor2.off(EVENT_KEY).on(EVENT.CLICK, function(e) {
					$WINDOW.scrollTop($matchTab.offset().top - anchorGroupH + 58);
					matchTab.tabOpen(2);
					$(this).parent('li').addClass(ClassName.ACTIVE).siblings('li').removeClass(ClassName.ACTIVE);
					e.preventDefault();
				});
				$linkAnchor3.off(EVENT_KEY).on(EVENT.CLICK, function(e) {
					$WINDOW.scrollTop($matchTab.offset().top - anchorGroupH + 58);
					matchTab.tabOpen(4);
					$(this).parent('li').addClass(ClassName.ACTIVE).siblings('li').removeClass(ClassName.ACTIVE);
					e.preventDefault();
				});
				$linkAnchor4.off(EVENT_KEY).on(EVENT.CLICK, function(e) {
					$WINDOW.scrollTop($matchTab.offset().top - anchorGroupH + 58);
					matchTab.tabOpen(5);
					$(this).parent('li').addClass(ClassName.ACTIVE).siblings('li').removeClass(ClassName.ACTIVE);
					e.preventDefault();
				});
			},
			// public
			scrollAnchor: function() {
				scrollAnchor();
			}
		}
	})();
	rmUI.fixedAnchor.execution();
	rmUI.fixedAnchor.scrollAnchor();

	// setLayout
	rmUI.setLayout = (function() {
		var mobileCheckPoint = 703,
			tabletCheckPoint = 1262,
			$keywordItem = $DOCUMENT.find('.keyword-list .item');

		function checkWidth() {
			if (WINDOW_WIDTH > tabletCheckPoint) {
				isMobile = false;
				isTablet = false;
			} else if (tabletCheckPoint > WINDOW_WIDTH && WINDOW_WIDTH > mobileCheckPoint) {
				isMobile = false;
				isTablet = true;
			} else {
				isMobile = true;
				isTablet = false;
			}
		}
		function settingPc() {
			// keyword slide activate and start autoplay
			if (keywordSlide.sliderEl !== null) keywordSlide.activate().startAutoplay();
			if ($keywordItem.length) rmUI.keywordRoll.activateRoll();
			// frequent slide deactivate
			//frequentSlide.deactivate();
			/*frequentSlide.activate({
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
			});*/
			// disable touch control on pc type
			if (visualSlide.activate() !== null) visualSlide.activate().disableTouchControl();
			if (eventSlide.activate() !== null) eventSlide.activate().disableTouchControl();
			if (contestSlide.activate() !== null) contestSlide.activate().disableTouchControl();
			if (prSlide.activate() !== null) prSlide.activate().disableTouchControl();
			if (channelSlide.activate() !== null) channelSlide.activate().disableTouchControl();
			$BODY.removeAttr('style');
		}
		function settingTablet() {
			if (keywordSlide.sliderEl !== null) keywordSlide.activate().startAutoplay();
			if ($keywordItem.length) rmUI.keywordRoll.activateRoll();
			$BODY.removeAttr('style');
		}
		function settingMobile() {
			// keyword slide stop autoplay
			if (isMobile && keywordSlide.sliderEl !== null) keywordSlide.activate().stopAutoplay();
			if ($keywordItem.length) rmUI.keywordRoll.activateRoll();
			// frequent slide activate only mobile
			frqSlide1.activate({
				pagination: '.swiper-pagination.frqfindsvc_swiper',
				nextButton: '.swiper-button-next.frqfindsvc_swiper',
				prevButton: '.swiper-button-prev.frqfindsvc_swiper',
				loop:false
			});
			// enable touch control on mobile type
			if (visualSlide.activate() !== null) visualSlide.activate().enableTouchControl();
			if (eventSlide.activate() !== null) eventSlide.activate().enableTouchControl();
			if (contestSlide.activate() !== null) contestSlide.activate().enableTouchControl();
			if (prSlide.activate() !== null) prSlide.activate().enableTouchControl();
			if (channelSlide.activate() !== null) channelSlide.activate().enableTouchControl();
		}
		function settingLayout() {
			if (!isMobile && !isTablet) settingPc();
			if (isTablet) {
				settingTablet();
				settingMobile();
			}
			if (isMobile) settingMobile();
		}
		return {
			init: function() {
				checkWidth();
				settingLayout();
			},
			// public method
			checkWidth: function() {
				checkWidth();
			}
		}
	})();
	rmUI.setLayout.init();
	// window event (resize: debounce, scroll: throttle)
	var TIME = {
		resizeTime: null,
		scrollTime: null,
		resizeTimeout: false,
		delay: 200
	}
	$WINDOW.on(EVENT.RESIZE, function() {
		TIME.resizeTime = new Date();
		if (TIME.resizeTimeout === false) {
			TIME.resizeTimeout = true;
			setTimeout(rmUI.resizeEndCall, TIME.delay);
		}
	}).on(EVENT.SCROLL, function() {
		if (!TIME.scrollTime) {
			TIME.scrollTime = setTimeout(function() {
				TIME.scrollTime = null;
				rmUI.scrollingCall();
			}, TIME.delay);
		}
	});
	// resizeEndCall
	rmUI.resizeEndCall = function() {
		if (new Date() - TIME.resizeTime < TIME.delay) {
			setTimeout(rmUI.resizeEndCall, TIME.delay);
		} else {
			TIME.resizeTimeout = false;
			if (WINDOW_WIDTH !== $WINDOW.width()) WINDOW_WIDTH = $WINDOW.width();
			if (WINDOW_HEIGHT !== $WINDOW.height()) WINDOW_HEIGHT = $WINDOW.height();
			rmUI.setLayout.init();
			rmUI.fixedAnchor.scrollAnchor();
		}
	}
	// scrollingCall
	rmUI.scrollingCall = function() {
		if (SCROLLTOP_POS !== $WINDOW.scrollTop()) SCROLLTOP_POS = $WINDOW.scrollTop();
		rmUI.fixedAnchor.scrollAnchor();
	}
})(rmUI, jQuery, window, document);