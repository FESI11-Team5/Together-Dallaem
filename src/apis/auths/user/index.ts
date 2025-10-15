import { getRequest, putRequest } from '@/apis';
import { UserInfo } from '@/types/user';

interface UpdateUserInfoProps {
	/** 수정할 회사명 */
	companyName?: string;
	/** 수정할 프로필 이미지 파일 */
	image?: File | null;
}

/**
 * 로그인된 사용자의 회원 정보를 조회합니다.
 *
 * @returns {Promise<UserInfo>} 조회된 사용자 정보
 *
 * @example
 * getUserInfo().then(user => console.log(user.name));
 */
export const getUserInfo = () => {
	return getRequest<UserInfo>({
		path: `/auths/user`,
		options: { withAuth: true }
	});
};

/**
 * 로그인된 사용자의 회원 정보를 수정합니다.
 *
 * 회사명과 프로필 이미지를 함께 업데이트할 수 있습니다.
 * 요청 시 FormData로 변환하여 전송하므로 이미지 파일 전송도 가능합니다.
 *
 * @async
 * @function
 * @param {UpdateUserInfoProps} updatedData - 수정할 사용자 정보
 * @param {string} [updatedData.companyName] - 수정할 회사명
 * @param {File|null} [updatedData.image] - 수정할 프로필 이미지 파일
 * @returns {Promise<UserInfo>} 업데이트된 사용자 정보
 *
 * @example
 * ```ts
 * updateUserInfo({ companyName: 'OpenAI', image: fileInput.files[0] })
 *   .then(updatedUser => console.log(updatedUser.companyName));
 * ```
 */
export const updateUserInfo = async (updatedData: UpdateUserInfoProps) => {
	const formData = new FormData();

	if (updatedData.companyName) formData.append('companyName', updatedData.companyName);
	if (updatedData.image) formData.append('image', updatedData.image);

	return await putRequest<UserInfo, FormData>({
		path: `/auths/user`,
		data: formData,
		options: { withAuth: true }
	});
};
