<%--
  Created by IntelliJ IDEA.
  User: jijunhyuk
  Date: 11/6/24
  Time: 4:44 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<h1>게시판 - 등록</h1>

<html>
<head>
    <title>Create Board</title>
    <script src="/resources/js/boardInputValidation.js"></script>
</head>
<body>
<form action="/boards/free/write" method="post" enctype="multipart/form-data"
      onsubmit="return checkBoardInput(this, 'create')">

    <label for="category">카테고리:</label>
    <select id="category" name="category" required>
        <option value="">카테고리 선택</option>
        <c:forEach var="category" items="${categories}">
            <option value="${category.categoryName}"
                ${param.category == category.categoryName ? "selected" : ""}>${category.categoryName}</option>
        </c:forEach>
    </select>
    <br><br>

    <label for="images">대표 이미지 설정:</label>
    <input type="file" id="images" name="images" multiple>
    <br><br>

    <label for="createdBy">작성자:</label>
    <input type="text" id="createdBy" name="createdBy" required>
    <br><br>

    <label for="password">비밀번호:</label>
    <input type="password" id="password" name="password" required>
    <br><br>

    <label for="passwordConfirm">비밀번호 확인:</label>
    <input type="password" id="passwordConfirm" name="passwordConfirm" required>
    <br><br>

    <label for="title">제목:</label>
    <input type="text" id="title" name="title" required>
    <br><br>

    <label for="content">내용:</label><br>
    <textarea id="content" name="content" rows="5" cols="50" required></textarea>
    <br><br>

    <label>파일 첨부:</label><br>
    <input type="file" name="files" multiple>
    <br><br>

    <button onclick="location.href='/boards/free/list'">취소</button>
    <button type="submit">저장</button>

</form>

</body>
</html>
