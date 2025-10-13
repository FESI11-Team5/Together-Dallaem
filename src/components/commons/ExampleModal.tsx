'use client';

import BasicButton from './basic/BasicButton';
import BasicModal from './basic/BasicModal';
import { useModalClose } from '@/hooks/useModal';

export default function ExampleModal() {
	const closeModal = useModalClose();

	return (
		<BasicModal className="items-start" onClose={closeModal}>
			<div className="w-[450px]">
				<div className="mb-12 text-left text-lg font-bold">프로필 수정하기</div>
				<p className="mb-12 text-center text-gray-600">
					정말 나가시겠어요?
					<br />
					작성된 내용이 모두 삭제됩니다.
				</p>
				<div className="flex items-center justify-center gap-[8px]">
					<BasicButton isLarge onClick={closeModal} outlined>
						취소
					</BasicButton>
					<BasicButton isLarge onClick={closeModal}>
						확인
					</BasicButton>
				</div>
			</div>
		</BasicModal>
	);
}
