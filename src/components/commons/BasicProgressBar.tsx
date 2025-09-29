interface ProgressBarProps {
	data: {
		totalNumber: number;
		currentNumber: number;
	};
}

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
