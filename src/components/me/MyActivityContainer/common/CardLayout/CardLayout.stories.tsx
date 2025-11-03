import { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JoinedGathering, Gathering } from '@/types/response/gatherings';
import CardLayout from './CardLayout';
import GatheringBadge from '../../JoinedGatherings/GatheringBadge';

// ----------------------------------------------------------------------
// Mock 데이터 정의
// ----------------------------------------------------------------------

const baseGathering: Gathering = {
	teamId: 1105,
	id: 1,
	type: 'DALLAEMFIT',
	name: '롤 듀오 구합니다.',
	image: 'https://picsum.photos/id/60/700/400', // 더미 이미지 URL
	location: '건대입구',
	dateTime: '2025-11-10T15:00:00Z',
	registrationEnd: '2025-11-08T15:00:00Z',
	participantCount: 5,
	capacity: 10,
	createdBy: 1,
	canceledAt: null
};

const joinedGathering: JoinedGathering = {
	...baseGathering,
	// JoinedGathering 타입에 필요한 추가 필드
	isCompleted: true,
	isReviewed: false,
	joinedAt: '2025-10-02T15:00:00Z'
};

const fullGathering: Gathering = {
	...baseGathering,
	id: 2,
	name: '배그할 사람',
	location: '건대입구',
	participantCount: 10,
	capacity: 10, // 인원 가득 참
	dateTime: '2025-11-15T19:30:00Z',
	image: 'https://picsum.photos/id/10/700/400'
};

const meta: Meta<typeof CardLayout> = {
	title: 'Me/Common/CardLayout',
	component: CardLayout,
	tags: ['autodocs'],
	// 모든 스토리가 어두운 배경에서 네온 섀도우를 볼 수 있도록 설정
	decorators: [
		Story => (
			<div style={{ padding: '20px', maxWidth: '700px', backgroundColor: '#1A1A1A', margin: '0 auto' }}>
				<Story />
			</div>
		)
	],
	argTypes: {
		gathering: { control: 'object', description: '모임 정보 객체' },
		badgeContent: { control: 'object', description: '이미지 위에 표시될 뱃지 컨텐츠' },
		children: { control: 'object', description: '카드 하단에 표시될 추가 컨텐츠 (버튼 등)' }
	}
};

export default meta;

type Story = StoryObj<typeof CardLayout>;

// ----------------------------------------------------------------------
// --- 개별 스토리 정의 ---
// ----------------------------------------------------------------------

const renderGatheringBadge = (g: JoinedGathering): ReactNode => {
	const isFull = g.capacity === g.participantCount;
	return <GatheringBadge gathering={g} isFull={isFull} />;
};

/**
 * ### 1. Default Card
 * 모임 정보만 표시하는 기본적인 상태를 보여줍니다.
 */
export const Default: Story = {
	name: '기본 모임 카드',
	args: {
		gathering: baseGathering,
		badgeContent: undefined,
		children: undefined
	}
};

/**
 * ### 2. Card with Badge
 * 모임 이미지 위에 뱃지 컨텐츠가 추가된 상태를 보여줍니다.
 */
export const JoinedCompleted: Story = {
	name: '뱃지 추가 (이용 완료)',
	args: {
		gathering: joinedGathering,
		badgeContent: renderGatheringBadge(joinedGathering as JoinedGathering), // Mock 뱃지 컨텐츠 삽입
		children: undefined
	}
};

export const JoinedScheduledAndFull: Story = {
	name: '뱃지 추가 (이용 예정 & 개설 확정)',
	args: {
		gathering: fullGathering,
		badgeContent: renderGatheringBadge(fullGathering as JoinedGathering), // Mock 뱃지 컨텐츠 삽입
		children: undefined
	}
};
