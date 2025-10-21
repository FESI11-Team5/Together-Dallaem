'use client';

import { useModal } from '@/hooks/useModal';
import { withGuard } from '@/components/hoc/withAuthGuard';

import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringModal from '@/components/gatherings/GatheringModal';

export default function CreateGatheringButton({ children }: { children: React.ReactNode }) {
	const GuardedButton = withGuard(BasicButton);
	const { openModal } = useModal();

	return (
		<GuardedButton
			onClick={() => openModal(<GatheringModal />)}
			className="rounded-md bg-orange-500 px-4 py-2 font-semibold text-white">
			{children}
		</GuardedButton>
	);
}
