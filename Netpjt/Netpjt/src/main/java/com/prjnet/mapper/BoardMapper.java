package com.prjnet.mapper;

import java.util.List;

import com.prjnet.domain.BoardVO;

public interface BoardMapper {
	public void insert(BoardVO vo);		//콘텐츠 게시
	
	public List<BoardVO> getBoardList();		//콘텐츠 목록
	
	public BoardVO getBoard(int bno);		//상세 보기
	
	public void delete(BoardVO vo);		//콘텐츠 삭제
	
	public void updatge(BoardVO vo);	//콘텐츠 수정
	
	public List<BoardVO> searchedBoardList(String keyword);		//검색된 콘텐츠
	
	
}
