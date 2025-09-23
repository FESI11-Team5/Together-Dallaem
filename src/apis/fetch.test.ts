import { deleteRequest, getRequest, postRequest, putRequest } from '@/apis';
import { ApiError } from '@/utils/fetch';

describe('API 요청 함수 테스트', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	describe('getRequest', () => {
		it('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ data: 'ok' })
			});

			const result = await getRequest({ path: '/test' });
			expect(result).toEqual({ data: 'ok' });
		});

		it('실패 시 ApiError를 던진다', async () => {
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
		it('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ created: true })
			});

			const result = await postRequest({ path: '/test', data: { name: 'abc' } });
			expect(result).toEqual({ created: true });
		});

		it('실패 시 ApiError를 던진다', async () => {
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
		it('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ updated: true })
			});

			const result = await putRequest({ path: '/test/1', data: { name: 'new' } });
			expect(result).toEqual({ updated: true });
		});

		it('실패 시 ApiError를 던진다', async () => {
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
		it('성공 시 데이터를 반환한다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve({ deleted: true })
			});

			const result = await deleteRequest({ path: '/test/1' });
			expect(result).toEqual({ deleted: true });
		});

		it('실패 시 ApiError를 던진다', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
				statusText: 'Unauthorized',
				json: () => Promise.resolve({ code: 'UNAUTHORIZED', message: '인증이 필요합니다' })
			});

			await expect(deleteRequest({ path: '/test/1' })).rejects.toBeInstanceOf(ApiError);
		});
	});
});
