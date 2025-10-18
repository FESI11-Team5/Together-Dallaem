import { useUserStore } from '@/stores/user';
import { isTokenExpired } from '@/utils/token';

/**
 * useAuth
 * - 유저 인증 상태를 관리하고 검증하는 커스텀 훅
 * - Zustand의 userStore를 기반으로 인증 여부 및 토큰을 반환함
 */
export function useAuth() {
	const user = useUserStore(state => state.user);

	/**
	 * 현재 유저의 인증 여부를 검사
	 * @returns {boolean} 토큰이 존재하고 만료되지 않았으면 true
	 */
	const isAuthenticated = () => {
		const token = user?.token;
		if (!token) return false;
		return isTokenExpired(token) !== 'EXPIRED';
	};

	return {
		token: user?.token,
		isAuthenticated
	};
}
