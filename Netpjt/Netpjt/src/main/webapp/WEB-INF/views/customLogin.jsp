<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Netflix</title>
<link rel="icon" href="../resources/image/netflix_ico.png">
<script src="../resources/js/jquery-3.6.0.js"></script>
<style type="text/css">
	*{
		outline: none;
		word-break:keep-all;
		margin:0;
		padding:0;
	}
	
	header a img {
		position: absolute;
		margin : 5px;
	}
	body{
		background: url(../resources/image/section_1_BG.jpg) no-repeat;
	}
	
	.gradi{
		position: absolute;
		width: 100%; 
		height: 100%; 
		background: rgba(0,0,0,0.4);
		background-size:1000%;
		top:0;
		left:0
	}
	
	.login_box{
		width:314px;
		height: 560px;
		padding: 60px 68px 40px 68px;
		background:rgba(0,0,0,0.8);
		position:absolute;
		top: 150px;
		left: calc(50% - 225px);
		color:white;
		margin:auto;
		text-align:center;
	}
	input[type=text],
	input[type=password],
	input[type=submit] {
		width: 100%;
		height: 45px;
		margin-bottom: 30px;
		border: none;
		border-radius: 5px;
	}
	input[type=submit]{
		margin-top: 40px;
		margin-bottom: 5px;
		background-color:red;
		color:white;
	}
</style>
</head>
<body>
	<div class="container">
		<div class="gradi"></div>
		<header>
			<a href="/"><img width="180px" alt="로고" src="../resources/image/Logonetflix.png"></a>
		</header>
		
		<section class="login_box">
			<form action="/login" method="post" name="login_form">
				<p align="left">로그인</p>
				<div>
					<input type="text" name="username">
				</div>
				<div>
					<input type="password" name="password">
				</div>
				<div>
					<input type="submit" value="로그인">
				</div>
				<div>
					<label><input type="checkbox">로그인 정보 저장</label>
					<a href="#">도움이 필요하신가요?</a>
				</div>
				<div>
					<p>Netflix회원이 아닌가요? <a href="/">지금 가입하세요.</a></p>
				</div>
				<input type="hidden" name="${ _csrf.parameterName }" value="${ _csrf.token }">
			</form>
		</section>
	</div>
</body>
</html>