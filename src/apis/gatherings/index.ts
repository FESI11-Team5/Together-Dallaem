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

/**
 * 모임 상세 조회 함수
 */
export const getGatheringId = (gatheringId: number) => {
	return getRequest<Gathering>({ path: `/gatherings/${gatheringId}` });
};

/**
 * 모임 참가 취소 함수
 */
export const putGatheringCancel = (gatheringId: number) => {
	return putRequest<Gathering>({ path: `/gatherings/${gatheringId}/cancel`, options: { withAuth: true } });
};

/**
 * 모임 참가 함수
 */
export const postGatheringJoin = (gatheringId: number) => {
	return postRequest<Gathering>({ path: `/gatherings/${gatheringId}/join`, options: { withAuth: true } });
};

/**
 * 특정 모임의 참가자 목록 조회
 */
export const getGatheringParticipant = (gatheringId: number) => {
	return getRequest<GatheringParticipant[]>({
		path: `/gatherings/${gatheringId}/participants`,
		options: { withAuth: true }
	});
};
