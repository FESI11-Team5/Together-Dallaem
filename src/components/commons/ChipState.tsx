interface ChipStateProps {
	state: 'scheduled' | 'done' | 'waiting' | 'confirmed';
}

export default function ChipState({ state = 'waiting' }: ChipStateProps) {
	const stateText = {
		scheduled: '이용 예정',
		done: '이용 완료',
		waiting: '개설 대기',
		confirmed: '개설 확정'
	};

	const stateClasses = {
		scheduled: 'bg-orange-100 text-orange-600',
		done: 'bg-gray-200 text-gray-500',
		waiting: 'bg-white border-1 border-gray-200 text-gray-500',
		confirmed: 'bg-white border-1 border-orange-100 text-orange-500'
	};

	return (
		<div
			className={`flex items-center justify-center gap-[4px] rounded-[24px] px-[12px] py-[6px] ${stateClasses[state]}`}>
			{state == 'confirmed' && <img src="/icons/check.svg" alt="check" className="h-[16px] w-[16px]" />}
			<span className={`text-sm font-medium`}>{stateText[state]}</span>
		</div>
	);
}
