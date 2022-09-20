/**
 * 국민비서 메뉴 연결 
 */

	//국민비서 로그인
	function fn_ipsLogin_ips(){
		
		mcodeCall_v1('11161'); //집계
		
		$.ajax({
			url : '/portal/ips/getUserInfo.json',
			type : "post",
			dataType : "json",
			async : false,
			success: function(data){ 
				var rsCode = data.resultCd;
				if(rsCode == 'success'){
					var param = {'jsonParam' : data.loginInfo};
					//OpenWindowWithPost('https://www.ips.go.kr/pot/main.do', "width=1200,height=900,left=50,top=50,resizable=yes,scrollbars=yes","NewFile",param);
					OpenWindowWithPost('https://www.ips.go.kr/pot/mainGo.do', "", "IPS_Page", param);
					return;
				}
				else if(rsCode == 'noHasCi'){
					alert('국민비서 서비스는 휴대폰정보가 필요합니다.\nMygov > 회원정보수정 > 휴대폰 본인확인을 진행해 주시기 바랍니다.');
					location.href = '/nlogin/usr/mgrView';
					return;
				}
				else if(rsCode == 'noLogin'){
					if(mobileYn == 'Y'){
						location.href = 'https://www.ips.go.kr/pot/mainGo.do';
					} else {
						window.open('https://www.ips.go.kr/pot/mainGo.do');
					}
					
					return;
				}
				else if(rsCode == 'err'){
					alert("국민비서 접속을 위한 데이터를 가져오는 중 오류가 발생했습니다.\n시스템 관리자에게 문의 바랍니다.");
					return;
				}
			},
			error : function(error){
				alert("국민비서 접속 중 오류가 발생했습니다.\n시스템 관리자에게 문의 바랍니다.");
			}
	    });
			
	}

	//팝업창에서 국민비서 로그인 화면 호출
	function OpenWindowWithPost(url, windowoption, name, params){
		var form = document.createElement("form");
		form.setAttribute("method","post");
		form.setAttribute("action",url);
		if(mobileYn == 'Y'){
			form.setAttribute("target","_self"); //모바일앱에서는 window.open 미지원
		} else {
			form.setAttribute("target",name);
		}
		 for(var i in params){
			if(params.hasOwnProperty(i)){
				var input = document.createElement('input');
				input.type ='hidden';
				input.name = i ;
				input.value = params[i];
				form.appendChild(input);
			}
		}
		
		document.body.appendChild(form);
		
		if(mobileYn == 'Y'){
			//현재창에서 진행
			form.submit(); //모바일앱에서는 window.open 미지원
		} else {
			window.open("/ips/html/ipsPost.html", name, windowoption); 
			setTimeout(function () {
				form.submit();
			}, 200);
			
			setTimeout(function () {
				document.body.removeChild(form);
			}, 400);
		}
	} 
