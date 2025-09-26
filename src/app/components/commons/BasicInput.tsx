import { useState, useCallback } from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
	placeholder: string;
	register?: UseFormRegisterReturn;
	children?: React.ReactNode;
	className?: string;
	isPassword?: boolean;
	required?: boolean;
	isValid?: boolean;
	invalidText?: string;
	value?: string; // 외부에서 값을 전달받기 위한 prop
}

export default function BasicInput({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	required = false,
	isValid = true,
	invalidText = '',
	value = ''
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPw, setIsShowPw] = useState(false);
	const [touched, setTouched] = useState(false);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			setTouched(true);
			setIsFocused(false);

			if (register?.onBlur) {
				register.onBlur(e);
			}
		},
		[register]
	);

	const getBorderClass = () => {
		if (!isValid) return 'border-red-600';
		else if (required && touched && value.length === 0)
			return 'border-red-600'; // register가 없을 때만 체크
		else if (isFocused) return 'border-orange-300';
		return 'border-gray-50';
	};

	const getErrorMessage = useCallback(() => {
		// required이고 값이 비어있는 경우
		if (required && value.length === 0) {
			return '입력해주세요.';
		}
		// 유효하지 않은 경우
		else if (!isValid && invalidText) {
			return invalidText;
		}

		// 에러가 없는 경우 아무것도 표시하지 않음
		return null;
	}, [required, value, isValid, invalidText]);

	return (
		<div>
			<div
				className={`inputBox box-border flex min-w-[402px] items-center justify-between rounded-[12px] border-2 bg-gray-50 px-[16px] py-[10px] placeholder-gray-400 focus:outline-none ${getBorderClass()} ${className}`}>
				<input
					type={isPassword ? (isShowPw ? 'text' : 'password') : 'text'}
					placeholder={placeholder}
					className="w-full bg-transparent outline-none"
					{...register}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required={required}
				/>
				{isPassword && (
					<Image
						src={`/icons/visibility_${isShowPw ? 'on' : 'off'}.svg`}
						width="20"
						height="20"
						alt="password visible toggle button"
						onClick={() => setIsShowPw(prev => !prev)}
						className="cursor-pointer"
					/>
				)}
				{children}
			</div>

			{(() => {
				const errorMessage = getErrorMessage();
				return touched && errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>;
			})()}
		</div>
	);
}
