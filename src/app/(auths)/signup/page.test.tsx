import ModalContainer from '@/components/commons/ModalContainer';
import { DEFAULT_SIGNUP_FORM_VALUES as DEFAULT_VALUES } from '@/constants/test';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import SignupPage from './page';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn()
}));

beforeAll(() => {
	global.fetch = jest.fn((url, options) => {
		if (url.includes('/signup') && options?.method === 'POST') {
			const body = JSON.parse(options.body);
			if (body.email === 'duplicate@email.com') {
				return Promise.resolve({
					ok: false,
					status: 400,
					json: async () => ({
						code: 'VALIDATION_ERROR',
						parameter: 'email',
						message: '유효한 이메일 주소를 입력하세요'
					})
				});
			}
			return Promise.resolve({
				ok: true,
				status: 201,
				json: async () => ({
					message: '사용자 생성 성공'
				})
			});
		}
		return Promise.reject('unknown endpoint');
	}) as jest.Mock;
});

describe('SignupPage 통합 테스트', () => {
	let user: UserEvent;
	const mockPush = jest.fn();

	beforeEach(() => {
		user = userEvent.setup();
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
		render(
			<ModalStoreProvider>
				<SignupPage />
				<ModalContainer />
			</ModalStoreProvider>
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('모든 입력값이 유효하면 회원가입 요청(201)이 성공하고 로그인 페이지로 이동한다.', () => {
		test('마우스로 클릭하여 form을 제출한다', async () => {
			// 1. 입력 다 하고 확인 버튼 누르기
			await fillAndSubmitForm(user);

			// 2. 팝업 뜨는지 확인하고 팝업 닫기
			const successText = await screen.findByText(/가입이 완료되었습니다!/i);
			expect(successText).toBeInTheDocument();

			const modalConfirm = screen.getByRole('button', { name: '팝업 확인' });
			await user.click(modalConfirm);

			// 3. 로그인 페이지로 이동했는지 확인하기
			expect(mockPush).toHaveBeenCalledWith('/login');
			expect(mockPush).toHaveBeenCalledTimes(1);
		});

		test('tab 키로 이동하여 form을 입력하고 제출한다', async () => {
			// 1. 입력 다 하기
			const nameInput = screen.getByLabelText('이름');
			await user.type(nameInput, DEFAULT_VALUES.name);
			await user.tab();

			const emailInput = screen.getByLabelText('이메일');
			expect(emailInput).toHaveFocus();
			await user.type(emailInput, DEFAULT_VALUES.email);
			await user.tab();

			const companyInput = screen.getByLabelText('회사명');
			expect(companyInput).toHaveFocus();
			await user.type(companyInput, DEFAULT_VALUES.companyName);
			await user.tab();

			const passwordInput = screen.getByLabelText('비밀번호');
			expect(passwordInput).toHaveFocus();
			await user.type(passwordInput, DEFAULT_VALUES.password);
			await user.tab();

			const passwordConfirmInput = screen.getByLabelText('비밀번호 확인');
			expect(passwordConfirmInput).toHaveFocus();
			await user.type(passwordConfirmInput, DEFAULT_VALUES.confirm);

			// 2. 확인 버튼 누르기
			const button = screen.getByRole('button', { name: '회원가입 확인' });
			await waitFor(() => expect(button).toBeEnabled());
			await user.tab();
			expect(button).toHaveFocus();
			await user.keyboard('{Enter}');

			// 3. 팝업 뜨는지 확인하고 팝업 닫기
			const successText = await screen.findByText(/가입이 완료되었습니다!/i);
			expect(successText).toBeInTheDocument();

			const modalConfirm = screen.getByRole('button', { name: '팝업 확인' });
			await user.click(modalConfirm);

			// 4. 로그인 페이지로 이동했는지 확인하기
			expect(mockPush).toHaveBeenCalledWith('/login');
			expect(mockPush).toHaveBeenCalledTimes(1);
		});
	});

	test('이미 등록된 이메일일 경우(400), 중복 이메일 경고 메시지를 표시한다.', async () => {
		// 1. 입력 다 하고 확인 버튼 누르기
		await fillAndSubmitForm(user, { ...DEFAULT_VALUES, email: 'duplicate@email.com' });

		// 2. 중복 이메일 에러 경고 팝업 뜨는지 확인하고 팝업 닫기
		const warningText = await screen.findByText(/중복된 이메일입니다/i);
		expect(warningText).toBeInTheDocument();

		const modalConfirm = screen.getByRole('button', { name: '팝업 확인' });
		await user.click(modalConfirm);

		// 3. 회원가입 페이지로 돌아왔는지 확인하기
		const headings = await screen.findAllByRole('heading', { name: /회원가입/i });
		expect(headings).toHaveLength(2);
		expect(mockPush).not.toHaveBeenCalled();
	});

	test('이미 계정이 있는 경우, 로그인 링크를 클릭하면 로그인 페이지로 이동한다.', async () => {
		// 1. 로그인 버튼 누르기
		const link = screen.getByRole('link', { name: '로그인' });
		await user.click(link);

		// 2. 로그인 페이지로 이동했는지 확인하기
		expect(link).toHaveAttribute('href', '/login');
	});
});

async function fillAndSubmitForm(user: UserEvent, values = DEFAULT_VALUES) {
	await user.type(screen.getByLabelText('이름'), values.name);
	await user.type(screen.getByLabelText('이메일'), values.email);
	await user.type(screen.getByLabelText('회사명'), values.companyName);
	await user.type(screen.getByLabelText('비밀번호'), values.password);
	await user.type(screen.getByLabelText('비밀번호 확인'), values.confirm);

	const button = screen.getByRole('button', { name: '회원가입 확인' });
	await waitFor(() => expect(button).toBeEnabled());

	await user.click(button);
}
