package air.member.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import air.member.action.JoinAction;
import air.member.action.MemberLoginAction;
import air.page.action.Action;
import air.page.action.ActionForward;
import dto.LoginUser;

public class MemberController extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet{
	private void doProcess(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		request.setCharacterEncoding("utf-8");
		
		String RequestURI = request.getRequestURI();
		String contextPath = request.getContextPath();
		String command = RequestURI.substring(contextPath.length());
		
		ActionForward forward = null;
		Action action = null;
		System.out.println("*****************************************************");
		
		HttpSession sess = request.getSession();
		LoginUser user = (LoginUser) sess.getAttribute("User");
		
		if(user != null){
			System.out.println("User ID :"+user.getMember_id());
		}
		
		System.out.println("Session : "+sess);
		
		
		
		System.out.println("*************** In Member Controller *************");
		
		
		System.out.println("RequestURI : "+RequestURI);
		System.out.println("ContextPath :"+contextPath);
		System.out.println("Command : "+command);
		System.out.println("*************** In Member Controller *************");
		
		if(command.equals("/JoinView.me")){
			forward = new ActionForward();
			forward.setRedirect(false);
			forward.setPath("./Join_02.jsp");
		}else if(command.equals("/MemberJoin.me")){
			action = new JoinAction();
			forward = action.execute(request, response);
		}else if(command.equals("/MemberLoginAction.me")){
			action = new MemberLoginAction();
			forward = action.execute(request, response);
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
