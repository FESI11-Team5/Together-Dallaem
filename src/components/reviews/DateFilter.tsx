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
			<PopoverContent
				className="bg-root mr-4 flex min-w-[300px] flex-col items-center justify-center rounded-[12px] border-2 border-gray-200"
				align="start"
				isModal={false}>
				<div className="flex w-auto flex-col">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						classNames={{
							day: 'text-primary-50 hover:bg-primary-500/10 transition-colors',
							today: 'font-bold text-primary-500',
							selected: 'bg-primary-500 text-primary-50 rounded-md',
							outside: 'text-primary-700 opacity-80',
							weekday: 'font-bold text-sm text-primary-50 flex-1 justify-between',
							month_caption: 'relative flex items-center justify-center mb-2 pointer-events-none',
							caption_label: 'text-sm font-bold text-primary-500 pointer-events-auto',
							nav: 'absolute left-0 top-0 w-full flex justify-between items-center gap-1 z-10 pointer-events-auto',
							button_next: 'text-primary-500 hover:text-primary-400 transition-colors rounded-full p-1',
							button_previous: 'text-primary-500 hover:text-primary-400 transition-colors rounded-full p-1'
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
