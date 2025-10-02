'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

interface ProfileImageUploaderProps {
	currentImage?: string;
	onChange: (file: File, preview: string) => void;
}

export default function ProfileImageUploader({ currentImage, onChange }: ProfileImageUploaderProps) {
	const defaultImage = '/images/profile_edit.svg';
	const [preview, setPreview] = useState(currentImage);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) return;

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result) {
				const result = reader.result as string;
				setPreview(result);
				onChange(selectedFile, result);
			}
		};
		reader.readAsDataURL(selectedFile);
	};

	return (
		<>
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
		</>
	);
}
