'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModalClose } from '@/hooks/useModal';
import BasicModal from '@/components/commons/BasicModal';
import BasicButton from '@/components/commons/BasicButton';
import ProfileCompanyInput from './ProfileEditModal/ProfileCompanyInput';
import ProfileImageUploader from './ProfileEditModal/ProfileImageUploader';

interface ProfileEditModalProps {
	currentImage?: string;
	currentCompanyName?: string;
	onSubmit: (newCompanyName: string, newFile?: File) => void;
}

interface FormValues {
	company: string;
}

export default function ProfileEditModal({ currentImage, currentCompanyName, onSubmit }: ProfileEditModalProps) {
	const [file, setFile] = useState<File | null>(null);
	const closeModal = useModalClose();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		setValue
	} = useForm<FormValues>({ mode: 'onChange', defaultValues: { company: currentCompanyName ?? '' } });

	useEffect(() => {
		if (currentCompanyName) setValue('company', currentCompanyName);
	}, [currentCompanyName, setValue]);

	const handleProfileImage = (selectedFile: File) => {
		setFile(selectedFile);
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
					<ProfileImageUploader currentImage={currentImage} onChange={file => handleProfileImage(file)} />
					<div className="text-base font-semibold text-gray-800">회사</div>
					<ProfileCompanyInput register={register} errors={errors} value={companyValue} />
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
