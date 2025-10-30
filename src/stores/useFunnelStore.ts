import { create } from 'zustand';

export type Step = 1 | 2 | 3 | 4;

interface FunnelState {
	/** 현재 단계 */
	step: Step;
	/** 업로드된 파일 URL */
	fileUrl?: string;
}

interface FunnelActions {
	/** 파일 URL 설정 */
	setFileUrl: (url: string) => void;
	/** 다음 단계로 이동 */
	next: () => void;
	/** 이전 단계로 이동 */
	prev: () => void;
	/** 초기화 */
	reset: () => void;
}

type FunnelStore = FunnelState & FunnelActions;

export const useFunnelStore = create<FunnelStore>(set => ({
	step: 1,
	fileUrl: '',
	setFileUrl: url => set({ fileUrl: url }),
	next: () => set(state => ({ step: Math.min(state.step + 1, 4) as Step })),
	prev: () => set(state => ({ step: Math.max(state.step - 1, 1) as Step })),
	reset: () => set({ step: 1 as Step, fileUrl: '' })
}));
