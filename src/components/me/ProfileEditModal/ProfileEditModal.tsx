'use client';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModalClose } from '@/hooks/useModal';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicInput from '@/components/commons/basic/BasicInput';
import BasicButton from '@/components/commons/basic/BasicButton';
import ProfileImageUploader from '../ProfileEditCard/ProfileImageUploader';
import { useKeyActions } from '@/hooks/useKeyActions';

interface ProfileEditModalProps {
	/** 현재 사용자의 프로필 이미지 URL */
	currentImage?: string;
	/** 현재 사용자의 회사명 */
	currentCompanyName?: string;
	/** 수정 완료 시 호출되는 콜백 함수 — 새 회사명과 이미지 파일을 반환 */
	onSubmit: (updated: { companyName?: string; image?: File }) => void;
}

interface FormValues {
	/** 사용자가 입력한 회사명 */
	companyName: string;
}

/**
 * 프로필 정보를 수정할 수 있는 모달 컴포넌트입니다.
 *
 * - 회사명과 프로필 이미지를 변경할 수 있습니다.
 * - `react-hook-form`을 이용해 입력값을 관리하며,
 * - `useKeyActions` 훅을 통해 Enter(수정), Escape(닫기) 키를 지원합니다.
 *
 * @component
 * @example
 * ```tsx
 * <ProfileEditModal
 *   currentImage="/profile.jpg"
 *   currentCompanyName="OpenAI"
 *   onSubmit={({ companyName, image }) => console.log(companyName, image)}
 * />
 * ```
 */
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
		<BasicModal onClose={closeModal} className="tb:min-w-118">
			<h1 className="text-lg font-semibold">프로필 수정하기</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit(handleFormSubmit)();
				}}
				className="mt-6 flex flex-col items-start gap-6 self-stretch">
				<div className="flex w-full flex-col items-start gap-6">
					<ProfileImageUploader currentImage={currentImage} onChange={handleProfileImage} />
					<div className="w-full">
						<BasicInput
							id="companyName"
							label="회사"
							placeholder="회사명"
							register={register('companyName', { required: true })}
							isValid={isCompanyNameValid}
							invalidText="회사명을 입력해주세요"
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
