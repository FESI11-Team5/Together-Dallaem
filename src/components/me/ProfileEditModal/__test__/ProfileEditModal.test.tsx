import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileEditModal from '../ProfileEditModal';

/**
 * useModalClose 훅을 모킹
 * - 실제 Modal Context 없이 테스트 가능하도록 더미 함수 반환
 */
jest.mock('@/hooks/useModal', () => ({
	useModalClose: jest.fn(() => jest.fn()) // closeModal 함수를 반환하도록 모킹
}));

/**
 * ProfileEditModal 컴포넌트 테스트
 *
 * - 기본 회사명 렌더링 확인
 * - 회사명 수정 후 onSubmit 호출 확인
 */
describe('ProfileEditModal', () => {
	test('기본 회사명이 입력란에 표시되는지 확인', () => {
		render(<ProfileEditModal currentCompanyName="코드잇" onSubmit={() => {}} />);
		expect(screen.getByDisplayValue('코드잇')).toBeInTheDocument();
	});

	test('회사명 수정 후 onSubmit이 호출되는지 확인', async () => {
		const mockSubmit = jest.fn();
		render(<ProfileEditModal currentCompanyName="코드잇" onSubmit={mockSubmit} />);

		const input = screen.getByPlaceholderText('회사명');
		fireEvent.change(input, { target: { value: 'new코드잇' } });

		const button = screen.getByText('수정하기');
		fireEvent.click(button);

		await waitFor(() => {
			expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({ companyName: 'new코드잇' }));
		});
	});
});
