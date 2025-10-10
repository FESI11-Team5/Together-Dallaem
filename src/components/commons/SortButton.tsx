import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import BasicDropbox, { OptionType } from './BasicDropbox';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

interface SortButtonProps {
	/** 선택 항목들의 배열 */
	options: OptionType[];
	/** 추가할 커스텀 CSS 클래스명(너비, 높이 등 변경 가능) */
	className?: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용 */
	register?: UseFormRegisterReturn;
	/** 기본 placeholder 텍스트 */
	defaultValue?: string;
}

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
