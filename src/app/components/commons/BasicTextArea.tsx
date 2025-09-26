//figma input component

import React, { useState, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function BasicTextArea({
	isValid = true,
	register,
	className = '',
	invalidText = '',
	placeholder = '남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.'
}: {
	register?: UseFormRegisterReturn;
	isValid?: boolean;
	invalidText?: string;
	className?: string;
	placeholder?: string;
}) {
	const [isFocused, setIsFocused] = useState(false);
	const [touched, setTouched] = useState(false);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
		setTouched(true);
	}, []);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLTextAreaElement>) => {
			setIsFocused(false);
			if (register?.onBlur) {
				register.onBlur(e);
			}
		},
		[register]
	);

	const getBorderClass = () => {
		if (!isValid && touched) return 'border-red-600';
		else if (isFocused) return 'border-orange-300';
		return 'border-gray-50';
	};

	return (
		<div>
			<textarea
				placeholder={placeholder}
				// prettier-ignore
				className={`
          h-[120px] w-full resize-none rounded-[12px] border-2 border-gray-50 bg-gray-50 
          px-[16px] py-[10px] font-medium text-gray-800 outline-none box-border
          // ${getBorderClass()} 
          ${className} 
        `}
				{...register}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{touched && !isValid && invalidText && <div className="text-sm text-red-600">{invalidText}</div>}
		</div>
	);
}
