export interface signupRequest {
	/** 이메일 */
	email: string;
	/** 비밀번호 */
	password: string;
	/** 이름 */
	name: string;
	/** 닉네임 */
	companyName: string;
}

export interface signupResponse {
	message: string;
}
export interface signinRequest {
	/** 이메일 */
	email: string;
	/** 비밀번호 */
	password: string;
}

export interface signinResponse {
	/** Access Token */
	token: string;
}

// TODO: 중복되는 리스폰스 정리하기
export interface signoutResponse {
	message: string;
}
