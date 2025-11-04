'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Image from 'next/image';
import DateTimePicker from '../calendar/DateTimePicker';
import SearchInCalendarButton from '../calendar/SearchInCalendarButton';

/**
 * BasicCalendar 컴포넌트
 * - pageType에 따라 날짜 또는 날짜와 시간 선택 가능
 * - 선택된 날짜는 부모 컴포넌트로 전달
 * - 반응형 디자인 적용
 * @props pageType?: 'search' | 'create' - 페이지 타입 (검색: 'search', 생성: 'create')
 * @props onChange?: (date: Date) => void - 날짜 변경 시 호출되는 콜백 함수
 * @returns
 *
 */

interface GatheringCalendarProps {
	pageType?: 'search' | 'create';
	value?: Date;
	onChange?: (date: Date) => void;
}

/**
 * 시간 선택을 위한 상태 인터페이스
 * - hour: 선택된 시간 (1-12)
 * - minute: 선택된 분 (0, 5, 10, ..., 55)
 * - ampm: 선택된 오전/오후 (AM/PM)
 * @interface TimeSelection
 * @description 시간 선택을 위한 상태 인터페이스
 *
 */

interface TimeSelection {
	hour?: string;
	minute?: string;
	ampm?: string;
}

/**
 * BasicCalendar 컴포넌트
 * - pageType에 따라 날짜 또는 날짜와 시간 선택 가능
 * - pageType에 따른 UI 렌더링 변경
 * - onChange 콜백을 통하여 선택한 날짜와 시간 AMPM 전달
 * - 선택된 날짜는 부모 컴포넌트로 전달
 * - 반응형 디자인 적용
 *
 */
export default function GatheringCalendar({ value, pageType, onChange }: GatheringCalendarProps) {
	const [date, setDate] = useState<Date>();
	const [timeSelection, setTimeSelection] = useState<TimeSelection>({
		hour: undefined,
		minute: undefined,
		ampm: undefined
	});

	const [isOpen, setIsOpen] = useState(false);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (!selectedDate) return;

		// 기존 시간 유지
		if (timeSelection.hour && timeSelection.minute && timeSelection.ampm) {
			let adjustedHour = parseInt(timeSelection.hour) % 12;
			if (timeSelection.ampm === 'PM') adjustedHour += 12;

			selectedDate.setHours(adjustedHour);
			selectedDate.setMinutes(parseInt(timeSelection.minute));
		}

		setDate(selectedDate);
		onChange?.(selectedDate);
	};

	useEffect(() => {
		if (!value) return;
		setDate(value);

		// 시간 선택 복원
		const hour = value.getHours();
		setTimeSelection({
			hour: String(hour % 12 || 12),
			minute: String(value.getMinutes()).padStart(2, '0'),
			ampm: hour >= 12 ? 'PM' : 'AM'
		});
	}, [value]);
	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'bg-root border-primary-500 h-10 w-full justify-between rounded-md border-2 text-left font-normal',

						!date && 'text-white'
					)}>
					{date
						? pageType === 'create'
							? format(date, 'yyyy-MM-dd HH:mm a')
							: format(date, 'yyyy-MM-dd')
						: pageType === 'create'
							? 'yyyy-MM-dd HH:mm a'
							: '날짜 선택'}
					{pageType === 'create' && (
						<Image src="/icons/calendar.svg" alt="calendar" width={20} height={20} className="invert" />
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="bg-root w-auto border-2 border-white" align="start">
				<div className={`${pageType === 'create' ? 'mb:flex w-auto' : 'flex flex-col'}`}>
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						classNames={{
							day: 'text-white data-[today=true]:text-primary-500 text-sm hover:bg-primary-400 rounded-md transition-colors duration-200',
							outside: 'text-white/50',
							today: 'font-bold text-primary-500',
							caption_label: 'text-primary-500',
							button_next:
								'text-primary-500 hover:cursor-pointer transition-colors  hover:bg-primary-500 hover:text-root rounded-sm p-2',
							button_previous:
								'text-primary-500 hover:cursor-pointer transition-colors   hover:bg-primary-500 hover:text-root rounded-sm p-2',
							weekday: 'text-white flex-1 font-medium text-sm'
						}}
					/>

					{pageType === 'create' && (
						<DateTimePicker
							date={date}
							setDate={(newDate: Date) => onChange?.(newDate)}
							setIsOpen={setIsOpen}
							timeSelection={timeSelection}
							setTimeSelection={setTimeSelection}
							onChange={onChange}
						/>
					)}

					{pageType === 'search' && <SearchInCalendarButton date={date} setDate={setDate} setIsOpen={setIsOpen} />}
				</div>
			</PopoverContent>
		</Popover>
	);
}
