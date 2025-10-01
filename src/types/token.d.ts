/**
 * JWT 토큰의 상태를 표현하는 타입입니다.
 *
 * - 'VALID'   : 토큰이 아직 유효한 상태
 * - 'IMMINENT': 만료 시간이 임박한 상태 (예: 만료까지 얼마 남지 않은 경우)
 * - 'EXPIRED' : 이미 만료되어 더 이상 사용할 수 없는 상태
 */
export type TokenStatus = 'VALID' | 'IMMINENT' | 'EXPIRED';

export interface JWTPayload {
	/** 팀 아이디 */
	teamId: string;
	/** 유저 아이디 */
	userId: number;
	/** 발행 시간 (초 단위 UNIX timestamp) */
	iat: number;
	/** 만료 시간 (초 단위 UNIX timestamp) */
	exp: number;
}
