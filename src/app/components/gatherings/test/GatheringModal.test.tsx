import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import GatheringModal from '../GatheringModal';

describe('GatheringModal - 게시글 작성', () => {
	test('게시글 작성이 200을 반환하는 경우', async () => {
		// fetch mock
		global.fetch = jest.fn();
		// alert mock
		window.alert = jest.fn();

		// fetch 성공 응답 mock
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			status: 200
		});

		render(<GatheringModal />);

		// 이름 입력
		fireEvent.change(screen.getByLabelText('모임 이름'), {
			target: { value: '테스트 모임' }
		});

		// 장소 선택
		fireEvent.change(screen.getByLabelText('장소'), {
			target: { value: '건대입구' }
		});

		// 모집 정원
		fireEvent.change(screen.getByLabelText('모집 정원'), {
			target: { value: '10' }
		});

		// 날짜 입력
		fireEvent.change(screen.getByLabelText('모임 날짜'), {
			target: { value: '2025-09-22T10:00' }
		});
		fireEvent.change(screen.getByLabelText('마감 날짜'), {
			target: { value: '2025-09-23T10:00' }
		});

		// 서비스 선택
		fireEvent.click(screen.getByLabelText('달램핏 - 오피스 스트레칭'));

		// 이미지 mock 업로드
		const file = new File(['dummy'], 'test.png', { type: 'image/png' });
		const fileInput = screen.getByLabelText('이미지', { selector: 'input' });
		fireEvent.change(fileInput, { target: { files: [file] } });

		expect((fileInput as HTMLInputElement).files?.[0].name).toBe('test.png');
		expect((fileInput as HTMLInputElement).files?.[0]).toBeInstanceOf(File);

		// 제출
		const submitButton = screen.getByRole('button', { name: '확인' });
		fireEvent.click(submitButton);

		// fetch 호출 확인
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledTimes(1);
		});

		// alert 호출 확인
		expect(window.alert).toHaveBeenCalledWith('게시글이 생성되었습니다');
	});
});
