export default function Tag({ text }: { text: string }) {
	return (
		<div
			className={`mb:rounded-tr-none mb:pr-[10px] mb:w-[117px] z-base absolute top-0 right-0 flex w-[123px] items-center justify-center gap-[4px] rounded-tr-[22px] rounded-bl-[12px] bg-primary-600 py-[4px] pr-[16px] pl-[8px] text-white`}>
			<img src="/icons/alarm.svg" alt="clock icon" className="h-[24px] w-[24px]" />
			<span className={`text-[12px] font-semibold whitespace-nowrap`}>{text}</span>
		</div>
	);
}
