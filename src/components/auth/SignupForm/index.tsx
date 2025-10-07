'use client';
import BasicButton from '@/components/commons/BasicButton';
import { signupLabel, signupPlaceholders } from '@/constants/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodSchema } from '../../../app/(auths)/signup/signupValidator/signupValidator.zod';
import { InputWithLabel } from './InputWithLabel';
// import { yupSchema } from './signupValidator/signupValidator.yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import type { SignupFormValues } from './signupValidator/signupValidator';

export type SignupFormValues = z.infer<typeof zodSchema>;

interface SignupFormProps {
	/** 제출 뭐시기 */
	onSubmit: (data: SignupFormValues) => void;
}

// TODO: disabled이 해제되는 반응 더 빠르게 개선
export function SignupForm({ onSubmit }: SignupFormProps) {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<SignupFormValues>({
		resolver: zodResolver(zodSchema),
		// resolver: yupResolver(yupSchema),
		mode: 'onBlur'
	});

	return (
		<form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-6">
				<InputWithLabel
					label={signupLabel.name}
					placeholder={signupPlaceholders.name}
					register={register('name')}
					invalidText={errors.name?.message}
					onDebouncedBlur={() => trigger('name')}
				/>
				<InputWithLabel
					label={signupLabel.email}
					placeholder={signupPlaceholders.email}
					register={register('email')}
					invalidText={errors.email?.message}
					onDebouncedBlur={() => trigger('email')}
				/>
				<InputWithLabel
					label={signupLabel.companyName}
					placeholder={signupPlaceholders.companyName}
					register={register('companyName')}
					invalidText={errors.companyName?.message}
					onDebouncedBlur={() => trigger('companyName')}
				/>
				<InputWithLabel
					label={signupLabel.password}
					placeholder={signupPlaceholders.password}
					isPassword
					register={register('password')}
					invalidText={errors.password?.message}
					onDebouncedBlur={() => trigger('password')}
				/>
				<InputWithLabel
					label={signupLabel.confirm}
					placeholder={signupPlaceholders.confirm}
					isPassword
					register={register('confirm')}
					invalidText={errors.confirm?.message}
					onDebouncedBlur={() => trigger('confirm')}
				/>
			</div>
			<div className="flex flex-col gap-6">
				<BasicButton className="w-full" isActive={isValid && !isSubmitting && isDirty} ariaLabel="회원가입 확인">
					확인
				</BasicButton>
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
