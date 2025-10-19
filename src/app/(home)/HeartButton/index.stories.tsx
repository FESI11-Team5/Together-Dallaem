import { useWishlistStore } from '@/stores/wishList';
import type { Meta, StoryObj } from '@storybook/nextjs';
import HeartButton from '.';

const meta: Meta<typeof HeartButton> = {
	title: 'Home/HeartButton',
	component: HeartButton,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof HeartButton>;

export const Wished: Story = {
	name: '찜한 경우',
	render: () => {
		useWishlistStore.setState({ wishlist: new Set([0, 1]) });
		return <HeartButton id={1} />;
	}
};

export const LogNotWishedgedIn: Story = {
	name: '찜하지 않은 경우',
	render: () => {
		useWishlistStore.setState({ wishlist: new Set([0, 1]) });
		return <HeartButton id={2} />;
	}
};
