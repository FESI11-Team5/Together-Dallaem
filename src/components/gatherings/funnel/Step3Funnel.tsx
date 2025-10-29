'use client';

import { useFunnelStore } from '@/stores/useFunnelStore';

import BasicButton from '@/components/commons/basic/BasicButton';
import { Controller, useFormContext } from 'react-hook-form';
import GatheringCalendar from '@/components/commons/GatheringCalendar';

export default function Step3Funnel() {
	const {
		control,
		watch,
		formState: { errors }
	} = useFormContext();
	const { next, prev } = useFunnelStore();
	const dateTime = watch('dateTime');
	const registrationEnd = watch('registrationEnd');
	const isValid = dateTime && registrationEnd;
	return (
		<div className="flex h-full flex-col justify-between">
			<div className="flex h-full flex-col justify-center gap-6">
				<div className="flex flex-col gap-3">
					<Controller
						name="dateTime"
						control={control}
						render={({ field }) => {
							return (
								<div className="flex flex-col gap-3">
									<label className="leading-base flex text-base font-semibold text-gray-800">모임 날짜</label>
									<GatheringCalendar
										pageType="create"
										value={field.value ? new Date(field.value) : undefined}
										onChange={(date: Date) => {
											const isoFormatted = date.toISOString();
											field.onChange(isoFormatted);
										}}
									/>
									{typeof errors.dateTime?.message === 'string' && (
										<p className="leading-sm text-highlight text-start text-sm font-semibold">
											{errors.dateTime?.message}
										</p>
									)}
								</div>
							);
						}}
					/>
				</div>

				{/* 마감 날짜 */}
				<div className="flex flex-col gap-3">
					<Controller
						name="registrationEnd"
						control={control}
						render={({ field }) => {
							return (
								<div className="flex flex-col gap-3">
									<label className="leading-base flex text-base font-semibold text-gray-800">마감 날짜</label>

									<GatheringCalendar
										pageType="create"
										value={field.value ? new Date(field.value) : undefined}
										onChange={(date: Date) => {
											const isoFormatted = date.toISOString();
											field.onChange(isoFormatted);
										}}
									/>

									{typeof errors.registrationEnd?.message === 'string' && (
										<p className="leading-sm text-highlight text-start text-sm font-semibold">
											{errors.registrationEnd?.message}
										</p>
									)}
								</div>
							);
						}}
					/>
				</div>
			</div>
			<div className="max-mb:flex-col max-mb:mt-2 flex flex-row gap-2">
				<BasicButton onClick={prev} outlined className="w-full">
					이전
				</BasicButton>
				<BasicButton onClick={next} isActive={isValid} className="w-full">
					다음
				</BasicButton>
			</div>
		</div>
	);
}
