'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useModalClose } from '@/hooks/useModal';
import BasicModal from '@/components/commons/BasicModal';
import BasicInput from '@/components/commons/BasicInput';
import BasicButton from '@/components/commons/BasicButton';

interface ModalProps {
	currentImage?: string;
	currentCompanyName?: string;
	onSubmit: (newCompanyName: string, newFile?: File) => void;
}

interface FormValues {
	company: string;
}

export default function Modal({ currentImage, currentCompanyName, onSubmit }: ModalProps) {
	const defaultImage = '/images/profile_edit.svg';
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState(currentImage);

	const closeModal = useModalClose();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		setValue
	} = useForm<FormValues>({ mode: 'onChange', defaultValues: { company: currentCompanyName ?? '' } });

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (currentCompanyName) setValue('company', currentCompanyName);
		if (currentImage) setPreview(currentImage);
	}, [currentCompanyName, currentImage, setValue]);

	const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) return;

		setFile(selectedFile);

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result) setPreview(reader.result as string);
		};

		reader.readAsDataURL(selectedFile);
	};

	const onFormSubmit = (data: FormValues) => {
		const trimmed = data.company.trim();
		if (!trimmed) return;
		onSubmit(trimmed, file ?? undefined);
		closeModal();
	};

	const companyValue = watch('company');

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-118 min-w-[295px]">
			<form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col items-start gap-6 self-stretch">
				<div className="flex w-full flex-col items-start gap-6">
					{/* 프로필 사진 및 수정 버튼 */}
					<button type="button" className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
						<Image
							src={preview || defaultImage}
							alt="프로필 사진"
							width={56}
							height={56}
							className="rounded-full object-fill"
							style={{ width: 56, height: 56 }}
						/>
						<div className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white">
							<Image src="/icons/edit.svg" alt="프로필 변경 아이콘" width={18} height={18} />
						</div>
					</button>

					<input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImage} />

					<div className="text-base font-semibold text-gray-800">회사</div>

					<BasicInput
						placeholder="회사명"
						register={register('company', {
							required: '회사명을 입력하세요'
						})}
						required
						isValid={!errors.company}
						invalidText="회사명을 입력해주세요"
						value={companyValue}
					/>
				</div>

				<div className="flex items-start gap-4 self-stretch">
					<BasicButton onClick={closeModal} outlined isLarge>
						취소
					</BasicButton>
					<BasicButton isActive={!!companyValue.trim() && isValid} isLarge>
						수정하기
					</BasicButton>
				</div>
			</form>
		</BasicModal>
	);
}
