'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useModal } from '@/hooks/useModal';
import { Gathering } from '@/types/response/gatherings';
import { useUserStore } from '@/stores/user';
import { getGatheringId } from '@/apis/gatherings/[id]';

import Image from 'next/image';
import Tag from '@/components/commons/Tag';
import ChipInfo from '@/components/commons/ChipInfo';
import BasicProgressBar from '@/components/commons/basic/BasicProgressBar';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
import HeartButton from '@/app/(home)/HeartButton';

/**모임 상세페에지 - 이미지 + 마감정보 */
function GatheringMainImage({ data }: { data: Gathering }) {
	const { registrationEnd } = data;

	const utcNow = new Date(); /**UTC 현재 시간*/
	const koreaTime = new Date(utcNow.getTime() + 9 * 60 * 60 * 1000); /**한국 시간으로 변환 */
	const endDate = new Date(registrationEnd);

	/** 현재 시간이 마감일과 같은 날인지 확인 */
	const isSameDay =
		koreaTime.getUTCFullYear() === endDate.getUTCFullYear() &&
		koreaTime.getUTCMonth() === endDate.getUTCMonth() &&
		koreaTime.getUTCDate() === endDate.getUTCDate();

	let tagText = '';

	if (isSameDay) {
		const diffTime = endDate.getTime() - koreaTime.getTime();

		if (diffTime <= 0) {
			tagText = '모집 마감';
		} else {
			const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
			const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

			if (diffHours >= 1)
				tagText = `${diffHours}시간 뒤 마감`; // 1시간 이상 남을 경우 시간으로 표시
			else tagText = `${diffMinutes}분 뒤 마감`; // 1시간 미만 남을 경우 분으로 표시
		}
	} else {
		const diffTime = endDate.getTime() - koreaTime.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays <= 0) tagText = '마감된 모임';
		else tagText = `D-${diffDays}일 남음`;
	}

	return (
		<div className="relative h-full w-full rounded-[24px]">
			<Image src={data.image} alt="사진" fill className="object-fill" />

			<div className="absolute top-0 right-0 z-50">
				<Tag text={tagText} isLarge />
			</div>
		</div>
	);
}

/** 모임 상세페이지 - 메인정보 (제목, 위치, 날짜, 찜 버튼 포함) */
function GatheringMainInfo({ data }: { data: Gathering }) {
	const { name, location, dateTime, id } = data;
	const { openModal } = useModal();
	const pathname = usePathname();
	const { user } = useUserStore.getState();

	const date = dateTime.split('T')[0].slice(5);
	const gatheringDate = date.replace('-', '월 ') + '일';
	const gatheringTime = dateTime.split('T')[1].slice(0, 5);

	/** 로그인 검증 및 찜 클릭 핸들러 */
	const handleHeartClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (!user?.userId) {
			openModal(<RequiredLoginPopup next={pathname} />, 'required-login-popup');
			return;
		}

		openModal(<BasicPopup title="찜 목록에 추가되었습니다." />, 'heart-popup');
	};

	return (
		<div className="tb:pb-[43px] max-tb:pb-[20px] flex w-full flex-col gap-2.5 border-b-2 border-dashed px-6">
			<div className="flex justify-between">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-0.5">
						<h1 className="leading-lg text-lg font-semibold text-black">{name}</h1>
						<div className="leading-sm text-sm font-medium text-gray-700">{location}</div>
					</div>

					<div className="flex gap-2">
						<ChipInfo text={`${gatheringDate}`} textColor="white" />
						<ChipInfo text={`${gatheringTime}`} textColor="orange" />
					</div>
				</div>

				<div onClick={handleHeartClick}>
					<HeartButton id={id} />
				</div>
			</div>
		</div>
	);
}

/**모임 상세페에지 - 하위정보 (정원, 참가인원 프로필 사진, 개설확정) */
function GatheringSubInfo({ data }: { data: Gathering }) {
	return (
		<div className="flex w-full flex-col justify-center gap-2.5 px-6">
			<div className="flex items-end justify-between">
				<div className="flex items-center gap-3">
					<p className="leading-sm text-sm font-semibold">모집 정원 {data.capacity}명</p>
					{/* TODO : 참가인원 프로필 사진 컴포넌트로 교제 예정 */}
					<p>사진들</p>
				</div>

				{/* 중간발표를 위해 임시 제거 추후 리팩토링 예정 */}
				{/* <div className="flex">
					<Image src="/icons/bg_check.svg" width={24} height={24} alt="개설확정" />
					<p className="leading-sm flex items-center text-center text-sm font-medium text-orange-500">개설확정</p>
				</div> */}
			</div>
			<div className="flex w-full flex-col items-start gap-2">
				<BasicProgressBar data={{ totalNumber: data.capacity, currentNumber: data.participantCount }} />
				<div className="flex w-full justify-between">
					<p className="leading-xs text-xs font-medium text-gray-700">최소인원 5명</p>
					<p className="leading-xs text-xs font-medium text-gray-700">최대인원 20명</p>
				</div>
			</div>
		</div>
	);
}

export default function GatheringInfoSection({ gatheringId }: { gatheringId: number }) {
	const [data, setData] = useState<Gathering>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gathering = await getGatheringId(gatheringId);
				setData(gathering);
			} catch (error) {
				console.error(`데이터를 불러오는데 실패하였습니다 : ${error}`);
			}
		};

		fetchData();
	}, [gatheringId]);

	if (!data) return null;

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
