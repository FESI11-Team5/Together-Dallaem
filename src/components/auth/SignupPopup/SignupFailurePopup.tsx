'use client';

import BasicPopup from '@/components/commons/BasicPopup';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModalClose } from '@/hooks/useModal';

export default function SignupFailurePopup() {
	const closeModal = useModalClose();

	return (
		<BasicPopup
			title={POPUP_MESSAGE.DUPLICATED_EMAIL.title}
			subTitle={POPUP_MESSAGE.DUPLICATED_EMAIL.subTitle}
			onConfirm={closeModal}
		/>
	);
}
