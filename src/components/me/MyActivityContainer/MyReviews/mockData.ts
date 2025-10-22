import { JoinedGathering } from '@/types/response/gatherings';
import { ReviewResponse } from '@/types/response/reviews';

export const mockGatherings: JoinedGathering[] = [
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
		image: '/images/example1.jpg',
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
		image: '/images/example1.jpg',
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
		image: '/images/example1.jpg',
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
		image: '/images/example1.jpg',
		createdBy: 5,
		canceledAt: '2025-09-30T23:59:59',
		joinedAt: '2025-09-28T09:00:00Z',
		isCompleted: false,
		isReviewed: true
	}
];

export const mockReviews: ReviewResponse[] = [
	{
		teamId: 1,
		id: 101,
		score: 5,
		comment:
			'따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요. 프로그램이 더 많이 늘어났으면 좋겠어요.',
		createdAt: '2025-10-18T12:30:00Z',
		Gathering: {
			teamId: 1,
			id: 1,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-01-07T17:30:00',
			location: '을지로 3가',
			image: '/images/example1.jpg'
		},
		User: {
			teamId: 1,
			id: 1,
			name: '코드잇',
			image: ''
		}
	},
	{
		teamId: 1,
		id: 102,
		score: 3,
		comment: '강사분도 친절하시고 ~ ^^ 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요 ~ ^^',
		createdAt: '2025-10-01T14:00:00Z',
		Gathering: {
			teamId: 1,
			id: 2,
			type: 'DALLAEMFIT',
			name: '달램핏 오피스 스트레칭',
			dateTime: '2025-10-01T12:30:00',
			location: '을지로 3가',
			image: '/images/example1.jpg'
		},
		User: {
			teamId: 1,
			id: 1,
			name: '코드잇',
			image: ''
		}
	}
];
