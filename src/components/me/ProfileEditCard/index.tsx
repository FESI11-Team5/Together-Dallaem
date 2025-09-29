'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useScreenSize } from './useScreenSize';
import { profileAssets } from './ProfileAssets';
import Modal from './Modal';
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
	// 프로필 사진 업로드 상태
	const [modalStatus, setModalStatus] = useState(false); // Modal 상태
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const screenSize = useScreenSize(); // 스크린 크기에 따라 모바일, 태블릿, 데스크탑 상태 관리

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

	// 버튼을 누르면 Modal 상태 변화
	const handleModalStatus = () => {
		setModalStatus(!modalStatus);
	};

	// 회사명 업데이트
	const handleUpdateCompany = async (newCompanyName: string) => {
		try {
			if (!userInfo) return;
			const updatedUser = await updateUserInfo({ companyName: newCompanyName });
			updateUserInfo(updatedUser);
			setModalStatus(false);
		} catch (err) {
			console.error('회사명 수정 실패', err);
		}
	};

	const { bg, edit } = useMemo(() => profileAssets[screenSize], [screenSize]);

	return (
		<>
			<div className="pc:mb-7.5 mb-4 overflow-hidden rounded-3xl border-2 border-gray-200">
				{/* 프로필 수정 카드 배경 이미지 */}
				<div className="relative flex items-center justify-between bg-orange-400 px-6 py-4 before:absolute before:bottom-1.5 before:left-0 before:h-0.5 before:w-full before:bg-orange-600 before:content-['']">
					<Image
						src={bg.src}
						alt="프로필 배경 이미지"
						width={bg.width}
						height={bg.height}
						className="tb:right-[157px] pc:right-[155px] absolute right-15 bottom-[6.5px]"
					/>

					{/* 프로필 사진 수정 버튼 */}
					<label
						htmlFor="profile-image-upload"
						className="absolute top-12.5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-4xl bg-white">
						<Image
							src={edit.src}
							alt="프로필 사진 수정 이미지"
							width={edit.width}
							height={edit.height}
							className="h-14 w-14 rounded-full object-cover"
						/>
						<input id="profile-image-upload" type="file" accept="image/*" className="hidden" />
					</label>

					<p className="text-pc z-10 font-semibold text-gray-900">내 프로필</p>

					{/* 회사명 수정 버튼 */}
					<button title="modal-button" type="button" onClick={handleModalStatus} className="z-10 cursor-pointer">
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

			{/* 회사명 수정 Modal */}
			{modalStatus && (
				<Modal setModal={handleModalStatus} onSubmit={handleUpdateCompany} currentCompanyName={userInfo?.companyName} />
			)}
		</>
	);
}
