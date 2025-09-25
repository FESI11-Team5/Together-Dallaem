// "M월 D일 · HH:mm" 형태 문자열로 전환하는 유틸 함수
export function formatKoreanDate(dateString: string) {
	const date = new Date(dateString);

	const month = date.getMonth() + 1;
	const day = date.getDate(); // getDay()는 요일(0~6) → 날짜는 getDate() 사용
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${month}월 ${day}일 · ${hours}:${minutes}`;
}
