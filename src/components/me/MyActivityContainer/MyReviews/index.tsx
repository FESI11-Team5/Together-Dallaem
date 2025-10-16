import { useState, useEffect } from 'react';
import { JoinedGathering } from '@/types/response/gatherings';
import WritableReviewCard from './WritableReviewCard';
import WrittenReviewCard from './WrittenReviewCard';
import BasicButton from '@/components/commons/basic/BasicButton';

/**
 * 나의 리뷰 탭 컴포넌트
 * - 작성 가능한 리뷰 / 작성한 리뷰 탭 제공
 * - 각 탭에 맞게 리뷰 카드 렌더링
 */
export default function MyReviews() {
	/** 현재 활성화된 탭: 'writable' | 'written' */
	const [activeTab, setActiveTab] = useState<'writable' | 'written'>('writable');

	/**
	 * 참여한 모임 리스트
	 * - TODO : 후에 API 호출 예정
	 */
	const [gatherings, setGatherings] = useState<JoinedGathering[]>([
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

	// TODO: 실제 API 호출로 참여한 모임 리스트 불러오기
	useEffect(() => {}, []);

	/**
	 * 리뷰 작성 성공 시 해당 모임의 isReviewed를 true로 업데이트
	 * @param gatheringId 리뷰 작성 완료한 모임 ID
	 */
	const handleReviewSuccess = (gatheringId: number) => {
		// TODO: 실제 리뷰 작성 API 호출 후 성공 시 상태 업데이트
		setGatherings(prev => prev.map(r => (r.id === gatheringId ? { ...r, isReviewed: true } : r)));
	};

	/** 현재 탭에 따라 렌더링할 리뷰 리스트 */
	const displayedReviews = gatherings.filter(r => (activeTab === 'writable' ? !r.isReviewed : r.isReviewed));

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
			{displayedReviews.map(gathering =>
				activeTab === 'writable' ? (
					<WritableReviewCard
						key={gathering.id}
						gathering={gathering}
						// TODO: 리뷰 작성 후 실제 API 호출 반영
						onSuccess={() => handleReviewSuccess(gathering.id)}
					/>
				) : (
					<WrittenReviewCard key={gathering.id} gathering={gathering} />
				)
			)}
		</div>
	);
}
