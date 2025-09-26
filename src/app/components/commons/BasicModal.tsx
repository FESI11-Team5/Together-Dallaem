'use client';

import Image from 'next/image';

interface BasicModalProps {
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
	width?: string;
}

export default function BasicModal({ children, onClose, className, width }: BasicModalProps) {
	const closeModalOnBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
			onClick={closeModalOnBackgroundClick}>
			<div
				className={`relative min-w-[300px] rounded-lg bg-white p-[24px] shadow-xl`}
				style={{ width: width }}
				onClick={e => e.stopPropagation()}>
				<button
					onClick={onClose}
					className="relative z-10 ml-auto block cursor-pointer text-xl font-bold text-gray-500 hover:text-gray-700">
					<Image src="/icons/close.svg" alt="close" width={24} height={24} />
				</button>
				<div className={`flex h-full w-full flex-col p-4 text-center ${className}`}>{children}</div>
			</div>
		</div>
	);
}
