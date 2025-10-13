'use client';

import BasicPopup from '@/components/commons/BasicPopup';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModalClose } from '@/hooks/useModal';

export default function ServerErrorPopup() {
	const closeModal = useModalClose();

	return (
		<BasicPopup
			title={POPUP_MESSAGE.SERVER_ERROR.title}
			subTitle={POPUP_MESSAGE.SERVER_ERROR.subTitle}
			onConfirm={closeModal}
		/>
	);
}
