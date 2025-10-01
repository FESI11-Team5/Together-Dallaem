'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import { useScreenSize } from './useScreenSize';
import { profileAssets } from './ProfileAssets';
import ProfileEditModal from './ProfileEditModal';
import { getUserInfo, updateUserInfo } from '@/apis/auths/users';
import { UserInfo } from '@/types/user';

/**
 * `ProfileEditCard` 컴포넌트
 *
 * 사용자의 프로필 정보를 표시하고, 프로필 사진 및 회사명을 수정할 수 있는 UI를 제공합니다.
 * - 프로필 카드 배경 이미지, 사진, 회사명, 이름, 이메일 표시
 * - 화면 크기(screenSize)에 따라 다른 배경 이미지 및 버튼 이미지를 적용
 * - 회사명 수정 버튼 클릭 시 Modal을 표시
 *
 * @component
 * @returns {JSX.Element} 프로필 카드 UI 및 Modal을 렌더링합니다.
 */
export default function ProfileEditCard() {
	const [userInfo, setUserInfo] = useState<UserInfo>({
		teamId: 5,
		id: 5,
		name: '코드잇',
		companyName: '코드잇',
		email: 'codeit@test.com',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	});
	const { openModal } = useModal();
<<<<<<< HEAD
=======

>>>>>>> f7e11d1 (TD-24 Fix: 기존 임시 모달을 BasicModal로 변경)
	const screenSize = useScreenSize();
	const { bg, edit } = useMemo(() => profileAssets[screenSize], [screenSize]);

	//초기 데이터 불러오기
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				setUserInfo(data);
			} catch (err) {
				console.error('인증이 필요합니다', err);
			}
		};
		fetchUserInfo();
	}, []);

<<<<<<< HEAD
	// 회사명 + 업데이트
	const handleUpdateUserInfo = async (updated: { companyName?: string; image?: File }) => {
		try {
			const updatedUser = await updateUserInfo(updated);
			setUserInfo(updatedUser);
=======
	// 회사명 업데이트
	const handleUpdateCompany = async (newCompanyName: string) => {
		try {
			if (!userInfo) return;
			const updatedUser = await updateUserInfo({ companyName: newCompanyName });
			updateUserInfo(updatedUser);
>>>>>>> f7e11d1 (TD-24 Fix: 기존 임시 모달을 BasicModal로 변경)
		} catch (err) {
			console.error('회사명 수정 실패', err);
		}
	};

	return (
		<>
			<div className="pc:mb-7.5 mb-4 overflow-hidden rounded-3xl border-2 border-gray-200">
				{/* 프로필 수정 카드 배경 이미지 */}
				<div className="relative flex items-center justify-between bg-orange-400 px-6 py-4 before:absolute before:bottom-1.5 before:left-0 before:h-0.5 before:w-full before:bg-orange-600 before:content-['']">
					<Image
						src={bg.src}
						alt="배경 이미지"
						width={bg.width}
						height={bg.height}
						className="tb:right-[157px] pc:right-[155px] absolute right-15 bottom-[6.5px]"
					/>

					{/* 프로필 사진 수정 버튼 */}
					<label
						htmlFor="profile-image-upload"
						className="absolute top-12.5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-4xl bg-white">
						<Image
<<<<<<< HEAD
							src={userInfo.image || edit.src}
=======
							src={edit.src}
>>>>>>> f7e11d1 (TD-24 Fix: 기존 임시 모달을 BasicModal로 변경)
							alt="프로필 사진 이미지"
							width={edit.width}
							height={edit.height}
							className="h-14 w-14 rounded-full object-cover"
						/>
					</label>

					<p className="text-pc z-10 font-semibold text-gray-900">내 프로필</p>

					{/* 회사명 수정 버튼 */}
					<button
<<<<<<< HEAD
						type="button"
						onClick={() =>
							openModal(
								<ProfileEditModal
									currentCompanyName={userInfo.companyName}
									currentImage={userInfo.image}
									onSubmit={handleUpdateUserInfo}
								/>
							)
=======
						title="modal-button"
						type="button"
						onClick={() =>
							openModal(<Modal onSubmit={handleUpdateCompany} currentCompanyName={userInfo.companyName} />)
>>>>>>> f7e11d1 (TD-24 Fix: 기존 임시 모달을 BasicModal로 변경)
						}
						className="z-10 cursor-pointer">
						<Image src="/images/companyName_edit.svg" alt="회사명 수정 이미지" width={32} height={32} />
					</button>
				</div>

				{/* 프로필 정보 */}
				<div>
					<div className="tb:pt-3 tb:pb-4 pt-3.5 pb-4.5 pl-23">
						<div className="mb-2.5 text-gray-800">
							<p className="text-base font-semibold">{userInfo?.name || 'Name'}</p>
						</div>

						<div className="flex gap-1.5 text-sm">
							<p className="font-medium">company.</p>
							<p className="font-normal text-gray-700">{userInfo?.companyName || 'Company Name'}</p>
						</div>

						<div className="flex gap-1.5 text-sm">
							<p className="font-medium">E-mail.</p>
							<p className="font-normal text-gray-700">{userInfo?.email || 'Email'}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
