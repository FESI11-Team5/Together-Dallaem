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

// TODO: UI 디자인 시안대로 수정
// TODO: 대신 날짜 선택하면 바로 되고, 적용은 닫기로 바꾸는 거 논의
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
			<PopoverContent className="flex w-[326px] justify-center" align="start" isModal={false}>
				<div className="flex w-[250px] flex-col">
					<Calendar
						mode="single"
						selected={tempDate}
						onSelect={handleDateSelect}
						formatters={{
							formatWeekdayName: (date, options) => format(date, 'EEE', { locale: options?.locale })
						}}
						// TODO: 다른 달력들과 색상 통일하기
						classNames={{
							day: 'text-sm hover:bg-gray-100',
							today: 'text-primary-500 rounded-md',
							weekday: 'font-bold text-black flex-1'
						}}
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
