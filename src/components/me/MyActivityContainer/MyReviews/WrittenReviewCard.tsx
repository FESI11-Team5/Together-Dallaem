import Image from 'next/image';
import { JoinedGathering } from '@/types/response/gatherings';
import { formatKoreanDate } from '@/utils/date';

interface GatheringProps {
	/** 리뷰가 작성된 모임 정보 */
	gathering: JoinedGathering;
}

/**
 * 작성된 리뷰 카드 컴포넌트
 * - 모임 이미지, 리뷰 점수(하트), 리뷰 내용, 모임 정보, 작성일 표시
 * - 마이페이지 '나의 리뷰' 탭 등에서 사용
 * - 작성일은 `yyyy.MM.dd` 형식으로 표시됨
 * - TODO : 추후 작성한 리뷰의 평점 및 코멘트 API를 호출할 예정입니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {JoinedGathering} props.gathering - 리뷰가 작성된 모임 정보
 *
 * @example
 * <WrittenReviewCard gathering={gatheringData} />
 */
export default function WrittenReviewCard({ gathering }: GatheringProps) {
	return (
		<div key={gathering.id}>
			<div className="tb:flex-row relative flex w-full flex-col gap-6">
				{/* 모임 이미지 */}
				<div className="tb:w-70 relative h-39 w-full min-w-[280px] overflow-hidden rounded-3xl">
					<Image src={gathering.image} alt="모임 이미지" fill className="rounded-3xl bg-orange-100 object-cover" />
				</div>

				{/* 리뷰 정보 */}
				<div className="tb:border-b-2 tb:border-dashed tb:border-gray-200 flex w-full flex-col gap-2 font-medium">
					<div className="flex w-full flex-col gap-2.5 text-gray-700">
						<div className="flex gap-0.5">
							{Array.from({ length: 5 }).map((_, index) => (
								<Image
									key={`heart-${index}`}
									src={'/icons/heart_active.svg'}
									alt={'활성화된 하트'}
									width={24}
									height={24}
								/>
							))}
						</div>
						<p className="text-sm">
							따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요!
							프로그램이 더 많이 늘어났으면 좋겠어요.
						</p>
						<p className="text-xs">
							{gathering.name} 이용 / {gathering.location}
						</p>
					</div>
					<p className="text-xs text-gray-500">{formatKoreanDate(gathering.dateTime, 'yyyy.MM.dd')}</p>
				</div>
				<div className="tb:hidden border-b-2 border-dashed border-gray-200" />
			</div>
		</div>
	);
}
