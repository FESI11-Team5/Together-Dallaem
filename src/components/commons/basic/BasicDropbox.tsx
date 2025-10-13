import { useCallback, useState } from 'react';

/**
 * 드롭다운되는 선택 항목들의 타입
 */
export interface OptionType {
	/** 옵션의 value (내부적으로 사용) */
	value: string | number;
	/** 사용자에게 표시될 텍스트 */
	text: string;
}

/**
 * BasicDropbox 컴포넌트의 Props 인터페이스
 */
interface BasicDropboxProps {
	/** 드롭다운에 표시될 옵션 목록 */
	options: OptionType[];
	/** 옵션 선택 시 호출되는 콜백 함수 */
	updateValue: (value: string | number) => void;
	/** 드롭박스 컨테이너의 ref 객체 */
	ref?: React.RefObject<HTMLDivElement>;
	/** 드롭박스의 크기 여부 (true: 전체 너비, false: 110px 고정) */
	isLarge?: boolean;
	/** 현재 선택된 옵션의 value */
	selectedValue?: string | number;
}

/**
 * 드롭다운 옵션 목록을 표시하는 컴포넌트
 *
 * @description
 * - SortButton 등의 선택 컴포넌트와 함께 사용
 * - 선택된 옵션은 하이라이트 표시됨
 * - 스크롤 가능한 옵션 리스트 제공
 *
 * @example
 * ```tsx
 * <BasicDropbox
 *   options={[
 *     { value: 'newest', text: '최신순' },
 *     { value: 'oldest', text: '오래된순' }
 *   ]}
 *   updateValue={(value) => console.log(value)}
 *   selectedValue="newest"
 * />
 * ```
 */
export default function BasicDropbox({
	options = [],
	updateValue,
	ref,
	isLarge = false,
	selectedValue = ''
}: BasicDropboxProps) {
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
