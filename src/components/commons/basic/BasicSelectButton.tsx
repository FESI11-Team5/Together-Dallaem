'use client';

import { cn } from '@/utils/cn';
import { forwardRef, useMemo } from 'react';

interface BasicSelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** 사이즈 Props, expanded: 너비 부모 컨텐츠를 꽉 채움, 높이 44px, large: 너비 120px 높이 40px, small: 너비 110px 높이 30px */
	expanded?: boolean;
	/** 기본 placeholder 텍스트 */
	placeholder?: string;
	/** 현재 선택된 값 */
	value?: string;
	/** 현재 선택된 옵션의 텍스트 */
	displayText?: string;
	/** 드롭다운 열림/닫힘 상태 */
	isOpen?: boolean;
	/** 셀렉트박스 내부에 삽입할 콘텐츠(sortSelectBox의 아이콘 같은 것) */
	children?: React.ReactNode;
	/** 드롭박스 오픈 시 어느 쪽으로 열리는지 */
	side?: 'bottom' | 'right';
}

/**
 * 기본 셀렉트 버튼 컴포넌트 (순수 UI 컴포넌트)
 *
 * 셀렉트박스의 버튼 부분만 담당하는 순수 UI 컴포넌트입니다.
 * 상태 관리는 상위 컴포넌트에서 처리해야 합니다.
 *
 * @param props - BasicSelectButtonProps 객체
 * @param ref - 포워드할 ref
 * @returns JSX.Element
 *
 * @example
 * // 기본 사용
 * <BasicSelectButton
 *   placeholder="선택하세요"
 *   onClick={() => setIsOpen(!isOpen)}
 * />
 *
 * @example
 * // 선택된 상태
 * <BasicSelectButton
 *   placeholder="선택하세요"
 *   value="option1"
 *   displayText="옵션 1"
 *   isOpen={true}
 *   onClick={() => setIsOpen(!isOpen)}
 * />
 */
const BasicSelectButton = forwardRef<HTMLButtonElement, BasicSelectButtonProps>(
	(
		{
			expanded = false,
			className = '',
			placeholder = '선택하세요',
			disabled = false,
			value,
			displayText,
			isOpen = false,
			side = 'bottom',
			children,
			onClick,
			...rest
		},
		ref
	) => {
		const hasValue = Boolean(value || displayText);

		//props에 따른 selectbutton 클래스 설정
		const buttonClasses = useMemo(() => {
			// 너비 및 높이 설정
			const widthHeight = expanded
				? 'w-full h-[44px] border-primary-400 border-primary-400'
				: 'w-[110px] h-[36px] mb:h-[40px]';

			// 배경색 설정
			const backgroundColor = hasValue
				? 'text-primary-400 shadow-primary-500/50 shadow-lg border-primary-400'
				: expanded
					? 'text-white border-primary-400'
					: 'text-white border-white';

			return `${widthHeight} bg-root border-2 border-primary-300 rounded-[12px] px-[12px] py-[6px] mb:py-[8px] font-medium outline-none box-border ${
				disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
			} flex items-center justify-between text-left ${backgroundColor}`;
		}, [expanded, disabled, hasValue]);

		const arrowClasses = useMemo(
			() =>
				`h-[24px] w-[24px] bg-[length:24px_24px] ml-[-2px] bg-center bg-no-repeat transition-transform duration-200 ease-in-out bg-[url('/icons/arrow_invert.svg')] ${
					disabled ? 'hidden' : 'block'
				}
				${side === 'bottom' && (isOpen ? 'rotate-180' : 'rotate-0')}
				${side === 'right' && (isOpen ? 'rotate-90' : 'rotate-270')}
				}`,
			[disabled, isOpen, hasValue, expanded, side]
		);

		const textColor = useMemo(() => {
			return hasValue ? 'text-primary-400' : 'text-white';
		}, [expanded, hasValue]);

		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					`${buttonClasses} ${className}`,
					'[text-shadow:0_0_4px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_40px_#e6fffa]'
				)}
				onClick={onClick}
				disabled={disabled}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label={displayText ? `선택됨: ${displayText}` : placeholder}
				{...rest}>
				<span className={`${textColor} text-[14px]`}>
					{children}
					{displayText || placeholder}
				</span>
				<div className={arrowClasses} />
			</button>
		);
	}
);

BasicSelectButton.displayName = 'BasicSelectButton';

export default BasicSelectButton;
