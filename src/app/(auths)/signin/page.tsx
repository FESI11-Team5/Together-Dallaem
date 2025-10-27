'use client';

import { postSignin } from '@/apis/auths/signin';
import { getUserInfo } from '@/apis/auths/user';
import ServerErrorPopup from '@/components/auth/Popup/ServerErrorPopup';
import { SigninForm, type SigninFormValues } from '@/components/auth/SigninForm';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';
import { ApiError } from '@/utils/fetch';
import { decodeToken } from '@/utils/token';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SigninPageContent() {
	const searchParams = useSearchParams();
	const next = searchParams.get('next') ?? '/';

	const signinUser = useUserStore(state => state.signinUser);
	const updateUser = useUserStore(state => state.updateUser);
	const router = useRouter();
	const { openModal } = useModal();

	/**
	 * 로그인 처리 및 리다이렉트 핸들러
	 *
	 * @async
	 * @param {SigninFormValues} data - 폼 입력값 (이메일, 비밀번호 등)
	 *
	 * @description
	 * - `postSignin()` API 호출을 통해 로그인을 시도합니다.
	 * - 성공 시 이전 페이지 혹은 홈으로 이동합니다.
	 * - 실패 시 `ApiError` 여부를 판단해 에러 메시지 혹은 모달을 띄웁니다.
	 */
	const handleSigninAndRedirect = async (data: SigninFormValues) => {
		try {
			const { token } = await postSignin(data);

			const decodedToken = decodeToken(token);
			if (!decodedToken) throw new Error('Invalid token');

			signinUser({ userId: decodedToken.userId as number, token });

			const userInfo = await getUserInfo();
			updateUser({
				email: userInfo.email,
				name: userInfo.name,
				companyName: userInfo.companyName,
				image: userInfo.image ?? ''
			});

			router.replace(next);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 500) {
					openModal(<ServerErrorPopup />);
					return;
				}
				throw error;
			}
		}
	};

	return (
		<>
			<h1 className="sr-only">같이 달램 로그인 페이지</h1>
			<h2 className="tb:text-2xl text-center text-xl font-semibold">로그인</h2>
			<SigninForm onSubmit={handleSigninAndRedirect} />
		</>
	);
}
// TODO: 빌드 에러에 따른 임시 조치 추후에 다시 코드 검토 필요
export default function SigninPage() {
	return (
		<Suspense fallback={<div>로딩 중...</div>}>
			<SigninPageContent />
		</Suspense>
	);
}
