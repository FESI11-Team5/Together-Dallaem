import { formatInTimeZone } from 'date-fns-tz';

/**
 * UTC → KST 변환 및 포맷팅
 * @param dateString UTC ISO 문자열 (예: "2025-10-23T01:13:29.482Z")
 *
 * @param formatStr 출력 포맷 (기본값: "yyyy-MM-dd HH:mm"  )
 * @param formatStr 출력 포맷 (예 :"2025-10-23T01:13:29.482Z" -> "2025-10-23 10:13")
 */

export function formatUTCToKST(dateString: string, formatStr = 'yyyy-MM-dd HH:mm') {
	if (!dateString) return '';
	return formatInTimeZone(dateString, 'Asia/Seoul', formatStr);
}
