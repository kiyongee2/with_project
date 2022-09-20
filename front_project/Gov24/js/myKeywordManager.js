/**
 * 내가 찾은 검색어 javascript
 */

var myKeywordManager = function() {
	//내가 찾은 검색어 쿠키명
	var myKeywordCookieName = 'MyKeywords';
	
	//내가 찾은 검색어 구분자
	var keywordSeparator = '^%';
	
	//쿠키 저장 갯수
	var maxCookieSize = 10;
	
	//화면에 출력될 갯수
	var showCookieSize = 5;
	
	var isNull = function(val){
		return (val == undefined || val == null || val == '');
	};

	//내가 찾은 검색어 쿠키 추출
	var getMyKeywordCookie = function(){
		var cookieStr = getCookie(myKeywordCookieName);
		return (isNull(cookieStr)) ? '' : cookieStr;
	};
	
	//내가 찾은 검색어 쿠키 저장
	this.set = function(keyword){

		//쿠키 문자열
		var currCookieStr = getMyKeywordCookie();

		//중복여부
		if( currCookieStr.indexOf(keyword) != -1 ) return;

		//쿠키에 저장할 내용
		var currContent = keyword

		if( isNull(currCookieStr) ){
			//신규 쿠키등록
			currCookieStr = currContent;
		}else{
			//내가 찾은 검색어
			currCookieStr = currContent + keywordSeparator + currCookieStr;
		}

		//최대 저장가능 쿠키수 제한.		
		if( currCookieStr.split(keywordSeparator).size >  maxCookieSize){
			var tmpArray = currCookieStr.split(keywordSeparator);
			currCookieStr = tmpArray.slice(1, maxCookieSize).join(keywordSeparator);
		}

		setCookie(myKeywordCookieName, currCookieStr, 1, "/", "");
	};
	
	//내가 찾은 검색어 쿠키 목록 추출
	//출력할 부모 엘리먼트의 selector
	this.view = function(selector){
		
		var myKeywordCookie = getMyKeywordCookie();
		
		//쿠키정보 확인
		if( isNull(myKeywordCookie) ) {
			showSize = 0;
			// return;
		}
		
		//쿠키정보 없을경우
		if ( showSize == 0 ){
			var liTag = jQuery('<li />').text('내가 찾은 검색어가 없습니다.');
			jQuery( selector ).html( liTag );
		} else {
			var list = myKeywordCookie.split(keywordSeparator);
			var showSize = (showCookieSize < list.length) ? showCookieSize : list.length;
			
			for(var i = 0; i < showSize; i++){
				var keyword = list[i];
	
				//html생성
				var liTag = jQuery('<li />');
				var aTag = jQuery('<a />').attr('href', '#').attr('title', keyword).attr('onClick', 'javascript:searchKwd("'+keyword+'");').text(keyword);
				liTag.append(aTag);
	
				jQuery( selector ).append( liTag );
			}
		}
	};
};

/**
 * 내가 찾은 검색어 쿠키 기록
 */
var setMyKeyword = function(keyword){
	new myKeywordManager().set(keyword);
};

/**
 * 내가 찾은 검색어 표출
 */
var getMyKeywordList = function(selector){
	new myKeywordManager().view(selector);
};