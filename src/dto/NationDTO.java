package dto;

public class NationDTO {
	private Integer nation_uni_number;
	private String nation_kor;
	private String nation_eng;
	
	public NationDTO(){}
	
	public Integer getNation_uni_number() {
		return nation_uni_number;
	}
	public void setNation_uni_number(Integer nation_uni_number) {
		this.nation_uni_number = nation_uni_number;
	}
	public String getNation_kor() {
		return nation_kor;
	}
	public void setNation_kor(String nation_kor) {
		this.nation_kor = nation_kor;
	}
	public String getNation_eng() {
		return nation_eng;
	}
	public void setNation_eng(String nation_eng) {
		this.nation_eng = nation_eng;
	}


}
