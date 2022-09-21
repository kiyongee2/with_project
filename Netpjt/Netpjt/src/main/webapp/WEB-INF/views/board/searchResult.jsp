<%@page import="com.prjnet.domain.BoardVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="../resources/js/jquery-3.6.0.js"></script>
<link rel="icon" href="../resources/image/netflix_ico.png">
<link rel="stylesheet" href="../resources/css/common.css">
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">

<style type="text/css">
.container{
	position:relative;
	z-index:500;
	text-align:center;
}
</style>
</head>
<body>
<security:authorize access="isAnonymous()">
	<%
		response.sendRedirect("/");
	%>
</security:authorize>
<security:authorize access="isAuthenticated()">
<jsp:include page="../header.jsp" />
	<div class="container">
		<section class="contents">
		<c:forEach var="board" items="${ boardList }">
			<a class="modal-notice" onclick="sendBno(${board.bno})"><img src="../resources/upload/${ board.image }"></a>
		</c:forEach>
		<security:authentication property="principal" var="pinfo" />
		<div class="modal">
			<div class="modal-content">
				<a class="btn-close">X</a>
				<img class="view-img" alt="image" src="">
				<p id="title"></p>
				<p id="category"></p>
				<p id="content"></p>
				<c:if test="${ pinfo.authorities eq '[ADMIN]'}">
					<a id="deletebno">콘텐츠 삭제</a>
				</c:if>
			</div>
		</div>
		</section>
	</div>
	
	<script>
		function sendBno(bno){
			$.ajax({
				type: "get",
				url:"/board/boardView",
				dataType: "text",
				data: {"bno": bno},
				success: function(data){
					data = data.split("/");
					let title = data[0];
					let content = data[1];
					let category = data[2];
					let image = data[3];
					let bno = data[4];
					$("#title").text(title);
					$("#content").text(content);
					$("#category").text(category);
				 	$(".view-img").attr("src","../resources/upload/"+image);
				 	$("#deletebno").attr("href","/board/delete?bno="+bno);
				},
				error: function(data){
					alert("에러 발생!!");
				}
			});
		}
		$('.modal-notice').click(function(){
			$('.modal').fadeIn()
		});
		$('.btn-close').click(function(){
			$('.modal').fadeOut()
		})
	</script>
</security:authorize>
</body>
</html>