interface ChipInfoProps {
	text: string;
	textColor: 'white' | 'primary';
}

export default function ChipInfo({ text, textColor = 'white' }: ChipInfoProps) {
	return (
		<div
			className={`rounded-[4px] bg-gray-900 px-[8px] py-[2px] ${textColor === 'white' ? 'text-white' : 'text-primary-600'}`}>
			<span className={`text-sm font-medium`}>{text}</span>
		</div>
	);
}
