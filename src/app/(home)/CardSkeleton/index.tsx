'use client';

export default function CardSkeleton() {
	return (
		<div className="tb:gap-0 tb:h-[156px] tb:flex-row flex h-[316px] cursor-pointer flex-col gap-4 overflow-hidden rounded-3xl border-2 border-gray-600 transition-shadow">
			{/* 이미지 */}
			<div className="tb:w-[280px] relative block h-[156px] w-full animate-pulse overflow-hidden bg-gray-700">
				{/* Tag */}
				<div className="absolute top-0 right-0 h-8 w-[123px] rounded-bl-[12px] bg-gray-600" />
			</div>

			{/* 컨텐츠 */}
			<div className="tb:gap-0 flex flex-1 flex-col gap-5 animate-pulse">
				<div className="tb:pt-4 tb:pr-4 tb:pb-[21px] tb:pl-6 flex justify-between px-4">
					<div className="flex flex-col justify-start gap-2">
						{/* Title & Genre */}
						<div className="flex items-center gap-2">
							<div className="h-5 w-30 rounded bg-gray-600" />
							<div className="h-5 w-2 rounded bg-gray-600" />
							<div className="h-4 w-20 rounded bg-gray-600" />
						</div>

						{/* 날짜 & 시간 ChipInfo */}
						<div className="flex gap-2">
							<div className="h-6 w-20 rounded bg-gray-600" />
							<div className="h-6 w-[70px] rounded bg-gray-600" />
						</div>
					</div>

					{/* HeartButton */}
					<div className="size-12 rounded-full border-2 border-gray-600 bg-gray-700" />
				</div>

				{/* ClassProgressBar */}
				<div className="tb:px-6 px-4 pt-2 pb-4">
					<div className="flex flex-col gap-2">
						<div className="h-[14px] w-20 rounded bg-gray-600" />
						<div className="h-[6px] w-full rounded-full bg-gray-700" />
					</div>
				</div>
			</div>
		</div>
	);
}
