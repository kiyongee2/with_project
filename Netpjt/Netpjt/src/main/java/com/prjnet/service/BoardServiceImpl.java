package com.prjnet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prjnet.domain.BoardVO;
import com.prjnet.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper mapper;
	
	@Override
	public void insert(BoardVO vo) {	//글쓰기
		mapper.insert(vo);
	}

	@Override
	public List<BoardVO> getBoardList() {		//목록 보기
		return mapper.getBoardList();
	}

	@Override
	public BoardVO getBoard(int bno) {		//상세 보기
		return mapper.getBoard(bno);
	}

	@Override
	public void delete(BoardVO vo) {	//삭제
		mapper.delete(vo);
		
	}

	@Override
	public void updatge(BoardVO vo) {		//수정
		mapper.updatge(vo);
		
	}

	@Override
	public List<BoardVO> searchedBoardList(String keyword) {
		return mapper.searchedBoardList(keyword);
	}


}
