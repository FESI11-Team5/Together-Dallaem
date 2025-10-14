/**
 * 회원가입 폼에서 사용되는 에러 메시지 상수 모음
 *
 * @description
 * 각 필드 유효성 검증 시 표시되는 사용자 피드백 문구를 정의합니다.
 * Zod, Yup 등 검증 스키마나 API 에러 처리 시 공통적으로 사용됩니다.
 */
export const SIGNUP_ERRORS = {
	/** 이름이 비어 있을 때 표시되는 메시지 */
	REQUIRED_NAME: '이름을 입력해 주세요',
	/** 이메일 형식이 유효하지 않을 때 표시되는 메시지 */
	INVALID_EMAIL: '이메일 형식이 올바르지 않습니다',
	/** 이미 사용 중인 이메일일 때 표시되는 메시지 */
	DUPLICATED_EMAIL: '중복된 이메일입니다',
	/** 회사명이 비어 있을 때 표시되는 메시지 */
	REQUIRED_COMPANY_NAME: '회사명을 입력해 주세요',
	/** 비밀번호 길이가 8자 미만일 때 표시되는 메시지 */
	TOO_SHORT_PASSWORD: '비밀번호가 8자 이상이 되도록 해 주세요',
	/** 비밀번호와 비밀번호 확인이 일치하지 않을 때 표시되는 메시지 */
	MISMATCH_PASSWORD: '비밀번호가 일치하지 않습니다',
	/** 비밀번호 확인 입력란이 비어 있을 때 표시되는 메시지 */
	REQUIRED_CONFIRM: '비밀번호를 한 번 더 입력해 주세요'
};

export const SIGNIN_ERRORS = {
	/** 아이디(이메일) 형식이 유효하지 않을 때 표시되는 메시지 */
	INVALID_EMAIL: SIGNUP_ERRORS.INVALID_EMAIL,
	/** 비밀번호 길이가 8자 미만일 때 표시되는 메시지 */
	TOO_SHORT_PASSWORD: SIGNUP_ERRORS.TOO_SHORT_PASSWORD,
	/** 아이디가 존재하지 않을 때 표시되는 메시지 */
	USER_NOT_FOUND: '존재하지 않는 아이디입니다',
	/** 비밀번호가 아이디와 일치하지 않을 대 표시되는 메시지 */
	INVALID_CREDENTIALS: '비밀번호가 아이디와 일치하지 않습니다'
};
