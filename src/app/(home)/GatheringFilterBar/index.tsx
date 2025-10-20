'use client';

import GatheringTabs from '@/app/(home)/GatheringTabs';
import SearchCalendar from '@/app/(home)/SearchCalendar';
import BasicButton from '@/components/commons/basic/BasicButton';
import SelectBox from '@/components/commons/SelectBox';
import SortButton from '@/components/commons/SortButton';
import GatheringModal from '@/components/gatherings/GatheringModal';
import { LOCATION_OPTIONS, SORT_OPTIONS } from '@/constants/options';
import { useModal } from '@/hooks/useModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, type UseFormRegisterReturn } from 'react-hook-form';

export interface FilterCriteria {
	type: string;
	location: string | number;
	date?: Date;
	sort: string;
}

interface GatheringFilterBarProps {
	setFilterCriteria: Dispatch<SetStateAction<FilterCriteria>>;
}

interface SortFormValues {
	sort: string;
}

export default function GatheringFilterBar({ setFilterCriteria }: GatheringFilterBarProps) {
	const { openModal } = useModal();
	const [selectedType, setSelectedType] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<string | number>('');
	const [selectedDate, setSelectedDate] = useState<Date>();

	const methods = useForm<SortFormValues>({
		defaultValues: { sort: 'deadlineLate' }
	});
	const { control, watch } = methods;
	const selectedSort = watch('sort');

	useEffect(() => {
		setFilterCriteria({
			type: selectedType,
			location: selectedLocation,
			date: selectedDate,
			sort: selectedSort
		});
	}, [selectedType, selectedLocation, selectedDate, selectedSort, setFilterCriteria]);

	return (
		<FormProvider {...methods}>
			<div className="flex w-full flex-col gap-4">
				<GatheringTabs
					setSelectedType={setSelectedType}
					button={<BasicButton onClick={() => openModal(<GatheringModal />)}>모임 만들기</BasicButton>}
				/>
				<hr />

				<div className="flex w-full justify-between">
					<div className="flex gap-2">
						{/* // TODO: 반응형 부분은 동적으로 불러오는 거 말고 브레이크 포인트로 가능한지 논의 */}
						<SelectBox options={LOCATION_OPTIONS} placeholder="지역 전체" size="small" onChange={setSelectedLocation} />
						<SearchCalendar date={selectedDate} setDate={setSelectedDate} />
					</div>
					<Controller
						name="sort"
						control={control}
						render={({ field }) => (
							<SortButton
								options={SORT_OPTIONS}
								defaultValue={field.value}
								register={
									{
										name: field.name,
										onChange: field.onChange,
										onBlur: field.onBlur,
										ref: field.ref
									} as unknown as UseFormRegisterReturn
								}
							/>
						)}
					/>
				</div>
			</div>
		</FormProvider>
	);
}
