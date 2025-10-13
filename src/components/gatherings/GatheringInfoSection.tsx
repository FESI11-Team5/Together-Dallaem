import Image from 'next/image';

/**모임 상세페에지 - 이미지 + 마감정보 */
function GatheringMainImage() {
	return (
		<div className="relative h-full w-full overflow-hidden rounded-[24px]">
			<Image src="/images/example.jpg" alt="사진" fill className="object-cover" />
			<div className="absolute top-0 right-0 z-50 flex items-center justify-center gap-[4px] rounded-[0_22px_0_12px] bg-orange-600 p-[4px_16px_4px_8px]">
				<Image
					src="/icons/alarm_clock.svg"
					width={24}
					height={24}
					alt="알람"
					className="flex items-center justify-center p-[5px_4px_5.667px_5px]"
				/>
				<span className="leading-xs text-center text-xs font-medium text-white">오늘 21시 마감</span>
			</div>
		</div>
	);
}

/**모임 상세페에지 - 메인정보 (제목, 위치, 날짜, 찜)*/
function GatheringMainInfo() {
	return (
		<div className="flex w-full flex-col gap-2.5 border-b-2 border-dashed px-6 pb-[43px]">
			<div className="flex justify-between">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-0.5">
						<h1 className="leading-lg text-lg font-semibold text-black">달램핏 오피스 스트레칭</h1>
						<div className="leading-sm text-sm font-medium text-gray-700">을지로 3가</div>
					</div>
					<div className="flex gap-2">
						<span className="leading-sm rounded-[4px] bg-gray-900 px-2 py-1 text-center text-sm font-medium text-white">
							1월 7일
						</span>
						<span className="leading-sm rounded-[4px] bg-gray-900 px-2 py-1 text-center text-sm font-medium text-orange-600">
							17:30
						</span>
					</div>
				</div>

				<div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200">
					<Image src="/icons/outlined_heart.svg" width={24} height={24} alt="찜" />
				</div>
			</div>
		</div>
	);
}

/**모임 상세페에지 - 하위정보 (정원, 참가인원 프로필 사진, 개설확정) */
function GatheringSubInfo() {
	return (
		<div className="flex w-full flex-col justify-center gap-2.5 px-6">
			<div className="flex items-end justify-between">
				<div className="flex items-center gap-[12px]">
					<p className="leading-sm text-sm font-semibold">모집 정원 16명</p>
					<p>사진들</p>
				</div>
				<div className="flex">
					<Image src="/icons/bg_check.svg" width={24} height={24} alt="개설확정" />
					<p className="leading-sm flex items-center text-center text-sm font-medium text-orange-500">개설확정</p>
				</div>
			</div>
			<div className="flex w-full flex-col items-start gap-2">
				<div className="h-1 w-full rounded-full bg-orange-600"></div>
				<div className="flex w-full justify-between">
					<p className="leading-xs text-xs font-medium text-gray-700">최소인원 5명</p>
					<p className="leading-xs text-xs font-medium text-gray-700">최대인원 20명</p>
				</div>
			</div>
		</div>
	);
}

export default function GatheringInfoSection() {
	return (
		<section className="max-mb:flex-col flex items-center gap-6">
			{/* 이미지정보 */}
			<div className="relative h-[270px] w-[486px] overflow-hidden rounded-[24px] border-2 border-gray-200">
				<GatheringMainImage />
			</div>

			{/* 모임정보 */}
			<div className="flex w-[486px] flex-col items-start gap-2.5 rounded-[24px] border-2 border-gray-200 py-6">
				<div className="flex flex-col items-start gap-6 self-stretch">
					<GatheringMainInfo />
					<GatheringSubInfo />
				</div>
			</div>
		</section>
	);
}
