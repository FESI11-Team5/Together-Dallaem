import Image from 'next/image';
import { ReactNode } from 'react';
import { formatKoreanDate } from '@/utils/date';
import type { JoinedGathering, Gathering } from '@/types/response/gatherings';

interface GatheringProps {
	/** 표시할 모임 객체 */
	gathering: JoinedGathering | Gathering;

	/** 카드에 표시할 뱃지 또는 추가 컨텐츠 */
	badgeContent?: ReactNode;

	/** 카드 내부 하단에 표시할 추가 컨텐츠 (버튼 등) */
	children?: ReactNode;
}

/**
 * 모임 카드 레이아웃 컴포넌트
 * - 모임 이미지, 이름, 장소, 날짜/시간, 인원 정보 표시
 * - badgeContent와 children을 통해 확장 가능
 */
export default function CardLayout({ gathering, badgeContent, children }: GatheringProps) {
	const { location } = gathering;
	let genre = '';
	switch (location) {
		case '건대입구':
			genre = 'AOS';
			break;
		case '을지로3가':
			genre = 'Adventure';
			break;
		case '신림':
			genre = 'FPS';
			break;
		case '홍대입구':
			genre = 'RPG';
			break;
	}
	return (
		<article key={gathering.id}>
			<div className="tb:flex-row relative mb-6 flex flex-col gap-4">
				{/* 모임 이미지 */}
				<div className="tb:w-70 relative h-39 w-full overflow-hidden rounded-3xl">
					<Image src={gathering.image} alt="모임 이미지" fill className="rounded-3xl bg-gray-300 object-cover" />
				</div>

				{/* 모임 정보 */}
				<div className="tb:justify-between flex flex-col gap-4.5 text-lg font-semibold text-white">
					<div className="flex flex-col gap-3">
						{badgeContent}
						<div className="flex flex-col gap-1.5">
							<div className="flex items-center gap-2 text-lg font-semibold">
								<h3 id={`gathering-title-${gathering.id}`}>{gathering.name}</h3>
								<p className="text-sm">|</p>
								<p className="text-primary-600 text-sm font-medium">{genre}</p>
							</div>

							<dl className="flex gap-3 text-sm font-medium text-white">
								<dt className="sr-only">날짜 및 시간</dt>
								<dd className="text-primary-600">
									<time>{formatKoreanDate(gathering.dateTime)}</time>
								</dd>

								<dt className="sr-only">현재 인원 / 최대 인원</dt>
								<dd className="flex justify-center gap-1">
									<Image src="/icons/person.svg" alt="모임 인원 아이콘" width={16} height={16} />
									<p>
										{gathering.participantCount} / {gathering.capacity}
									</p>
								</dd>
							</dl>
						</div>
					</div>
					{children}
				</div>
			</div>
			<hr className="box-shadow-white h-px w-full border-white" />
		</article>
	);
}
