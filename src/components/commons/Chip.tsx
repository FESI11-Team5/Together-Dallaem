/**
 * Chip 컴포넌트의 Props 인터페이스
 */
interface ChipProps {
	/** 칩에 표시될 텍스트 */
	text: string;
	imgUrl?: string;
	/** 칩의 활성화 상태 여부 (true: 어두운 배경, false: 밝은 배경) */
	isActive?: boolean;
	onClick?: () => void;
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
export default function Chip({ text, isActive = false, imgUrl, onClick }: ChipProps) {
	return (
		<div className="group relative flex cursor-pointer items-center gap-2">
			{isActive && (
				<div
					className={`bg-primary-400 absolute -inset-1 rounded-lg bg-gradient-to-tr opacity-40 blur transition duration-400 group-hover:opacity-100`}></div>
			)}
			<div
				className={`mb:px-[16px] mb:py-[10px] relative flex cursor-pointer items-center gap-2 rounded-[12px] px-[12px] py-[8px] leading-none transition duration-400 ${isActive ? 'bg-primary-500 text-white' : 'bg-gray-500 text-gray-50'}`}
				onClick={onClick}>
				{imgUrl && <img src={imgUrl} alt="" className="h-5 w-5" />}
				<span className={`text-sm font-medium`}>{text}</span>
			</div>
		</div>
	);
}
