'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { useFunnelStore } from '@/stores/useFunnelStore';
import {
	CreateGatheringSchema,
	GatheringSchemaType,
	Step1Schema,
	Step2Schema,
	Step3Schema,
	Step4Schema
} from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';

import Step1Funnel from './funnel/Step1Funnel';
import Step2Funnel from './funnel/Step2Funnel';
import Step3Funnel from './funnel/Step3Funnel';
import Step4Funnel from './funnel/Step4Funnel';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicPopup from '@/components/commons/basic/BasicPopup';

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
		<BasicModal onClose={handleCloseWithPopup} width="600px">
			<FormProvider {...method}>
				<h2 className="text-primary-500 text-xl [text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]">
					크루 생성
				</h2>

				<div className="max-mb:h-auto mx-auto h-[450px] w-full rounded-3xl">
					{step === 1 && <Step1Funnel />}
					{step === 2 && <Step2Funnel />}
					{step === 3 && <Step3Funnel />}
					{step === 4 && <Step4Funnel />}
				</div>
			</FormProvider>
		</BasicModal>
	);
}
