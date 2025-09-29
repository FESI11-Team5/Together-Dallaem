import { JWTPayload, TokenStatus } from '@/types/token';

export const getToken = () => {
	return localStorage.getItem('token');
};

export const setToken = (token: string) => {
	localStorage.setItem('token', token);
};

export const removeToken = () => {
	localStorage.removeItem('token');
};

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

export const isTokenExpried = (token: string, thresholdSec = 0): TokenStatus => {
	const exp = decodeToken(token)?.exp;
	if (typeof exp !== 'number') return 'EXPIRED';

	const now = new Date().getTime() / 1000;

	if (exp < now) return 'EXPIRED';
	if (exp < now + thresholdSec) return 'IMMINENT';

	return 'VALID';
};
