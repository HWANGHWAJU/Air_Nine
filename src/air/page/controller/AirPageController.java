package air.page.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import air.page.action.Action;
import air.page.action.ActionForward;
import air.page.action.MemberLogoutAction;
import air.page.action.MypagestapmAction;
import air.page.action.WeatherAction;
import air.schedule.action.JsonDepArrivalLookupAction;
import air.schedule.action.JsonGoAdditionalChoiceAction;
import air.schedule.action.JsonGoPassengerAction;
import air.schedule.action.JsonGoPayAndReservateAction;
import air.schedule.action.JsonGoPaymentPageAction;
import air.schedule.action.JsonScheduleAction;
import air.schedule.action.JsonScheduleLookupAction;
import air.schedule.action.SAction;
import air.schedule.action.SJsonAction;
import air.schedule.action.ScheduleAction;
import dto.LoginUser;

public class AirPageController extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet{
	
	private void doProcess(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		request.setCharacterEncoding("utf-8");
		
		String RequestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		String command = RequestURI.substring(contextPath.length());
		
		ActionForward forward = null;
		Action action = null;

		System.out.println("*****************************************************");
		System.out.println("RequestURI : "+RequestURI);
		System.out.println("ContextPath :"+contextPath);
		System.out.println("Command : "+command);
		System.out.println("*****************************************************");
		
		if(command.equals("/mainIndex.bo")){
			System.out.println("=================컨트롤러탐");
			WeatherAction weatherAction = new WeatherAction(); // 날씨 파싱 객체 생성
			weatherAction.execute(request, response); // 날씨 파싱 호출
			//메인 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Main_Index.jsp");
			System.out.println(" AirPageController ");
			
		}else if(command.equals("/LoginJoin.bo")){	// 로그인 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Main_Index.jsp?page=member/01_LoginMain.jsp");
		}
		else if(command.equals("/JoinView.bo")){	// 회원 가입 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Main_Index.jsp?page=member/Join_01.jsp");
			////////////////////////////////////////////////////////////////////////////////////////////////////////////ㅇㅇ
		}else if (command.equals("/MemberLogout.bo")) {		
			

			action = new MemberLogoutAction();
			
			try {		

				forward = action.execute(request, response);
								
			} catch (Exception e) {
				e.printStackTrace();
			}			
			
		
	
		}else if (command.equals("/MemberModify.bo")) {
			String id= (String)request.getParameter("member_id");
			System.out.println("In Controller, Requesting Member ID : "+ id);
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("/memberConfirmController.bo");
		

		}else if (command.equals("/joinConfirm.bo")) {

			String id = (String)request.getAttribute("member_id");
			System.out.println("controller id:"+id);
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("/joinConfirmController.bo");
			
		}
		
		
		else if(command.equals("/viewReservationList.bo")){	//예약 조회 변경 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Main_Index.jsp?page=reservation/viewReser_CheckInList.jsp");
		}else if(command.equals("/viewCheckInList.bo")){	// 온라인 체크 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./viewReser_0_Main.jsp?res=viewReser_CheckInList.jsp"); 
		}
		
		else if(command.equals("/Info_FlightMain.bo")){	//서비스 안내 메인 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp");
		}else if(command.equals("/Info_reservation.bo")){	// 예매 안내 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=Info_reservation.jsp");
		}else if(command.equals("/Info_vat.bo")){ // 수수료 안내 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=Info_vat.jsp");
		}else if(command.equals("/Info_arrival.bo")){ // 출도착 정보 조회
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=Info_arrival.jsp");
		}else if(command.equals("/Info_schedule.bo")){ //노선별 조회 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=Info_schedule.jsp"); 
		}else if(command.equals("/Info_seat.bo")){
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=Info_Seat.jsp"); 
		}else if(command.equals("/Info_map.bo")){ //항공기 노선도 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=Info_map.jsp");
			
		}else if(command.equals("/Info_booking.bo")){ //노선별 조회 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Info_0_FlightMain.jsp?Info=info_booking.jsp"); 
		}
		
		
		
		else if(command.equals("/Event_Main.bo")){ // 이벤트 메인 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Event_0_Main.jsp");
		}else if(command.equals("/Event_ing.bo")){ // 현재 진행 중인 이벤트 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Event_0_Main.jsp?event=Event_ingEvent.jsp");
		}else if(command.equals("/Event_end.bo")){ // 지난 이벤트 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Event_0_Main.jsp?event=Event_endEvent.jsp");
		}else if(command.equals("/Event_specialprice.bo")){ //특가 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Event_0_Main.jsp?event=Event_specialPrice.jsp");
		}
		
		else if(command.equals("/Opt_Main.bo")){	// <서비스 안내> 섹션 중 부가 서비스 안내 메인 페이지로 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp");
		}
		else if(command.equals("/Opt_advance.bo")){	// 사전 좌석 정보 페이지 이동
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp?opt=Opt_seats.jsp");
		}else if(command.equals("/Opt_overbaggage.bo")){	// 초과 수하물 안내 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp?opt=Opt_baggage.jsp");
		}else if(command.equals("/Opt_meals.bo")){	//사전 기내식 안내 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp?opt=Opt_meals.jsp");
		}else if(command.equals("/Opt_duty.bo")){	// 면세점 안내 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp?opt=Opt_dutyfree.jsp");
		}else if(command.equals("/Opt_cafe.bo")){	// 항공기 내 카페에 대한 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp?opt=Opt_cafe.jsp");
		}else if(command.equals("/Opt_packaging.bo")){	// 공항 포장 용품 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Opt_0_Main.jsp?opt=Opt_packaging.jsp");
		}
		
		else if(command.equals("/viewBooking.bo")){	// 예약 메인 페이지로 이동	
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./book_00_Main.jsp?book=book_01.jsp");
		}else if(command.equals("/Schedule.bo")){
			SAction saction = new ScheduleAction();
			saction.execute(request, response);
			System.out.println("호엣");
		}else if(command.equals("/Gobooking.bo")){
			SJsonAction sjaction = new JsonScheduleAction();
			sjaction.execute(request, response);
			System.out.println(" 뀨 ");
		}else if(command.equals("/GoPassengerInfoView.bo")){
			SJsonAction sjaction = new JsonGoPassengerAction();
			sjaction.execute(request, response);
		}else if(command.equals("/GoBook06.bo")){
			SJsonAction sjaction = new JsonGoAdditionalChoiceAction();
			sjaction.execute(request, response);
		}else if(command.equals("/GoPaymentPage.bo")){
			SJsonAction sjaction = new JsonGoPaymentPageAction();
			sjaction.execute(request, response);
		}else if(command.equals("/GoReservationAndPay.bo")){
			SJsonAction sjaction =  new JsonGoPayAndReservateAction();
			sjaction.execute(request, response);
		}
		
	/*		민정, 추가			*/	
/*		else if(command.equals("/Schedule.bo")){
		forward = new ActionForward();
		forward.setRedirect(false);
		forward.setPath("./book_04.jsp");
	}*/
		
		else if(command.equals("/Company.bo")){	// 회사 소개 페이지 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Company_0_Main.jsp");
		}else if(command.equals("/Company_ceo.bo")){	// ceo 소개 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Company_0_Main.jsp?com=Company_ceo.jsp");
		}else if(command.equals("/Company_philo.bo")){	// 회사 철학
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Company_0_Main.jsp?com=Company_philosophy.jsp");
		}else if(command.equals("/Company_CI.bo")){	 //회사 CI 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Company_0_Main.jsp?com=Company_CI.jsp");
		}else if(command.equals("/Company_hang.bo")){ //회사의 항공기 정보
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Company_0_Main.jsp?com=Company_hang.jsp");
		}
		
		else if(command.equals("/Mypage.bo")){ //회사의 항공기 정보

			action = new MypagestapmAction();

			try {
				forward = action.execute(request, response);
				forward.setRedirect(false);
				forward.getPath();
			} catch (Exception e) {
				System.out.println();
			}
		}
		
		
		else if(command.equals("/scheduleLookup.bo")){
			SJsonAction jsonaction= new JsonScheduleLookupAction();
			jsonaction.execute(request, response);
		}else if(command.equals("/depArrivalLookup.bo")){
			SJsonAction jsonaction = new JsonDepArrivalLookupAction();
			jsonaction.execute(request, response);
		}
		
		
		
		
		
		
		
	if(forward != null){
		if(forward.isRedirect()){
			response.sendRedirect(forward.getPath());
		} else {
			RequestDispatcher dispatcher = request.getRequestDispatcher(forward.getPath());	
			System.out.println("dispatcher 생성 :"+forward.getPath());
			dispatcher.forward(request, response);
		}
	}
		
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		try {
			doProcess(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		try {
			doProcess(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
