import { useTokenStore } from '@/stores/token';
import type { Meta, StoryObj } from '@storybook/nextjs';
import GNB from './index';

// TODO: 스토리북 오류로 스토리북 에러 해결 후 재확인
const meta: Meta<typeof GNB> = {
	title: 'Components/GNB',
	component: GNB,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof GNB>;

export const LoggedOut: Story = {
	name: '미로그인 상태',
	render: () => {
		return <GNB />;
	}
};

export const LoggedIn: Story = {
	name: '로그인 상태',
	render: () => {
		useTokenStore.setState({ token: 'token', userId: 1 });
		return <GNB />;
	}
};
