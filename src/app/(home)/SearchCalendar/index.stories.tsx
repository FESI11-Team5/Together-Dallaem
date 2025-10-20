import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import SearchCalendar from '.';

const meta: Meta<typeof SearchCalendar> = {
	title: 'Home/SearchCalendar',
	component: SearchCalendar,
	parameters: {
		layout: 'centered'
	}
};

export default meta;
type Story = StoryObj<typeof SearchCalendar>;

export const Default: Story = {
	render: () => {
		const [selectedDate, setSelectedDate] = useState<Date>();

		return <SearchCalendar date={selectedDate} setDate={setSelectedDate} />;
	}
};

export const WithOnChange: Story = {
	render: () => {
		const [selectedDate, setSelectedDate] = useState<Date>();

		return (
			<div className="p-4">
				<p className="mb-2 text-sm text-gray-500">날짜를 선택하면 콘솔에 onChange 로그가 찍힙니다.</p>
				<SearchCalendar
					date={selectedDate}
					setDate={date => {
						setSelectedDate(date);
						console.log('선택된 날짜:', date);
					}}
				/>
			</div>
		);
	}
};
