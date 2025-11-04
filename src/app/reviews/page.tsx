'use client';
// 마이페이지
import Image from 'next/image';
import Tab from '@/components/commons/Tab';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Chip from '@/components/commons/Chip';
import ScoreSection from '@/components/reviews/ScoreSection';
import { getReviews } from '@/apis/reviews/reviews';
import { GetReviewsResponse, scoreData } from '@/types/response/reviews';
import { getScores } from '@/apis/reviews/scores';
import { GatheringType } from '@/types/response/gatherings';
import ReviewSection from '@/components/reviews/ReviewSection';
import { FilterData } from '@/components/reviews/FilterSection';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';
import { REVIEWS_MESSAGE } from '@/constants/messages';
import { cn } from '@/utils/cn';

/**
 * 빈 값들을 제거한 필터 객체를 반환하는 헬퍼 함수
 */
const setReviewParams = (filterValues: FilterData): Record<string, string> => {
	return Object.entries(filterValues).reduce(
		(acc, [key, value]) => {
			if (value && value !== '') {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, string>
	);
};

/**
 * `Reviews` 컴포넌트
 *
 * 모든 리뷰 화면을 보여줍니다.
 * - 상단 제목("마이페이지")을 표시합니다.
 * - 카테고리별로 정렬 가능합니다.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Reviews() {
	const [activeTab, setActiveTab] = useState('DALLAEMFIT');
	const [selectedCategory, setSelectedCategory] = useState<GatheringType>('DALLAEMFIT');
	const [filterValues, setFilterValues] = useState<FilterData>({});
	const [currentPage, setCurrentPage] = useState(1);

	const handleFilterChange = useCallback(
		(filter: FilterData) => {
			if (JSON.stringify(filterValues) !== JSON.stringify(filter)) {
				setFilterValues(filter);
			}
		},
		[filterValues]
	);

	const iconMap = {
		OFFICE_STRETCHING: '/icons/steam_logo.svg',
		MINDFULNESS: '/icons/online.svg'
	} as const;

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	const {
		data: scores,
		isLoading: isLoadingScores,
		isError: isErrorScores
	} = useQuery({
		queryKey: ['scores', selectedCategory],
		queryFn: () => getScores({ type: selectedCategory })
	});

	const scoreData: scoreData | null = scores && scores.length > 0 ? scores[0] : null;

	const {
		data: reviewsData,
		isLoading: isLoadingReviews,
		isError: isErrorReviews
	} = useQuery({
		queryKey: ['reviews', selectedCategory, filterValues, currentPage],
		queryFn: () =>
			getReviews({
				type: selectedCategory,
				sortOrder: 'desc',
				offset: (currentPage - 1) * 10,
				...setReviewParams(filterValues)
			}),
		placeholderData: prev => prev
	});

	return (
		<div className="box-border bg-white/15" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-10 pc:max-w-300 pc:px-25 bg-root m-auto min-h-[100vh] px-4 pt-6">
				<section className="mb-[38px] flex gap-4">
					<Image src="/images/review.svg" alt="review icon" width={72} height={72} />
					<div className="flex flex-col gap-2">
						<p
							className={cn(
								'text-primary-500 text-sm font-medium',
								'[text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]'
							)}>
							{REVIEWS_MESSAGE.title}
						</p>
						<h2
							className={cn(
								'mb:text-2xl text-primary-50 text-lg font-semibold',
								'[text-shadow:0_0_1px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_2px_#e6fffa]'
							)}>
							{REVIEWS_MESSAGE.subtitle}
						</h2>
					</div>
				</section>
				<section>
					<Tab
						options={TYPE_OPTIONS}
						selectedTab={activeTab}
						onTabChange={(tabId: string) => {
							if (tabId === 'DALLAEMFIT') {
								setSelectedCategory('DALLAEMFIT');
							} else if (tabId === 'WORKATION') {
								setSelectedCategory('WORKATION');
							}
							setActiveTab(tabId);
						}}
						className="mb-4"
					/>
					{activeTab === 'DALLAEMFIT' && (
						<div key="dallaemfit" className="flex gap-2">
							{SUB_TYPE_OPTIONS.map(({ value, text }) => (
								<Chip
									key={value}
									text={text}
									isActive={selectedCategory === value}
									imgUrl={iconMap[value as keyof typeof iconMap]}
									onClick={() => setSelectedCategory(value as GatheringType)}
								/>
							))}
						</div>
					)}
					{activeTab === 'WORKATION' && (
						<div key="workation" className="flex gap-2">
							<Chip text="전체" isActive />
						</div>
					)}
					<div className="divider mt-4 h-[2px] w-full bg-gray-200"></div>
				</section>
				<ScoreSection data={scoreData} />
				<ReviewSection
					reviewData={reviewsData}
					isLoading={isLoadingReviews}
					callbackOnFilterChange={handleFilterChange}
					callBackOnPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
