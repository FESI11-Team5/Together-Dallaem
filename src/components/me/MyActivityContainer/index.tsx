'use client';

import { useState } from 'react';
import JoinedGatherings from './JoinedGatherings';
import MyReviews from './MyReviews';
import CreatedGathering from './CreatedGathering';
import Tab from '@/components/commons/Tab';
import { TABS } from '@/constants/options';
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
type TabKey = 'JoinedGathering' | 'MyReview' | 'CreatedGathering';

export default function MyActivityContainer() {
	/** 현재 활성화된 탭 */
	const [activeTab, setActiveTab] = useState<TabKey>('JoinedGathering');

	return (
		<section className="mb:px-6 flex flex-1 flex-col border-t-3 border-white px-4 py-6">
			{/* 나의 모임, 나의 리뷰, 내가 만든 모임 탭 메뉴 */}
			<Tab
				options={TABS}
				selectedTab={activeTab}
				onTabChange={tabId => setActiveTab(tabId as TabKey)}
				className="mb-6"
			/>

			{/* 각 탭 클릭 시 알맞는 컨텐츠 호출 */}
			{activeTab === 'JoinedGathering' && <JoinedGatherings />}
			{activeTab === 'MyReview' && <MyReviews />}
			{activeTab === 'CreatedGathering' && <CreatedGathering />}
		</section>
	);
}
