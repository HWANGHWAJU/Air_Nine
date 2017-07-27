package air.schedule.action;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import air.nation.action.ActionForward;

public class JsonGoPassengerAction implements SJsonAction{

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
	
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json; charset=utf-8");
	
		String detailBookingCondition = (String)request.getParameter("detailBooking");
		String JsBookingCondition = (String)request.getParameter("jsDetailBooking");

		System.out.println(detailBookingCondition);
		System.out.println(JsBookingCondition);
		
		ActionForward forward = new ActionForward();
		forward.setRedirect(false);
		forward.setPath("./book_00_Main.jsp?book=book_05.jsp");
		
		request.setAttribute("JF",  detailBookingCondition);
		request.setAttribute("JSB",  JsBookingCondition);
		RequestDispatcher dispatcher = request.getRequestDispatcher(forward.getPath());
		dispatcher.forward(request, response);
		
	}

}
