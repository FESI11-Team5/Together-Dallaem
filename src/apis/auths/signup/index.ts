import { postRequest } from '@/apis';
import { signupRequest, signupResponse } from '@/types/response/auths';

export const postSignup = (data: signupRequest) =>
	postRequest<signupResponse, signupRequest>({
		path: '/auths/signup',
		data
	});