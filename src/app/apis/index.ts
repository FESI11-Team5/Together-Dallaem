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

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

/**
 * JSON 응답을 받는 fetch 함수
 */
const _fetch = async <T = unknown>(
	path: string,
	method: HttpMethod,
	data?: unknown,
	options?: RequestInit
): Promise<T> => {
	const url = `${BASE_URL}${path}`;
	let body: BodyInit | undefined;
	const headers: HeadersInit = {};
	// data가 있는 경우만 처리
	if (data !== undefined) {
		// 일반 객체인 경우 JSON으로 직렬화
		if (
			typeof data === "object" &&
			data !== null &&
			!(data instanceof FormData) &&
			!(data instanceof Blob) &&
			!(data instanceof ArrayBuffer)
		) {
			body = JSON.stringify(data);
			headers["content-type"] = "application/json";
		}
	}
	const mergedOptions = mergeOptions({ method, headers }, options);

	const response = await fetch(url, { ...mergedOptions, ...(body !== undefined ? { body } : {}) });

	return response.json();
};

export { _fetch as fetch, mergeOptions, type HttpMethod };
