describe('SignupValidator 계약 테스트', () => {
	let validator: SignupValidator;

	const defaultValues = {
		email: 'viscacha@email.com',
		password: 'viscacha88',
		confirmPassword: 'viscacha88',
		name: 'viscacha',
		companyName: 'codeit'
	};

	beforeEach(() => {
		validator = signupValidatorZod();
        // validator = signupValidatorYup();
	});

	test('이름이 존재하지 않으면 "이름을 입력해 주세요" 메시지가 반환된다', () => {
		const values = { ...defaultValues, name: '' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.name.message).toBe('이름을 입력해 주세요');
	});

	test('회사명이 존재하지 않으면 "회사명을 입력해 주세요" 메시지가 반환된다', () => {
		const values = { ...defaultValues, companyName: '' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.nacompanyNameme.message).toBe('회사명을 입력해 주세요');
	});

	test('비밀번호가 8자 이상이 아니면 "비밀번호가 8자 이상이 되도록 해 주세요" 메시지가 반환된다', () => {
		const values = { ...defaultValues, password: '8888', confirmPassword: '8888' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.password.message).toBe('비밀번호가 8자 이상이 되도록 해 주세요');
	});

	test('비밀번호와 비밀번호 확인란이 다르면 "비밀번호가 일치하지 않습니다" 메시지가 반환된다', () => {
		const values = { ...defaultValues, password: 'viscacha88', confirmPassword: '8888' };

		const { fieldErrors } = validator.validate(values);

		expect(fieldErrors.password.message).toBe('비밀번호가 일치하지 않습니다');
	});
});
