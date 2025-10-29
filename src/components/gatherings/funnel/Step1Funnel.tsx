'use client';

import { useFormContext } from 'react-hook-form';
import { useFunnelStore } from '@/stores/useFunnelStore';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import SelectBox from '@/components/commons/SelectBox';

export default function Step1Funnel() {
	const {
		register,
		watch,
		formState: { errors }
	} = useFormContext();
	const { next } = useFunnelStore();
	const validWordLength = watch('name')?.length;
	const validName = watch('location');
	const isValid = validWordLength >= 2 && validWordLength <= 20 && validName;
	return (
		<div className="flex h-full flex-col justify-between">
			<div className="mt-15 flex flex-col gap-6">
				<div className="flex flex-col gap-3">
					<BasicInput
						id="gathering-name"
						label="모임 이름"
						placeholder="모임 이름을 작성해주세요"
						className="w-full"
						register={register('name')}
					/>

					{typeof errors.name?.message === 'string' && (
						<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.name?.message}</p>
					)}
				</div>

				<div className="flex w-full flex-col gap-3">
					<label htmlFor="gathering-location" className="leading-base flex text-base font-semibold text-gray-800">
						장소
					</label>
					<SelectBox
						options={[
							{ value: '건대입구', text: '건대입구' },
							{ value: '을지로3가', text: '을지로3가' },
							{ value: '신림', text: '신림' },
							{ value: '홍대입구', text: '홍대입구' }
						]}
						expanded
						placeholder="장소를 선택해주세요"
						register={register('location')}
					/>
					{typeof errors.location?.message === 'string' && (
						<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.location.message}</p>
					)}
				</div>
			</div>
			<BasicButton onClick={next} isActive={isValid} className="max-mb:mt-6 w-full">
				다음
			</BasicButton>
		</div>
	);
}
