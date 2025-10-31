import type { Meta, StoryObj } from '@storybook/nextjs';
import BasicCheckBox from './BasicCheckBox';

const meta: Meta<typeof BasicCheckBox> = {
	title: 'Components/Basic/BasicCheckBox',
	component: BasicCheckBox,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof BasicCheckBox>;

export const Checkbox: Story = {
	name: '기본 체크박스',
	render: () => {
		return <BasicCheckBox title="체크박스"></BasicCheckBox>;
	}
};

export const CheckedCheckbox: Story = {
	name: '활성화된 체크박스',
	render: () => {
		return <BasicCheckBox title="체크박스" checked></BasicCheckBox>;
	}
};

export const CheckboxWithSubtitle: Story = {
	name: 'subtitle 있는 체크박스',
	render: () => {
		return <BasicCheckBox title="체크박스" content="subtitle" checked></BasicCheckBox>;
	}
};
