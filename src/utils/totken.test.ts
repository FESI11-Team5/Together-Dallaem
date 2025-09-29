import { decodeToken, isTokenExpried } from '@/utils/token';

describe('token 관련 유틸 테스트', () => {
	describe('decodeToken 테스트', () => {
		test('정상 토큰을 넣으면 json을 반환한다', () => {
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiIxMTA1IiwidXNlcklkIjoyMjM5LCJpYXQiOjE3NTkxMjkzOTgsImV4cCI6MTc1OTEzMjk5OH0.EFb73GtBliMSB8LrnvOeLub45fyg0tQ9Fssz_y2b5ko';

			const result = decodeToken(token);

			expect(result).toHaveProperty('teamId');
			expect(result).toHaveProperty('userId');
			expect(result).toHaveProperty('iat');
			expect(result).toHaveProperty('exp');
		});

		test('비정상 토큰을 넣으면 null을 반환한다', () => {
			const token = '비정상 토큰';

			const result = decodeToken(token);

			expect(result).toBeNull();
		});
	});

	describe('isTokenExpried 테스트', () => {
		const base64UrlEncode = (obj: Record<string, unknown>): string => {
			const json = JSON.stringify(obj);
			const base64 = btoa(json);
			return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		};

		const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
		const payload = base64UrlEncode({
			teamId: '1105',
			userId: 2239,
			iat: 1700000000,
			exp: 1700000000
		});
		const signature = base64UrlEncode({ sig: 'signature' });
		const token = `${header}.${payload}.${signature}`;

		test('만료되지 않은 토큰을 넣으면 "VALID"를 반환한다', () => {
			Date.now = jest.fn(() => 1700000000000);

			const result = isTokenExpried(token);

			expect(result).toEqual('VALID');
		});

		test('만료된 토큰을 넣으면 null을 반환한다', () => {
			Date.now = jest.fn(() => 1800000000000);

			const result = isTokenExpried(token);

			expect(result).toEqual('EXPIRED');
		});

		test('만료되지 않은 토큰이 thresholdSec(100s)만큼 남았다면 "IMMINENT"을 반환한다', () => {
			Date.now = jest.fn(() => 1699999910000);

			const result = isTokenExpried(token, 100);

			expect(result).toEqual('IMMINENT');
		});

		test('비정상 토큰을 넣으면 "EXPIRED"을 반환한다', () => {
			const token = '비정상 토큰';

			const result = isTokenExpried(token);

			expect(result).toEqual('EXPIRED');
		});
	});
});
