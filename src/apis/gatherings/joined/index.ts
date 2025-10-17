import { getRequest } from '@/apis';
import { JoinedGathering } from '@/types/response/gatherings';

/**
 * 참여한 모임을 가져오기 위한 파라미터입니다.
 *
 * 모든 필드는 선택 사항이며, 값이 존재할 경우 쿼리 스트링으로 직렬화됩니다.
 * null이나 undefined 값은 포함되지 않습니다.
 */
interface getJoinedGatheringParams {
	/** 필터: 모임이 완료(completed)된 것만 조회할지 여부 */
	completed?: boolean;
	/** 필터: 리뷰(reviewed)가 등록된 것만 조회할지 여부 */
	reviewed?: boolean;
	/** 페이지네이션: 한 번에 가져올 항목 수 */
	limit?: number;
	/** 페이지네이션: 가져올 시작 오프셋 */
	offset?: number;
	/** 정렬 기준: 날짜/모집 마감/참여 시간 중 하나 */
	sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
	/** 정렬 방향: 오름차순 또는 내림차순 */
	sortOrder?: 'asc' | 'desc';
}

/**
 * 사용자가 참여한 모임 목록을 가져옵니다.
 *
 * 주어진 옵션은 쿼리 문자열로 직렬화되어 API 요청에 포함됩니다.
 * 정의된 값만 전송되며, 인증이 필요한 엔드포인트이므로 withAuth 옵션이 설정됩니다.
 *
 * @async
 * @param {getJoinedGatheringParams} [params] - 옵션 필터 및 페이징/정렬 설정
 * @returns {Promise<JoinedGathering[]>} 사용자가 참여한 모임들의 배열을 포함한 프로미스
 * @throws {Error} 네트워크 오류나 API 에러 발생 시 예외가 전파됩니다
 *
 * @example
 * // 기본 호출 (모든 참여 모임)
 * const list = await getJoinedGathering();
 *
 * @example
 * // 페이징 및 필터 사용 예
 * const page = await getJoinedGathering({ limit: 10, offset: 20, completed: false });
 */
export const getJoinedGathering = async (params?: getJoinedGatheringParams): Promise<JoinedGathering[]> => {
	const query = new URLSearchParams();

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				query.append(key, String(value));
			}
		});
	}

	const queryString = query.toString() ? `?${query.toString()}` : '';

	return getRequest<JoinedGathering[]>({
		path: `/gatherings/joined${queryString}`,
		options: { withAuth: true }
	});
};
