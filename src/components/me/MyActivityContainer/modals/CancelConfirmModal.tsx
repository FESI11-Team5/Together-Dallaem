import { leaveGathering } from '@/apis/gatherings/leave';
import { useModal, useModalClose } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicPopup from '@/components/commons/basic/BasicPopup';

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
	const { openModal } = useModal();

	/**
	 * 에러 객체에서 사용자용 메시지를 추출합니다.
	 * 실제 프로젝트에서는 공통 유틸로 분리하여 HTTP 상태 코드나 API 메시지에
	 * 따라 더 상세한 매핑을 하는 것이 좋습니다.
	 */
	const getErrorMessage = (err: unknown) => {
		if (!err) return '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
		if (typeof err === 'string') return err;
		if (err instanceof Error)
			return err.message || '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
		return '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
	};

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
			// 개발에서는 콘솔에 남기고, 사용자에게는 팝업으로 안내합니다.
			if (process.env.NODE_ENV !== 'production') console.error(err);

			const message = getErrorMessage(err);

			openModal(<BasicPopup title="" subTitle={message} confirmText="확인" />);
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
