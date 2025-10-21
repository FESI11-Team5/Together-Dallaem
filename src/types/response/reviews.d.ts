/**
 * CreateReviewRequest
 *
 * 서버에 새로운 리뷰를 등록할 때 사용하는 요청 바디의 타입입니다.
 * 이 타입은 클라이언트에서 API로 전송되는 형태와 일치해야 합니다.
 *
 * @interface CreateReviewRequest
 * @example
 * const payload: CreateReviewRequest = {
 *   gatheringId: 123,
 *   score: 5,
 *   comment: '정말 유익한 모임이었어요!'
 * };
 */
export interface CreateReviewRequest {
	/** 리뷰를 작성할 모임의 고유 ID */
	gatheringId: number;

	/** 리뷰 점수 (1 ~ 5) */
	score: number;

	/** 리뷰 내용(최대 길이나 포맷은 서버 규약에 따릅니다) */
	comment: string;
}

/**
 * ReviewResponse
 *
 * 서버에서 반환하는 단일 리뷰 객체의 타입입니다.
 * 이 타입은 API 응답에서 리뷰 항목 하나에 해당합니다.
 *
 * @interface ReviewResponse
 */
export interface ReviewResponse {
	/** 리뷰가 속한 팀 ID */
	teamId: number;

	/** 리뷰 고유 ID */
	id: number;

	/** 리뷰 점수 (1 ~ 5) */
	score: number;

	/** 리뷰 본문 */
	comment: string;

	/** 리뷰 작성 일시 (ISO 8601 포맷의 문자열) */
	createdAt: string;

	/** 리뷰가 작성된 모임의 요약 정보 */
	Gathering: ReviewGathering;

	/** 리뷰 작성자 정보 */
	User: ReviewUser;
}

/**
 * ReviewGathering
 *
 * 리뷰 응답 내에 포함되는 모임(간략) 정보입니다.
 */
export interface ReviewGathering {
	teamId: number;
	id: number;
	type: string;
	name: string;
	dateTime: string;
	location: string;
	image: string;
}

/**
 * ReviewUser
 *
 * 리뷰 작성자에 대한 간단한 정보 타입입니다.
 */
export interface ReviewUser {
	teamId: number;
	id: number;
	name: string;
	image: string;
}

/**
 * GetReviewsResponse
 *
 * 리뷰 목록 조회 API가 반환하는 페이징 응답 타입입니다.
 *
 * @interface GetReviewsResponse
 */
export interface GetReviewsResponse {
	/** 응답으로 반환된 리뷰 목록 */
	data: ReviewResponse[];
	/** 전체 리뷰 개수(페이징 계산용) */
	totalItemCount: number;
	/** 현재 페이지 인덱스 (1-base 혹은 API 규약에 따름) */
	currentPage: number;
	/** 전체 페이지 수 */
	totalPages: number;
}

export interface scoreData {
	teamId: number;
	gatheringId: number;
	type: string;
	averageScore: number;
	oneStar: number;
	twoStars: number;
	threeStars: number;
	fourStars: number;
	fiveStars: number;
}

export type scoreResponse = scoreData[];
