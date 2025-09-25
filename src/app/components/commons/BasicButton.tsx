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
		classByStatus = isActive ? `bg-${mainColor} text-white` : `bg-gray-400 text-white`;
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
