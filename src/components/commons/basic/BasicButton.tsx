import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

export const basicButtonVariants = cva(
	// base classes applied to the <button>
	'w-full h-full relative font-pretendard font-semibold box-border rounded-[12px] py-2.5 no-underline leading-none transition duration-400',
	{
		variants: {
			variant: {
				solid: 'text-white',
				outlined: 'bg-root'
			},
			active: {
				true: 'cursor-pointer',
				false: 'cursor-default'
			},
			size: {
				md: 'text-sm',
				lg: 'text-base'
			}
		},
		compoundVariants: [
			{
				variant: 'solid',
				active: true,
				class: 'bg-primary-600 shadow-[0_0_20px_rgba(5,242,219,0.5)] group-hover:shadow-[0_0_30px_rgba(5,242,219,0.7)]'
			},
			{
				variant: 'solid',
				active: false,
				class: 'bg-gray-400'
			},
			{
				variant: 'outlined',
				active: true,
				class: 'text-primary-400 border-2 border-primary-400'
			},
			{
				variant: 'outlined',
				active: false,
				class: 'border-gray-400 text-gray-400'
			}
		],
		defaultVariants: {
			variant: 'solid',
			active: true,
			size: 'md'
		}
	}
);

const buttonShadowVariants = cva('absolute rounded-lg transition duration-400 bg-primary-400', {
	variants: {
		variant: {
			solid: '-inset-1 opacity-20 group-hover:blur-2xl blur-xl',
			outlined: '-inset-0.5 opacity-0 group-hover:opacity-70 blur-sm'
		}
	}
});

interface ButtonProps {
	/** 버튼 내부에 표시될 텍스트 또는 요소 */
	children: React.ReactNode;
	/** 버튼 클릭 시 실행될 함수, Form 사용시 button의 onClick이 자동으로 호출되므로 선택사항으로 둠 */
	onClick?: () => void;
	/** 버튼을 부모 요소의 전체 너비로 확장할지 여부 */
	isLarge?: boolean;
	/** 버튼의 활성화 상태 (false일 경우 버튼이 비활성화됨) */
	isActive?: boolean;
	/** 아웃라인 스타일 적용 여부 */
	outlined?: boolean;
	/** 추가할 커스텀 CSS 클래스명 */
	className?: string;
	/** aria-label */
	ariaLabel?: string;
}

/**
 * 재사용 가능한 기본 버튼 컴포넌트
 *
 * 다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.
 * 아웃라인, 전체 너비, 비활성화 등의 옵션을 제공합니다.
 *
 * @param props - ButtonProps 객체
 * @returns JSX.Element
 *
 * @example
 * // 기본 사용법
 * <BasicButton onClick={handleClick}>
 *   클릭하세요
 * </BasicButton>
 *
 * @example
 * // 아웃라인 버튼
 * <BasicButton outlined onClick={handleCancel}>
 *   취소
 * </BasicButton>
 *
 * @example
 * // 전체 너비 비활성 버튼
 * <BasicButton
 *   isLarge
 *   isActive={false}
 *   onClick={handleSubmit}
 * >
 *   제출할 수 없음
 * </BasicButton>
 */

type button = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BasicButton({
	children,
	onClick = () => {},
	isLarge = false,
	isActive = true,
	outlined = false,
	className = '',
	ariaLabel = '',
	...rest
}: button) {
	const variant = outlined ? 'outlined' : 'solid';

	return (
		<div className={`group relative ${className} ${isLarge ? 'w-full' : 'mb:w-[115px] w-[80px]'}`}>
			<div className={buttonShadowVariants({ variant: variant as 'solid' | 'outlined' })}></div>
			<button
				onClick={onClick}
				disabled={!isActive}
				{...rest}
				className={cn(
					basicButtonVariants({
						variant: variant as 'solid' | 'outlined',
						active: isActive,
						size: isLarge ? 'lg' : 'md'
					})
				)}
				aria-label={ariaLabel}>
				{children}
			</button>
		</div>
	);
}
