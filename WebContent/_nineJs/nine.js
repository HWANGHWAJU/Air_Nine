/*	예약하는 것에 있어 필요한 데이터 객체, Booking에서 넘어가며 값 저장	*/

/*	최종 예약 전 넘어오는 예약 정보를 담을 객체 	*/
var BookingConditionDataObject = function(){
	this.TRIPTYPE="";				//왕복, 편도 
	this.segmentDatas = [];			// 출도착지 정보
	this.passengerDatas = [];		// 승객에 대한 정보 
};

var BookingInfo = function(){
	this.tripType = "";
	this.departureAirport="";
	this.departureDateTime="";
	this.arrivalAirport="";
	this.adtPaxCnt="";
	this.chdPaxCnt="";
	this.infPaxCnt="";
}

/*	출도착 정보 저장 객체	*/
var SegmentDataObject = function(){
	this.arrivalAirport = "";	// 도착지 공항
	this.departureAirport="";	// 출발지 공항
	this.departureDateTime=""; 	// 출발 날짜 
};	

/*	승객에 대한 정보 저장 객체	*/
var PassengerDataObject = function(){
	this.passengerNo = ""; 	//승객 수 
	this.paxType = ""; //승객 탑승 종류 (성인, 소아, 유아)
}

$(function(){
    jsGnb();
    jsHrgroup();
    Cal_fu();
});
function jsHrgroup(){
    var $sotreSelf = null;
    $(".jsHrgroup").each(function(){
        var $self = $(this);

        $(this).children("a").on("mouseenter focus", function(){
            if ($sotreSelf !== null) {
                $sotreSelf.removeClass("on");
                $sotreSelf.find(".hrgroup-list").hide();
            }
            //$self.css("height", "auto");
            $self.addClass("on");
            $self.find(".hrgroup-list").show();
            $sotreSelf = $self;
        });
        $(".hgroup").find("a").eq(-1).on("keydown", function(e) {
            Tab(function () {
                setTimeout(function () {
                    $self.trigger("mouseleave");
                }, 1);
            }, e);
            //if (tab) return false;
        });
        $self.on("mouseleave", function() {
            $self.removeClass("on");
            $self.find(".hrgroup-list").hide();
        });
        /* 20160714 추가 */
        $self.prev("span").find("a").focus("keydown", function() {
            $self.removeClass("on");
            $self.find(".hrgroup-list").hide();
        })
        /* //20160714 추가 */
    })
}

function jsGnb(){
    var $gnb = $("#gnb");
    var $header = $("#header");
    var $depth01Lists = $(".depth01Lists");
    var $bookingWrap = $(".booking-wrap");
    var $smallheaderBtn01 = $(".smallheader-btn01");
    var $smallheaderBtn02 = $(".smallheader-btn02");
    var $hgroup = $(".hgroup");
    var $smallHeader = $("#smallHeader");
    var $bookingStep = $(".booking-step");
    var aniSpd = 100;
    $gnb.on("mouseleave", function(){
        $header.removeClass("on");
        $(this).removeClass("on");
        $(".depth01Lists").removeClass("on");
        $(".depth02").hide();
        $("#headerContent").removeAttr("style");
        return false;
    });
    $(".depth02Lists > a").on("mouseenter focus", function() {
    	$depth01Lists.removeClass("on");
        var idx = $(this).closest(".depth01Lists").addClass("on").index();
        $header.addClass("on");
        return false;
    });
    $(".depth01Lists > a").on("mouseenter focus", function() {
        var idx = $(".depth01Lists > a").index(this);
        $depth01Lists.removeClass("on").eq(idx).addClass("on");
        $(".depth02").show();
        //$("#headerContent").css("height", 342);
        $header.addClass("on");
        return false;
    });
    $(".depth02Lists a").eq(-1).on("keydown", function(e){
        Tab(function(){
            setTimeout(function(){
                $gnb.trigger("mouseleave");
            }, 1);
        }, e);
    });
    /* 20160714 추가 */
    $("#header a").focus(function(){
        if($(this).parents("#gnb").hasClass("js-gnb")==false){
            $("#gnb .depth01Lists").removeClass("on").find(".depth02").hide();
            $("#header").removeClass("on");
        }
    })
    /* //20160714 추가 */

    if ($(".booking-step-on").length){
        $.data(window, "scrollFlag", false);  // true : 실행 가능 , false : 실행 불가능
        $.data(window, "scrollTop");



        $("#skipNavigation a").eq(1).on("click", function(){
            $("#headerOpen").trigger("click");
        });

        function init(){
            $hgroup.hide();
            $smallheaderBtn02.hide();
            $("body").css("overflow-y", "scroll");

            $.data(window, "scrollTop", 0);
            $("#headerOpen").on("click", function(){
                $gnb.show().trigger("mouseleave");
                $hgroup.show(0, function(){ // 20160713
                    $(".hgroup .logo a").focus(); // 20160713, 20160715
                }); //20160713
                $smallHeader.stop(true,false).css({"top": -40}, aniSpd);
                $bookingStep.stop(true,false).animate({top : 110}, aniSpd);
                $header.css({"top": -70}).stop(true,false).animate({"top" : 0}, aniSpd, function(){
                    $.data(window, "scrollFlag", true);
                });
                if($.data(window, "scrollTop") <= 215) {
                    $bookingWrap.stop(true,false).animate({top : 70}, aniSpd);
                }
                $smallheaderBtn01.fadeOut(aniSpd);
                $smallheaderBtn02.fadeIn(aniSpd);
                return false;
            });

            $("#headerClose").on("click", function(){
                if ($.data(window, "scrollFlag") === true) {
                    $smallHeader.stop(true,false).css({"top": 70}, aniSpd);
                    $bookingStep.stop(true,false).animate({top : 40}, aniSpd);
                    $header.animate({"top": -70}, aniSpd, function(){
                        $(this).removeAttr("style");
                        $gnb.hide();
                        $hgroup.hide();
                        $smallHeader.css("top" , 0);
                    });
                    if ($bookingWrap.position().top >= 70) {
                        $bookingWrap.stop(true,false).animate({top : 0}, aniSpd);
                        //$(".booking-airlineticket-finalInfo").css({"position": "fixed"}).animate({"top": 155});
                    }

                    $.data(window, "scrollFlag", false);
                }
                $smallheaderBtn01.fadeIn(aniSpd);
                $smallheaderBtn02.fadeOut(aniSpd);
                return false;
            });

            var footerH = $("#footer").outerHeight(true);//2016-08-04
            var scrollFlag = true;
            var $scrolBtn = $(".scroll-top-btn");

            $(window).on("scroll", function(){
                var wrapH = $("#wrap").outerHeight(true);
                var winH = $(window).outerHeight(true);
                $.data(window, "scrollTop", $(this).scrollTop());

                if ($.data(window, "scrollFlag") === true) {
                    $smallHeader.show().stop(true,false).css({"top": 70}, aniSpd);
                    $bookingStep.stop(true,false).animate({top : 40}, aniSpd);
                    $header.animate({"top": -70}, aniSpd, function(){
                        $(this).removeAttr("style");
                        $gnb.hide();
                        $hgroup.hide();
                        $smallHeader.css("top" , 0);
                    });
                    if ($bookingWrap.position().top >= 70) {
                        $bookingWrap.stop(true,false).animate({top : 0}, aniSpd);
                        //$(".booking-airlineticket-finalInfo").css({"position": "fixed"}).animate({"top": 155});
                    }
                    $smallheaderBtn01.fadeIn(aniSpd);
                    $smallheaderBtn02.fadeOut(aniSpd);
                    $.data(window, "scrollFlag", false);
                }

                if($(this).scrollTop() > 110 && scrollFlag === true) {
                    $scrolBtn.stop(true,true).css({"position" : "fixed","bottom": 10}).fadeIn(aniSpd);
                    scrollFlag = false;
                } else if ($(this).scrollTop() < 110 && scrollFlag === false){
                    $scrolBtn.stop(true,true).fadeOut(aniSpd);
                    scrollFlag = true;
                }

                if( Math.floor(wrapH - (footerH + 10)) <= Math.floor(winH + $(this).scrollTop())) {//2016-08-04
                    $scrolBtn.stop(true,true).css({"position":"absolute","bottom": (footerH + 10)});//2016-08-04
                } else {
                    $scrolBtn.css({"position" : "fixed","bottom": 10})
                }
                return false;
            });

            $(".scroll-top-btn button").on("click", function(){
                $('html, body').animate({scrollTop: 0});
            });
        }
        /*var winH = $(window).outerHeight(true);;
        var contentH = $("#content").outerHeight(true);;
        if(winH > contentH) {*/
        init();


    } else {
        $smallheaderBtn02.hide();
        var $layerBanner = $("#layerBanner");
        var scrollFlag = false;
        var smallHeaderFalg = false;
        var footerH = $("#footer").outerHeight(true);//2016-08-04

        var scrollFlag = true;
        var $scrolBtn = $(".scroll-top-btn");

        // skip gnb 버튼 클릭시
        $("#headerOpen").on("click", function(){
            $smallHeader.stop(true,false).css({"top": -40}, aniSpd);
            $header.stop(true,false).animate({
                "top" : 0
            }, aniSpd, function(){
                scrollFlag = true;
            });
            $("#location").animate({"top": 110}, aniSpd);
            $hgroup.show();
            $smallheaderBtn01.fadeOut(aniSpd);
            $smallheaderBtn02.fadeIn(aniSpd);
            $header.removeClass("hid").addClass("smallopen"); // 20160729
            return false;
        });

        $("#headerClose").on("click", function(){
            if (scrollFlag === true && smallHeaderFalg === true) {
                close();
                scrollFlag = false;
            }
            $header.removeClass("smallopen").addClass("hid"); // 20160729
            return false;
        });

        function close(){
            $smallheaderBtn01.fadeIn(aniSpd);
            $smallheaderBtn02.fadeOut(aniSpd);
            $smallHeader.show().stop(true,false).css({"top": 0});
            $header.stop(true,false).animate({
                "top" : -70
            }, aniSpd);
            $("#location").animate({"top": 40}, aniSpd, function(){
                $(this).removeAttr("style");
                $smallHeader.show().stop(true,false).css({"top": 0});
            });
        }

        $(window).on("scroll", function(){
            var scrollTop = $(this).scrollTop();
            var wrapH = $("#wrap").outerHeight(true);
            var winH = $(window).outerHeight(true);
        	 //header 높이값 계산 하기위한 변수
            var lyaerBannerH = ($layerBanner.length !== 0 ? $layerBanner.outerHeight(true) : 0);
            var headerH = 110;
            var scrollCheckH = parseInt(lyaerBannerH + headerH, 10);

            // 높이가 header + layerBanner 보다 높을때 발생
            if (scrollTop >= scrollCheckH && smallHeaderFalg === false) {
                $hgroup.hide()
                $smallHeader.show().css({"top": 0}, aniSpd);
                $header.stop(true,false).addClass("hid").css({ // 20160729
                    "position" : "fixed",
                    "top" : -70
                });
                $scrolBtn.stop(true,true).css({"position" : "fixed","bottom": 10}).fadeIn(aniSpd);
                $("#location").stop(true,false).css({"top": 0}).animate({"top": 40}, aniSpd).addClass("change");
                smallHeaderFalg = true;

            }
           // 높이가 header + layerBanner 보다 작을때 발생
            if (scrollTop <= scrollCheckH && smallHeaderFalg === true) {
                $smallHeader.stop(true,false).css({"top": -40}).hide();
                $hgroup.show()
                $header.stop(true,false).removeAttr("style").removeAttr("class") // 20160729
                $("#location").stop(true,false).css({"top": 0}).removeClass("change");
                $scrolBtn.stop(true,true).fadeOut(aniSpd);
                smallHeaderFalg = false;
            }

            /*if($(this).scrollTop() > 110 && scrollFlag === true) {

                scrollFlag = false;
            } else if ($(this).scrollTop() < 110 && scrollFlag === false){

                scrollFlag = true;
            }*/

            if( Math.floor(wrapH - (footerH+10)) <= Math.floor(winH + $(this).scrollTop())) {//2016-08-04 수정
                $scrolBtn.stop(true,true).css({"position":"absolute","bottom": (footerH+10)});//2016-08-04 수정
            } else {
                $scrolBtn.css({"position" : "fixed","bottom": 10})
            }

            if (scrollFlag === true && smallHeaderFalg === true) {
                close();
                scrollFlag = false;
            }
            return false;
        });

        $(".scroll-top-btn button").on("click", function(){
            $('html, body').animate({scrollTop: 0});
        });
    }
}
var JsNation; // 나라, 영문명, JsAirport[]
var JsAirport = []; // 공항, 도시, 값 -> JSON 배열을 받아온 것 
	
var Dep = []; //


function DconvJs(data){
	$.each(data, function(index, entry){
		// data 에는 나라 , 공항 배열 
		JsNation =[];
		JsAirport =[];
		
		JsNation = entry.nation_kor;
		JsAirport = entry.airport;
		var AirportList = []; 
		
		for(var i=0; i<JsAirport.length; i++){
		
			var Airport = {
					airport : JsAirport[i].airport,	
					city : JsAirport[i].city,
					value : JsAirport[i].value
			}
			AirportList.push(Airport);
		}		
		
		var DepInfo = {
				nation : JsNation,
				airport : AirportList
		}
		Dep.push(DepInfo);
	});
	fn_Dairport(Dep);
}
function fn_Dairport(Dep){
	var str = "";
	for(var i = 0 ; i <Dep.length; i++){
		str += "<div class='booking-journey-layer-section booking-journey-layer-section-dep'>"+
					"<h3 class='booking-journey-layer-title'>"+Dep[i].nation+"</h3>"+
					"<ul class='booking-journey-layer-lists'>";
		for(var j = 0; j<Dep[i].airport.length; j++){
			str += "<li><button type='botton' value='"+Dep[i].airport[j].value+"'><span>"+Dep[i].airport[j].value+"</span></button></li>";
		}
		str +="</ul>"+"\n"+"</div>";
	}
	
	$("#divBookingJourneyLayer div.booking-journey-layer-section-dep").off("click").remove();

	$("#divBookingJourneyLayer .hidden-title").after(str);
	
	$("#divBookingJourneyLayer div.booking-journey-layer-section-dep button").on("click", function(){
		if($(this).parents(".booking-journey-layer-section").hasClass("booking-journey-layer-section-dep")){
			
			var value = $(this).children("span").text();
	//		alert(dep);
			$("#txtDepAirport").val($(this).children("span").text());
			$("#hidDepValue").val($(this).children("span").text());
			
			$('#spanBookingRouteLayerOpenDep').parents(".d").removeClass('active');
			$('#spanBookingRouteLayerOpenArr').parents(".a").removeClass('active');
			$("#divBookingJourneyLayer").slideUp(150);
			
			$.ajax({
				type : "POST",
				url : "./searchArr.na",
				datatype : "JSON",
				contextType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : { dep : value },
				success : function(data){
					AconvJs(data);
				}
			}); 
				
		}
	});
	

	 	
}

var JsANation; // 나라, 영문명, JsAirport[]
var JsAAirport = []; // 공항, 도시, 값 -> JSON 배열을 받아온 것 

var Arr = []; //
function AconvJs(data){
	$.each(data, function(index, entry){
		// data 에는 나라 , 공항 배열 
		JsANation =[];
		JsAAirport =[];
		
		JsANation = entry.nation_kor;
		JsAAirport = entry.airport;
		var AirportList = []; 

		
		for(var i=0; i<JsAAirport.length; i++){
		
			var Airport = {
					airport : JsAAirport[i].airport,	
					city : JsAAirport[i].city,
					value : JsAAirport[i].value
			}
			AirportList.push(Airport);
		}
		

		var ArrInfo = {
				nation : JsANation,
				airport : AirportList
		}
		console.log(ArrInfo);
		Arr.push(ArrInfo);
});

fn_Aairport(Arr);
}
function fn_Aairport(Arr){
	var str = "";
	
	$(".booking-journey-layer-section-arr").remove();
	
	if(Arr.length==0){
		str+= "<div class='booking-journey-layer-sction booking-journey-layer-section-arr'>"+
				"<h3 class='booking-journey-layer-title'>"+
				"<em id='emDepartureRouteNotSelected' class='pointColor01'><br>운항하는 스케줄이 없습니다.</em></h3><br>"+
				"<ul class='booking-journey-layer-lists'></ul></div>";
		
		$("#divBookingJourneyLayer .hidden-title").after(str);
	}
	
	str="";
	
	for(var i = 0 ; i <Arr.length; i++){
		str += "<div class='booking-journey-layer-section booking-journey-layer-section-arr'>"+
					"<h3 class='booking-journey-layer-title'>"+Arr[i].nation+"</h3>"+
					"<ul class='booking-journey-layer-lists'>"
		for(var j = 0; j<Arr[i].airport.length; j++){
			str += "<li><button value='"+Arr[i].airport[j].value+"'><span>"+Arr[i].airport[j].value+"</span></button></li>";
		}
		str +="</ul></div>";
	}
	

	$("#divBookingJourneyLayer .hidden-title").after(str);
	
	
	$("#divBookingJourneyLayer div.booking-journey-layer-section-arr button").on("click", function(){
		if($(this).parents(".booking-journey-layer-section").hasClass("booking-journey-layer-section-arr")){
			$("#txtArrAirport").val($(this).children("span").text());
			$("#hidArrValue").val($(this).children("span").text());
//			alert("hidArrValue :"+$("#hidArrValue").val());
			$('#spanBookingRouteLayerOpenDep').parents(".d").removeClass('active');
			$('#spanBookingRouteLayerOpenArr').parents(".a").removeClass('active');
			$("#divBookingJourneyLayer").slideUp(150);
		}
	});
}


/*		달력 & 탑승자 		*/

$(document).ready(function(){
	
	// 예약 정보를 저장하기 위해 변수 설정 
	var jsBookConditionDataObject = new BookingConditionDataObject();
	var ShowBooking = new BookingInfo();
	
	$("input:radio[name=radTripType]").on("click", function() {
			selectTripType = this.value; //현재 클릭한 버튼 
			var $label = $(this).parent('label'); //현재 클릭된 버튼의 상위 label 태그
			var $now = $(this);
			var $ulOneWayDesc_id = $("#ulOneWayDesc");
			var $btnDirectory_id = $("#btnDirectory");
			var $other;
			var $otherlabel;
	
		
			if($now.attr("id")=='radRoundTripType'){
				$other = $("#radOneWayTripType");
				$otherlabel = $other.parent('label');
			}else if($now.attr("id")=='radOneWayTripType'){
				$other = $("#radRoundTripType");
				$otherlabel = $other.parent('label');
			}
			
			if(selectTripType == 'RT'){
				$ulOneWayDesc_id.css("display","none");
				$btnDirectory_id.removeClass("booking-journey-items-diretory-oneway").addClass("booking-journey-items-diretory-roundtrip");
				$(".booking-date-items-enddate").css("display","");
				$label.removeClass('disabled').addClass('active');
				$otherlabel.removeClass('active').addClass('disabled');
				nowTripType=selectTripType;
			}else if(selectTripType='OW'){
				$ulOneWayDesc_id.css("display","");
				$btnDirectory_id.removeClass("booking-journey-items-diretory-roundtrip").addClass("booking-journey-items-diretory-oneway");
				$(".booking-date-items-enddate").css("display","none");
				$label.removeClass('disabled').addClass('active');
				$otherlabel.removeClass('active').addClass('disabled');
				nowTripType=selectTripType;
			}
			console.log("Select Trip Type :"+selectTripType);
	});
	
	
		$("#radRoundTripType").trigger("click");
		$("#ulOneWayDesc").css("display","none");
		



		$("#btnBoardingInfo").on("click", function(){

					var $this = $(this);
					var $target = $($(this).attr("data-target"));
					
					if($this.hasClass("active")){	//활성화 되어있는 버튼을 누른 경우 
					$this.removeClass("active");	//활성화 상태를 표시해주는 클래스를 삭제
					$target.slideUp(200);				//타겟으로 설정한 레이어를 슬라이드 업하여 닫아준다 속도는 200
					}else{
					$this.addClass("active");		//활성화 되지 않은 버튼을 누른 경우
					$target.slideDown(200);		//타겟으로 설정한 레이어를 슬라이드 다운하여 열어준다 속도는 200
					} 
	
					$(".layer-close").on("click", function(){
						$this.removeClass("active");
						$target.slideUp(200);
					});
			
			});	

		$("#btnAgeCalculator").on("click", function(){
	
				var $this = $(this);
				var $target = $($(this).attr("data-target")); //버튼 설정을 해주는 곳에서 data-target으로 설정한 것을 제이쿼리 객체로 연결
				var $closebtn = $("#spanAgeCalLayerClose");
				//선택 했을 때, 활성화 된 버튼인지를 구분하고 슬라이드를 열어주고, 닫아준다. 
				
				if($this.hasClass("active")){	//활성화 되어있는 버튼을 누른 경우 
					$this.removeClass("active");	//활성화 상태를 표시해주는 클래스를 삭제
					$target.slideUp(200);				//타겟으로 설정한 레이어를 슬라이드 업하여 닫아준다 속도는 200
				}else{
					$this.addClass("active");		//활성화 되지 않은 버튼을 누른 경우
					$target.slideDown(200);		//타겟으로 설정한 레이어를 슬라이드 다운하여 열어준다 속도는 200
				} 

			
			// 나이를 계산하기 위해 연도 설정
			
			var textYear = "년";
				$("#selAgeCalYear").val("").change().html('<option value="" selected="selected" class="ex">'+textYear+'</option>');
			
				
				for(var i =currentYear, j=0; j<13; i--, j++){
					// setAgeCalYeart 아이디 안의 마지막 option 뒤에 after 안에 적힌 코드를 추가 하여라. 
					$("#selAgeCalYear option:last").after('<option value="' + i + '">' + i + '</option>');
				}
			
				$("#spanAgeCalLayerClose").on("click", function(obj){
				
				});
				$(".layer-close").on("click", function(){
					$this.removeClass("active");
					$target.slideUp(200);
				});
			
			});


//년도를 선택했을 때 해당되는 월들을 표현


		$("#selAgeCalYear").on("change", function(){
				var $Yearval = $("#selAgeCalYear");
				var textMonth = "월";
				$("#selAgeCalMonth").val("").change().html('<option value="" selected="selected" class="ex">'+textMonth+'</option>');

			if($Yearval.val() != ""){
				var Monthval;
				if($Yearval.val() == currentYear){
					Monthval = currentMonth;  //선택한 해가 올해와 같다면, 현재 달까지만 표시 
				}else{
					Monthval = 12; //아니면 12월까지 표시 
				}
				
				for(var i=1; i<=Monthval; i++){
					$("#selAgeCalMonth option:last").after('<option value="'+i+'">'+i+'</option>');
				}
			}		
			});


			// 월을 선택했을 때 해당되는 일 들을 표현
			$("#selAgeCalMonth").on("change", function(){  //이 함수가 실행될 조건 -> 월이 선택 되어야 한다 . 
					var $Yearval = $("#selAgeCalYear");
					var $Monthval = $("#selAgeCalMonth");
					var textDate = "일";
					
					$("#selAgeCalDate").val("").change().html('<option value="" selected="selected" class="ex">'+textDate+'</option>');
					
					if($Monthval.val() != ""){
						var Dateval;
							if($Yearval.val() == currentYear && $Monthval.val()==currentMonth){
								Dateval = currentDate;
							}else{
								Dateval = new Date($Yearval.val(), $Monthval.val(),0).getDate();
							}
						
						for(var i=1; i<=Dateval; i++){
							$("#selAgeCalDate option:last").after('<option value="'+i+'">'+i+'</option>');
						}
						
					}
			});

		$("#btnAgeCal").on("click",function(){
		var $messageBox = $("#pAgeCalMsg");
		var $Yearval = $("#selAgeCalYear");	//태어난 연도
		var $Monthval = $("#selAgeCalMonth"); //태어난 달
		var $Dateval = $("#selAgeCalDate");	//태어난 일
		
		$messageBox.empty();

		/*첫 구간 탑승일 기준으로 만 2세 이상 ~ 만 12세 미만은 소아, 만 2세 미만은 유아 운임*/
		var Depdate = $("#txtDepBookingDate").val();
		var DepY = Depdate.substr(0,4); //출발 년도
		var DepM = Depdate.substr(5,2);  //출발 월
		var DepD = Depdate.substr(8,2); //출발 일

			
		var age = DepY - $Yearval.val();
		if(age < 2 ){
			var p1 = "<span style='font-weight : bold;'>"+Depdate+"</span>";
			var p2 = "<span style='font-weight: bold; color:red;'>유아입니다.</span>";
			$messageBox.append("가는 날 "+p1+" 기준으로"+p2);
		}else if(age >= 2 && age < 12 ){
			var p1 = "<span style='font-weight : bold;'>"+Depdate+"</span>";
			var p2 = "<span style='font-weight: bold; color:red;'>소아입니다.</span>";
			$messageBox.append("가는 날 "+p1+" 기준으로"+p2);		
		}else{
			var p1 = "<span style='font-weight : bold;'>"+Depdate+"</span>";
			var p2 = "<span style='font-weight: bold; color:red;'>성인입니다.</span>";
			$messageBox.append("가는 날 "+p1+" 기준으로"+p2);
		}
		
		});

			
			/*	탑승자 연령 정보		*/
			
			var $_this = $(".js-selectLayer01");
			var $_this_btn = $_this.find(".js-selectLayer01-btn");
			
			$(".js-selectLayer01").each(function(i){
			var $this = $(this);
			var $this_btn = $this.find(".js-selectLayer01-btn");
			var $target = $($this_btn.attr("data-target"));
			var $txt = $this.find(":text");
			
			$this_btn.on("click", function(){
				if($this_btn.hasClass('active')){
					$this_btn.removeClass('active');
					$target.slideUp(150);
				}else{
					
					//만약 다른 선택창이 활성화 되어 있는 경우 ! 
					$_this.each(function(i){
						if($_this_btn.eq(i).hasClass('active')){
							// 다른 변수로 불러온 selectLayer 들 중에 active 클래스를 가진 것이 있으면, 그걸 닫아
							$_this_btn.eq(i).removeClass('active');
							$($_this_btn.eq(i).attr("data-target")).slideUp(150);
						}
					});				
					$this_btn.addClass('active');
					$target.slideDown(150);
				} //if-else 문 중 else
				
				// target 레이어 안에 버튼이 선택 되었을 때, 
					$target.find("button").one("click", function(i){
						$txt.val($(this).text());
						$this_btn.removeClass('active');
						$target.slideUp(150);
					});	//target 레이어 안에 글자가 선택 되었을 때,
					
				});		//레이어 오픈 버튼이 클릭 되었을 때 함수
			
			});	// 오픈 레이어 선택 함수
					
			$("#btnAirportConfirm").on("click", function(){
				// 출도착지 선택 후 확인 버튼 시, 설정되지 않은 값이 있으면 return 하여 다시 화면으로! 
	//			alert("HidDepValue :"+$("#hidDepValue").val()+ "  HidArrValue :"+$("hidArrValue").val());
				if($("#hidDepValue").val()==''){
					alert('출발지를 선택 해주세요 : )');
					$("#txtDepAirport").focus();
				return;
				}
				if($("#hidArrValue").val()==''){
					alert('도착지가 선택되지 않았어요 : (');
					$("#txtArrAirport").focus();
				return;
				}
				
				console.log("HidDepValue :"+$("#hidDepValue").val()+ "  HidArrValue :"+$("#hidArrValue").val());
				
				var $bookingJourney = $(".booking-journey");
				var $bookingDate = $(".booking-date");
				
				// 출도착지가 선택 되었으면 전달할 객체에 값을 저장하고 난 뒤, 날짜 정보를 선택한다. 
				jsBookConditionDataObject.TRIPTYPE=selectTripType;
				jsBookConditionDataObject.segmentDatas =[];
				
				var jsSegmentDataObject = new SegmentDataObject();
				jsSegmentDataObject.departureAirport = $("#hidDepValue").val();
				jsSegmentDataObject.arrivalAirport = $("#hidArrValue").val();
				// <= 여기 까지가 출도착지를 선택하고 난 뒤에 저장될 데이터 값
				console.log("jsSegmentDataObject : "+jsSegmentDataObject);
				jsBookConditionDataObject.segmentDatas.push(jsSegmentDataObject);
				
				//왕복 일정이면 출발지와 도착지를 바꾸어 저장
				if(selectTripType=='RT'){
					var jsSegmentDataObject = new SegmentDataObject();
					jsSegmentDataObject.departureAirport=$("#hidArrValue").val();
					jsSegmentDataObject.arrivalAirport=$("#hidDepValue").val();
					jsBookConditionDataObject.segmentDatas.push(jsSegmentDataObject);
				}
	
				// 1단계에서 저장된 데이터를 가지고 2단계 일정을 선택하러 함수 실행 
				console.log("jsBookConditionDataObject :"+jsBookConditionDataObject);
				fn_changeBookingStep("2", jsBookConditionDataObject);
				
				$bookingJourney.css("display","none");
				$bookingDate.css("display","block");
				
				
			});
			
			$("#btnDateConfirm").on("click",function(){
				var $bookingDate = $(".booking-date");
				var $bookingPassenger = $(".booking-passenger");
				
				jsBookConditionDataObject.segmentDatas[0].departureDataTime = $("#txtDepBookingDate").val();
				console.log("출발 날짜 : "+$("#txtDepBookingDate").val());
				if(selectTripType=='RT'){
					jsBookConditionDataObject.segmentDatas[1].departureDataTime = $("#txtArrBookingDate").val();
					console.log("도착 날짜 :"+$("#txtArrBookingDate").val());
				}
				
				fn_changeBookingStep("3", jsBookConditionDataObject);
					
				$bookingDate.css("display","none");
				$bookingPassenger.css("display","block");
			});
	
			/*
			 * 
			 * 	승객에 대한 정보 저장 객체	
			*	var PassengerDataObject = function(){
				this.passengerNo = ""; 	//승객 수 
				this.paxType = ""; //승객 탑승 종류 (성인, 소아, 유아)
				}
			 * 
			 * */
			
			$("#btnPaxCntConfirm").on("click", function(){
				var jsAdult = $("#txtSelAdtPaxCnt").val();
				var jsChd = $("#txtSelChdPaxCnt").val();
				var jsInf = $("#txtSelInfPaxCnt").val();
				
				if(jsAdult =='성인1'){jsAdult=1;}
				if(jsChd =='소아0'){jsChd=0;}
				if(jsInf=='유아0'){jsInf=0;}
				console.log("JsAdult :"+jsAdult+" JsChd :"+jsChd+"  JsInf :"+jsInf);
				
				if(jsAdult < jsChd){alert('유아 인원이 성인의 인원 보다 많습니다.'); return false;}
				
				console.log("jsBookConditionDataObject TRIPTYPE :"+jsBookConditionDataObject.TRIPTYPE);
				console.log("Dep : "+jsBookConditionDataObject.segmentDatas[0].departureAirport);
			
				var setPaxNo = 1; // 전체 탑승 인원 수 
				
				jsBookConditionDataObject.passengerDatas = []; //성인, 소아, 유아 
				
				var jsAdtPassengerData = new PassengerDataObject();
				jsAdtPassengerData.passengerNo = jsAdult;
				jsAdtPassengerData.paxType="ADT";
				console.log("paxType :"+jsAdtPassengerData.paxType);	
				jsBookConditionDataObject.passengerDatas.push(jsAdtPassengerData);
				
				if(jsChd > 0 ){
					var jsChdPassengerData = new PassengerDataObject();
					jsChdPassengerData.passengerNo=jsChd;
					jsChdPassengerData.paxType="CHD";
					jsBookConditionDataObject.passengerDatas.push(jsChdPassengerData);
				}
				
				if(jsInf > 0){
					var jsInfPassengerData = new PassengerDataObject();
					jsInfPassengerData.passengerNo = jsInf;
					jsInfPassengerData.paxType="INF";
					jsBookConditionDataObject.passengerDatas.push(jsInfPassengerData);
				}
				
				fn_changeBookingStep("4", jsBookConditionDataObject);
					
				goSelectSchedule(jsBookConditionDataObject);

			});
			

}); // document.ready 함수 끝 

/*var BookingInfo = function(){
	this.tripType = "";
	this.departureAirport="";
	this.departureDateTime="";
	this.arrivalAirport="";
	this.adtPaxCnt="";
	this.chdPaxCnt="";
	this.infPaxCnt="";
}*/

function goSelectSchedule(Object){
	var bookingInfo = new BookingInfo();
//	alert("d");
	bookingInfo.tripType = Object.TRIPTYPE;

	bookingInfo.departureAirport = Object.segmentDatas[0].departureAirport;
	bookingInfo.departureDateTime = Object.segmentDatas[0].departureDataTime;
	bookingInfo.arrivalAirport = Object.segmentDatas[0].arrivalAirport;
	bookingInfo.adtPaxCnt = Object.passengerDatas[0].passengerNo;
	bookingInfo.chdPaxCnt = 0;
	bookingInfo.infPaxCnt = 0;
//	alert(Object.passengerDatas[0].passengerNo);

	//생기지 않은 배열에 대한 인덱스는 먹히지 않음. 
	
	if(Object.passengerDatas.length == 2){
		// 성인외의 인원이 있을 때
		if(Object.passengerDatas[1].passengerNo > 0){
			//1번 인덱스의 인원 수가 1이상일 때, 
			if(Object.passengerDatas[1].paxType=='CHD'){
				//소아 이면
				bookingInfo.chdPaxCnt = Object.passengerDatas[1].passengerNo;
				bookingInfo.infPaxCnt = 0;
			}else if(Object.passengerDatas[1].paxType=='INF'){
				bookingInfo.infPaxCnt = Object.passengerDatas[1].passengerNo;
				bookingInfo.chdPaxCnt = 0;
			}
			

		}
	}else if(Object.passengerDatas.length == 3){
		bookingInfo.chdPaxCnt = Object.passengerDatas[1].passengerNo;
		bookingInfo.infPaxCnt = Object.passengerDatas[2].passengerNo;
	}

//	alert("d");
	
	$.ajax({
		type:"POST",
		url : "./Schedule.bo",
		dataType : "html",
		contextType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : { tripType : bookingInfo.tripType,
					  dep : bookingInfo.departureAirport,
				  depDate : bookingInfo.departureDateTime,
					  arr : bookingInfo.arrivalAirport,
					  adt : bookingInfo.adtPaxCnt,
					  chd : bookingInfo.chdPaxCnt,
					  inf : bookingInfo.infPaxCnt
				},
		success : function(data){
			
			$(".booking-wrap").html(data);
			ShowBookingCondition(bookingInfo);
	//		GoBook_04(ShowBooking);
		}
	});
};

function pop(){
	alert("dddd");
}
/*	Book_04.jsp 에 셋팅	*/

function ShowBookingCondition(data){
	alert("ShowBookingCondition");
	// 인원 수 
	var $txtAdult = $("#Summary_ADT");
	var $txtChild = $("#Summary_CHD");
	var $txtInfant = $("#Summary_INF");

	$txtAdult.text(data.adtPaxCnt);
	$txtChild.text(data.chdPaxCnt);
	$txtInfant.text(data.infPaxCnt);
}

function GoBook_04(data){
	return data;
}

function Cal_fu(){

	var d = new Date();
	var minDate = moment().format('YYYYMMDD'); //선택할 수 있는 제일 이른 날짜 : 오늘
	var maxDate = moment().add(323,'days').endOf('month').toDate();
	var range = 2;



		$("#bookingDatePicker").datepicker({
		minDate : moment().toDate(),
		maxDate : moment().add(323,'days').endOf('month').toDate(),
		numberOfMonths : 2,
		onSelect : function(valueDate,key){
		/* 			alert("key :"+$(this).attr("class") +" valueDate: "+valueDate); */
			var d = moment(valueDate).format("YYYY.MM.DD");
		//		alert(d);
			setDate(d, key);
		}
		});

		$(".booking-date-items-button").on("click", function(){
				var $this = $(this);
				var $target = $($(this).attr("data-target"));
				
				$("#bookingDatePicker").find("div").css("width","inherit");
		
				if($this.hasClass("active")){
					$this.removeClass("active");
					$target.slideUp(200);
				}else{
					$("#bookingDatePicker").find("div").css("width","inherit");
					$this.addClass("active");
					$target.slideDown(200);
				}
			
				$(".layer-close").on("click", function(){
					$this.removeClass("active");
					$target.slideUp(200);
				});
		
		});
}

var count=1;
		function setDate(d, key){
			/* 	alert(nowTripType);
			alert(d +"count :"+count); */
			if(count ==0)count=1;
			
			if(nowTripType=='RT'){
					if(count ==1){
						$("#txtDepBookingDate").val(d);
						$("#bookingDateLayer").slideUp(1);
						count++;
					}else if(count ==2 ){
							$("#txtArrBookingDate").val(d);
							$("#bookingDateLayer").slideUp(1);
							count = 0;
					}
			}else if(nowTripType=='OW'){
				$("#txtDepBookingDate").val(d);
				$("#bookingDateLayer").slideUp(1);
		}	
}

	

