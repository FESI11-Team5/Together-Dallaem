import { deleteRequest, getRequest, postRequest, putRequest } from '@/apis';
import { Gathering, GatheringParticipant } from '@/types/response/gatherings';

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

/**
 * 모임 참가 탈퇴 함수
 */
export const leaveGathering = (gatheringId: number) => {
	return deleteRequest({
		path: `/gatherings/${gatheringId}/leave`,
		options: { withAuth: true }
	});
};
