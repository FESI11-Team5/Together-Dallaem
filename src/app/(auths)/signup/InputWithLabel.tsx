import type { InputProps } from '@/components/commons/BasicInput';
import BasicInput from '@/components/commons/BasicInput';

interface InputWithLabelProps extends InputProps {
	label: string;
}

export function InputWithLabel({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	required = false,
	isValid = true,
	invalidText = '',
	value = '',
	label
}: InputWithLabelProps) {
	return (
		<div className="flex flex-col gap-2">
			<label className='text-sm font-semibold' htmlFor={label}>{label}</label>
			<BasicInput
				id={label}
				placeholder={placeholder}
				isPassword={isPassword}
				className={className}
				register={register}
				required={required}
				isValid={isValid}
				invalidText={invalidText}
				value={value}>
				{children}
			</BasicInput>
		</div>
	);
}
