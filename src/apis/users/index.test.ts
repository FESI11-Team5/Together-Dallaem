import { getUserInfo, updateUserInfo } from '.';
import { UserInfo } from '@/types/user';

global.fetch = jest.fn();

describe('사용자 API 테스트', () => {
	const mockTeamId = 'team5';

	const mockUser: UserInfo = {
		teamId: 1,
		id: 1,
		email: 'codeit@test.com',
		name: 'Test',
		companyName: 'Codeit',
		image: '/Codeit.png',
		createdAt: '2025-09-25T01:34:15.645Z',
		updatedAt: '2025-09-25T01:34:15.645Z'
	};

	beforeEach(() => {
		(fetch as jest.Mock).mockReset();
	});

	test('getUserInfo는 사용자 정보를 반환하는지 확인', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: async () => mockUser
		});

		const result = await getUserInfo(mockTeamId);
		expect(result).toEqual(mockUser);
		expect(fetch).toHaveBeenCalledWith(expect.stringContaining(mockTeamId), expect.any(Object));
	});

	test('getUserInfo는 401 에러 시 인증 필요 메시지가 나오는지 확인', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 401,
			json: async () => ({ code: 'UNAUTHORIZED', message: '인증이 필요합니다' })
		});

		await expect(getUserInfo(mockTeamId)).rejects.toThrow('인증이 필요합니다');

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining(mockTeamId), expect.any(Object));
	});

	test('getUSerInfo는 사용자가 없을시 시 404 에러가 나오는지 확인', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
			json: async () => ({ code: 'USER_NOT_FOUND', message: '사용자를 찾을 수 없습니다' })
		});

		await expect(getUserInfo(mockTeamId)).rejects.toThrow('사용자를 찾을 수 없습니다');

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining(mockTeamId), expect.any(Object));
	});

	test('updateUserInfo는 PUT 요청을 보내고 업데이트 된 데이터를 반환하는지 확인', async () => {
		const updatedData = { companyName: 'Codeit2', image: '/Codeit2.png' };
		const updatedUser = { ...mockUser, ...updatedData };

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: async () => updatedUser
		});

		const result = await updateUserInfo(mockTeamId, updatedData);

		expect(result).toEqual(updatedUser);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining(mockTeamId),
			expect.objectContaining({ method: 'PUT', body: JSON.stringify(updatedData) })
		);
	});

	test('updateUserInfo는 400 에러 시 유효성 검사가 나오는지 확인', async () => {
		const updatedData = { email: 'invalid-email' };

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 400,
			json: async () => ({
				code: 'VALIDATION_ERROR',
				parameter: 'email',
				message: '유효한 입력 값을 제공해야 합니다'
			})
		});

		await expect(updateUserInfo(mockTeamId, updatedData)).rejects.toThrow('유효한 입력 값을 제공해야 합니다');
	});

	test('updateUserInfo는 401 에러 시 인증 필요 메시지가 나오는지 확인', async () => {
		const updatedData = { companyName: 'Codeit2' };

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 401,
			json: async () => ({
				code: 'UNAUTHORIZED',
				message: '인증이 필요합니다'
			})
		});

		await expect(updateUserInfo(mockTeamId, updatedData)).rejects.toThrow('인증이 필요합니다');
	});

	test('updateUserInfo는 404 에러 시 사용자 없음 메시지가 나오는지 확인', async () => {
		const updatedData = { companyName: 'Codeit2' };

		(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
			json: async () => ({
				code: 'USER_NOT_FOUND',
				message: '사용자를 찾을 수 없습니다'
			})
		});

		await expect(updateUserInfo(mockTeamId, updatedData)).rejects.toThrow('사용자를 찾을 수 없습니다');
	});
});
