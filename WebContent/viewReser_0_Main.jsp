<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix ="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=1200">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="Content-Security-Policy" content="default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *">
    <meta content="text/html; charset=UTF-8; X-Content-Type-Options=nosniff" http-equiv="Content-Type">
    <meta http-equiv="X-XSS-Protection" content="0">    
<title>예약 조회 | 에어 나인</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/common/favicon.ico">
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
    <script type="text/javascript" src="javascripts/designCommon_onServer.js" ></script>
    <script type="text/javascript" src="javascripts/moment.js"></script>
    <script type="text/javascript" src="javascripts/airs_booking.js"></script>
    <script type="text/javascript" src="javascripts/airs_common.js"></script>
    <!-- 20160722 추가 -->
    <link rel="icon" href="images/common/favi_16x16.png" type="image/gif" sizes="16x16">
    <link rel="icon" href="images/common/favi_32x32.png" type="image/gif" sizes="32x32">
    <link rel="icon" href="images/common/favi_152x152.png" type="image/gif" sizes="152x152">

</head>
<body style="zoom:1;">
<div id="skipNavigation">
    <ul>
        <li><a href="#content">본문 바로가기</a></li>
        <li><a href="#gnb">주메뉴 바로가기</a></li>
    </ul>
</div>

<div id="wrap" class="myreservation">
	<jsp:include page="0_header.jsp"/>
	
	<div>
		<c:set var="res" value="${param.res }"/>
		<c:if test="${res == null }">
			<c:set var="res" value="viewReser_ReservationList.jsp"/>
		</c:if>
		<jsp:include page="${res }"/>
	</div>

	<jsp:include page="0_footer.jsp"/>
</div>

</body>
</html>