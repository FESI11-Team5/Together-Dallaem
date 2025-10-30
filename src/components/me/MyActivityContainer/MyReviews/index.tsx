'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { getReviews } from '@/apis/reviews/reviews';
import { useUserStore } from '@/stores/user';
import type { JoinedGathering } from '@/types/response/gatherings';
import type { ReviewResponse, GetReviewsResponse } from '@/types/response/reviews';
import WritableReviewCard from './WritableReviewCard';
import WrittenReviewCard from './WrittenReviewCard';
import NoDataMessage from '../common/NoDataMessage';
import Chip from '@/components/commons/Chip';

/**
 * MyReviews 컴포넌트
 *
 * 사용자가 작성할 수 있는 리뷰 목록과 이미 작성한 리뷰 목록을 탭으로 전환해 보여줍니다.
 * - 로그인된 사용자의 참여 모임(완료된 모임 중 리뷰 미작성)을 API로 불러와 '작성 가능한 리뷰' 탭에 렌더링합니다.
 * - 사용자가 직접 작성한 리뷰를 불러와 '작성한 리뷰' 탭에 렌더링합니다.
 *
 * @returns {JSX.Element} 나의 리뷰 탭 UI
 *
 * TODO:
 * - 현재 내부 fetch 함수의 catch 블록에서 `console.error`로만 처리하고 있습니다.
 *   추후 `BasicPopup` 같은 UI로 에러를 알려줄 예정입니다.
 */
export default function MyReviews() {
	const { user } = useUserStore();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');

	const { data: writableReviewsData = [] } = useQuery<JoinedGathering[]>({
		queryKey: ['writableReviews', user?.userId],
		queryFn: () => getJoinedGathering({ completed: true, reviewed: false }),
		enabled: !!user,
		select: g => g.filter(gathering => gathering.canceledAt === null)
	});

	const { data: writtenReviewsData = [] } = useQuery<ReviewResponse[]>({
		queryKey: ['writtenReviews', user?.userId],
		queryFn: () => getReviews({ userId: user!.userId }).then((res: GetReviewsResponse) => res.data),
		enabled: !!user
	});
	/**
	 * 리뷰 작성 성공 시 해당 모임의 isReviewed를 true로 업데이트
	 * @param gatheringId 리뷰 작성 완료한 모임 ID
	 */
	const handleReviewSuccess = (gatheringId: number) => {
		if (!user) return;

		try {
			// Note: actual POST is performed by ReviewWriteModal.
			// Here we update the react-query cache so the UI reflects the new state
			// and trigger a refetch of the written reviews.
			queryClient.setQueryData<JoinedGathering[]>(
				['writableReviews', user.userId],
				old => old?.filter(g => g.id !== gatheringId) ?? []
			);

			queryClient.invalidateQueries({ queryKey: ['writtenReviews', user.userId] });

			setActiveTab('written');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-6">
			<div className="flex gap-2">
				<Chip text="작성 가능한 리뷰" isActive={activeTab === 'writable'} onClick={() => setActiveTab('writable')} />
				<Chip text="작성한 리뷰" isActive={activeTab === 'written'} onClick={() => setActiveTab('written')} />
			</div>
			{activeTab === 'writable' ? (
				writableReviewsData.length > 0 ? (
					writableReviewsData.map(gathering => (
						<WritableReviewCard
							key={gathering.id}
							gathering={gathering}
							onSuccess={() => handleReviewSuccess(gathering.id)}
						/>
					))
				) : (
					<NoDataMessage text="작성 가능한 리뷰가 아직 없어요" />
				)
			) : writtenReviewsData.length > 0 ? (
				writtenReviewsData.map(review => <WrittenReviewCard key={review.id} review={review} />)
			) : (
				<NoDataMessage text="작성한 리뷰가 아직 없어요" />
			)}
		</div>
	);
}
