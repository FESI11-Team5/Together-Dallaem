'use client';

import Image from 'next/image';
import Tag from '../commons/Tag';
import ChipInfo from '../commons/ChipInfo';
import BasicProgressBar from '../commons/basic/BasicProgressBar';

/**모임 상세페에지 - 이미지 + 마감정보 */
function GatheringMainImage() {
	return (
		<div className="relative h-full w-full rounded-[24px]">
			<Image src="/images/example.jpg" alt="사진" fill className="object-cover" />

			<div className="absolute top-0 right-0 z-50">
				<Tag text="오늘 21시 마감" isLarge />
			</div>
		</div>
	);
}

/**모임 상세페에지 - 메인정보 (제목, 위치, 날짜, 찜)*/
function GatheringMainInfo() {
	return (
		<div className="tb:pb-[43px] max-tb:pb-[20px] flex w-full flex-col gap-2.5 border-b-2 border-dashed px-6">
			<div className="flex justify-between">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-0.5">
						<h1 className="leading-lg text-lg font-semibold text-black">달램핏 오피스 스트레칭</h1>
						<div className="leading-sm text-sm font-medium text-gray-700">을지로 3가</div>
					</div>

					<div className="flex gap-2">
						<div className="flex gap-2">
							<ChipInfo text="1월 7일" textColor="white" />
							<ChipInfo text="17:30" textColor="orange" />
						</div>
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
				<div className="flex items-center gap-3">
					<p className="leading-sm text-sm font-semibold">모집 정원 16명</p>
					{/* TODO : 참가인원 프로필 사진 컴포넌트로 교제 예정 */}
					<p>사진들</p>
				</div>
				<div className="flex">
					<Image src="/icons/bg_check.svg" width={24} height={24} alt="개설확정" />
					<p className="leading-sm flex items-center text-center text-sm font-medium text-orange-500">개설확정</p>
				</div>
			</div>
			<div className="flex w-full flex-col items-start gap-2">
				<BasicProgressBar data={{ totalNumber: 20, currentNumber: 16 }} />
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
		<section className="tb:flex-row max-mb:flex-col flex items-center justify-center gap-6">
			{/* 이미지정보 */}
			<div className="max-tb:w-[340px] max-tb:h-[240px] tb:w-[486px] tb:h-[270px] max-mb:w-[343px] max-mb:h-[180px] relative overflow-hidden rounded-[24px] border-2 border-gray-200">
				<GatheringMainImage />
			</div>

			{/* 모임정보 */}
			<div className="max-mb:w-[343px] max-tb:w-[340px] max-tb:h-[240px] tb:w-[486px] tb:h-[270px] flex flex-col items-start gap-2.5 rounded-[24px] border-2 border-gray-200 py-6">
				<div className="tb:gap-6 max-tb:gap-3 flex flex-col items-start self-stretch">
					<GatheringMainInfo />
					<GatheringSubInfo />
				</div>
			</div>
		</section>
	);
}
