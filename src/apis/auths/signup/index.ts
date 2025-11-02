import { postRequest } from '@/apis';
import { signupRequest, signupResponse } from '@/types/response/auths';

/**
 * 회원가입 API 요청을 수행합니다.
 *
 * 서버의 `/auths/signup` 엔드포인트에 `POST` 요청을 보내어
 * 새로운 사용자를 등록합니다.
 *
 * @param data - 회원가입 요청 데이터
 * @param data.email - 이메일
 * @param data.password - 비밀번호
 * @param data.name - 이름
 * @param data.companyName - 닉네임
 *
 * @returns 서버로부터 응답 메시지를 포함한 Promise
 */
export const postSignup = (data: signupRequest) =>
	postRequest<signupResponse, signupRequest>({
		path: '/auths/signup',
		data
	});
