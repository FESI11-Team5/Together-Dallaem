import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

interface PaginationButtonProps {
	/** 버튼의 자식 요소 */
	children: React.ReactNode;
	/** 현재 페이지 여부 */
	isActive?: boolean;
	/** 비활성화 여부 */
	disabled?: boolean;
	/** 클릭 이벤트 핸들러 */
	onClick?: () => void;
}

/** 버튼의 스타일 변형 */
const paginationButtonVariants = cva(
	//기본 버튼 클래스
	'flex items-center justify-center rounded-[8px] text-base leading-lg mt-2 hover:bg-primary-600 transition-bg duration-200 ease-in-out' +
		'h-[34px] w-[34px] md:h-12 md:w-12',
	{
		variants: {
			variant: {
				active: 'text-root font-semibold bg-primary-500 rounded-lg',
				inactive: 'text-white font-regular'
			},

			state: {
				enabled: 'hover:cursor-pointer',
				disabled: 'cursor-not-allowed'
			},

			defaultVariants: {
				variant: 'inactive',
				state: 'enabled'
			}
		}
	}
);

/**
 *
 * @param param0 - 버튼에 필요한 속성들
 * @returns
 * @example
 * <PaginationButton isActive={true} onClick={() => console.log('Clicked!')}>1</PaginationButton>
 */
export default function PaginationButton({ children, isActive, disabled, onClick }: PaginationButtonProps) {
	return (
		<button
			className={cn(
				paginationButtonVariants({
					variant: isActive ? 'active' : 'inactive',
					state: disabled ? 'disabled' : 'enabled'
				})
			)}
			onClick={onClick}
			disabled={disabled}>
			{children}
		</button>
	);
}
