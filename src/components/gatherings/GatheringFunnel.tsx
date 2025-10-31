'use client';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';

import { Step, useFunnelStore } from '@/stores/useFunnelStore';
import { CreateGatheringSchema, GatheringSchemaType } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';

import Step1Funnel from './funnel/Step1Funnel';
import Step2Funnel from './funnel/Step2Funnel';
import Step3Funnel from './funnel/Step3Funnel';
import Step4Funnel from './funnel/Step4Funnel';
import SliderAnimationDiv from './sliderAnimation/SliderAnimationDiv';

import BasicModal from '@/components/commons/basic/BasicModal';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

function StepIndicator({ step }: { step: Step }) {
	const prevStepRef = useRef(step);

	useEffect(() => {
		prevStepRef.current = step;
	}, [step]);

	return (
		<div className="text-primary-500 relative flex h-6 w-fit items-center justify-center overflow-hidden text-sm">
			{/* step만 애니메이션 적용 */}
			<div className="relative h-6 w-4 overflow-hidden">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={step}
						initial={{ y: step > prevStepRef.current ? 20 : -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: step > prevStepRef.current ? -20 : 20, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute right-0 left-0 text-center">
						{step}
					</motion.span>
				</AnimatePresence>
			</div>
			<div className="flex gap-1 pb-[4.5px]">
				<span>/</span>
				<span>4</span>
			</div>
		</div>
	);
}

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
		<BasicModal onClose={handleCloseWithPopup} width="600px" className="">
			<FormProvider {...method}>
				<div className="flex gap-3">
					<h2 className="text-primary-500 text-xl font-bold [text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]">
						크루 생성
					</h2>

					<div className="flex flex-1 flex-col">
						<StepIndicator step={step} />

						{/* 프로그레스바 */}
						<div className="relative h-2 w-full rounded-full bg-gray-200">
							<div
								className="from-primary-300 via-primary-300 to-highlight absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r transition-all duration-500"
								style={{ width: `${(step / 4) * 100}%` }}
							/>
						</div>
					</div>
				</div>

				<SliderAnimationDiv className="max-mb:h-auto mx-auto h-[450px] w-full rounded-3xl">
					{step === 1 && <Step1Funnel />}
					{step === 2 && <Step2Funnel />}
					{step === 3 && <Step3Funnel />}
					{step === 4 && <Step4Funnel />}
				</SliderAnimationDiv>
			</FormProvider>
		</BasicModal>
	);
}
