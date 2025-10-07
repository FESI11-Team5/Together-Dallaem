'use client';

import { useState } from 'react';

import Pagination from '../commons/BasicPagnation';

/** 임시 Mock 데이터 */
/** 추후 실제 데이터 타입으로 변환예정 */
interface Review {
	id: number;
	content: string;
	author: string;
}

// 👇 Mock 데이터
const mockReviews: Review[] = Array.from({ length: 50 }, (_, i) => ({
	id: i + 1,
	content: `리뷰 내용 ${i + 1}`,
	author: `작성자 ${i + 1}`
}));

export default function ReviewList() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;

	// 전체 페이지 수 계산
	const totalPages = Math.ceil(mockReviews.length / pageSize);

	// 현재 페이지 데이터 슬라이싱
	const startIndex = (currentPage - 1) * pageSize;
	const currentReviews = mockReviews.slice(startIndex, startIndex + pageSize);

	return (
		<div className="space-y-2">
			<h2 className="text-lg font-bold">리뷰 목록 (Mock)</h2>

			<ul>
				{currentReviews.map((review, idx) => (
					<li key={idx} className="border-b py-2">
						<p>{review.content}</p>
						<span className="text-sm text-gray-500">작성자: {review.author}</span>
					</li>
				))}
			</ul>

			{/* 페이지네이션 */}

			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
		</div>
	);
}
