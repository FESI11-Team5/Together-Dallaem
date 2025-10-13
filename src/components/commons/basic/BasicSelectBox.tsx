'use client';

import { useState, forwardRef, useRef, useEffect, useMemo, useCallback } from 'react';
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form';
import BasicDropbox, { OptionType } from './BasicDropbox';

interface SelectProps {
	/** 선택 항목들의 배열 */
	options: OptionType[];
	/** 사이즈 Props, expanded: 너비 부모 컨텐츠를 꽉 채움, 높이 44px, large: 너비 120px 높이 40px, small: 너비 110px 높이 30px */
	size?: 'expanded' | 'large' | 'small';
	/** 추가할 커스텀 CSS 클래스명(너비, 높이 등 변경 가능) */
	className?: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용 */
	register?: UseFormRegisterReturn;
	/** 기본 placeholder 텍스트 */
	placeholder?: string;
	/** 셀렉트박스 비활성화 여부 */
	disabled?: boolean;
	/** 기본 선택 값 */
	defaultValue?: string;
	/** 셀렉트박스 내부에 삽입할 콘텐츠(sortSelectBox의 아이콘 같은 것) */
	children?: React.ReactNode;
}

/**
 * 기본 셀렉트박스 컴포넌트
 *
 * 드롭다운 형태의 선택 박스로, React Hook Form과 호환됩니다.
 * 외부 클릭시 자동으로 닫히는 기능을 포함합니다.
 *
 * @param props - SelectProps 객체
 * @param ref - 포워드할 ref
 * @returns JSX.Element
 *
 * @example
 * // 기본 셀렉트박스
 * <BasicSelectBox
 *   options={[
 *     { value: '1', text: '옵션 1' },
 *     { value: '2', text: '옵션 2' }
 *   ]}
 *   placeholder="선택하세요"
 * />
 *
 * @example
 * // React Hook Form register와 함께 사용
 * <BasicSelectBox
 *   register={register('category')}
 *   options={categoryOptions}
 *   isLarge={false}
 *   disabled={false}
 * />
 */

const BasicSelectBox = forwardRef<HTMLDivElement, SelectProps>(
	(
		{
			options = [],
			size = 'large',
			className = '',
			register,
			placeholder = '선택하세요',
			disabled = false,
			children,
			defaultValue
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const [selectedValue, setSelectedValue] = useState<string | number>('');
		const containerRef = useRef<HTMLDivElement>(null);
		const formContext = useFormContext();
		const currentValue = register?.name ? formContext?.watch(register.name) : defaultValue;

		//TODO: small selectBox와 expandedSelectBox를 아예 나누어야할 지 고민중입니다... defaultValue와 Placeholder가 동시에 있는게 좀 복잡하게 보이네요.

		const displayValue = useMemo(() => selectedValue || currentValue || '', [selectedValue, currentValue]);
		const selectedOption = useMemo(
			() => options.find(option => (displayValue ? option.value === displayValue : option.value === defaultValue)),
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

		const buttonClasses = useMemo(() => {
			// 너비 및 높이 설정
			const widthHeight =
				size === 'expanded'
					? 'w-full h-[44px] border-none'
					: size === 'small'
						? 'w-[110px] h-[36px] border-2 border-gray-100'
						: 'w-[110px] h-[40px] border-2 border-gray-100';

			// 패딩 설정 - small일 때만 py-[6px]
			const padding = size === 'small' ? 'px-[12px] py-[6px]' : 'px-[12px] py-[8px]';

			// 배경색 설정
			const backgroundColor =
				size === 'expanded'
					? 'bg-gray-50'
					: selectedValue || displayValue
						? 'bg-gray-900 text-white border-none'
						: 'bg-white text-gray-800';

			return `${widthHeight} rounded-[12px] ${padding} font-medium outline-none box-border ${
				disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
			} flex items-center justify-between text-left ${backgroundColor}`;
		}, [size, disabled, selectedValue, displayValue]);

		const arrowClasses = useMemo(
			() =>
				`h-[24px] w-[24px] bg-[url('/icons/arrow_down.svg')] bg-[length:24px_24px] ml-[-2px] bg-center bg-no-repeat transition-transform duration-200 ease-in-out ${
					disabled ? 'hidden' : 'block'
				} ${isOpen ? 'rotate-180' : 'rotate-0'}
				${selectedValue || displayValue ? `bg-[url('/icons/arrow_invert.svg')]` : `bg-[url('/icons/arrow_down.svg')]`}
				`,
			[disabled, isOpen, selectedValue, displayValue]
		);

		return (
			<div ref={ref} className={'relative'}>
				{register && <input type="hidden" {...register} value={displayValue} readOnly />}

				<button
					type="button"
					className={`${buttonClasses} ${className}`}
					onClick={handleToggle}
					disabled={disabled}
					aria-expanded={isOpen}
					aria-haspopup="listbox"
					aria-label={selectedOption ? `선택됨: ${selectedOption.text}` : placeholder}>
					<span
						className={` ${
							size === 'expanded'
								? selectedValue || displayValue
									? 'text-gray-800'
									: 'text-gray-400'
								: selectedValue || displayValue
									? 'text-white'
									: 'text-gray-800'
						} text-[14px]`}>
						{children}
						{selectedOption ? selectedOption.text : placeholder}
					</span>
					<div className={arrowClasses} />
				</button>

				{isOpen && (
					<BasicDropbox
						ref={containerRef as React.RefObject<HTMLDivElement>}
						options={options}
						updateValue={handleSelect}
						selectedValue={displayValue}
						isLarge={size === 'expanded'}
					/>
				)}
			</div>
		);
	}
);

BasicSelectBox.displayName = 'BasicSelectBox';

export default BasicSelectBox;
