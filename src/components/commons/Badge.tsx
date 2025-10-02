export default function Badge({ num }: { num: number }) {
	const showText = num > 999 ? '999+' : num;

	return (
		<div className={`flex h-[17px] items-center rounded-[8.5px] bg-gray-900 px-[7px] py-0`}>
			<span className={`text-xs leading-[16px] font-semibold text-white`}>{showText}</span>
		</div>
	);
}
