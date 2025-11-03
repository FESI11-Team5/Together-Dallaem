'use client';

import GatheringFilterBar, { type FilterCriteria } from '@/app/(home)/GatheringFilterBar';
import { cn } from '@/utils/cn';
import { getGatheringQuery } from '@/utils/query';
// TODO: motion import 최적화
import { useInfiniteGatheringsQuery } from '@/hooks/useInfiniteGatheringsQuery';
import { Gathering } from '@/types/response/gatherings';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { useDeferredValue, useMemo, useState } from 'react';
import CardList from './CardList';
import CardSkeleton from './CardSkeleton';

const SKELETON_ITEMS = Array.from({ length: 10 }, (_, i) => i);

// TODO: 쿼리 상태 라이브러리 쓰는 걸로 변경하기
/**
 * 홈 페이지 컴포넌트
 * - 모임 목록을 필터 조건에 따라 조회하고 무한 스크롤로 표시합니다.
 * - React Query의 `useInfiniteQuery`를 사용하여 데이터를 요청하며,
 * - `useDeferredValue`를 통해 필터 변경 시 렌더링 부하를 완화합니다.
 */
export default function HomePage() {
	const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
		type: '',
		location: '',
		date: undefined,
		sort: 'newest'
	});

	const deferredFilter = useDeferredValue(filterCriteria);
	const queryString = useMemo(() => getGatheringQuery(deferredFilter), [deferredFilter]);
	const { data, isLoading, ref, hasData, isEmpty } = useInfiniteGatheringsQuery(queryString);

	return (
		<div className="mb:px-6 mb:pt-10 pc:max-w-300 pc:px-25 mb:gap-8 bg-root m-auto flex w-full flex-1 flex-col gap-6 px-4 pt-6">
			{/* TODO: 이 부분도 공통 부분으로 컴포넌트 빼도 될듯 */}
			<h1 className="sr-only">Gameow 크루 찾기 페이지</h1>
			<div className="flex gap-4">
				<Image priority src={'/icons/home_cat.svg'} alt={'크루 찾기 이미지'} width={72} height={72} />
				<div className="flex flex-col gap-2">
					<p
						className={cn(
							'text-primary-500 text-sm font-medium',
							'[text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]'
						)}>
						혼자라구요?
					</p>
					<h2
						className={cn(
							'mb:text-2xl text-primary-50 text-lg font-semibold',
							'[text-shadow:0_0_1px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_2px_#e6fffa]'
						)}>
						지금 바로 크루에 합류해요⚡
					</h2>
				</div>
			</div>
			{/* // TODO: 리팩터링 */}
			<div className="mb:gap-6 flex flex-1 flex-col gap-4">
				<GatheringFilterBar setFilterCriteria={setFilterCriteria} />
				{hasData && (
					<>
						<CardList gatherings={data as Gathering[]} />
						<div ref={ref} />
					</>
				)}
				{isLoading && (
					<div className="flex flex-col gap-6">
						{SKELETON_ITEMS.map(i => (
							<CardSkeleton key={i} />
						))}
					</div>
				)}
				{isEmpty && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.4
						}}
						className="flex flex-1 flex-col items-center justify-center text-sm font-medium text-gray-500">
						<p>아직 크루가 없어요,</p>
						<p>지금 바로 크루를 만들어보세요</p>
					</motion.div>
				)}
			</div>
		</div>
	);
}
