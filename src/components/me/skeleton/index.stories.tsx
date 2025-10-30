import { Meta, StoryObj } from '@storybook/nextjs-vite';
import MeSkeleton from '.';

const meta: Meta<typeof MeSkeleton> = {
	title: 'Skeletons/MeSkeleton',
	component: MeSkeleton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'[source code](https://github.com/FESI11-Team5/Together-Dallaem/tree/TD-178/src/components/me/skeleton)'
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
