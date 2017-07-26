package air.nation.Controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import air.nation.action.Action;
import air.nation.action.ActionForward;
import air.nation.action.JsonArrNationAction;
import air.nation.action.JsonNationAction;


public class Nationcontroller extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet{
	
	private void doProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, Exception{
		
		request.setCharacterEncoding("utf-8");
		System.out.println("들어옴 Controller");

		String RequestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		String command = RequestURI.substring(contextPath.length());
		
		System.out.println(command);
		
		ActionForward forward = null;
		
		if(command.equals("/view.na")){ 
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./AirNation.jsp");
		}else if(command.equals("/searchDep.na")){
			JsonNationAction action = new JsonNationAction();
			action.execute(request, response);
		}else if(command.equals("/searchArr.na")){
			JsonArrNationAction action = new JsonArrNationAction();
			action.execute(request,response);
		}
	
		
		if(forward!=null){
			if(forward.isRedirect()){
				response.sendRedirect(forward.getPath());
			}else{
				RequestDispatcher dispatcher = request.getRequestDispatcher(forward.getPath());
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
