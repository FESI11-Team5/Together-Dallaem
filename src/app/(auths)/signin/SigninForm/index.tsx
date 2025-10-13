'use client';

import DebouncedInput from '@/components/auth/SignupForm/DebouncedInput';
import BasicButton from '@/components/commons/BasicButton';
import { SIGNIN_ERRORS } from '@/constants/error';
import { SIGNIN_LABEL, SIGNIN_PLACEHOLDERS } from '@/constants/form';
import { AUTH_GUIDE_MESSAGES } from '@/constants/messages';
import { ApiError } from '@/utils/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signinSchema } from '@/utils/schema';

/**
 * Zod 기반 로그인 폼의 입력값 타입
 */
export type SigninFormValues = z.infer<typeof signinSchema>;

interface SigninFormProps {
	/** 제출 시 실행되는 메서드 */
	onSubmit: (data: SigninFormValues) => void;
}

export function SigninForm({ onSubmit }: SigninFormProps) {
	const {
		register,
		handleSubmit,
		trigger,
		setError,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<SigninFormValues>({
		resolver: zodResolver(signinSchema),
		mode: 'onBlur'
	});

	/**
	 * 서버 에러를 폼 에러로 변환하는 핸들러
	 */
	const handleServerError = (error: unknown) => {
		if (error instanceof ApiError) {
			if (error.status === 401) {
				setError('password', { type: 'server', message: SIGNIN_ERRORS.INVALID_CREDENTIALS });
			}
			if (error.status === 404) {
				setError('email', { type: 'server', message: SIGNIN_ERRORS.USER_NOT_FOUND });
			}
		}
	};

	/**
	 * 폼 제출 핸들러
	 */
	const handleFormSubmit = async (data: SigninFormValues) => {
		try {
			await onSubmit(data);
		} catch (error) {
			handleServerError(error);
		}
	};

	return (
		<form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(handleFormSubmit)}>
			<div className="flex w-full flex-col gap-6">
				<DebouncedInput
					label={SIGNIN_LABEL.id}
					placeholder={SIGNIN_PLACEHOLDERS.id}
					register={register('email')}
					invalidText={errors.email?.message}
					onDebouncedBlur={() => trigger('email')}
				/>
				<DebouncedInput
					label={SIGNIN_LABEL.password}
					placeholder={SIGNIN_PLACEHOLDERS.password}
					isPassword
					register={register('password')}
					invalidText={errors.password?.message}
					onDebouncedBlur={() => trigger('password')}
				/>
			</div>
			<div className="flex w-full flex-col gap-6">
				<BasicButton isLarge isActive={isValid && !isSubmitting && isDirty} ariaLabel="로그인 확인">
					로그인
				</BasicButton>
				<div className="flex items-center justify-center gap-1">
					<p className="text-base font-medium">{AUTH_GUIDE_MESSAGES.NEW_MEMBER}</p>
					<Link href="/signup" className="text-orange-600 underline">
						회원가입
					</Link>
				</div>
			</div>
		</form>
	);
}
