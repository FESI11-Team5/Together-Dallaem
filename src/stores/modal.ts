import { createStore } from 'zustand/vanilla';

/**
 * 개별 모달 아이템의 인터페이스
 */
export interface ModalItem {
	/** 모달의 고유 식별자(여러 모달 한 번에 열려있을 때 관리를 위함) */
	id: string;
	/** 렌더링될 모달 컴포넌트 */
	component: React.ReactNode;
}

/**
 * 모달 상태 타입
 */
export type ModalState = {
	/** 현재 열려있는 모달들의 배열 */
	modals: ModalItem[];
};

/**
 * 모달 액션 타입
 */
export type ModalActions = {
	/** 특정 ID로 모달을 엽니다 */
	openModal: (id: string, component: React.ReactNode) => void;
	/** 특정 ID의 모달을 닫습니다 */
	closeModal: (id: string) => void;
	/** 모든 모달을 닫습니다 */
	closeAllModals: () => void;
};

/**
 * 모달 스토어의 기본 초기 상태
 */
export const defaultInitState: ModalState = {
	modals: []
};

/**
 * 모달 스토어의 전체 타입 (상태 + 액션)
 */
export type ModalStore = ModalState & ModalActions;

/**
 * 모달 상태 관리를 위한 Zustand 스토어 생성 함수
 *
 * Zustand로 모달의 열기, 닫기, 전체 닫기 기능을 제공하는 스토어를 생성합니다.
 *
 * @param initState 초기 상태 (선택사항)
 * @returns 모달 관리 기능을 제공하는 스토어
 *
 */
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
