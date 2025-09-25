import { getRequest, putRequest } from '@/apis';
import { UserInfo } from '@/types/user';

interface UpdateUserInfoProps {
    companyName?: string;
	image?: string;
    email?: string;
}

// 사용자 정보 조회
export const getUserInfo = (teamId: string) => {
	return getRequest<UserInfo>({
		path: `/${teamId}/auths/user`
	});
};

// 사용자 정보 수정
export const updateUserInfo = (teamId: string, updatedData: UpdateUserInfoProps) => {
	return putRequest<UserInfo, UpdateUserInfoProps>({
		path: `/${teamId}/auths/user`,
		data: updatedData
	});
};
