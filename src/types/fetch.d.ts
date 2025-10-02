export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface NextFetchOptions extends RequestInit {
	next?: {
		tags?: string[];
		revalidate?: number | false;
	};
	cache?: RequestCache;
	timeout?: number;
	withAuth?: boolean;
	[key: string]: unknown; // 느슨하게 타입을 풀었는데 필요시 추후에 수정
}

export interface BaseRequestProps {
	path: string;
	options?: NextFetchOptions;
}
export interface RequestWithDataProps<TData = unknown> extends BaseRequestProps {
	data?: TData;
}

export interface FetchProps extends RequestWithDataProps {
	method: HttpMethod;
}

export interface ApiErrorBody {
	code?: string;
	parameter?: string;
	message?: string;
	[key: string]: unknown;
}
