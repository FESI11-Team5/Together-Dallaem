'use client';

import { zodSchema } from '@/app/(auths)/signup/signupValidator/signupValidator.zod';
import BasicButton from '@/components/commons/BasicButton';
import { SIGNUP_LABEL, SIGNUP_PLACEHOLDERS } from '@/constants/form';
import { AUTH_GUIDE_MESSAGES } from '@/constants/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DebouncedInput from './DebouncedInput';
// import { yupSchema } from './signupValidator/signupValidator.yup';
// import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Zod 기반 회원가입 폼의 입력값 타입
 */
export type SignupFormValues = z.infer<typeof zodSchema>;

interface SignupFormProps {
	/** 제출 시 실행되는 메서드 */
	onSubmit: (data: SignupFormValues) => void;
}

// TODO: disabled이 해제되는 반응 더 빠르게 개선
/**
 * 회원가입 폼 컴포넌트
 *
 * @description
 * - React Hook Form과 Zod Resolver를 사용하여 유효성 검증을 수행합니다.
 * - 각 필드는 `InputWithLabel` 컴포넌트로 렌더링됩니다.
 * - 유효성 통과 시 `onSubmit` 콜백을 실행합니다.
 * - 모든 입력 필드에서 **blur 시점(onBlur)**에 검증이 트리거됩니다.
 *
 * @returns {JSX.Element} 회원가입 입력 폼 UI
 */
export function SignupForm({ onSubmit }: SignupFormProps) {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<SignupFormValues>({
		resolver: zodResolver(zodSchema), // resolver: yupResolver(yupSchema),
		mode: 'onBlur'
	});

	return (
		<form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-6">
				<DebouncedInput
					label={SIGNUP_LABEL.name}
					placeholder={SIGNUP_PLACEHOLDERS.name}
					register={register('name')}
					invalidText={errors.name?.message}
					onDebouncedBlur={() => trigger('name')}
				/>
				<DebouncedInput
					label={SIGNUP_LABEL.email}
					placeholder={SIGNUP_PLACEHOLDERS.email}
					register={register('email')}
					invalidText={errors.email?.message}
					onDebouncedBlur={() => trigger('email')}
				/>
				<DebouncedInput
					label={SIGNUP_LABEL.companyName}
					placeholder={SIGNUP_PLACEHOLDERS.companyName}
					register={register('companyName')}
					invalidText={errors.companyName?.message}
					onDebouncedBlur={() => trigger('companyName')}
				/>
				<DebouncedInput
					label={SIGNUP_LABEL.password}
					placeholder={SIGNUP_PLACEHOLDERS.password}
					isPassword
					register={register('password')}
					invalidText={errors.password?.message}
					onDebouncedBlur={() => trigger('password')}
				/>
				<DebouncedInput
					label={SIGNUP_LABEL.confirm}
					placeholder={SIGNUP_PLACEHOLDERS.confirm}
					isPassword
					register={register('confirm')}
					invalidText={errors.confirm?.message}
					onDebouncedBlur={() => trigger('confirm')}
				/>
			</div>
			<div className="flex flex-col gap-6">
				<BasicButton isLarge isActive={isValid && !isSubmitting && isDirty} ariaLabel="회원가입 확인">
					확인
				</BasicButton>
				<div className="flex items-center justify-center gap-1">
					<p className="text-base font-medium">{AUTH_GUIDE_MESSAGES.EXISTING_MEMBER}</p>
					<Link href="/signin" className="text-orange-600 underline">
						로그인
					</Link>
				</div>
			</div>
		</form>
	);
}
