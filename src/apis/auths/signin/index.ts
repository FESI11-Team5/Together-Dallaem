import { postRequest } from '@/apis';
import { signinRequest, signinResponse } from '@/types/response/auths';
import { setToken } from '@/utils/token';

/**
 * 로그인 API 요청을 수행합니다.
 *
 * 서버의 `/auths/signin` 엔드포인트에 `POST` 요청을 보내어
 * 사용자를 인증하고 Access Token을 발급받습니다.
 *
 * @param data - 로그인 요청 데이터
 * @param data.email - 이메일
 * @param data.password - 비밀번호
 *
 * @returns 서버로부터 Access Token을 포함한 Promise
 */
export const postSignin = (data: signinRequest) =>
	postRequest<signinResponse, signinRequest>({
		path: '/auths/signin',
		data
	}).then(res => setToken(res.token));
