import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import BasicDropbox, { OptionType } from './basic/BasicDropbox';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

/**
 * SortButton 컴포넌트의 Props 인터페이스
 */
interface SortButtonProps {
	/** 선택 항목들의 배열 */
	options: OptionType[];
	/** 추가할 커스텀 CSS 클래스명(너비, 높이 등 변경 가능) */
	className?: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용 */
	register?: UseFormRegisterReturn;
	/** 기본 선택값 */
	defaultValue?: string;
}

/**
 * 정렬 옵션을 선택할 수 있는 드롭다운 버튼 컴포넌트(selectBox와는 icon,placeholder 등이 사소하게 달라서 아예 새로 생성했습니다)
 *
 * @description
 * - 정렬 아이콘과 함께 선택된 옵션을 표시
 * - BasicDropbox 컴포넌트를 사용하여 옵션 목록 표시
 * - React Hook Form과 통합 가능
 * - 외부 클릭 시 자동으로 드롭다운 닫힘
 *
 * @example
 * ```tsx
 * <SortButton
 *   options={[
 *     { value: 'newest', text: '최신순' },
 *     { value: 'popular', text: '인기순' }
 *   ]}
 *   defaultValue="newest"
 * />
 * ```
 */
export default function SortButton({ options, register, defaultValue, className }: SortButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | number>('');
	const containerRef = useRef<HTMLDivElement>(null);
	const formContext = useFormContext();
	const currentValue = register?.name ? formContext?.watch(register.name) : '';

	const selectedOption = useMemo(
		() => options.find(option => (selectedValue ? option.value === selectedValue : option.value === defaultValue)),
		[options, selectedValue, defaultValue]
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

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`${className} mb:w-auto mb:px-3 mb:py-2 relative box-border flex w-[36px] cursor-pointer items-center justify-between gap-[4px] rounded-[12px] border-2 border-gray-100 p-1.5`}>
				<img src="/icons/sort.svg" alt="sort button" className="h-[24px] w-[24px]" />
				<span className="mb:inline font-gray-800 hidden text-[14px]">{selectedOption && selectedOption.text}</span>
			</button>
			{isOpen && (
				<BasicDropbox
					ref={containerRef as React.RefObject<HTMLDivElement>}
					options={options}
					updateValue={handleSelect}
					selectedValue={selectedValue || defaultValue}
				/>
			)}
		</div>
	);
}
