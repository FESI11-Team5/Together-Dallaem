import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { DropdownMenu } from '.';

describe('DropdownMenu 유닛 테스트', () => {
	let user: UserEvent;
	const mockCallback = jest.fn();
	const options = [
		{ value: 'menu1', text: '메뉴1' },
		{ value: 'menu2', text: '메뉴2' }
	];

	beforeEach(() => {
		user = userEvent.setup();
		render(
			<div>
				<p>외부라고 가정할 요소</p>
				<DropdownMenu>
					<DropdownMenu.Trigger>
						<span>Trigger</span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Items options={options} onClick={mockCallback} />
				</DropdownMenu>
			</div>
		);
	});

	test('트리거를 눌렀을 때 메뉴가 열린다', async () => {
		// 1. 트리거를 클릭한다.
		const trigger = screen.getByRole('button', { name: 'DropdownMenu Trigger' });
		await user.click(trigger);

		// 2. 메뉴가 존재하는지 확인한다.
		await waitFor(() => {
			expect(screen.getByRole('listbox', { name: '옵션 목록' })).toBeInTheDocument();
			expect(screen.getByText('메뉴1')).toBeInTheDocument();
			expect(screen.getByText('메뉴2')).toBeInTheDocument();
		});
	});

	test('메뉴가 열려있을 때 트리거를 다시 누르면 메뉴가 닫힌다', async () => {
		// 1. 트리거를 클릭한다.
		const trigger = screen.getByRole('button', { name: 'DropdownMenu Trigger' });
		await user.click(trigger);

		// 2. 메뉴가 존재하는지 확인한다.
		const listbox = await screen.findByRole('listbox', { name: '옵션 목록' });

		expect(listbox).toBeInTheDocument();
		expect(screen.getByText('메뉴1')).toBeInTheDocument();
		expect(screen.getByText('메뉴2')).toBeInTheDocument();

		// 3. 트리거를 다시 클릭한다.
		await user.click(trigger);

		// 4. 메뉴가 존재하지 않는지 확인한다.
		expect(listbox).not.toBeInTheDocument();
	});

	test('메뉴가 열려있을 때 아이템을 클릭하면 메뉴가 닫힌다', async () => {
		// 1. 트리거를 클릭한다.
		const trigger = screen.getByRole('button', { name: 'DropdownMenu Trigger' });
		await user.click(trigger);

		// 2. 메뉴가 존재하는지 확인한다.
		const listbox = await screen.findByRole('listbox', { name: '옵션 목록' });

		expect(listbox).toBeInTheDocument();
		expect(screen.getByText('메뉴1')).toBeInTheDocument();
		expect(screen.getByText('메뉴2')).toBeInTheDocument();

		// 3. 메뉴 아이템 1을 클릭한다.
		const button = await screen.findByRole('option', { name: `${options[0].value}-${options[0].text}` });
		await user.click(button);

		expect(mockCallback).toHaveBeenCalledWith(options[0].value);

		// 4. 메뉴가 존재하지 않는지 확인한다.
		expect(listbox).not.toBeInTheDocument();
	});

	test('메뉴가 열려있을 때 메뉴 외부를 클릭하면 메뉴가 닫힌다', async () => {
		// 1. 트리거를 클릭한다.
		const trigger = screen.getByRole('button', { name: 'DropdownMenu Trigger' });
		await user.click(trigger);

		// 2. 메뉴가 존재하는지 확인한다.
		const listbox = await screen.findByRole('listbox', { name: '옵션 목록' });

		expect(listbox).toBeInTheDocument();
		expect(screen.getByText('메뉴1')).toBeInTheDocument();
		expect(screen.getByText('메뉴2')).toBeInTheDocument();

		// 3. 메뉴 외부를 클릭한다.
		await user.click(screen.getByText('외부라고 가정할 요소'));

		// 4. 메뉴가 존재하지 않는지 확인한다.
		expect(listbox).not.toBeInTheDocument();
	});
});
