import { Gathering } from './response/gatherings';

/**
 * 리뷰 조회를 위한 쿼리 파라미터들
 *
 * 모든 필드는 선택 사항이며, 값이 존재하면 쿼리 스트링으로 직렬화되어 요청에 포함됩니다.
 * 후에 상의 후 types 폴더로 이동할 수 있습니다.
 */
interface GetReviewsParams {
	/** 모임 ID로 필터링 (optional) */
	gatheringId?: number;

	/** 사용자 ID로 필터링 (optional) */
	userId?: number;

	/** 모임 종류로 필터링 */
	type?: GatheringType;

	/** 모임 위치로 필터링 */
	location?: GatheringLocation;

	/** 모임 날짜 (YYYY-MM-DD 형식) */
	date?: string;

	/** 모집 마감 날짜 (YYYY-MM-DD 형식) */
	registrationEnd?: string;

	/** 정렬 기준 */
	sortBy?: 'createdAt' | 'score' | 'participantCount';

	/** 정렬 순서 */
	sortOrder?: 'asc' | 'desc';

	/** 한 번에 조회할 리뷰 수 (기본값: 10) */
	limit?: number;

	/** 조회 시작 위치 (기본값: 0) */
	offset?: number;
}

export interface ReviewScoreParams {
	gatheringId?: string;
	type?: GatheringType;
}
