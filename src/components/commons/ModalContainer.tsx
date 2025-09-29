'use client';

import { useModalStore, ModalCloseContext } from '@/providers/ModalProvider';
import { useEffect } from 'react';

/**
 * 모달 관리를 위한 컨테이너 컴포넌트
 *
 * 전역 모달 상태를 관리하는 스토어에서 등록된 모든 모달을 렌더링합니다.
 * 여러 모달을 동시에 띄울 수 있도록 컨텍스트를 제공하며,
 * 각 모달이 개별적으로 관리됩니다.
 * 이 컴포넌트는 layout.tsx에서 사용되며 개인이 이 컴포넌트를 사용할 일은 없습니다(아마도)
 *
 * @returns JSX.Element 또는 null
 *
 * @example
 * // 애플리케이션의 최상위에서 사용
 * function App() {
 *   return (
 *     <div>
 *       <MainContent />
 *       <ModalContainer />
 *     </div>
 *   );
 * }
 */
export default function ModalContainer() {
	const { modals, closeModal } = useModalStore(state => ({
		modals: state.modals,
		closeModal: state.closeModal
	}));

	useEffect(() => {
		if (modals.length > 0) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		// cleanup function - 컴포넌트가 언마운트되거나 의존성이 변경될 때 실행
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [modals.length]);

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
