import { getRequest, postRequest } from '@/apis';
import { CreateReviewRequest, GetReviewsResponse } from '@/types/response/reviews';

const REVIEWS_PATH = '/reviews';

export const getReviews = async (): Promise<GetReviewsResponse> => {
	return getRequest({
		path: REVIEWS_PATH
	});
};

/**
 * 팀 모임에 대한 리뷰를 추가합니다.
 *
 * @param reviewData - 리뷰 정보 (gatheringId, score, comment)
 * @returns 작성된 리뷰 데이터
 */
export const postReviews = (reviewData: CreateReviewRequest) =>
	postRequest<CreateReviewRequest>({
		path: REVIEWS_PATH,
		data: reviewData,
		options: { withAuth: true }
	});
