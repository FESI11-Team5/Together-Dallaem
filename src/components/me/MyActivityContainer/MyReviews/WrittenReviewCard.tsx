import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import type { ReviewResponse } from '@/types/response/reviews';

interface WrittenReviewCardProps {
	/** 렌더링할 리뷰 객체 */
	review: ReviewResponse;
}

const WRITTEN_REVIEW_BOX_GLOW = '[box-shadow:0_0_2px_#B3B3B3,0_0_4px_#B3B3B3,0_0_8px_#B3B3B3]';

/**
 * WrittenReviewCard 컴포넌트
 *
 * 사용자가 작성한 리뷰 항목을 카드 형태로 렌더링합니다.
 * 카드에는 다음 항목이 포함됩니다:
 * - 모임 이미지
 * - 평점(하트 아이콘, 5단계)
 * - 리뷰 코멘트
 * - 모임 이름 및 위치
 * - 모임 날짜 (yyyy.MM.dd 포맷)
 *
 * 접근성:
 * - 평점 하트 아이콘의 `alt` 텍스트는 활성/비활성 상태를 구분하여 제공됩니다.
 * - 날짜/텍스트는 시각적 정보 외에도 스크린리더가 읽을 수 있는 텍스트로 제공됩니다.
 *
 * @component
 * @param {WrittenReviewCardProps} props - 컴포넌트 props
 * @param {ReviewResponse} props.review - 렌더링할 리뷰 객체
 * @returns {JSX.Element} 리뷰 카드 엘리먼트
 *
 * @example
 * <WrittenReviewCard review={reviewItem} />
 *
 * @notes
 * - `formatKoreanDate` 유틸로 모임 일시를 `yyyy.MM.dd` 형식으로 표시합니다.
 */
export default function WrittenReviewCard({ review }: WrittenReviewCardProps) {
	return (
		<div className="text-white">
			<div className="tb:flex-row relative flex w-full flex-col gap-6">
				{/* 모임 이미지 */}
				<div className="tb:w-70 relative h-39 w-full min-w-[280px] overflow-hidden rounded-3xl">
					<Image
						src={review.Gathering.image}
						alt="모임 이미지"
						fill
						className="bg-primary-100 rounded-3xl object-cover"
					/>
				</div>

				{/* 리뷰 정보 */}
				<div className="flex w-full flex-col justify-between gap-2 font-medium">
					<div className="flex w-full flex-col gap-2.5">
						<div className="flex gap-0.5">
							{Array.from({ length: 5 }).map((_, index) => (
								<Image
									key={`heart-${index}`}
									src={index < review.score ? '/icons/heart_active.svg' : '/icons/heart.svg'}
									alt={index < review.score ? '활성화된 하트' : '비활성화된 하트'}
									width={24}
									height={24}
								/>
							))}
						</div>
						<p className="text-sm">{review.comment}</p>
						<p className="text-xs opacity-80">
							{review.Gathering.name} 이용 · {review.Gathering.location}
						</p>
					</div>
					<p className="text-xs">{formatKoreanDate(review.Gathering.dateTime, 'yyyy.MM.dd')}</p>
					<div className={`tb:bg-white tb:h-[1px] tb:w-full tb:block hidden ${WRITTEN_REVIEW_BOX_GLOW}`} />
				</div>

				<div className={`tb:hidden h-[1px] w-full bg-white ${WRITTEN_REVIEW_BOX_GLOW} `} />
			</div>
		</div>
	);
}
