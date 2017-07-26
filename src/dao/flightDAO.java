package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import dto.flightschedule;

public class flightDAO {

	PreparedStatement pstmt;
	ResultSet rs;

	public Vector<flightschedule> getFlightScheduleList(Connection conn, String flightschedule_dep, String flightschedule_arr) {

		Vector<flightschedule> v = new Vector<flightschedule>();

		flightschedule ttable = null;

		try {

			String sql = "select t.plane_seat_flight_name,t.flightschedule_dep_time,t.flightschedule_arr_time,r.route_baseprice,t.flightschedule_dep,t.flightschedule_arr"
					+ " from flightschedule t inner join route r" + " on t.route_number = r.route_number"
					+ " where t.flightschedule_dep=? and t.flightschedule_arr=? order by t.flightschedule_dep_time asc";

			pstmt = conn.prepareStatement(sql);


			pstmt.setString(1, flightschedule_dep);
			pstmt.setString(2, flightschedule_arr);

			rs = pstmt.executeQuery();

			while (rs.next()) {

				ttable = new flightschedule();

				ttable.setPlane_seat_flight_name(rs.getString(1));// �װ����
				ttable.setFlightschedule_dep_time(rs.getTime(2));// ��߽ð�
				ttable.setFlightschedule_arr_time(rs.getTime(3));// �����ð�
				ttable.setRoute_baseprice(rs.getInt(4));// �⺻���
				ttable.setFlightschedule_dep(rs.getString(5)); // �����
				ttable.setFlightschedule_arr(rs.getString(6));// ������

				ttable.setSale_price(getSalePrice(rs.getTime(2), rs.getInt(4)));
				System.out.println(ttable.getSale_price());
				v.add(ttable);
			}

		} catch (Exception e) {
			System.out.println("getFlightScheduleList 에서 오류: " + e);
		} finally {
		
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return v;
	}
	
	@SuppressWarnings("deprecation")
	public int getSalePrice(Time t, int base){
		double price = base;
		int depTime = t.getHours();
		
		if(depTime >= 20){
			price = base*0.7;
		}else if(depTime <= 7){
			price = base*0.8;
		}
		return (int)price;
	}


	public Vector<flightschedule> getFlightScheduleRound(Connection conn, String flightschedule_arr, String flightschedule_dep) {

		Vector<flightschedule> vec = new Vector<flightschedule>();

		flightschedule ttable = null;

		try {
			String sql = "select t.plane_seat_flight_name,t.flightschedule_dep_time,t.flightschedule_arr_time,r.route_baseprice,t.flightschedule_dep,t.flightschedule_arr"
					+ " from flightschedule t inner join route r" + " on t.route_number = r.route_number"
					+ " where t.flightschedule_dep=? and t.flightschedule_arr=? order by t.flightschedule_dep_time asc";

			pstmt = conn.prepareStatement(sql);

			// ��� ���� �� ����
			pstmt.setString(1, flightschedule_arr);
			pstmt.setString(2, flightschedule_dep);

			rs = pstmt.executeQuery();

			while (rs.next()) {

				ttable = new flightschedule();

				ttable.setPlane_seat_flight_name(rs.getString(1));// �װ����
				ttable.setFlightschedule_dep_time(rs.getTime(2));// ��߽ð�
				ttable.setFlightschedule_arr_time(rs.getTime(3));// �����ð�
				ttable.setRoute_baseprice(rs.getInt(4));// �⺻���
				ttable.setFlightschedule_dep(rs.getString(5)); // �����
				ttable.setFlightschedule_arr(rs.getString(6));// ������

				
				ttable.setSale_price(getSalePrice(rs.getTime(2), rs.getInt(4)));
				System.out.println(ttable.getSale_price());
				
				vec.add(ttable);
			}

		} catch (Exception e) {
			System.out.println("getFlightScheduleList 에서 오류: " + e);
		} finally {
	
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return vec;
	}
}

	
	


