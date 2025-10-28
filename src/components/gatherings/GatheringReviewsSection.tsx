'use client';

import { useEffect, useState } from 'react';

import { REVIEW_SECTION_TITLE } from '@/constants/messages';
import { ReviewResponse } from '@/types/response/reviews';
import { getReviews } from '@/apis/reviews/reviews';

import Image from 'next/image';
import BasicPagination from '../commons/basic/BasicPagination';

export default function GatheringReviewSection({ gatheringId }: { gatheringId: number }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [reviewData, setReviewData] = useState<ReviewResponse[]>([]);
	const pageSize = 4;

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const data = await getReviews({ gatheringId });

				setReviewData(data.data);
			} catch (error) {
				console.log('리뷰 불러오기 실패', error);
			}
		};

		fetchReviews();
	}, [gatheringId]);

	const totalPages = Math.ceil(reviewData.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const currentReviews = reviewData.slice(startIndex, startIndex + pageSize);

	return (
		<section className="mb:h-[650px] w-full border-t-2 border-gray-200 bg-root p-6">
			<h2 className="leading-lg mb-4 text-lg font-semibold text-gray-900">{REVIEW_SECTION_TITLE.title}</h2>
			<div className="flex h-full flex-col">
				{/* 리뷰가 없을 때 */}
				{reviewData.length === 0 ? (
					<div className="flex h-full flex-col items-center justify-center">
						<Image src="/images/no_data.svg" alt="데이터 없음" width={171} height={136} />
						<p className="text-sm text-gray-500">등록된 리뷰가 없습니다.</p>
					</div>
				) : (
					<>
						{/* 리뷰 리스트 */}
						<ul className="flex flex-col items-start gap-4">
							{currentReviews.map((review, idx) => (
								<li key={idx} className="flex w-full flex-col gap-2.5 border-b border-dashed border-gray-200 pb-4">
									<div className="flex flex-col gap-2.5">
										{/* 하트 5개 */}
										<div className="flex gap-0.5">
											{Array.from({ length: 5 }).map((_, i) => (
												<Image
													key={i}
													src={i < review.score ? '/icons/heart_active.svg' : '/icons/heart.svg'}
													alt="heart"
													width={16}
													height={16}
												/>
											))}
										</div>

										{/* 리뷰 내용 */}
										<p className="text-sm text-gray-800">{review.comment}</p>
									</div>

									{/* 작성자 정보 */}
									<div className="flex items-center gap-2.5">
										<Image
											src={review.User.image || '/images/profile.svg'}
											alt={review.User.name}
											width={24}
											height={24}
											className="mb:w-[20px] mb:h-[20px] rounded-full"
										/>
										<span className="text-xs font-medium text-gray-700">{review.User.name}</span>
										<span className="text-xs font-medium text-gray-700"> | </span>
										<span className="text-xs font-medium text-gray-500">
											{new Date(review.createdAt).toLocaleDateString()}
										</span>
									</div>
								</li>
							))}
						</ul>

						{/* 페이지네이션 */}
						<div className="flex justify-center">
							<BasicPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
						</div>
					</>
				)}
			</div>
		</section>
	);
}
