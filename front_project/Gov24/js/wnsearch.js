/**
 * 주의!!!!!!!!!!!!!
 * 쿠키관련 내가 찾은 검색어, 오늘 본 서비스는 quickMenuManager.js 에서 새로 정의함!!!!!!!!!!!!!
 */

//xss 검색어 방지
function specCharChkForSearch_2017(strVal){
	strVal = strVal.replace(/[\<\>\'\\\"\/\%\(\)\{\}\;\=]/g,"");
	return strVal;
}

//추천태그
function recomendTag() {
    $.ajax({
        url : '/search/recomendTag',
        type : 'POST',
        data: {"target":"popword", "convert":"fw", "range":"w", "collection":"OGV_TN_SVC_TAG", "dataType":"json", "charset":"UTF-8"},
        dataType : 'json',
        success : function(tagJson) {
        	var errorCheck = JSON.stringify(tagJson);
        	if(errorCheck.indexOf('error') < 0) {
        		$("#recomendTagListDiv").show();
	        	var recomendTagCount  = tagJson.Data.Query.length;
	        	var recomendTag = tagJson.Data.Query;
	        	var checkTag = JSON.stringify(recomendTag);
	        	var num = 0;
	            var str = "";
	            if(tagJson != null) {
		            $.each(recomendTag, function(key) {
		            	if(num < 5) {
		                	var tag = recomendTag[key].content;
		                	str += "<li>";
		                    
		                	str += "<span>";
		                	
		                	str += num+1;
		                	
		                	str += "</span>";
		                	
		                    str += "<a href=\"javascript:;\" onclick=\"javascript:tagSearch('" + tag + "');\">";
		
		                    str += " " + tag + "</a></li>";
		            	} else {
		            		return;
		            	}
		                num++;
		            });
	            }
	            $("#recomendTagList").html(str);
        	}
        },
        error : function(request, status, error) {
        	// alert("code : " + request.status+"\n"+"message :" + request.responseText + "\n" +"error : " + error);
        }
    });
}

function doKeyword() {
	$("#searchForm").submit();
}

function intSearch() {
	var searchForm = document.searchForm;
	var query = searchForm.srhQuery;
	var realQuery = searchForm.realQuery;
	
	//xss 검색어 방지
	query.value = specCharChkForSearch_2017(query.value);
	
	if(query.value == $("#searchForm input[name=srhQuery]").attr("placeholder")) {
		alert("검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.value) == '') {
		alert('검색어를 입력해주시기 바랍니다.');
		query.focus();
		return false;
	}
	
	if($.trim(query.value).length < 2) {
		alert("2자 이상의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.value).length > 50) {
		alert("50자 이하의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	// research가 체크 되지 않았다면 realQuery를 공백값으로 바꾼다.
	if (!$("#research").prop("checked")) {
		realQuery.value = "";
	}
	
	//내가 찾은 검색어 추가
	setMyKeyword(query.value);
	
	//통합검색시 셀렉트박스 검색 : 20190228
	var frm = $('#searchForm');

	$('#searchForm input[name=policyType]').val("");

	if($("#searchCollectonCd").val() != ""){
		if($("#searchCollectonCd").val() == "pi"){
			$('#searchForm input[name=policyType]').val("G00301");
			frm.attr('action', '/search/'+$("#searchCollectonCd").val());
		}else if($("#searchCollectonCd").val() == "news"){
			frm.attr('action', '/search/'+$("#searchCollectonCd").val()+'/local');
		}else{
			frm.attr('action', '/search/'+$("#searchCollectonCd").val());
		}
	}else{
		frm.attr('action', '/search');
	}

	return true;
}

// 헤더검색
function headerSearch() {
	var searchForm = document.headerSearchForm;
	var query = searchForm.srhQuery;
	
	query.value = specCharChkForSearch_2017(query.value);
	
	//내가 찾은 검색어 추가
	setMyKeyword(query.value);
	
	if($.trim(query.value) == '') {
		alert("검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.value).length < 2) {
		alert("2자 이상의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.value).length > 50) {
		alert("50자 이하의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	$("#headerSearchForm").attr("action","/search");
	
	return true;
}

//쿠키값 조회
function getCookie(c_name) {
	var i,x,y,cookies=document.cookie.split(";");
	for (i=0;i<cookies.length;i++) {
		x=cookies[i].substr(0,cookies[i].indexOf("="));
		y=cookies[i].substr(cookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
	
		if (x==c_name) {
			return unescape(y);
		}
	}
}

// 쿠키값 설정
function setCookie(c_name, value, exdays, path, domain) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	var cookie_string = "";
	if (path != "") {
		cookie_string = "; path=" + escape(path);
	}
	document.cookie=c_name + "=" + c_value + cookie_string;
}

// 내가 찾은 검색어 조회
function getMyKeyword(keyword, totCount) {
	var MYKEYWORD_COUNT = 6; //내가 찾은 검색어 갯수 + 1
	var myKeyword = getCookie("mykeyword");

	if( myKeyword== null) myKeyword = "";
	var myKeywords = myKeyword.split("^%");

	var existsKeyword = false;
	for( var i = 0; i < myKeywords.length; i++) {
		if( myKeywords[i] == keyword) {
			existsKeyword = true;
			break;
		}
	}

	if( !existsKeyword ){
		if( keyword.trim() != "" && totCount > 0){
			myKeywords.push(keyword);
		}
		
		if( myKeywords.length == MYKEYWORD_COUNT ){
			myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
		}
		
    	setCookie("mykeyword", myKeywords.join("^%"), 1, "/", "");
	}

	showMyKeyword(myKeywords.reverse());
}

// 내가 찾은 검색어 
function showMyKeyword(myKeywords){
	var str					= "";
	var myword				= "";
	var myKeywords_length	= myKeywords.length;
	var realCnt				= 0;
	
	if( myKeywords_length > 10 ) myKeywords_length = 6;

	for( var i = 0; i < myKeywords_length; i++ ){
		if( myKeywords[i] != "" ){
			myword = replaceAll(replaceAll(cutStr(replaceAll(replaceAll(myKeywords[i],"&*39;","'"),"&*34;","\""),60),"'","&*39;"),"\"","&*34;");
			//myword = cutStr(myKeywords[i],14);
    		realCnt++;
    		str += "<li><a href=\"javascript:void(0);\" onClick=\"javascript:searchKwd('"+myKeywords[i]+"');\" title=\"" + replaceAll(myKeywords[i], "*", "#") + "\">" + replaceAll(myword, "*", "#")+"</a></li>";
    		//str += "<li><a href=\"javascript:void(0);\" onClick=\"javascript:searchKwd('"+myKeywords[i]+"');\" title=\"" + replaceAll(myKeywords[i], "*", "#") + "\">"+(i+1)+". " + replaceAll(myword, "*", "#")+"</a> <img src=\"./images/btn-del.gif\" onClick=\"removeMyKeyword('"+myKeywords[i]+"');\" style=\"cursor:point;\"/></li>";
        }
	}
    
    if( realCnt == 0 ){
		str += "<li>내가 찾은 검색어가 없습니다.</li>";
	}
	$("#myKwdList").html(str);
}

//내가 본 문서 저장
function setDocumentCookie(docId){
	var MAX_COOKIE_SIZE = 6;
	
	var docCookieStr = getCookie("myDocument");
	
	if( docCookieStr == null ) {
		docCookieStr = "";
	}
	
	var docCookie = docCookieStr.split("^%");
	
	//parameter check
	var existsDocument = false;

	if(docId == "") {
		existsDocument = true;
	}
	
	for(var i in docCookie) {
		if( docCookie[i] == docId ){
			existsDocument = true;
			break;
		}
	}
	
	if(!existsDocument) {
		docCookie.push(docId);
		if( docCookie.length == MAX_COOKIE_SIZE ){
			docCookie = docCookie.slice(1, MAX_COOKIE_SIZE);
		}
	}

	//최종 쿠키 저장
	setCookie("myDocument", docCookie.join("^%"), 1, "/", "");
}

// 
function getDocumentsCookie(){
	var docCnt = 0;
	
	var docCookieStr = getCookie("myDocument");
	
	if( docCookieStr == null ) {
		docCookieStr = "";
	}
	
	var docCookie = docCookieStr.split("^%");
	
	if(docCookie.length > 6) {
		docCookie.length == 6;
	}
	
	var str = "";
	
	//쿠키정렬 최신순으로
	docCookie = docCookie.reverse();
	
	for(var i in docCookie) {
		if(docCookie[i] != "") {
			//myDoc = "URL|TEXT"
			var myDoc = docCookie[i].split("|");

			if( myDoc[1] != "" ){
				var mydocu = replaceAll(replaceAll(cutStr(replaceAll(replaceAll(myDoc[1],"&*39;","'"),"&*34;","\""),100),"'","&*39;"),"\"","&*34;");			
				str += "<li><a href=\"javascript:void(0);\" onClick=\"javascript:window.open('"+myDoc[0]+"');\" title=\"" + replaceAll(myDoc[1], "*", "#") + "\">" + replaceAll(mydocu, "*", "#") + "</a> </li>";
				docCnt++;
			}
		}
	}
	
	if(docCnt == 0) {
		str = "<li>최근 열람 서비스가 없습니다.</li>";
	}
	
	$("#myDocList").html(str);
}

// Replace All
function replaceAll(str, orgStr, repStr) {
	return new String(str).split(orgStr).join(repStr);
}

// 문자열 바이트 단위로 짜르기
function cutStr(str,limit) {
	var tmpStr		= str;
	var byte_count	= 0;
	var len			= str.length;
	var dot			= "";
	
	for( i=0; i<len; i++ ){
		byte_count += chr_byte(str.charAt(i));
	 
		if( byte_count == limit-1 ){ 
			if( chr_byte(str.charAt(i+1)) == 2 ){
				tmpStr = str.substring(0,i+1);
				dot = "...";
			}else{
				if( byte_count < len ) dot = "...";
				if( byte_count > len ) dot = "...";
		  
				tmpStr = str.substring(0,i+2);
			}
		  
			break;
		}else if( byte_count == limit ){
			if(i+1 < len) dot = "...";
			tmpStr = str.substring(0,i+1);
			break;
		}
	}
	return tmpStr + dot;
}

function chr_byte(chr) {
  if( escape(chr).length > 4 ){
	  return 2;
  } else {
	  return 1; 
  }
}

/**
 * 조회 키워드
 * @param kwd
 */
function searchKwd(kwd){
	kwd = kwd.trim();
	
	if(null != kwd && kwd != "") {
		$('#keywordForm input[name=srhQuery]').val(kwd);
		$('#keywordForm').attr('action',"/search");
		$('#keywordForm').submit();
	}
}

// 탭별 정렬조건 변경
function goChangeOrder(order, target, selCol){
	$('#orderForm input[name=reQueryFlag]').val("2");
	
	$('#orderForm input[name=sort]').val(order);
	
	var targetUrl = "/search";
   
    if("" != target || undefined != target){
    	targetUrl = "/search/"+target;
    }
    
    if("" != selCol || undefined != selCol){
    	targetUrl += "/"+selCol;
    }

    $('#orderForm').attr("action", targetUrl);
    $('#orderForm').submit();
}

// 조건별 정렬조건 변경
function goChangeOrderByClmser(selCol, sort){
	var targetUrl = "/portal/service/clmserSearch/"+selCol;
	
	$('#orderForm input[name=reQueryFlag]').val("2");
	$('#orderForm input[name=sort]').val(sort);
	$('#orderForm').attr('action',targetUrl);
	$('#orderForm').submit();
	
}

// 분야별 정렬조건 변경
function goChangeOrderByCategory(selCol, astCd, sort){
	var targetUrl = "/portal/service/categorySearch/"+selCol+"/"+astCd;
	
	$('#orderForm input[name=reQueryFlag]').val("2");
	$('#orderForm input[name=sort]').val(sort);
	$('#orderForm').attr('action',targetUrl);
	$('#orderForm').submit();
}

// 전체민원 정렬조건 변경
function goChangeOrderByMinwon(sort){
	var targetUrl = "/portal/minwon/search";
	
	$('#orderForm input[name=sort]').val(sort);
	$('#orderForm').attr('action',targetUrl);
	$('#orderForm').submit();
}


// 자치전체민원 정렬조건 변경
function goChangeOrderByAutoMinwon(sort){
	var targetUrl = "/portal/autonomy_minwon/search";
	
	$('#orderForm input[name=sort]').val(sort);
	$('#orderForm').attr('action',targetUrl);
	$('#orderForm').submit();
}

// 통합검색 탭 검색
function goChangeTab(target){
	var targetUrl = "/search/";
	
	if("" != target){
	    targetUrl ="/search/"+target;
	}
	
	// 공공서비스 탭 선택시 중앙 서비스
	if(target == 'svc') {
		targetUrl += '/main';
	}
	
	if(target == 'news') {
		targetUrl += '/issue';
	}
	
	if(target == 'dcot') {
		targetUrl += '/dept';
	}
	
	$('#tabForm').attr("action", targetUrl);
	$('#tabForm').submit();
}

// 통합검색 행정서비스 토글버튼 컬렉션 선택
function doColSvc(selCol){
    var searchForm = document.searchForm;
    var frm = $('#searchForm');
    
    if(selCol == 'main') {
        $('#orgCd').show();
        $('#location').css('display','none');
        $('#mainSvc').addClass("on");
        $('#allSvc').removeClass("on");
        $('#localSvc').removeClass("on");
        
        frm.attr('action', '/search/svc/'+selCol);
    } else if(selCol == 'local') {
        $('#orgCd').css('display','none');
        $('#location').show();
        
        frm.attr('action', '/search/svc/'+selCol);
    } else {
        // form 초기화
        searchForm.jrsdFsOrgCd.value = '';
        searchForm.sido.value = '';
        // searchForm.signgu.value = '0000000000';
        // searchForm.srchArea.value = '';
        // searchForm.srchSidoArea.value = '';
        // searchForm.jrsdOrgNm.value = '';
        // searchForm.jrsdDptNm.value = '';
        
        $('#orgCd').css('display','none');
        $('#location').css('display','none');
        
        $("#detailSearchForm input[name=sido]").val('');
        $("#detailSearchForm select[name=sido]").change();
        $("#detailSearchForm select[name=signgu]").change();
        
        frm.attr('action', '/search/svc');
    }
}

// 국정소식 셀렉트박스
function doColNews(selCol){
	var searchForm = document.detailSearchForm;
	var frm = $('#detailSearchForm');
	
	if(selCol == 'issue') {
		$('#news-lnk').show();
		$('#news-lnk-gov').css('display','none');
		$('#news-lnk-local').css('display','none');
		$('#news-lnk-contest').css('display','none');
		
		frm.attr('action', '/search/news/'+selCol);
	} else if(selCol == 'local') {
		$('#news-lnk-local').show();
		$('#news-lnk-contest').css('display','none');
		$('#news-lnk').css('display','none');
		$('#news-lnk-gov').css('display','none');
		
		frm.attr('action', '/search/news/'+selCol);
	} else if(selCol == 'event') {
		$('#news-lnk-contest').show();
		$('#news-lnk').css('display','none');
		$('#news-lnk-gov').css('display','none');
		$('#news-lnk-local').css('display','none');
		
		frm.attr('action', '/search/news/'+selCol);
	} else if(selCol == 'pub') {
		$('#news-lnk-gov').show();
		$('#news-lnk-local').css('display','none');
		$('#news-lnk').css('display','none');
		$('#news-lnk-contest').css('display','none');
		
		frm.attr('action', '/search/news/'+selCol);
	} else {
		// form 초기화
		// searchForm.jrsdFsOrgCd.value = '';
		// searchForm.astCd.value = '';
		// searchForm.sido.value = '';
		// searchForm.signgu.value = '0000000000';
		// searchForm.srchArea.value = '';
		// searchForm.srchSidoArea.value = '';
		// searchForm.jrsdOrgNm.value = '';
		// searchForm.jrsdDptNm.value = '';
		// searchForm.govOrgCd.value = '';
		// searchForm.contestAstCd.value = '';
		// searchForm.sort.value = "";
		 $('#news-lnk').css('display','none');
		 $('#news-lnk-gov').css('display','none');
		 $('#news-lnk-local').css('display','none');
		 $('#news-lnk-contest').css('display','none');
		
		// $("#detailSearchForm select[name=sido]").change();
        // $("#detailSearchForm select[name=signgu]").change();
        
		frm.attr('action', '/search/news');
	}
	
	// 셀렉트박스 선택
	$("#newsSelect").val(selCol).attr("selected", "selected");
}

// 부서별연락처 기관업무 토글버튼 컬렉션 선택
function doColDcot(selCol){
	var frm = $('#searchForm');
	
	if('work' == selCol) {
		frm.attr('action', '/search/dcot/'+selCol);
	} else if('dept' == selCol) {
		frm.attr('action', '/search/dcot/'+selCol);
	} else {
		frm.attr('action', '/search/dcot');
	}
}

// 조건별 검색 토글버튼 행정서비스 컬렉션 선택
function doColSvcByClmser(selCol){
    var searchForm = document.searchForm;
    var frm = $('#detailSearchForm');
    
    if(selCol == 'main') {
        $('#orgCd').show();
        $('#location').css('display','none');
        
        frm.attr('action', '/portal/service/clmserSearch/'+selCol);
    } else if(selCol == 'local') {
        $('#orgCd').css('display','none');
        $('#location').show();

        frm.attr('action', '/portal/service/clmserSearch/'+selCol);
    } else {
        $('#orgCd').css('display','none');
        $('#location').css('display','none');
    }
}

//탭 검색 
//검색결과에서 중앙, 지방 서비스 TITLE 선택시
function goChangeCollByTab(selCol) {
    var frm = $('#detailSearchForm');

	$('#orgCd :input').val('');
	$('#location :input').val('');

    frm.attr('action', '/search/svc/'+selCol);
    
    frm.submit();
}

// 조건별 검색 
// 검색결과에서 중앙, 지방 서비스 TITLE 선택시
function goChangeCollByClmser(selCol) {
    var frm = $('#changeCollForm');

	frm.find('[name=srchArea]').val('');
	frm.find('[name=srchSidoArea]').val('');
	frm.find('[name=jrsdFsOrgCd]').val('');
	frm.find('[name=jrsdOrgNm]').val('');
	frm.find('[name=jrsdDptNm]').val('');
    
    frm.attr('action', '/portal/service/clmserSearch/'+selCol);
    
    frm.submit();
}

//분야별 검색 
//검색결과에서 중앙, 지방 서비스 TITLE 선택시 **** 사용안함
function doColByCategoryOld(selCol){
	var searchForm = document.searchForm;
	var sort = searchForm.sort.value;
	
    var frm = $("#changeCollForm");
    
    if(selCol == ''){
    	// form 초기화
    	searchForm.jrsdFsOrgCd.value = '';
        searchForm.sido.value = '';
        searchForm.deptIncCD.value = '';
        searchForm.procIncGrpCD.value = '';
        
        $('#location').css('display','none');
        $('#orgCd').css('display','none');
        $('#mwSetting').css('display','none');
        $('#svc').css('display','none');
        
        $('#allSvc').addClass("on");
        $('#localSvc').removeClass("on");
        $('#mainSvc').removeClass("on");
        $('#mwSvc').removeClass("on");
        
        $("#searchVo select[name=sido]").change();
        $("#searchVo select[name=signgu]").change();
        
        frm.attr('action', '/portal/service/categorySearch/');
    } else if(selCol == 'main') {
        $('#orgCd').show();
        $('#location').css('display','none');
        $('#mwSetting').css('display','none');
        
        $('#mainSvc').addClass("on");
        $('#allSvc').removeClass("on");
        $('#localSvc').removeClass("on");
        $('#mwSvc').removeClass("on");
        
        frm.attr('action', '/portal/service/categorySearch/'+selCol+'/');
    } else if (selCol == 'local') {
        $('#location').show();
        $('#orgCd').css('display','none');
        $('#mwSetting').css('display','none');
        
        $('#localSvc').addClass("on");
        $('#allSvc').removeClass("on");
        $('#mainSvc').removeClass("on");
        $('#mwSvc').removeClass("on");
        
        frm.attr('action', '/portal/service/categorySearch/'+selCol+'/');
    } else if (selCol == 'mw') {
        $('#location').css('display','none');
        $('#orgCd').css('display','none');
        $('#mwSetting').show();
        
        $('#mwSvc').addClass("on");
        $('#allSvc').removeClass("on");
        $('#mainSvc').removeClass("on");
        $('#localSvc').removeClass("on");
        
        // 민원의 경우 조회수, 최신순이 없으므로 RANK로 변환하여 검색한다.
        if('VW_CNT' == sort || 'DATE' == sort) {
        	$('#searchVo input[name=sort]').val('RANK');
        }
        
        frm.attr('action', '/portal/service/categorySearch/'+selCol+'/');
    } else if (selCol == 'svc') {
    	$('#svc').show();
    	
    	$('#pubSvc').addClass("on");
        $('#allSvc').removeClass("on");
        $('#mwSvc').removeClass("on");
        
        $('#mwSetting').css('display','none');
    }
}


var tempQuery = "";

// 결과 내 재검색
function checkReSearch() {
	var searchForm = document.searchForm;
	var query = searchForm.srhQuery;
	var reQueryFlag = searchForm.reQueryFlag;
	
	if ($("#research").prop("checked")) {
		reQueryFlag.value = "1";
		tempQuery = query.value;
		query.value = "";
		query.focus();
	} else {
		reQueryFlag.value = "0";
		query.value = tempQuery;
		tempQuery = "";
	}
}

// 태그검색
function tagSearch(tag){
	$('#tagForm input[name=srhQuery]').val(tag.trim());
	$('#tagForm').attr('action','/search/tagSearch');
	$('#tagForm').submit();
}

// 결과 더보기
function moreView(target, selCol, query) {
	$('#moreViewForm input[name=srhQuery]').val(query);
	
	var targetUrl = "/search";
	   
    if("" != target || undefined != target){
    	targetUrl = "/search/"+target;
    }
    
    if("" != selCol || undefined != selCol){
    	targetUrl += "/"+selCol;
    }
    
    $('#moreViewForm').attr("action", targetUrl);
    $('#moreViewForm').submit();
}