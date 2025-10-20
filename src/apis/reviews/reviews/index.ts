import { getRequest } from '@/apis';
import { GetReviewsResponse } from '@/types/response/reviews';
import { ReviewParams } from '@/types/review';

export const getReviews = (params: ReviewParams): Promise<GetReviewsResponse> => {
	let path = '/reviews';

	if (params && Object.keys(params).length > 0) {
		const queryString = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryString.append(key, value.toString());
			}
		});

		path += `?${queryString.toString()}`;
	}

	return getRequest<GetReviewsResponse>({ path });
};
