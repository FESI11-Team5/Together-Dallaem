import { SIGNUP_ERRORS } from '@/constants/error';
import { DEFAULT_SIGNUP_FORM_VALUES as DEFAULT_VALUES } from '@/constants/test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignupForm } from '.';

// TODO: fiberEvent를 userEvent로 리팩터링
describe('SignupForm 통합 테스트', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		render(<SignupForm onSubmit={() => {}} />);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe('이름을 입력하지 않으면 "이름을 입력해 주세요"라는 에러 메시지가 표시된다', () => {
		runValidationScenarios('이름', SIGNUP_ERRORS.REQUIRED_NAME);
	});

	describe('이메일 형식이 맞지 않으면 "이메일 형식이 올바르지 않습니다"라는 에러 메시지가 표시된다', () => {
		runValidationScenarios('이메일', SIGNUP_ERRORS.INVALID_EMAIL);
		runValidationScenarios('이메일', SIGNUP_ERRORS.INVALID_EMAIL, 'viscacha@');
	});

	describe('회사명을 입력하지 않으면 "회사명을 입력해 주세요"라는 에러 메시지가 표시된다', () => {
		runValidationScenarios('회사명', SIGNUP_ERRORS.REQUIRED_COMPANY_NAME);
	});

	describe('비밀번호가 8자 이상이 아니면 "비밀번호가 8자 이상이 되도록 해 주세요"라는 에러 메시지가 표시된다', () => {
		runValidationScenarios('비밀번호', SIGNUP_ERRORS.TOO_SHORT_PASSWORD, '8888');
	});

	describe('비밀번호와 비밀번호 확인란이 다르면 "비밀번호가 일치하지 않습니다"라는 에러 메시지가 표시된다', () => {
		const setupPassword = () => {
			const passwordInput = screen.getByLabelText('비밀번호');
			fireEvent.change(passwordInput, { target: { value: DEFAULT_VALUES.password } });
		};

		runValidationScenarios('비밀번호 확인', SIGNUP_ERRORS.MISMATCH_PASSWORD, '8888', setupPassword);
	});

	describe('정상적으로 입력하면 에러 메시지가 표시되지 않는다', () => {
		test('모든 필드가 유효하면 폼이 제출된다', async () => {
			const nameInput = screen.getByLabelText('이름');
			const emailInput = screen.getByLabelText('이메일');
			const companyInput = screen.getByLabelText('회사명');
			const passwordInput = screen.getByLabelText('비밀번호');
			const passwordConfirmInput = screen.getByLabelText('비밀번호 확인');
			const button = screen.getByRole('button', { name: '회원가입 확인' });

			fireEvent.change(nameInput, { target: { value: DEFAULT_VALUES.name } });
			fireEvent.change(emailInput, { target: { value: DEFAULT_VALUES.email } });
			fireEvent.change(companyInput, { target: { value: DEFAULT_VALUES.companyName } });
			fireEvent.change(passwordInput, { target: { value: DEFAULT_VALUES.password } });
			fireEvent.change(passwordConfirmInput, { target: { value: DEFAULT_VALUES.confirm } });
			fireEvent.blur(passwordConfirmInput);

			await waitFor(() => {
				expect(button).not.toBeDisabled();
				expect(screen.queryByText(/입력해 주세요|올바르지 않습니다|일치하지 않습니다/)).not.toBeInTheDocument();
			});
		});
	});
});

function runValidationScenarios(label: string, message: string, value = '', callBack?: () => void) {
	test('입력 후 포커스 이동 (blur)', async () => {
		callBack?.();
		const input = screen.getByLabelText(label);

		fireEvent.change(input, { target: { value } });
		fireEvent.blur(input);

		await waitFor(() => {
			expect(screen.getByText(message)).toBeInTheDocument();
		});
	});

	test('1초간 입력 없음 (debounce)', async () => {
		callBack?.();
		const input = screen.getByLabelText(label);

		fireEvent.change(input, { target: { value } });
		fireEvent.focus(input);

		jest.advanceTimersByTime(1000);

		await waitFor(() => {
			expect(screen.getByText(message)).toBeInTheDocument();
		});
	});

	// TODO: 기본값이 disabled이기 때문에 테스트가 의미없어진 것 같아서 수정 필요
	test('회원가입 버튼 클릭 방지 (submit)', async () => {
		callBack?.();
		const input = screen.getByLabelText(label);
		const button = screen.getByRole('button', { name: '회원가입 확인' });

		fireEvent.change(input, { target: { value } });
		fireEvent.blur(input);

		await waitFor(() => {
			expect(button).toBeDisabled();
			expect(screen.getByText(message)).toBeInTheDocument();
		});
	});
}
