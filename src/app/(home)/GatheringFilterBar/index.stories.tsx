import ModalContainer from '@/components/commons/ModalContainer';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import type { Meta, StoryObj } from '@storybook/nextjs';
import GatheringFilterBar from '.';

const meta: Meta<typeof GatheringFilterBar> = {
	title: 'Home/GatheringFilterBar',
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ModalStoreProvider>
			<GatheringFilterBar
				setFilterCriteria={criteria => {
					console.log('🔍 Filter criteria changed:', criteria);
				}}
			/>
			<ModalContainer />
		</ModalStoreProvider>
	)
};
