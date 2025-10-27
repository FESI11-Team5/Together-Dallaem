import { CLOSED_GATHERING_MESSAGE } from '@/constants/messages';
import type { Gathering } from '@/types/response/gatherings';

import ChipInfo from '@/components/commons/ChipInfo';
import ClassProgressBar from '@/components/commons/ClassProgressBar';
import Tag from '@/components/commons/Tag';
import Image from 'next/image';

interface CardListProps {
	data: Gathering;
}

/**
 * 찜한 모임 카드
 * @param data - 모임 정보
 */
export default function CardList({ data }: CardListProps) {
	const date = new Date(data.dateTime);

	// TODO : 지금은 참가인원 수로 결정하지만, 추후에 마감날짜를 기준으로 변경
	const isClosed = data.participantCount >= data.capacity;

	// TODO : 실제 API 의 데이터에 맞게 포맷 변경 필요 22 ~ 25 줄
	const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
	const hours = date.getHours().toString().padStart(2, '0');
	const formattedTimeTag = `${hours}시`;
	const formattedTimeChip = `${date.getHours()} ${String(date.getMinutes()).padStart(2, '0')}`;

	return (
		<div className="mb:h-[156px] max-mb:h-[316px] max-mb:flex-col mb:rounded-l-[24px] mb:rounded-r-[24px] max-mb:rounded-t-[24px] max-mb:rounded-b-[24px] relative flex flex-row items-center overflow-hidden border-2 border-gray-100">
			{/* 이미지 영역 */}
			<div className="mb:max-w-[280px] max-mb:w-full relative h-[156px] w-full">
				<Image src={data.image} alt={data.name} fill className="object-cover" />
				<div className="z-base absolute top-0 right-0">
					{!isClosed && <Tag text={`오늘 ${formattedTimeTag} 마감`} />}
				</div>
			</div>

			{/* 모임 정보 영역 */}
			<div className="flex w-full flex-col">
				<div className="flex flex-col p-[16px_16px_21px_24px]">
					{/* 제목 + 장소 + 찜 아이콘 */}
					<div className="flex justify-between">
						<div className="flex items-center gap-2">
							<h2 className="leading-lg text-lg font-semibold text-gray-800">{data.name}</h2>
							<span className="leading-lg text-lg font-semibold text-gray-800">|</span>
							<p className="leading-sm text-sm font-medium text-gray-700">{data.location}</p>
						</div>

						{!isClosed && (
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
								<Image src="/icons/heart_active.svg" alt="찜한 영역" width={24} height={24} />
							</div>
						)}
					</div>

					{/* 칩 인포 (날짜 + 시간) */}
					<div className="mt-2 flex items-start gap-2">
						<ChipInfo text={formattedDate} textColor="white" />
						<ChipInfo text={formattedTimeChip} textColor="orange" />
					</div>
				</div>

				{/* 참가인원 프로그래스바 */}
				<div className="p-[8px_24px_16px_24px]">
					<ClassProgressBar
						data={{
							currentNumber: data.participantCount,
							totalNumber: data.capacity
						}}
						isConfirmed={isClosed}
					/>
				</div>
			</div>

			{/* 마감된 카드 오버레이 */}
			{isClosed && (
				<div className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] bg-black/80 text-white">
					<div className="flex flex-col gap-6">
						<p className="leading-sm text-center text-sm font-medium">
							{CLOSED_GATHERING_MESSAGE.title}
							<br />
							{CLOSED_GATHERING_MESSAGE.subTitle}
						</p>

						<button className="mb:hidden flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-orange-50 px-3 py-1.5">
							<Image src="/icons/bye.svg" alt="찜한 영역" width={24} height={24} />
							<p className="leading-xs text-xs font-semibold text-orange-600">모임 보내주기</p>
						</button>
					</div>

					<button className="max-mb:hidden absolute top-4 right-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-orange-50">
						<Image src="/icons/bye.svg" alt="마감 완료" width={24} height={24} />
					</button>
				</div>
			)}
		</div>
	);
}
