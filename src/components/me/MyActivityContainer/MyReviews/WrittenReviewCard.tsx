import Image from 'next/image';
import { JoinedGathering } from '@/types/response/gatherings';

interface GatheringProps {
	gathering: JoinedGathering;
}

export default function WrittenReviewCard({ gathering }: GatheringProps) {
	return (
		<div key={gathering.id}>
			<div className="tb:flex-row relative flex flex-col content-between gap-6">
				{/* 모임 이미지 */}
				<div className="tb:w-70 h-39 w-full rounded-3xl">
					<Image
						src={gathering.image}
						alt="모임 이미지"
						width={280}
						height={156}
						className="rounded-3xl bg-orange-100 object-cover"
					/>
				</div>

				{/* 리뷰 정보 */}
				<div className="tb:border-b-2 tb:border-dashed tb:border-gray-200 flex flex-col gap-2 font-medium">
					<div className="flex flex-col gap-2.5 text-gray-700">
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
					<p className="text-xs text-gray-500">{gathering.dateTime}</p>
				</div>
				<div className="tb:hidden border-b-2 border-dashed border-gray-200" />
			</div>
		</div>
	);
}
