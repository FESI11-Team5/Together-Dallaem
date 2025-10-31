import type { Meta, StoryObj } from '@storybook/nextjs';
import CardSkeleton from '.';

const meta: Meta<typeof CardSkeleton> = {
	title: 'Home/CardSkeleton',
	component: CardSkeleton,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof CardSkeleton>;
export const Default: Story = {
	render: () => {
		return <CardSkeleton />;
	}
};
