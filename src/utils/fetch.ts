import { ApiErrorBody, NextFetchOptions } from '@/types/fetch';

/*
 * API 요청 중 발생하는 에러를 나타내는 클래스입니다.
 * HTTP 상태 코드, 에러 메시지, 그리고 응답 본문을 포함합니다.
 *
 * @extends Error
 */
export class ApiError extends Error {
	/** HTTP 상태 코드 (0은 네트워크 에러를 의미) */
	status: number;
	/** 서버에서 반환한 에러 응답 본문 */
	body?: ApiErrorBody;
	/** 서버가 내려준 에러 코드 (예: VALIDATION_ERROR, UNAUTHORIZED) */
	code?: string;
	/** 서버가 내려준 에러 파라미터 (예: "type" 필드 유효성 실패) */
	parameter?: string;
	/**
	 * ApiError 인스턴스를 생성합니다.
	 * @param status - HTTP 상태 코드
	 * @param message - 에러 메시지
	 * @param body - 서버 응답 본문 (선택적)
	 */
	constructor(status: number, message: string, body?: ApiErrorBody) {
		super(body?.message || message);
		this.status = status;
		this.body = body;
		this.code = body?.code;
		this.parameter = body?.parameter;
	}
}

/**
 * 알 수 없는 에러를 ApiError로 변환합니다.
 * 네트워크 에러, 일반 Error, 기타 예외를 일관된 ApiError 형태로 변환합니다.
 *
 * @param err - 변환할 에러
 * @returns ApiError 인스턴스
 */
export const toApiError = (err: unknown): ApiError => {
	if (err instanceof ApiError) return err;
	if (err instanceof Error) return new ApiError(0, err.message || 'Network Error');
	return new ApiError(0, 'Unknown Error');
};

/**
 * 두 옵션를 깊게 병합합니다.
 * 중첩된 객체의 속성도 재귀적으로 병합하며, 헤더의 경우 키를 소문자로 정규화합니다.
 *
 * @param base - 기본 객체 (병합의 기준)
 * @param overrides - 덮어쓸 객체 (병합할 대상)
 * @param lowerCase - 키를 소문자로 정규화할지 여부 (기본값: false)
 * @returns 병합된 새로운 객체
 */
export const deepMerge = (
	base: NextFetchOptions,
	overrides?: NextFetchOptions,
	lowerCase: boolean = false
): NextFetchOptions => {
	if (!overrides) return base;

	const out: NextFetchOptions = { ...base };

	for (const key in overrides) {
		const normalizedKey = lowerCase ? key.toLowerCase() : key;
		const baseValue = out[normalizedKey];
		const overrideValue = overrides[key];

		if (
			baseValue &&
			typeof baseValue === 'object' &&
			!Array.isArray(baseValue) &&
			overrideValue &&
			typeof overrideValue === 'object' &&
			!Array.isArray(overrideValue)
		) {
			out[normalizedKey] = deepMerge(
				baseValue as NextFetchOptions,
				overrideValue as NextFetchOptions,
				normalizedKey === 'headers'
			);
		} else {
			out[normalizedKey] = overrideValue;
		}
	}

	return out;
};
