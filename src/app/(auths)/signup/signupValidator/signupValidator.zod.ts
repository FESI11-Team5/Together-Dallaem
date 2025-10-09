import { signupErrors } from '@/constants/error';
import * as z from 'zod';
import { SignupValidator } from './signupValidator';

/**
 * 회원가입 폼의 Zod 기반 유효성 검증 스키마
 *
 * 각 필드의 유효성 조건:
 * - `name`: 필수 입력 (비어 있으면 에러)
 * - `email`: 유효한 이메일 형식이어야 함
 * - `companyName`: 필수 입력
 * - `password`: 최소 8자 이상
 * - `confirm`: 필수 입력, password와 일치해야 함
 */
export const zodSchema = z
	.object({
		name: z.string().min(1, { error: signupErrors.nameRequired }),
		email: z.email({ error: signupErrors.emailInvalid }),
		companyName: z.string().min(1, { error: signupErrors.companyRequired }),
		password: z.string().min(8, { error: signupErrors.passwordTooShort }),
		confirm: z.string().min(1, { error: signupErrors.confirmRequired })
	})
	.refine(data => data.password === data.confirm, {
		path: ['confirm'],
		message: signupErrors.passwordMismatch
	});

/**
 * Zod 기반 회원가입 폼 검증기
 *
 * @implements {SignupValidator}
 * @description
 * - Zod 스키마(`zodSchema`)를 이용해 입력값을 검증합니다.
 * - `safeParse()`를 사용하여 예외 없이 성공/실패 여부를 반환합니다.
 * - 검증 성공 시 `{ fieldErrors: {} }` 반환
 * - 검증 실패 시 `{ fieldErrors }` 객체에 필드별 에러 메시지를 담아 반환
 */
export const signupValidatorZod: SignupValidator = {
	validate(values) {
		const result = zodSchema.safeParse(values);
		if (result.success) return { fieldErrors: {} };
		const fieldErrors = Object.fromEntries(result.error.issues.map(i => [i.path[0], i.message]));
		return { fieldErrors };
	}
};
