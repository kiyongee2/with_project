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
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<script type="text/javascript">
	$(document).ready(function(){                         
	
	function checkForm(){
		
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
	
	input[type="submit"],
	input[type="button"] {
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
	<h1>회원 정보</h1>
		<form action="/member/update" method="post" name="regForm"
			  onsubmit="return checkForm()">
			<div>
				<input type="text" name="id" value="${ member.id }" readonly="readonly">
			</div>
			<div>
				<input type="password" name="pw" placeholder="변경할 비밀번호 입력" required="required">
			</div>
			<div>
				<input type="text" name="name" value="${ member.name }" required="required">
			</div>
			<div>
				<input type="submit" value="수정">
				<a href="/member/delete?id=${member.id}"
				   onclick="return confirm('정말로 탈퇴하시겠습니까?')">
				   <input type="button" value="탈퇴"></a>
			</div>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		</form>
	</section>
</body>
</html>