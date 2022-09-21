package com.prjnet.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.prjnet.domain.BoardVO;
import com.prjnet.service.BoardService;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/board/*")
@Controller
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	@GetMapping("/main")
	public String getBoardList(Model model, HttpSession session) {	//목록 보기
		List<BoardVO> boardList = service.getBoardList();
		String id = (String)session.getAttribute("sessionId");
		model.addAttribute("boardList",boardList);
		model.addAttribute("id",id);
		return "/board/main";
	}
	
	
	@RequestMapping(value="/boardView", produces="application/text; charset=UTF-8")
	@ResponseBody
	public String getBoard(int bno) {
		BoardVO board = service.getBoard(bno);
		return board.getTitle() + "/" + board.getContent() +"/" + board.getCategory() + "/" + board.getImage() + "/" + board.getBno();
	}
	
	
	@GetMapping("/insertBoard")
	@PreAuthorize("isAuthenticated()")
	public String insertBoard() {
		return "/board/insertBoard";
	}
	
	@PostMapping("/insertBoard")
	@PreAuthorize("isAuthenticated()")
	public String insertBoard(BoardVO vo) throws IllegalStateException, IOException {
		//파일 업로드 처리
		MultipartFile uploadFile = vo.getUploadFile();
		if(!uploadFile.isEmpty()) {
			String fileName = uploadFile.getOriginalFilename();
			String filePath = "C:/dev/spring Work/Netpjt/src/main/webapp/resources/upload/";
			uploadFile.transferTo(new File(filePath + fileName));
			vo.setImage(fileName);
		}
		service.insert(vo);
		return "redirect:/board/main";
	}
	
	@GetMapping("/delete")
	public String deleteBoard(BoardVO vo) {
		service.delete(vo);
		return "redirect:/board/main";
	}
	
	//검색 결과 페이지
	@RequestMapping("/searchResult")
	@PreAuthorize("isAuthenticated()")
	public String getSearchResult(Model model, String keyword) {	//목록 보기
		List<BoardVO> boardList = service.searchedBoardList(keyword);
		
		log.info("");
		
		model.addAttribute("boardList", boardList);
		return "/board/searchResult";
	}
}
