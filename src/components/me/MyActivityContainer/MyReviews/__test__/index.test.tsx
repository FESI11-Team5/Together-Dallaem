import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyReviews from '..';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { getReviews } from '@/apis/reviews';
import { useUserStore } from '@/stores/user';

jest.mock('@/apis/gatherings/joined', () => ({
	getJoinedGathering: jest.fn()
}));
jest.mock('@/apis/reviews', () => ({ getReviews: jest.fn() }));
jest.mock('@/stores/user', () => ({
	useUserStore: jest.fn()
}));

jest.mock('../WritableReviewCard', () => ({
	__esModule: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: ({ gathering, onSuccess }: any) => (
		<div data-testid={`writable-${gathering.id}`}>
			<span>{gathering.name}</span>
			<button onClick={onSuccess}>리뷰 작성하기</button>
		</div>
	)
}));

jest.mock('../WrittenReviewCard', () => ({
	__esModule: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: ({ review }: any) => (
		<div data-testid={`written-${review.id}`}>
			<span>{review.score}</span>
			<span>{review.comment}</span>
		</div>
	)
}));

describe('MyReviews 컴포넌트', () => {
	beforeEach(() => {
		(useUserStore as unknown as jest.Mock).mockReturnValue({ user: { userId: 1 } });
		jest.clearAllMocks();
	});

	const mockJoinedGatherings = [
		{ id: 1, name: '달램핏 오피스 스트레칭', isReviewed: false },
		{ id: 2, name: '달램핏 오피스 스트레칭', isReviewed: false },
		{ id: 3, name: '달램핏 오피스 스트레칭', isReviewed: true }
	];

	const mockReviews = [
		{ id: 101, comment: '리뷰 1', score: 5, gathering: { id: 1, name: '모임 1' } },
		{ id: 102, comment: '리뷰 2', score: 3, gathering: { id: 2, name: '모임 2' } }
	];

	test('초기 랜더링 시 작성 가능한 리뷰 탭 활성화 되는지 확인', async () => {
		(getJoinedGathering as jest.Mock).mockResolvedValue(mockJoinedGatherings);
		(getReviews as jest.Mock).mockResolvedValue({ data: mockReviews });

		render(<MyReviews />);

		await waitFor(() => {
			expect(getJoinedGathering).toHaveBeenCalled();
			expect(getReviews).toHaveBeenCalled();
		});

		expect(await screen.findByTestId('writable-1')).toBeInTheDocument();
		expect(await screen.findByTestId('writable-2')).toBeInTheDocument();

		expect(screen.queryByTestId('writable-3')).toBeNull();
	});

	test('작성한 리뷰 탭 클릭 시 WrittenReviewCard 렌더링', async () => {
		(getJoinedGathering as jest.Mock).mockResolvedValue(mockJoinedGatherings);
		(getReviews as jest.Mock).mockResolvedValue({ data: mockReviews });

		render(<MyReviews />);

		const writtenTab = screen.getByText('작성한 리뷰');
		await userEvent.click(writtenTab);

		expect(await screen.findByTestId('written-101')).toBeInTheDocument();
		expect(await screen.findByTestId('written-102')).toBeInTheDocument();
	});

	test('리뷰 작성 후 writable 목록에서 사라지는지 확인', async () => {
		(getJoinedGathering as jest.Mock).mockResolvedValue(mockJoinedGatherings);
		(getReviews as jest.Mock).mockResolvedValue({ data: mockReviews });

		render(<MyReviews />);

		const reviewButton = await screen.findAllByText('리뷰 작성하기');
		expect(reviewButton).toHaveLength(2);

		await userEvent.click(reviewButton[0]);

		await waitFor(() => {
			expect(screen.queryByTestId('writable-1')).toBeNull();
			expect(screen.getByTestId('writable-2')).toBeInTheDocument();
		});
	});
});
