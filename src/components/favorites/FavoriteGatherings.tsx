'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getGatherings } from '@/apis/gatherings';
import { useWishlistStore } from '@/stores/wishlist';
import { LIKED_GATHERING_MESSAGE } from '@/constants/messages';
import type { Gathering, GatheringType } from '@/types/response/gatherings';

import * as motion from 'motion/react-client';
import Image from 'next/image';
import Tab from '../commons/Tab';
import Chip from '../commons/Chip';
import CardList from './cardList/CardList';
import BasicPagination from '../commons/basic/BasicPagination';
import { useQuery } from '@tanstack/react-query';
import CardSkeleton from '@/app/(home)/CardSkeleton';
import NoDataMessage from '../commons/NoDataMessage/NoDataMessage';
import { cn } from '@/utils/cn';

const ITEMS_PER_PAGE = 4;

export default function FavoriteGatherings() {
	const [selectedTab, setSelectedTab] = useState<'DALLAEMFIT' | 'WORKATION'>('DALLAEMFIT');
	const [selectedChip, setSelectedChip] = useState<GatheringType>('DALLAEMFIT');
	const [pageState, setPageState] = useState({ DALLAEMFIT: 1, WORKATION: 1 });

	const { wishlist, hasHydrated } = useWishlistStore();
	const router = useRouter();

	/** 찜한 모임 목록 쿼리 */
	const { data: favoriteGatherings = [], isLoading } = useQuery({
		queryKey: ['favoriteGatherings', Array.from(wishlist)],
		queryFn: async () => {
			if (!hasHydrated || wishlist.size === 0) return [];
			const ids = Array.from(wishlist).join(',');
			return await getGatherings(`id=${ids}`);
		}
	});

	/** 필터링 */
	const filteredGatherings = useMemo(() => {
		const wishlistIds = Array.from(wishlist);
		const likedGatherings = favoriteGatherings.filter(g => wishlistIds.includes(g.id));

		const result = likedGatherings.filter(g => {
			if (selectedTab === 'WORKATION') return g.type === 'WORKATION';
			if (selectedTab === 'DALLAEMFIT') {
				if (selectedChip === 'DALLAEMFIT') return g.type !== 'WORKATION';
				if (selectedChip === 'OFFICE_STRETCHING') return g.type === 'OFFICE_STRETCHING';
				if (selectedChip === 'MINDFULNESS') return g.type === 'MINDFULNESS';
			}
			return false;
		});

		return result.sort((a, b) => {
			const now = new Date();
			const aEndDate = new Date(a.registrationEnd);
			const bEndDate = new Date(b.registrationEnd);

			const aIsExpired = aEndDate < now;
			const bIsExpired = bEndDate < now;

			// 만료된 모임은 뒤로 보내기
			if (aIsExpired === bIsExpired) {
				// 둘 다 같은 상태라면 날짜순 정렬 (가까운 순)
				return aEndDate.getTime() - bEndDate.getTime();
			}
			return aIsExpired ? 1 : -1;
		});
	}, [favoriteGatherings, wishlist, selectedTab, selectedChip]);

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
		<div className="max-mb:px-4 flex h-auto flex-col items-center pt-6">
			<div className="w-full max-w-[996px]">
				{/* 타이틀 */}
				<section className="flex w-full items-start justify-start gap-[13px]">
					<div className="flex h-18 w-18 items-center justify-center rounded-full">
						<Image
							priority
							src="/icons/favorite_cat.svg"
							alt={'찜한 크루 이미지'}
							width={72}
							height={72}
							className="object-cover"
						/>
					</div>
					<div className="flex flex-col items-start justify-center gap-2">
						<h1
							className={cn(
								'text-primary-500 text-sm font-medium',
								'[text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]'
							)}>
							{LIKED_GATHERING_MESSAGE.title}
						</h1>
						<p
							className={cn(
								'mb:text-2xl text-primary-50 text-lg font-semibold',
								'[text-shadow:0_0_1px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_2px_#e6fffa]'
							)}>
							{LIKED_GATHERING_MESSAGE.subTitle}
						</p>
					</div>
				</section>

				{/* 탭 */}
				<div className="mt-6 mb-3">
					<Tab
						options={[
							{ value: 'DALLAEMFIT', text: '함께 플레이', icon: '/icons/find_crew.svg' },
							{ value: 'WORKATION', text: '교환/통신하기', icon: '/icons/exchange.svg' }
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
								text="스팀"
								imgUrl="/icons/steam_logo.svg"
								isActive={selectedChip === 'OFFICE_STRETCHING'}
								onClick={() => {
									setSelectedChip('OFFICE_STRETCHING');
									setPageState(prev => ({ ...prev, [selectedTab]: 1 }));
								}}
							/>
							<Chip
								text="온라인"
								imgUrl="/icons/online.svg"
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
					<div className="mt-6 flex grow flex-col gap-6">
						{isLoading ? (
							// 로딩 중일 때: 스켈레톤 4개 렌더링
							Array.from({ length: 4 }).map((_, idx) => <CardSkeleton key={idx} />)
						) : paginatedGatherings.length === 0 ? (
							<NoDataMessage text="찜한 크루가 없네요" />
						) : (
							paginatedGatherings.map(gathering => (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.8 }}
									key={gathering.id}
									onClick={() => router.push(`/gatherings/${gathering.id}`)}
									className="hover:cursor-pointer">
									<CardList data={gathering} />
								</motion.div>
							))
						)}
					</div>

					{/* 페이지네이션 */}
					{totalPages > 1 && (
						<div className="my-12 flex justify-center">
							<BasicPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
