import type { Gathering } from '@/types/response/gatherings';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from '.';


const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Card>;

const gathering: Gathering = {
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
};

const handleClick = (id: number) => {
	console.log(id);
};

export const Default: Story = {
	render: () => {
		return <Card gathering={gathering} onClick={() => handleClick(gathering.id)} />;
	}
};
