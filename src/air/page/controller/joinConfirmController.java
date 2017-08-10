package air.page.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Jdbc.Connection.ConnectionProvider;
import dao.MemberDAO;
import dto.memberDTO;


@WebServlet("/joinConfirmController.bo")
public class joinConfirmController extends HttpServlet {
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			doProcess(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	     try {
			doProcess(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
    protected void doProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, SQLException {
		
    	//�ѱ�ó��
    	request.setCharacterEncoding("UTF-8");
    	
    	//id�� ���޹ޱ�
//    	String member_id = request.getParameter("member_id");
    	String member_id = (String)request.getAttribute("member_id");
    	System.out.println("member_id:"+member_id);
    	
    	//DB�۾� DAO��ü ����
    	MemberDAO mdao = new MemberDAO();
    	try(Connection conn = ConnectionProvider.getConnection()){
    	// ��������(����,�̸�)�� ������ �޼ҵ� 
        memberDTO mdto = mdao.joinConfirm(conn, member_id);
        
        /* request���� ��� */
        // ����,���̵� �����ϰ��ִ� memberDTO��ü�� request������ ���
        request.setAttribute("mdto", mdto);
//        System.out.println(mdto.getMember_id());
//        System.out.println(mdto.getMember_kor());
    	}
        /* View�� ���� */
        // Join_03.jsp�������� �̵��ϸ鼭 request���� ����
        RequestDispatcher dis = request.getRequestDispatcher("./Join_03.jsp");
        dis.forward(request, response);
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
	}

}
