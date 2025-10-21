'use client';
// 마이페이지
import Image from 'next/image';
import Tab from '@/components/commons/Tab';
import { useEffect, useState, useCallback, useRef } from 'react';
import Chip from '@/components/commons/Chip';
import ScoreSection from '@/components/reviews/ScoreSection';
import { getReviews } from '@/apis/reviews/reviews';
import { GetReviewsResponse, scoreData } from '@/types/response/reviews';
import { getScores } from '@/apis/reviews/scores';
import { GatheringType } from '@/types/response/gatherings';
import ReviewSection from '@/components/reviews/ReviewSection';
import { FilterData } from '@/components/reviews/FilterSection';

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
	const [scoreData, setScoreData] = useState<scoreData | null>(null);
	const [reviewsData, setReviewsData] = useState<GetReviewsResponse | null>(null);
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

	const handlePageChange = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	useEffect(() => {
		const getScoreData = async () => {
			try {
				const scores = await getScores({ type: selectedCategory });
				setScoreData(scores[0]);
			} catch (error) {
				//TODO: 모달창 띄우기
				console.error(error);
			}
		};
		getScoreData();
	}, [selectedCategory]);

	useEffect(() => {
		const getReviewsData = async () => {
			try {
				const reviews = await getReviews({
					type: selectedCategory,
					sortOrder: 'desc',
					offset: (currentPage - 1) * 10,
					...setReviewParams(filterValues)
				});
				setReviewsData(reviews);
			} catch (error) {
				//TODO: 모달창 띄우기
				console.error(error);
			}
		};
		getReviewsData();
	}, [selectedCategory, filterValues, currentPage]);

	return (
		<div className="box-border bg-gray-100" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 m-auto min-h-[100vh] bg-gray-50 px-4 pt-6">
				<section className="mb-[38px] flex items-center gap-1.5">
					<Image src="/images/review.svg" alt="review icon" width={72} height={72} />
					<div>
						<h1 className="mb-2 text-2xl font-semibold text-gray-900">모든 리뷰</h1>
						<h3 className="text-sm font-medium text-gray-700">같이달램을 이용한 분들은 이렇게 느꼈어요 🫶</h3>
					</div>
				</section>
				<div className="pl-4">
					<Tab
						options={[
							{ text: '달램핏', value: 'DALLAEMFIT', icon: '/icons/dalaemfit.svg' },
							{ text: '워케이션', value: 'WORKATION', icon: '/icons/workation.svg' }
						]}
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
						<div className="flex gap-2 transition-all duration-300">
							<Chip
								text="전체"
								isActive={selectedCategory === 'DALLAEMFIT'}
								onClick={() => setSelectedCategory('DALLAEMFIT')}
							/>
							<Chip
								text="오피스 스트레칭"
								isActive={selectedCategory === 'OFFICE_STRETCHING'}
								onClick={() => setSelectedCategory('OFFICE_STRETCHING')}
							/>
							<Chip
								text="마인드풀니스"
								isActive={selectedCategory === 'MINDFULNESS'}
								onClick={() => setSelectedCategory('MINDFULNESS')}
							/>
						</div>
					)}
					<div className="divider mt-4 h-[2px] w-full bg-gray-200"></div>
				</div>
				<ScoreSection data={scoreData} />
				<ReviewSection
					reviewData={reviewsData}
					callbackOnFilterChange={handleFilterChange}
					callBackOnPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
