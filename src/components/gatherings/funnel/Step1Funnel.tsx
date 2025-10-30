'use client';

import { useFormContext } from 'react-hook-form';
import { useFunnelStore } from '@/stores/useFunnelStore';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import SelectBox from '@/components/commons/SelectBox';

export default function Step1Funnel() {
	const {
		register,
		trigger,
		formState: { errors }
	} = useFormContext();

	const { next } = useFunnelStore();

	const handleNext = async () => {
		const isStepValid = await trigger(['name', 'location']);
		if (isStepValid) next();
	};

	return (
		<div className="flex h-full flex-col justify-between">
			<div className="mt-3 flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<BasicInput
						id="gathering-name"
						label="크루명"
						placeholder="네온 신호 수신 중... 크루명을 입력하세요 💫"
						className="w-full"
						register={register('name')}
					/>
					{typeof errors.name?.message === 'string' && (
						<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.name.message}</p>
					)}
				</div>

				<div className="flex w-full flex-col gap-3">
					<label htmlFor="gathering-location" className="leading-base flex text-base font-semibold text-white">
						장르 선택
					</label>
					<SelectBox
						options={[
							{ value: '건대입구', text: 'AOS' },
							{ value: '을지로3가', text: 'Adventure' },
							{ value: '신림', text: 'FPS' },
							{ value: '홍대입구', text: 'RPG' }
						]}
						expanded
						placeholder="👾 사이버 존 접속 중... 당신의 장르는?"
						register={register('location')}
					/>
					{typeof errors.location?.message === 'string' && (
						<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.location.message}</p>
					)}
				</div>
			</div>

			<BasicButton onClick={handleNext} className="max-mb:mt-6 w-full">
				다음
			</BasicButton>
		</div>
	);
}
