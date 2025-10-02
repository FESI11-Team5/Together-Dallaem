import { findAllByTestId } from 'storybook/internal/test';

interface ChipProps {
	text: string;
	isLarge?: boolean;
	isActive?: boolean;
}

export default function Chip({ text, isLarge = false, isActive = false }: ChipProps) {
	return (
		<div
			className={`rounded-[12px] ${isLarge ? 'px-[16px] py-[10px]' : 'px-[12px] py-[8px]'} ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}>
			<span className={`text-sm font-medium`}>{text}</span>
		</div>
	);
}
