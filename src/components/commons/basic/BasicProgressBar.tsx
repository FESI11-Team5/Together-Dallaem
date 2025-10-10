/**
 * BasicProgressBar 컴포넌트의 Props 인터페이스
 */
interface ProgressBarProps {
	/** 진행 상태 데이터 */
	data: {
		/** 전체 개수 */
		totalNumber: number;
		/** 현재 진행된 개수 */
		currentNumber: number;
	};
}

/**
 * 진행 상태를 시각적으로 표시하는 프로그레스 바 컴포넌트
 *
 * @description
 * - 전체 개수 대비 현재 진행 상태를 퍼센트로 계산하여 표시
 * - 100% 완료 시 색상이 변경됨 (orange-600 → orange-400)
 *
 * @example
 * ```tsx
 * <BasicProgressBar
 *   data={{
 *     totalNumber: 10,
 *     currentNumber: 7
 *   }}
 * />
 * ```
 */
export default function BasicProgressBar({ data }: ProgressBarProps) {
	const progressPercentage = (data.currentNumber / data.totalNumber) * 100;
	const isFull = progressPercentage === 100;

	return (
		<div className="relative h-[4px] w-full">
			<span className="absolute top-0 left-0 h-[4px] w-full rounded-[6px] bg-orange-50"></span>
			<span
				className={`absolute top-0 left-0 h-[4px] rounded-[6px] ${isFull ? 'bg-orange-400' : 'bg-orange-600'}`}
				style={{ width: `${progressPercentage}%` }}></span>
		</div>
	);
}
