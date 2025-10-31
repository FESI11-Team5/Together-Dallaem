import { SORT_CONFIG } from '@/constants/options';
import { format } from 'date-fns';

/**
 * 모임 데이터를 조회하기 위한 쿼리 문자열을 생성하는 유틸 함수
 * 전달받은 필터 조건(type, location, date, sort, limit, offset 등)을 기반으로
 * `URLSearchParams` 객체를 구성하여 문자열 형태로 반환합니다.
 *
 * @param {Object} filters - 모임 조회 시 사용할 필터 옵션
 * @param {string} [filters.type] - 모임 유형
 * @param {string | number} [filters.location] - 지역 코드 또는 이름
 * @param {Date} [filters.date] - 선택된 날짜
 * @param {string} [filters.sort] - 정렬 기준 (SORT_CONFIG 참조)
 * @param {number} [filters.limit] - 요청할 데이터 개수
 * @param {number} [filters.offset] - 페이지네이션을 위한 오프셋 값
 *
 * @returns {string} URL 쿼리 문자열 (예: `type=SPORTS&location=1&sortBy=date&sortOrder=asc`)
 */
export const getGatheringQuery = (filters: {
	type?: string;
	location?: string | number;
	date?: Date;
	sort?: string;
	limit?: number;
	offset?: number;
}) => {
	const params = new URLSearchParams();

	if (filters.type) params.append('type', filters.type);
	if (filters.location) params.append('location', String(filters.location));
	if (filters.date) params.append('date', format(filters.date, 'yyyy-MM-dd'));
	if (filters.sort) {
		const sortConfig = SORT_CONFIG[filters.sort as keyof typeof SORT_CONFIG];
		if (sortConfig) {
			params.append('sortBy', sortConfig.sortBy);
			params.append('sortOrder', sortConfig.sortOrder);
		}
	}
	if (filters.limit) params.append('limit', filters.limit.toString());
	if (filters.offset) params.append('offset', filters.offset.toString());

	return params.toString();
};
