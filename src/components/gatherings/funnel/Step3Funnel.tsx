'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useFunnelStore } from '@/stores/useFunnelStore';
import { Step3Schema, Step3SchemaType } from '@/utils/schema';

import SliderAnimationDiv from '../sliderAnimation/SliderAnimationDiv';

import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringCalendar from '@/components/commons/GatheringCalendar';

export default function Step3Funnel() {
	const {
		control,
		setError,
		getValues,
		formState: { errors }
	} = useFormContext();
	const { next, prev } = useFunnelStore();

	// 이 step만 zodResolver를 임시로 실행
	// 일단 동작은 되서 냅둡니다,,
	// 구현한 이유: react-hook-form의 resolver는 form 전체에 대해서만 동작하기 때문에 각 step마다 validation을 다르게 주고 싶을 때 사용
	const handleNext = async () => {
		const values = getValues();
		const result = Step3Schema.safeParse(values);
		if (!result.success) {
			result.error.issues.forEach(issue =>
				setError(issue.path[0] as keyof Step3SchemaType, {
					type: 'manual',
					message: issue.message
				})
			);
			return;
		}

		next();
	};

	return (
		<SliderAnimationDiv className="flex h-full flex-col justify-between">
			<div className="mt-3 flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<Controller
						name="dateTime"
						control={control}
						defaultValue=""
						render={({ field }) => {
							return (
								<div className="flex flex-col gap-3">
									<label className="leading-base flex text-base font-semibold text-white">모임 날짜</label>
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
				<div className="flex flex-col gap-2">
					<Controller
						name="registrationEnd"
						defaultValue=""
						control={control}
						render={({ field }) => {
							return (
								<div className="flex flex-col gap-3">
									<label className="leading-base flex text-base font-semibold text-white">마감 날짜</label>
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
				<BasicButton onClick={handleNext} className="w-full">
					다음
				</BasicButton>
			</div>
		</SliderAnimationDiv>
	);
}
