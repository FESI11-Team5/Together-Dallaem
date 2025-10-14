import Image from 'next/image';
import { JoinedGathering } from '@/types/response/gatherings';
import CardLayout from '../common/CardLayout';
import CanceledOverlay from '../common/CanceledOverlay';
import BasicButton from '@/components/commons/basic/BasicButton';
import { useModal } from '@/hooks/useModal';
import CancelConfirmModal from '../modals/CancelConfirmModal';
import ReviewWriteModal from '../modals/ReviewWriteModal';

interface GatheringProps {
	gathering: JoinedGathering;
	onReviewSuccess: () => void;
}

export default function GatheringCard({ gathering, onReviewSuccess }: GatheringProps) {
	const isFull = gathering.capacity === gathering.participantCount;
	const isPast = new Date(gathering.dateTime) < new Date();

	const { openModal } = useModal();

	const handleCancelClick = () => {
		openModal(<CancelConfirmModal />);
	};

	const handleAddReviewClick = () => {
		openModal(<ReviewWriteModal gatheringId={gathering.id} onSuccess={onReviewSuccess} />);
	};

	return (
		<div className="relative">
			<CanceledOverlay canceledAt={gathering.canceledAt} />

			<CardLayout
				gathering={gathering}
				badgeContent={<GatheringBadgeContent gathering={gathering} isPast={isPast} isFull={isFull} />}>
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

function GatheringBadgeContent({
	gathering,
	isFull
}: {
	gathering: JoinedGathering;
	isPast: boolean;
	isFull: boolean;
}) {
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
