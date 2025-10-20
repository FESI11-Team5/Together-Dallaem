'use client';

import FilterSelectGroup from '@/app/(home)/FilterSelectGroup';
import GatheringTabs from '@/app/(home)/GatheringTabs';
import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringModal from '@/components/gatherings/GatheringModal';
import { useModal } from '@/hooks/useModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface GatheringFilterBarProps {
	setFilterCriteria: Dispatch<
		SetStateAction<{
			type: string;
			location: string | number;
			date?: Date;
		}>
	>;
}

export default function GatheringFilterBar({ setFilterCriteria }: GatheringFilterBarProps) {
	const { openModal } = useModal();
	const [selectedType, setSelectedType] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<string | number>('');
	const [selectedDate, setSelectedDate] = useState<Date>();
	// const [selectedSort, setSelectedSort] = useState<string>();

	useEffect(() => {
		setFilterCriteria({
			type: selectedType,
			location: selectedLocation,
			date: selectedDate
		});
	}, [selectedType, selectedLocation, selectedDate, setFilterCriteria]);

	return (
		<div className="flex w-full flex-col gap-4">
			<GatheringTabs
				setSelectedType={setSelectedType}
				button={<BasicButton onClick={() => openModal(<GatheringModal />)}>모임 만들기</BasicButton>}
			/>
			<hr />
			<FilterSelectGroup
				setSelectedLocation={setSelectedLocation}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
		</div>
	);
}
