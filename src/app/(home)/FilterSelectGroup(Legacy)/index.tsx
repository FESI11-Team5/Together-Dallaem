'use client';

import SearchCalendar from '@/app/(home)/SearchCalendar';
import SelectBox from '@/components/commons/SelectBox';
import { GENRE_OPTIONS } from '@/constants/options';
import { Dispatch, SetStateAction } from 'react';

interface FilterSelectGroupProps {
	setSelectedLocation: Dispatch<SetStateAction<string | number>>;
	selectedDate?: Date;
	setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
	// setSelectedSort: Dispatch<SetStateAction<string>>;
}

export default function FilterSelectGroup({
	setSelectedLocation,
	selectedDate,
	setSelectedDate
	// setSelectedSort
}: FilterSelectGroupProps) {
	return (
		<div className="flex w-full justify-between">
			<div className="flex gap-2">
				<SelectBox options={GENRE_OPTIONS} placeholder="장르 전체" onChange={setSelectedLocation} />
				<SearchCalendar date={selectedDate} setDate={setSelectedDate} />
			</div>
			{/* <SortButton options={SORT_OPTIONS} defaultValue={'deadlineLate'} /> */}
		</div>
	);
}
