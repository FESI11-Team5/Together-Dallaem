'use client';

import { motion } from 'framer-motion';

import { useSliderTransitionStore } from '@/stores/sliderTransition';
import { slideFadeVariants } from '@/utils/motionVariant';

interface SliderAnimationDivProps {
	children: React.ReactNode;
	className: string;
}
export default function SliderAnimationDiv({ children, className }: SliderAnimationDivProps) {
	const { direction } = useSliderTransitionStore();

	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={slideFadeVariants}
			custom={direction}
			className={className}>
			{children}
		</motion.div>
	);
}
