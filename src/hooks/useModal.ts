'use client';

import { useContext } from 'react';
import { useModalStore, ModalCloseContext } from '@/app/providers/ModalProvider';

/**
 * 모달 상태 관리 훅
 *
 * 모달의 열기, 닫기, 전부 닫기 등의 기능을 제공합니다.
 * ID가 지정되지 않으면 자동으로 고유 ID를 생성합니다(현재 시각과 랜덤 문자열을 조합해 생성).
 *
 * @returns {{openModal: Function, closeModal: Function, closeAllModals: Function, isModalOpen: Function, getAllModalIds: Function, getModalById: Function}} 모달 관련 함수들과 상태
 *
 * @example
 * // 기본 사용법
 * const { openModal, closeModal, closeAllModals, isModalOpen, getAllModalIds, getModalById } = useModal();
 *
 * // 모달 열기 (자동 ID 생성)
 * const modalId = openModal(<MyModal />);
 *
 * // 모달 열기 (커스텀 ID)
 * openModal(<MyModal />, 'my-custom-modal');
 *
 * // 특정 모달이 열려있는지 확인
 * if (isModalOpen('my-modal')) {
 *   // 모달이 열려있을 때의 로직
 * }
 *
 * // 현재 열린 모달들의 ID 목록 조회(혹시나 Id가 필요할까봐 만들었습니당)
 * const openModalIds = getAllModalIds();
 * console.log('열린 모달들:', openModalIds);
 *
 * // 특정 ID로 모달 정보 조회
 * const modalInfo = getModalById('my-modal');
 * console.log('모달 정보:', modalInfo);
 */
export function useModal() {
	const { openModal, closeModal, closeAllModals, modals } = useModalStore(state => ({
		openModal: state.openModal,
		closeModal: state.closeModal,
		closeAllModals: state.closeAllModals,
		modals: state.modals
	}));

	const isModalOpen = (id: string) => modals.some(modal => modal.id === id);

	const getAllModalIds = () => modals.map(modal => modal.id);

	const getModalById = (id: string) => modals.find(modal => modal.id === id);

	const handleOpenModal = (component: React.ReactNode, id?: string) => {
		const modalId = id || `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		openModal(modalId, component);
		return modalId;
	};

	return {
		openModal: handleOpenModal,
		closeModal,
		closeAllModals,
		isModalOpen,
		getAllModalIds,
		getModalById
	};
}

/**
 * 모달 컴포넌트 내부에서 자신을 닫을 때 사용하는 훅
 *
 * 모달 컴포넌트가 스스로 닫힐 수 있도록 컨텍스트에서 닫기 함수를 가져옵니다.
 * 이 훅은 반드시 모달 컴포넌트 내부에서만 사용해야 합니다(안 그러면 에러 발생).
 *
 * @returns {Function} 모달을 닫는 함수
 * @throws {Error} 모달 컴포넌트 외부에서 사용할 경우 에러 발생
 *
 * @example
 * // 모달 컴포넌트 내부에서 사용
 * function MyModal() {
 *   const closeModal = useModalClose();
 *
 *   return (
 *     <div>
 *       <button onClick={closeModal}>닫기</button>
 *     </div>
 *   );
 * }
 */
export function useModalClose() {
	const closeModal = useContext(ModalCloseContext);

	if (!closeModal) {
		throw new Error('useModalClose must be used within a modal component');
	}

	return closeModal;
}
