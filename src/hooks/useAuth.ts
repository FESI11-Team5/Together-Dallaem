import { useUserStore } from '@/stores/user';
import { isTokenExpired } from '@/utils/token';

export function useAuth() {
	const user = useUserStore(state => state.user);

	const isAuthenticated = () => {
		const token = user?.token;
		if (!token) return false;
		return isTokenExpired(token) !== 'EXPIRED';
	};

	return {
		token: user?.token,
		isAuthenticated,
	};
}
