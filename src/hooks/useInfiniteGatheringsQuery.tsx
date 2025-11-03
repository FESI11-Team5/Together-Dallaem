'use client';

import { getGatherings } from '@/apis/gatherings';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LIMIT = 10;

/**
 * useInfiniteGatheringsQuery
 * - queryString 기준으로 모임 데이터를 무한 스크롤로 가져오는 훅
 * - React Query + Intersection Observer 조합
 */
export function useInfiniteGatheringsQuery(queryString: string) {
	const { data, isLoading, fetchNextPage } = useInfiniteQuery({
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
		if (inView) fetchNextPage();
	}, [inView, fetchNextPage]);

	const hasData = data && data.length > 0;
	const isEmpty = !isLoading && !hasData;

	return {
		data,
		isLoading,
		hasData,
		isEmpty,
		ref
	};
}
