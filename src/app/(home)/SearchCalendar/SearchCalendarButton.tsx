'use client';

import BasicButton from '@/components/commons/basic/BasicButton';

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
	onChange?: (date?: Date) => void;
}

// TODO: 기존 컴포넌트로 교체
export default function SearchCalendarButton({ date, setDate, setIsOpen, onChange }: CalendarButtonProps) {
	const handleApply = () => {
		if (!date) return;
		setDate(date);
		setIsOpen(false);
	};

	return (
		<div className="mt-2 flex w-full gap-3">
			<BasicButton
				outlined
				onClick={() => {
					setDate(undefined);
					onChange?.(undefined);
				}}
				disabled={!date}>
				초기화
			</BasicButton>
			<BasicButton onClick={handleApply} disabled={!date}>
				적용
			</BasicButton>
		</div>
	);
}
