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
