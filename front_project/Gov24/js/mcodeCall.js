/**
 * 외부링크 및 특정 상황에서 mcode 적재하기 위함
 * 신규 Mcode 선언 시 기존에 사용중인 Mcode인지 확인 요청 필요 
 */

/*
 * -a 태그 내에 사용시  href와 target 선언  후  onclick에 아래 함수 작성
 * -호출만 할 시 해당 로직 내에 함수 호출 선언
 */
function mcodeCall_v1(mcode){
	if(mcode != '' && mcode != undefined){
		var mcodeUrl = '/portal/externalLink/cmm?Mcode='+mcode;
		$.ajax({
			type:"GET",
			url:mcodeUrl,
			success:function(data){
				console.log('mcode link call success.');
			} 
		});    			
	} 
}

/*
 * mw, njm 은 j$여서 이걸 써야함
 */
function mcodeCall_v1_j(mcode){
	if(mcode != '' && mcode != undefined){
		var mcodeUrl = '/portal/externalLink/cmm?Mcode='+mcode;
		j$.ajax({
			type:"GET",
			url:mcodeUrl,
			success:function(data){
				console.log('mcode link call success.');
			} 
		});    			
	} 
}

/*
 * -a태그 외 사용 시
 * mcode
 * extUrl : 이동 url
 * targetCd : 이동 창 선택 코드(self, blank)
 * 
 */
function mcodeCall_v2(mcode, extUrl, targetCd){
	
	if(mcode != '' && mcode != undefined){
		var mcodeUrl = '/portal/externalLink/cmm?Mcode='+mcode;
		
		$.ajax({
			type:"GET",
			url:mcodeUrl,
			success:function(data){
				console.log('mcode link call success. v2');
				if(mobileYn != 'Y'){
					if(extUrl != '' && extUrl != undefined){
						if(targetCd != '' && targetCd != undefined){
							if(targetCd =='self'){
								location.href = extUrl;
								return false;
							}
							if(targetCd =='blank'){
								window.open(extUrl);
								return false;
							}
						}
					}				
				} else {
					location.href = extUrl;
					return false;
				}
			} 
		});    			
	} 
	
}