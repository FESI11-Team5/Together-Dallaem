'use client';

import { useState, useEffect } from 'react';
import { JoinedGathering } from '@/types/response/gatherings';
import { ReviewResponse } from '@/types/response/reviews';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { getReviews } from '@/apis/reviews/reviews';
import { useUserStore } from '@/stores/user';
import WritableReviewCard from './WritableReviewCard';
import WrittenReviewCard from './WrittenReviewCard';
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

	/** 현재 활성화된 탭: 'writable' | 'written' */
	const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');

	/**
	 * 참여한 모임 리스트
	 */
	const [gatherings, setGatherings] = useState<JoinedGathering[]>([]);

	/** 작성한 리뷰 리스트 */
	const [reviews, setReviews] = useState<ReviewResponse[]>([]);

	useEffect(() => {
		if (!user) return;

		/**
		 * 완료된 참여 모임 중 리뷰가 작성되지 않은 모임을 가져옵니다.
		 * 호출 후 로컬 상태 `gatherings`를 업데이트합니다.
		 *
		 * @returns {Promise<void>}
		 */
		const fetchJoinedGatherings = async (): Promise<void> => {
			try {
				const data = await getJoinedGathering({ completed: true, reviewed: false });
				const filteredData = data.filter(gatherings => gatherings.canceledAt === null);
				setGatherings(filteredData);
			} catch (err) {
				console.error(err);
			}
		};
		fetchJoinedGatherings();
	}, [user]);

	useEffect(() => {
		if (!user) return;

		/**
		 * 현재 사용자가 작성한 리뷰 목록을 API에서 조회하고 로컬 상태에 저장합니다.
		 *
		 * @returns {Promise<void>}
		 */
		const fetchMyReviews = async (): Promise<void> => {
			try {
				const data = await getReviews({ userId: user.userId });
				setReviews(data.data);
			} catch (err) {
				console.error('리뷰 조회 실패:', err);
			}
		};

		fetchMyReviews();
	}, [user]);

	/**
	 * 리뷰 작성 성공 시 해당 모임의 isReviewed를 true로 업데이트
	 * @param gatheringId 리뷰 작성 완료한 모임 ID
	 */
	const handleReviewSuccess = (gatheringId: number) => {
		setGatherings(prev => prev.map(r => (r.id === gatheringId ? { ...r, isReviewed: true } : r)));
	};

	/** 현재 탭에 따라 렌더링할 리뷰 리스트 */
	const writableReviews = gatherings.filter(r => !r.isReviewed);
	const writtenReviews = reviews;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex gap-2">
				<Chip text="작성 가능한 리뷰" isActive={activeTab === 'writable'} onClick={() => setActiveTab('writable')} />
				<Chip text="작성한 리뷰" isActive={activeTab === 'written'} onClick={() => setActiveTab('written')} />
			</div>
			{activeTab === 'writable'
				? writableReviews.map(gathering => (
						<WritableReviewCard
							key={gathering.id}
							gathering={gathering}
							onSuccess={() => handleReviewSuccess(gathering.id)}
						/>
					))
				: writtenReviews.map(review => <WrittenReviewCard key={review.id} review={review} />)}
		</div>
	);
}
