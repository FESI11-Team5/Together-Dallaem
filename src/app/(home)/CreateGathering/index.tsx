'use client';

import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { withGuard } from '@/components/hoc/withAuthGuard';

import Image from 'next/image';
import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringModal from '@/components/gatherings/GatheringModal';

function NormalCreateButton() {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton
			onClick={() => openModal(<GatheringModal />)}
			className="bg-primary-500 rounded-md px-4 py-2 font-semibold text-white">
			모임 만들기
		</GuardedButton>
	);
}

function FloatingCreateButton() {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton
			onClick={() => openModal(<GatheringModal />)}
			className="group bg-primary-500 fixed right-8 bottom-8 z-10 flex h-14 w-14 items-center justify-center rounded-full text-3xl text-white shadow-lg transition-opacity">
			<Image src="/icons/plus_gathering.svg" width={13} height={13} alt="모임 만들기" />
			<span className="ml-2">모임 만들기</span>
		</GuardedButton>
	);
}

export default function CreateGatheringButton() {
	const [showFloating, setShowFloating] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const screenScrollY = window.scrollY;

			screenScrollY > 300 ? setShowFloating(true) : setShowFloating(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return <div className="relative">{showFloating ? <FloatingCreateButton /> : <NormalCreateButton />}</div>;
}
