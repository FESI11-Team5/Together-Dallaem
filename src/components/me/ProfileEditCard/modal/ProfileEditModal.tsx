'use client';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModalClose } from '@/hooks/useModal';
import BasicModal from '@/components/commons/BasicModal';
import BasicInput from '@/components/commons/BasicInput';
import BasicButton from '@/components/commons/BasicButton';
import ProfileImageUploader from '../ProfileImageUploader';
import { useKeyActions } from '@/hooks/useKeyActions';

interface ProfileEditModalProps {
	currentImage?: string;
	currentCompanyName?: string;
	onSubmit: (updated: { companyName?: string; image?: File }) => void;
}

interface FormValues {
	companyName: string;
}

export default function ProfileEditModal({ currentImage, currentCompanyName, onSubmit }: ProfileEditModalProps) {
	const [file, setFile] = useState<File | null>(null);
	const closeModal = useModalClose();

	const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: { companyName: currentCompanyName ?? '' }
	});

	useEffect(() => {
		if (currentCompanyName) {
			setValue('companyName', currentCompanyName);
		}
	}, [currentCompanyName, setValue]);

	const companyNameValue = watch('companyName') ?? '';
	const isCompanyNameValid = companyNameValue.trim().length >= 2;

	const handleProfileImage = useCallback((selectedFile: File) => {
		setFile(selectedFile);
	}, []);

	const handleFormSubmit = useCallback(
		(data: FormValues) => {
			if (!isCompanyNameValid) return;
			onSubmit({ companyName: data.companyName.trim(), image: file ?? undefined });
			closeModal();
		},
		[file, onSubmit, closeModal, isCompanyNameValid]
	);

	useKeyActions({
		onEscape: closeModal,
		onEnter: () => {
			if (isCompanyNameValid) handleFormSubmit({ companyName: companyNameValue });
		},
		enabled: true
	});

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-118 !p-0">
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit(handleFormSubmit)();
				}}
				className="flex flex-col items-start gap-6 self-stretch">
				<div className="flex w-full flex-col items-start gap-6">
					<ProfileImageUploader currentImage={currentImage} onChange={handleProfileImage} />
					<div className="text-base font-semibold text-gray-800">회사</div>
					<div className="w-full">
						<BasicInput
							placeholder="회사명"
							register={register('companyName', { required: true })}
							isValid={isCompanyNameValid}
							invalidText="회사명을 입력해주세요"
							className="!min-w-0"
						/>
					</div>
				</div>

				<div className="flex items-start gap-4 self-stretch">
					<BasicButton onClick={closeModal} isLarge outlined>
						취소
					</BasicButton>
					<BasicButton isActive={isCompanyNameValid} isLarge onClick={handleSubmit(handleFormSubmit)}>
						수정하기
					</BasicButton>
				</div>
			</form>
		</BasicModal>
	);
}
