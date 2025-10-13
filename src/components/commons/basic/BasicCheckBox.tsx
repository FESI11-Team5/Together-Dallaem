import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * BasicCheckBox 컴포넌트의 Props 인터페이스
 */
interface BasicCheckBoxProps {
	/** 체크박스의 초기 체크 상태 */
	checked?: boolean;
	/** 체크 상태 변경 시 호출되는 콜백 함수 */
	onChange?: (checked: boolean) => void;
	/** 체크박스 상단에 표시될 제목 */
	title?: string;
	/** 체크박스 하단에 표시될 설명 텍스트 */
	content?: string;
	/** 체크박스의 크기 여부 (true: 큰 사이즈, false: 작은 사이즈) */
	isLarge?: boolean;
	/** React Hook Form의 register 객체 */
	register?: UseFormRegisterReturn;
}

/**
 * 커스터마이징 가능한 체크박스 컴포넌트
 *
 * @description
 * - 단독 사용 또는 React Hook Form과 통합 가능
 * - 제목과 설명 텍스트를 함께 표시 가능
 * - 체크 상태에 따라 스타일이 자동으로 변경됨
 *
 * @example
 * ```tsx
 * <BasicCheckBox
 *   title="약관 동의"
 *   content="서비스 이용약관에 동의합니다"
 *   onChange={(checked) => console.log(checked)}
 * />
 * ```
 */

type checkbox = BasicCheckBoxProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function BasicCheckBox({
	checked = false,
	onChange,
	title,
	content,
	isLarge = true,
	register,
	...rest
}: checkbox) {
	const [isChecked, setIsChecked] = useState(checked);

	const handleClick = () => {
		const newChecked = !isChecked;
		setIsChecked(newChecked);
		onChange?.(newChecked);

		if (register?.onChange) {
			const syntheticEvent = {
				target: { checked: newChecked },
				currentTarget: { checked: newChecked }
			} as React.ChangeEvent<HTMLInputElement>;
			register.onChange(syntheticEvent);
		}
	};

	return (
		<div
			className={`flex h-[70px] w-full max-w-[160px] cursor-pointer items-start gap-2 rounded-[8px] ${isChecked ? 'bg-gray-900' : 'bg-gray-50'} ${isLarge ? 'pt-[12px] pr-[20px] pb-[16px] pl-[16px]' : 'pt-[6px] pr-[20px] pb-[30px] pl-[6px]'}`}
			onClick={handleClick}>
			<input type="checkbox" className="hidden" checked={isChecked} {...rest} {...register} />
			<div
				className={`m-[3px] box-border flex h-[18px] w-[18px] items-center justify-center rounded-sm border-1 bg-white ${
					isChecked ? 'border-white' : 'border-gray-200'
				}`}>
				{isChecked && <Image src="/icons/check.svg" alt="check" width={24} height={24} />}
			</div>
			<div className="flex flex-col gap-1">
				{title && (
					<span
						className={`text-base font-semibold break-keep text-gray-700 ${isChecked ? 'text-white' : 'text-gray-700'}`}>
						{title}
					</span>
				)}
				{content && (
					<span
						className={`text-xs font-semibold break-keep text-gray-700 ${isChecked ? 'text-white' : 'text-gray-700'}`}>
						{content}
					</span>
				)}
			</div>
		</div>
	);
}
