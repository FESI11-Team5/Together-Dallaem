'use client';

import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { withGuard } from '@/components/hoc/withAuthGuard';

import Image from 'next/image';
import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringFunnel from '@/components/gatherings/GatheringFunnel';

function NormalCreateButton() {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton onClick={() => openModal(<GatheringFunnel />)}>
			<span className="pt-1">크루 생성</span>
		</GuardedButton>
	);
}

function FloatingCreateButton() {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton
			onClick={() => openModal(<GatheringFunnel />)}
			className="z-base fixed right-8 bottom-8 flex h-14 w-14 gap-3 rounded-full text-3xl">
			<Image src="/icons/plus_gathering.svg" width={13} height={13} alt="크루 생성" />
			<span className="pt-1">크루 생성</span>
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
