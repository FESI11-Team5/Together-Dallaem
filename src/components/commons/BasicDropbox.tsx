import { useCallback, useState } from 'react';

/** 드롭다운되는 선택 항목들의 타입 */
export interface OptionType {
	/** 옵션의 value (내부적으로 사용) */
	value: string | number;
	/** 사용자에게 표시될 텍스트 */
	text: string;
}

export default function BasicDropbox({
	options = [],
	updateValue,
	ref,
	isLarge = false,
	selectedValue = ''
}: {
	options: OptionType[];
	updateValue: (value: string | number) => void;
	ref?: React.RefObject<HTMLDivElement>;
	isLarge?: boolean;
	selectedValue?: string | number;
}) {
	const handleSelect = useCallback(
		(optionValue: string | number) => {
			updateValue(optionValue);
		},
		[updateValue]
	);

	return (
		<div
			ref={ref}
			className={`absolute top-full right-0 left-0 z-50 mt-1 max-h-60 ${isLarge ? 'w-full' : 'w-[110px]'} overflow-y-auto rounded-[12px] border border-gray-200 bg-white shadow-xl`}
			role="listbox"
			aria-label="옵션 목록">
			{options.map(option => (
				<button
					key={`${option.value}-${option.text}`}
					type="button"
					className="w-full p-[4px] text-gray-800 first:rounded-t-[12px] last:rounded-b-[12px] hover:bg-gray-200"
					onClick={() => handleSelect(option.value)}
					role="option"
					aria-selected={selectedValue === option.value}>
					<div
						className={`rounded-[12px] py-[6px] pl-[8px] text-left text-[14px] ${selectedValue === option.value ? 'bg-orange-100 font-medium' : ''}`}>
						{option.text}
					</div>
				</button>
			))}
		</div>
	);
}
