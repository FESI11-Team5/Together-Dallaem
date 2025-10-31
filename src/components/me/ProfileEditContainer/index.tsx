'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import { PROFILE_PATHS } from '@/constants/assetPath';
import { useUserStore } from '@/stores/user';
import { useModal } from '@/hooks/useModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import ProfileEditModal from './ProfileEditModal/ProfileEditModal';

const PROFILE_IMAGE_GLOW = '[box-shadow:0_0_2px_#05F2DB,0_0_4px_#05F2DB,0_0_8px_#05F2DB]';

/**
 * @typedef {Object} ProfileUpdateData
 * @property {string} [companyName] - 업데이트할 회사명 (선택 사항).
 * @property {File | null} [image] - 업데이트할 프로필 이미지 파일 또는 null (선택 사항).
 */

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
	const { DEFAULT_PROFILE_SRC, EDIT_ICON_SRC, PROFILE_BACKGROUND_SRC } = PROFILE_PATHS;
	const { openModal } = useModal();
	const { handleError } = useErrorHandler();
	const { user, updateUser } = useUserStore();

	/**
	 * 컴포넌트 마운트 시 최초 사용자 정보를 불러오는 비동기 함수.
	 * `user` 상태가 null일 때만 실행됩니다.
	 * @async
	 */
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				updateUser({ email: data.email, name: data.name, image: data.image, companyName: data.companyName });
			} catch (err) {
				handleError(err);
			}
		};
		if (!user) fetchUserInfo();
	}, [user, updateUser, handleError]);

	/**
	 * 사용자 프로필 정보를 업데이트하는 비동기 콜백 함수.
	 * ProfileEditModal의 onSubmit으로 전달됩니다.
	 * @param {ProfileUpdateData} updated - 업데이트할 사용자 정보 객체.
	 * @async
	 */
	const handleUpdateUserInfo = useCallback(
		async (updated: { companyName?: string; image?: File | null }) => {
			try {
				const updatedUser = await updateUserInfo(updated);
				updateUser({ companyName: updatedUser.companyName, image: updatedUser.image });
			} catch (err) {
				handleError(err);
			}
		},
		[handleError, updateUser]
	);

	/**
	 * 프로필 수정 모달을 여는 콜백 함수.
	 * 수정 버튼 클릭 시 실행됩니다.
	 */
	const handleOpenEditModal = useCallback(() => {
		openModal(
			<ProfileEditModal
				currentCompanyName={user?.companyName}
				currentImage={user?.image}
				onSubmit={handleUpdateUserInfo}
			/>
		);
	}, [openModal, user?.companyName, user?.image, handleUpdateUserInfo]);

	return (
		<section className="tb:mb-7.5 shadow-primary-500 border-primary-100 mb-4 overflow-hidden rounded-3xl border-3 text-white shadow-md">
			{/* 프로필 수정 카드 배경 이미지 섹션*/}
			<div className="before:bg-primary-100 relative flex items-center justify-between px-6 py-4 before:absolute before:bottom-[6px] before:left-0 before:h-[2.5px] before:w-full before:content-['']">
				{/* 배경 이미지 */}
				<Image
					src={PROFILE_BACKGROUND_SRC}
					alt="배경 이미지"
					width={100}
					height={38}
					className="mb:right-[100px] absolute right-15 bottom-[6.5px]"
				/>

				{/* 프로필 사진 표시 영역 */}
				<div
					className={`bg-root absolute top-13 h-16 w-16 rounded-full border-2 border-white/80 ${PROFILE_IMAGE_GLOW}`}>
					<Image
						src={user?.image || DEFAULT_PROFILE_SRC}
						alt="프로필 사진 이미지"
						fill
						className="h-14 w-14 rounded-full object-fill"
					/>
				</div>

				<p className="z-base font-semibold">{user?.name}&apos;s Profile</p>

				{/* 프로필 수정 버튼 (버튼 클릭 시 모달 오픈) */}
				<motion.button
					type="button"
					onClick={handleOpenEditModal}
					className="z-base cursor-pointer rounded-full [box-shadow:0_0_14px_rgba(5,242,219,0.9)] transition duration-50"
					whileHover={{ scale: 1.05, boxShadow: '0 0 10px 2px #05F2DB, 0 0 20px 5px rgba(5,242,219,0.4)' }}
					whileTap={{ scale: 0.95, boxShadow: '0 0 8px #05F2DB' }}
					transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
					<Image src={EDIT_ICON_SRC} alt="회사명 수정 이미지" width={32} height={32} />
				</motion.button>
			</div>

			{/* 프로필 정보 섹션*/}
			<div>
				<dl className="pt-4 pb-4.5 pl-28">
					<div className="flex gap-2 text-sm">
						<dt className="font-medium">E-mail.</dt>
						<dd className="font-normal opacity-80">{user?.email}</dd>
					</div>
					<div className="flex gap-2 text-sm">
						<dt className="font-medium">Nickname.</dt>
						<dd className="font-normal opacity-80">{user?.companyName}</dd>
					</div>
				</dl>
			</div>
		</section>
	);
}
