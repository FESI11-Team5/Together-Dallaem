import { postRequest } from '@/apis';

interface AddReviewPayLoad {
	gatheringId: number;
	score: number;
	comment: string;
}

export const addReview = (payload: AddReviewPayLoad) =>
	postRequest<AddReviewPayLoad>({
		path: '/reviews',
		data: payload,
		options: { withAuth: true }
	});
