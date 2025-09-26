import { postRequest } from '@/apis';
import { signinRequest, signinResponse } from '@/types/response/auths';

export const postSignin = (data: signinRequest) =>
	postRequest<signinResponse, signinRequest>({
		path: '/auths/signin',
		data
	});
