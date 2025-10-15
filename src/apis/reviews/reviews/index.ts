import { getRequest } from '@/apis';
import { ReviewResponse } from '@/types/response/reviews';
import { ReviewParams } from '@/types/review';

export const getReviews = (params: ReviewParams): Promise<ReviewResponse> => {
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

	return getRequest<ReviewResponse>({ path });
};
