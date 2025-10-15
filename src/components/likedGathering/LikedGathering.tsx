'use client';

import { useState } from 'react';
import type { Gathering } from '@/types/response/gatherings';

import Image from 'next/image';
import Tab from '../commons/Tab';
import Chip from '../commons/Chip';
import CardList from './cardList/CardList';
import BasicPagination from '../commons/basic/BasicPagnation';
import { LIKED_GATHERING_MESSAGE } from '@/constants/messages';

const mockGatherings: Gathering[] = [
	{
		teamId: 1,
		id: 1,
		type: 'DALLAEMFIT',
		name: '달램핏 오피스 스트레칭',
		dateTime: '2025-10-20T17:30:00Z',
		registrationEnd: '2025-10-19T21:00:00Z',
		location: '을지로3가',
		participantCount: 20,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 2,
		type: 'OFFICE_STRETCHING',
		name: '직장인 점심 스트레칭',
		dateTime: '2025-10-21T12:00:00Z',
		registrationEnd: '2025-10-20T23:59:00Z',
		location: '건대입구',
		participantCount: 14,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 3,
		type: 'MINDFULNESS',
		name: '마인드풀니스 저녁 명상',
		dateTime: '2025-10-22T19:00:00Z',
		registrationEnd: '2025-10-22T15:00:00Z',
		location: '홍대입구',
		participantCount: 7,
		capacity: 20,
		image: '/images/example3.png',
		createdBy: 2,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 4,
		type: 'WORKATION',
		name: '제주 워케이션 힐링',
		dateTime: '2025-10-23T10:00:00Z',
		registrationEnd: '2025-10-22T23:59:00Z',
		location: '을지로3가',
		participantCount: 20,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 3,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 5,
		type: 'OFFICE_STRETCHING',
		name: '퇴근 후 릴렉스 스트레칭',
		dateTime: '2025-10-24T18:30:00Z',
		registrationEnd: '2025-10-24T12:00:00Z',
		location: '신림',
		participantCount: 18,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 2,
		id: 6,
		type: 'DALLAEMFIT',
		name: '아침 활력 스트레칭',
		dateTime: '2025-10-25T08:00:00Z',
		registrationEnd: '2025-10-24T21:00:00Z',
		location: '건대입구',
		participantCount: 20,
		capacity: 20,
		image: '/images/example3.png',
		createdBy: 2,
		canceledAt: null
	},
	{
		teamId: 2,
		id: 7,
		type: 'MINDFULNESS',
		name: '주말 힐링 명상',
		dateTime: '2025-10-26T10:00:00Z',
		registrationEnd: '2025-10-25T21:00:00Z',
		location: '홍대입구',
		participantCount: 5,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 3,
		canceledAt: null
	},
	{
		teamId: 3,
		id: 8,
		type: 'WORKATION',
		name: '속초 워케이션 캠프',
		dateTime: '2025-10-27T09:00:00Z',
		registrationEnd: '2025-10-26T22:00:00Z',
		location: '을지로3가',
		participantCount: 16,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 4,
		canceledAt: null
	},
	{
		teamId: 3,
		id: 9,
		type: 'DALLAEMFIT',
		name: '달램핏 점심 스트레칭',
		dateTime: '2025-10-28T12:30:00Z',
		registrationEnd: '2025-10-27T23:00:00Z',
		location: '신림',
		participantCount: 11,
		capacity: 20,
		image: '/images/example3.png',
		createdBy: 2,
		canceledAt: null
	},
	{
		teamId: 3,
		id: 10,
		type: 'MINDFULNESS',
		name: '마음챙김 워크숍',
		dateTime: '2025-10-28T19:00:00Z',
		registrationEnd: '2025-10-28T15:00:00Z',
		location: '건대입구',
		participantCount: 8,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 4,
		id: 11,
		type: 'WORKATION',
		name: '부산 워케이션 리프레시',
		dateTime: '2025-10-29T10:00:00Z',
		registrationEnd: '2025-10-28T23:00:00Z',
		location: '홍대입구',
		participantCount: 13,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 5,
		canceledAt: null
	},
	{
		teamId: 4,
		id: 12,
		type: 'OFFICE_STRETCHING',
		name: '오전 체조 프로그램',
		dateTime: '2025-10-29T09:00:00Z',
		registrationEnd: '2025-10-28T21:00:00Z',
		location: '을지로3가',
		participantCount: 1,
		capacity: 20,
		image: '/images/example3.png',
		createdBy: 3,
		canceledAt: null
	},
	{
		teamId: 4,
		id: 13,
		type: 'DALLAEMFIT',
		name: '달램핏 주말 클래스',
		dateTime: '2025-10-30T11:00:00Z',
		registrationEnd: '2025-10-29T23:00:00Z',
		location: '신림',
		participantCount: 20,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 3,
		canceledAt: null
	},
	{
		teamId: 5,
		id: 14,
		type: 'WORKATION',
		name: '강릉 워케이션 리프레시',
		dateTime: '2025-11-01T10:00:00Z',
		registrationEnd: '2025-10-31T23:00:00Z',
		location: '을지로3가',
		participantCount: 10,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 4,
		canceledAt: null
	},
	{
		teamId: 5,
		id: 15,
		type: 'MINDFULNESS',
		name: '달램핏 주간 명상회',
		dateTime: '2025-11-02T18:30:00Z',
		registrationEnd: '2025-11-02T15:00:00Z',
		location: '건대입구',
		participantCount: 6,
		capacity: 20,
		image: '/images/example3.png',
		createdBy: 4,
		canceledAt: null
	},
	{
		teamId: 6,
		id: 16,
		type: 'OFFICE_STRETCHING',
		name: '직장인 피로회복 스트레칭',
		dateTime: '2025-11-03T18:00:00Z',
		registrationEnd: '2025-11-03T12:00:00Z',
		location: '을지로3가',
		participantCount: 17,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 5,
		canceledAt: null
	},
	{
		teamId: 6,
		id: 17,
		type: 'DALLAEMFIT',
		name: '야간 힐링 스트레칭',
		dateTime: '2025-11-04T20:00:00Z',
		registrationEnd: '2025-11-04T17:00:00Z',
		location: '홍대입구',
		participantCount: 10,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 2,
		canceledAt: null
	},
	{
		teamId: 6,
		id: 18,
		type: 'WORKATION',
		name: '속초 비즈니스 워케이션',
		dateTime: '2025-11-05T09:30:00Z',
		registrationEnd: '2025-11-04T22:00:00Z',
		location: '신림',
		participantCount: 8,
		capacity: 20,
		image: '/images/example3.png',
		createdBy: 6,
		canceledAt: null
	},
	{
		teamId: 7,
		id: 19,
		type: 'MINDFULNESS',
		name: '퇴근 후 힐링 명상',
		dateTime: '2025-11-06T19:00:00Z',
		registrationEnd: '2025-11-06T15:00:00Z',
		location: '건대입구',
		participantCount: 19,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 7,
		canceledAt: null
	},
	{
		teamId: 7,
		id: 20,
		type: 'WORKATION',
		name: '서울 근교 워케이션 데이',
		dateTime: '2025-11-07T09:00:00Z',
		registrationEnd: '2025-11-06T23:00:00Z',
		location: '홍대입구',
		participantCount: 12,
		capacity: 20,
		image: '/images/example2.png',
		createdBy: 8,
		canceledAt: null
	}
];

const ITEMS_PER_PAGE = 4;

export default function LikedGathering() {
	const [selectedTab, setSelectedTab] = useState<'dalaemfit' | 'workation'>('dalaemfit');
	const [selectedChip, setSelectedChip] = useState<'전체' | '오피스 트레이닝' | '마인드풀니스'>('전체');

	const [pageState, setPageState] = useState({
		dalaemfit: 1,
		workation: 1
	});

	const filteredGatherings: Gathering[] = mockGatherings.filter(g => {
		// 탭 필터링
		if (selectedTab === 'workation') return g.type === 'WORKATION';

		// 칩 필터링
		if (selectedTab === 'dalaemfit') {
			if (selectedChip === '전체') return g.type !== 'WORKATION';
			if (selectedChip === '오피스 트레이닝') return g.type === 'OFFICE_STRETCHING';
			if (selectedChip === '마인드풀니스') return g.type === 'MINDFULNESS';
		}

		return false;
	});

	const currentPage = pageState[selectedTab];
	const totalPages = Math.ceil(filteredGatherings.length / ITEMS_PER_PAGE);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedGatherings = filteredGatherings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	const handlePageChange = (page: number) => {
		setPageState(prev => ({
			...prev,
			[selectedTab]: page
		}));
	};

	return (
		<div className="flex h-auto flex-col items-center py-20">
			<div className="w-full max-w-[996px]">
				{/* 타이틀 */}
				<section className="flex w-full items-start justify-start gap-[13px]">
					<div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-gray-800 bg-orange-50">
						<Image src="/icons/heart_to_heart.svg" alt="찜한 모임" width={32} height={30} />
					</div>
					<div className="flex flex-col items-start justify-center gap-2">
						<h1 className="leading-2xl text-2xl font-semibold text-gray-900">{LIKED_GATHERING_MESSAGE.title}</h1>
						<p className="leading-sm text-sm font-medium text-gray-700">{LIKED_GATHERING_MESSAGE.subTitle}</p>
					</div>
				</section>

				{/* 탭 */}
				<div className="mt-6 mb-3">
					<Tab
						options={[
							{ value: 'dalaemfit', text: '달램핏', icon: '/icons/dalaemfit.svg' },
							{ value: 'workation', text: '워케이션', icon: '/icons/workation.svg' }
						]}
						selectedTab={selectedTab}
						onTabChange={tabValue => {
							setSelectedTab(tabValue as 'dalaemfit' | 'workation');
							setSelectedChip('전체');
							setPageState(prev => ({ ...prev, [tabValue]: 1 }));
						}}
					/>
				</div>

				{/* 칩 */}
				<div className="mb:pb-4 mb:border-b-2 mb:border-gray-200 flex gap-2">
					{selectedTab === 'dalaemfit' ? (
						<>
							<Chip text="전체" isActive={selectedChip === '전체'} onClick={() => setSelectedChip('전체')} />
							<Chip
								text="오피스 트레이닝"
								isActive={selectedChip === '오피스 트레이닝'}
								onClick={() => {
									setSelectedChip('오피스 트레이닝');
									setPageState(prev => ({ ...prev, [selectedTab]: 1 }));
								}}
							/>
							<Chip
								text="마인드풀니스"
								isActive={selectedChip === '마인드풀니스'}
								onClick={() => {
									setSelectedChip('마인드풀니스');
									setPageState(prev => ({ ...prev, [selectedTab]: 1 }));
								}}
							/>
						</>
					) : (
						<Chip text="전체" isActive />
					)}
				</div>

				{/* 카드 리스트 + 페이지네이션 영역 */}
				<div className="max-mb:min-h-[1500px] flex min-h-[820px] flex-col justify-between">
					{/* 카드 리스트 */}
					<div className="mt-6 flex flex-grow flex-col gap-6">
						{paginatedGatherings.length === 0 ? (
							<div className="leading-sm flex justify-center text-sm font-medium text-gray-500">
								{LIKED_GATHERING_MESSAGE.noData}
							</div>
						) : (
							paginatedGatherings.map(g => <CardList key={g.id} data={g} />)
						)}
					</div>

					{/* 페이지네이션 */}
					{totalPages > 1 && (
						<div className="mt-12 flex justify-center">
							<BasicPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
