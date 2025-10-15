'use client';

import { useState } from 'react';

import Image from 'next/image';
import Tab from '../commons/Tab';
import Chip from '../commons/Chip';

export default function LikedGathering() {
	const [selectedTab, setSelectedTab] = useState('dalaemfit');

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			{/* 이미지 + 타이틀 서브타이틀 */}
			<section className="flex gap-[13px]">
				<div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-gray-800 bg-orange-50">
					<Image src="/icons/heart_to_heart.svg" alt="찜한 모임" width={32} height={30} />
				</div>
				<div className="flex flex-col items-start justify-center gap-2">
					<h1 className="leading-2xl text-2xl font-semibold text-gray-900">찜한 모임</h1>
					<p className="leading-sm text-sm font-medium text-gray-700">마감되기 전에 지금 바로 참여해보세요👀</p>
				</div>
			</section>

			{/* 큰 분류 탭 ( 달램핏 / 워케이션 ) + 작은 분류 탭 ( 달램핏 - 전체 / 오피스 스트레칭 + 마인드풀니스 |  워케이션 - 전체  ) */}
			<section>
				<div className="mt-6 mb-3">
					<Tab
						options={[
							{ value: 'dalaemfit', text: '달램핏', icon: '/icons/dalaemfit.svg' },
							{ value: 'workation', text: '워케이션', icon: '/icons/workation.svg' }
						]}
						selectedTab={selectedTab}
						onTabChange={tabValue => setSelectedTab(tabValue)}
					/>
				</div>

				<div className="mb:pb-4 flex gap-2 border-b-2 border-gray-200">
					{selectedTab === 'dalaemfit' ? (
						<>
							<Chip text="전체" isActive />
							<Chip text="오피스 트레이닝" />
							<Chip text="마인드풀니스" />
						</>
					) : (
						<Chip text="전체" isActive />
					)}
				</div>
				{/* 카드 리스트 */}
			</section>
		</div>
	);
}
