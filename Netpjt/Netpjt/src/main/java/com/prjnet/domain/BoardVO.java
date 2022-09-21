package com.prjnet.domain;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BoardVO implements Serializable {

	private static final long serialVersionUID = 10L;
	
	private int bno;
	private String title;
	private String content;
	private String category;
	private String image;
	private String id;
	
	private String keyword;
	
	private MultipartFile uploadFile;
}
