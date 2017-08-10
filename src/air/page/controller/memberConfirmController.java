package air.page.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Jdbc.Connection.ConnectionProvider;
import dao.MemberDAO;
import dto.memberDTO;


/* Join_02.jsp���������� ȸ�����Ե� ������ ���޹޴� ���� */
@WebServlet("/memberConfirmController.bo")
public class memberConfirmController extends HttpServlet {
 

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		try {
			requestpro(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		try {
			requestpro(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	protected void requestpro(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException, SQLException {
		
				request.setCharacterEncoding("UTF-8");
				System.out.println("id :"+request.getParameter("member_id"));
				
		
				String id = request.getParameter("member_id"); 
	
				MemberDAO mdao = new MemberDAO();
				try(Connection conn = ConnectionProvider.getConnection()){
		
				Vector<memberDTO> v = mdao.getMember(conn, id);
				
		
				request.setAttribute("v", v);
				}
				
				RequestDispatcher dis = request.getRequestDispatcher("./join_04Confirm.jsp");
				dis.forward(request, response);
				
				
				
		
	}

}
