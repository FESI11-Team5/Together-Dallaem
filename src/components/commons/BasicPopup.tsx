'use client';

import { useModalClose } from '@/hooks/useModal';

import BasicButton from './BasicButton';
import BasicModal from './BasicModal';

interface BasicPopupProps {
	/** 팝업 제목 */
	title: string;
	/** 팝업 본문 메시지 */
	subTitle?: string;
	/** 확인 버튼 텍스트 */
	confirmText?: string;
	/** 취소 버튼 텍스트 (없으면 취소 버튼 숨김) */
	cancelText?: string;
	/** 확인 버튼 클릭 시 동작 */
	onConfirm?: () => void;
	/** 취소 버튼 클릭 시 동작 */
	onCancel?: () => void;
}

export default function BasicPopup({
	title,
	subTitle,
	confirmText = '확인',
	cancelText,
	onConfirm,
	onCancel
}: BasicPopupProps) {
	const closePopup = useModalClose(); // 자기 자신 닫기

	/** 확인 버튼 클릭 시 실행될 동작 */
	const handleConfirm = () => {
		if (onConfirm) onConfirm();
		closePopup();
	};

	/** 취소 버튼 클릭 시 실행될 동작 */
	const handleCancel = () => {
		if (onCancel) onCancel();
		closePopup();
	};

	return (
		<BasicModal onClose={handleCancel} width="450px">
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col">
					<h2 className="text-lg font-semibold">{title}</h2>
					{subTitle && <p className="text-gray-600">{subTitle}</p>}
				</div>
				<div className="flex w-full justify-center gap-3">
					{cancelText && (
						<BasicButton isActive={true} onClick={handleCancel} outlined={true} ariaLabel="팝업 취소">
							{cancelText}
						</BasicButton>
					)}
					<BasicButton onClick={handleConfirm} ariaLabel="팝업 확인">
						{confirmText}
					</BasicButton>
				</div>
			</div>
		</BasicModal>
	);
}
