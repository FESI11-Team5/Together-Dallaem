'use client';

import Chip from '@/components/commons/Chip';
import Tab from '@/components/commons/Tab';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';
import { cn } from '@/utils/cn';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

interface GatheringTabsProps {
	/** 상위 컴포넌트에 선택된 모임 유형을 전달하는 함수 */
	setSelectedType: Dispatch<SetStateAction<string>>;
	/** 탭 오른쪽에 표시할 버튼 요소 (예: '모임 만들기' 버튼) */
	button: React.ReactNode;
}

// TODO: 하드 코딩 수정
/**
 * 모임 유형 및 세부 유형(서브 타입)을 선택할 수 있는 탭 컴포넌트
 * 상위 컴포넌트로 선택된 타입을 전달하며, 특정 타입 선택 시 하위 옵션(Chip)을 표시합니다.
 *
 * @param {GatheringTabsProps} props - 선택된 타입을 업데이트하는 함수와 버튼 요소를 포함한 props
 */
export default function GatheringTabs({ setSelectedType, button }: GatheringTabsProps) {
	const DEFAULT_TYPE = 'DALLAEMFIT';
	const [type, setType] = useState<string>(DEFAULT_TYPE);
	const [subType, setSubType] = useState<string>(DEFAULT_TYPE);

	useLayoutEffect(() => {
		setSelectedType(type);
		if (type === DEFAULT_TYPE) setSubType(DEFAULT_TYPE);
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
			{/* TODO: Activity로 변경 */}
			<div className={cn('flex gap-2', type === DEFAULT_TYPE ? 'opacity-100' : 'pointer-events-none opacity-0')}>
				{SUB_TYPE_OPTIONS.map(({ value, text, icon }) => (
					<Chip
						key={value}
						text={text}
						isActive={subType === value}
						imgUrl={icon}
						onClick={() => setSubType(value as string)}
					/>
				))}
			</div>
		</div>
	);
}
