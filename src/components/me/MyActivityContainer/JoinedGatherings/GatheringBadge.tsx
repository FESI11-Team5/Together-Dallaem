import Image from 'next/image';
import { JoinedGathering } from '@/types/response/gatherings';

interface GatheringBadgeProps {
	/** 표시할 모임 객체 */
	gathering: JoinedGathering;
	isFull: boolean;
}

/**
 * 참여한 모임을 보여주는 카드 컴포넌트
 * - 모임 정보 표시
 * - 예약 취소 / 리뷰 작성 버튼 제공
 */
export default function GatheringBadge({ gathering, isFull }: GatheringBadgeProps) {
	return (
		<div className="flex flex-col gap-3">
			{/* 이용 상태 / 개설 상태 */}
			<div className="flex gap-2">
				{/* 이용 상태 */}
				<div
					className={`rounded-3xl px-3 py-1.5 text-sm font-medium ${
						gathering.isCompleted ? 'bg-gray-200 text-gray-500' : 'bg-orange-100 text-orange-600'
					}`}>
					{gathering.isCompleted ? '이용 완료' : '이용 예정'}
				</div>

				{/* 개설 상태 */}
				{!gathering.isCompleted && (
					<div
						className={`flex items-center justify-between gap-0.5 rounded-3xl border px-3 py-1.5 text-sm font-medium ${
							isFull ? 'border-orange-100 text-orange-500' : 'border-gray-200 text-gray-500'
						}`}>
						{isFull ? (
							<div className="flex items-center gap-1">
								<Image src="/icons/check.svg" alt="개설 확정" width={16} height={16} />
								<p>개설확정</p>
							</div>
						) : (
							<p>개설대기</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
