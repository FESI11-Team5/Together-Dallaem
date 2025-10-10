import { signupErrors } from '@/constants/error';
import * as yup from 'yup';
import type { SignupValidator } from './signupValidator';

/**
 * 회원가입 폼의 유효성 검증을 위한 Yup 스키마
 *
 * 각 필드는 다음과 같은 조건을 가집니다:
 * - `name`: 필수 입력
 * - `email`: 필수 입력 + 이메일 형식 검증
 * - `companyName`: 필수 입력
 * - `password`: 필수 입력 + 최소 8자 이상
 * - `confirm`: 필수 입력 + password와 동일해야 함
 */
export const yupSchema = yup.object({
	name: yup.string().required(signupErrors.nameRequired),
	email: yup.string().required().email(signupErrors.emailInvalid),
	companyName: yup.string().required(signupErrors.companyRequired),
	password: yup.string().required().min(8, signupErrors.passwordTooShort),
	confirm: yup
		.string()
		.required(signupErrors.confirmRequired)
		.oneOf([yup.ref('password')], signupErrors.passwordMismatch)
});

/**
 * Yup 기반 회원가입 폼 검증기
 *
 * @implements {SignupValidator}
 * @description
 * - Yup 스키마를 이용하여 입력값을 검증합니다.
 * - `abortEarly: false` 옵션으로 모든 필드 에러를 한 번에 수집합니다.
 * - 유효성 에러가 발생하면 `{ fieldErrors }` 객체를 반환합니다.
 * - 정상일 경우 `{ fieldErrors: {} }`를 반환합니다.
 */
export const signupValidatorYup: SignupValidator = {
	validate(values) {
		try {
			yupSchema.validateSync(values, { abortEarly: false });
			return { fieldErrors: {} };
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const fieldErrors = Object.fromEntries(err.inner.map(e => [e.path, e.message]));
				return { fieldErrors };
			}
			throw err;
		}
	}
};
