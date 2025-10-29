import { useEffect, useRef, useState } from 'react';

/**
 * 탭 옵션의 타입 정의
 */
export interface TabOption {
	/** 탭의 고유 식별값 */
	value: string;
	/** 탭에 표시될 텍스트 */
	text: string;
	/** 탭에 표시될 아이콘 경로 */
	icon: string;
}

/**
 * Tab 컴포넌트의 Props 인터페이스
 */
interface TabProps {
	/** 탭 옵션 목록 */
	options: TabOption[];
	/** 현재 선택된 탭의 value */
	selectedTab: string;
	/** 탭 변경 시 호출되는 콜백 함수 */
	onTabChange: (tabId: string) => void;
	/** 추가할 커스텀 CSS 클래스명 */
	className?: string;
}

/**
 * 애니메이션 인디케이터가 있는 탭 네비게이션 컴포넌트
 *
 * @description
 * - 선택된 탭 하단에 애니메이션 바 표시
 * - 아이콘과 텍스트를 함께 표시 가능
 * - 윈도우 리사이즈 시 인디케이터 위치 자동 조정
 * - 부드러운 전환 애니메이션 효과
 *
 * @example
 * ```tsx
 * <Tab
 *   options={[
 *     { value: 'all', text: '모두 보기', icon: '/icons/all.svg' },
 *     { value: 'active', text: '진행중', icon: '/icons/active.svg' }
 *   ]}
 *   selectedTab="all"
 *   onTabChange={(tabId) => console.log(tabId)}
 * />
 * ```
 */
export default function Tab({ options, selectedTab, onTabChange, className }: TabProps) {
	const [indicatorStyle, setIndicatorStyle] = useState<{
		left: number;
		width: number;
	}>({ left: 0, width: 0 });
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		/**
		 * 선택된 탭의 위치에 따라 인디케이터의 위치와 너비를 업데이트
		 */
		const updateIndicator = () => {
			const selectedIndex = options.findIndex(option => option.value === selectedTab);
			if (selectedIndex !== -1 && tabRefs.current[selectedIndex]) {
				const selectedTabElement = tabRefs.current[selectedIndex];
				const containerRect = selectedTabElement.parentElement?.getBoundingClientRect();
				const tabRect = selectedTabElement.getBoundingClientRect();

				if (containerRect && tabRect) {
					setIndicatorStyle({
						left: tabRect.left - containerRect.left,
						width: tabRect.width
					});
				}
			}
		};

		// 초기 설정 및 윈도우 리사이즈 시 업데이트
		updateIndicator();
		window.addEventListener('resize', updateIndicator);

		return () => window.removeEventListener('resize', updateIndicator);
	}, [selectedTab, options]);

	return (
		<div className={`relative ${className}`}>
			{/* 피그마에 gap이 12px로 되어있어서 수정 */}
			<div className="flex gap-3">
				{options.map((option, index) => (
					<button
						key={option.value}
						ref={el => {
							tabRefs.current[index] = el;
						}}
						onClick={() => onTabChange(option.value)}
						className={`relative flex cursor-pointer items-center gap-1 pb-[3px] text-sm font-medium transition-colors duration-200 ${
							selectedTab === option.value ? 'text-white' : 'text-gray-400 hover:text-gray-600'
						} `}>
						<span className="text-lg font-semibold text-white">{option.text}</span>
						{option.icon && (
							<img
								src={option.icon}
								alt={option.text}
								className={`h-8 w-8 transition-colors duration-200 ${
									selectedTab === option.value ? 'opacity-100' : 'opacity-60'
								}`}
							/>
						)}
					</button>
				))}
			</div>

			{/* 애니메이션 막대 */}
			<div
				className="bg-primary-400 absolute bottom-0 h-0.5 transition-all duration-300 ease-out"
				style={{
					left: `${indicatorStyle.left}px`,
					width: `${indicatorStyle.width}px`
				}}
			/>
		</div>
	);
}
