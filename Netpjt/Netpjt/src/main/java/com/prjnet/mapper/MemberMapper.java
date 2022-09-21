package com.prjnet.mapper;

import com.prjnet.domain.MemberVO;

public interface MemberMapper {
	
	//회원 조회
	public MemberVO read(String userid);
	
	//회원 가입
	public void insertMember(MemberVO member);
	
	//회원 탈퇴
	public void deleteMember(MemberVO member);

	//회원 수정
	public void updateMember(MemberVO member);
	
	//ID 중복 검사
	public int checkID(String userid);
}
