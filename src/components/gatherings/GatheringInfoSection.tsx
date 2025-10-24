'use client';

import { useEffect, useState } from 'react';
import { differenceInDays, format, isPast, isSameDay, startOfDay } from 'date-fns';

import { formatDateAndTime, formatUTCToKST } from '@/utils/date';
import { Gathering, GatheringParticipant } from '@/types/response/gatherings';
import { getGatheringId, getGatheringParticipant } from '@/apis/gatherings/[id]';

import Image from 'next/image';
import Tag from '@/components/commons/Tag';
import ChipInfo from '@/components/commons/ChipInfo';
import BasicProgressBar from '@/components/commons/basic/BasicProgressBar';
import HeartButton from '@/app/(home)/HeartButton';

/** 모임 상세페이지 - 이미지 + 마감정보 */
function GatheringMainImage({ data }: { data: Gathering }) {
	const { registrationEnd, image } = data;

	const now = new Date();
	const endDate = new Date(registrationEnd);

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
		<div className="relative h-full w-full rounded-[24px]">
			<Image src={image} alt="사진" fill className="object-cover" />
			<div className="absolute top-0 right-0 z-10">
				<Tag text={tagText} />
			</div>
		</div>
	);
}

/** 모임 상세페이지 - 메인정보 (제목, 위치, 날짜, 찜 버튼 포함) */
function GatheringMainInfo({ data }: { data: Gathering }) {
	const { name, location, dateTime, id } = data;
	const { date, time } = formatDateAndTime(dateTime);

	return (
		<div className="tb:pb-[43px] max-tb:pb-[20px] flex w-full flex-col gap-2.5 border-b-2 border-dashed px-6">
			<div className="flex justify-between">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-0.5">
						<h1 className="leading-lg text-lg font-semibold text-black">{name}</h1>
						<div className="leading-sm text-sm font-medium text-gray-700">{location}</div>
					</div>

					<div className="flex gap-2">
						<ChipInfo text={date} textColor="white" />
						<ChipInfo text={time} textColor="orange" />
					</div>
				</div>

				<HeartButton id={id} />
			</div>
		</div>
	);
}

/** 모임 상세페이지 - 하위정보 (정원, 참가인원 프로필 사진, 개설확정 등) */
function GatheringSubInfo({ data }: { data: Gathering }) {
	const [participants, setParticipants] = useState<GatheringParticipant[]>([]);
	const { participantCount, capacity } = data;
	const isFull = participantCount === capacity;

	useEffect(() => {
		const fetchParticipants = async () => {
			try {
				const participantList = await getGatheringParticipant(data.id);
				setParticipants(participantList);
			} catch (error) {
				console.log('참가자 정보를 불러오는데 실패했습니다.', error);
			}
		};
		fetchParticipants();
	}, [data.id]);

	return (
		<div className="flex w-full flex-col justify-center gap-2.5 px-6">
			<div className="flex items-end justify-between">
				<div className="flex items-center gap-3">
					<p className="leading-sm text-sm font-semibold">모집 정원 {capacity}명</p>

					<div className="group/images flex items-center">
						{participants.map((participant, idx) => (
							<div
								key={idx}
								className={`group/name transition-all duration-300 ease-in-out ${idx !== 0 ? '-ml-3 group-hover/images:-ml-1' : ''} relative`}>
								<div className="flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full">
									<Image
										src={participant?.User?.image || '/images/profile.svg'}
										alt={participant?.User?.name || '참가자'}
										fill
										className="rounded-full border-2 border-gray-100 object-cover"
									/>
								</div>
								<span
									className="leading-xs invisible absolute z-10 rounded-full bg-gray-600 px-1.5 py-2 text-center text-xs font-medium text-white group-hover/images:opacity-80 group-hover/name:visible"
									style={{ top: '100%', left: '-50%', transform: 'translateY(-50px)', whiteSpace: 'nowrap' }}>
									{participant.User?.name}
								</span>
							</div>
						))}
					</div>
				</div>

				{isFull && (
					<div className="flex items-center gap-1">
						<Image src="/icons/check_round.svg" alt={'모집 확정'} width={24} height={24} />
						<p className="leading-sm text-sm font-medium text-orange-500">개설확정</p>
					</div>
				)}
			</div>

			<div className="flex w-full flex-col items-start gap-2">
				<BasicProgressBar data={{ totalNumber: capacity, currentNumber: participantCount }} />
				<div className="flex w-full justify-between">
					<p className="leading-xs text-xs font-medium text-gray-700">최소인원 5명</p>
					<p className="leading-xs text-xs font-medium text-gray-700">최대인원 20명</p>
				</div>
			</div>
		</div>
	);
}

/** 상위 섹션: 데이터 Fetch + 하위 컴포넌트 전달 */
export default function GatheringInfoSection({ gatheringId }: { gatheringId: number }) {
	const [data, setData] = useState<Gathering>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gathering = await getGatheringId(gatheringId);

				const formattedData = {
					...gathering,
					dateTime: formatUTCToKST(gathering.dateTime, 'yyyy-MM-dd HH:mm'),
					registrationEnd: formatUTCToKST(gathering.registrationEnd, 'yyyy-MM-dd HH:mm')
				};

				setData(formattedData);
			} catch (error) {
				console.error(`데이터를 불러오는데 실패하였습니다 :`, error);
			}
		};

		fetchData();
	}, [gatheringId]);

	if (!data) return <div className="py-20 text-center text-gray-500">로딩 중...</div>;

	return (
		<section className="tb:flex-row max-mb:flex-col flex items-center justify-center gap-6">
			{/* 이미지정보 */}
			<div className="max-tb:w-[340px] max-tb:h-[240px] tb:w-[486px] tb:h-[270px] max-mb:w-[343px] max-mb:h-[180px] relative overflow-hidden rounded-[24px] border-2 border-gray-200">
				<GatheringMainImage data={data} />
			</div>

			{/* 모임정보 */}
			<div className="max-mb:w-[343px] max-tb:w-[340px] max-tb:h-[240px] tb:w-[486px] tb:h-[270px] flex flex-col items-start gap-2.5 rounded-[24px] border-2 border-gray-200 py-6">
				<div className="tb:gap-6 max-tb:gap-3 flex flex-col items-start self-stretch">
					<GatheringMainInfo data={data} />
					<GatheringSubInfo data={data} />
				</div>
			</div>
		</section>
	);
}
