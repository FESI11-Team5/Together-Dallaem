import { createStore } from 'zustand/vanilla';

export interface ModalItem {
	id: string;
	component: React.ReactNode;
	autoClose?: boolean; // 자동 닫기 여부
}

export type ModalState = {
	modals: ModalItem[];
};

export type ModalActions = {
	openModal: (id: string, component: React.ReactNode) => void;
	closeModal: (id: string) => void;
	closeAllModals: () => void;
};

export const defaultInitState: ModalState = {
	modals: []
};

export type ModalStore = ModalState & ModalActions;

export const createModalStore = (initState: ModalState = defaultInitState) => {
	return createStore<ModalStore>()((set, get) => ({
		...initState,
		openModal: (id: string, component: React.ReactNode) =>
			set(state => {
				// 이미 같은 id의 모달이 있으면 제거하고 새로 추가
				const filteredModals = state.modals.filter(modal => modal.id !== id);
				return {
					modals: [...filteredModals, { id, component }]
				};
			}),
		closeModal: (id: string) =>
			set(state => ({
				modals: state.modals.filter(modal => modal.id !== id)
			})),
		closeAllModals: () => set(() => ({ modals: [] }))
	}));
};
