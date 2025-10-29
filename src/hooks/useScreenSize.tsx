import { useEffect, useState } from 'react';

/**
 * 현재 화면 크기를 기준으로 'mobile', 'tablet', 'desktop' 중 하나를 반환하는 커스텀 훅
 *
 * 화면 크기에 따라 자동으로 값이 업데이트됩니다.
 *
 * @returns {'mobile' | 'tablet' | 'desktop'} 현재 화면 크기
 *
 * @example
 * const screenSize = useScreenSize();
 * if (screenSize === 'desktop') {
 *   console.log('데스크탑 레이아웃 사용');
 * }
 */
export function useScreenSize() {
	const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

	useEffect(() => {
		const updateSize = () => {
			const width = window.innerWidth;
			if (width >= 744) setScreenSize('desktop');
			else if (width >= 450) setScreenSize('tablet');
			else setScreenSize('mobile');
		};

		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return screenSize;
}

