$(document).ready(function(){
	
	$('.gnb-menu li a').on('click',function(){
		$('.gnb-menu ul > li').find('span').text('하위메뉴열기');
		if($(this).parent().hasClass('active')===false){
			$(this).find('span').text('하위메뉴닫기');
		} 
	});

	/*if($('.title-box-tab li').hasClass('active')===true){
		$(this).find('a').attr('title','선택됨');
	};

	if($('.tabMenu li').hasClass('active')===true){
		$(this).find('a').attr('title','선택됨');
	};*/
	
	//접근성
	$('#skipnavi a').on('click',function(){
		var skipTo="#"+this.href.split('#')[1];
		$(skipTo).attr('tabindex', -1).on('blur focusout', function() {
			$(this).removeAttr('tabindex');
		}).focus();
		return false;
	})	
	//search open
	$('.search-open a').on('click', function(){		
		if($('.header-element').hasClass('search')){
			$('.header-element').removeClass('search');
			$('.body-area').removeClass('search');
			searchClear = $('#arkHeader .tab-auto .word-recent .resultbox').detach();
			$(this).find('span').text("검색열기");
		} else{
			$('.header-element').addClass('search');
			$('.body-area').addClass('search');
			$(this).find('span').text("검색닫기");
			navigation.ReSet();			
			searchClear.appendTo('#arkHeader .tab-auto .word-recent');
			$('.search-area').attr('tabindex','-1').focus()//접근성
		}
	})

	//search button 접근성
	$('.search-area button').on('focusout',function(){
		$('.header-element').removeClass('search');
		$('.body-area').removeClass('search');
		$('.search-open a').find('span').text("검색열기");
	})

	//mobile search open
	$('.top-search a').on('click',function(){	
		if( $('.header-search-layer').is(':visible')) {
			$('.wrapper-element').removeClass('fixed');
			$('.header-search-layer').hide();
			$('.mask-layout').hide();
		} else{
			$('.wrapper-element').addClass('fixed');
			$('.header-search-layer').show();
			$('.mask-layout').show();
			$('.search-area .input-search-wrap .input-wrap input').focus()
		}
		return false;
	})

	$('.header-search-layer .btn-close').on('click',function(){
		$('.header-search-layer').hide();
		$('.mask-layout').hide();
		$('.wrapper-element').removeClass('fixed');
    	 return false;
    });
	
	//mobile header item click
	$('.gnb-area li a').on('click',function(){					
		var	Width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(Width < 1280){
			if($(this).parent().find('ul').attr('class') == "depth-3" || $(this).parent().find('ul').attr('class') == "depth-3 mobile-only"){						
				$(this).parent().closest('li').toggleClass('active').siblings().removeClass('active');	
			} else {
				$(this).parent().closest('li').addClass('active').siblings().removeClass('active');	
			}
			if($(this).parent().find('ul li').length > 0){						
				return false;
			} else {											
				return true;
			}					
		}
	});	
})		

$(window).load(function(){
    navigation.InitEvent();
    navigation.OpenMenu();    	
});

var timer = null;
$(window).resize(function(){
    clearTimeout(timer);
    timer = setTimeout(navigation.InitEvent(), 300);
});
	

var Mobile = true;	
var navigation = {
	InitEvent:function(){
		var	Width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var $gnbBg = $('.header-element');
		// 210423 수정
		var $gnbMenuItems = $('.gnb-area > li > a');
		if(Width >= 1280){			
			Mobile = false
		    if(Mobile == false){
		    	$gnbMenuItems.on('mouseenter focusin',function(){
					// 210423 수정 
					$(this).parent().closest('li').addClass('active').siblings().removeClass('active');
					$gnbBg.addClass('active');					
					$('.header-element').removeClass('search');
					$('.body-area').removeClass('search');
				})
				$gnbBg.on('mouseleave',function(){				
					$(this).removeClass('active');
					$('.gnb-area > li').removeClass('active')
				})
				// 210423 추가
				$('.etc-menu a').on('mouseenter focusin', function(){
					$gnbBg.removeClass('active')
				})
				//keyboard focus
				$('.gnb-area > li:nth-child(5) ul li:last-child > a').on('focusout', function(){
					$('.header-element').removeClass('active');
					$('.gnb-area > li').removeClass('active');
				})
				$('.search-tab-area > li:last-child .choose-btn a').on('focusout', function(){					
					$('.search-tab-area > li:first-child > a').click();
				})
				$('.gnb-mobile-element').removeClass('active');
				$('.gnb-area > li').removeClass('active');
		    }
		} else {
			Mobile = true;			
			if(Mobile == true){				
				$('.body-area').removeClass('search');
				$('.header-element').removeClass('search');
				$gnbMenuItems.off('mouseenter focusin');
				$gnbBg.off('mouseleave');				
				$('.gnb-area > li').eq(0).addClass('active');	
			}
		}
	},
	ReSet:function(){
		$('.header-element').removeClass('active');		
		$('.gnb-area > li').removeClass('active');
	},
	OpenMenu:function(){
		$('.btn-menu-all > a').on('click',function(){
			if($('.gnb-mobile-element').hasClass('active')){
				$('.gnb-mobile-element').removeClass('active')
			} else {
				$('.gnb-mobile-element').addClass('active');
				$('.gnb-area > li').removeClass('active');
				$('.gnb-area > li:eq(0)').addClass('active');
				$('.gnb-header >a:first-child').focus();
			}
		})
		$(document).on('keydown','[data-focus-prev],[data-focus-next]',function(e){
			
			var next= $(e.target).attr('data-focus-next'),
				prev= $(e.target).attr('data-focus-prev'),
				target = next || prev || false;
			if(!target || e.keyCode != 9){
				return;
			}
			if((!e.shiftKey && !!next)||(e.shiftKey && !!prev)){
				setTimeout(function(){
					$('[data-focus="'+target+'"]').focus();
				},1);
			}
		})
		$('.btn-menu-all-close').on('click',function(){
			$('.gnb-mobile-element').removeClass('active')
			$('.gnb-area li').removeClass('active')
		})
	}
}

// 화면확대축소
var nowZoom = 100;
var zoomControl  = {
	zoomOut : function(){
		nowZoom = nowZoom - 5;
		if(nowZoom <= 90) nowZoom = 90;
		zoomControl.zooms();
		$('.zoom-text > a').text(nowZoom+'%')
	},
	zoomIn : function(){
		nowZoom = nowZoom + 5;
		if(nowZoom >= 120) nowZoom = 120; 
		zoomControl.zooms();
		$('.zoom-text > a').text(nowZoom+'%')
	},
	zoomReset : function(){		
		nowZoom = 100;
		zoomControl.zooms();
		$('.zoom-text > a').text(nowZoom+'%')
	},
	zooms : function(){
		var aUserAgent = navigator.userAgent.toLowerCase();
		
		if (aUserAgent.indexOf("firefox") >= 0){
			$('body').css('-moz-transform','scale('+nowZoom+'%)'); 
			$('body').css('-moz-transform-origin','0 0');			
		} else {
			document.body.style.zoom = nowZoom + "%";
		}
		
		if(nowZoom == 90) {
			alert("더 이상 축소할 수 없습니다.");  
		}
		if(nowZoom == 120) {
			alert("더 이상 확대할 수 없습니다.");
		}
	}
}