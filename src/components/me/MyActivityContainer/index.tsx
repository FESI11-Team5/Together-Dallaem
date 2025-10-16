'use client';

import { useState } from 'react';
import JoinedGatherings from './JoinedGatherings';
import MyReviews from './MyReviews';

type TabKey = 'JoinedGathering' | 'MyReview' | 'CreatedGathering';

const TABS: { key: TabKey; label: string }[] = [
	{ key: 'JoinedGathering', label: '나의 모임' },
	{ key: 'MyReview', label: '나의 리뷰' },
	{ key: 'CreatedGathering', label: '내가 만든 모임' }
];

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
		<div className="tb:px-6 border-t-2 border-gray-900 px-4 py-6">
			{/* 나의 모임, 나의 리뷰, 내가 만든 모임 탭 메뉴 */}
			<div className="mb-6 flex gap-3 text-lg font-semibold tracking-normal">
				{TABS.map(({ key, label }) => {
					const isActive = activeTab === key;

					return (
						<button
							key={key}
							type="button"
							onClick={() => setActiveTab(key)}
							className={`border-b-2 pb-1.5 transition-colors ${
								isActive ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
							}`}>
							{label}
						</button>
					);
				})}
			</div>

			{/* 각 탭 클릭 시 알맞는 컨텐츠 호출 */}
			{activeTab === 'JoinedGathering' && <JoinedGatherings />}
			{activeTab === 'MyReview' && <MyReviews />}
		</div>
	);
}
