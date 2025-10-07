'use client';

import { postSignup } from '@/apis/auths/signup';
import { useModal } from '@/hooks/useModal';
import { ApiError } from '@/utils/fetch';
import Image from 'next/image';
import SignupFailurePopup from './SignupFailurePopup';
import { SignupForm, type SignupFormValues } from './SignupForm';
import SignupSuccessPopup from './SignupSuccessPopup';

// TODO: 데스크톱 시 줄어들면 배경 여백이 좁아지는 현상 개선
export default function SignupPage() {
	const { openModal } = useModal();
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
		<div className="tb:flex-row tb:h-screen tb:w-screen tb:gap-20 mb:px-16 flex w-full flex-col items-center justify-center gap-10 bg-gray-100 px-4 py-16">
			<h1 className="sr-only">같이 달램 회원가입 페이지</h1>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="mb:text-2xl text-xl font-semibold">Welcome to 같이 달램!</h2>
					<p className="mb:text-base text-sm font-medium whitespace-pre-line">
						바쁜 일상 속 잠깐의 휴식,
						<br />
						이제는 같이 달램과 함께 해보세요
					</p>
				</div>
				<Image
					priority
					src="/images/img_login.svg"
					alt="메인 일러스트"
					width={588}
					height={486}
					className="mb:max-w-[407px] tb:max-w-[588px] max-w-[290px]"
				/>
			</div>

			<section className="mb:px-16 tb:px-[54px] flex max-w-[510px] flex-col gap-8 rounded-3xl bg-white px-4 py-8 whitespace-nowrap">
				<h2 className="mb:text-2xl text-center text-xl font-semibold">회원가입</h2>
				<SignupForm onSubmit={onSubmit} />
			</section>
		</div>
	);
}
