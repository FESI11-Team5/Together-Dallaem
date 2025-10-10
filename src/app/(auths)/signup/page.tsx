'use client';

import { postSignup } from '@/apis/auths/signup';
import { SignupForm, type SignupFormValues } from '@/components/auth/SignupForm';
import SignupFailurePopup from '@/components/auth/SignupPopup/SignupFailurePopup';
import SignupSuccessPopup from '@/components/auth/SignupPopup/SignupSuccessPopup';
import { useModal } from '@/hooks/useModal';
import { ApiError } from '@/utils/fetch';

// TODO: 데스크톱 시 줄어들면 배경 여백이 좁아지는 현상 개선
/**
 * 회원가입 페이지 컴포넌트
 *
 * @description
 * `SignupPage`는 회원가입 폼(`SignupForm`)과 소개 이미지를 포함한 페이지 컴포넌트입니다.
 *
 * - `postSignup()` API를 호출하여 회원가입 요청을 처리합니다.
 * - 성공 시: `SignupSuccessPopup` 모달을 엽니다.
 * - 실패 시: `SignupFailurePopup` 모달을 엽니다.
 *
 * 해당 컴포넌트는 Next.js의 **Client Component**로 동작하며,
 * 서버에서 렌더링되지 않습니다. (`'use client'` 지시어 사용)
 *
 * @returns {JSX.Element} 회원가입 페이지 UI를 반환합니다.
 */
export default function SignupPage() {
	const { openModal } = useModal();

	/**
	 * 회원가입 폼 제출 핸들러
	 *
	 * @async
	 * @param {SignupFormValues} data - 폼 입력값 (이메일, 비밀번호 등)
	 *
	 * @description
	 * - `postSignup()` API 호출을 통해 회원가입을 시도합니다.
	 * - 성공 시 `SignupSuccessPopup` 모달을 띄웁니다.
	 * - 실패 시 `ApiError` 여부를 판단해 `SignupFailurePopup` 모달을 띄웁니다.
	 */
	const onSubmit = async (data: SignupFormValues) => {
		try {
			await postSignup(data);
			openModal(<SignupSuccessPopup />);
		} catch (error) {
			if (error instanceof ApiError) {
				openModal(<SignupFailurePopup />);
			}
		}
	};

	return (
		<>
			<h1 className="sr-only">같이 달램 회원가입 페이지</h1>
			<h2 className="tb:text-2xl text-center text-xl font-semibold">회원가입</h2>
			<SignupForm onSubmit={onSubmit} />
		</>
	);
}
