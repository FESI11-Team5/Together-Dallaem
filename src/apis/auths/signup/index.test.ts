import { postSignup } from '@/apis/auths/signup';
import { ApiError } from '@/utils/fetch';

describe('/auths/signup API 함수 테스트', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	describe('postSignup', () => {
		test('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				status: 201,
				ok: true,
				json: () =>
					Promise.resolve({
						message: '사용자 생성 성공'
					})
			});

			const data = {
				email: 'viscacha@email.com',
				password: 'viscacha88',
				name: 'viscacha',
				companyName: 'codeit'
			};

			const result = await postSignup(data);
			expect(result).toEqual({
				message: '사용자 생성 성공'
			});
		});

		test('유효한 이메일을 입력하지 않았을 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: 'Not Found',
				json: () =>
					Promise.resolve({
						code: 'VALIDATION_ERROR',
						parameter: 'email',
						message: '유효한 이메일 주소를 입력하세요'
					})
			});

			const data = {
				email: 'viscacha@com',
				password: '88888888',
				name: 'viscacha',
				companyName: 'codeit'
			};

			try {
				await postSignup(data);
				fail('postSignup이 정상적으로 실행되면 안됩니다.');
			} catch (err) {
				const e = err as ApiError;
				expect(e).toBeInstanceOf(ApiError);
				expect(e.status).toBe(400);
				expect(e.code).toBe('VALIDATION_ERROR');
				expect(e.parameter).toBe('email');
				expect(e.message).toBe('유효한 이메일 주소를 입력하세요');
			}
		});

		test('비밀번호를 8자리 미만으로 입력 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: 'Not Found',
				json: () =>
					Promise.resolve({
						code: 'VALIDATION_ERROR',
						parameter: 'password',
						message: '비밀번호는 최소 8자 이상이어야 합니다'
					})
			});

			const data = {
				email: 'viscacha@email.com',
				password: '8888',
				name: 'viscacha',
				companyName: 'codeit'
			};

			// await expect(postSignup(data)).rejects.toBeInstanceOf(ApiError);
			try {
				await postSignup(data);
				fail('postSignup이 정상적으로 실행되면 안됩니다.');
			} catch (err) {
				const e = err as ApiError;
				expect(e).toBeInstanceOf(ApiError);
				expect(e.status).toBe(400);
				expect(e.code).toBe('VALIDATION_ERROR');
				expect(e.parameter).toBe('password');
				expect(e.message).toBe('비밀번호는 최소 8자 이상이어야 합니다');
			}
		});

		test('이름을 입력하지 않을 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: 'Not Found',
				json: () =>
					Promise.resolve({
						code: 'VALIDATION_ERROR',
						parameter: 'name',
						message: '"name" is not allowed to be empty'
					})
			});

			const data = {
				email: 'viscacha@email.com',
				password: '88888888',
				name: '',
				companyName: 'codeit'
			};

			// await expect(postSignup(data)).rejects.toBeInstanceOf(ApiError);
			try {
				await postSignup(data);
				fail('postSignup이 정상적으로 실행되면 안됩니다.');
			} catch (err) {
				const e = err as ApiError;
				expect(e).toBeInstanceOf(ApiError);
				expect(e.status).toBe(400);
				expect(e.code).toBe('VALIDATION_ERROR');
				expect(e.parameter).toBe('name');
				expect(e.message).toBe('"name" is not allowed to be empty');
			}
		});

		test('존재하는 이메일을 입력 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: 'Not Found',
				json: () =>
					Promise.resolve({
						code: 'EMAIL_EXISTS',
						message: '이미 사용 중인 이메일입니다'
					})
			});

			const data = {
				email: 'viscacha@email.com',
				password: '88888888',
				name: 'viscacha',
				companyName: 'codeit'
			};

			// await expect(postSignup(data)).rejects.toBeInstanceOf(ApiError);
			try {
				await postSignup(data);
				fail('postSignup이 정상적으로 실행되면 안됩니다.');
			} catch (err) {
				const e = err as ApiError;
				expect(e).toBeInstanceOf(ApiError);
				expect(e.status).toBe(400);
				expect(e.code).toBe('EMAIL_EXISTS');
				expect(e.message).toBe('이미 사용 중인 이메일입니다');
			}
		});
	});
});
