import { useState, useEffect } from 'react';

export function useScreenSize() {
	const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

	useEffect(() => {
		function updateSize() {
			const width = window.innerWidth;
			if (width >= 1200) setScreenSize('desktop');
			else if (width >= 744) setScreenSize('tablet');
			else setScreenSize('mobile');
		}

		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return screenSize;
}
