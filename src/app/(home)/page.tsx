'use client';

import { getGatherings } from '@/apis/gatherings';
import GatheringFilterBar, { type FilterCriteria } from '@/app/(home)/GatheringFilterBar';
import { getGatheringQuery } from '@/utils/query';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CardList from './CardList';

// TODO: 쿼리 상태 라이브러리 쓰는 걸로 변경하기
export default function HomePage() {
	const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
		type: '',
		location: '',
		date: undefined,
		sort: 'deadlineLate'
	});

	const deferredFilter = useDeferredValue(filterCriteria);
	const queryString = useMemo(() => getGatheringQuery(deferredFilter), [deferredFilter]);

	const LIMIT = 10;
	const { data, isLoading, isFetching, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['gatherings', queryString],
		queryFn: ({ pageParam = 0 }) => getGatherings(`${queryString}&limit=${LIMIT}&offset=${pageParam}`),
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => (lastPage.length < LIMIT ? undefined : pages.length * LIMIT),
		select: data => data.pages.flat() ?? [],
		placeholderData: keepPreviousData
	});

	const { ref, inView } = useInView({
		rootMargin: '400px'
	});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage]);

	return (
		<div
			className="tb:px-6 tb:pt-10 pc:max-w-300 pc:px-25 tb:gap-8 m-auto flex flex-col gap-6 bg-white px-4 pt-6"
			style={{ minHeight: 'calc(100vh - 64px)' }}>
			{/* TODO: 이 부분도 공통 부분으로 컴포넌트 빼도 될듯 */}
			<h1 className="sr-only">같이 달램 모임 찾기 페이지</h1>
			<div className="flex gap-4">
				<Image priority src={'/icons/class.svg'} alt={'모임 찾기 이미지'} width={72} height={72} />
				<div className="flex flex-col gap-2">
					<p className="text-sm font-medium text-gray-700">함께 할 사람이 없나요?</p>
					<h2 className="tb:text-2xl text-lg font-semibold text-gray-900">지금 모임에 참여해보세요</h2>
				</div>
			</div>
			<div className="tb:gap-6 flex flex-1 flex-col gap-4">
				<GatheringFilterBar setFilterCriteria={setFilterCriteria} />
				{data && data?.length > 0 ? (
					<>
						<CardList gatherings={data} />
						{!isFetchingNextPage && <div ref={ref} />}
					</>
				) : (
					<div className="flex flex-1 flex-col items-center justify-center text-sm font-medium text-gray-500">
						<p>아직 모임이 없어요,</p>
						<p>지금 바로 모임을 만들어보세요</p>
					</div>
				)}
			</div>
		</div>
	);
}
