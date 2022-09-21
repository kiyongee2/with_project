package com.prjnet.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.log4j.Log4j;

@Log4j
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication auth) throws IOException, ServletException {
		log.warn("login Success");
		
		List<String> roleNames = new ArrayList<>();
		
		auth.getAuthorities().forEach(authority -> {
			roleNames.add(authority.getAuthority());	//ROLE_ADMIN, ROLE_MEMBER 저장
		});
		log.warn("ROLE NAMES: " + roleNames);
		
		if(roleNames.contains("ADMIN")) {
			response.sendRedirect("/board/main");
			return;
		}
		
		if(roleNames.contains("MEMBER")) {
			response.sendRedirect("/board/main");
			return;
		}
	}
	
}
