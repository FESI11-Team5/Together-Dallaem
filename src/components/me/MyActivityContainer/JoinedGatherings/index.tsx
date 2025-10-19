import { useState } from 'react';
import { JoinedGathering } from '@/types/response/gatherings';
import GatheringCard from './GatheringCard';

/**
 * 참여한 모임 목록을 보여주는 컴포넌트
 * - 각 모임을 카드 형태로 표시
 * - 모임 완료 후 리뷰 작성 시 상태 업데이트
 */
export default function JoinedGatherings() {
	//TODO : 추후 API를 호출할 예정입니다.
	const [gatherings, setGatherings] = useState<JoinedGathering[]>([
		{
			teamId: 1,
			id: 1,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2026-10-01T12:30:00',
			registrationEnd: '2026-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 20,
			capacity: 20,
			image: '/stretching.png',
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
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: null,
			joinedAt: '2025-09-28T09:00:00',
			isCompleted: false,
			isReviewed: false
		},
		{
			teamId: 1,
			id: 3,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-10-01T12:30:00',
			registrationEnd: '2025-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 20,
			capacity: 20,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: null,
			joinedAt: '2025-09-28T09:00:00',
			isCompleted: true,
			isReviewed: false
		},
		{
			teamId: 1,
			id: 4,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-10-01T12:30:00',
			registrationEnd: '2025-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 19,
			capacity: 20,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: '2025-09-30T23:59:59',
			joinedAt: '2025-09-28T09:00:00',
			isCompleted: false,
			isReviewed: false
		}
	]);

	/**
	 * 리뷰 작성 성공 시 호출되는 콜백
	 * - 해당 모임의 isReviewed 상태를 true로 변경
	 * @param id 리뷰 작성된 모임 ID
	 */
	const handleReviewSuccess = (id: number) => {
		setGatherings(prev => prev.map(g => (g.id === id ? { ...g, isReviewed: true } : g)));
	};
	return (
		<div className="flex flex-col gap-6">
			{gatherings.map(gathering => (
				<GatheringCard
					key={gathering.id}
					gathering={gathering}
					onReviewSuccess={() => handleReviewSuccess(gathering.id)}
				/>
			))}
		</div>
	);
}
