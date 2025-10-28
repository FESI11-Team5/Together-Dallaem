'use client';

import { useEffect, useState } from 'react';
import { getGatherings } from '@/apis/gatherings';
import { useWishlistStore } from '@/stores/wishlist';
import { LIKED_GATHERING_MESSAGE } from '@/constants/messages';
import type { Gathering, GatheringType } from '@/types/response/gatherings';

import Link from 'next/link';
import Image from 'next/image';
import Tab from '../commons/Tab';
import Chip from '../commons/Chip';
import CardList from './cardList/CardList';
import BasicPagination from '../commons/basic/BasicPagination';

const ITEMS_PER_PAGE = 4;

export default function FavoriteGatherings() {
	const [selectedTab, setSelectedTab] = useState<'DALLAEMFIT' | 'WORKATION'>('DALLAEMFIT');
	const [selectedChip, setSelectedChip] = useState<GatheringType>('DALLAEMFIT');
	const { wishlist } = useWishlistStore();
	const hasHydrated = useWishlistStore(state => state.hasHydrated);
	const [favoriteGatherings, setFavoriteGatherings] = useState<Gathering[]>([]);
	const [pageState, setPageState] = useState({
		DALLAEMFIT: 1,
		WORKATION: 1
	});

	useEffect(() => {
		if (!hasHydrated) return;
		if (wishlist.size === 0) {
			setFavoriteGatherings([]);
			return;
		}

		const fetchData = async () => {
			try {
				const ids = Array.from(wishlist).join(',');
				const data = await getGatherings(`id=${ids}`);
				setFavoriteGatherings(data);
			} catch (err) {
				console.error('찜한 모임 불러오기 실패:', err);
				setFavoriteGatherings([]);
			}
		};

		fetchData();
	}, [wishlist, hasHydrated]);

	const wishlistIds = Array.from(wishlist);
	const likedGatherings = favoriteGatherings.filter(g => wishlistIds.includes(g.id));
	const filteredGatherings = likedGatherings.filter(g => {
		if (selectedTab === 'WORKATION') return g.type === 'WORKATION';

		if (selectedTab === 'DALLAEMFIT') {
			if (selectedChip === 'DALLAEMFIT') return g.type !== 'WORKATION';
			if (selectedChip === 'OFFICE_STRETCHING') return g.type === 'OFFICE_STRETCHING';
			if (selectedChip === 'MINDFULNESS') return g.type === 'MINDFULNESS';
		}

		return false;
	});

	const currentPage = pageState[selectedTab];
	const totalPages = Math.ceil(filteredGatherings.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedGatherings = filteredGatherings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	/** 페이지 변경 핸들러 */
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
					<div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-gray-800 bg-primary-50">
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
							{ value: 'DALLAEMFIT', text: '달램핏', icon: '/icons/dalaemfit.svg' },
							{ value: 'WORKATION', text: '워케이션', icon: '/icons/workation.svg' }
						]}
						selectedTab={selectedTab}
						onTabChange={tabValue => {
							setSelectedTab(tabValue as 'DALLAEMFIT' | 'WORKATION');
							setSelectedChip('DALLAEMFIT');
							setPageState(prev => ({ ...prev, [tabValue]: 1 }));
						}}
					/>
				</div>

				{/* 칩 */}
				<div className="mb:pb-4 mb:border-b-2 mb:border-gray-200 flex gap-2">
					{selectedTab === 'DALLAEMFIT' ? (
						<>
							<Chip
								text="전체"
								isActive={selectedChip === 'DALLAEMFIT'}
								onClick={() => setSelectedChip('DALLAEMFIT')}
							/>
							<Chip
								text="오피스 트레이닝"
								isActive={selectedChip === 'OFFICE_STRETCHING'}
								onClick={() => {
									setSelectedChip('OFFICE_STRETCHING');
									setPageState(prev => ({ ...prev, [selectedTab]: 1 }));
								}}
							/>
							<Chip
								text="마인드풀니스"
								isActive={selectedChip === 'MINDFULNESS'}
								onClick={() => {
									setSelectedChip('MINDFULNESS');
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
							<div className="leading-sm flex items-center justify-center text-sm font-medium text-gray-500">
								{LIKED_GATHERING_MESSAGE.noData}
							</div>
						) : (
							paginatedGatherings.map(gathering => (
								<Link key={gathering.id} href={`/gatherings/${gathering.id}`}>
									<CardList data={gathering} />
								</Link>
							))
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
