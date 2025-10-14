import ModalContainer from '@/components/commons/ModalContainer';
import { SIGNIN_ERRORS } from '@/constants/error';
import { POPUP_MESSAGE } from '@/constants/messages';
import { DEFAULT_SIGNIN_FORM_VALUES as DEFAULT_VALUES } from '@/constants/test';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import SigninPage from './page';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
	useSearchParams: jest.fn()
}));

describe('SigninPage 통합 테스트', () => {
	let user: UserEvent;
	const mockPush = jest.fn();

	beforeAll(() => {
		if (!global.fetch) global.fetch = jest.fn();
	});

	beforeEach(() => {
		user = userEvent.setup();
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
	});

	afterEach(() => {
		jest.clearAllMocks();
		(global.fetch as jest.Mock).mockReset();
		mockPush.mockClear();
	});

	describe('모든 입력값이 유효하면 로그인 요청(200)이 성공하고 홈 페이지로 이동한다.', () => {
		test('마우스로 클릭하여 form을 제출한다', async () => {
			renderSigninPage();
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				status: 201,
				ok: true,
				json: () =>
					Promise.resolve({
						token: 'token'
					})
			});

			// 1. 입력 다 하고 확인 버튼 누르기
			await fillAndSubmitForm(user);

			// 2. 홈 페이지로 이동했는지 확인하기
			expect(mockPush).toHaveBeenCalledWith('/');
			expect(mockPush).toHaveBeenCalledTimes(1);
		});

		test('tab 키로 이동하여 form을 입력하고 제출한다', async () => {
			renderSigninPage();
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				status: 201,
				ok: true,
				json: () =>
					Promise.resolve({
						token: 'token'
					})
			});

			// 1. 입력하기
			const idInput = screen.getByLabelText('아이디');
			await user.type(idInput, DEFAULT_VALUES.id);
			await user.tab();

			const passwordInput = screen.getByLabelText('비밀번호');
			expect(passwordInput).toHaveFocus();
			await user.type(passwordInput, DEFAULT_VALUES.password);
			await user.tab();

			// 2. 확인 버튼 누르기
			const button = screen.getByRole('button', { name: '로그인 확인' });
			await waitFor(() => expect(button).toBeEnabled());
			await user.tab();
			// TODO: 갑자기 포커스 안잡히는 문제 해결
			expect(button).toHaveFocus();
			await user.keyboard('{Enter}');

			// 3. 홈 페이지로 이동했는지 확인하기
			expect(mockPush).toHaveBeenCalledWith('/');
			expect(mockPush).toHaveBeenCalledTimes(1);
		});
	});

	test('모든 입력값이 유효하면 로그인 요청(200)이 성공하고 이전 페이지로 이동한다.', async () => {
		renderSigninPage('/prev');
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			status: 201,
			ok: true,
			json: () =>
				Promise.resolve({
					token: 'token'
				})
		});

		// 1. 입력 다 하고 확인 버튼 누르기
		await fillAndSubmitForm(user);

		// 2. 이전 페이지로 이동했는지 확인하기
		expect(mockPush).toHaveBeenCalledWith('/prev');
		expect(mockPush).toHaveBeenCalledTimes(1);
	});

	test('잘못된 비밀번호일 경우(401), 비밀번호 불일치 경고 메시지를 표시한다.', async () => {
		renderSigninPage();
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 401,
			statusText: 'Not Found',
			json: () =>
				Promise.resolve({
					code: 'INVALID_CREDENTIALS',
					message: SIGNIN_ERRORS.INVALID_CREDENTIALS
				})
		});

		const initialUrl = window.location.href;

		// 1. 입력 다 하고 확인 버튼 누르기
		await fillAndSubmitForm(user);

		// 2. 에러 메시지 뜨는지 확인하기
		await waitFor(() => {
			expect(screen.getByText(SIGNIN_ERRORS.INVALID_CREDENTIALS)).toBeInTheDocument();
		});

		// 3. 로그인 요청 후 url이 바뀌지 않았는지 확인하기
		expect(window.location.href).toBe(initialUrl);
	});

	test('존재하지 않는 아이디일 경우(404), 존재하지 않는 아이디 경고 메시지를 표시한다.', async () => {
		renderSigninPage();
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
			statusText: 'Not Found',
			json: () =>
				Promise.resolve({
					code: 'USER_NOT_FOUND',
					message: SIGNIN_ERRORS.USER_NOT_FOUND
				})
		});
		const initialUrl = window.location.href;

		// 1. 입력 다 하고 확인 버튼 누르기
		await fillAndSubmitForm(user);

		// 2. 에러 메시지 뜨는지 확인하기
		await waitFor(() => {
			expect(screen.getByText(SIGNIN_ERRORS.USER_NOT_FOUND)).toBeInTheDocument();
		});

		// 3. 로그인 요청 후 url이 바뀌지 않았는지 확인하기
		expect(window.location.href).toBe(initialUrl);
	});

	test('서버 오류일 경우(500), 재로그인을 부탁하는 안내 메시지를 표시한다.', async () => {
		renderSigninPage();
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 500,
			json: () =>
				Promise.resolve({
					code: 'SERVER_ERROR',
					message: '서버 오류가 발생했습니다'
				})
		});

		// 1. 입력 다 하고 확인 버튼 누르기
		await fillAndSubmitForm(user);

		// 2. 재로그인 안내 팝업 뜨는지 확인하고 팝업 닫기
		const warningText = await screen.findByText(POPUP_MESSAGE.SERVER_ERROR.title);
		expect(warningText).toBeInTheDocument();

		const modalConfirm = screen.getByRole('button', { name: '팝업 확인' });
		await user.click(modalConfirm);

		// 3. 로그인 페이지로 돌아왔는지 확인하기
		const headings = await screen.findAllByRole('heading', { name: /로그인/i });
		expect(headings).toHaveLength(2);
		expect(mockPush).not.toHaveBeenCalled();
	});

	test('계정이 없는 경우, 회원가입 링크를 클릭하면 회원가입 페이지로 이동한다.', async () => {
		renderSigninPage();

		// 1. 회원가입 버튼 누르기
		const link = screen.getByRole('link', { name: '회원가입' });
		await user.click(link);

		// 2. 회원가입 페이지로 이동했는지 확인하기
		expect(link).toHaveAttribute('href', '/signup');
	});
});

/**
 * 폼 입력 후 제출하는 메서드
 * @param user
 * @param values
 */
async function fillAndSubmitForm(user: UserEvent, values = DEFAULT_VALUES) {
	await user.type(screen.getByLabelText('아이디'), values.id);
	await user.type(screen.getByLabelText('비밀번호'), values.password);

	const button = screen.getByRole('button', { name: '로그인 확인' });
	await waitFor(() => expect(button).toBeEnabled());

	await user.click(button);
}

/**
 * SigninPage 렌더
 * @param next 이전 페이지 path
 */
function renderSigninPage(next?: string) {
	(useSearchParams as jest.Mock).mockReturnValue({
		get: jest.fn().mockReturnValue(next ?? null)
	});

	render(
		<ModalStoreProvider>
			<SigninPage />
			<ModalContainer />
		</ModalStoreProvider>
	);
}
