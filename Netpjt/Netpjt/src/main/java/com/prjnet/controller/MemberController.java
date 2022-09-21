package com.prjnet.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.prjnet.domain.MemberVO;
import com.prjnet.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;


@AllArgsConstructor
@Log4j
@Controller
@RequestMapping("/member/*")
public class MemberController {
	
	private MemberService service;
	
	//회원 가입 폼 요청
	@GetMapping("/join")
	public void signUp() {
		log.info("회원 가입 폼");
	}
	
	@PostMapping("/join")
	public String signUp(MemberVO member) {
		service.signup(member);
		return "redirect:/customLogin";
	}
	
	@GetMapping("/memberView")
	public String read(String id, Model model) {
		MemberVO member = service.read(id);
		model.addAttribute("member",member);
		return "/member/memberView";
	}
	
	//회원 삭제
	@GetMapping("/delete")
	public String delete(MemberVO member, HttpSession session) {
		service.delete(member);
		session.invalidate();
		return "redirect:/";
	}
	
	//회원 수정
	@PostMapping("/update")
	public String update(MemberVO member) {
		service.update(member);
		return "redirect:/board/main";
	}
	
	@GetMapping("/checkID")
	@ResponseBody
	public int checkID(String id) {
		int result = service.checkID(id);
		return result;
	}
}
