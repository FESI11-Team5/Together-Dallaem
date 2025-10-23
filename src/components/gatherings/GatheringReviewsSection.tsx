'use client';

import { useState } from 'react';
import { REVIEW_SECTION_TITLE } from '@/constants/messages';

import Image from 'next/image';
import BasicPagination from '../commons/basic/BasicPagination';

/** 임시 Mock 데이터 */
/** 추후 실제 데이터 타입으로 변환예정 */
interface ReviewProps {
	/** 게시글 번호 */
	id: number;
	/** 좋아요 개수 */
	heartCount: number;
	/** 리뷰 내용 */
	content: string;
	/** 작성자 */
	author: string;
	/** 작성일 */
	createdAt: string;
}

// 👇 Mock 데이터
const mockReviews: ReviewProps[] = [
	{
		id: 1,
		heartCount: 5,
		content:
			'따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.',
		author: '럽윈즈올',
		createdAt: '2024.01.25'
	},
	{
		id: 2,
		heartCount: 4,
		content: '편안하고 조용해서 집중하기 좋았어요. 다만, 콘센트 자리가 조금 더 많았으면 좋겠네요.',
		author: '스터디마스터',
		createdAt: '2024.01.27'
	},
	{
		id: 3,
		heartCount: 5,
		content: '직원분들이 친절하고 시설 관리가 잘 되어있어서 기분 좋게 이용했습니다. 재방문 의사 100%입니다!',
		author: '해피바이러스',
		createdAt: '2024.02.01'
	},
	{
		id: 4,
		heartCount: 3,
		content: '가격 대비 괜찮았지만, 주말에는 사람이 너무 많아서 조금 시끄러웠어요. 평일에 다시 와봐야겠어요.',
		author: '주말러버',
		createdAt: '2024.02.05'
	},
	{
		id: 5,
		heartCount: 5,
		content: '음료가 정말 맛있고 공간 디자인이 너무 예뻐요. 사진 찍기 좋은 스팟이 많습니다!',
		author: '포토제닉',
		createdAt: '2024.02.10'
	},
	{
		id: 6,
		heartCount: 4,
		content: '프로그램 참여했는데 만족도가 높았습니다. 다음 번에는 다른 프로그램도 신청해보고 싶어요.',
		author: '경험주의자',
		createdAt: '2024.02.15'
	},
	{
		id: 7,
		heartCount: 5,
		content: '집 근처에 이런 곳이 생겨서 너무 행복합니다! 앞으로 자주 이용할게요. 늘 감사합니다.',
		author: '동네주민A',
		createdAt: '2024.02.20'
	},
	{
		id: 8,
		heartCount: 3,
		content: '와이파이가 조금 불안정했어요. 그 외의 시설이나 분위기는 매우 만족스럽습니다.',
		author: '인터넷필수',
		createdAt: '2024.02.24'
	},
	{
		id: 9,
		heartCount: 5,
		content: '최고의 힐링 공간! 조용하고 잔잔한 음악이 마음을 편안하게 해줍니다. 완벽해요.',
		author: '고요속의나',
		createdAt: '2024.03.01'
	},
	{
		id: 10,
		heartCount: 4,
		content: '테이블이 넓어서 작업하기 좋았어요. 다양한 형태의 좌석이 있는 점이 마음에 듭니다.',
		author: '노트북족',
		createdAt: '2024.03.05'
	},
	{
		id: 11,
		heartCount: 5,
		content: '깨끗하고 쾌적해서 이용할 때마다 기분이 좋아요. 친구들에게도 추천했어요!',
		author: '청결제일',
		createdAt: '2024.03.10'
	},
	{
		id: 12,
		heartCount: 2,
		content: '화장실 관리가 조금 미흡했습니다. 이 부분만 개선되면 좋을 것 같습니다.',
		author: '클린매니아',
		createdAt: '2024.03.15'
	},
	{
		id: 13,
		heartCount: 4,
		content: '간단한 스낵이나 간식거리를 팔면 더 좋을 것 같아요! 오래 머무르기에 좋습니다.',
		author: '출출한사람',
		createdAt: '2024.03.20'
	},
	{
		id: 14,
		heartCount: 5,
		content: '따뜻한 햇살이 잘 들어와서 오후에 방문하는 것을 추천합니다. 힐링 그 자체!',
		author: '햇살맛집',
		createdAt: '2024.03.25'
	},
	{
		id: 15,
		heartCount: 4,
		content: '자리가 금방 차서 아쉬워요. 그래도 한 번 앉으면 시간 가는 줄 모르는 곳입니다.',
		author: '인기쟁이',
		createdAt: '2024.03.30'
	},
	{
		id: 16,
		heartCount: 5,
		content: '프로그램 강사님의 설명이 매우 전문적이고 유익했습니다. 또 듣고 싶어요.',
		author: '배움의즐거움',
		createdAt: '2024.04.05'
	},
	{
		id: 17,
		heartCount: 3,
		content: '음악 소리가 조금 컸습니다. 개인적으로 조용한 분위기를 더 선호해서 아쉬웠어요.',
		author: '소음민감',
		createdAt: '2024.04.10'
	},
	{
		id: 18,
		heartCount: 5,
		content: '공간 곳곳에 세심한 배려가 느껴집니다. 모든 것이 만족스러웠습니다. 최고!',
		author: '세심한관찰자',
		createdAt: '2024.04.15'
	},
	{
		id: 19,
		heartCount: 4,
		content: '접근성이 좋고 찾기 쉬웠습니다. 친구들과 모임하기에도 좋은 장소입니다.',
		author: '길찾기성공',
		createdAt: '2024.04.20'
	},
	{
		id: 20,
		heartCount: 5,
		content: '제 인생 공간을 찾은 것 같아요! 앞으로도 오랫동안 있어주세요.',
		author: '인생공간',
		createdAt: '2024.04.25'
	}
];

export default function GatheringReviewSection() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 4;

	// 전체 페이지 수 계산
	const totalPages = Math.ceil(mockReviews.length / pageSize);

	// 현재 페이지 데이터 슬라이싱
	const startIndex = (currentPage - 1) * pageSize;
	const currentReviews = mockReviews.slice(startIndex, startIndex + pageSize);

	return (
		<section className="w-full border-t-2 border-gray-200 bg-white p-6">
			<div className="flex flex-col justify-center">
				<h2 className="leading-lg mb-4 text-lg font-semibold text-gray-900">{REVIEW_SECTION_TITLE.title}</h2>

				{/* 리뷰 리스트 */}
				<ul className="flex flex-col items-start gap-4">
					{currentReviews.map((review, idx) => (
						<li key={idx} className="flex w-full flex-col gap-2.5 border-b border-dashed border-gray-200 pb-4">
							<div className="flex flex-col gap-2.5">
								{/* 하트 5개 */}
								<div className="flex gap-0.5">
									{Array.from({ length: 5 }).map((_, i) => (
										<Image
											key={i}
											src={i < review.heartCount ? '/icons/heart_active.svg' : '/icons/heart.svg'}
											alt="heart"
											width={16}
											height={16}
										/>
									))}
								</div>

								{/* 리뷰 내용 */}
								<p className="text-sm text-gray-800">{review.content}</p>
							</div>

							{/* 작성자 정보 */}
							<div className="flex items-center gap-2.5">
								<Image
									src="/images/profile_edit.svg"
									alt={review.author}
									width={24}
									height={24}
									className="mb:w-[20px] mb:h-[20px]"
								/>
								<span className="text-xs font-medium text-gray-700">{review.author}</span>
								<span className="text-xs font-medium text-gray-700"> | </span>
								<span className="text-xs font-medium text-gray-500">{review.createdAt}</span>
							</div>
						</li>
					))}
				</ul>

				{/* 페이지네이션 */}
				<div className="flex justify-center">
					<BasicPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
				</div>
			</div>
		</section>
	);
}
