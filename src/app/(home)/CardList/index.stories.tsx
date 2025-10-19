import type { Gathering } from '@/types/response/gatherings';
import type { Meta, StoryObj } from '@storybook/nextjs';
import CardList from '.';

const meta: Meta<typeof CardList> = {
	title: 'Home/CardList',
	component: CardList,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof CardList>;

const gatherings: Gathering[] = [
	{
		teamId: 1,
		id: 1,
		type: 'DALLAEMFIT',
		name: '달램핏 오피스 스트레칭',
		dateTime: '2025-10-20T17:30:00Z',
		registrationEnd: '2025-10-19T21:00:00Z',
		location: '을지로 3가',
		participantCount: 8,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 1,
		type: 'DALLAEMFIT',
		name: '달램핏 오피스 스트레칭',
		dateTime: '2025-10-20T17:30:00Z',
		registrationEnd: '2025-10-19T21:00:00Z',
		location: '을지로 3가',
		participantCount: 8,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 1,
		type: 'DALLAEMFIT',
		name: '달램핏 오피스 스트레칭',
		dateTime: '2025-10-20T17:30:00Z',
		registrationEnd: '2025-10-19T21:00:00Z',
		location: '을지로 3가',
		participantCount: 8,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 1,
		type: 'DALLAEMFIT',
		name: '달램핏 오피스 스트레칭',
		dateTime: '2025-10-20T17:30:00Z',
		registrationEnd: '2025-10-19T21:00:00Z',
		location: '을지로 3가',
		participantCount: 8,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	},
	{
		teamId: 1,
		id: 1,
		type: 'DALLAEMFIT',
		name: '달램핏 오피스 스트레칭',
		dateTime: '2025-10-20T17:30:00Z',
		registrationEnd: '2025-10-19T21:00:00Z',
		location: '을지로 3가',
		participantCount: 8,
		capacity: 20,
		image: '/images/example1.jpg',
		createdBy: 1,
		canceledAt: null
	}
];

export const Default: Story = {
	render: () => {
		return <CardList gatherings={gatherings} />;
	}
};
