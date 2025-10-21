import { getRequest, postRequest } from '@/apis';
import { CreateGathering } from '@/types/response/createGathering';
import { Gathering } from '@/types/response/gatherings';

/**
 * 모든 모임 목록을 조회합니다.
 * @returns Promise<Gathering[]> - 모임 목록
 */
export const getGatherings = (queryString?: string) =>
	getRequest<Gathering[]>({
		path: queryString ? `/gatherings?${queryString}` : '/gatherings'
	});

/**
 * 모임 생성 함수
 */
export const postGathering = (data: FormData) => {
	return postRequest<CreateGathering>({ path: '/gatherings', data, options: { withAuth: true } });
};
