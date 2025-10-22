import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import JoinedGatherings from '..';

/**
 * @fileoverview
 * JoinedGatherings 컴포넌트 유닛 테스트
 *
 * 설명:
 * - 이 테스트 파일은 `JoinedGatherings` 컴포넌트가 API 호출 후 모임 카드를 올바르게 렌더링하는지,
 *   리뷰 추가 버튼 클릭 시 상태가 업데이트되는지, 모임 취소 시 카드가 제거되는지를 확인합니다.
 * - 내부적으로 `getJoinedGathering` API를 모킹하고, 실제 `GatheringCard`는 간단한 더미 컴포넌트로 교체하여
 *   상호작용(리뷰 추가/취소)만 집중 테스트합니다.
 *
 * 테스트 시나리오 요약:
 * 1. API가 반환한 데이터 기반으로 카드가 렌더링 되는지 확인
 * 2. '리뷰 추가하기' 버튼 클릭 시 해당 카드의 isReviewed 상태가 true로 변경되어 버튼이 사라지는지 확인
 * 3. '모임 취소하기' 클릭 시 해당 카드가 리스트에서 제거되는지 확인
 */
jest.mock('@/apis/gatherings/joined', () => ({
	getJoinedGathering: jest.fn()
}));

jest.mock('../GatheringCard', () => ({
	__esModule: true,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: ({ gathering, onReviewSuccess, onCancelSuccess }: any) => (
		<div data-testid={`card-${gathering.id}`}>
			<span>{gathering.name}</span>
			{!gathering.isReviewed && <button onClick={() => onReviewSuccess?.(gathering.id)}>리뷰 추가하기</button>}
			<button onClick={onCancelSuccess}>모임 취소하기</button>
		</div>
	)
}));

describe('JoinedGatherings 컴포넌트', () => {
	const mockData = [
		{
			teamId: 1,
			id: 1,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2026-10-02T12:30:00',
			registrationEnd: '2026-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 20,
			capacity: 20,
			image: '/images/example1.jpg',
			createdBy: 5,
			canceledAt: null,
			joinedAt: '2025-09-28T09:00:00',
			isCompleted: false,
			isReviewed: false
		},
		{
			teamId: 1,
			id: 2,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2026-10-01T12:30:00',
			registrationEnd: '2026-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 19,
			capacity: 20,
			image: '/images/example1.jpg',
			createdBy: 5,
			canceledAt: null,
			joinedAt: '2025-09-28T09:00:00',
			isCompleted: false,
			isReviewed: false
		}
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('API 호출 후 모임 카드가 랜더링 되는지 확인', async () => {
		(getJoinedGathering as jest.Mock).mockResolvedValue(mockData);
		render(<JoinedGatherings />);

		await waitFor(() => {
			expect(getJoinedGathering).toHaveBeenCalledTimes(1);
		});

		// findAllByText → 배열 반환
		const cards = await screen.findAllByText('달램핏 오피스 스트레칭');
		expect(cards).toHaveLength(mockData.length); // 카드 개수 체크
		cards.forEach(card => {
			expect(card).toBeInTheDocument(); // 각 카드 DOM 존재 확인
		});
	});

	test('리뷰 추가하기 버튼 클릭 시 해당 모임의 isReviewed가 true로 변경되는지 확인', async () => {
		(getJoinedGathering as jest.Mock).mockResolvedValue(mockData);
		render(<JoinedGatherings />);

		expect(await screen.findByTestId('card-1')).toBeInTheDocument();
		expect(await screen.findByTestId('card-2')).toBeInTheDocument();

		const reviewButtons = await screen.findAllByText('리뷰 추가하기');
		await userEvent.click(reviewButtons[0]);

		await waitFor(() => {
			expect(screen.getByTestId('card-1')).not.toHaveTextContent('리뷰 추가하기');
			expect(screen.getByTestId('card-2')).toHaveTextContent('리뷰 추가하기');
		});
	});

	test('모임 취소하기 버튼 클릭 시 모임 카드가 사라지는지 확인', async () => {
		(getJoinedGathering as jest.Mock).mockResolvedValue(mockData);
		render(<JoinedGatherings />);

		expect(await screen.findByTestId('card-1')).toBeInTheDocument();
		expect(await screen.findByTestId('card-2')).toBeInTheDocument();

		const cancelButtons = await screen.findAllByText('모임 취소하기');
		await userEvent.click(cancelButtons[0]);

		await waitFor(() => {
			expect(screen.queryByTestId('card-1')).toBeNull();
			expect(screen.queryByTestId('card-2')).toBeInTheDocument();
		});
	});
});
