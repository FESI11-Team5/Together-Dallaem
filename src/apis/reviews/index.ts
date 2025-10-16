import { getRequest, postRequest } from '@/apis';
import { Review } from '@/types/response/reviews';

interface PostReviewsRequest {
	gatheringId: number;
	score: number;
	comment: string;
}

interface GetReviewsRequest {
	data: Review[];
	totalItemCount: number;
	currentPage: number;
	totalPages: number;
}

export const getReviews = async (): Promise<GetReviewsRequest> => {
	return getRequest({
		path: `/reviews`,
		options: { withAuth: true }
	});
};

export const postReviews = (reviewData: PostReviewsRequest) =>
	postRequest<PostReviewsRequest>({
		path: '/reviews',
		data: reviewData,
		options: { withAuth: true }
	});
