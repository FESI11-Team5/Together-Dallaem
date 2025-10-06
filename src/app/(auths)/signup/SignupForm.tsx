'use client';
import BasicButton from '@/components/commons/BasicButton';
import { signupLabel, signupPlaceholders } from '@/constants/form';
import Link from 'next/link';
import { InputWithLabel } from './InputWithLabel';

export function SignupForm() {
	return (
		<form className="flex w-full flex-col gap-10">
			<div className="flex flex-col gap-6">
				<InputWithLabel label={signupLabel.name} placeholder={signupPlaceholders.name} />
				<InputWithLabel label={signupLabel.email} placeholder={signupPlaceholders.email} />
				<InputWithLabel label={signupLabel.companyName} placeholder={signupPlaceholders.companyName} />
				<InputWithLabel label={signupLabel.password} placeholder={signupPlaceholders.password} isPassword />
				<InputWithLabel label={signupLabel.confirm} placeholder={signupPlaceholders.confirm} isPassword />
			</div>
			<div className="flex flex-col gap-6">
				<BasicButton>확인</BasicButton>
				<div className="flex items-center justify-center gap-1">
					<p className="text-base font-medium">이미 회원이신가요?</p>
					<Link href="/login" className="text-orange-600 underline">
						로그인
					</Link>
				</div>
			</div>
		</form>
	);
}
