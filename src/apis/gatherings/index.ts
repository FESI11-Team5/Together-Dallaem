import { getRequest, postRequest, putRequest } from '@/apis';
import { CreateGathering } from '@/types/response/createGathering';
import { Gathering, GatheringParticipant } from '@/types/response/gatherings';

// TODO: 임시 테스트 함수로 getGatherings 파라미터는 홈페이지 개발시 진행
/**
 * 모든 모임 목록을 조회합니다.
 * @returns Promise<Gathering[]> - 모임 목록
 *
 * @example
 * ```typescript
 * const gatherings = await getGatherings();
 * console.log(`총 ${gatherings.length}개의 모임이 있습니다.`);
 * ```
 */
export const getGatherings = () =>
	getRequest<Gathering[]>({
		path: '/gatherings'
		// path: '/gatherings?location=을지로33가'
	});

/**
 * 모임 생성 함수
 */
export const postGathering = (data: FormData) => {
	return postRequest<CreateGathering>({ path: '/gatherings', data, options: { withAuth: true } });
};
