//  정부24 | modify-v2022.js

'use strict';
var FEUI = FEUI || {};

(function (FEUI, $, window, document, undefined) {
  
  // Common Variable
  var UI = FEUI;

  var CLASS_NAME = {
    ACTIVE: 'active',
  };
  
  var $WINDOW = $(window);
  var $BODY = $('body');

  var $MAIN = $('.renew-main.modify-v2022');

  if ( !$BODY.find($MAIN).length ) return false;

  // Main Content Layout
  UI.MainContentLayout = function () {
    var EventKey = '.MainContentLayout';
    var Event = {
      resize: 'resize' + EventKey
    };

    var PcObserver = '.pc-only.mq-observer'; // PC: 0
    var PdObserver = '.pd-only.mq-observer'; // PAD: 1
    var MoObserver = '.mo-only.mq-observer'; // MO: 2

    var viewMode = 3;

    // Remove Unused el, Active Main
    $MAIN.find('.match-service-group, .customer-center.mo-only').remove()
      .end().find('.customer-center.pc-only').removeClass('pc-only');
    $MAIN.addClass(CLASS_NAME.ACTIVE);
    
    // Resize
    $WINDOW.data('view', viewMode).off(EventKey)
      .on(Event.resize, function() {
        viewMode = $(PcObserver).is(':visible')
          ? 0 : $(PdObserver).is(':visible') ? 1 : 2;    
        
        if ( $WINDOW.data('view') === viewMode ) return;

        $WINDOW.data('view', viewMode);

        if ( viewMode === 0 || viewMode === 1 ) {
          $('.frequent-service').after($('.customer-center'));
          $('.news-type01').find('.button-more span')
            .addClass('sr-only-text');
        }
        if ( viewMode === 2 ) {
          $('.channel-group').before($('.customer-center'));
          $('.news-type01').find('.button-more span')
            .removeClass('sr-only-text');
        }
      }).trigger(Event.resize);
  };
  UI.MainContentLayout();

  // Main Box Title
  UI.MainBoxTitleWrap = function () {
    var Box = '.frequent-service, .customer-center, .match-onestop, .match-subsidy';

    var TitleWrapClass = 'box-title-wrap';
    var TitleWrap = '<div class="' + TitleWrapClass + '" />';

    var $boxTitle;
    var $boxMoreBtn;

    if ( !$BODY.find(Box).length ) return false;

    $(Box).each(function () {
      var $this = $(this);

      $boxTitle = $this.find('h3').removeClass('sr-only').show();
      $boxMoreBtn = $this.find('.button-more');

      $boxTitle.wrap(TitleWrap);
      $this.find('.' + TitleWrapClass).append($boxMoreBtn);
    });
  };
  UI.MainBoxTitleWrap();

  // Main Slide Paging
  UI.MainSlidePaging = function () {
    var Wrap = '.frequent-service-slide';
    var Paging = '.swiper-console';
    var TitleWrap = '.box-title-wrap';

    setTimeout(function () {
      $(Wrap).each(function () {
        var $this = $(this);
  
        ( $this.hasClass('pc') )
          ? $this.find(Paging).addClass('pc')
          : $this.find(Paging).addClass('mo');
        $this.siblings(TitleWrap).after($this.find(Paging));
      });
    });
  };
  UI.MainSlidePaging();

  // Main Subsidy Tab
  UI.MainSubsidyTab = function () {
    var EventKey = '.MainSubsidyTab';
    var Event = {
      click: 'click' + EventKey,
      resize: 'resize' + EventKey,
    };

    var TabWrap = '.subsidy-tab';
    var TabContent = '.subsidy-my, .subsidy-family';
    
    var tabId;

    $(TabWrap).off(EventKey).on(Event.click, 'a', function (e) {
      var $this = $(this);

      tabId = $this.attr('href');
      e.preventDefault();

      $this.closest('li').addClass(CLASS_NAME.ACTIVE)
        .siblings().removeClass(CLASS_NAME.ACTIVE);
      
      $BODY.find(TabContent).removeClass(CLASS_NAME.ACTIVE).hide().end()
        .find(tabId).addClass(CLASS_NAME.ACTIVE).show();
      }).find('a:first').trigger(Event.click);

    // Resize
    $WINDOW.off(EventKey)
      .on(Event.resize, function() {
        var $tabAnchor = $(TabWrap).find('a[tabindex]');
        var viewMode = $WINDOW.data('view');

        if ( (viewMode !== 0 && $tabAnchor.length)
          || (viewMode === 0 && !$tabAnchor.length) ) return;

        viewMode === 0
          ? $(TabWrap).find('a').removeAttr('tabindex')
          : $(TabWrap).find('a').prop('tabindex', -1);
      }).trigger(Event.resize);
  };
  UI.MainSubsidyTab();

  // Main Onestop slide
  UI.MainOnestopSlide = function() {
    var matchOnestopSlide = new Swiper('.match-onestop-slide', {
      slidesPerView: 5,
      spaceBetween: 30,
      nextButton: '.match-onestop .swiper-button-next',
      prevButton: '.match-onestop .swiper-button-prev',
      breakpoints: {
        1279: {
          // slidesPerView: 9,
          slidesPerView: 7,
          spaceBetween: 10,
        },
        // 1179: {
        //   // slidesPerView: 8,
        //   slidesPerView: 7,
        //   spaceBetween: 10,
        // },
        // 1079: {
        //   slidesPerView: 7,
        //   spaceBetween: 10,
        // },
        979: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        879: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        // 779: {
        //   slidesPerView: 5,
        //   spaceBetween: 10,
        // },
        679: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        // 579: {
        //   slidesPerView: 4,
        //   spaceBetween: 10,
        // },
        500: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        395: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      }
    });
  };
  UI.MainOnestopSlide();
})(FEUI, jQuery, window, document);