'use client';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

const profileEditSchema = z.object({
	companyName: z.string().min(2, { message: '회사명을 입력해주세요.' })
});

type FormValues = z.infer<typeof profileEditSchema>;

/**
 * `ProfileEditModal` 컴포넌트
 *
 * 사용자 프로필 정보를 수정할 수 있는 모달을 제공합니다.
 * - 회사명과 프로필 이미지를 변경할 수 있음
 * - `react-hook-form` + `zod`를 사용한 유효성 검사 지원
 * - `useKeyActions` 훅을 이용하여 Enter 키(수정) 및 Escape 키(닫기) 지원
 *
 * @param {ProfileEditModalProps} props - 컴포넌트 props
 * @param {string} [props.currentImage] - 현재 사용자의 프로필 이미지 URL
 * @param {string} [props.currentCompanyName] - 현재 사용자의 회사명
 * @param {(updated: { companyName?: string; image?: File }) => void} props.onSubmit - 수정 완료 시 호출되는 콜백
 *
 * @returns {JSX.Element} 모달 UI
 *
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

	const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(profileEditSchema),
		defaultValues: { companyName: currentCompanyName ?? '' }
	});

	useEffect(() => {
		if (currentCompanyName) setValue('companyName', currentCompanyName);
	}, [currentCompanyName, setValue]);

	const isCompanyNameValid = !formState.errors.companyName;

	const handleProfileImage = useCallback((selectedFile: File) => {
		setFile(selectedFile);
	}, []);

	const handleFormSubmit = async (data: FormValues) => {
		onSubmit({ companyName: data.companyName.trim(), image: file ?? undefined });
		closeModal();
	};

	useKeyActions({
		onEscape: closeModal,
		enabled: true
	});

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-118">
			<h1 className="text-lg font-semibold">프로필 수정하기</h1>
			<form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 flex flex-col items-start gap-6 self-stretch">
				<div className="flex w-full flex-col items-start gap-6">
					<ProfileImageUploader currentImage={currentImage} onChange={handleProfileImage} />
					<div className="w-full">
						<BasicInput
							id="companyName"
							label="회사"
							placeholder="회사명"
							register={register('companyName')}
							isValid={isCompanyNameValid}
							invalidText={formState.errors.companyName?.message}
						/>
					</div>
				</div>

				<div className="flex items-start gap-4 self-stretch">
					<BasicButton onClick={closeModal} isLarge outlined type="button">
						취소
					</BasicButton>
					<BasicButton isActive={isCompanyNameValid} isLarge type="submit">
						수정하기
					</BasicButton>
				</div>
			</form>
		</BasicModal>
	);
}
