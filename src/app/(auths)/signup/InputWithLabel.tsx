import type { InputProps } from './BasicInput';
import BasicInput from './BasicInput';

interface InputWithLabelProps extends InputProps {
	/** 라벨명 */
	label: string;
}

/**
 * `BasicInput` 컴포넌트를 확장한 라벨 포함 입력 컴포넌트입니다.
 *
 * @description
 * - `label`을 기반으로 `<label>`과 `<input>`을 연결(`htmlFor` / `id`)합니다.
 * - `BasicInput`의 모든 props를 상속받아 동일한 동작을 합니다.
 *
 * @extends InputProps
 * @prop {string} label - 라벨에 표시할 텍스트이며, 내부 input의 id 및 label의 htmlFor로 사용됩니다.
 */
export function InputWithLabel({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	invalidText = '',
	label,
	onDebouncedBlur
}: InputWithLabelProps) {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-sm font-semibold" htmlFor={label}>
				{label}
			</label>
			<BasicInput
				id={label}
				placeholder={placeholder}
				isPassword={isPassword}
				className={className}
				register={register}
				invalidText={invalidText}
				onDebouncedBlur={onDebouncedBlur}>
				{children}
			</BasicInput>
		</div>
	);
}
