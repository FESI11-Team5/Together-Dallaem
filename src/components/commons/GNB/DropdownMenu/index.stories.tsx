import type { OptionType } from '@/components/commons/basic/BasicDropbox';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { DropdownMenu } from '.';

const meta: Meta<typeof DropdownMenu> = {
	title: 'Components/DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const options: OptionType[] = [
	{ value: 'menu1', text: '메뉴1' },
	{ value: 'menu2', text: '메뉴2' }
];

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenu.Trigger>
				<div className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 shadow-sm select-none hover:bg-gray-200">
					메뉴 열기
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content options={options} onClick={value => alert(`선택된 메뉴: ${value}`)} />
		</DropdownMenu>
	)
};
