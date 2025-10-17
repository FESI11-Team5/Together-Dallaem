import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import GNB from '.';

describe('GNB 테스트', () => {
	let user: UserEvent;

	beforeEach(() => {
		user = userEvent.setup();
		render(<GNB />);
	});

	describe('메뉴 클릭', () => {
		test('"모임 찾기" 메뉴를 클릭하면 "/"으로 이동한다', async () => {
			// 1. 모임 찾기 메뉴 누르기
			const link = screen.getByRole('link', { name: '모임 찾기' });
			await user.click(link);

			// 2. 홈 페이지로 이동했는지 확인하기
			expect(link).toHaveAttribute('href', '/');
		});

		test('"찜한 모임" 메뉴를 클릭하면 "/favorites"으로 이동한다', async () => {
			// 1. 찜한 모임 메뉴 누르기
			const link = screen.getByRole('link', { name: '찜한 모임' });
			await user.click(link);

			// 2. 홈 페이지로 이동했는지 확인하기
			expect(link).toHaveAttribute('href', '/favorites');
		});

		test('"모든 리뷰" 메뉴를 클릭하면 "/reviews"으로 이동한다', async () => {
			// 1. 모든 리뷰 메뉴 누르기
			const link = screen.getByRole('link', { name: '모든 리뷰' });
			await user.click(link);

			// 2. 리뷰 페이지로 이동했는지 확인하기
			expect(link).toHaveAttribute('href', '/reviews');
		});
	});

	describe('GNB 버튼 동작', () => {
		describe('미로그인 상태', () => {
			test('비로그인 사용자가 로그인 버튼 클릭 시 "/signin"으로 이동한다', async () => {
				localStorage.getItem = jest.fn().mockReturnValue('');

				// 1. 모임 찾기 메뉴 누르기
				const link = screen.getByRole('link', { name: '로그인' });
				await user.click(link);

				// 2. 홈 페이지로 이동했는지 확인하기
				expect(link).toHaveAttribute('href', '/signin');
			});

			test('로그인 사용자가 드롭다운(프로필 사진)의 마이페이지 버튼 클릭 시 "/me"로 이동한다', () => {
				localStorage.getItem = jest.fn().mockReturnValue('token');
			});

			test('로그인 사용자가 드롭다운(프로필 사진)의 로그아웃 버튼 클릭 시 로그아웃한다', () => {
				localStorage.getItem = jest.fn().mockReturnValue('token');
			});
		});
	});
});
