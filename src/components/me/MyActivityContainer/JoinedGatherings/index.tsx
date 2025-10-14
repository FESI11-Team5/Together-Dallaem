import { useState } from 'react';
import { JoinedGathering } from '@/types/response/gatherings';
import GatheringCard from './GatheringCard';

export default function JoinedGatherings() {
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
