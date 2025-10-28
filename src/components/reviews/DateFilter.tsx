import { format } from 'date-fns';
import { useState } from 'react';
import SearchInCalendarButton from '../calendar/SearchInCalendarButton';
import BasicSelectButton from '../commons/basic/BasicSelectButton';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function DateFilter({ onChange }: { onChange: (date?: Date) => void }) {
	const [date, setDate] = useState<Date>();
	const [isOpen, setIsOpen] = useState(false);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild onClick={() => setIsOpen(true)}>
				<BasicSelectButton placeholder="날짜 선택" isOpen={isOpen} />
			</PopoverTrigger>
			<PopoverContent className="w-auto" align="start" isModal={false}>
				<div className="flex w-auto flex-col">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						classNames={{
							day: 'text-sm hover:bg-gray-100',
							today: 'text-primary-500 rounded-md',
							weekday: 'font-bold text-black flex-1'
						}}
					/>
					<SearchInCalendarButton
						date={date}
						setDate={res => {
							console.log(res);
							onChange?.(res);
						}}
						setIsOpen={setIsOpen}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}
