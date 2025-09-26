'use client';

import BasicButton from './BasicButton';
import BasicModal from './BasicModal';
import { useModalClose } from '@/hooks/useModal';

export default function ExampleModal() {
	const closeModal = useModalClose();

	return (
		<BasicModal onClose={closeModal}>
			<div className="w-[450px] space-y-4">
				<p className="text-center text-gray-600">
					정말 나가시겠어요?
					<br />
					작성된 내용이 모두 삭제됩니다.
				</p>
				<div className="flex items-center justify-center gap-[8px]">
					<BasicButton onClick={closeModal} outlined>
						취소
					</BasicButton>
					<BasicButton onClick={closeModal}>확인</BasicButton>
				</div>
			</div>
		</BasicModal>
	);
}
