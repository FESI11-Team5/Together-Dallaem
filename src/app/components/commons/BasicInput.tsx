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
}

export default function BasicInput({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	required = false,
	isValid = true,
	invalidText = ''
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPw, setIsShowPw] = useState(false);
	const [touched, setTouched] = useState(false); //touched => 한번 포커스 하기 전까지는 invalid나 required 문구가 뜨지 않게 하기 위함
	const [value, setValue] = useState('');

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			setTouched(true);
			setIsFocused(false);
			register?.onBlur?.(e);
		},
		[register]
	);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setValue(newValue);
			register?.onChange?.(e);
		},
		[register]
	);

	// Border 상태값
	const getBorderClass = () => {
		if (!isValid && touched) return 'border-red-600';
		if (required && touched && !value.trim()) return 'border-red-600';
		if (value.trim()) return 'border-orange-600';
		if (isFocused) return 'border-orange-300';
		return 'border-gray-50';
	};

	return (
		<div>
			<div
				className={`inputBox box-border flex min-w-[402px] items-center justify-between rounded-[12px] border-2 bg-gray-50 px-[16px] py-[10px] placeholder-gray-400 focus:outline-none ${getBorderClass()} ${className}`}>
				<input
					type={isPassword ? (isShowPw ? 'text' : 'password') : 'text'}
					placeholder={placeholder}
					className="w-full bg-transparent outline-none"
					value={value}
					onFocus={() => setIsFocused(true)}
					onBlur={handleBlur}
					onChange={handleChange}
					{...register}
					required={required}
				/>
				{isPassword ? (
					<Image
						src={`/icons/visibility_${isShowPw ? 'on' : 'off'}.svg`}
						width="20"
						height="20"
						alt="password visible button"
						onClick={() => setIsShowPw(prev => !prev)}
					/>
				) : null}
				{children}
			</div>

			{touched && (
				<div className="text-red-600">
					{required && !value.trim() && '입력해주세요.'}
					{value.trim() && !isValid && invalidText}
				</div>
			)}
		</div>
	);
}
