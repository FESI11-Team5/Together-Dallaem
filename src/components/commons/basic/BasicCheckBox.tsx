import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface BasicCheckBoxProps {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	title?: string;
	content?: string;
	isLarge?: boolean;
	register?: UseFormRegisterReturn;
}

export default function BasicCheckBox({
	checked = false,
	onChange,
	title,
	content,
	isLarge = true,
	register
}: BasicCheckBoxProps) {
	const [isChecked, setIsChecked] = useState(checked);

	const handleClick = () => {
		const newChecked = !isChecked;
		setIsChecked(newChecked);
		onChange?.(newChecked);

		if (register?.onChange) {
			const syntheticEvent = {
				target: { checked: newChecked, value: newChecked.toString() },
				currentTarget: { checked: newChecked, value: newChecked.toString() }
			} as React.ChangeEvent<HTMLInputElement>;
			register.onChange(syntheticEvent);
		}
	};

	return (
		<div
			className={`flex h-[70px] w-full max-w-[160px] cursor-pointer items-start gap-2 rounded-[8px] ${isChecked ? 'bg-gray-900' : 'bg-gray-50'} ${isLarge ? 'pt-[12px] pr-[20px] pb-[16px] pl-[16px]' : 'pt-[6px] pr-[20px] pb-[30px] pl-[6px]'}`}
			onClick={handleClick}>
			<input type="checkbox" className="hidden" checked={isChecked} onChange={() => {}} {...register} />
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
