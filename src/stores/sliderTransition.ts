import { create } from 'zustand';

/** 슬라이더 방향 */
export type Direction = 'forward' | 'backward';

/** 전환 상태 관리 스토어 */
interface TransitionStore {
	direction: Direction;
	setDirection: (dir: Direction) => void;
}

/** 전환 상태 관리 스토어 */
export const useSliderTransitionStore = create<TransitionStore>(set => ({
	direction: 'forward',
	setDirection: dir => set({ direction: dir })
}));
