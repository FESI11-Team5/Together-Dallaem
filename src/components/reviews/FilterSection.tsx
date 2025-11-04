import { useEffect, useState } from 'react';
import SelectBox from '../commons/SelectBox';
import DateFilter from './DateFilter';
import SortButton from '../commons/SortButton';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { GENRE_OPTIONS, SORT_OPTIONS } from '@/constants/options';

/**
 * 필터 데이터 타입 정의
 */
export interface FilterData {
	/** 날짜 필터 (yyyy-MM-dd HH:mm a 형식) */
	date?: string;
	/** 지역 필터 */
	location?: string;
	/** 정렬 필터 */
	sortBy?: string;
}

/**
 * 필터 변경 콜백 함수 타입
 */
export type FilterChangeCallback = (filterData: FilterData) => void;

export default function FilterSection({ onFilterChange }: { onFilterChange?: FilterChangeCallback }) {
	const { register, watch } = useForm();
	const [date, setDate] = useState<string>();

	const location = watch('location');
	const sortBy = watch('sort');

	// 필터 값이 변경될 때마다 외부로 전달
	useEffect(() => {
		const filterData: FilterData = {
			date,
			location,
			sortBy
		};
		onFilterChange?.(filterData);
	}, [date, location, sortBy, onFilterChange]);

	return (
		<div className="flex w-full items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				<SelectBox register={register('location')} options={GENRE_OPTIONS} placeholder="장르 선택" />
				<DateFilter
					onChange={date => {
						const formatted = date ? format(date.toString(), 'yyyy-MM-dd') : '';
						setDate(formatted);
					}}
				/>
			</div>
			<SortButton options={SORT_OPTIONS} register={register('sort')} defaultValue={'newest'} />
		</div>
	);
}
