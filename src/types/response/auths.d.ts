export interface signupRequest {
	/** 이메일 */
	email: string;
	/** 비밀번호 */
	password: string;
	/** 이름 */
	name: string;
	/** 회사명 */
	companyName: string;
}

export interface signupResponse {
	message: string;
}
