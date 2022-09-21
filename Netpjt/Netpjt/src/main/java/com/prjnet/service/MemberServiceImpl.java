package com.prjnet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prjnet.domain.AuthVO;
import com.prjnet.domain.MemberVO;
import com.prjnet.mapper.MemberAuthMapper;
import com.prjnet.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberMapper mapper;
	
	@Autowired
	private MemberAuthMapper authMapper;
	
	@Autowired
	private PasswordEncoder pwencoder;
	
	@Override
	public void signup(MemberVO member) {
		//비밀번호 암호화
		String encPw = pwencoder.encode(member.getPw());
		member.setPw(encPw);
		
		//나이 구하기
		/*		Calendar current = Calendar.getInstance();
		
		int currentYear  = current.get(Calendar.YEAR);
		int currentMonth = current.get(Calendar.MONTH) + 1;
		int currentDay   = current.get(Calendar.DAY_OF_MONTH);
		
		int age = currentYear - birthYear;
		if (birthMonth * 100 + birthDay > currentMonth * 100 + currentDay) {
			age--;
		}
		member.setAge(age);*/
		
		
		mapper.insertMember(member);
		
		//기본 role 부여
		AuthVO auth = new AuthVO();
		auth.setId(member.getId());
		auth.setAuth("MEMBER");
		authMapper.insertMemberAuth(auth);
	}

	@Override
	public MemberVO read(String id) {
		return mapper.read(id);
	}

	@Override
	public void delete(MemberVO member) {
		mapper.deleteMember(member);
		
	}

	@Override
	public void update(MemberVO member) {
		//비밀번호 암호화
		String encPw = pwencoder.encode(member.getPw());
		member.setPw(encPw);
		
		mapper.updateMember(member);
	}

	@Override
	public int checkID(String id) {
		return mapper.checkID(id);
	}


}
