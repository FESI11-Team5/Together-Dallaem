'use client';

import { useState } from 'react';

type TabKey = 'meeting' | 'review' | 'myMeeting';

const TABS: { key: TabKey; label: string }[] = [
	{ key: 'meeting', label: '나의 모임' },
	{ key: 'review', label: '나의 리뷰' },
	{ key: 'myMeeting', label: '내가 만든 모임' }
];

/**
 * `MyActivityContainer` 컴포넌트
 *
 * 사용자의 활동을 탭 형태로 보여주는 UI를 렌더링합니다.
 * - "나의 모임", "나의 리뷰", "내가 만든 모임" 3개의 탭 메뉴 제공
 * - 클릭 시 activeTab 상태를 변경하여 선택된 탭 스타일 적용
 *
 * @component
 * @returns {JSX.Element} 사용자의 활동 탭 UI를 반환합니다.
 */
export default function MyActivityContainer() {
	const [activeTab, setActiveTab] = useState<TabKey>('meeting');

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
		</div>
	);
}
