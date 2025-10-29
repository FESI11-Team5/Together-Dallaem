'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import { PROFILE_PATHS } from '@/constants/assetPath';
import { getUserInfo, updateUserInfo } from '@/apis/auths/user';
import { useUserStore } from '@/stores/user';
import ProfileEditModal from '../ProfileEditContainer/ProfileEditModal/ProfileEditModal';
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
	const { openModal } = useModal();
	const { user, updateUser } = useUserStore();
	const { PROFILE_BACKGROUND_SRC, DEFAULT_PROFILE_SRC, EDIT_ICON_SRC } = PROFILE_PATHS;

	//초기 데이터 불러오기
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				updateUser({ email: data.email, name: data.name, image: data.image, companyName: data.companyName });
			} catch (err) {
				console.error('인증이 필요합니다', err);
				// TODO: 인증 실패 시 로그인 안내 모달을 띄우도록 구현
			}
		};
		if (!user) fetchUserInfo();
	}, [user, updateUser]);

	const handleUpdateUserInfo = async (updated: { companyName?: string; image?: File | null }) => {
		try {
			const updatedUser = await updateUserInfo(updated);
			updateUser({ companyName: updatedUser.companyName, image: updatedUser.image });
		} catch (err) {
			console.error('회사명 수정 실패', err);
			// TODO: 실패 시 사용자에게 알림 모달을 띄우도록 구현
		}
	};

	return (
		<>
			<div className="pc:mb-7.5 mb-4 overflow-hidden rounded-3xl border-2 border-gray-200">
				{/* 프로필 수정 카드 배경 이미지 */}
				<div className="bg-primary-400 before:bg-primary-600 relative flex items-center justify-between px-6 py-4 before:absolute before:bottom-1.5 before:left-0 before:h-0.5 before:w-full before:content-['']">
					<Image
						src={PROFILE_BACKGROUND_SRC}
						alt="배경 이미지"
						width={100}
						height={38}
						className="tb:right-[157px] pc:right-[155px] absolute right-15 bottom-[6.5px]"
					/>

					{/* 프로필 사진 수정 버튼 */}
					<div className="bg-root absolute top-12.5 flex h-16 w-16 items-center justify-center rounded-4xl">
						<Image
							src={user?.image || EDIT_ICON_SRC}
							alt="프로필 사진 이미지"
							width={56}
							height={56}
							className="h-14 w-14 rounded-full object-cover"
							unoptimized
						/>
					</div>

					<p className="text-pc z-base font-semibold text-gray-900">내 프로필</p>

					{/* 회사명 수정 버튼 */}
					<button
						type="button"
						onClick={() =>
							openModal(
								<ProfileEditModal
									currentCompanyName={user?.companyName}
									currentImage={user?.image}
									onSubmit={handleUpdateUserInfo}
								/>
							)
						}
						className="z-base cursor-pointer">
						<Image src={EDIT_ICON_SRC} alt="회사명 수정 이미지" width={32} height={32} />
					</button>
				</div>

				{/* 프로필 정보 */}
				<div>
					<div className="tb:pt-3 tb:pb-4 pt-3.5 pb-4.5 pl-23">
						<div className="mb-2.5 text-gray-800">
							<p className="text-base font-semibold">{user?.name}</p>
						</div>

						<div className="flex gap-1.5 text-sm">
							<p className="font-medium">company.</p>
							<p className="font-normal text-gray-700">{user?.companyName}</p>
						</div>

						<div className="flex gap-1.5 text-sm">
							<p className="font-medium">E-mail.</p>
							<p className="font-normal text-gray-700">{user?.email}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
