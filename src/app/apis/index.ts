const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

class ApiError extends Error {
	status: number;
	body: unknown;

	constructor(status: number, message: string, body?: unknown) {
		super(message);
		this.status = status;
		this.body = body;
	}
}

function toApiError(err: unknown): ApiError {
	if (err instanceof ApiError) return err;
	if (err instanceof Error) return new ApiError(0, err.message || 'Network Error');
	return new ApiError(0, 'Unknown Error');
}

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

export const getRequest = async <T = unknown>({ path, options }: { path: string; options?: RequestInit }): Promise<T> =>
	_fetch(path, 'GET', options);

export const postRequest = async <T = unknown>({
	path,
	data,
	options
}: {
	path: string;
	data?: unknown;
	options?: RequestInit;
}): Promise<T> => _fetch(path, 'POST', options, data);

export const putRequest = async <T = unknown>({
	path,
	data,
	options
}: {
	path: string;
	data?: unknown;
	options?: RequestInit;
}): Promise<T> => _fetch(path, 'PUT', options, data);

export const deleteRequest = async <T = unknown>({
	path,
	options
}: {
	path: string;
	options?: RequestInit;
}): Promise<T> => _fetch(path, 'DELETE', options);

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * JSON 응답을 받는 fetch 함수
 */
const _fetch = async <T = unknown>(
	path: string,
	method: HttpMethod,
	options?: RequestInit,
	data?: unknown
): Promise<T> => {
	const url = `${BASE_URL}${path}`;
	let body: BodyInit | undefined;
	const headers: HeadersInit = {};
	// data가 있는 경우만 처리
	if (data !== undefined) {
		// 일반 객체인 경우 JSON으로 직렬화
		if (
			typeof data === 'object' &&
			data !== null &&
			!(data instanceof FormData) &&
			!(data instanceof Blob) &&
			!(data instanceof ArrayBuffer)
		) {
			body = JSON.stringify(data);
			headers['Content-Type'] = 'application/json';
		}
	}

	try {
		const mergedOptions = mergeOptions({ method, headers }, options);
		const response = await fetch(url, {
			...mergedOptions,
			...(body !== undefined ? { body } : {})
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => null);
			throw new ApiError(response.status, response.statusText, errorBody);
		}

		return response.json();
	} catch (err: unknown) {
		throw toApiError(err);
	}
};

export { _fetch as fetch, mergeOptions, type HttpMethod };
