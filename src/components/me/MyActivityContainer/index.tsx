'use client';

import { useState } from 'react';
import JoinedGatherings from './JoinedGatherings';
import MyReviews from './MyReviews';

type TabKey = 'joinedGathering' | 'myReview' | 'createdGathering';

const TABS: { key: TabKey; label: string }[] = [
	{ key: 'joinedGathering', label: '나의 모임' },
	{ key: 'myReview', label: '나의 리뷰' },
	{ key: 'createdGathering', label: '내가 만든 모임' }
];

export default function MyActivityContainer() {
	const [activeTab, setActiveTab] = useState<TabKey>('joinedGathering');

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
			{activeTab === 'joinedGathering' && <JoinedGatherings />}
			{activeTab === 'myReview' && <MyReviews />}
		</div>
	);
}
