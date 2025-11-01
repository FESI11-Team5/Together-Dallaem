import { CLOSED_GATHERING_MESSAGE } from '@/constants/messages';
import type { Gathering } from '@/types/response/gatherings';

import HeartButton from '@/app/(home)/HeartButton';
import ChipInfo from '@/components/commons/ChipInfo';
import ClassProgressBar from '@/components/commons/ClassProgressBar';
import Tag from '@/components/commons/Tag';
import { useWishlistStore } from '@/stores/wishlist';
import { formatDateAndTime } from '@/utils/date';
import { differenceInDays, isPast, isSameDay, startOfDay } from 'date-fns';
import Image from 'next/image';

interface CardListProps {
	data: Gathering;
}

/**
 * 찜한 모임 카드
 * @param data - 모임 정보
 */
export default function CardList({ data }: CardListProps) {
	const now = new Date();
	const endDate = new Date(data.registrationEnd);
	const isClosed = data.participantCount >= data.capacity || isPast(new Date(data.registrationEnd));
	const { date, time } = formatDateAndTime(data.dateTime);

	const removeWish = useWishlistStore(state => state.removeWish);
	let tagText = '';

	if (isPast(endDate)) {
		tagText = '모집 마감';
	} else if (isSameDay(now, endDate)) {
		const endHour = endDate.getHours();
		tagText = `오늘 ${endHour}시 마감`;
	} else {
		const diffDays = differenceInDays(startOfDay(endDate), startOfDay(now));
		tagText = diffDays <= 0 ? '모집 마감' : `${diffDays}일 후 마감`;
	}

	return (
		<div className="mb:h-[156px] max-mb:h-[316px] max-mb:flex-col mb:rounded-l-[24px] mb:rounded-r-[24px] max-mb:rounded-t-[24px] max-mb:rounded-b-[24px] relative flex flex-row items-center overflow-hidden border-2 border-gray-100">
			{/* 이미지 영역 */}
			<div className="mb:max-w-[280px] max-mb:w-full relative h-[156px] w-full">
				<Image src={data.image} alt={data.name} fill className="object-cover" />
				<div className="z-base absolute top-0 right-0">{!isClosed && <Tag text={tagText} />}</div>
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

						{!isClosed && <HeartButton id={data.id} />}
					</div>

					{/* 칩 인포 (날짜 + 시간) */}
					<div className="mt-2 flex items-start gap-2">
						<ChipInfo text={date} textColor="white" />
						<ChipInfo text={time} textColor="primary" />
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
				<div
					className="bg-root/80 absolute inset-0 flex flex-col items-center justify-center rounded-[24px] text-white"
					onClick={e => {
						e.preventDefault(); // 링크 이동 방지
					}}>
					<div className="flex flex-col gap-6">
						<p className="leading-sm text-center text-sm font-medium">
							{CLOSED_GATHERING_MESSAGE.title}
							<br />
							{CLOSED_GATHERING_MESSAGE.subTitle}
						</p>

						<div className="mb:hidden bg-primary-50 flex items-center gap-2.5 rounded-[12px] px-3 py-1.5">
							<Image src="/icons/bye.svg" alt="찜한 영역" width={24} height={24} />
							<button
								className="leading-xs text-primary-600 cursor-pointer text-xs font-semibold"
								onClick={e => {
									e.preventDefault(); // 링크 이동 방지
									removeWish(data.id);
								}}>
								모임 보내주기
							</button>
						</div>
					</div>

					<div
						className="max-mb:hidden bg-primary-50 absolute top-4 right-5 flex h-12 w-12 items-center justify-center rounded-full"
						onClick={() => console.log('버튼클릭')}>
						<button className="cursor-pointer">
							<Image
								src="/icons/bye.svg"
								alt="마감 완료"
								width={24}
								height={24}
								onClick={e => {
									e.preventDefault(); // 링크 이동 방지
									removeWish(data.id);
								}}
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
