'use client';

import BasicPopup from '@/components/commons/basic/BasicPopup';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModalClose } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

interface RequiredLoginPopupProps {
	/** 로그인 후 다시 돌아갈 pathName */
	next: string;
}

/**
 * @component RequiredLoginPopup
 * @description
 * 로그인되지 않은 사용자가 접근 권한이 필요한 페이지에 접근할 때,
 * 로그인 유도를 위한 팝업을 표시하는 컴포넌트입니다.
 *
 * 확인 버튼을 클릭하면 모달을 닫고, `next` 경로를 쿼리로 포함하여
 * 로그인 페이지(`/login`)로 이동합니다.
 *
 * @param {RequiredLoginPopupProps} props - 컴포넌트 props
 * @param {string} props.next - 로그인 완료 후 리다이렉션될 경로
 * @returns {JSX.Element} 로그인 필요 안내 팝업 UI
 */
export default function RequiredLoginPopup({ next }: RequiredLoginPopupProps) {
	const closeModal = useModalClose();
	const router = useRouter();

	const handleClick = () => {
		closeModal();
		router.push('/login?next=' + encodeURIComponent(next));
	};

	return <BasicPopup title={POPUP_MESSAGE.REQUIRED_LOGIN.title} onConfirm={handleClick} />;
}
