//figma button component

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	mainColor?: 'orange-600' | 'orange-700' | 'orange-800';
	isLarge?: boolean;
	isActive?: boolean;
	outlined?: boolean;
	className?: string;
}

export default function BasicButton({
	children,
	onClick,
	mainColor = 'orange-600',
	isLarge = false,
	isActive = true,
	outlined = false,
	className = ''
}: ButtonProps) {
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
			className={`font-pretendard font-weight-semibold box-border rounded-[12px] border-1 py-[10px] text-[16px] no-underline ${isLarge ? 'w-full' : 'w-[120px]'} ${classByStatus} ${isActive ? 'cursor-pointer' : 'cursor-default'} ${className}`}>
			{children}
		</button>
	);
}
