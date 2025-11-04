'use client';

import { differenceInDays, isPast, isSameDay, startOfDay } from 'date-fns';

import { formatDateAndTime } from '@/utils/date';
import { CLOSED_GATHERING_MESSAGE, FULL_GATHERING_MESSAGE } from '@/constants/messages';
import { useWishlistStore } from '@/stores/wishlist';
import type { Gathering } from '@/types/response/gatherings';

import Image from 'next/image';
import HeartButton from '@/app/(home)/HeartButton';
import ChipInfo from '@/components/commons/ChipInfo';
import ClassProgressBar from '@/components/commons/ClassProgressBar';
import Tag from '@/components/commons/Tag';

interface CardListProps {
	data: Gathering;
}

/**
 * 찜한 모임 카드
 * @param data - 모임 정보
 */
export default function CardList({ data }: CardListProps) {
	const { id, image, name, location, participantCount, capacity, registrationEnd, dateTime } = data;
	const { date, time } = formatDateAndTime(dateTime);
	const now = new Date();
	const endDate = new Date(registrationEnd);
	const isClosed = participantCount >= capacity || isPast(new Date(registrationEnd));

	const removeWish = useWishlistStore(state => state.removeWish);
	let tagText = '';
	let category = '';
	switch (location) {
		case '건대입구':
			category = 'AOS';
			break;
		case '을지로3가':
			category = 'Adventure';
			break;
		case '신림':
			category = 'FPS';
			break;
		case '홍대입구':
			category = 'RPG';
			break;
	}

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
		<div className="mb:h-[156px] max-mb:h-[316px] max-mb:flex-col mb:rounded-l-3xl mb:rounded-r-3xl max-mb:rounded-t-3xl max-mb:rounded-b-3xl border-primary-500 hover:shadow-primary-500/50 relative flex flex-row items-center overflow-hidden border-2 transition-shadow hover:shadow-lg">
			{/* 이미지 영역 */}
			<div className="mb:max-w-[280px] max-mb:w-full relative h-[156px] w-full">
				<Image src={image} alt={name} fill className="object-cover" />
				<div className="z-base absolute top-0 right-0">{!isClosed && <Tag text={tagText} />}</div>
			</div>

			{/* 모임 정보 영역 */}
			<div className="flex w-full flex-col">
				<div className="flex flex-col pt-4 pr-4 pb-[21px] pl-6">
					{/* 제목 + 장소 + 찜 아이콘 */}
					<div className="flex justify-between">
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<h2 className="leading-lg text-lg font-semibold text-white">{name}</h2>
								<span className="leading-lg text-lg font-semibold text-white">|</span>
								<p className="leading-sm text-primary-600 text-sm font-medium">{category}</p>
							</div>

							{/* 칩 인포 (날짜 + 시간) */}
							<div className="flex items-start gap-2">
								<ChipInfo text={date} textColor="white" />
								<ChipInfo text={time} textColor="primary" />
							</div>
						</div>
						{!isClosed && (
							<div className="flex items-center">
								<HeartButton id={id} />
							</div>
						)}
					</div>
				</div>

				{/* 참가인원 프로그래스바 */}
				<div className="px-6 pt-2 pb-4">
					<ClassProgressBar
						data={{
							currentNumber: participantCount,
							totalNumber: capacity
						}}
						isConfirmed={isClosed}
					/>
				</div>
			</div>

			{/* 마감된 카드 오버레이 */}
			{isClosed && (
				<div
					className="bg-root/80 absolute inset-0 flex flex-col items-center justify-center rounded-3xl text-white"
					onClick={e => {
						e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
					}}>
					<div className="flex flex-col gap-6">
						{isClosed && (
							<p className="leading-sm text-center text-sm font-medium">
								{CLOSED_GATHERING_MESSAGE.title}
								<br />
								{CLOSED_GATHERING_MESSAGE.subTitle}
							</p>
						)}
						<div className="mb:hidden bg-primary-500 flex items-center gap-2.5 rounded-[12px] px-3 py-1.5">
							<Image src="/icons/bye.svg" alt="찜한 영역" width={24} height={24} />
							<button
								className="leading-xs cursor-pointer text-xs font-semibold text-white"
								onClick={e => {
									e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
									removeWish(id);
								}}>
								모임 보내주기
							</button>
						</div>
					</div>

					<div className="max-mb:hidden bg-primary-500 absolute top-4 right-5 flex h-12 w-12 items-center justify-center rounded-full">
						<button className="cursor-pointer">
							<Image
								src="/icons/bye.svg"
								alt="마감 완료"
								width={24}
								height={24}
								onClick={e => {
									e.preventDefault(); // 링크 이동 방지
									removeWish(id);
								}}
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
