package com.prjnet.domain;

import java.io.Serializable;

import lombok.Data;

@Data
public class AuthVO implements Serializable {

	private static final long serialVersionUID = 30L;
	
	private String id;
	private String auth;
}
