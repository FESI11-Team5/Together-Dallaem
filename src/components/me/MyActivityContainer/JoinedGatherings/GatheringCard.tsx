import { useModal } from '@/hooks/useModal';
import { JoinedGathering } from '@/types/response/gatherings';
import BasicButton from '@/components/commons/basic/BasicButton';
import CardLayout from '../common/CardLayout';
import CancelConfirmModal from '../modals/CancelConfirmModal';
import CanceledOverlay from '../common/CanceledOverlay';
import GatheringBadge from './GatheringBadge';
import ReviewWriteModal from '../modals/ReviewWriteModal';

interface GatheringProps {
	/** 표시할 모임 객체 */
	gathering: JoinedGathering;

	/** 리뷰 작성 성공 시 호출되는 콜백 */
	onReviewSuccess: () => void;
}

/**
 * 참여한 모임을 보여주는 카드 컴포넌트
 * - 모임 정보 표시
 * - 예약 취소 / 리뷰 작성 버튼 제공
 */
export default function GatheringCard({ gathering, onReviewSuccess }: GatheringProps) {
	const isFull = gathering.capacity === gathering.participantCount;
	const isPast = new Date(gathering.dateTime) < new Date();

	const { openModal } = useModal();

	/**
	 * 예약 취소 버튼 클릭 핸들러
	 * TODO : 추후 LeaveGathering API 호출 예정입니다.
	 */
	const handleCancelClick = () => {
		//TODO : 후에 onSuccess leaveGathering API 호출 예정입니다.
		openModal(<CancelConfirmModal gatheringId={gathering.id} onSuccess={() => {}} />);
	};

	/**
	 * 리뷰 작성 버튼 클릭 핸들러
	 */
	const handleAddReviewClick = () => {
		openModal(<ReviewWriteModal gatheringId={gathering.id} onSuccess={onReviewSuccess} />);
	};

	return (
		<div className="relative">
			<CanceledOverlay canceledAt={gathering.canceledAt} />

			<CardLayout gathering={gathering} badgeContent={<GatheringBadge gathering={gathering} isFull={isFull} />}>
				{/* 버튼 */}
				<div>
					{!isPast && !gathering.isCompleted ? (
						<BasicButton outlined className="!w-auto px-5.5 !text-sm !font-semibold" onClick={handleCancelClick}>
							예약 취소하기
						</BasicButton>
					) : (
						<BasicButton className="!w-auto px-5.5 !text-sm !font-semibold" onClick={handleAddReviewClick}>
							리뷰 작성하기
						</BasicButton>
					)}
				</div>
			</CardLayout>
		</div>
	);
}
