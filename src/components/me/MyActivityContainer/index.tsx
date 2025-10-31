'use client';

import { useState } from 'react';
import JoinedGatherings from './JoinedGatherings';
import MyReviews from './MyReviews';
import CreatedGathering from './CreatedGathering';

type TabKey = 'JoinedGathering' | 'MyReview' | 'CreatedGathering';

const TABS: { key: TabKey; label: string }[] = [
	{ key: 'JoinedGathering', label: '나의 모임' },
	{ key: 'MyReview', label: '나의 리뷰' },
	{ key: 'CreatedGathering', label: '내가 만든 모임' }
];

const ACTIVITY_TEXT_GLOW =
	'[text-shadow:0_0_2px_#D705F2,0_0_4px_#D705F2,0_0_8px_#D705F2,0_0_16px_#D705F2,0_0_32px_#D705F2,0_0_64px_#D705F2]';
const ACTIVITY_BOX_GLOW =
	'[box-shadow:0_0_2px_#D705F2,0_0_4px_#D705F2,0_0_8px_#D705F2,0_0_16px_#D705F2,0_0_32px_#D705F2,0_0_64px_#D705F2]';

/**
 * 마이페이지 활동 영역 컨테이너
 * - "나의 모임", "나의 리뷰", "내가 만든 모임" 탭 제공
 * - 탭 클릭 시 해당 컴포넌트 렌더링
 *
 * **탭 설명**
 * - 나의 모임: 사용자가 참여한 모임 리스트
 * - 나의 리뷰: 사용자가 작성한 리뷰 리스트
 * - TODO : 내가 만든 모임: 사용자가 생성한 모임 리스트
 */
export default function MyActivityContainer() {
	/** 현재 활성화된 탭 */
	const [activeTab, setActiveTab] = useState<TabKey>('JoinedGathering');

	return (
		<section className="mb:px-6 flex flex-1 flex-col border-t-3 border-white px-4 py-6">
			{/* 나의 모임, 나의 리뷰, 내가 만든 모임 탭 메뉴 */}
			<div className="mb-6 flex gap-3 text-lg font-semibold tracking-normal">
				{TABS.map(({ key, label }) => {
					const isActive = activeTab === key;

					return (
						<div key={key} className="flex flex-col gap-1.5">
							<button
								type="button"
								onClick={() => setActiveTab(key)}
								className={`cursor-pointer text-gray-300 transition-all ${isActive && `${ACTIVITY_TEXT_GLOW} text-white`}`}>
								{label}
							</button>
							<div className={`h-[2px] w-full bg-transparent ${isActive && `${ACTIVITY_BOX_GLOW} bg-white/80`}`} />
						</div>
					);
				})}
			</div>

			{/* 각 탭 클릭 시 알맞는 컨텐츠 호출 */}
			{activeTab === 'JoinedGathering' && <JoinedGatherings />}
			{activeTab === 'MyReview' && <MyReviews />}
			{activeTab === 'CreatedGathering' && <CreatedGathering />}
		</section>
	);
}
