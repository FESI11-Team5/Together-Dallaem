import { create } from 'zustand';

type Step = 1 | 2 | 3 | 4;

interface FunnelState {
	step: Step | number;
	next: () => void;
	prev: () => void;
	reset: () => void;
}

export const useFunnelStore = create<FunnelState>(set => ({
	step: 1,
	next: () => set(state => ({ step: Math.min(state.step + 1, 4) })),
	prev: () => set(state => ({ step: Math.max(state.step - 1, 1) })),
	reset: () => set({ step: 1 })
}));
