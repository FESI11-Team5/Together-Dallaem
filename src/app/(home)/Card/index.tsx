'use client';

import HeartButton from '@/app/(home)/HeartButton';
import ChipInfo from '@/components/commons/ChipInfo';
import ClassProgressBar from '@/components/commons/ClassProgressBar';
import Tag from '@/components/commons/Tag';
import type { Gathering } from '@/types/response/gatherings';
import { formatDateAndTime, getDeadlineLabel } from '@/utils/date';
import Image from 'next/image';

interface CardProps {
	gathering: Gathering;
	onClick: () => void;
}

// TODO: 무한 스크롤 카드 페이드인, 페이드아웃 적용
// TODO: 모임 마감 물어보고 추가하기
export default function Card({ gathering, onClick }: CardProps) {
	const { id, name, dateTime, registrationEnd, location, participantCount, image } = gathering;
	const { date, time } = formatDateAndTime(dateTime);
	const deadlineLabel = getDeadlineLabel(registrationEnd);

	return (
		<div
			onClick={onClick}
			className="tb:gap-0 tb:h-[156px] border-gray-10 duration-0.5 tb:flex-row flex h-[316px] flex-col gap-4 overflow-hidden rounded-3xl border border-2 transition-shadow hover:shadow-lg">
			<div className="tb:w-[280px] relative block h-[156px] w-[343px] w-full overflow-hidden">
				{deadlineLabel && (
					<div className="absolute top-0 right-0 z-10">
						<Tag text={deadlineLabel} isLarge />
					</div>
				)}
				<Image priority src={image || '/images/example1.jpg'} alt={`모임 ${id} 이미지`} fill className="object-cover" />
			</div>
			<div className="tb:gap-0 flex flex-1 flex-col gap-5">
				<div className="tb:pt-4 tb:pr-4 tb:pb-[21px] tb:pl-6 flex justify-between px-4">
					<div className="flex flex-col justify-start gap-2">
						<div className="flex items-center gap-2 text-lg font-semibold">
							<span>{name}</span>
							<span>|</span>
							<span className="text-sm font-medium text-gray-700">{location}</span>
						</div>
						<div className="flex gap-2">
							<ChipInfo text={date} textColor="white" />
							<ChipInfo text={time} textColor="orange" />
						</div>
					</div>
					<HeartButton id={id} />
				</div>
				<div className="tb:px-6 px-4 pt-2 pb-4">
					<ClassProgressBar
						data={{
							totalNumber: 20,
							currentNumber: participantCount
						}}
					/>
				</div>
			</div>
		</div>
	);
}
