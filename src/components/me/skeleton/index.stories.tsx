import { Meta, StoryObj } from '@storybook/nextjs-vite';
import MeSkeleton from '.';

const meta: Meta<typeof MeSkeleton> = {
	title: 'Skeletons/MeSkeleton',
	component: MeSkeleton
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
