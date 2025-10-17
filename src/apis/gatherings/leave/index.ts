import { deleteRequest } from '@/apis';

/**
 * 사용자가 특정 모임에서 탈퇴(leave)하도록 요청합니다.
 *
 * 이 함수는 내부적으로 인증이 필요한 DELETE 요청을 보냅니다.
 *
 * @param {number} gatheringId - 탈퇴할 모임의 고유 ID
 * @returns {Promise<any>} API 응답을 포함한 프로미스. API의 응답 형태에 따라 제네릭 또는 타입을 지정할 수 있습니다.
 * @throws {Error} 네트워크 또는 API 오류 발생 시 예외가 전파됩니다.
 *
 * @example
 * await leaveGathering(123);
 */
export const leaveGathering = (gatheringId: number) => {
	return deleteRequest({
		path: `/gatherings/${gatheringId}/leave`,
		options: { withAuth: true }
	});
};
