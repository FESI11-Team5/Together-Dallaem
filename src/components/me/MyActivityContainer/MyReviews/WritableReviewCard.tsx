import { JoinedGathering } from '@/types/response/gatherings';
import CardLayout from '../common/CardLayout';
import { useModal } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import ReviewWriteModal from '../modals/ReviewWriteModal';

interface GatheringProps {
	/** 리뷰 작성이 가능한 모임 객체 */
	gathering: JoinedGathering;

	/** 리뷰 작성 성공 시 호출되는 콜백 함수 */
	onSuccess: () => void;
}

/**
 * 작성 가능한 리뷰 카드 컴포넌트
 * - 참여한 모임 정보를 표시
 * - "리뷰 작성하기" 버튼 클릭 시 모달 오픈
 */
export default function WritableReviewCard({ gathering, onSuccess }: GatheringProps) {
	const { openModal } = useModal();

	/**
	 * 리뷰 작성 버튼 클릭 시 모달을 열고
	 * 작성 완료 시 onSuccess 호출
	 */
	const handleClick = () => {
		openModal(<ReviewWriteModal gatheringId={gathering.id} onSuccess={onSuccess} />);
	};

	return (
		<CardLayout gathering={gathering}>
			<BasicButton
				className="!w-fit px-[22px] transition-colors hover:bg-primary-700 active:bg-primary-800"
				onClick={handleClick}>
				리뷰 작성하기
			</BasicButton>
		</CardLayout>
	);
}
