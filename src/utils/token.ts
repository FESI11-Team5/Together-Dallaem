import { JWTPayload, TokenStatus } from '@/types/token';

/**
 * 로컬 스토리지에서 저장된 토큰을 가져옵니다.
 *
 * @returns {string | null} 저장된 토큰. 없으면 null 반환
 */
export const getToken = () => {
	const persistedToken = sessionStorage.getItem('token-store-persist');
	const token = persistedToken ? JSON.parse(persistedToken).state.token : null;
	return token;
};

/**
 * 로컬 스토리지에 저장된 토큰을 제거합니다.
 */
export const removeToken = () => {
	sessionStorage.removeItem('token-store-persist');
};

/**
 * JWT 토큰을 디코딩하여 payload를 추출합니다.
 *
 * @param {string} token - 디코딩할 JWT 토큰
 * @returns {JWTPayload | null} payload 객체. 토큰이 잘못되었으면 null 반환
 */
export const decodeToken = (token: string): JWTPayload | null => {
	try {
		const payload = token.split('.')[1];
		if (!payload) return null;

		const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
		return JSON.parse(json);
	} catch {
		return null;
	}
};

/**
 * 토큰의 만료 여부를 확인합니다.
 *
 * @param {number} exp - 확인할 JWT 토큰
 * @param {number} [thresholdSec=0] - 만료 임박 여부를 판단할 임계 시간(초). (예: 300 → 5분 이내면 'IMMINENT')
 * @returns {TokenStatus} 토큰 상태 ('VALID' | 'IMMINENT' | 'EXPIRED')
 *
 * - 'EXPIRED': 이미 만료된 상태
 * - 'IMMINENT': 아직 만료되진 않았지만 thresholdSec 이내로 만료 예정
 * - 'VALID': 아직 충분히 유효한 상태
 */
export const isTokenExpired = (exp?: number, thresholdSec = 0): TokenStatus => {
	if (!exp) return 'EXPIRED';

	const now = Math.floor(Date.now() / 1000);

	if (exp < now) return 'EXPIRED';
	if (exp < now + thresholdSec) return 'IMMINENT';

	return 'VALID';
};
