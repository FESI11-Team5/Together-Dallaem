'use client';

import BasicSelectButton from '@/components/commons/basic/BasicSelectButton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import SearchCalendarButton from './SearchCalendarButton';

interface SearchCalendarProps {
	/** 선택된 날짜 (없을 수 있음) */
	date?: Date;
	/** 날짜 상태를 갱신하는 함수 */
	setDate: Dispatch<SetStateAction<Date | undefined>>;
}

// TODO: UI 디자인 시안대로 수정
// TODO: 적용누르면 그때 onChange 실행되는 걸로 수정
/**
 * 날짜를 선택할 수 있는 캘린더 선택 컴포넌트
 * 버튼 클릭 시 달력이 팝오버 형태로 열리며, 날짜 선택 시 상위 컴포넌트의 상태가 업데이트됩니다.
 *
 * @param {SearchCalendarProps} props - 현재 선택된 날짜와 날짜 변경 함수를 포함한 props
 */
export default function SearchCalendar({ date, setDate }: SearchCalendarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const formattedDate = useMemo(() => {
		if (!date) return undefined;
		return format(date, 'yy/MM/dd');
	}, [date]);

	const handleDateSelect = (selectedDate?: Date) => {
		setDate(selectedDate);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<BasicSelectButton
					size={'small'}
					placeholder={'날짜 전체'}
					value={formattedDate}
					displayText={formattedDate}
					isOpen={isOpen}
					onClick={() => setIsOpen(prev => !prev)}
				/>
			</PopoverTrigger>
			<PopoverContent className="flex w-[326px] justify-center" align="start">
				<div className="flex w-[250px] flex-col">
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
					<SearchCalendarButton date={date} setDate={setDate} setIsOpen={setIsOpen} />
				</div>
			</PopoverContent>
		</Popover>
	);
}
