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

	useEffect(() => {
		if (!hasHydrated) return;
		const check = !!token && isTokenExpired(token) !== 'EXPIRED';
		setIsAuthenticated(check);
		if (!check) signoutUser();
	}, [hasHydrated, token]);

	return {
		token,
		isAuthenticated
	};
}
