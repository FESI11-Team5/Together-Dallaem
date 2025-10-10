/**
 * 회원가입 폼에서 사용되는 에러 메시지 상수 모음
 *
 * @description
 * 각 필드 유효성 검증 시 표시되는 사용자 피드백 문구를 정의합니다.
 * Zod, Yup 등 검증 스키마나 API 에러 처리 시 공통적으로 사용됩니다.
 */
export const signupErrors = {
	/** 이름이 비어 있을 때 표시되는 메시지 */
	nameRequired: '이름을 입력해 주세요',
	/** 이메일 형식이 유효하지 않을 때 표시되는 메시지 */
	emailInvalid: '이메일 형식이 올바르지 않습니다',
	/** 이미 사용 중인 이메일일 때 표시되는 메시지 */
	emailDuplicated: '중복된 이메일입니다',
	/** 회사명이 비어 있을 때 표시되는 메시지 */
	companyRequired: '회사명을 입력해 주세요',
	/** 비밀번호 길이가 8자 미만일 때 표시되는 메시지 */
	passwordTooShort: '비밀번호가 8자 이상이 되도록 해 주세요',
	/** 비밀번호와 비밀번호 확인이 일치하지 않을 때 표시되는 메시지 */
	passwordMismatch: '비밀번호가 일치하지 않습니다',
	/** 비밀번호 확인 입력란이 비어 있을 때 표시되는 메시지 */
	confirmRequired: '비밀번호를 한 번 더 입력해 주세요'
};

export const loginErrors = {
	/** 이메일 형식이 유효하지 않을 때 표시되는 메시지 */
	emailInvalid: signupErrors.emailInvalid,
	/** 비밀번호 길이가 8자 미만일 때 표시되는 메시지 */
	passwordTooShort: signupErrors.passwordTooShort
};
