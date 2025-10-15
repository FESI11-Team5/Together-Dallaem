import { useState } from 'react';
import { JoinedGathering } from '@/types/response/gatherings';
import MyReviewCard from './ReviewCard';
import BasicButton from '@/components/commons/basic/BasicButton';

export default function MyReviews() {
	const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');
	const [reviews, setReviews] = useState<JoinedGathering[]>([
		{
			teamId: 1,
			id: 1,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-01-07T17:30:00',
			registrationEnd: '2025-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 12,
			capacity: 12,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: '2025-09-30T23:59:59',
			joinedAt: '2025-09-28T09:00:00',
			isCompleted: false,
			isReviewed: false
		},
		{
			teamId: 1,
			id: 2,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-10-01T12:30:00',
			registrationEnd: '2025-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 12,
			capacity: 12,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: '2025-09-30T23:59:59',
			joinedAt: '2025-09-28T09:00:00Z',
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
			participantCount: 12,
			capacity: 12,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: '2025-09-30T23:59:59',
			joinedAt: '2025-09-28T09:00:00Z',
			isCompleted: false,
			isReviewed: true
		},
		{
			teamId: 1,
			id: 4,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-10-01T12:30:00',
			registrationEnd: '2025-09-30T23:59:59',
			location: '을지로 3가',
			participantCount: 12,
			capacity: 12,
			image: '/stretching.png',
			createdBy: 5,
			canceledAt: '2025-09-30T23:59:59',
			joinedAt: '2025-09-28T09:00:00Z',
			isCompleted: false,
			isReviewed: true
		}
	]);

	const handleReviewSuccess = (gatheringId: number) => {
		setReviews(prev => prev.map(r => (r.id === gatheringId ? { ...r, isReviewed: true } : r)));
	};

	const displayedReviews = reviews.filter(r => (activeTab === 'writable' ? !r.isReviewed : r.isReviewed));

	return (
		<div className="flex flex-col gap-6">
			<div className="flex gap-2">
				<BasicButton
					className={`!w-auto bg-gray-900 px-4 !text-sm !font-medium ${activeTab === 'writable' ? '!bg-gray-900' : '!bg-gray-200 !text-gray-900'} transition-colors`}
					onClick={() => setActiveTab('writable')}>
					작성 가능한 리뷰
				</BasicButton>
				<BasicButton
					className={`bg-gray-200 px-4 py-2.5 !text-sm !font-medium ${activeTab === 'written' ? '!bg-gray-900' : '!bg-gray-200 !text-gray-900'} transition-colors`}
					onClick={() => setActiveTab('written')}>
					작성한 리뷰
				</BasicButton>
			</div>
			{displayedReviews.map(gathering => (
				<MyReviewCard key={gathering.id} gathering={gathering} onSuccess={() => handleReviewSuccess(gathering.id)} />
			))}
		</div>
	);
}
