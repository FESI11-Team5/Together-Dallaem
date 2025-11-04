import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';
import { scoreData } from '@/types/response/reviews';

import ScoreSection from '.';
import Tab from '@/components/commons/Tab';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';
import { GatheringType } from '@/types/response/gatherings';
import Chip from '@/components/commons/Chip';

const meta: Meta<typeof ScoreSection> = {
	title: 'Reviews/ScoreSection',
	component: ScoreSection,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof ScoreSection>;

export const Default: Story = {
	name: '리뷰 점수 섹션',
	render: () => {
		const [scoreData, setScoreData] = useState<scoreData | null>(null);
		const [activeTab, setActiveTab] = useState<string>('DALLAEMFIT');
		const [selectedCategory, setSelectedCategory] = useState<GatheringType>('DALLAEMFIT');

		const iconMap = {
			OFFICE_STRETCHING: '/icons/steam_logo.svg',
			MINDFULNESS: '/icons/online.svg'
		} as const;

		useEffect(() => {
			if (selectedCategory === 'DALLAEMFIT') {
				setScoreData({
					teamId: 1,
					gatheringId: 1,
					type: 'DALLAEMFIT',
					averageScore: 4.5,
					oneStar: 1,
					twoStars: 2,
					threeStars: 3,
					fourStars: 18,
					fiveStars: 5
				});
			} else if (selectedCategory === 'WORKATION') {
				setScoreData({
					teamId: 1,
					gatheringId: 1,
					type: 'WORKATION',
					averageScore: 4.5,
					oneStar: 6,
					twoStars: 2,
					threeStars: 3,
					fourStars: 1,
					fiveStars: 20
				});
			} else if (selectedCategory === 'OFFICE_STRETCHING') {
				setScoreData({
					teamId: 1,
					gatheringId: 1,
					type: 'OFFICE_STRETCHING',
					averageScore: 4.5,
					oneStar: 1,
					twoStars: 2,
					threeStars: 8,
					fourStars: 7,
					fiveStars: 9
				});
			} else if (selectedCategory === 'MINDFULNESS') {
				setScoreData({
					teamId: 1,
					gatheringId: 1,
					type: 'MINDFULNESS',
					averageScore: 4.5,
					oneStar: 13,
					twoStars: 3,
					threeStars: 3,
					fourStars: 4,
					fiveStars: 12
				});
			}
		}, [selectedCategory]);

		return (
			<div className="w-full p-6">
				<section>
					<Tab
						options={TYPE_OPTIONS}
						selectedTab={activeTab}
						onTabChange={(tabId: string) => {
							if (tabId === 'DALLAEMFIT') {
								setSelectedCategory('DALLAEMFIT');
							} else if (tabId === 'WORKATION') {
								setSelectedCategory('WORKATION');
							}
							setActiveTab(tabId);
						}}
						className="mb-4"
					/>
					{activeTab === 'DALLAEMFIT' && (
						<div key="dallaemfit" className="flex gap-2">
							{SUB_TYPE_OPTIONS.map(({ value, text }) => (
								<Chip
									key={value}
									text={text}
									isActive={selectedCategory === value}
									imgUrl={iconMap[value as keyof typeof iconMap]}
									onClick={() => setSelectedCategory(value as GatheringType)}
								/>
							))}
						</div>
					)}
					{activeTab === 'WORKATION' && (
						<div key="workation" className="flex gap-2">
							<Chip text="전체" isActive />
						</div>
					)}
					<div className="divider mt-4 h-[2px] w-full bg-gray-200"></div>
				</section>
				<ScoreSection data={scoreData} />
			</div>
		);
	}
};
