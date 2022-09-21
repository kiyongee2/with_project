<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>넷플릭스 대한민국 - 인터넷으로 시리즈와 영화를 시청하세요</title>
<link rel="icon" href="../resources/image/netflix_ico.png">
<script src="../resources/js/jquery-3.6.0.js"></script>
<link rel="stylesheet" href="../resources/css/common.css">
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<style type="text/css">
</style>
<script type="text/javascript">
</script>
<security:authorize access="isAuthenticated()">
	<%
		response.sendRedirect("/board/main");
	%>
</security:authorize>
<script type="text/javascript">
	function checkID(){
		let id = document.getElementById("id");
		let regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		
		if(id.value == "" || !regExp.test(id.value)){
			alert("이메일을 입력해주세요.");
			return false;
		}
		
		$.ajax({
			type : "get",
			url: "/member/checkID",
			dataType: "json",
			data: {"id":$("#id").val()},
			success : function(data){
				if(data == 1){
					$("#check").text("이미 가입된 ID입니다.");
					$("#check").css({"color" : "red", "padding-top": "5px"});
				}
				else if(data == 0) {
					document.joinForm.submit();
				}
			},
			error: function(data){
				alert("에러 발생!!");
			}
		});
	}
</script>
</head>
<body>
<jsp:include page="./header.jsp" />
	<div id="container">
		<section id="sec-top">
			<div class="gradi"></div>
			<div class="gradi"></div>
			<div id="search">
				<p>영화와 시리즈를 무제한으로.</p>
				<p>다양한 디바이스에서 시청하세요. 언제든지 해지하실 수 있습니다.</p>
				<p>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</p>
				<form action="/member/join" method="get"  name="joinForm">
					<input type="email" name="id" id="id" class="mainEmail" placeholder="이메일을 입력해주세요">
					<a><button class="btn_start" type="button" onclick="checkID()">시작하기 ></button></a>
					<p id="check"></p>
					<input type="hidden" name="${ _csrf.parameterName }" value="${ _csrf.token }">
				</form>
			</div>
		</section>
	

          <section id="part">
               <div class="secondCard card">
                    <div class="cardText">
                        <h1>TV로 즐기세요.</h1>
                        <h2>스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.</h2>
                    </div>
                    <img src="../resources/image/tv.png">
                </div>
                <div class="thirdCard card">
                    <img src="../resources/image/mobileimg.jpg">
                    <div class="cardText">
                        <h1>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.</h1>
                        <h2>간편하게 저장하고 빈틈없이 즐겨보세요.</h2>
                    </div>
                </div>
                <div class="fourthCard card">
                    <div class="cardText">
                        <h1>다양한 디바이스에서 시청하세요.</h1>
                        <h2>각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요. 추가 요금이 전혀 없습니다.</h2>
                    </div>
                    <img src="../resources/image/device-pile.png">
                </div>
                <div class="fifthCard card">
                    <img src="../resources/image/kidsValueProp.png">
                    <div class="cardText">
                        <h1>어린이 전용 프로필을 만들어 보세요.</h1>
                        <h2>자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.</h2>
                    </div>
                </div>
          </section>
          
          <section class="faq">
               <div class="faq-inner">
                    <h1>자주 묻는 질문</h1>
                    <div class="accordion">
                         <div class="title">넷플릭스란 무엇인가요?</div>
                         <div class="content">넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션,
                              다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의
                              디바이스에서 시청할 수 있는 스트리밍 서비스 입니다.<br><br>
                              저렴한 월 요금으로 일체의 광고 없이 원하는 시간에 원하는 만큼 즐길 수 있습니다.
                              무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가 제공됩니다.
                         </div>
                         <div class="title">넷플릭스 요금은 얼마인가요?</div>
                         <div class="content">스마트폰, 태블릿, 스마트 TV, 노트북, 
                              스트리밍 디바이스 등 다양한 디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 
                              멤버십 요금은 월 9,500원부터 17,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.
                         </div>
                         <div class="title">어디에서 시청할 수 있나요?</div>
                         <div class="content">언제 어디서나 시청할 수 있습니다. 넷플릭스 계정으로 로그인하면 PC에서 netflix.com을 통해
                              바로 시청할 수 있으며, 인터넷이 연결되어 있고 넷플릭스 앱을 지원하는
                              디바이스(스마트 TV, 스마트폰, 태블릿, 스트리밍 미디어 플레이어, 게임 콘솔 등)에서도 
                              언제든지 시청할 수 있습니다. <br>
                              iOS, Android, Windows 10용 앱에서는 좋아하는 시리즈를 저장할 수도 있습니다. 
                              저장 기능을 이용해 이동 중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요.
                              넷플릭스는 어디서든 함께니까요.
                              </div>
                         <div class="title">멤버십을 해지하려면 어떻게 하나요?</div>
                         <div class="content">넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도 없으니까요. 
                              멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다. 
                              해지 수수료도 없으니 원할 때 언제든 계정을 시작하거나 종료하세요.</div>
                         <div class="title">넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?</div>
                         <div class="content">넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을 수상한 
                              넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다. 
                              마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하세요.</div>
                         <div class="title">아이들이 넷플릭스를 봐도 좋을까요?</div>
                         <div class="content">멤버십에 넷플릭스 키즈 환경이 포함되어 있어 
                              자녀가 자기만의 공간에서 가족용 시리즈와 영화를 즐기는 동안 부모가 이를 관리할 수 있습니다.
                              <br>
                              키즈 프로필과 더불어 PIN 번호를 이용한 자녀 보호 기능도 있어, 
                              자녀가 시청할 수 있는 콘텐츠의 관람등급을 제한하고 자녀의 시청을 원치 않는 
                              특정 작품을 차단할 수도 있습니다.</div>
                    </div>         
                 </div>
          </section>
	</div>
	
	<script>
	$(document).ready(function(){
	     $('.accordion .title').click(function(){
	          $(this).siblings('.accordion .content').stop().slideUp();
	          $(this).next().stop().slideToggle('fast');
	          $(this).siblings('.accordion .title').removeClass('active');
	          $(this).toggleClass('active')
	     });
	})
	</script>
</body>
</html>