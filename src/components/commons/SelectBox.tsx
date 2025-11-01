'use client';

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form';
import BasicDropbox, { OptionType } from './basic/BasicDropbox';
import BasicSelectButton from './basic/BasicSelectButton';

interface SelectBoxProps {
	/** 선택 항목들의 배열 */
	options: OptionType[];
	/** 사이즈 Props, expanded: 너비 부모 컨텐츠를 꽉 채움, 높이 44px, large: 너비 120px 높이 40px, small: 너비 110px 높이 30px */
	expanded?: boolean;
	/** 추가할 커스터마이징 CSS 클래스명(너비, 높이 등 변경 가능) */
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
	/** 값 변경 시 호출되는 콜백 함수 */
	onChange?: (value: string | number) => void;
}

/**
 * 기본 셀렉트박스 컴포넌트
 *
 * 드롭다운 형태의 선택 박스로, React Hook Form과 호환됩니다.
 * 외부 클릭시 자동으로 닫히는 기능을 포함합니다.
 * BasicSelectButton과 BasicDropbox를 조합하여 완전한 셀렉트박스를 제공합니다.
 *
 * @param props - SelectBoxProps 객체
 * @param ref - 포워드할 ref
 * @returns JSX.Element
 *
 * @example
 * // 기본 셀렉트박스
 * <SelectBox
 *   options={[
 *     { value: '1', text: '옵션 1' },
 *     { value: '2', text: '옵션 2' }
 *   ]}
 *   placeholder="선택하세요"
 * />
 *
 * @example
 * // React Hook Form register와 함께 사용
 * <SelectBox
 *   register={register('category')}
 *   options={categoryOptions}
 *   expanded
 *   disabled={false}
 * />
 */
const SelectBox = forwardRef<HTMLDivElement, SelectBoxProps>(
	(
		{
			options = [],
			expanded = false,
			className = '',
			register,
			placeholder = '선택하세요',
			disabled = false,
			children,
			defaultValue,
			onChange
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const [selectedValue, setSelectedValue] = useState<string | number>('');
		const containerRef = useRef<HTMLDivElement>(null);

		// React Hook Form 연동
		const formContext = useFormContext();
		const currentValue = register?.name && formContext ? formContext.watch(register.name) : defaultValue;

		const displayValue = useMemo(() => selectedValue || currentValue || '', [selectedValue, currentValue]);

		const selectedOption = useMemo(
			() => options.find(option => option.value === displayValue),
			[options, displayValue]
		);

		// 외부 클릭 감지
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

		// defaultValue나 form 값이 변경될 때 내부 상태 동기화
		useEffect(() => {
			if (currentValue !== undefined && currentValue !== null) {
				setSelectedValue(currentValue);
			}
		}, [currentValue]);

		// 옵션 선택 처리
		const handleSelect = useCallback(
			(optionValue: string | number) => {
				setSelectedValue(optionValue);
				setIsOpen(false);

				// React Hook Form 연동
				if (register?.onChange) {
					register.onChange({
						target: { name: register.name, value: optionValue }
					});
				}

				// 외부 콜백 호출
				onChange?.(optionValue);
			},
			[register, onChange]
		);

		// 토글 처리
		const handleToggle = useCallback(
			(e: React.MouseEvent) => {
				// TODO: 드롭박스 안열려서 추가 (논의 필요)
				e?.stopPropagation();
				if (!disabled) {
					setIsOpen(prev => !prev);
				}
			},
			[disabled]
		);

		return (
			<div ref={ref} className={`relative ${className}`}>
				{/* React Hook Form을 위한 hidden input */}
				{register && <input type="hidden" {...register} value={displayValue} readOnly />}

				{/* 셀렉트 버튼 */}
				<BasicSelectButton
					expanded={expanded}
					placeholder={placeholder}
					disabled={disabled}
					value={displayValue}
					displayText={selectedOption?.text}
					isOpen={isOpen}
					onClick={handleToggle}
					className="overflow-hidden">
					{children}
				</BasicSelectButton>

				{/* 드롭다운 */}
				{isOpen && (
					<BasicDropbox
						ref={containerRef as React.RefObject<HTMLDivElement>}
						options={options}
						callbackOnclick={handleSelect}
						selectedValue={displayValue}
						isLarge={expanded}
						className="left-0"
					/>
				)}
			</div>
		);
	}
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
