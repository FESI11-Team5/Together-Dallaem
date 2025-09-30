import Image from 'next/image';
import { formatKoreanDate } from '@/utils/date';
import { JoinedGathering } from '@/types/response/gatherings';
import CanceledOverlay from './CanceledOverlay';
import BasicButton from '@/components/commons/BasicButton';

interface GatheringProps {
	gathering: JoinedGathering;
}

export default function GatheringCard({ gathering }: GatheringProps) {
	const isFull = gathering.capacity === gathering.participantCount;
	const isPast = new Date(gathering.dateTime) < new Date();

	return (
		<div key={gathering.id} className="mb-6 border-b-2 border-dashed border-gray-200">
			<div className="tb:flex tb:gap-4 relative mb-6 items-center">
				{/* 취소된 모임 Overlay */}
				<CanceledOverlay canceledAt={gathering.canceledAt} />

				{/* 모임 이미지 */}
				<div className="tb:w-70 h-39 w-full rounded-3xl">
					<Image
						src={gathering.image}
						alt="모임 이미지"
						width={280}
						height={156}
						className="rounded-3xl object-cover"
					/>
				</div>

				{/* 모임 정보 */}
				<div className="tb:m-0 mt-4">
					<div className="flex items-center gap-2">
						{/* 이용 상태 */}
						<div
							className={`rounded-3xl px-3 py-1.5 text-sm font-medium ${gathering.isCompleted ? 'bg-gray-200 text-gray-500' : 'bg-orange-100 text-orange-600'}`}>
							{isPast ? '이용 완료' : '이용 예정'}
						</div>

						{/* 개설 상태(이용 완료 시 숨김) */}
						{!gathering.isCompleted && (
							<div
								className={`flex items-center justify-between gap-0.5 rounded-3xl border px-3 py-1.5 text-sm font-medium ${gathering.capacity === gathering.participantCount ? 'border-orange-100 text-orange-500' : 'border-gray-200 text-gray-500'}`}>
								{isFull ? (
									<div className="flex items-center justify-between gap-1">
										<Image src="/icons/check.svg" alt="개설 확정 체크 버튼" width={16} height={16} />
										<p>개설확정</p>
									</div>
								) : (
									<p>개설대기</p>
								)}
								{/* {getOpenStatus(gathering.capacity, gathering.participantCount)} */}
							</div>
						)}
					</div>

					{/* 모임 정보 */}
					<div className="mt-3">
						<div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
							<p>{gathering.name}</p>
							<p>|</p>
							<p className="text-sm font-medium text-gray-700">{gathering.location}</p>
						</div>

						<div className="mt-1.5">
							<div className="flex items-center gap-3 text-sm font-medium text-gray-700">
								<p>{formatKoreanDate(gathering.dateTime)}</p>
								<div className="flex items-center justify-center gap-0.5">
									<Image src="/icons/person.svg" alt="모임 인원 아이콘" width={16} height={16} />
									<p>
										{gathering.participantCount} / {gathering.capacity}
									</p>
								</div>
							</div>
						</div>

						{/* 예약 관련 버튼 */}
						<div className="mt-4.5">
							{!gathering.isCompleted ? (
								<BasicButton outlined>예약 취소하기</BasicButton>
							) : (
								<BasicButton>리뷰 작성하기</BasicButton>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
