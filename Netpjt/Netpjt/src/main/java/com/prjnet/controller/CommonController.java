package com.prjnet.controller;

import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class CommonController {
	
	@GetMapping("/accessError")
	public void accessDenied(Authentication auth, Model model) {
		log.info("access Denied : " + auth);
		model.addAttribute("msg", "해당 메뉴는 관리자에게만 제공됩니다.");
	}
	
	//로그인
	@GetMapping("/customLogin")
	public void login(String error, Model model) {
		
		if(error != null) {
			model.addAttribute("error", "Login Error Check Your Account");
		}
		
	}
	
	//로그아웃
	@GetMapping("/customLogout")
	public String logout(HttpSession session) {
		log.info("custom logout");
		session.invalidate();
		
		return "redirect:/";
	}
	
}
