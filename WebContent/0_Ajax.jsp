<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="javascripts/jquery-1.9.0.min.js"></script>
</head>
<body>

<h1> Ajax Main </h1>


	<br>

<input type="button" onclick="fn_ajax();" value="Click Html">

<input type="text" id="txt2" value="">

	<br>
<input type="button" onclick="fn_ajax2();" value="Click Json">

<div id="AjaxBody">

</div>



<script type="text/javascript">

var id=$("#txt2").val();

alert(id);

function fn_ajax(){
	
	$.ajax({
		type:"post",
		url:"0_ajaxHtml.jsp",
		data : "html",
		success : function(data){
			$("#AjaxBody").html(data);
			
		}
	});
	
}

function fn_ajax2(){
	
	var searchWord = $("#txt2").val();
	
	
	$.ajax({
		type : "POST",	// 서버로 보내는 방식 
		url : "./AllsearchNation.na",	//서버로 보낼 url 주소, 여기로 보내고 여기서 받음.
		dataType : "JSON",				//받을 데이터 형태 (주로 json, xml, html 이 사용됨)
		contextType : "application/x-www-form-urlencoded; charset=UTF-8", //제이슨을 인코딩하는 과정 (제이슨은 유니코드만 취급하기 때문에 한글을 인식하기 위해 꼭 필요함!)
		data : { 	worldWord : searchWord 	},	// url 로 보낼 데이터 => worldWord 가 변수 명, searchWord가 데이터가 담겨있는 변수 
		success : function(data){	// 아작스 함수가 성공했을 때, 실행되는 함수. data 에 원하는 정보가 담겨서 넘어온다. 
		
		/*	아작스를 이용해 가지고 온 검색 결과를 화면에 나열 후 선택 이벤트를 준다. 	*/
		/*	서버측에서 입력한 단어를 포함하는 모든 나라를 배열에 담아서 가져오게 코딩을 하여, 배열 크기로 구분		*/

				var nationStr = "";
				nationStr += "<ul>"
				for(var i=0; i<data.length; i++){
					nationStr += "<li data-calling-code='"+data[i].number+"'>"+
								"<a href='#this'><span class='country' name='"+data[i].kor+"'>"+data[i].kor+"</span>"+
								"<span class='en_country' name='"+data[i].eng+"'>"+data[i].eng+"</span></a></li>"
				}
				nationStr += "</ul>";
				
				
				$("#AjaxBody").html(nationStr);

				
				/*	검색 결과를 	선택할 때, 이미 선택되어 있는 것은 선택 해제 시킴. */
				/*	선택된 값의 한글 국가명을 변수 kor에 담고 확인 버튼을 눌렀을 때, jsp 화면에 표시	*/

		}
	
		});
	}
</script>
</body>
</html>