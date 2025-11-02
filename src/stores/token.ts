import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface TokenState {
	/** 유저 고유 ID */
	userId: number | null;
	/** 인증 토큰 */
	token: string | null;
	/** 토큰 만료 시간 */
	exp: number | null;
	/** Hydration 여부 */
	hasHydrated: boolean;
}

interface TokenActions {
	/**
	 * 유저 로그인
	 * @param userId 유저 ID
	 * @param token 인증 토큰
	 * @param exp 토큰 만료 식단
	 */
	signinUser: ({ userId, token, exp }: Partial<TokenState>) => void;

	/**
	 * 유저 로그아웃 (스토어 초기화)
	 */
	signoutUser: () => void;
}

/** User 스토어 전체 타입 */
export type TokenStore = TokenState & TokenActions;

const initialState: TokenState = { userId: null, token: null, exp: null, hasHydrated: false };

/**
 * 유저 인증 관련 zustand 스토어
 * - devtools: Redux DevTools 연동
 * - persist: sessionStorage에 유저 상태 영속화
 */
export const useTokenStore = create<TokenStore>()(
	devtools(
		persist(
			set => {
				return {
					...initialState,
					signinUser: ({ userId, token, exp }: Partial<TokenState>) =>
						set(
							() => ({
								userId,
								token,
								exp,
								hasHydrated: true
							}),
							false,
							'signinUser'
						),
					signoutUser: () => set({ userId: null, token: null, exp: null, hasHydrated: true }, false, 'signoutUser')
				};
			},
			{
				name: 'token-store-persist',
				storage: createJSONStorage(() => sessionStorage),
				merge: (persistedState, currentState) => {
					return {
						...currentState,
						...(persistedState as object),
						hasHydrated: true
					};
				}
			}
		),
		{
			name: 'token-store'
		}
	)
);
