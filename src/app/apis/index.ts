const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const DEFAULT_TIMEOUT = 10000; // 기본 10초

class ApiError extends Error {
	status: number;
	body: unknown;

	constructor(status: number, message: string, body?: unknown) {
		super(message);
		this.status = status;
		this.body = body;
	}
}

export interface NextFetchOptions extends RequestInit {
	next?: {
		tags?: string[];
		revalidate?: number | false;
	};
	cache?: RequestCache;
	timeout?: number;
	// 느슨하게 타입을 풀었는데 나중에 수정 필요
	[key: string]: unknown;
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
function deepMerge(base: NextFetchOptions, overrides?: NextFetchOptions, lowerCase: boolean = false): NextFetchOptions {
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
}

export const getRequest = async <T = unknown>({
	path,
	options
}: {
	path: string;
	options?: NextFetchOptions;
}): Promise<T> => _fetch(path, 'GET', options);

export const postRequest = async <T = unknown>({
	path,
	data,
	options
}: {
	path: string;
	data?: unknown;
	options?: NextFetchOptions;
}): Promise<T> => _fetch(path, 'POST', options, data);

export const putRequest = async <T = unknown>({
	path,
	data,
	options
}: {
	path: string;
	data?: unknown;
	options?: NextFetchOptions;
}): Promise<T> => _fetch(path, 'PUT', options, data);

export const deleteRequest = async <T = unknown>({
	path,
	options
}: {
	path: string;
	options?: NextFetchOptions;
}): Promise<T> => _fetch(path, 'DELETE', options);

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * JSON 응답을 받는 fetch 함수
 */
const _fetch = async <T = unknown>(
	path: string,
	method: HttpMethod,
	options?: NextFetchOptions,
	data?: unknown
): Promise<T> => {
	const url = `${BASE_URL}${path}`;
	let body: BodyInit | undefined;
	const headers: HeadersInit = {};
	// data가 있는 경우만 처리
	if (data !== undefined) {
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

	const controller = options?.signal ? null : new AbortController();
	const signal = options?.signal ?? controller!.signal;
	const timeoutMs = options?.timeout ?? DEFAULT_TIMEOUT;
	const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : undefined;

	try {
		const mergedOptions = deepMerge({ method, headers }, options);
		const response = await fetch(url, {
			...mergedOptions,
			...(body !== undefined ? { body } : {}),
			signal
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => null);
			throw new ApiError(response.status, response.statusText, errorBody);
		}

		return response.json();
	} catch (err: unknown) {
		if (err instanceof DOMException && err.name === 'AbortError') {
			throw new ApiError(0, 'Request aborted (timeout or manual abort)');
		}
		throw toApiError(err);
	} finally {
		if (timeoutId) clearTimeout(timeoutId);
	}
};
