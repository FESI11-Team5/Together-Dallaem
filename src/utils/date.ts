/**
 * 주어진 날짜 문자열을 "M월 D일 · HH:mm" 형식으로 변환합니다.
 *
 * @param {string} dateString - 변환할 날짜 문자열 (예: "2025-09-26T14:30:00").
 * @returns {string} 변환된 한국식 날짜 문자열 (예: "9월 26일 · 14:30").
 *
 * @example
 * formatKoreanDate("2025-09-26T14:30:00");
 * // 반환: "9월 26일 · 14:30"
 */
export function formatKoreanDate(dateString: string) {
	const date = new Date(dateString);

	const month = date.getMonth() + 1;
	const day = date.getDate(); // getDay()는 요일(0~6) → 날짜는 getDate() 사용
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${month}월 ${day}일 · ${hours}:${minutes}`;
}
