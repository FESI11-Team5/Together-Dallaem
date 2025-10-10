'use client';

import { postSignin } from '@/apis/auths/signin';
import { SIGNIN_ERRORS } from '@/constants/error';
import { useModal } from '@/hooks/useModal';
import { ApiError } from '@/utils/fetch';
import { useRouter, useSearchParams } from 'next/navigation';
import type { UseFormSetError } from 'react-hook-form';
import ServerErrorPopup from './ServerErrorPopup';
import { SigninForm, type SigninFormValues } from './SigninForm';

export default function SigninPage() {
	const searchParams = useSearchParams();
	const next = searchParams.get('next') ?? '/';

	const router = useRouter();
	const { openModal } = useModal();

	/**
	 * 로그인 폼 제출 핸들러
	 *
	 * @async
	 * @param {SigninFormValues} data - 폼 입력값 (이메일, 비밀번호 등)
	 *
	 * @description
	 * - `postSignin()` API 호출을 통해 로그인을 시도합니다.
	 * - 성공 시 이전 페이지 혹은 홈으로 이동합니다.
	 * - 실패 시 `ApiError` 여부를 판단해 에러 메시지 혹은 모달을 띄웁니다.
	 */
	const onSubmit = async (data: SigninFormValues, setError: UseFormSetError<SigninFormValues>) => {
		try {
			await postSignin(data);
			router.push(next);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 500) {
					openModal(<ServerErrorPopup />);
				} else if (error.status === 401) {
					setError('password', { type: 'server', message: SIGNIN_ERRORS.INVALID_CREDENTIALS });
				} else if (error.status === 404) {
					setError('email', { type: 'server', message: SIGNIN_ERRORS.USER_NOT_FOUND });
				}
			}
		}
	};

	return (
		<>
			<h1 className="sr-only">같이 달램 로그인 페이지</h1>
			<h2 className="tb:text-2xl text-center text-xl font-semibold">로그인</h2>
			<SigninForm onSubmit={onSubmit} />
		</>
	);
}
