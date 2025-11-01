import { DEFAULT_SIGNUP_FORM_VALUES as DEFAULT_VALUES } from '@/constants/test';
import { SignupValidator } from './signupValidator';
import { signupValidatorYup } from './signupValidator.yup';
import { signupValidatorZod } from './signupValidator.zod';

describe.each([
	['Zod', signupValidatorZod],
	['Yup', signupValidatorYup]
])('SignupValidator (%s) 계약 테스트', (_, validator: SignupValidator) => {
	test('이름이 존재하지 않으면 "이름을 입력해 주세요" 메시지가 반환된다', () => {
		const values = { ...DEFAULT_VALUES, name: '' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.name).toBe('이름을 입력해 주세요');
	});

	test('닉네임이 존재하지 않으면 "닉네임을 입력해 주세요" 메시지가 반환된다', () => {
		const values = { ...DEFAULT_VALUES, companyName: '' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.companyName).toBe('닉네임을 입력해 주세요');
	});

	test('비밀번호가 8자 이상이 아니면 "비밀번호가 8자 이상이 되도록 해 주세요" 메시지가 반환된다', () => {
		const values = { ...DEFAULT_VALUES, password: '8888', confirm: '8888' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.password).toBe('비밀번호가 8자 이상이 되도록 해 주세요');
	});

	test('비밀번호와 비밀번호 확인란이 다르면 "비밀번호가 일치하지 않습니다" 메시지가 반환된다', () => {
		const values = { ...DEFAULT_VALUES, password: 'viscacha88', confirm: '8888' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.confirm).toBe('비밀번호가 일치하지 않습니다');
	});
});
