import Image from 'next/image';
import { useCallback, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
	/** 입력창의 placeholder 텍스트 */
	placeholder: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용(value, onChange, onBlur 등) */
	register?: UseFormRegisterReturn;
	/** 입력창 내부에 추가될 자식 요소(아이콘 등) */
	children?: React.ReactNode;
	/** 커스텀 CSS 클래스 추가 가능 */
	className?: string;
	/** 비밀번호인지 여부 (비밀번호 표시/숨기기 기능) */
	isPassword?: boolean;
	/** 필수 입력값 여부(한번 focus 후 비어 있을 시 표시) */
	required?: boolean;
	/** 유효성 검사 통과 여부(false일 시 invalidText와 함께 빨간 테두리 표시) */
	isValid?: boolean;
	/** 유효하지 않을 때 표시할 에러 메시지 */
	invalidText?: string;
	/** input의 value */
	value?: string; //register가 이미 있지만 required 체크를 위해 추가(register에서 직접 value를 불러올 방법이 없음)
	/** input의 id */
	id: string;
	/** input의 label */
	label: string;
}

/**
 * 기본 입력창 컴포넌트
 *
 * 텍스트 입력, 비밀번호 입력, 유효성 검사, 에러 메시지 등의 기능을 포함합니다.
 * React Hook Form과 호환됩니다.
 *
 * @param props - InputProps 객체
 * @returns JSX.Element
 *
 * @example
 * // 기본 입력창
 * <BasicInput placeholder="이름을 입력하세요" />
 *
 * @example
 * // 비밀번호 입력창
 * <BasicInput
 *   isPassword
 *   placeholder="비밀번호를 입력하세요"
 * />
 *
 * @example
 * // React Hook Form register와 함께 사용
 * <BasicInput
 *   register={register('id')}
 *   placeholder="아이디"
 *   required
 *   isValid={watch('id')?.length >= 3}
 *   invalidText="아이디는 3글자 이상 입력해주세요"
 * />
 */

export default function BasicInput({
	children,
	placeholder,
	isPassword = false,
	register,
	className = '',
	required = false,
	isValid = true,
	invalidText = '',
	value = '',
	id = '',
	label = ''
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPw, setIsShowPw] = useState(false);
	const [touched, setTouched] = useState(false);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			setTouched(true);
			setIsFocused(false);

			if (register?.onBlur) {
				register.onBlur(e);
			}
		},
		[register]
	);

	const getBorderClass = () => {
		if (!isValid) return 'border-red-600';
		else if (required && touched && value.length === 0)
			return 'border-red-600'; // register가 없을 때만 체크
		else if (isFocused) return 'border-orange-300';
		return 'border-gray-50';
	};

	const getErrorMessage = useCallback(() => {
		// required이고 값이 비어있는 경우
		if (required && value.length === 0) {
			return '입력해주세요.';
		}
		// 유효하지 않은 경우
		else if (!isValid && invalidText) {
			return invalidText;
		}

		// 에러가 없는 경우 아무것도 표시하지 않음
		return null;
	}, [required, value, isValid, invalidText]);

	return (
		<div className="flex flex-col gap-2">
			<label className="mb-[4px] text-[16px] font-[600] text-gray-800" htmlFor={id}>
				{label}
			</label>
			<div
				className={`inputBox box-border flex items-center justify-between rounded-[12px] border-2 bg-gray-50 px-[16px] py-[10px] placeholder-gray-400 focus:outline-none ${getBorderClass()} ${className}`}>
				<input
					id={id}
					type={isPassword ? (isShowPw ? 'text' : 'password') : 'text'}
					placeholder={placeholder}
					className="w-full bg-transparent outline-none"
					{...register}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required={required}
				/>
				{isPassword && (
					<Image
						src={`/icons/visibility_${isShowPw ? 'on' : 'off'}.svg`}
						width="20"
						height="20"
						alt="password visible toggle button"
						onClick={() => setIsShowPw(prev => !prev)}
						className="cursor-pointer"
					/>
				)}
				{children}
			</div>

			{(() => {
				const errorMessage = getErrorMessage();
				return touched && errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>;
			})()}
		</div>
	);
}
