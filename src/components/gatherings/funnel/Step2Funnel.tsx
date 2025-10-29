'use client';

import { useRef, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { useFunnelStore } from '@/stores/useFunnelStore';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import BasicCheckBox from '@/components/commons/basic/BasicCheckBox';

export default function Step2Funnel() {
	const {
		setValue,
		control,
		watch,
		formState: { errors }
	} = useFormContext();
	const { next, prev, fileUrl, setFileUrl } = useFunnelStore();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const file = watch('image');
	const type = watch('type');

	useEffect(() => {
		if (file instanceof File) {
			setFileUrl(URL.createObjectURL(file));
		}
	}, [file]);

	const isValid = file && type;

	return (
		<div className="flex h-full flex-col justify-center">
			<div className="flex h-full flex-col justify-center gap-6">
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<div className="flex w-full flex-col gap-3">
							<label className="font-semibold text-gray-900">선택 서비스</label>
							<div className="flex w-full flex-wrap items-start gap-3">
								<BasicCheckBox
									title="달램핏"
									content="오피스 트레이닝"
									checked={field.value === 'OFFICE_STRETCHING'}
									onChange={() => field.onChange(field.value === 'OFFICE_STRETCHING' ? '' : 'OFFICE_STRETCHING')}
								/>

								<BasicCheckBox
									title="달램핏"
									content="마인드풀니스"
									checked={field.value === 'MINDFULNESS'}
									onChange={() => field.onChange(field.value === 'MINDFULNESS' ? '' : 'MINDFULNESS')}
								/>

								<BasicCheckBox
									title="위케이션"
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

				<div className="flex w-full justify-between">
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
								placeholder={fileUrl || '이미지를 첨부해주세요'}
								readOnly
							/>
						</div>
						<div className="flex items-end justify-end">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="border-primary-600 text-primary-600 flex w-[100px] cursor-pointer items-center justify-center rounded-[12px] border-1 bg-black py-3">
								파일 찾기
							</button>
						</div>
					</div>
				</div>

				{typeof errors.image?.message === 'string' && (
					<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.image?.message}</p>
				)}
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
