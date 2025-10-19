'use client';

import Chip from '@/components/commons/Chip';
import Tab from '@/components/commons/Tab';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';
import { cn } from '@/utils/cn';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

interface GatheringTabsProps {
	setSelectedType: Dispatch<SetStateAction<string>>;
	button: React.ReactNode;
}

// TODO: 하드 코딩 수정
export default function GatheringTabs({ setSelectedType, button }: GatheringTabsProps) {
	const [type, setType] = useState<string>('DALLAEMFIT');
	const [subType, setSubType] = useState<string>('DALLAEMFIT');

	useLayoutEffect(() => {
		setSelectedType(type);
		if (type === 'DALLAEMFIT') setSubType('DALLAEMFIT');
	}, [type, setSelectedType]);

	useLayoutEffect(() => {
		setSelectedType(subType);
	}, [subType, setSelectedType]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<Tab options={TYPE_OPTIONS} selectedTab={type} onTabChange={setType} />
				{button}
			</div>
			{/* TODO: CHIP className 추가 논의 */}
			{/* TODO: Activity로 변경 */}
			<div className={cn('flex gap-2', type === 'DALLAEMFIT' ? 'opacity-100' : 'pointer-events-none opacity-0')}>
				{SUB_TYPE_OPTIONS.map(({ value, text }) => (
					<Chip key={value} text={text} isActive={subType === value} onClick={() => setSubType(value as string)} />
				))}
			</div>
		</div>
	);
}
