import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface WishlistState {
	/** 찜한 글 ID 목록 (중복 불가) */
	wishlist: Set<number>;
	/** hydration 여부 */
	hasHydrated: boolean;
}

interface WishlistActions {
	/** 특정 글 ID를 찜 목록에 추가 */
	addWish: (id: number) => void;
	/** 특정 글 ID를 찜 목록에서 제거 */
	removeWish: (id: number) => void;
	/** 전체 찜 목록 초기화 (모두 제거) */
	clearWishlist: () => void;
	/** 이미 찜했다면 제거, 아니라면 추가 (토글 동작) */
	toggleWish: (id: number) => void;
}

/** Wishlist 스토어 전체 타입 */
export type WishlistStore = WishlistState & WishlistActions;

const initialState: WishlistState = { wishlist: new Set(), hasHydrated: false };

/**
 * 찜하기 관련 zustand 스토어
 * - devtools: Redux DevTools 연동
 * - persist: localStorage에 유저 상태 영속화
 */

export const useWishlistStore = create<WishlistStore>()(
	devtools(
		persist(
			set => {
				return {
					...initialState,
					addWish: (id: number) =>
						set(
							state => {
								const newSet = new Set(state.wishlist);
								newSet.add(id);

								return {
									wishlist: newSet
								};
							},
							false,
							'addWish'
						),
					removeWish: (id: number) =>
						set(
							state => {
								const newSet = new Set(state.wishlist);
								newSet.delete(id);

								return {
									wishlist: newSet
								};
							},
							false,
							'removeWish'
						),
					clearWishlist: () => set({ wishlist: new Set() }, false, 'clearWishlist'),

					toggleWish: (id: number) =>
						set(
							state => {
								const newSet = new Set(state.wishlist);
								if (newSet.has(id)) {
									newSet.delete(id);
								} else {
									newSet.add(id);
								}

								return {
									wishlist: newSet
								};
							},
							false,
							'toggleWish'
						)
				};
			},
			{
				name: 'wishlist-store-persist',
				partialize: state => ({
					wishlist: Array.from(state.wishlist)
				}),

				onRehydrateStorage: () => state => {
					if (!state?.wishlist) return;
					state.wishlist = new Set(state.wishlist);
					state.hasHydrated = true;
				}
			}
		),
		{
			name: 'wishlist-store'
		}
	)
);
