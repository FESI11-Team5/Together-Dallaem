'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { REVIEW_SECTION_TITLE } from '@/constants/messages';
import { ReviewResponse } from '@/types/response/reviews';
import { getReviews } from '@/apis/reviews/reviews';
import { PROFILE_PATHS } from '@/constants/assetPath';

import * as motion from 'motion/react-client';
import BasicPagination from '@/components/commons/basic/BasicPagination';

import Image from 'next/image';
import GatheringReviewSectionSkeleton from './skeleton/GatheringReviewSectionSkeleton';
import NoDataMessage from '../commons/NoDataMessage/NoDataMessage';

export default function GatheringReviewSection({ gatheringId }: { gatheringId: number }) {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 4;

	const { data, isLoading } = useQuery({
		queryKey: ['gatheringReviews', gatheringId],
		queryFn: () => getReviews({ gatheringId }),
		select: res => res.data
	});

	const reviewData: ReviewResponse[] = data ?? [];
	const totalPages = Math.ceil(reviewData.length / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const currentReviews = reviewData.slice(startIndex, startIndex + pageSize);

	return (
		<section className="bg-root mb-30 rounded-3xl border-2 border-white p-6">
			<h2 className="leading-lg mb-4 border-b-2 border-dashed border-b-gray-200 text-lg font-semibold text-white text-shadow-white">
				{REVIEW_SECTION_TITLE.title}
			</h2>

			<div className="flex h-full flex-col">
				{/* 리뷰가 없을 때 */}
				{isLoading ? (
					<ul className="flex flex-col gap-4">
						{Array.from({ length: 3 }).map((_, idx) => (
							<GatheringReviewSectionSkeleton key={idx} />
						))}
					</ul>
				) : reviewData.length === 0 ? (
					<NoDataMessage text="등록된 리뷰가 없습니다." />
				) : (
					<>
						{/* 리뷰 리스트 */}
						<motion.ul
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="flex flex-col items-start gap-4">
							{currentReviews.map((review, idx) => (
								<li key={idx} className="flex w-full flex-col gap-2.5 border-b border-dashed border-gray-200 pb-4">
									<div className="flex flex-col gap-2.5">
										{/* 하트 5개 */}
										<div className="flex gap-0.5">
											{Array.from({ length: 5 }).map((_, i) => (
												<Image
													key={i}
													src={i < review.score ? '/icons/heart_active.svg' : '/icons/heart.svg'}
													alt={i < review.score ? '하트 활성' : '하트 비활성'}
													width={16}
													height={16}
												/>
											))}
										</div>

										{/* 리뷰 내용 */}
										<p className="text-sm text-white">{review.comment}</p>
									</div>

									{/* 작성자 정보 */}
									<div className="flex items-center gap-2.5">
										<Image
											src={review.User.image || PROFILE_PATHS.DEFAULT_PROFILE_SRC}
											alt={review.User.name}
											width={24}
											height={24}
											className="mb:w-5 mb:h-5 rounded-full"
										/>
										<span className="text-xs font-medium text-white">{review.User.name}</span>
										<span className="text-xs font-medium text-white"> | </span>
										<span className="text-xs font-medium text-white">
											{new Date(review.createdAt).toLocaleDateString()}
										</span>
									</div>
								</li>
							))}
						</motion.ul>

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
