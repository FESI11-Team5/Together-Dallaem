/**
 * 회원가입 폼에서 사용되는 입력 값 타입 정의
 */
export interface SignupFormValues {
	/** 사용자 이메일 주소 */
	email: string;
	/** 비밀번호 (8자 이상 권장) */
	password: string;
	/** 비밀번호 확인 (password와 동일해야 함) */
	confirm: string;
	/** 사용자 이름 */
	name: string;
	/** 회사명 */
	companyName: string;
}

/**
 * 유효성 검증 결과 타입
 * `fieldErrors`는 각 필드명(key)에 해당하는 에러 메시지를 포함합니다.
 * - 에러가 없으면 해당 key는 존재하지 않거나 undefined일 수 있습니다.
 */
export interface ValidationResult {
    fieldErrors: Partial<Record<keyof SignupFormValues, string>>;
}

/**
 * 회원가입 유효성 검증기 인터페이스
 *
 * 다양한 검증 방식(Yup, Zod 등)을 공통 형태로 추상화하기 위한 인터페이스입니다.
 */
export interface SignupValidator {
    validate(values: SignupFormValues): ValidationResult;
}
