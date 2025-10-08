'use client';

import { usePagination } from '@/hooks/usePagination';

import Image from 'next/image';
import PaginationButton from '../pagination/PaginationButton';

interface PaginationProps {
	/** 현재 페이지 번호 */
	currentPage: number;
	/** 전체 페이지 수 */
	totalPages: number;
	/** 페이지 변경 시 호출되는 콜백 함수 */
	onPageChange: (page: number) => void;
	/** 현재 페이지를 기준으로 표시할 페이지 번호의 범위 (기본값: 3) */
	range?: number;
}
/**
 * 페이지네이션 컴포넌트
 * @param param0 - 페이지네이션에 필요한 속성들
 * @returns 페이지네이션 UI
 * @example
 * <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log(page)} />
 */
export default function Pagination({ currentPage, totalPages, onPageChange, range = 3 }: PaginationProps) {
	const pages = usePagination({ currentPage, totalPages, range });

	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center">
			<div className="flex w-[270px] items-center justify-center gap-2 md:w-[476px]">
				{/* 이전 버튼 */}
				<PaginationButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
					<Image
						src="/icons/pagination_arrow.svg"
						width={24}
						height={24}
						alt="◀︎"
						className={`${currentPage === 1 ? 'cursor-not-allowed' : 'hover:invert'}`}
					/>
				</PaginationButton>

				{/* 페이지 번호 버튼 */}
				{/* 페이지 번호 버튼이 Number면은 숫자를 보여주고 아니면 '...' 보여줌 */}
				{pages.map((page, idx) =>
					typeof page === 'number' ? (
						<PaginationButton key={idx} isActive={currentPage === page} onClick={() => onPageChange(page)}>
							{page}
						</PaginationButton>
					) : (
						<span key={idx} className="flex h-[48px] w-[48px] items-center justify-center text-gray-400">
							{page}
						</span>
					)
				)}

				{/* 다음 버튼 */}
				<PaginationButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
					<Image
						src="/icons/pagination_arrow.svg"
						width={24}
						height={24}
						alt="▶︎"
						className={`rotate-180 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:invert'}`}
					/>
				</PaginationButton>
			</div>
		</div>
	);
}
