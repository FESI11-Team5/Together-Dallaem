import { JoinedGathering } from '@/types/response/gatherings';
import CardLayout from '../common/CardLayout';
import { useModal } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import ReviewWriteModal from '../modals/ReviewWriteModal';

interface GatheringProps {
	gathering: JoinedGathering;
	onSuccess: () => void;
}

export default function MyReviewCard({ gathering, onSuccess }: GatheringProps) {
	const { openModal } = useModal();

	const handleClick = () => {
		openModal(<ReviewWriteModal gatheringId={gathering.id} onSuccess={onSuccess} />);
	};
	return (
		<CardLayout gathering={gathering}>
			<BasicButton className="!w-fit px-5.5 !text-sm" onClick={handleClick}>
				리뷰 작성하기
			</BasicButton>
		</CardLayout>
	);
}
