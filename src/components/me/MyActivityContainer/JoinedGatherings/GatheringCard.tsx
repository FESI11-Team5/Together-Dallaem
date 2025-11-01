import { useModal } from '@/hooks/useModal';
import type { JoinedGathering } from '@/types/response/gatherings';
import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringBadge from './GatheringBadge';
import CardLayout from '../common/CardLayout/CardLayout';
import CanceledOverlay from '../common/CanceledOverlay/CanceledOverlay';
import CancelConfirmModal from '../modals/CancelConfirmModal';
import ReviewWriteModal from '../modals/ReviewWriteModal';

interface GatheringProps {
	/** 렌더링할 모임 데이터 */
	gathering: JoinedGathering;

	/** 리뷰 작성 성공 시 부모 컴포넌트에 알리기 위한 콜백
	 *  부모는 이 콜백에서 해당 모임의 상태(isReviewed)를 갱신합니다.
	 */
	onReviewSuccess: (score: number, comment: string) => void;

	/** 모임 취소(또는 탈퇴) 성공 시 부모 컴포넌트에 알리기 위한 콜백
	 *  부모는 이 콜백에서 목록에서 해당 모임을 제거합니다.
	 */
	onCancelSuccess: () => void;
}

/**
 * 참여한 모임을 카드 형태로 렌더링하는 컴포넌트.
 *
 * 동작 요약:
 * - 모임 정보(시간, 위치, 인원 등)를 `CardLayout`으로 표시합니다.
 * - 모임이 아직 진행 전이면 '예약 취소하기' 버튼을, 지난 모임 또는 완료된 모임이면
 *   '리뷰 작성하기' 버튼을 표시합니다.
 * - 각 버튼 클릭 시 모달을 열고, 모달에서 작업이 성공하면 부모 콜백을 호출하여
 *   상위 상태를 갱신합니다.
 *
 * @param {GatheringProps} props - 컴포넌트 props
 * @returns {JSX.Element} 모임 카드 엘리먼트
 *
 * @example
 * <GatheringCard
 *   gathering={g}
 *   onReviewSuccess={() => markReviewed(g.id)}
 *   onCancelSuccess={() => removeGathering(g.id)}
 * />
 */
export default function GatheringCard({ gathering, onReviewSuccess, onCancelSuccess }: GatheringProps) {
	const isFull = gathering.capacity === gathering.participantCount;
	const isPast = new Date(gathering.dateTime) < new Date();

	const { openModal } = useModal();

	/**
	 * 예약 취소 버튼 클릭 핸들러
	 * - 취소 확인 모달을 열고, 모달에서 성공 시 `onCancelSuccess`를 호출합니다.
	 * @returns {void}
	 */
	const handleCancelClick = () => {
		openModal(<CancelConfirmModal gatheringId={gathering.id} onSuccess={onCancelSuccess} />);
	};

	/**
	 * 리뷰 작성 버튼 클릭 핸들러
	 * - 리뷰 작성 모달을 열고, 완료 시 `onReviewSuccess`를 호출합니다.
	 * @returns {void}
	 */
	const handleAddReviewClick = () => {
		if (gathering.isReviewed) return;

		openModal(
			<ReviewWriteModal gatheringId={gathering.id} onSuccess={(score, comment) => onReviewSuccess(score, comment)} />
		);
	};

	return (
		<div className="relative">
			<CanceledOverlay canceledAt={gathering.canceledAt} />

			<CardLayout gathering={gathering} badgeContent={<GatheringBadge gathering={gathering} isFull={isFull} />}>
				{/* 버튼 영역 */}
				<div>
					{!isPast && !gathering.isCompleted ? (
						<BasicButton outlined onClick={handleCancelClick}>
							예약 취소하기
						</BasicButton>
					) : (
						<BasicButton
							onClick={!gathering.isReviewed ? handleAddReviewClick : undefined}
							isActive={!gathering.isReviewed}>
							{!gathering.isReviewed ? '리뷰 추가하기' : '작성 완료'}
						</BasicButton>
					)}
				</div>
			</CardLayout>
		</div>
	);
}
