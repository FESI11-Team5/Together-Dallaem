import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import { ReviewResponse } from '@/types/response/reviews';

/**
 * 리뷰 카드 컴포넌트
 * - 모임 이미지, 리뷰 점수(하트), 리뷰 내용, 모임 정보, 작성자 ID, 작성일 표시
 * - 모든 리뷰 페이지에서 사용
 * - 작성일은 `yyyy.MM.dd` 형식으로 표시됨
 *
 * @param {Object} props - 컴포넌트 props
 * @param {JoinedGathering} props.gathering - 리뷰가 작성된 모임 정보
 *
 * @example
 * <WrittenReviewCard gathering={gatheringData} />
 */
export default function ReviewItem({ reviewData }: { reviewData: ReviewResponse | null }) {
	return (
		<div key={reviewData?.id} className="w-full">
			<div className="tb:flex-row relative flex flex-col content-between gap-6">
				{/* 모임 이미지 */}
				<div className="tb:w-70 relative h-39 w-full overflow-hidden rounded-3xl object-contain">
					{reviewData?.Gathering?.image ? (
						<Image
							src={reviewData.Gathering.image}
							alt="모임 이미지"
							fill
							objectFit="cover"
							className="bg-primary-100"
						/>
					) : (
						<div className="tb:w-70 bg-primary-100 flex h-39 w-full items-center justify-center rounded-3xl">
							<span className="text-sm text-gray-500">이미지 없음</span>
						</div>
					)}
				</div>

				{/* 리뷰 정보 */}
				<div className="tb:border-b-2 tb:border-dashed tb:border-gray-200 flex grow flex-col gap-2 font-medium">
					<div className="flex flex-col gap-2.5 text-gray-200">
						{reviewData?.score && (
							<div className="flex gap-0.5">
								{Array.from({ length: reviewData?.score }).map((_, index) => (
									<Image
										key={`heart-${index}`}
										src={'/icons/heart_active.svg'}
										alt={'활성화된 하트'}
										width={24}
										height={24}
									/>
								))}
								{Array.from({ length: 5 - reviewData?.score }).map((_, index) => (
									<Image
										key={`heart-${index}`}
										src={'/icons/heart.svg'}
										alt={'비활성화된 하트'}
										width={24}
										height={24}
									/>
								))}
							</div>
						)}
						<p className="text-sm">{reviewData?.comment}</p>
						<p className="text-xs">
							{reviewData?.Gathering?.name} 이용 · {reviewData?.Gathering?.location}
						</p>
					</div>
					<div className="flex items-center gap-2 text-xs text-gray-500">
						{reviewData?.User?.image ? (
							<div className="relative h-6 w-6">
								<Image
									src={reviewData?.User?.image || ''}
									alt="사용자 프로필 이미지"
									fill
									objectFit="cover"
									className="rounded-full"
								/>
							</div>
						) : (
							<Image src="images/profile_edit.svg" width={24} height={24} alt="빈 사용자 프로필 이미지"></Image>
						)}
						{reviewData?.User?.name}
						<span className="mr-1"> | </span>
						<span className="text-gray-400">{formatKoreanDate(reviewData?.createdAt || '', 'yyyy.MM.dd')}</span>
					</div>
				</div>
				<div className="tb:hidden border-b-2 border-dashed border-gray-200" />
			</div>
		</div>
	);
}
