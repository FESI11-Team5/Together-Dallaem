import { getRequest, postRequest } from '@/apis';
import { CreateReviewRequest, GetReviewsResponse } from '@/types/response/reviews';

/**
 * 리뷰 관련 API 엔드포인트 경로
 * @constant {string}
 */
const REVIEWS_PATH = '/reviews';

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
	type?: 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

	/** 모임 위치로 필터링 */
	location?: '건대입구' | '을지로3가' | '신림' | '홍대입구';

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

/**
 * 서버에서 리뷰 목록을 조회합니다.
 *
 * 전달된 파라미터는 쿼리 문자열로 직렬화됩니다.
 * @param {GetReviewsParams} params - 조회 필터 및 페이징/정렬 옵션
 * @returns {Promise<GetReviewsResponse>} 페이징된 리뷰 목록 응답
 * @example
 * const res = await getReviews({ userId: 123, limit: 10 });
 */
export const getReviews = async (params: GetReviewsParams): Promise<GetReviewsResponse> => {
	const query = new URLSearchParams();

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				query.append(key, String(value));
			}
		});
	}

	const queryString = query.toString() ? `?${query.toString()}` : '';

	return getRequest({
		path: `${REVIEWS_PATH}${queryString}`
	});
};

/**
 * 팀 모임에 대한 리뷰를 추가합니다.
 *
 * 이 요청은 인증이 필요하므로 내부적으로 withAuth 옵션을 사용합니다.
 *
 * @param {CreateReviewRequest} reviewData - 리뷰 생성에 필요한 정보
 * @returns {Promise<any>} 서버에서 반환하는 생성 결과
 * @example
 * await postReviews({ gatheringId: 1, score: 5, comment: '좋았어요' });
 */
export const postReviews = (reviewData: CreateReviewRequest) =>
	postRequest<CreateReviewRequest>({
		path: REVIEWS_PATH,
		data: reviewData,
		options: { withAuth: true }
	});
