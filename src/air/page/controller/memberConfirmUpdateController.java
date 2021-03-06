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


/* ȸ������ ���������� join_04Confirm.jsp����...
 * ȸ������ ������ ������ ���޹޾Ƽ� ����ó���ϴ� ����
   */
@WebServlet("/memberConfirmUpdateController.do")
public class memberConfirmUpdateController extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		try {
			doProcess(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		try {
			doProcess(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	// doGet, doPost ������� �����Ͱ� �Ѿ���� ��� doProcess�޼ҵ忡�� ó��
	protected void doProcess(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException, SQLException {
		
		request.setCharacterEncoding("utf-8");
		
		// ȸ������ ����������(join_04Confirm.jsp)���޹��� ȸ�����������͸� request�������� �����ͼ� dto�� ����
		memberDTO mdto = new memberDTO();
		
		System.out.println("==============Modify Controller ==============");
		
		System.out.println("Member Phone :"+request.getParameter("member_phone"));
		System.out.println("Member �ѱ� �̸� :"+request.getParameter("member_kor"));
		System.out.println("Member �̸� :"+request.getParameter("member_eng_firstname"));
		System.out.println("Member �� :"+request.getParameter("member_eng_lastname"));
		System.out.println("Member ���� :"+request.getParameter("member_gender"));
		System.out.println("Member ���� :"+request.getParameter("member_birthdate"));
		System.out.println("Member ���� :"+request.getParameter("member_nationality"));
		System.out.println("Member ���ֱ��� :"+request.getParameter("member_livenationality"));
		System.out.println("Member ���ŵ��� :"+request.getParameter("member_addinfo"));
		
		
		mdto.setMember_id(request.getParameter("member_id")); //���̵�
		mdto.setMember_kor(request.getParameter("member_kor")); //�ѱۼ���
		mdto.setMember_eng_firstname(request.getParameter("member_eng_firstname")); //�����̸� first
		mdto.setMember_eng_lastname(request.getParameter("member_eng_lastname")); //�����̸� last
		mdto.setMember_gender(request.getParameter("member_gender")); //����
		mdto.setMember_birthdate(request.getParameter("member_birthdate")); //�������
		mdto.setMember_nationality(request.getParameter("member_nationality")); //����
		mdto.setMember_livenationality(request.getParameter("member_livenationality")); //���ֱ���
		mdto.setMember_phone(request.getParameter("member_phone")); //�޴�����ȣ
		mdto.setMember_email(request.getParameter("member_email")); //�̸���
		mdto.setMember_addinfo(request.getParameter("member_addinfo")); //�ΰ�����
		
		
		System.out.println("==============After DTO Setter ==============");
		
		System.out.println("Member Phone :"+mdto.getMember_phone());
		System.out.println("Member �ѱ� �̸� :"+mdto.getMember_kor());
		System.out.println("Member �̸� :"+mdto.getMember_eng_lastname());
		System.out.println("Member �� :"+mdto.getMember_eng_firstname());
		System.out.println("Member ���� :"+mdto.getMember_gender());
		System.out.println("Member ���� :"+mdto.getMember_birthdate());
		System.out.println("Member ���� :"+mdto.getMember_nationality());
		System.out.println("Member ���ֱ��� :"+mdto.getMember_livenationality());
		System.out.println("Member ���ŵ��� :"+mdto.getMember_addinfo());
			
		
		// update�۾��� �޼ҵ带 �������ִ� DAO��ü ����
		MemberDAO mdao = new MemberDAO();
	try(Connection conn = ConnectionProvider.getConnection()){	
		mdao.memberModify(conn, mdto); // ���� �޼ҵ� ȣ��� ��ü �����Ͽ� ����!!!
	}
		// ���� ������ .. ����ȭ�� 0_mainIndex.jsp ȭ������ �̵�
		RequestDispatcher dis = request.getRequestDispatcher("Main.bo");
		
		dis.forward(request, response);
		
		
		
		
		
		
	}

}
