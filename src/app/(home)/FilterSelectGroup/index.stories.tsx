import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import FilterSelectGroup from '.';

const meta: Meta<typeof FilterSelectGroup> = {
	title: 'Home/FilterSelectGroup',
	component: FilterSelectGroup
};

export default meta;
type Story = StoryObj<typeof FilterSelectGroup>;

export const Default: Story = {
	render: () => {
		const [selectedLocation, setSelectedLocation] = useState<string | number>('');
		const [selectedDate, setSelectedDate] = useState<Date>();

		return (
			<div className="w-[420px] p-6">
				<FilterSelectGroup
					setSelectedLocation={setSelectedLocation}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
				<div className="mt-4 space-y-1 text-sm text-gray-500">
					<p>선택된 지역: {selectedLocation ?? '없음'}</p>
					<p>선택된 날짜: {selectedDate?.toDateString() ?? '없음'}</p>
				</div>
			</div>
		);
	}
};
