'use client';

import * as React from 'react';
// import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function GatheringCalendar() {
	const [date, setDate] = React.useState<Date>();
	const [hour, setHour] = React.useState<string>();
	const [minute, setMinute] = React.useState<string>();
	const [ampm, setAmpm] = React.useState<string>();

	const [isOpen, setIsOpen] = React.useState(false);

	const hours = Array.from({ length: 12 }, (_, i) => i + 1);

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

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
					{/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
					{date ? format(date, 'MM/dd/yyyy hh:mm aa') : <span>MM/DD/YYYY hh:mm aa</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-5" align="start">
				<div className="w-auto sm:flex">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						classNames={{
							day: 'text-sm hover:bg-gray-100',
							today: 'border border-orange-500 text-orange-500 rounded-md'
						}}
					/>

					<div className="flex flex-col sm:h-[300px] sm:flex-row">
						{/* Hour */}
						<ScrollArea className="w-16 border-l">
							<div className="flex p-2 sm:flex-col">
								{hours.reverse().map(hour => (
									<Button
										key={hour}
										size="icon"
										variant={date && date.getHours() % 12 === hour % 12 ? 'default' : 'ghost'}
										className="aspect-square shrink-0 sm:w-full"
										onClick={() => handleTimeChange('hour', hour.toString())}>
										{hour.toString().padStart(2, '0')}
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>

						{/* Minute */}
						<ScrollArea className="w-16 border-l sm:w-16">
							<div className="flex p-2 sm:flex-col">
								{Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
									<Button
										key={minute}
										size="icon"
										variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
										className="aspect-square shrink-0 sm:w-full"
										onClick={() => handleTimeChange('minute', minute.toString())}>
										{minute.toString().padStart(2, '0')}
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>

						{/* AM/PM */}
						<ScrollArea className="w-16 border-l sm:w-16">
							<div className="flex p-2 sm:flex-col">
								{['AM', 'PM'].map(ampm => (
									<Button
										key={ampm}
										size="icon"
										variant={
											date && ((ampm === 'AM' && date.getHours() < 12) || (ampm === 'PM' && date.getHours() >= 12))
												? 'default'
												: 'ghost'
										}
										className="aspect-square shrink-0 sm:w-full"
										onClick={() => handleTimeChange('ampm', ampm)}>
										{ampm}
									</Button>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
