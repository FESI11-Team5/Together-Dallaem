import type { JoinedGathering } from '@/types/response/gatherings';
import ChipState from '@/components/commons/ChipState';

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
				{gathering.isCompleted ? <ChipState state="done" /> : <ChipState state="scheduled" />}

				{/* 개설 상태 */}
				{!gathering.isCompleted && (isFull ? <ChipState state="confirmed" /> : <ChipState state="waiting" />)}
			</div>
		</div>
	);
}
