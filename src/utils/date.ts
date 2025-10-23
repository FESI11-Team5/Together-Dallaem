import { differenceInDays, format, isPast } from 'date-fns';
import { ko } from 'date-fns/locale';

type DateFormat = 'M월 D일 · HH:mm' | 'yyyy.MM.dd';

/**
 * 주어진 날짜 문자열을 다양한 한국식 날짜 형식으로 변환합니다.
 *
 * @param dateString - 변환할 날짜 문자열 (예: "2025-09-26T14:30:00")
 * @param format - 원하는 출력 형식 (기본값: "yyyy.MM.dd")
 * @returns 변환된 한국식 날짜 문자열
 *
 * @example
 * formatKoreanDate("2025-09-26T14:30:00");
 * // 반환: "9월 26일 · 14:30"
 *
 * formatKoreanDate("2025-09-26T14:30:00", "yyyy.MM.dd");
 * // 반환: "2025.09.26"
 */
export function formatKoreanDate(dateString: string, format: DateFormat = 'M월 D일 · HH:mm') {
	const date = new Date(dateString);

	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1;
	const day = date.getUTCDate(); // getDay()는 요일(0~6) → 날짜는 getDate() 사용
	const hours = date.getUTCHours().toString().padStart(2, '0');
	const minutes = date.getUTCMinutes().toString().padStart(2, '0');

	switch (format) {
		case 'M월 D일 · HH:mm':
			return `${month}월 ${day}일 · ${hours}:${minutes}`;
		case 'yyyy.MM.dd':
			return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
		default:
			return `${month}월 ${day}일 · ${hours}:${minutes}`;
	}
}

/**
 * 주어진 날짜 문자열을 한국어 형식의 날짜와 시간으로 포맷합니다.
 * 예: `"2025-10-20T15:30:00"` → `{ date: '10월 20일', time: '15:30' }`
 *
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {{ date: string; time: string }} 포맷된 날짜와 시간 객체
 */
export const formatDateAndTime = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = format(date, 'M월 d일', { locale: ko });
	const formattedtime = format(date, 'HH:mm', { locale: ko });

	return {
		date: formattedDate,
		time: formattedtime
	};
};

/**
 * 마감 날짜를 기준으로 남은 일수를 계산하여 표시 문구를 반환합니다.
 * 예: `"2025-10-23"` → `"3일 후 마감"`, 오늘 마감일 경우 `"오늘 15시 마감"`
 *
 * @param {string} [dateString] - 마감일을 나타내는 날짜 문자열
 * @returns {string | null} 남은 기간 문구 (마감일이 없으면 null 반환)
 */
export const getDeadlineLabel = (dateString?: string) => {
	if (!dateString) return null;

	const deadline = new Date(dateString);
	if (isPast(deadline)) return '';

	const differenceDays = differenceInDays(deadline, new Date());
	if (differenceDays > 0) {
		return `${differenceDays}일 후 마감`;
	}

	return `오늘 ${format(deadline, 'HH시', { locale: ko })} 마감`;
};
