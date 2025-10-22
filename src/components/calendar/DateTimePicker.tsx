import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
 * DateTimePicker 컴포넌트
 * - 날짜와 시간을 선택할 수 있는 UI를 제공
 * - 시간은 12시간제(AM/PM)로 선택 가능
 * - 시간 선택 후 '적용' 버튼을 눌러 선택 완료
 * - 선택된 날짜와 시간은 부모 컴포넌트로 전달
 * - 반응형 디자인 적용
 * @props date: Date | undefined - 선택된 날짜
 * @props timeSelection: TimeSelection - 선택된 시간 정보
 * @props setDate: (date: Date) => void - 날짜 설정 함수
 * @props setIsOpen: (open: boolean) => void - 팝오버 열림 상태 설정 함수
 * @props setTimeSelection: React.Dispatch<React.SetStateAction<TimeSelection>> - 시간 선택 상태 설정 함수
 * @props onChange?: (date: Date) => void - 날짜 변경 시 호출되는 콜백 함수
 *
 */

interface DateTimePickerProps {
	date?: Date;
	timeSelection: TimeSelection;
	setDate: (date: Date) => void;
	setIsOpen: (open: boolean) => void;
	setTimeSelection: React.Dispatch<React.SetStateAction<TimeSelection>>; // DateTimePicker에서 제공하는 타입
	onChange?: (date: Date) => void;
}

/**
 * DateTimePicker 컴포넌트
 * - 날짜와 시간을 선택할 수 있는 UI를 제공
 * - 시간은 12시간제(AM/PM)로 선택 가능
 * - 시간 선택 후 '적용' 버튼을 눌러 선택 완료
 * - 선택된 날짜와 시간은 부모 컴포넌트로 전달
 *
 */
export default function DateTimePicker({
	date,
	timeSelection,
	setDate,
	setIsOpen,
	setTimeSelection,
	onChange
}: DateTimePickerProps) {
	const hours = Array.from({ length: 12 }, (_, i) => i + 1);
	const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
	const ampmOptions = ['AM', 'PM'];

	const handleApply = () => {
		if (!date || !timeSelection.hour || !timeSelection.minute || !timeSelection.ampm) return;

		const newDate = new Date(date);

		let adjustedHour = parseInt(timeSelection.hour) % 12;
		if (timeSelection.ampm === 'PM') adjustedHour += 12;

		newDate.setHours(adjustedHour);
		newDate.setMinutes(parseInt(timeSelection.minute));

		setDate(newDate);
		onChange?.(newDate);
		setIsOpen(false);
	};

	useEffect(() => {
		if (!date) return;

		// date가 새로 선택되었지만 이전 시간 선택값이 없다면 '비워두기'
		setTimeSelection(prev => {
			if (!prev.hour && !prev.minute && !prev.ampm) {
				return { hour: undefined, minute: undefined, ampm: undefined };
			}
			return prev;
		});
	}, [date]);
	return (
		<div className="flex flex-col gap-4">
			<div className="mb:h-[230px] mb:flex-row mb:divide-x mb:w-full flex flex-col">
				{/* Hour */}
				<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
					<div className="mb:flex-col mb:w-auto flex p-2">
						{hours.reverse().map(h => (
							<Button
								key={h}
								size="default"
								variant={timeSelection.hour === String(h) ? 'default' : 'ghost'}
								className="mb:w-full aspect-square shrink-0"
								onClick={() => setTimeSelection(prev => ({ ...prev, hour: String(h) }))}>
								{h.toString().padStart(2, '0')}
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" className="mb:hidden" />
				</ScrollArea>

				{/* Minute */}
				<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
					<div className="mb:flex-col flex p-2">
						{[...minutes].reverse().map(m => (
							<Button
								key={m}
								size="default"
								variant={timeSelection.minute === String(m) ? 'default' : 'ghost'}
								className="mb:w-full aspect-square shrink-0"
								onClick={() => setTimeSelection(prev => ({ ...prev, minute: String(m) }))}>
								{m.toString().padStart(2, '0')}
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" className="mb:hidden" />
				</ScrollArea>

				{/* AM/PM */}
				<ScrollArea className="mb:w-auto mb:border-t-0 mb:border-l w-64 border-t border-l-0">
					<div className="mb:flex-col flex p-2">
						{ampmOptions.map(ap => (
							<Button
								key={ap}
								size="default"
								variant={timeSelection.ampm === ap ? 'default' : 'ghost'}
								className="mb:w-full aspect-square shrink-0"
								onClick={() => setTimeSelection(prev => ({ ...prev, ampm: ap }))}>
								{ap}
							</Button>
						))}
					</div>
				</ScrollArea>
			</div>

			{/* 적용 버튼 */}
			<div className="flex w-full">
				<button
					className={`flex-1 rounded-lg p-2 ${
						date && timeSelection.hour && timeSelection.minute && timeSelection.ampm
							? 'bg-orange-600 text-white'
							: 'cursor-not-allowed bg-gray-300 text-gray-500'
					}`}
					onClick={handleApply}
					disabled={!date || !timeSelection.hour || !timeSelection.minute || !timeSelection.ampm}>
					적용
				</button>
			</div>
		</div>
	);
}
