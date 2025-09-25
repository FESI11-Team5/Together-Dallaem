'use client';

import Image from 'next/image';

interface BasicModalProps {
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
}

export default function BasicModal({ children, onClose, className }: BasicModalProps) {
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
				className={`relative rounded-lg bg-white p-[24px] shadow-xl ${className}`}
				onClick={e => e.stopPropagation()}>
				<button
					onClick={onClose}
					className="relative z-10 ml-auto block cursor-pointer text-xl font-bold text-gray-500 hover:text-gray-700">
					<Image src="/icons/close.svg" alt="close" width={24} height={24} />
				</button>
				<div className="h-full w-full p-4">{children}</div>
			</div>
		</div>
	);
}
