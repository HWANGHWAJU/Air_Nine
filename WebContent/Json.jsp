<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>

<script type="text/javascript" src="javascripts/jquery-1.9.0.min.js"></script>

</head>
<body>
<h1>ㅇㅅㅇ</h1>
<c:set var="str" value="${requestScope.JS}"/>
<input type="hidden" id="s" name="s" value=' ${str }'>
${str }
<script type="text/javascript">

var str = $("#s").val();
console.log(str);

</script>
</body>

</html>