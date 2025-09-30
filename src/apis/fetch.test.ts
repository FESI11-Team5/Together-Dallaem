import { _fetch, deleteRequest, getRequest, postRequest, putRequest } from '@/apis';
import { FetchProps } from '@/types/fetch';
import { ApiError } from '@/utils/fetch';

describe('API 요청 함수 테스트', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	describe('getRequest', () => {
		test('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ data: 'ok' })
			});

			const result = await getRequest({ path: '/test' });
			expect(result).toEqual({ data: 'ok' });
		});

		test('실패 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: 'Not Found',
				json: () => Promise.resolve({ code: 'NOT_FOUND', message: '존재하지 않음' })
			});

			await expect(getRequest({ path: '/test' })).rejects.toBeInstanceOf(ApiError);
		});
	});

	describe('postRequest', () => {
		test('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ created: true })
			});

			const result = await postRequest({ path: '/test', data: { name: 'abc' } });
			expect(result).toEqual({ created: true });
		});

		test('실패 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 400,
				statusText: 'Bad Request',
				json: () => Promise.resolve({ code: 'VALIDATION_ERROR', message: '유효하지 않음' })
			});

			await expect(postRequest({ path: '/test', data: { name: 'abc' } })).rejects.toBeInstanceOf(ApiError);
		});
	});

	describe('putRequest', () => {
		test('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ updated: true })
			});

			const result = await putRequest({ path: '/test/1', data: { name: 'new' } });
			expect(result).toEqual({ updated: true });
		});

		test('실패 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 500,
				statusText: 'Internal Server Error',
				json: () => Promise.resolve({ code: 'SERVER_ERROR', message: '서버 에러' })
			});

			await expect(putRequest({ path: '/test/1', data: { name: 'new' } })).rejects.toBeInstanceOf(ApiError);
		});
	});

	describe('deleteRequest', () => {
		test('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ deleted: true })
			});

			const result = await deleteRequest({ path: '/test/1' });
			expect(result).toEqual({ deleted: true });
		});

		test('실패 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
				statusText: 'Unauthorized',
				json: () => Promise.resolve({ code: 'UNAUTHORIZED', message: '인증이 필요합니다' })
			});

			await expect(deleteRequest({ path: '/test/1' })).rejects.toBeInstanceOf(ApiError);
		});
	});

	describe('_fetch 테스트', () => {
		const props: FetchProps = {
			path: '/',
			method: 'GET',
			options: {
				withAuth: true
			}
		};

		test('withAuth가 true일 때 토큰이 유효하면 헤더에 포함되어 있다', async () => {
			const token = 'fake-jwt';
			Storage.prototype.getItem = jest.fn(() => token);

			const mockFetch = jest.fn().mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({ withAuth: true })
			});

			global.fetch = mockFetch;

			await _fetch(props);

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					headers: expect.objectContaining({ Authorization: `Bearer ${token}` })
				})
			);
		});

		test('withAuth가 true일 때 토큰이 없으면 ApiError를 던전다', async () => {
			Storage.prototype.getItem = jest.fn(() => null);

			try {
				await _fetch(props);
				fail('_fetch가 정상적으로 실행되면 안됩니다.');
			} catch (err) {
				const e = err as ApiError;
				expect(e).toBeInstanceOf(ApiError);
				expect(e.status).toBe(401);
				expect(e.code).toBe('UNAUTHORIZED');
				expect(e.message).toBe('Authorization 헤더가 필요합니다');
			}
		});
	});
});
