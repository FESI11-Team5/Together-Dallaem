import { Direction } from '@/stores/sliderTransition';

/** 슬라이더 애니메이션 변수 */
export const slideFadeVariants = {
	initial: (direction: Direction) => ({
		opacity: 0,
		x: direction === 'forward' ? 50 : -50
	}),
	animate: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.4 }
	},
	exit: (direction: Direction) => ({
		opacity: 0,
		x: direction === 'forward' ? -50 : 50,
		transition: { duration: 0.3 }
	})
};
