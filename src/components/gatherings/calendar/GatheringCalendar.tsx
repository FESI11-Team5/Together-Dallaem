'use client';

import * as React from 'react';
// import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { enUS } from 'date-fns/locale';

interface GatheringCalendarProps {
	pageType?: 'search' | 'create';
}

export default function GatheringCalendar({ pageType }: GatheringCalendarProps) {
	const [date, setDate] = React.useState<Date>();
	const [hour, setHour] = React.useState<string>();
	const [minute, setMinute] = React.useState<string>();
	const [ampm, setAmpm] = React.useState<string>();

	const [isOpen, setIsOpen] = React.useState(false);

	const hours = Array.from({ length: 12 }, (_, i) => i + 1);
	const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
	const ampmOptions = ['AM', 'PM'];

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
	};

	const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', value: string) => {
		if (date) {
			const newDate = new Date(date);
			if (type === 'hour') {
				newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
				setHour(value);
			} else if (type === 'minute') {
				newDate.setMinutes(parseInt(value));
				setMinute(value);
			} else if (type === 'ampm') {
				const currentHours = newDate.getHours();
				newDate.setHours(value === 'PM' ? currentHours + 12 : currentHours - 12);
				setAmpm(value);
			}
			setDate(newDate);
		}
	};

	const handleApply = () => {
		if (!date) return;
		const adjustedDate = new Date(date);
		if (hour) {
			adjustedDate.setHours(parseInt(hour) % 12);
		}
		if (minute) {
			adjustedDate.setMinutes(parseInt(minute));
		}
		setDate(adjustedDate);
		setIsOpen(false);
		console.log(adjustedDate);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
					{/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
					{pageType === 'create' && date
						? format(date, 'MM/dd/yyyy hh:mm aa')
						: pageType === 'search' && date
							? format(date, 'MM/dd/yyyy')
							: pageType === 'create'
								? 'MM/DD/YYYY hh:mm aa'
								: '날짜 선택'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-5" align="start">
				<div className={`${pageType === 'create' ? 'mb:flex w-auto' : 'flex flex-col'}`}>
					<Calendar
						mode="single"
						selected={date}
						locale={enUS}
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
						<div className="mb:h-[300px] mb:flex-row mb:divide-x mb:w-full flex flex-col">
							{/* Hour */}
							<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
								<div className="mb:flex-col mb:w-auto flex p-2">
									{hours.reverse().map(hour => (
										<Button
											key={hour}
											size="icon"
											variant={date && date.getHours() % 12 === hour % 12 ? 'default' : 'ghost'}
											className="mb:w-full aspect-square shrink-0"
											onClick={() => handleTimeChange('hour', hour.toString())}>
											{hour.toString().padStart(2, '0')}
										</Button>
									))}
								</div>
								<ScrollBar orientation="horizontal" className="mb:hidden" />
							</ScrollArea>

							{/* Minute */}
							<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
								<div className="mb:flex-col flex p-2">
									{minutes.map(minute => (
										<Button
											key={minute}
											size="icon"
											variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
											className="mb:w-full aspect-square shrink-0"
											onClick={() => handleTimeChange('minute', minute.toString())}>
											{minute.toString().padStart(2, '0')}
										</Button>
									))}
								</div>
								<ScrollBar orientation="horizontal" className="mb:hidden" />
							</ScrollArea>

							{/* AM/PM */}
							<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
								<div className="mb:flex-col flex p-2">
									{ampmOptions.map(ampm => (
										<Button
											key={ampm}
											size="icon"
											variant={
												date && ((ampm === 'AM' && date.getHours() < 12) || (ampm === 'PM' && date.getHours() >= 12))
													? 'default'
													: 'ghost'
											}
											className="mb:w-full aspect-square shrink-0"
											onClick={() => handleTimeChange('ampm', ampm)}>
											{ampm}
										</Button>
									))}
								</div>
							</ScrollArea>
						</div>
					)}

					{pageType === 'search' && (
						<div className="flex gap-2">
							<button
								className={`flex-1 rounded-lg p-2 ${date ? 'cursor-pointer text-orange-400 outline outline-orange-400' : 'cursor-not-allowed text-gray-300 outline outline-gray-300'} `}
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
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
