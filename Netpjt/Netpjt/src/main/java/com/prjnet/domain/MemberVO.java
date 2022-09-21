package com.prjnet.domain;

import java.io.Serializable;
import java.util.List;

import lombok.Data;


@Data
public class MemberVO implements Serializable {

	private static final long serialVersionUID = 20L;
	
	private String id;
	private String pw;
	private String name;
	private int age;
	private String enabled;
	
	private List<AuthVO> authList; 
}
