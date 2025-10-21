'use client';

import { withGuard } from '@/components/hoc/withAuthGuard';

import BasicButton from '@/components/commons/basic/BasicButton';

export default function CreateGatheringPage({ children }: { children: React.ReactNode }) {
	const GuardedButton = withGuard(BasicButton);

	return (
		<GuardedButton className="rounded-md bg-orange-500 px-4 py-2 font-semibold text-white">{children}</GuardedButton>
	);
}
