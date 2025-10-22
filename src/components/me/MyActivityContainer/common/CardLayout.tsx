import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import { JoinedGathering } from '@/types/response/gatherings';
import { ReactNode } from 'react';

interface GatheringProps {
	/** 표시할 모임 객체 */
	gathering: JoinedGathering;

	/** 카드에 표시할 뱃지 또는 추가 컨텐츠 */
	badgeContent?: ReactNode;

	/** 카드 내부 하단에 표시할 추가 컨텐츠 (버튼 등) */
	children?: ReactNode;
}

/**
 * 모임 카드 레이아웃 컴포넌트
 * - 모임 이미지, 이름, 장소, 날짜/시간, 인원 정보 표시
 * - badgeContent와 children을 통해 확장 가능
 */
export default function CardLayout({ gathering, badgeContent, children }: GatheringProps) {
	return (
		<div key={gathering.id} className="border-b-2 border-dashed border-gray-200">
			<div className="tb:flex-row relative mb-6 flex flex-col gap-4">
				{/* 모임 이미지 */}
				<div className="tb:w-70 relative h-39 w-full overflow-hidden rounded-3xl">
					<Image src={gathering.image} alt="모임 이미지" fill className="rounded-3xl bg-orange-100 object-cover" />
				</div>

				{/* 모임 정보 */}
				<div className="tb:justify-between flex flex-col gap-4.5 text-lg font-semibold text-gray-900">
					<div className="flex flex-col gap-3">
						{badgeContent}
						<div className="flex flex-col gap-1.5">
							<div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
								<p>{gathering.name}</p>
								<p>|</p>
								<p className="text-sm font-medium text-gray-700">{gathering.location}</p>
							</div>
							<div className="flex gap-3 text-sm font-medium text-gray-700">
								<p>{formatKoreanDate(gathering.dateTime)}</p>
								<div className="flex justify-center gap-1">
									<Image src="/icons/person.svg" alt="모임 인원 아이콘" width={16} height={16} />
									<p>
										{gathering.participantCount} / {gathering.capacity}
									</p>
								</div>
							</div>
						</div>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
