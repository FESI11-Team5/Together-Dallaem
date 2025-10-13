export default function Tag({ text, isLarge = true }: { text: string; isLarge?: boolean }) {
	return (
		<div
			className={`flex items-center justify-center gap-[4px] rounded-bl-[12px] bg-orange-600 py-[4px] pr-[10px] pl-[8px] text-white ${isLarge ? 'w-[123px] rounded-tr-[22px] pr-[16px]' : 'w-[117px] rounded-tr-[12px] pr-[12px]'}`}>
			<img src="/icons/alarm.svg" alt="clock icon" className="h-[24px] w-[24px]" />
			<span className={`text-[12px] font-semibold`}>{text}</span>
		</div>
	);
}
