import { debounce } from 'lodash-es';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
	/** 입력창의 placeholder 텍스트 */
	placeholder: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용(value, onChange, onBlur 등) */
	register?: UseFormRegisterReturn;
	/** 입력창 내부에 추가될 자식 요소(아이콘 등) */
	children?: React.ReactNode;
	/** 커스텀 CSS 클래스 추가 가능 */
	className?: string;
	/** 비밀번호인지 여부 (비밀번호 표시/숨기기 기능) */
	isPassword?: boolean;
	/** 유효하지 않을 때 표시할 에러 메시지 */
	invalidText?: string;
	/** 디바운스 블러일 시 실행될 콜백 */
	onDebouncedBlur?: () => void;
	/** 라벨명 */
	label?: string;
}

export default function DebouncedInput({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	invalidText = '',
	onDebouncedBlur,
	label = ''
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPw, setIsShowPw] = useState(false);

	const debouncedBlur = useMemo(
		() =>
			debounce(() => {
				onDebouncedBlur?.();
			}, 1000),
		[onDebouncedBlur]
	);

	const handleFocus = () => {
		setIsFocused(true);
		debouncedBlur();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		register?.onChange?.(e);
		debouncedBlur();
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		debouncedBlur.cancel();
		register?.onBlur?.(e);
	};

	const getBorderClass = () => {
		if (invalidText) return 'border-red-600';
		if (isFocused) return 'border-orange-300';
		return 'border-gray-50';
	};

	useEffect(() => {
		return () => debouncedBlur.cancel();
	}, [debouncedBlur]);

	return (
		<div className="flex w-full flex-col gap-2">
			<label className="text-sm font-semibold" htmlFor={label}>
				{label}
			</label>
			<div
				className={`inputBox box-border flex w-full items-center justify-between rounded-[12px] border-2 bg-gray-50 px-[16px] py-[10px] placeholder-gray-400 focus:outline-none ${getBorderClass()} ${className}`}>
				<input
					id={label}
					type={isPassword ? (isShowPw ? 'text' : 'password') : 'text'}
					placeholder={placeholder}
					className="w-full bg-transparent outline-none"
					{...register}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
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
			{invalidText && <div className="text-sm text-red-600">{invalidText}</div>}
		</div>
	);
}
