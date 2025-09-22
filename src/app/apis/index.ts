const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * 옵션을 병합하는 유틸리티 함수
 * 기본 옵션과 사용자 옵션을 안전하게 병합합니다.
 */
// Todo: 필요 시 deepMerge로 변경
function mergeOptions<T extends RequestInit>(defaultOpts: T, userOpts?: RequestInit): RequestInit {
	if (!userOpts) return defaultOpts;

	return {
		...defaultOpts,
		...userOpts,
		headers: {
			...defaultOpts.headers,
			...userOpts.headers
		}
	};
}

/**
 * API 요청을 위한 래퍼 함수
 * @param path - API 경로 (상대 경로 또는 절대 경로)
 * @param options - 추가 요청 옵션
 * @returns Promise<Response>
 */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

const _fetch = (path: string, method: HttpMethod, data?: unknown, options?: RequestInit): Promise<Response> => {
	const url = `${BASE_URL}${path}`;
	const mergedOptions = mergeOptions({ method }, options);
	return fetch(url, mergedOptions);
};

export { _fetch as fetch, mergeOptions, type HttpMethod };
