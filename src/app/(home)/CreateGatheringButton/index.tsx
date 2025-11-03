'use client';

import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { withGuard } from '@/components/hoc/withAuthGuard';

import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringFunnel from '@/components/gatherings/GatheringFunnel';

function NormalCreateButton() {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton onClick={() => openModal(<GatheringFunnel />)}>
			<span>크루 생성</span>
		</GuardedButton>
	);
}

function FloatingCreateButton() {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton
			id="floating-button"
			onClick={() => openModal(<GatheringFunnel />)}
			className="z-layout fixed right-8 bottom-8 flex">
			<span>크루 생성</span>
		</GuardedButton>
	);
}

export default function CreateGatheringButton() {
	const [showFloating, setShowFloating] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			console.log(window.scrollY);
			setShowFloating(window.scrollY > 300);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return <>{showFloating ? <FloatingCreateButton /> : <NormalCreateButton />}</>;
}
