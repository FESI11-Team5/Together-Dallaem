'use client';

import { useModalStore, ModalCloseContext } from '@/app/providers/ModalProvider';

export default function ModalContainer() {
	const { modals, closeModal } = useModalStore(state => ({
		modals: state.modals,
		closeModal: state.closeModal
	}));

	if (modals.length === 0) return null;

	return (
		<>
			{modals.map(modal => (
				<ModalCloseContext.Provider key={modal.id} value={() => closeModal(modal.id)}>
					{modal.component}
				</ModalCloseContext.Provider>
			))}
		</>
	);
}
