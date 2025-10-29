import { useFunnelStore } from '@/stores/useFunnelStore';
import { CreateGatheringSchema, GatheringSchemaType } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import Step1Funnel from './funnel/Step1Funnel';
import Step2Funnel from './funnel/Step2Funnel';
import Step3Funnel from './funnel/Step3Funnel';
import Step4Funnel from './funnel/Step4Funnel';

import BasicModal from '../commons/basic/BasicModal';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';
import BasicPopup from '../commons/basic/BasicPopup';

export default function GatheringFunnel() {
	const { step, reset } = useFunnelStore();
	const method = useForm<GatheringSchemaType>({
		resolver: zodResolver(CreateGatheringSchema),
		mode: 'onChange'
	});
	const { openModal } = useModal();
	const closePopup = useModalClose();

	const handleCloseWithPopup = () => {
		const { title, subTitle } = POPUP_MESSAGE.CREATE;

		openModal(
			<BasicPopup
				title={title}
				subTitle={subTitle}
				onConfirm={() => {
					closePopup(); // GatheringModal 닫기
					reset(); // 폼 리셋
				}}
				cancelText="취소"
			/>,
			'create-gathering-popup'
		);
	};
	return (
		<BasicModal onClose={handleCloseWithPopup}>
			<FormProvider {...method}>
				<div className="mx-auto w-full max-w-[520px] rounded-2xl p-6">
					{step === 1 && <Step1Funnel />}
					{step === 2 && <Step2Funnel />}
					{step === 3 && <Step3Funnel />}
					{step === 4 && <Step4Funnel />}
				</div>
			</FormProvider>
		</BasicModal>
	);
}
