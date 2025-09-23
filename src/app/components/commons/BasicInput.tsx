//figma input component

import { useState } from 'react';
import Image from 'next/image';

interface InputProps {
	placeholder: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
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
	value = '',
	onChange,
	onBlur,
	className = '',
	required = false,
	isValid = true,
	invalidText = ''
}: InputProps) {
	const [isTyping, setIsTyping] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPw, setIsShowPw] = useState(false);
	const [touched, setTouched] = useState(false);

	const handleBlur = () => {
		setTouched(true);
		setIsFocused(false);
		setIsTyping(false);
		onBlur?.();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setIsTyping(val.length > 0);
		onChange?.(e);
	};

	return (
		<div>
			<div
				// prettier-ignore
				className={`
          inputBox flex min-w-[402px] items-center justify-between
          rounded-[12px] border-2 border-gray-50 bg-gray-50 px-[16px] 
          py-[10px] placeholder-gray-400 focus:outline-none box-border
          ${isTyping ? 'border-orange-600' : 'border-gray-50'} 
          ${isFocused ? 'border-orange-300' : 'border-gray-50'} 
          ${!isValid && touched ? 'border-red-600' : 'border-gray-50'} 
          ${required && touched && value.length == 0 ? 'border-red-600' : 'border-gray-50'} 
          ${className}
        `}>
				<input
					type={isPassword ? (isShowPw ? 'text' : 'password') : 'text'}
					placeholder={placeholder}
					className="w-full bg-transparent outline-none"
					onFocus={() => setIsFocused(true)}
					onBlur={() => handleBlur()}
					onChange={e => handleChange(e)}
					value={value}
					required={required}></input>
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
				<>
					{required && value.length == 0 && <div className="text-red-600"> 입력해주세요. </div>}
					{value.length != 0 && !isValid && <div className="text-red-600">{invalidText}</div>}
				</>
			)}
		</div>
	);
}
