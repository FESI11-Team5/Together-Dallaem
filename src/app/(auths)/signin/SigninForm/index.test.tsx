import { signinErrors } from '@/constants/error';
import { defaultSigninFormValues as defaultValues } from '@/constants/test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SigninForm } from '.';

describe('SigninForm 통합 테스트', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		render(<SigninForm onSubmit={() => {}} />);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe('아이디 형식이 맞지 않으면 "이메일 형식이 올바르지 않습니다"라는 에러 메시지가 표시된다', () => {
		runValidationScenarios('아이디', signinErrors.idInvalid);
		runValidationScenarios('아이디', signinErrors.idInvalid, 'viscacha@');
	});

	describe('비밀번호가 8자 이상이 아니면 "비밀번호가 8자 이상이 되도록 해 주세요"라는 에러 메시지가 표시된다', () => {
		runValidationScenarios('비밀번호', signinErrors.passwordTooShort, '8888');
	});

	describe('정상적으로 입력하면 에러 메시지가 표시되지 않는다', () => {
		test('모든 필드가 유효하면 폼이 제출된다', async () => {
			const idInput = screen.getByLabelText('아이디');
			const passwordInput = screen.getByLabelText('비밀번호');
			const button = screen.getByRole('button', { name: '로그인' });

			fireEvent.change(idInput, { target: { value: defaultValues.id } });
			fireEvent.change(passwordInput, { target: { value: defaultValues.password } });
			fireEvent.blur(passwordInput);

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
	test('로그인 버튼 클릭 방지 (submit)', async () => {
		callBack?.();
		const input = screen.getByLabelText(label);
		const button = screen.getByRole('button', { name: '로그인' });

		fireEvent.change(input, { target: { value } });
		fireEvent.blur(input);

		await waitFor(() => {
			expect(button).toBeDisabled();
			expect(screen.getByText(message)).toBeInTheDocument();
		});
	});
}
