import { formatTime } from '@/utils/date';
import { differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * 주어진 만료 시간(`exp`, UNIX timestamp 기준)까지 남은 시간을 초 단위로 계산하고,
 * 매초마다 자동으로 갱신합니다.
 * - `exp`가 `null`이면 타이머를 비활성화하고 `formattedTime`은 `null`을 반환합니다.
 * - 만료 시(`diff <= 0`)에는 시간을 0으로 고정하고 interval을 자동으로 정리합니다.
 *
 * @param {number | null} exp - 만료 시각 (UNIX timestamp, 초 단위). `null`이면 타이머 비활성화
 * @returns {{ formattedTime: string | null }} - 남은 시간을 `"MM:SS"` 형식으로 포맷한 문자열 (또는 `null`)
 */
export function useTimer(exp: number | null) {
	const [remainingSec, setRemainingSec] = useState<number | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!exp) {
			setRemainingSec(null);
			return;
		}

		const updateRemaining = () => {
			const diff = differenceInSeconds(new Date(exp * 1000), new Date());
			if (diff <= 0) {
				setRemainingSec(0);
				if (intervalRef.current) clearInterval(intervalRef.current);
			} else {
				setRemainingSec(diff);
			}
		};

		updateRemaining();
		intervalRef.current = setInterval(updateRemaining, 1000);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [exp]);

	const formattedTime = useMemo(() => formatTime(remainingSec), [remainingSec]);

	return { formattedTime };
}
