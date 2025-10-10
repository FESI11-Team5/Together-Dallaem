'use client';

import Image from 'next/image';

interface BasicModalProps {
	/** 모달 내부에 표시될 콘텐츠 */
	children: React.ReactNode;
	/** 모달을 닫는 함수(일반적으로는 useModalClose 훅을 사용하면 됩니다) */
	onClose: () => void;
	/** 모달 내부 영역에 추가할 커스텀 CSS 클래스명 */
	className?: string;
	/** 모달의 너비 (CSS 값으로 설정) */
	width?: string;
}

/**
 * 기본 모달 컴포넌트
 *
 * 배경 클릭 또는 닫기 버튼을 통해 모달을 닫을 수 있습니다.
 * 화면 중앙에 고정되어 표시됩니다.
 * 기본 컴포넌트를 바탕으로 각각의 모달 컴포넌트를 생성하여 사용하시면 좋을 것 같습니다.
 *
 * @param props - BasicModalProps 객체
 * @returns JSX.Element
 *
 * @example
 * // 기본 모달 사용법
 * <BasicModal onClose={handleClose}>
 *   <div>모달 내용입니다</div>
 * 	 <BasicButton onClick={handleClose}>확인</BasicButton>
 * </BasicModal>
 */
export default function BasicModal({ children, onClose, className, width }: BasicModalProps) {
	const closeModalOnBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
			onClick={closeModalOnBackgroundClick}>
			<div
				className={`relative min-w-[300px] rounded-lg bg-white p-[24px] shadow-xl`}
				style={{ width: width }}
				onClick={e => e.stopPropagation()}>
				<button
					onClick={onClose}
					className="absolute top-[24px] right-[24px] z-10 ml-auto block cursor-pointer text-xl font-bold text-gray-500 hover:text-gray-700">
					<Image src="/icons/close.svg" alt="close" width={24} height={24} />
				</button>
				<div className={`flex h-full w-full flex-col text-center ${className}`}>{children}</div>
			</div>
		</div>
	);
}
