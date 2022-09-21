<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/CSS/style.css?13253">
<style>
.errer_msg {
	height:300px;
	width:30%;
	background:gold;
	color:black;
}
</style>
</head>
<body>
	<div class="errer_msg" >
		<h1 style="text-align:center; color:black;">Access Denied Page</h1>
	</div>
	
	
	<h2 style="text-align:center"><c:out value="${msg}" /></h2>
</body>
</html>