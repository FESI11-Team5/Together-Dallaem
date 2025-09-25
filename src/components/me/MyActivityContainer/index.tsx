'use client';

import { useState } from 'react';

export default function MyActivityContainer() {
	const [activeTab, setActiveTab] = useState('meeting');

	return (
		<div className="tb:px-6 border-t-2 border-gray-900 px-4 py-6">
			{/* 나의 모임, 나의 리뷰, 내가 만든 모임 탭 메뉴 */}
			<div className="mb-6 flex gap-3 text-lg font-semibold tracking-normal">
				<button
					type="button"
					onClick={() => setActiveTab('meeting')}
					className={
						activeTab === 'meeting'
							? 'border-b-2 border-gray-900 pb-1.5 text-gray-900'
							: 'border-b-2 border-transparent pb-1.5 text-gray-400'
					}>
					나의 모임
				</button>
				<button
					onClick={() => setActiveTab('review')}
					type="button"
					className={
						activeTab === 'review'
							? 'border-b-2 border-gray-900 pb-1.5 text-gray-900'
							: 'border-b-2 border-transparent pb-1.5 text-gray-400'
					}>
					나의 리뷰
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('myMeeting')}
					className={
						activeTab === 'myMeeting'
							? 'border-b-2 border-gray-900 pb-1.5 text-gray-900'
							: 'border-b-2 border-transparent pb-1.5 text-gray-400'
					}>
					내가 만든 모임
				</button>
			</div>
		</div>
	);
}
