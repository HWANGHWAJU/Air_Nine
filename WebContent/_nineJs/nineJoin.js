$(document).ready(function(){
	jsRadiobox01();

	$(".js-selectbox01").change(function(){
		var $domaintext = $("#txtEmailDomain");
		var $text = $(this).find('span');
		var $select = $(this).find("select");
		var $selected = $(this).find("#selEmailDomain").val();
		console.log("$selected :"+$selected);
		
		
		if($(this).find("option:selected").hasClass("ex")){
			$domaintext.val("");
			$domaintext.attr("readonly",false);
			$text.text('직접입력');
		}else{
			$domaintext.attr("readonly",true);
			$text.text(($selected));
			$domaintext.val($selected);
		}
		
	});
	
	$("#btnSearch").on("click", function(){
		
		var searchWord = $("#txtCountrySearch").val();
		console.log(searchWord);
		
		$.ajax({
			type : "POST",	// 서버로 보내는 방식 
			url : "./AllsearchNation.na",	//서버로 보낼 url 주소, 여기로 보내고 여기서 받음.
			dataType : "JSON",				//받을 데이터 형태 (주로 json, xml, html 이 사용됨)
			contextType : "application/x-www-form-urlencoded; charset=UTF-8", //제이슨을 인코딩하는 과정 (제이슨은 유니코드만 취급하기 때문에 한글을 인식하기 위해 꼭 필요함!)
			data : { 	worldWord : searchWord 	},	// url 로 보낼 데이터 => worldWord 가 변수 명, searchWord가 데이터가 담겨있는 변수 
			success : function(data){	// 아작스 함수가 성공했을 때, 실행되는 함수. data 에 원하는 정보가 담겨서 넘어온다. 
			
			/*	아작스를 이용해 가지고 온 검색 결과를 화면에 나열 후 선택 이벤트를 준다. 	*/
			/*	서버측에서 입력한 단어를 포함하는 모든 나라를 배열에 담아서 가져오게 코딩을 하여, 배열 크기로 구분		*/
				if(data.length == 0){
					alert("해당하는 나라가 없습니다.");
					$("#result_list").css("display","none");
					$("#none_data").css("display","block");
				}else{ //배열의 크기가 1이상일 때, 화면에 표시해줄 html 구문 작성
					var nationStr = "";
					nationStr += "<ul>"
					for(var i=0; i<data.length; i++){
						nationStr += "<li data-calling-code='"+data[i].number+"'>"+
									"<a href='#this'><span class='country' name='"+data[i].kor+"'>"+data[i].kor+"</span>"+
									"<span class='en_country' name='"+data[i].eng+"'>"+data[i].eng+"</span></a></li>"
					}
					nationStr += "</ul>";
					
					
					$("#result_list").html(nationStr);
					$("#result_list").css("display","block");
					$("#none_data").css("display","none");
					
					
					/*	검색 결과를 	선택할 때, 이미 선택되어 있는 것은 선택 해제 시킴. */
					/*	선택된 값의 한글 국가명을 변수 kor에 담고 확인 버튼을 눌렀을 때, jsp 화면에 표시	*/
					var kor ="";
					var _list = $("#result_list li");
					$("#result_list li").on("click", function(){
						console.log(this);
						
						_list.each(function(i){
							if(_list.eq(i).hasClass('selected')){
								_list.eq(i).removeClass('selected');
							}
						});
						if($(this).addClass('selected'));
						kor = $(this).find('.country').text();
						console.log($(this).text());
					});
					
					/* 그 후 확인 버튼을 눌렀을 때 이벤트  */
					
				$("#btnConfirm").on("click", function(){
			//		var $liselected = $("#result_list").find("li .selected").attr("data-calling-code").val();
				//	var $textworld = $liselected.find('span');
					console.log(kor);
					
					$(".txtParentCountry").val(kor);
					closeCountryLayer();
					
				});
					
				}
				
			} /*  ajax success 이벤트	*/
			
		});
		
	});
	
	
	
	
});

function viewLayerCountrySearch(){
	$("#divLayerPopup0").css("display","block");
}
function closeCountryLayer(){
	$("#divLayerPopup0").css("display","none");
}
function jsRadiobox01(){
    $(".js-radiobox01").find("input").each(function(i, radio){
        var $radio = $(this);

        $radio.off("focus blur change");

        /* checked가 되어있는경우 */
        if($radio.is(":checked")==true){
            if($radio.is(":disabled")==true){
                $radio.parent('label').addClass('disabled');
            } else{
                $radio.parent('label').addClass('active');
            }
        }
        /* disable이 되어있는경우 */
        else if($radio.is(":disabled")==true){
            $radio.parent('label').addClass('disabled');
        }

        $radio.focus(function(){
            $radio.closest(".radiobox01").addClass("focus");
        })
        $radio.blur(function(){
            $radio.closest(".radiobox01").removeClass("focus");
        })

        $radio.on("change", function(){
            $("input[name='" + $(this).attr("name") +"']").parent("label").removeClass("active");
            $(this).prop("checked", true).parent('label').addClass('active');
        });
    });
}