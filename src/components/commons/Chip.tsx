import { findAllByTestId } from 'storybook/internal/test';

/**
 * Chip 컴포넌트의 Props 인터페이스
 */
interface ChipProps {
	/** 칩에 표시될 텍스트 */
	text: string;
	/** 칩의 크기 여부 (true: 큰 사이즈, false: 작은 사이즈) */
	isLarge?: boolean;
	/** 칩의 활성화 상태 여부 (true: 어두운 배경, false: 밝은 배경) */
	isActive?: boolean;
}

/**
 * 필터나 태그를 표시하는 칩 컴포넌트
 *
 * @description
 * - 선택 가능한 필터나 카테고리 표시에 사용
 * - 활성화 상태에 따라 배경색과 텍스트 색상이 변경됨
 * - 두 가지 크기 제공 (큰 사이즈, 작은 사이즈)
 *
 * @example
 * ```tsx
 * <Chip text="달램핏" isActive={true} isLarge={false} />
 * ```
 */
export default function Chip({ text, isLarge = false, isActive = false }: ChipProps) {
	return (
		<div
			className={`rounded-[12px] ${isLarge ? 'px-[16px] py-[10px]' : 'px-[12px] py-[8px]'} ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
			<span className={`text-sm font-medium`}>{text}</span>
		</div>
	);
}
