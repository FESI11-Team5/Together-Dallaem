'use client';

import { useRef, useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { useFunnelStore } from '@/stores/useFunnelStore';

import Image from 'next/image';
import SliderAnimationDiv from '../sliderAnimation/SliderAnimationDiv';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import BasicCheckBox from '@/components/commons/basic/BasicCheckBox';

export default function Step2Funnel() {
	const {
		setValue,
		control,
		watch,
		trigger,
		formState: { errors }
	} = useFormContext();
	const { next, prev, fileUrl, setFileUrl } = useFunnelStore();
	const [imagePreview, setImagePreview] = useState(fileUrl || '');
	const [imageName, setImageName] = useState('');
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const file = watch('image');

	useEffect(() => {
		if (file instanceof File) {
			const url = URL.createObjectURL(file);
			setFileUrl(url);
			setImagePreview(url);
			setImageName(file.name);
		}
	}, [file]);

	const handleNext = async () => {
		const isStepValid = await trigger(['type', 'image']);
		if (isStepValid) next();
	};

	return (
		<SliderAnimationDiv className="flex h-full flex-col justify-between">
			<div className="mt-3 flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<div className="flex w-full flex-col gap-3">
								<label className="font-semibold text-white">선택 서비스</label>
								<div className="max-mb:flex-wrap flex w-full justify-between gap-3">
									<BasicCheckBox
										title="함께 플레이"
										content="스팀"
										checked={field.value === 'OFFICE_STRETCHING'}
										onChange={() => field.onChange(field.value === 'OFFICE_STRETCHING' ? '' : 'OFFICE_STRETCHING')}
									/>

									<BasicCheckBox
										title="함께 플레이"
										content="온라인"
										checked={field.value === 'MINDFULNESS'}
										onChange={() => field.onChange(field.value === 'MINDFULNESS' ? '' : 'MINDFULNESS')}
									/>

									<BasicCheckBox
										title="교환/통신하기"
										checked={field.value === 'WORKATION'}
										onChange={() => field.onChange(field.value === 'WORKATION' ? '' : 'WORKATION')}
									/>
								</div>
								{typeof errors.type?.message === 'string' && (
									<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.type?.message}</p>
								)}
							</div>
						)}
					/>

					<div className="flex w-full flex-col gap-3">
						<div className="flex justify-between">
							<input
								id="gathering-image"
								type="file"
								accept="image/*"
								className="hidden"
								ref={fileInputRef}
								onChange={e => {
									const file = e.target.files?.[0];
									if (file) {
										setValue('image', file, { shouldValidate: true });
										const url = URL.createObjectURL(file);
										setFileUrl(url);
									}
								}}
							/>

							<div className="flex w-full gap-3">
								<div className="flex-1">
									<BasicInput
										id="gathering-image"
										label="이미지"
										placeholder={imageName || '이미지를 첨부해주세요'}
										readOnly
									/>
								</div>
								<div className="flex items-end justify-end">
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="border-primary-600 text-primary-600 bg-root flex w-[100px] cursor-pointer items-center justify-center rounded-[12px] border-1 py-3">
										파일 찾기
									</button>
								</div>
							</div>
						</div>
						{typeof errors.image?.message === 'string' && (
							<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.image?.message}</p>
						)}
						{imagePreview && (
							<div className="border-primar-dark mt-2 mb-4 h-[100px] w-[100px] overflow-hidden rounded-2xl border-2">
								<Image src={imagePreview} alt="Preview" width={100} height={100} className="object-cover" />
							</div>
						)}
					</div>
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
