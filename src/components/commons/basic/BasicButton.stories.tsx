import type { Meta, StoryObj } from '@storybook/nextjs';
import BasicButton from './BasicButton';

const meta: Meta<typeof BasicButton> = {
	title: 'Components/Basic/BasicButton',
	component: BasicButton,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof BasicButton>;

export const SolidButton: Story = {
	name: '기본 버튼',
	render: () => {
		return <BasicButton>테스트 버튼</BasicButton>;
	}
};

export const OutlinedButton: Story = {
	name: '아웃라인 버튼',
	render: () => {
		return <BasicButton outlined>테스트 버튼</BasicButton>;
	}
};

export const DisabledButton: Story = {
	name: '비활성화 버튼',
	render: () => {
		return <BasicButton isActive={false}>테스트 버튼</BasicButton>;
	}
};

export const DisabledOutlinedButton: Story = {
	name: '비활성화된 아웃라인 버튼',
	render: () => {
		return (
			<BasicButton isActive={false} outlined>
				테스트 버튼
			</BasicButton>
		);
	}
};

export const LargeButton: Story = {
	name: '큰 버튼',
	render: () => {
		return <BasicButton isLarge>테스트 버튼</BasicButton>;
	}
};
