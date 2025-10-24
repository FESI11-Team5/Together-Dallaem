import { useUserStore } from '@/stores/user';
import { isTokenExpired } from '@/utils/token';
import { useEffect, useState } from 'react';

/**
 * useAuth
 * - 유저 인증 상태를 관리하고 검증하는 커스텀 훅
 * - Zustand의 userStore를 기반으로 인증 여부 및 토큰을 반환함
 */
export function useAuth() {
	const hasHydrated = useUserStore(state => state.hasHydrated);
	const token = useUserStore(state => state.user?.token);
	const signoutUser = useUserStore(state => state.signoutUser);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	// TODO: 코드가 점점 복잡해져서 코드 뒤엎기가 필요해 보임
	useEffect(() => {
		if (!hasHydrated) return;
		const check = !!token && isTokenExpired(token) !== 'EXPIRED';
		console.log(check);
		setIsAuthenticated(check);
		if (!check) signoutUser();
	}, [hasHydrated, token]);

	return {
		token,
		isAuthenticated
	};
}
