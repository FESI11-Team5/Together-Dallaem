'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { PROFILE_PATHS } from '@/constants/assetPath';

interface ProfileImageUploaderProps {
	/** 현재 프로필 이미지 URL (기존 이미지 미리보기용) */
	currentImage?: string;
	/** 이미지 변경 시 호출되는 콜백 — 선택된 파일과 미리보기 URL을 전달 */
	onChange: (file: File, preview: string) => void;
}

/**
 * 프로필 이미지를 업로드하고 미리보기를 제공하는 컴포넌트입니다.
 *
 * @component
 * @returns {JSX.Element} 프로필 이미지 업로드 UI를 렌더링합니다.
 */
export default function ProfileImageUploader({ currentImage, onChange }: ProfileImageUploaderProps) {
	const [preview, setPreview] = useState<string | undefined>(currentImage);
	const { DEFAULT_PROFILE_SRC, EDIT_ICON_SRC } = PROFILE_PATHS;
	const fileInputRef = useRef<HTMLInputElement>(null);

	/**
	 * 파일 입력(Input) 변경 이벤트 핸들러.
	 * 선택된 파일을 읽어 미리보기 URL을 생성하고 onChange 콜백을 호출합니다.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - 파일 입력 이벤트 객체
	 */
	const handleProfileImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = e.target.files?.[0];

			if (!selectedFile) return;

			const reader = new FileReader();

			reader.onload = () => {
				if (typeof reader.result === 'string') {
					const result = reader.result;
					setPreview(result);
					onChange(selectedFile, result);
				}
			};
			reader.readAsDataURL(selectedFile);
		},
		[onChange]
	);

	const handleButtonClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return (
		<>
			<button
				type="button"
				className="relative h-16 w-16 cursor-pointer rounded-full bg-white"
				onClick={handleButtonClick}>
				<Image src={preview || DEFAULT_PROFILE_SRC} alt="프로필 사진" fill className="rounded-full object-fill" />
				<div className="bg-root absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full">
					<Image src={EDIT_ICON_SRC} alt="프로필 변경 아이콘" width={18} height={18} />
				</div>
			</button>

			<input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImage} />
		</>
	);
}
