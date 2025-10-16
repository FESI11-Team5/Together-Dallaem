import { Gathering } from './gatherings';
import { UserInfo } from './user';

/**
 * 리뷰 생성 요청 데이터
 * 서버에 리뷰를 등록할 때 사용
 */
export interface CreateReviewRequest {
	/** 리뷰를 작성할 모임 ID */
	gatheringId: number;

	/** 리뷰 점수 (1~5) */
	score: number;

	/** 리뷰 내용 */
	comment: string;
}

/**
 * 리뷰 정보 (단일 리뷰 객체)
 * 서버에서 내려오는 리뷰 데이터 구조
 */
export interface Review {
	/** 리뷰가 속한 팀 ID */
	teamId: number;

	/** 리뷰 ID */
	id: number;

	/** 점수 (1~5) */
	score: number;

	/** 리뷰 내용 */
	comment: string;

	/** 작성일시 (ISO 8601 문자열, 예: "2025-10-16T14:00:00Z") */
	createdAt: string;

	/** 리뷰가 작성된 모임 정보 */
	gathering: Gathering;

	/** 리뷰 작성자 정보 */
	user: UserInfo;
}

/**
 * 리뷰 리스트 조회 API 응답 타입
 */
export interface GetReviewsResponse {
	/** 리뷰 목록 */
	data: Review[];
	/** 전체 리뷰 개수 */
	totalItemCount: number;
	/** 현재 페이지 */
	currentPage: number;
	/** 전체 페이지 수 */
	totalPages: number;
}
