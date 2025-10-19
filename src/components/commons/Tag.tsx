export default function Tag({ text, isLarge = true }: { text: string; isLarge?: boolean }) {
	return (
		<div
			// TODO: rounded-tr-[22px] 부분 논의하기
			className={`flex items-center justify-center gap-[4px] rounded-bl-[12px] bg-orange-600 py-[4px] pl-[8px] text-white ${isLarge ? 'w-[123px] pr-[16px]' : 'w-[117px] pr-[10px]'}`}>
			{/* className={`flex items-center justify-center gap-[4px] rounded-bl-[12px] bg-orange-600 py-[4px] pl-[8px] text-white ${isLarge ? 'w-[123px] rounded-tr-[22px] pr-[16px]' : 'w-[117px] pr-[10px]'}`}> */}
			<img src="/icons/alarm.svg" alt="clock icon" className="h-[24px] w-[24px]" />
			<span className={`text-[12px] font-semibold whitespace-nowrap`}>{text}</span>
		</div>
	);
}
