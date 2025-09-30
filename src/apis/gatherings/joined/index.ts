import { getRequest } from '@/apis';
import { JoinedGathering } from '@/types/response/gatherings';

export const getJoinedGathering = async (): Promise<JoinedGathering[]> => {
	return getRequest<JoinedGathering[]>({
		path: `/gatherings/joined`
	});
};
