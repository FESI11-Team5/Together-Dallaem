'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import { useScreenSize } from './hooks/useScreenSize';
import { profileAssets } from './assets/profileAssets';
import ProfileEditModal from '../ProfileEditModal/ProfileEditModal';
import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import { UserInfo } from '@/types/response/user';

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
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const { openModal } = useModal();
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
				// TODO: 인증 실패 시 로그인 안내 모달을 띄우도록 구현
			}
		};
		fetchUserInfo();
	}, []);

	const handleUpdateUserInfo = async (updated: { companyName?: string; image?: File | null }) => {
		try {
			const updatedUser = await updateUserInfo(updated);

			setUserInfo(updatedUser);
		} catch (err) {
			console.error('회사명 수정 실패', err);
			// TODO: 실패 시 사용자에게 알림 모달을 띄우도록 구현
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
					<div className="absolute top-12.5 flex h-16 w-16 items-center justify-center rounded-4xl bg-white">
						<Image
							src={userInfo?.image || edit.src}
							alt="프로필 사진 이미지"
							width={56}
							height={56}
							className="h-14 w-14 rounded-full object-cover"
							unoptimized
						/>
					</div>

					<p className="text-pc z-10 font-semibold text-gray-900">내 프로필</p>

					{/* 회사명 수정 버튼 */}
					<button
						type="button"
						onClick={() =>
							openModal(
								<ProfileEditModal
									currentCompanyName={userInfo?.companyName}
									currentImage={userInfo?.image}
									onSubmit={handleUpdateUserInfo}
								/>
							)
						}
						className="z-10 cursor-pointer">
						<Image src="/icons/edit.svg" alt="회사명 수정 이미지" width={32} height={32} />
					</button>
				</div>

				{/* 프로필 정보 */}
				<div>
					<div className="tb:pt-3 tb:pb-4 pt-3.5 pb-4.5 pl-23">
						<div className="mb-2.5 text-gray-800">
							<p className="text-base font-semibold">{userInfo?.name}</p>
						</div>

						<div className="flex gap-1.5 text-sm">
							<p className="font-medium">company.</p>
							<p className="font-normal text-gray-700">{userInfo?.companyName}</p>
						</div>

						<div className="flex gap-1.5 text-sm">
							<p className="font-medium">E-mail.</p>
							<p className="font-normal text-gray-700">{userInfo?.email}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
