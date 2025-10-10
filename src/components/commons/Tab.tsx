import { useState, useRef, useEffect } from 'react';

interface TabOption {
	value: string;
	text: string;
	icon: string;
}

interface TabProps {
	options: TabOption[];
	selectedTab: string;
	onTabChange: (tabId: string) => void;
	className?: string;
}

export default function Tab({ options, selectedTab, onTabChange, className }: TabProps) {
	const [indicatorStyle, setIndicatorStyle] = useState<{
		left: number;
		width: number;
	}>({ left: 0, width: 0 });
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		const updateIndicator = () => {
			//클릭에 따라 인디케이터 위치 변경
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
			<div className="flex gap-8">
				{options.map((option, index) => (
					<button
						key={option.value}
						ref={el => {
							tabRefs.current[index] = el;
						}}
						onClick={() => onTabChange(option.value)}
						className={`relative flex cursor-pointer items-center gap-2 pb-3 text-sm font-medium transition-colors duration-200 ${
							selectedTab === option.value ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'
						} `}>
						<span>{option.text}</span>
						{option.icon && (
							<img
								src={option.icon}
								alt={option.text}
								className={`h-6 w-6 transition-colors duration-200 ${
									selectedTab === option.value ? 'opacity-100' : 'opacity-60'
								}`}
							/>
						)}
					</button>
				))}
			</div>

			{/* 애니메이션 막대 */}
			<div
				className="absolute bottom-0 h-0.5 bg-gray-800 transition-all duration-300 ease-out"
				style={{
					left: `${indicatorStyle.left}px`,
					width: `${indicatorStyle.width}px`
				}}
			/>
		</div>
	);
}
