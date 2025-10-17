import { useEffect, useState } from 'react';
import SelectBox from '../commons/SelectBox';
import { GatheringLocation } from '@/types/response/gatherings';
import DateFilter from './DateFilter';
import SortButton from '../commons/SortButton';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

export default function FilterSection({}: {}) {
	const { register, watch } = useForm();
	const [date, setDate] = useState<string>();

	const filterValue = watch('location', 'sort');

	useEffect(() => {
		console.log(filterValue);
	}, [filterValue]);

	return (
		<div className="flex w-full items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				<SelectBox
					register={register('location')}
					options={[
						{ value: 'all', text: '지역 전체' },
						{ value: '건대입구', text: '건대입구' },
						{ value: '을지로3가', text: '을지로3가' },
						{ value: '신림', text: '신림' },
						{ value: '홍대입구', text: '홍대입구' }
					]}
					placeholder="지역 선택"
				/>
				<DateFilter
					onChange={date => {
						const formatted = format(date, 'yyyy-MM-dd HH:mm a');
						setDate(formatted);
					}}
				/>
			</div>
			<SortButton
				options={[
					{ value: 'createdAt', text: '최신순' },
					{ value: 'updatedAt', text: '리뷰 높은 순' },
					{ value: 'score', text: '참여 인원 순' }
				]}
				register={register('sort')}
				defaultValue={'createdAt'}
			/>
		</div>
	);
}
