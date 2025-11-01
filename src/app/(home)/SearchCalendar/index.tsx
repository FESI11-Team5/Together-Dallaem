'use client';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicSelectButton from '@/components/commons/basic/BasicSelectButton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

interface SearchCalendarProps {
	/** 선택된 날짜 (없을 수 있음) */
	date?: Date;
	/** 날짜 상태를 갱신하는 함수 */
	setDate: Dispatch<SetStateAction<Date | undefined>>;
}

/**
 * 날짜를 선택할 수 있는 캘린더 선택 컴포넌트
 * 버튼 클릭 시 달력이 팝오버 형태로 열리며, 날짜 선택 시 상위 컴포넌트의 상태가 업데이트됩니다.
 *
 * @param {SearchCalendarProps} props - 현재 선택된 날짜와 날짜 변경 함수를 포함한 props
 */
export default function SearchCalendar({ date, setDate }: SearchCalendarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [tempDate, setTempDate] = useState<Date | undefined>(date);

	const formattedDate = useMemo(() => {
		if (!date) return undefined;
		return format(date, 'yy/MM/dd');
	}, [date]);

	const handleDateSelect = (date?: Date) => {
		setTempDate(date);
	};

	const handleApply = () => {
		if (!tempDate) return;
		setDate(tempDate);
		setIsOpen(false);
	};

	const handleReset = () => {
		setTempDate(undefined);
		setDate(undefined);
	};

	useEffect(() => {
		if (isOpen) return;
		setTempDate(undefined);
	}, [isOpen]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<BasicSelectButton
					placeholder={'날짜 전체'}
					value={formattedDate}
					displayText={formattedDate}
					isOpen={isOpen}
					onClick={() => setIsOpen(prev => !prev)}
				/>
			</PopoverTrigger>
			<PopoverContent
				className="bg-root mr-4 flex min-w-[300px] flex-col items-center justify-center rounded-[12px] border-2 border-gray-200"
				align="start"
				isModal={false}>
				<div className="flex w-[250px] flex-col">
					<Calendar
						mode="single"
						selected={tempDate}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						// TODO: 달력 다시 학습하기
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
						fixedWeeks
					/>
					<div className="mt-2 flex w-full gap-3">
						<BasicButton outlined onClick={handleReset} disabled={date === undefined}>
							초기화
						</BasicButton>
						<BasicButton onClick={handleApply} disabled={tempDate === undefined}>
							적용
						</BasicButton>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
