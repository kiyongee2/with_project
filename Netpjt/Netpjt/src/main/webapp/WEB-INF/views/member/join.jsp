<%@page import="com.prjnet.domain.BoardVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="../resources/js/jquery-3.6.0.js"></script>
<link rel="icon" href="../resources/image/netflix_ico.png">
<script type="text/javascript">
	$(document).ready(function(){            
	    var now = new Date();
	    var year = now.getFullYear();
	    var mon = (now.getMonth() + 1) > 9 ? ''+(now.getMonth() + 1) : '0'+(now.getMonth() + 1); 
	    var day = (now.getDate()) > 9 ? ''+(now.getDate()) : '0'+(now.getDate());           
	    //년도 selectbox만들기               
	    for(var i = 1900 ; i <= year ; i++) {
	        $('#year').append('<option value="' + i + '">' + i + '년</option>');    
	    }
	
	    // 월별 selectbox 만들기            
	    for(var i=1; i <= 12; i++) {
	        var mm = i > 9 ? i : "0"+i ;            
	        $('#month').append('<option value="' + mm + '">' + mm + '월</option>');    
	    }
	    
	    // 일별 selectbox 만들기
	    for(var i=1; i <= 31; i++) {
	        var dd = i > 9 ? i : "0"+i ;            
	        $('#day').append('<option value="' + dd + '">' + dd+ '일</option>');    
	    }
	    $("#year  > option[value="+year+"]").attr("selected", "true");        
	    $("#month  > option[value="+mon+"]").attr("selected", "true");    
	    $("#day  > option[value="+day+"]").attr("selected", "true");         
	})
	
	function checkForm(){
		/* 나이 계산하기 */
		var y = $("#year").val();
		var m = $("#month").val();
		var d = $("#day").val();
		const today = new Date();
		const birthDate = new Date(y, m, d);

		let age = today.getFullYear() - birthDate.getFullYear() + 1;
		$("#age").attr("value",age);
		
		
		let form = document.regForm;
		let pw = form.pw.value;
		
		let regExpPw =/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,25}$/;
		
		if(!regExpPw.test(pw)){
			alert("영문, 숫자, 특수기호 조합으로 8-20자리 입력해주세요.");
			return false;
		}
		
	}


</script>
<style type="text/css">
body{background: #fff;}
	
	.join-input-section{
		text-align: center;
		margin: auto;
	}
	
	input[type="password"],
	input[type="text"] {
		padding : 5px;
		border-radius: 5px;
		font-size: 1.2rem;
		text-align : center;
		margin-bottom: 15px;
	}
	
	input[type="submit"] {
		color: #fff;
		background: #f00;
		width: 70px;
		height : 30px;
		border: none;
		border-radius: 5px;
		margin-top: 15px;
	}
</style>
</head>
<body>
	<header>
		<a href="/"><img width="180px" alt="로고" src="../resources/image/Logonetflix.png"></a>
	</header>
	<hr>
	
	<section class="join-input-section">
		<h1>회원님, 반갑습니다.</h1>
		<h1>넷플릭스에 오신걸 환영합니다.</h1>
		<form action="/member/join" method="post" name="regForm"
			  onsubmit="return checkForm()">
			<p>이메일 주소</p>
			<p>${param.id}</p>
			<input type="hidden" name="id" value="${param.id}">
			<div>
				<input type="password" name="pw" placeholder="비밀번호를 입력하세요" required="required">
			</div>
			<div>
				<input type="text" name="name" placeholder="이름을 입력하세요" required="required">
			</div>
			<div>
				<select name="yy" id="year"></select>년
				<select name="mm" id="month"></select>월
				<select name="dd" id="day"></select>일
			</div>
			<input id="age" type="hidden" name="age" value="">
			<div>
				<input type="submit" value="확인">
			</div>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		</form>
	</section>
</body>
</html>