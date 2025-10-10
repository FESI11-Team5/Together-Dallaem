import DebouncedInput from '@/components/auth/SignupForm/DebouncedInput';
import BasicButton from '@/components/commons/BasicButton';
import { signinLabel, signinPlaceholders } from '@/constants/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, type UseFormSetError } from 'react-hook-form';
import { z } from 'zod';
import { signinSchema } from '../signinSchema';
/**
 * Zod 기반 로그인 폼의 입력값 타입
 */
export type SigninFormValues = z.infer<typeof signinSchema>;

interface SigninFormProps {
	/** 제출 시 실행되는 메서드 */
	onSubmit: (data: SigninFormValues, setError: UseFormSetError<SigninFormValues>) => void;
}

export function SigninForm({ onSubmit }: SigninFormProps) {
	const {
		register,
		handleSubmit,
		trigger,
		setError,
		formState: { errors, isSubmitting, isValid, isDirty }
	} = useForm<SigninFormValues>({
		resolver: zodResolver(signinSchema), // resolver: yupResolver(yupSchema),
		mode: 'onBlur'
	});

	return (
		<form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(data => onSubmit(data, setError))}>
			<div className="flex flex-col gap-6">
				<DebouncedInput
					label={signinLabel.id}
					placeholder={signinPlaceholders.id}
					register={register('id')}
					invalidText={errors.id?.message}
					onDebouncedBlur={() => trigger('id')}
				/>
				<DebouncedInput
					label={signinLabel.password}
					placeholder={signinPlaceholders.password}
					isPassword
					register={register('password')}
					invalidText={errors.password?.message}
					onDebouncedBlur={() => trigger('password')}
				/>
			</div>
			<div className="flex flex-col gap-6">
				<BasicButton isLarge isActive={isValid && !isSubmitting && isDirty} ariaLabel="로그인">
					로그인
				</BasicButton>
				<div className="flex items-center justify-center gap-1">
					<p className="text-base font-medium">같이 달램이 처음이신가요?</p>
					<Link href="/signup" className="text-orange-600 underline">
						회원가입
					</Link>
				</div>
			</div>
		</form>
	);
}
