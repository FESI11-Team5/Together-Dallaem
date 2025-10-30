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
	let classByStatus = '';
	if (outlined) {
		classByStatus = isActive
			? `bg-black text-primary-400 border-2 border-primary-400`
			: `border-gray-400 text-gray-400 bg-white`;
	} else {
		classByStatus = isActive
			? `bg-primary-400 text-black shadow-[0_0_20px_rgba(5,242,219,0.5)] group-hover:shadow-[0_0_30px_rgba(5,242,219,0.7)]`
			: `bg-gray-400 text-white`;
	}

	return (
		<div
			className={`group ${className} relative h-10 ${isLarge ? 'w-full text-base' : 'w-[120px] text-sm'} cursor-pointer`}>
			{isActive && outlined && (
				<div
					className={`bg-primary-400 absolute -inset-0 translate-x-0.5 translate-y-0.5 rounded-lg opacity-40 blur transition duration-400 group-hover:opacity-100 ${isActive ? 'group-hover:translate-x-0 group-hover:translate-y-0' : ''}`}></div>
			)}
			{isActive && (
				<div className="bg-primary-400 absolute -inset-0 rounded-lg opacity-20 blur-xl transition duration-400 group-hover:opacity-40 group-hover:blur-2xl"></div>
			)}
			<button
				onClick={onClick}
				disabled={!isActive}
				{...rest}
				//prettier-ignore
				className={`
				w-full
	
				relative font-pretendard font-semibold box-border
				rounded-[12px] py-4 no-underline leading-none 
				transition duration-400 text-white
				${classByStatus}
				${isActive ? 'cursor-pointer ' : 'cursor-default'}
		
			`}
				aria-label={ariaLabel}>
				{children}
			</button>
		</div>
	);
}
