import { useWishlistStore } from '@/stores/wishList';
import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { create } from 'zustand';
import HeartButton from '.';

jest.mock('@/stores/wishlist', () => {
	const useMockWishlistStore = create(() => ({
		wishlist: new Set([0, 1]),
		addWish: jest.fn(),
		removeWish: jest.fn(),
		clearWishlist: jest.fn(),
		toggleWish: jest.fn((id: number) => {
			const state = useMockWishlistStore.getState();
			const newSet = new Set(state.wishlist);
			if (newSet.has(id)) newSet.delete(id);
			else newSet.add(id);
			useMockWishlistStore.setState({ wishlist: newSet });
		})
	}));

	return {
		useWishlistStore: useMockWishlistStore
	};
});

describe('HeartButton 유닛 테스트', () => {
	let user: UserEvent;

	beforeEach(() => {
		user = userEvent.setup();
		useWishlistStore.setState({ wishlist: new Set([0, 1]) });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('로컬 스토리지 상태에 따라 버튼이 다르게 보인다', () => {
		test('찜해놓은 글의 하트가 active 되어있다', () => {
			render(<HeartButton id={1} />);

			const activeHeart = screen.getByRole('img', { name: '꽉찬 하트 아이콘' });
			expect(activeHeart).toBeInTheDocument();
		});
		test('찜하지 않은 글의 하트가 inactive 되어있다', () => {
			render(<HeartButton id={2} />);

			const inactiveHeart = screen.getByRole('img', { name: '빈 하트 아이콘' });
			expect(inactiveHeart).toBeInTheDocument();
		});
	});

	describe('버튼을 누르면 active 상태가 변한다', () => {
		test('active 하트를 누르면 inactive 된다', async () => {
			render(<HeartButton id={1} />);

			const activeHeart = screen.getByRole('img', { name: '꽉찬 하트 아이콘' });
			expect(activeHeart).toBeInTheDocument();

			const heartButton = screen.getByRole('button', { name: '찜한 상태' });
			await user.click(heartButton);

			const inactiveHeart = screen.getByRole('img', { name: '빈 하트 아이콘' });
			expect(inactiveHeart).toBeInTheDocument();
		});
		test('inactive 하트를 누르면 active 된다', async () => {
			render(<HeartButton id={2} />);

			const inactiveHeart = screen.getByRole('img', { name: '빈 하트 아이콘' });
			expect(inactiveHeart).toBeInTheDocument();

			const heartButton = screen.getByRole('button', { name: '찜하지 않은 상태' });
			await user.click(heartButton);

			const activeHeart = screen.getByRole('img', { name: '꽉찬 하트 아이콘' });
			expect(activeHeart).toBeInTheDocument();
		});
	});
});
