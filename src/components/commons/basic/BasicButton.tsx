interface ButtonProps {
	/** 버튼 내부에 표시될 텍스트 또는 요소 */
	children: React.ReactNode;
	/** 버튼 클릭 시 실행될 함수, Form 사용시 button의 onClick이 자동으로 호출되므로 선택사항으로 둠 */
	onClick?: () => void;
	/** 버튼의 기본 색상 (orange-600, orange-700, orange-800 중 선택) */
	mainColor?: 'orange-600' | 'orange-700' | 'orange-800';
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
	mainColor = 'orange-600',
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
			? `border-${mainColor} text-${mainColor} bg-white`
			: `border-gray-400 text-gray-400 bg-white`;
	} else {
		// tailwind css가 dynamic class를 인식하지 못하는 버그가 있어 prop별로 컬러 클래스 할당
		if (isActive) {
			if (mainColor === 'orange-600') {
				classByStatus = isActive ? `bg-orange-600 text-white` : `bg-gray-400 text-white`;
			} else if (mainColor === 'orange-700') {
				classByStatus = isActive ? `bg-orange-700 text-white` : `bg-gray-400 text-white`;
			} else if (mainColor === 'orange-800') {
				classByStatus = isActive ? `bg-orange-800 text-white` : `bg-gray-400 text-white`;
			}
		} else {
			classByStatus = `bg-gray-400 text-white`;
		}
	}

	return (
		<button
			onClick={onClick}
			disabled={!isActive}
			{...rest}
			//prettier-ignore
			className={`
				font-pretendard font-weight-semibold box-border
				rounded-[12px] border-1 py-[10px] text-[16px] no-underline
				${isLarge ? 'w-full' : 'w-[120px]'}
				${classByStatus}
				${isActive ? 'cursor-pointer' : 'cursor-default'}
				${className}
			`}
			aria-label={ariaLabel}>
			{children}
		</button>
	);
}
