//xss 검색어 방지
function specCharChkForSearch(strVal){
	strVal = strVal.replace(/[\<\>\'\\\"\/\%\(\)\{\}\;\=]/g,"");
	return strVal;
}

function moreViewSearch(isMobile) {
	
	var searchForm = $("#headerSearchForm");
	var query = $("#headerSearchForm input[name=srhQuery]");
	var target = ""; //$("#sltTarget option:selected").val(); //$("#headerSearchForm input[id=sltTarget]").val(); 
	var selCol = "";
	var policyType = "";
	var link = window.location.protocol+'//'+window.location.hostname;
	
	//xss 검색어 방지
	query.val(specCharChkForSearch(query.val()));
	
	if( isMobile == "N")  {
		target = $("#sltTarget").val();	
				
		if(target == "pi" ) policyType = "G00301";
		if(target == "news" ) selCol = "local";
		$("#policyType").val(policyType); 
	}
		
	if(query.val() == $("#headerSearchForm input[name=srhQuery]").attr("placeholder")) {
		alert("검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.val()) == '') {
		alert('검색어를 입력해주시기 바랍니다.');
		query.focus();
		return false;
	}
	
	if($.trim(query.val()).length < 2) {
		alert("2자 이상의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.val()).length > 50) {
		alert("50자 이하의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	//내가 찾은 검색어 추가
	setMyKeyword(query.val());
	
	var targetUrl = "/search";
	   
    if("" != target && undefined != target){
    	targetUrl = "/search/"+target;
    }
    
    if("" != selCol && undefined != selCol){
    	targetUrl += "/"+selCol;
    }
    targetUrl += "?srhQuery="+encodeURI( query.val() , 'UTF-8'); //query.val();
	
    if( policyType != "" ) {
    	targetUrl += "&policyType="+policyType;
    }
    
    location.href = link+targetUrl;
	
	return true;
}


function moreViewSearch1(isMobile) {
	
	var searchForm = $("#headerSearchForm1");
	var query = $("#headerSearchForm1 input[name=srhQuery]"); //searchForm.srhQuery;
	var target = ""; //$("#sltTarget option:selected").val(); //$("#headerSearchForm input[id=sltTarget]").val(); 
	var selCol = "";
	var policyType = "";
	var link = window.location.protocol+'//'+window.location.hostname;	
	query.val(specCharChkForSearch(query.val()));
	if(query.val() == $("#headerSearchForm1 input[name=srhQuery]").attr("placeholder")) {
		alert("검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.val()) == '') {
		alert('검색어를 입력해주시기 바랍니다.');
		query.focus();
		return false;
	}
	
	if($.trim(query.val()).length < 2) {
		alert("2자 이상의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.val()).length > 50) {
		alert("50자 이하의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	//내가 찾은 검색어 추가
	setMyKeyword(query.val());
	
	var targetUrl = "/search";
	   
    if("" != target && undefined != target){
    	targetUrl = "/search/"+target;
    }
    
    if("" != selCol && undefined != selCol){
    	targetUrl += "/"+selCol;
    }
    targetUrl += "?srhQuery="+encodeURI( query.val() , 'UTF-8'); //query.val();
	
    if( policyType != "" ) {
    	targetUrl += "&policyType="+policyType;
    }
    
    location.href = link+targetUrl;
	
	return true;
}

// 포탈 메인 웹접근성 조치 (모바일메인 검색)
function moreViewSearch2(isMobile) {
	
	var searchForm = $("#headerSearchForm2");
	var query = $("#headerSearchForm2 input[name=srhQuery]"); //searchForm.srhQuery;
	var target = ""; //$("#sltTarget option:selected").val(); //$("#headerSearchForm input[id=sltTarget]").val(); 
	var selCol = "";
	var policyType = "";
	var link = window.location.protocol+'//'+window.location.hostname;	
	query.val(specCharChkForSearch(query.val()));
	if(query.val() == $("#headerSearchForm2 input[name=srhQuery]").attr("placeholder")) {
		alert("검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.val()) == '') {
		alert('검색어를 입력해주시기 바랍니다.');
		query.focus();
		return false;
	}
	
	if($.trim(query.val()).length < 2) {
		alert("2자 이상의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	if($.trim(query.val()).length > 50) {
		alert("50자 이하의 검색어를 입력해주시기 바랍니다.");
		query.focus();
		return false;
	}
	
	//내가 찾은 검색어 추가
	setMyKeyword(query.val());
	
	var targetUrl = "/search";
	   
    if("" != target && undefined != target){
    	targetUrl = "/search/"+target;
    }
    
    if("" != selCol && undefined != selCol){
    	targetUrl += "/"+selCol;
    }
    targetUrl += "?srhQuery="+encodeURI( query.val() , 'UTF-8'); //query.val();
	
    if( policyType != "" ) {
    	targetUrl += "&policyType="+policyType;
    }
    
    location.href = link+targetUrl;
	
	return true;
}

function doKeywordHeader() {
	//$("#headerSearchForm").submit();
	moreViewSearch();
}