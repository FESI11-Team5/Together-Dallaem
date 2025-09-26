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
 * @param {string} teamId - 조회할 팀 ID
 * @returns {Promise<UserInfo>} 조회된 사용자 정보
 *
 * @example
 * getUserInfo('1').then(user => console.log(user.name));
 */
export const getUserInfo = (teamId: string) => {
	return getRequest<UserInfo>({
		path: `/${teamId}/auths/user`
	});
};

/**
 * 팀의 사용자 정보를 수정합니다.
 *
 * @param {string} teamId - 수정할 팀 ID
 * @param {UpdateUserInfoProps} updatedData - 수정할 사용자 정보
 * @returns {Promise<UserInfo>} 수정 후 반환된 사용자 정보
 *
 * @example
 * updateUserInfo('123', { companyName: 'New Company' })
 *   .then(user => console.log(user.companyName));
 */
export const updateUserInfo = (teamId: string, updatedData: UpdateUserInfoProps) => {
	return putRequest<UserInfo, UpdateUserInfoProps>({
		path: `/${teamId}/auths/user`,
		data: updatedData
	});
};
