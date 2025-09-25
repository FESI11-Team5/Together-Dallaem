'use client';

interface CalendarButtonProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	setIsOpen: (open: boolean) => void;
}

export default function SearchInCalendarButton({ date, setDate, setIsOpen }: CalendarButtonProps) {
	const handleApply = () => {
		if (!date) return;
		setDate(date);
		setIsOpen(false);
	};

	return (
		<div className="mt-2 flex gap-2">
			<button
				className={`flex-1 rounded-lg p-2 ${date ? 'cursor-pointer border border-orange-400 text-orange-400' : 'cursor-not-allowed border border-gray-300 text-gray-300'} `}
				onClick={() => setDate(undefined)}
				disabled={!date}>
				초기화
			</button>
			<button
				className={`flex-1 rounded-lg p-2 ${date ? 'cursor-pointer bg-orange-600 text-white' : 'cursor-not-allowed bg-gray-400 text-white'} `}
				onClick={handleApply}
				disabled={!date}>
				적용
			</button>
		</div>
	);
}
