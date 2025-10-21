import { getRequest } from '@/apis';
import { scoreResponse } from '@/types/response/reviews';
import { ReviewScoreParams } from '@/types/review';

export const getScores = (params: ReviewScoreParams): Promise<scoreResponse> => {
	let path = '/reviews/scores';

	if (params && Object.keys(params).length > 0) {
		const queryString = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryString.append(key, value.toString());
			}
		});

		path += `?${queryString.toString()}`;
	}

	console.log(path);

	return getRequest<scoreResponse>({ path });
};
