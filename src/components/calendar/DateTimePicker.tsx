'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface TimeSelection {
	hour?: string;
	minute?: string;
	ampm?: string;
}

interface DateTimePickerProps {
	date: Date | undefined;
	setDate: (date: Date) => void;
	setIsOpen: (open: boolean) => void;
	timeSelection: TimeSelection;
	setTimeSelection: React.Dispatch<React.SetStateAction<TimeSelection>>;
}

export default function DateTimePicker({
	date,
	setDate,
	setIsOpen,
	timeSelection,
	setTimeSelection
}: DateTimePickerProps) {
	const hours = Array.from({ length: 12 }, (_, i) => i + 1);
	const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
	const ampmOptions = ['AM', 'PM'];

	const handleApply = () => {
		if (!date || !timeSelection.hour || !timeSelection.minute || !timeSelection.ampm) return;

		const newDate = new Date(date);
		let adjustedHour = parseInt(timeSelection.hour) % 12;
		if (timeSelection.ampm === 'PM') adjustedHour += 12;

		newDate.setHours(adjustedHour);
		newDate.setMinutes(parseInt(timeSelection.minute));

		setDate(newDate);
		setIsOpen(false);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="mb:h-[230px] mb:flex-row mb:divide-x mb:w-full flex flex-col">
				{/* Hour */}
				<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
					<div className="mb:flex-col mb:w-auto flex p-2">
						{hours.reverse().map(h => (
							<Button
								key={h}
								size="default"
								variant={timeSelection.hour === String(h) ? 'default' : 'ghost'}
								className="mb:w-full aspect-square shrink-0"
								onClick={() => setTimeSelection(prev => ({ ...prev, hour: String(h) }))}>
								{h.toString().padStart(2, '0')}
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" className="mb:hidden" />
				</ScrollArea>

				{/* Minute */}
				<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
					<div className="mb:flex-col flex p-2">
						{minutes.map(m => (
							<Button
								key={m}
								size="default"
								variant={timeSelection.minute === String(m) ? 'default' : 'ghost'}
								className="mb:w-full aspect-square shrink-0"
								onClick={() => setTimeSelection(prev => ({ ...prev, minute: String(m) }))}>
								{m.toString().padStart(2, '0')}
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" className="mb:hidden" />
				</ScrollArea>

				{/* AM/PM */}
				<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
					<div className="mb:flex-col flex p-2">
						{ampmOptions.map(ap => (
							<Button
								key={ap}
								size="default"
								variant={timeSelection.ampm === ap ? 'default' : 'ghost'}
								className="mb:w-full aspect-square shrink-0"
								onClick={() => setTimeSelection(prev => ({ ...prev, ampm: ap }))}>
								{ap}
							</Button>
						))}
					</div>
				</ScrollArea>
			</div>

			{/* 적용 버튼 */}
			<div className="flex w-full">
				<button
					className={`flex-1 rounded-lg p-2 ${
						date && timeSelection.hour && timeSelection.minute && timeSelection.ampm
							? 'bg-orange-600 text-white'
							: 'cursor-not-allowed bg-gray-300 text-gray-500'
					}`}
					onClick={handleApply}
					disabled={!date || !timeSelection.hour || !timeSelection.minute || !timeSelection.ampm}>
					적용
				</button>
			</div>
		</div>
	);
}
