'use client';

import BasicPopup from '@/components/commons/basic/BasicPopup';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModalClose } from '@/hooks/useModal';

/**
 * @component ServerErrorPopup
 * @description
 * 서버에서 예기치 못한 오류가 발생했을 때 표시되는 안내 팝업 컴포넌트입니다.
 * 사용자는 확인 버튼을 눌러 팝업을 닫을 수 있으며,
 * 일반적으로 네트워크 오류나 서버 문제 발생 시 호출됩니다.
 *
 * @returns {JSX.Element} 서버 오류 안내 팝업 UI
 */
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
