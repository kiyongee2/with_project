<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 작성</title>
<link rel="stylesheet" href="/resources/CSS/style.css">
<script>
	function checkForm(){
		let form = document.write
		
		if(form.title.value == ""){
			alert("제목을 입력해주세요");
			form.title.focus();
			return false;
		}
		
		
		if(form.content.value == "") {
			alert("내용을 입력해주세요");
			form.content.focus();
			return false;
		}
	}
</script>
	<security:authentication property="principal" var="pinfo" />
	<c:if test="${ pinfo.authorities ne '[ADMIN]'}">
		<%
		response.sendRedirect("/board/main");
		%>
	</c:if>
</head>
<body>

	<div id="container">
	<header>
		<a href="/"><img width="180px" alt="로고" src="../resources/image/Logonetflix.png"></a>
	</header>
	<hr>
		<section id="register">
			<h2>콘텐츠 작성</h2>
			<hr>
			<form action="/board/insertBoard" method="post" name="write" onsubmit="return checkForm()"
					encType="multipart/form-data">
				<table class="tbl_reg">
					<tr>
						<td width="100">제목</td>
						<td align="left"><input type="text" name="title"></td>
					</tr>
					<tr>
						<td>카테고리</td>
						<td align="left"><input type="text" name="category"></td>
					</tr>
					<tr>
						<td>내용</td>
						<td align="left"><textarea name="content" cols="50" rows="10"></textarea></td>
					</tr>

					<tr>
						<td>업로드</td>
						<td align="left"><input type="file" name="uploadFile"></td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<input type="submit" value="등록">
						</td>
					</tr>
				</table>
				<input type="hidden" name="${ _csrf.parameterName }" value="${ _csrf.token }">
			</form>
		</section>
	</div>
</body>
</html>