'use client';

import { useState, forwardRef, useRef, useEffect, useMemo, useCallback } from 'react';
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form';

interface OptionType {
	value: string | number;
	text: string;
}

interface SelectProps {
	options: OptionType[];
	isLarge?: boolean;
	className?: string;
	register?: UseFormRegisterReturn;
	placeholder?: string;
	disabled?: boolean;
}

const BasicSelectBox = forwardRef<HTMLDivElement, SelectProps>(
	({ options = [], isLarge = true, className = '', register, placeholder = '선택하세요', disabled = false }, ref) => {
		const [isOpen, setIsOpen] = useState(false);
		const [selectedValue, setSelectedValue] = useState<string | number>('');
		const containerRef = useRef<HTMLDivElement>(null);
		const formContext = useFormContext();
		const currentValue = register?.name ? formContext?.watch(register.name) : '';

		const displayValue = useMemo(() => selectedValue || currentValue || '', [selectedValue, currentValue]);
		const selectedOption = useMemo(
			() => options.find(option => option.value === displayValue),
			[options, displayValue]
		);

		useEffect(() => {
			if (!isOpen) return;

			const handleClickOutside = (event: MouseEvent) => {
				if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
					setIsOpen(false);
				}
			};

			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}, [isOpen]);

		useEffect(() => {
			if (currentValue !== undefined && currentValue !== null) {
				setSelectedValue(currentValue);
			}
		}, [currentValue]);

		const handleSelect = useCallback(
			(optionValue: string | number) => {
				setSelectedValue(optionValue);
				setIsOpen(false);

				if (register?.onChange) {
					register.onChange({
						target: { name: register.name, value: optionValue }
					});
				}
			},
			[register]
		);

		const handleToggle = useCallback(() => {
			if (!disabled) {
				setIsOpen(prev => !prev);
			}
		}, [disabled]);

		const buttonClasses = useMemo(
			() =>
				`${
					isLarge ? 'w-full border-none bg-gray-50' : 'w-[120px] border-2 border-gray-100 bg-white'
				} rounded-[12px] px-[12px] py-[8px] font-medium text-gray-800 outline-none ${
					disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'
				} flex items-center justify-between text-left`,
			[isLarge, disabled]
		);

		const arrowClasses = useMemo(
			() =>
				`h-[24px] w-[24px] bg-[url('/icons/arrow_down.svg')] bg-[length:24px_24px] bg-center bg-no-repeat transition-transform duration-200 ease-in-out ${
					disabled ? 'hidden' : 'block'
				} ${isOpen ? 'rotate-180' : 'rotate-0'}`,
			[disabled, isOpen]
		);

		return (
			<div ref={ref} className={`relative ${isLarge ? 'w-full' : 'w-[120px]'} ${className}`}>
				{register && <input type="hidden" {...register} value={displayValue} readOnly />}

				<button
					type="button"
					className={buttonClasses}
					onClick={handleToggle}
					disabled={disabled}
					aria-expanded={isOpen}
					aria-haspopup="listbox"
					aria-label={selectedOption ? `선택됨: ${selectedOption.text}` : placeholder}>
					<span className={selectedOption ? 'text-gray-800' : 'text-gray-500'}>
						{selectedOption ? selectedOption.text : placeholder}
					</span>
					<div className={arrowClasses} />
				</button>

				{isOpen && (
					<div
						ref={containerRef}
						className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-[12px] border border-gray-200 bg-white shadow-xl"
						role="listbox"
						aria-label="옵션 목록">
						{options.map(option => (
							<button
								key={`${option.value}-${option.text}`}
								type="button"
								className={`w-full px-[12px] py-[8px] text-left text-gray-800 first:rounded-t-[12px] last:rounded-b-[12px] hover:bg-gray-100 ${
									displayValue === option.value ? 'bg-gray-100 font-medium' : ''
								}`}
								onClick={() => handleSelect(option.value)}
								role="option"
								aria-selected={displayValue === option.value}>
								{option.text}
							</button>
						))}
					</div>
				)}
			</div>
		);
	}
);

BasicSelectBox.displayName = 'BasicSelectBox';

export default BasicSelectBox;
