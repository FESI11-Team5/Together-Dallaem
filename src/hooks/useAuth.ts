import { useUserStore } from '@/stores/user';
import { isTokenExpired } from '@/utils/token';

/**
 * useAuth
 * - 유저 인증 상태를 관리하고 검증하는 커스텀 훅
 * - Zustand의 userStore를 기반으로 인증 여부 및 토큰을 반환함
 */
export function useAuth() {
	const token = useUserStore(state => state.user?.token);
	const isAuthenticated = !!token && isTokenExpired(token) !== 'EXPIRED';

	return {
		token,
		isAuthenticated
	};
}
