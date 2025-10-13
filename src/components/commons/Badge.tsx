export default function Badge({ num }: { num: number }) {
	const showText = num > 999 ? '999+' : num;

	return (
		<div
			className={`inline-flex h-[17px] w-auto items-center justify-center rounded-[8.5px] bg-gray-900 px-[7px] py-0 text-xs leading-[16px] font-semibold text-white`}>
			{showText}
		</div>
	);
}
