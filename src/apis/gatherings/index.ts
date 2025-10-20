import { getRequest } from '@/apis';
import { Gathering } from '@/types/response/gatherings';

/**
 * 모든 모임 목록을 조회합니다.
 * @returns Promise<Gathering[]> - 모임 목록
 */
export const getGatherings = (queryString: string) =>
	getRequest<Gathering[]>({
		path: queryString ? `/gatherings?${queryString}` : '/gatherings'
	});
