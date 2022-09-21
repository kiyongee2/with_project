<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
<style type="text/css">
.header{
	position :absolute;
	width:100%;
	top:0;
	left:0;
	z-index:1000;
}
#login_btn{
	float:right;
	margin-right : 30px;
	margin-top: -2px;
	width: 90px; 
	height: 38px; 
	background: red; 
	border: 0; 
	border-radius: 5px; 
	color: #fff;
}
#lang{
	position:relative;
	float:right;
	margin-right: 100px;
	top:-2px;
}
.logoimg{
	margin-left:30px;
}
#lang_sel{
	color: #fff; 
	width: 98px; 
	height: 36px; 
	border: 0;
	appearance: none; 
	box-sizing: border-box;
	text-align: center; 
    background: none; 
}

#login_btn:hover{
	cursor: pointer;
}
#iconposition1{
	color:white;
	position:absolute;
	top:10px;
	left:5px;
}
#iconposition2{
	color:white;
	position:absolute;
	top:10px;
	right:7px;
}

a{
	color : #222;
}

.dropdown {
	width:32px;
	float:right;
}
.my-info{
	float:right;
	width:32px;
	height:32px;
	margin-right : 30px;
	cursor: pointer;
}
.dropdown-submenu {
	display : none;
	clear:both;
	width: 150px;
	margin-top : 0;
	background:  rgba(0, 0, 0, 0.7);
	
	box-shadow : 0 0 10px rgba(0, 0, 0, 0.17);
	transform :translateX(-100%);
}
.dropdown-submenu a {
	display : block;
	padding : 7px;
	text-align: center;
	color:#eee;
}
.dropdown-submenu a:hover {
	text-decoration: underline;
}
.dropdown:hover .dropdown-submenu{
	display : block;
}

.search{
	float : right;
	margin-right: 100px;
	background-color : #fff;
	width:50px;
	height:50px;
	border-radius: 50px 50px 50px 50px;
	box-shadow: 0 0 10px rgba(0,0,0, 0.15);
	overflow:hidden;
	position:relative;
	top: -10px;
	transition: 0.5s;
}
.search.active {
	width: 400px;
}
.icon {
	width:50px;
	height:50px;
	border-radius: 50%;
	text-align: center;
	line-height: 50px;
	font-size: 28px;
	cursor:pointer;
	background-color : #fff;
	position:absolute;
	top:0;
	left:0;
}
.input-frame {
	position:absolute;
	top: 12px;
	left: 60px;
	width : 300px;
}
.input-frame input[type=text] {
	width: 100%;
	outline : none;
	border: none;
	font-size : 18px;
}
.input-frame input[type=text]::placeholder {
	transition:0.3s;
}
.input-frame input[type=text]:focus::placeholder {
	opacity: 0;
}
.clear {
	position:absolute;
	right:20px;
	top:13px;
	cursor:pointer;
}
</style>
</head>
<body>
	<div class="header" style="background: rgba(0, 0, 0, 0.2); height: 50px; padding-top:20px">
		<security:authorize access="isAnonymous()" >
			<a href="/customLogin"><button id="login_btn" type="button">로그인</button></a>
		</security:authorize>
		
 		<security:authentication property="principal" var="pinfo" />
		<security:authorize access="isAuthenticated()" >
			<c:if test="${ pinfo.authorities eq '[MEMBER]'}">
				<div class="dropdown">
					<a class="my-info"><img src="../resources/image/icon.png"></a>
					<div class="dropdown-submenu">
						<a href="/member/memberView?id=<c:out value="${pinfo.username}" />">계정 관리</a>
						<a href="/customLogout">로그 아웃</a>
					</div>
				</div>
			</c:if>
 			<c:if test="${ pinfo.authorities eq '[ADMIN]'}">
				<div class="dropdown">
					<a class="my-info"><img src="../resources/image/icon.png"></a>
					<div class="dropdown-submenu">
						<a href="/customLogout">로그 아웃</a>
						<a href="/board/insertBoard">콘텐츠 작성</a>
					</div>
				</div>
			</c:if>
		</security:authorize>
		
		<img class="logoimg" width="106rem" alt="넷플릭스 로고" src="../resources/image/Logonetflix.png">
		<div id="lang">
			<i id="iconposition1" class="xi-globus"></i>
			<select id="lang_sel" tabindex="0">	
				<option value="ko" style="background : #919191">한국어</option>
				<option value="eng" style="background : #919191">영어</option>
			</select>
			<i id="iconposition2" class="xi-caret-down-min"></i>
		</div>
		<security:authorize access="isAuthenticated()" >
		<div class="search">
			<span class="clear"><i class="xi-close-thin"></i></span>
			<div class="icon"><i class="xi-search"></i></div>
			<div class="input-frame">
			<form action="/board/searchResult">
				<input id="searchInput" type="text" name="keyword" placeholder="Type Here...">
			</form>
			</div>
		</div>
		</security:authorize>
	</div>
	
	<script type="text/javascript">
		var icon = document.querySelector('.icon'),
			search = document.querySelector('.search'),
			clear = document.querySelector('.clear'),
			searchInput = document.getElementById('searchInput');
		
		icon.onclick = function(){
			search.classList.toggle('active')
		}
		clear.onclick = function(){
			searchInput.value = ''
		}
	</script>
	
</body>
</html>