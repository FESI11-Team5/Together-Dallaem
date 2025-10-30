import { leaveGathering } from '@/apis/gatherings/[id]';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useModalClose } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';

interface CancelConfirmModalProps {
	/** 예약 취소할 모임 ID */
	gatheringId: number;
	/** 예약 취소 성공 시 호출되는 콜백 */
	onSuccess: () => void;
}

/**
 * 모임 예약 취소 확인 모달 컴포넌트
 * - "정말 예약을 취소하시겠습니까?" 문구와 버튼 제공
 * - 취소 버튼 클릭 시 API 호출 후 onSuccess 콜백 실행
 */
export default function CancelConfirmModal({ gatheringId, onSuccess }: CancelConfirmModalProps) {
	const closeModal = useModalClose();
	const { handleError } = useErrorHandler();

	/**
	 * 예약 취소 버튼 클릭 핸들러
	 * - leaveGathering API 호출
	 * - 성공 시 onSuccess 콜백 실행 후 모달 닫기
	 */
	const handleCancel = async () => {
		try {
			await leaveGathering(gatheringId);
			onSuccess();
			closeModal();
		} catch (err) {
			handleError(err);
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[402px]">
			<div className="mt-12">
				<form onSubmit={handleCancel} className="flex flex-col items-center gap-6">
					<p className="font-medium text-white">정말 예약을 취소하시겠습니까?</p>
					<div className="flex gap-2 font-semibold">
						<BasicButton outlined onClick={closeModal} type="button">
							닫기
						</BasicButton>
						<BasicButton type="submit">취소하기</BasicButton>
					</div>
				</form>
			</div>
		</BasicModal>
	);
}
