'use client';

import * as React from 'react';

import DateTimePicker from '../calendar/DateTimePicker';
import SearchInCalendarButton from '../calendar/SearchInCalendarButton';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { format } from 'date-fns';

interface GatheringCalendarProps {
	pageType?: 'search' | 'create';
}

interface TimeSelection {
	hour?: string;
	minute?: string;
	ampm?: string;
}

export default function BasicCalendar({ pageType }: GatheringCalendarProps) {
	const [date, setDate] = React.useState<Date>();
	const [timeSelection, setTimeSelection] = React.useState<TimeSelection>({
		hour: undefined,
		minute: undefined,
		ampm: undefined
	});

	const [isOpen, setIsOpen] = React.useState(false);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
					{date
						? pageType === 'create'
							? format(date, 'MM/dd/yyyy hh:mm aa')
							: format(date, 'MM/dd/yyyy')
						: pageType === 'create'
							? 'MM/DD/YYYY hh:mm aa'
							: '날짜 선택'}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-auto" align="start">
				<div className={`${pageType === 'create' ? 'mb:flex w-auto' : 'flex flex-col'}`}>
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						classNames={{
							day: 'text-sm hover:bg-gray-100',
							today: 'text-orange-500 rounded-md',
							weekday: 'font-bold text-black flex-1'
						}}
					/>

					{pageType === 'create' && (
						<DateTimePicker
							date={date}
							setDate={setDate}
							setIsOpen={setIsOpen}
							timeSelection={timeSelection}
							setTimeSelection={setTimeSelection}
						/>
					)}

					{pageType === 'search' && <SearchInCalendarButton date={date} setDate={setDate} setIsOpen={setIsOpen} />}
				</div>
			</PopoverContent>
		</Popover>
	);
}
