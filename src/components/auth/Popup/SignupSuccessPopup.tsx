'use client';

import BasicPopup from '@/components/commons/basic/BasicPopup';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModalClose } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

export default function SignupSuccessPopup() {
	const closeModal = useModalClose();
	const router = useRouter();

	const onConfirm = () => {
		closeModal();
		router.push('/signin');
	};

	return <BasicPopup title={POPUP_MESSAGE.SIGNUP.title} onConfirm={onConfirm} />;
}
