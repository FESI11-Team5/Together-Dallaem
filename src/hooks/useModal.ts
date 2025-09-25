'use client';

import { useContext } from 'react';
import { useModalStore, ModalCloseContext } from '@/app/providers/ModalProvider';

export function useModal() {
	const { openModal, closeModal, closeAllModals, modals } = useModalStore(state => ({
		openModal: state.openModal,
		closeModal: state.closeModal,
		closeAllModals: state.closeAllModals,
		modals: state.modals
	}));

	const isModalOpen = (id: string) => modals.some(modal => modal.id === id);

	const handleOpenModal = (component: React.ReactNode, id?: string) => {
		const modalId = id || `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		openModal(modalId, component);
		return modalId;
	};

	return {
		openModal: handleOpenModal,
		closeModal,
		closeAllModals,
		isModalOpen
	};
}

// 모달 컴포넌트 내부에서 자신을 닫을 때 사용하는 훅
export function useModalClose() {
	const closeModal = useContext(ModalCloseContext);

	if (!closeModal) {
		throw new Error('useModalClose must be used within a modal component');
	}

	return closeModal;
}
