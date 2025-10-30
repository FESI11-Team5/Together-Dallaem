import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileImageUploader from '../ProfileImageUploader';

/**
 * ProfileImageUploader 컴포넌트 테스트
 *
 * - 기본 이미지 렌더링 확인
 * - 파일 업로드 시 onChange 콜백 호출 확인
 */
describe('ProfileImageUploader', () => {
	test('기본 이미지를 렌더링하는지 확인', () => {
		render(<ProfileImageUploader onChange={() => {}} />);
		expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
	});

	test('파일을 업로드하면 onChange가 호출되는지 확인', async () => {
		const handleChange = jest.fn();
		render(<ProfileImageUploader onChange={handleChange} />);

		const file = new File(['임시 프로필 사진'], 'text.png', { type: 'image/png' });
		const input = screen.getByRole('button').nextSibling as HTMLInputElement;

		fireEvent.change(input, { target: { files: [file] } });

		await waitFor(() => {
			expect(handleChange).toHaveBeenCalledWith(file, expect.any(String));
		});
	});
});
