import { useState } from 'react';
import { JoinedGathering } from '@/types/response/gatherings';
import GatheringCard from './GatheringCard';

export default function JoinedGatherings() {
	const [gatherings] = useState<JoinedGathering[]>([
		{
			teamId: 1,
			id: 1,
			type: 'DALLAEMFIT',
			name: '달램핏',
			dateTime: '2025-10-01T12:30:00Z',
			registrationEnd: '2025-09-30T23:59:59Z',
			location: '건대입구',
			participantCount: 12,
			capacity: 12,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: '2025-09-30T23:59:59Z',
			joinedAt: '2025-09-28T09:00:00Z',
			isCompleted: false,
			isReviewed: false
		}
	]);

	return (
		<div>
			{gatherings.map(gathering => (
				<GatheringCard key={gathering.id} gathering={gathering} />
			))}
		</div>
	);
}
