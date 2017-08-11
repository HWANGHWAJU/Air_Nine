<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>메인 | 에어나인</title>
 <link rel="stylesheet" type="text/css" href="stylesheets/main/main.css">
    
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/company.css">  
  <link rel="stylesheet" type="text/css" href="stylesheets/common/common.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/board.css">  
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/service.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/utile.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/swiper.min.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/myreservation.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/sub/air_booking.css">
    
    <script type="text/javascript" src="javascripts/jquery-1.9.0.min.js"></script>
    <script type="text/javascript" src="javascripts/jquery.placeholder.js" ></script>
	
   <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="javascripts/moment.js"></script>
<!-- 	<script type="text/javascript" src="javascripts/jquery.oLoader.js"></script>
    <script type="text/javascript" src="javascripts/jquery.oLoader.min.js"></script> -->
	<script type="text/javascript" src="_nineJs/nine.js"></script>
</head>
<body>


<div id="wrap">
<div id="wrap">
<jsp:include page="0_header.jsp"/>
</div>	
<c:set var="page"  value="${param.page }"/>

<c:choose>
	<c:when test="${page == null }">
	<c:set var="page" value="mainPage.jsp"/>
	</c:when>
</c:choose>

<jsp:include page="${page }"/>

<jsp:include page="0_footer.jsp"/>

</div>



</body>
</html>