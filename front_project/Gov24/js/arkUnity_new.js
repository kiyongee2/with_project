/*
 * 자동완성 js
 */
var akc_url2 = "/search/ark";						// 자동완성  페이지 경로 
var AKCKwdID2 = "srhQuery";							// 키워드 input id
var applyArk_url = "/search/applyArk";				// 메뉴바로가기, 행정전문용어 검색 url

var akc_kwd2 = null; 
var akc_lst2 = null;
var akc_cur_kwd2 = null;
var akc_prv_kwd2 = null; 
 

var akc_idx2	= -1;
var akc_lst_len2 = 0;
var akc_evt_key2 = 0;

//타이머 변수 설정 (자동완성)
var searchTimer1;

//타이머 변수 설정(서비스 바로가기)
var searchTimer2;

//키이벤트 타이머 시간
var sendTerm1 = 300;

//키이벤트 타이머 시간
var sendTerm2 = 1000;

/**
* 자동완성초기화
* 
* @ param 
* 
* @ return   			
**/

function callArk(temp) {
	
 

	var arkEvent = function(event) {
		
 
		if($(event.target).is($('#headerSearchForm [id="' + AKCKwdID2+'"]'))){
			akc_kwd2 = $('#headerSearchForm [id="' + AKCKwdID2+'"]'); 
			akc_lst2 = $('#ark_main');
			apk_lst = $('#ark_apply'); 			
		}else if($(event.target).is($('#headerSearchForm [id="' + AKCKwdID2+'ForHeader"]'))){
			akc_kwd2 = $('#headerSearchForm [id="' + AKCKwdID2+'ForHeader"]'); 
			akc_lst2 = $('#ark_main');
			apk_lst = $('#ark_apply'); 
		}else if($(event.target).is($('#headerSearchForm1 [id="' + AKCKwdID2+'ForHeader1"]'))){
			akc_kwd2 = $('#headerSearchForm1 [id="' + AKCKwdID2+'ForHeader1"]');
			akc_lst2 = $('#ark_main2');
			apk_lst = $('#ark_apply2'); 
		}else if($(event.target).is($('#headerSearchForm2 [id="' + AKCKwdID2+'2"]'))){
			akc_kwd2 = $('#headerSearchForm2 [id="' + AKCKwdID2+'2"]');
			akc_lst2 = $('#ark_main3');
			apk_lst = $('#ark_apply3');
		}
	 
		akc_evt_key2 = event.keyCode;		
			
		if(akc_evt_key2 == 38){								// up
			akc_idx2--;
			if(akc_idx2 < 0) akc_idx2 = 0;
			pntAkcLst2();
			// 방향키에 따른 검색어 
			
		} else if(akc_evt_key2 == 40) {						// down
			akc_idx2++;
			if(akc_idx2 > akc_lst_len2-1) akc_idx2 = akc_lst_len2-1;
			pntAkcLst2();
			// 방향키에 따른 검색어
			var govDicKwd = $("#arkWord"+akc_idx2).text();
 
		} else if(!(akc_evt_key2 == 38) && !(akc_evt_key2 == 40)) {
			
			
			akc_cur_kwd2 = akc_kwd2.val().toLowerCase();
			
			if(akc_cur_kwd2 ==""||akc_cur_kwd2=="null"){
				apk_lst.html("");
			}
 
			arkTimerControl_main(); 
			
			akc_kwd2="";
			
			
		} else {
			akc_idx2	= -1;
		}
	};
 
	$('#headerSearchForm2 [id="srhQuery2"]').on("change, input, keyup", arkEvent);	
	$('#headerSearchForm1 [id="srhQueryForHeader1"]').on("change, input, keyup", arkEvent);	
	$('#headerSearchForm [id="srhQueryForHeader"]').on("change, input, keyup", arkEvent);	
	$('#headerSearchForm [id="srhQuery"]').on("change, input, keyup", arkEvent);	
}



function arkTimerControl_main() {
	// 실제 실행 함수
	var keywordSearch1 = function(){
		callAkcKwd_main();
 
		
	};

	// 실제 실행 함수
	var keywordSearch2 = function(){ 
		if(akc_cur_kwd2!=""&&akc_cur_kwd2 !="null"){
			callApply_main();
		}
		
	};
	
	//기존 타이머 삭제
	clearTimeout(searchTimer2);
	//타이머 실행 또는 재실행
	searchTimer1 = setTimeout(keywordSearch1, sendTerm1);
	searchTimer2 = setTimeout(keywordSearch2, sendTerm2);
}

 

 

/**
* 자동완성 페이지를 호출한다. 
* @ param 
* @ return   			
**/
function callAkcKwd_main(){
	var akc_html = "";
	var temp_hilight =  "";
	var lower_temp_str = "";
	var i =0;
	
	var hkeyword = "";
	
	// get으로 보내면 파폭에서 한글 전송이 안됨.
	$.ajax({
		type: "POST",
		url: akc_url2,
		dataType: "json",
		data: "query="+akc_cur_kwd2,
		success: function(data) {
			var j=0;
			$.each(data.result, function(){	
			
				if(this.totalcount>0){
					$.each(this.items, function(){
						
						if(i<10){
							
						
						temp_hilight = this.keyword;
						temp_hilight = temp_hilight.replace("<strong>","");
						temp_hilight = temp_hilight.replace("</strong>","");
						
						//하이라이팅에 사용
						hkeyword = this.hkeyword;
						
						hkeyword = hkeyword.replace("<font style='font-size:13px'>","");
						
 
						//if(hkeyword.indexOf("<font style='color:#CC6633'>") >-1){ //운영 개발 및 테스트
						if(hkeyword.indexOf("<font style='color:#CC33CC'>") >-1){ //운영
							
							hkeyword = hkeyword.substr(0,hkeyword.lastIndexOf("</font>"));
							
							//hkeyword = hkeyword.replace("<font style='color:#CC6633'>","<mark class=\"marker-text\">");  //운영 개발 및 테스트
							hkeyword = hkeyword.replace("<font style='color:#CC33CC'>","<mark class=\"marker-text\">"); //운영
							hkeyword = hkeyword.replace("</font>","</mark>");
							 
						}else{
							hkeyword = temp_hilight;
						}
 				
						lower_temp_str = temp_hilight.toLowerCase(); 
						
						if(lower_temp_str.indexOf(akc_cur_kwd2.toLowerCase()) > -1){				
							if( j == 0){
								temp_hilight = "<span class='checked-text'>" + temp_hilight.substring(0, akc_cur_kwd2.length) + "</span>" + 
								temp_hilight.substring(akc_cur_kwd2.length, temp_hilight.length);					
							}else{					
								temp_hilight = temp_hilight.substring(0, temp_hilight.length-akc_cur_kwd2.length) + 
								"<span class='checked-text'>" + temp_hilight.substring(temp_hilight.length-akc_cur_kwd2.length, temp_hilight.length) + "</span>";
							}
						}
						
						akc_html += "<li id=\"akc" + i + "\">";
						akc_html += "<a href=\"javascript:;\" id=\"arkWord" + i + "\" onclick=\"javascript:$('#headerSearchForm input[name=srhQuery]').val($(this).text()); moreViewSearch('${mobileYn}');\">" + hkeyword; 
						akc_html += "</a>";
						akc_html += "</li>";
						i++;}
						
						else{
							
							return false;
						}
					});
					j++;
				}
			});
			 
			
			akc_lst_len2 = i;
			akc_idx2 = -1;
 
			akc_lst2.html(akc_html);
		}

	});
	akc_prv_kwd2 = akc_cur_kwd2;
}



// 서비스 호출 
function callApply_main(){
 
	
	var apk_html = "";
	var TTL = ""; 
	var i =0;
	
	// get으로 보내면 파폭에서 한글 전송이 안됨.
	$.ajax({
		type: "POST",
		url: applyArk_url,
		dataType: "json",
		data: "applyQuery="+akc_cur_kwd2,
		success: function(data) {
			
			var j=0;
 
			
			 
			$.each(data.result.items, function(){	
			 
				var DOCID = "";
				var cappBizNM ="";
				var url ="";
				var APP_SITE_URL = "";
				
				var dtlUrl = "";
				var drrUrl = "";
				
 
				apk_html +="<li>" +
								"<dl>";
 
				if(this.DVS_ID == 'PET'){
					
					DOCID = this.NEW_CAPP_BIZ_CD;
					
					if(!DOCID){
						
						DOCID = this.DOCUMENT_ID;
						
						if(DOCID&&DOCID.length==13){
							
							DOCID = DOCID.substring(0,11);
						}
					}
					
					cappBizNM = this.PROC_TP_NM;
					
					if(!cappBizNM){
						cappBizNM = this.TTL;     //최종적으로 제목이 되는 값
					}   
					
					cappBizNM = cappBizNM.replace("<!HS>","<mark class=\"marker-text\">");  //하이라이팅 처리
					cappBizNM = cappBizNM.replace("<!HE>","</mark>");					
					
					 
					if(DOCID.charAt(0)=='P'){
						apk_html += "<a href=\"/mw/AA040PkgInfoView.do?HighCtgCD="+this.CTG_CD+"&amp;CappBizCD="+DOCID+"&amp;pkg_in_gubun=01&amp;tp_seq="+this.PROC_TP_SEQ+"\">";
						apk_html += cappBizNM; 
					}else if (DOCID == '97400000001' || DOCID == '97400000002' || DOCID == '97400000003'){
						APP_SITE_URL = this.APP_SITE_URL.replace('&','&amp');
						apk_html += "<a href=\"javascript:winOpenCappInfoPost2('"+DOCID+"','"+APP_SITE_URL+"');\" title=\"title\">";
						apk_html += cappBizNM; 
					}else if (DOCID == 'SG4CADM2018' || DOCID == 'SG4CADM2019' || DOCID == 'SG4CADM2020'){ 
						apk_html += "<a href=\"javascript:sgMinwonUrl('"+DOCID+"');\">";
						apk_html += cappBizNM; 
					}else if (DOCID == 'SG4CADM2034'){ 
						apk_html += "<a href=\"/portal/service/serviceInfo/PTR000050333\">";
						apk_html += cappBizNM; 
					}else if (DOCID == 'SG4CADM2035'){ 
						apk_html += "<a href=\"/portal/service/serviceInfo/PTR000050332\">";
						apk_html += cappBizNM; 
					}else if (DOCID == 'SG4CADM2017'){ 
						apk_html += "<a href=\"javascript:goUrlNew('SG4CADM2017', 'A06001', '01');\">";
						apk_html += cappBizNM; 
					}else{
						apk_html += "<a href=\"/mw/AA020InfoCappView.do?HighCtgCD="+this.CTG_CD+"&amp;CappBizCD="+DOCID+"&amp;tp_seq="+this.PROC_TP_SEQ+"\">";
						apk_html += cappBizNM; 						
					}
					
				}else if(this.DVS_ID == 'DIR'){
					

 				//공공서비스/민원서비스 종류에 따라 상세화면 링크 주소 설정
					if(this.CD == "DA1201" && this.CD_NM){
					
						dtlUrl = "/portal/service/serviceInfo/"+this.CD_NM;
					
					}else if(this.CD == 'DA1202' && this.NEW_CAPP_BIZ_CD){
						dtlUrl = "/mw/AA020InfoCappView.do?HighCtgCD="+this.CTG_CD+"&CappBizCD="+this.NEW_CAPP_BIZ_CD+"&tp_seq="+this.PROC_INC_GRP_NM;
					}else{
						dtlUrl = "#none";
					}
 				
					cappBizNM = this.TTL;
					cappBizNM = cappBizNM.replace("<!HS>","<mark class=\"marker-text\">");  //하이라이팅 처리
					cappBizNM = cappBizNM.replace("<!HE>","</mark>");	
					
					apk_html += "<a href=\""+dtlUrl+"\">";
					apk_html += cappBizNM; 				
					
					
				}
				
 
				
				apk_html += "</a>";	
				apk_html +=		"</dl>";
				apk_html +=	"</li>";
									
			});
			// 용어검색
 
			akc_lst_len2 = i;
			akc_idx2 = -1;
 
			apk_lst.html(apk_html);
			
			apk_html="";
		}

	});
			
	akc_prv_kwd2 = akc_cur_kwd2;
}

 
/**
* 키보드 이벤트에 따른 자동완성 선택 css 처리
* 
* @ param
*  
* @ return   			
**/
function pntAkcLst2(){
	var slt_kwd = $('#akc'+akc_idx2 + ' > a' ).removeClass('akclist').addClass('selected').text();
	
	if( slt_kwd != "" ){
		$('.selected').removeClass('selected').addClass('akclist');
		akc_kwd2.val($('#akc'+akc_idx2 + ' > a' ).removeClass('akclist').addClass('selected').text());
	}
}


