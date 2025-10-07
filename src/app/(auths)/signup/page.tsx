'use client';

import { postSignup } from '@/apis/auths/signup';
import { useModal } from '@/hooks/useModal';
import { ApiError } from '@/utils/fetch';
import Image from 'next/image';
import SignupFailurePopup from './SignupFailurePopup';
import { SignupForm, type SignupFormValues } from './SignupForm';
import SignupSuccessPopup from './SignupSuccessPopup';

// TODO: 반응형 추가 및 이미지 크기 조절 잘되는지 점검
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
		<div className="flex h-screen w-full items-center justify-center gap-20 bg-gray-100">
			<h1 className="sr-only">같이 달램 회원가입 페이지</h1>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="text-2xl font-semibold">Welcome to 같이 달램!</h2>
					<p className="text-base font-medium whitespace-pre-line">
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

			<section className="flex max-w-[510px] flex-1 flex-col gap-8 rounded-3xl bg-white px-[54px] py-8 whitespace-nowrap">
				<h2 className="text-center text-2xl font-semibold">회원가입</h2>
				<SignupForm onSubmit={onSubmit} />
			</section>
		</div>
	);
}
