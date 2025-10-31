import { useSliderTransitionStore } from '@/stores/sliderTransition';
import { useEffect, useRef } from 'react';

/**
 * 퍼널 단계 변경에 따른 슬라이더 방향 설정 훅
 * @param currentStep
 * @returns
 * @example
 * useFunnelDirection(currentStep);
 *
 */
export function useFunnelDirection(currentStep: string) {
	const { setDirection } = useSliderTransitionStore();
	const prevStep = useRef(currentStep);

	useEffect(() => {
		const handlePopState = () => {
			setDirection('backward');
		};

		window.addEventListener('popstate', handlePopState);

		if (prevStep.current !== currentStep) {
			setDirection('forward');
			prevStep.current = currentStep;
		}

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [currentStep, setDirection]);
}
