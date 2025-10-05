import { getRequest, putRequest } from '@/apis';
import { UserInfo } from '@/types/user';

interface UpdateUserInfoProps {
	/** 수정할 회사명 */
	companyName?: string;
	/** 수정할 프로필 이미지 파일 */
	image?: File;
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
 * 회사명과 프로필 이미지를 선택적으로 수정할 수 있으며,
 * 서버는 multipart/form-data 형식으로 처리합니다.
 *
 * @param {UpdateUserInfoProps} updatedData - 수정할 사용자 정보
 * @param {string} [updatedData.companyName] - 변경할 회사명
 * @param {File} [updatedData.image] - 변경할 프로필 이미지
 *
 * @returns {Promise<UserInfo>} 수정 후 반환된 사용자 정보
 *
 * @example
 * // 회사명만 변경
 * updateUserInfo({ companyName: 'New Company' }).then(user => console.log(user.companyName));
 *
 * // 프로필 이미지만 변경
 * updateUserInfo({ image: file }).then(user => console.log(user.image));
 *
 * // 회사명과 이미지 동시에 변경
 * updateUserInfo({ companyName: 'New Company', image: file }).then(user => console.log(user));
 */
export const updateUserInfo = (updatedData: UpdateUserInfoProps) => {
	const formData = new FormData();

	if (updatedData.companyName) formData.append('companyName', updatedData.companyName);
	if (updatedData.image) formData.append('image', updatedData.image);

	return putRequest<UserInfo, FormData>({
		path: `/auths/user`,
		data: formData,
		options: { withAuth: true }
	});
};
