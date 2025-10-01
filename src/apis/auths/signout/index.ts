import { postRequest } from '@/apis';
import { signoutResponse } from '@/types/response/auths';
import { removeToken } from '@/utils/token';

/**
 * 로그아웃 API 요청을 수행합니다.
 *
 * 서버의 `/auths/signout` 엔드포인트에 `POST` 요청을 보내어
 * 사용자의 인증 세션을 종료합니다.
 *
 * @returns 서버로부터 로그아웃 결과 메시지를 포함한 Promise
 */
export const postSignout = () =>
	postRequest<signoutResponse>({
		path: '/auths/signout'
	}).then(() => removeToken());
