/**
 * SearchInCalendarButton 컴포넌트
 * - 달력에서 날짜를 선택하고 '적용' 버튼을 눌러 선택 완료
 * - 선택된 날짜는 부모 컴포넌트로 전달
 * - '초기화' 버튼을 눌러 선택된 날짜를 초기화
 * - 선택된 날짜가 없으면 버튼 비활성화
 * @props date: Date | undefined - 선택된 날짜
 * @props setDate: (date: Date | undefined) => void - 날짜 설정 함수
 * @props setIsOpen: (open: boolean) => void - 팝오버 열림 상태 설정 함수
 * @returns
 *
 */

interface CalendarButtonProps {
	date?: Date;
	setDate: (date?: Date) => void;
	setIsOpen: (open: boolean) => void;
}

export default function SearchInCalendarButton({ date, setDate, setIsOpen }: CalendarButtonProps) {
	const handleApply = () => {
		if (!date) return;
		setDate(date);
		setIsOpen(false);
	};

	// 초기화 버튼 스타일링
	const resetActiveButton = 'cursor-pointer border border-orange-400 text-orange-400';
	const resetEnabledButton = 'cursor-not-allowed border border-gray-300 text-gray-300';

	// 적용 버튼 스타일링
	const applyAciveButton = 'cursor-pointer bg-orange-600 text-white';
	const applyEnabledButton = 'cursor-not-allowed bg-gray-400 text-white';
	return (
		<div className="mt-2 flex gap-2">
			<button
				className={`flex-1 rounded-lg p-2 ${date ? resetActiveButton : resetEnabledButton} `}
				onClick={() => setDate(undefined)}
				disabled={!date}>
				초기화
			</button>
			<button
				className={`flex-1 rounded-lg p-2 ${date ? applyAciveButton : applyEnabledButton} `}
				onClick={handleApply}
				disabled={!date}>
				적용
			</button>
		</div>
	);
}
