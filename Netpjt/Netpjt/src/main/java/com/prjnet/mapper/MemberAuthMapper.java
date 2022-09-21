package com.prjnet.mapper;

import com.prjnet.domain.AuthVO;

public interface MemberAuthMapper {
	
	//회원 가입(권한 부여)
	public void insertMemberAuth(AuthVO auth);
}
