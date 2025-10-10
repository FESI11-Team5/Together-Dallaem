import Image from 'next/image';
import BasicProgressBar from './basic/BasicProgressBar';
import { useRouter } from 'next/navigation';

interface ProgressBarProps {
	data: {
		totalNumber: number;
		currentNumber: number;
	};
	isConfirmed?: boolean;
	linkTo?: string;
}

export default function ProgressBar({ data, isConfirmed, linkTo }: ProgressBarProps) {
	const router = useRouter();
	const progressPercentage = (data.currentNumber / data.totalNumber) * 100;
	const isFull = progressPercentage === 100;

	return (
		<div className="relative flex w-full items-end justify-between gap-[24px]">
			<div className="flex flex-1 flex-col items-start justify-between">
				<div
					className={`mb-2 flex items-center gap-[2px] text-xs font-light ${isFull ? 'text-orange-400' : 'text-gray-700'}`}>
					<Image src={`/icons/person${isFull ? '_full' : ''}.svg`} alt="number of people" width={16} height={16} />
					<span className="h-[11px] text-[14px] leading-none font-[500]">
						{data.currentNumber}/{data.totalNumber}
					</span>
					{isConfirmed && !isFull && (
						<div className="ml-[8px] flex items-center gap-[4px] text-orange-500">
							<Image src="/icons/check_round.svg" alt="check" width={24} height={24} />
							<span className="h-[18px] text-sm font-medium">개설확정</span>
						</div>
					)}
				</div>
				<BasicProgressBar data={data} />
			</div>
			<div className="text-base font-semibold">
				{isFull ? (
					<div className="text-base font-semibold text-orange-400">Closed</div>
				) : (
					<div
						className="flex cursor-pointer items-center gap-[8px] text-orange-600"
						onClick={() => linkTo && router.push(linkTo)}>
						join now
						<div className="text-orange-600">
							<Image src="/icons/arrow_right.svg" alt="arrow-right" width={16} height={16} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
