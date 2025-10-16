import { getRequest, postRequest } from '@/apis';
import { CreateReviewRequest, GetReviewsResponse } from '@/types/response/reviews';

const REVIEWS_PATH = '/reviews';

export const getReviews = async (): Promise<GetReviewsResponse> => {
	return getRequest({
		path: REVIEWS_PATH,
		options: { withAuth: true }
	});
};

export const postReviews = (reviewData: CreateReviewRequest) =>
	postRequest<CreateReviewRequest>({
		path: REVIEWS_PATH,
		data: reviewData,
		options: { withAuth: true }
	});
