import { useTokenStore } from '@/stores/token';
import type { Meta, StoryObj } from '@storybook/nextjs';
import SessionTimer from '.';

const setExp = (exp: number | null) => {
	useTokenStore.setState({ exp });
};

const meta: Meta<typeof SessionTimer> = {
	title: 'Components/SessionTimer',
	component: SessionTimer,
	decorators: [
		Story => (
			<div style={{ background: '#111', padding: '20px', width: '200px' }}>
				<Story />
			</div>
		)
	]
};

export default meta;
type Story = StoryObj<typeof SessionTimer>;

export const Default: Story = {
	args: {},
	render: () => {
		setExp(Math.floor(Date.now() / 1000) + 60);
		return <SessionTimer />;
	}
};

export const Expired: Story = {
	args: {},
	render: () => {
		setExp(Math.floor(Date.now() / 1000) - 10);
		return <SessionTimer />;
	}
};
