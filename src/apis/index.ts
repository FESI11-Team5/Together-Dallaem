import { BaseRequestProps, FetchProps, RequestWithDataProps } from '@/types/fetch';
import { ApiError, deepMerge, toApiError } from '@/utils/fetch';
import { getToken, removeToken } from '@/utils/token';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const DEFAULT_TIMEOUT = 10000; // 기본 10초

/**
 * GET 요청을 수행합니다.
 * @template T - 응답 데이터의 타입
 * @param params - 요청 파라미터
 * @param params.path - API 경로 (예: '/api/users')
 * @param params.options - 추가 요청 옵션 (타임아웃, 헤더 등)
 * @returns Promise<T> - 응답 데이터
 * @throws {ApiError} 요청 실패 시 발생
 *
 */
export const getRequest = async <T = unknown>({ path, options }: BaseRequestProps): Promise<T> =>
	_fetch({ path, method: 'GET', options });

/**
 * POST 요청을 수행합니다.
 * @template T - 응답 데이터의 타입
 * @template TData - 요청 데이터의 타입
 * @param params - 요청 파라미터
 * @param params.path - API 경로 (예: '/api/users')
 * @param params.data - 요청 본문 데이터 (객체인 경우 JSON으로 자동 변환)
 * @param params.options - 추가 요청 옵션 (타임아웃, 헤더 등)
 * @returns Promise<T> - 응답 데이터
 * @throws {ApiError} 요청 실패 시 발생
 */
export const postRequest = async <T = unknown, TData = unknown>({
	path,
	data,
	options
}: RequestWithDataProps<TData>): Promise<T> => _fetch({ path, method: 'POST', options, data });

/**
 * PUT 요청을 수행합니다.
 * @template T - 응답 데이터의 타입
 * @template TData - 요청 데이터의 타입
 * @param params - 요청 파라미터
 * @param params.path - API 경로 (예: '/api/users/123')
 * @param params.data - 요청 본문 데이터 (객체인 경우 JSON으로 자동 변환)
 * @param params.options - 추가 요청 옵션 (타임아웃, 헤더 등)
 * @returns Promise<T> - 응답 데이터
 * @throws {ApiError} 요청 실패 시 발생
 */
export const putRequest = async <T = unknown, TData = unknown>({
	path,
	data,
	options
}: RequestWithDataProps<TData>): Promise<T> => _fetch({ path, method: 'PUT', options, data });

/**
 * DELETE 요청을 수행합니다.
 * @template T - 응답 데이터의 타입
 * @param params - 요청 파라미터
 * @param params.path - API 경로 (예: '/api/users/123')
 * @param params.options - 추가 요청 옵션 (타임아웃, 헤더 등)
 * @returns Promise<T> - 응답 데이터
 * @throws {ApiError} 요청 실패 시 발생
 */
export const deleteRequest = async <T = unknown>({ path, options }: BaseRequestProps): Promise<T> =>
	_fetch({ path, method: 'DELETE', options });

/**
 * 내부 fetch 함수 - 모든 HTTP 요청의 공통 로직을 처리합니다.
 *
 * 주요 기능:
 * - 자동 JSON 직렬화 (객체 데이터)
 * - 타임아웃 처리 (기본 10초)
 * - 에러 처리 및 변환
 * - 헤더 병합
 *
 * @template T - 응답 데이터의 타입
 * @param params - 요청 파라미터
 * @param params.path - API 경로
 * @param params.method - HTTP 메서드
 * @param params.data - 요청 데이터 (선택적)
 * @param params.options - 추가 요청 옵션
 * @returns Promise<T> - 응답 데이터
 * @throws {ApiError} 요청 실패 시 발생
 * @private
 */
export const _fetch = async <T = unknown>({ path, method, options, data }: FetchProps): Promise<T> => {
	const url = `${BASE_URL}${path}`;
	let body: BodyInit | undefined;
	const headers: HeadersInit = {};

	if (options?.withAuth) {
		if (typeof window === 'undefined') {
			throw new Error('withAuth 옵션은 클라이언트 환경에서만 사용할 수 있습니다.');
		}
		const token = getToken();
		if (!token) {
			throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED', message: 'Authorization 헤더가 필요합니다' });
		}
		headers['Authorization'] = `Bearer ${token}`;
	}

	if (
		data !== undefined &&
		typeof data === 'object' &&
		!(data instanceof FormData) &&
		!(data instanceof Blob) &&
		!(data instanceof ArrayBuffer)
	) {
		// data가 있는 경우만 처리
		body = JSON.stringify(data);
		headers['Content-Type'] = 'application/json';
	}

	const controller = options?.signal ? null : new AbortController();
	const signal = options?.signal ?? controller!.signal;
	const timeoutMs = options?.timeout ?? DEFAULT_TIMEOUT;
	const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : undefined;

	try {
		const mergedOptions = deepMerge({ method, headers }, options);
		const response = await fetch(url, {
			...mergedOptions,
			...(data !== undefined ? { body: (body ?? data) as BodyInit } : {}),
			signal
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => null);

			if (response.status === 401) {
				removeToken();
				if (typeof window !== 'undefined' && window.location.pathname !== '/signin') {
					window.location.href = '/signin?next=' + encodeURIComponent(window.location.pathname);
				}
			}
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
