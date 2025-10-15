import { useModalClose } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';
import { leaveGathering } from '@/apis/gatherings/[id]/leave';

interface CancelConfirmModalProps {
	gatheringId: number;
	onSuccess: () => void;
}
export default function CancelConfirmModal({ gatheringId, onSuccess }: CancelConfirmModalProps) {
	const closeModal = useModalClose();

	const handleCancel = async () => {
		try {
			await leaveGathering(gatheringId);

			onSuccess();
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[402px]">
			<div className="mt-12">
				<div className="flex flex-col items-center gap-6">
					<p className="font-medium">정말 예약을 취소하시겠습니까?</p>
					<div className="flex gap-2 font-semibold">
						<BasicButton outlined onClick={closeModal} type="button">
							닫기
						</BasicButton>
						<BasicButton type="submit" onClick={handleCancel}>
							취소하기
						</BasicButton>
					</div>
				</div>
			</div>
		</BasicModal>
	);
}
