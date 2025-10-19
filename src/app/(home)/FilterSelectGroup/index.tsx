import SearchCalendar from '@/app/(home)/SearchCalendar';
import SelectBox from '@/components/commons/SelectBox';
import { LOCATION_OPTIONS } from '@/constants/options';
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
				{/* // TODO: 반응형 부분은 동적으로 불러오는 거 말고 브레이크 포인트로 가능한지 논의 */}
				<SelectBox options={LOCATION_OPTIONS} placeholder="지역 전체" size="small" onChange={setSelectedLocation} />
				<SearchCalendar date={selectedDate} setDate={setSelectedDate} />
			</div>
			{/* TODO: 사용법 논의 필요 */}
			{/* <SortButton options={SORT_OPTIONS} defaultValue={'deadlineLate'} /> */}
		</div>
	);
}
