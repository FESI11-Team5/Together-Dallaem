'use client';

import * as React from 'react';

import DateTimePicker from '../calendar/DateTimePicker';
import SearchInCalendarButton from '../calendar/SearchInCalendarButton';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { format } from 'date-fns';

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
export default function BasicCalendar({ pageType, onChange }: GatheringCalendarProps) {
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
			onChange?.(selectedDate);
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
							onChange={onChange}
						/>
					)}

					{pageType === 'search' && <SearchInCalendarButton date={date} setDate={setDate} setIsOpen={setIsOpen} />}
				</div>
			</PopoverContent>
		</Popover>
	);
}
