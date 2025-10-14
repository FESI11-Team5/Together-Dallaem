'use client';

import BasicPopup from '@/components/commons/basic/BasicPopup';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModalClose } from '@/hooks/useModal';
import { ApiError } from '@/utils/fetch';

interface SignupFailurePopupProps {
	/** API 에러 */
	error: ApiError;
}

export default function SignupFailurePopup({ error }: SignupFailurePopupProps) {
	const closeModal = useModalClose();

	const { title, subTitle } =
		error.parameter === 'email' ? POPUP_MESSAGE.DUPLICATED_EMAIL : { title: error.message, subTitle: '' };

	return <BasicPopup title={title} subTitle={subTitle} onConfirm={closeModal} />;
}
