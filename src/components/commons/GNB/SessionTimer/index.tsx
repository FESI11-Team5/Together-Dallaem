'use client';

import { useTimer } from '@/hooks/useTimer';
import { useTokenStore } from '@/stores/token';
import { cn } from '@/utils/cn';
import Image from 'next/image';

export default function SessionTimer() {
	const exp = useTokenStore(state => state.exp);
	const { formattedTime } = useTimer(exp);

	if (!formattedTime) return null;

	return (
		<div
			className={cn(
				'text-primary-100 mb:text-sm flex items-center justify-between gap-0.5 text-center text-xs font-semibold',
				'[text-shadow:0_0_2px_#b3b3b3,0_0_4px_#b3b3b3,0_0_8px_#b3b3b3,0_0_16px_#b3b3b3,0_0_20px_#b3b3b3]'
			)}>
			<Image priority src="/icons/clock.svg" alt="시계 아이콘" width={24} height={24} />
			{formattedTime}
		</div>
	);
}
