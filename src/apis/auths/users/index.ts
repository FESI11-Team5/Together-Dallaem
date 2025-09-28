import { getRequest, putRequest } from '@/apis';
import { UserInfo } from '@/types/user';

interface UpdateUserInfoProps {
	companyName?: string;
	image?: string;
	email?: string;
}

/**
 * 팀의 사용자 정보를 조회합니다.
 *
 * @returns {Promise<UserInfo>} 조회된 사용자 정보
 *
 * @example
 * getUserInfo('1').then(user => console.log(user.name));
 */
export const getUserInfo = () => {
	return getRequest<UserInfo>({
		path: `/auths/user`
	});
};

/**
 * 팀의 사용자 정보를 수정합니다.
 *
 * @param {UpdateUserInfoProps} updatedData - 수정할 사용자 정보
 * @returns {Promise<UserInfo>} 수정 후 반환된 사용자 정보
 *
 * @example
 * updateUserInfo('123', { companyName: 'New Company' })
 *   .then(user => console.log(user.companyName));
 */
export const updateUserInfo = (updatedData: UpdateUserInfoProps) => {
	return putRequest<UserInfo, UpdateUserInfoProps>({
		path: `/auths/user`,
		data: updatedData
	});
};
