// src/components/pagination/usePagination.ts
import { useMemo } from 'react';

interface PaginationProps {
	/** 현재 페이지 번호 */
	currentPage: number;
	/** 전체 페이지 수 */
	totalPages: number;
	/** 현재 페이지를 기준으로 표시할 페이지 번호의 범위 (기본값: 3) */
	range?: number;
}

export function usePagination({
	currentPage,
	totalPages,
	range = 3 // 보여줄 숫자 개수 (기본 3)
}: PaginationProps) {
	{
		// useMemo을 사용하여 불필요한 계산 방지
		// 적은 데이터양이지만 렌더링 최적화를 위해서 사용해봤습니다.

		return useMemo(() => {
			// 페이지 수가 1 이하인 경우 빈 배열 반환
			if (totalPages <= 1) return [];

			const pages: (number | string)[] = [];

			// 한 번에 보여줄 개수 (range)
			const visibleCount = range;

			// 시작 번호 = 현재 페이지 기준으로 왼쪽 여유 계산
			let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
			let end = start + visibleCount - 1;

			// totalPages 초과 방지
			if (end > totalPages) {
				end = totalPages;
				start = Math.max(1, end - visibleCount + 1);
			}

			// 페이지 범위 채우기
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			// 마지막 페이지가 전체보다 작으면 오른쪽 ellipsis 추가
			if (end < totalPages) {
				pages.push('…');
				pages.push(totalPages);
			}

			return pages;
		}, [currentPage, totalPages, range]);
	}
}
