/**
 * ChipState 컴포넌트의 Props 인터페이스
 */
interface ChipStateProps {
	/**
	 * 상태 타입
	 * - scheduled: 이용 예정
	 * - done: 이용 완료
	 * - waiting: 개설 대기
	 * - confirmed: 개설 확정
	 */
	state: 'scheduled' | 'done' | 'waiting' | 'confirmed';
}

/**
 * 모임의 상태를 표시하는 칩 컴포넌트
 *
 * @description
 * - 4가지 상태를 시각적으로 구분하여 표시
 * - 각 상태에 맞는 배경색과 텍스트 색상 자동 적용
 * - 개설 확정 상태에는 체크 아이콘 표시
 *
 * @example
 * ```tsx
 * <ChipState state="confirmed" />
 * <ChipState state="scheduled" />
 * ```
 */
export default function ChipState({ state = 'waiting' }: ChipStateProps) {
	const stateText = {
		scheduled: '이용 예정',
		done: '이용 완료',
		waiting: '개설 대기',
		confirmed: '개설 확정'
	};

	const stateClasses = {
		scheduled: 'bg-primary-100 text-primary-600',
		done: 'bg-gray-200 text-gray-500',
		waiting: 'bg-bg border-1 border-gray-200 text-gray-500',
		confirmed: 'bg-bg border-1 border-primary-100 text-primary-500'
	};

	return (
		<div
			className={`flex items-center justify-center gap-[4px] rounded-[24px] px-[12px] py-[6px] ${stateClasses[state]}`}>
			{state == 'confirmed' && <img src="/icons/check.svg" alt="check" className="h-[16px] w-[16px]" />}
			<span className={`text-sm font-medium`}>{stateText[state]}</span>
		</div>
	);
}
