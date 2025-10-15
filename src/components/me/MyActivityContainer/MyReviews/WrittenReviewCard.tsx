import Image from 'next/image';
import { JoinedGathering } from '@/types/response/gatherings';

interface GatheringProps {
	gathering: JoinedGathering;
}

export default function WrittenReviewCard({ gathering }: GatheringProps) {
	return (
		<div key={gathering.id} className="border-b-2 border-dashed border-gray-200">
			<div className="tb:flex-row relative mb-6 flex flex-col gap-4">
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
			</div>
		</div>
	);
}
