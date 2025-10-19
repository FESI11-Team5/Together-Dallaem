import { getRequest } from '@/apis';

/**
 * 리뷰 데이터 조회 API
 */

export const getReviews = () => {
	// TODO: 리뷰 데이터 타입 정의 필요
	getRequest({ path: '/reviews' });
};
