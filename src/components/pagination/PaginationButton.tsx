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
/**
 *
 * @param param0 - 버튼에 필요한 속성들
 * @returns
 * @example
 * <PaginationButton isActive={true} onClick={() => console.log('Clicked!')}>1</PaginationButton>
 */
export default function PaginationButton({ children, isActive, disabled, onClick }: PaginationButtonProps) {
	const activeClass = isActive ? 'text-black font-semibold' : 'text-gray-200 font-regular hover:text-black';
	const disabledClass = disabled ? 'cursor-not-allowed' : 'hover:cursor-pointer';
	const basicClass =
		'flex items-center justify-center rounded-[8px] bg-gray-50 text-base leading-lg ' +
		'h-[34px] w-[34px] md:h-[48px] md:w-[48px]';
	return (
		<button className={`${disabledClass} ${activeClass} ${basicClass}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}
