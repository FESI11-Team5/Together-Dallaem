import { UseFormReturn } from 'react-hook-form';
import GatheringModal from '../GatheringModal';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateGathering } from '@/types/response/gatherings';

// AAA방식 적용기

describe('GatheringModal - 게시글 작성', () => {
	test('게시글 작성이 200을 반환하는 경우', async () => {
		// fetch mock
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200
		});
		// alert mock
		window.alert = jest.fn();

		let formApi: UseFormReturn<CreateGathering> | undefined;
		render(<GatheringModal onFormReady={api => (formApi = api)} />);

		// 이름 입력
		const nameInput = screen.getByLabelText('모임 이름');
		fireEvent.change(nameInput, { target: { value: '테스트 모임' } });

		// 장소 선택
		const placeInput = screen.getByLabelText('장소');
		fireEvent.change(placeInput, { target: { value: '건대입구' } });

		// 모집 정원
		const capacityInput = screen.getByLabelText('모집 정원');
		fireEvent.change(capacityInput, { target: { value: '10' } });

		// ✅ setValue 직접 사용해서 날짜 값 채워넣기
		formApi?.setValue('dateTime', '2024-12-31T18:00');
		formApi?.setValue('registrationEnd', '2024-12-30T18:00');

		// 서비스 선택
		const serviceInput = screen.getByLabelText('달램핏 - 오피스 스트레칭');
		fireEvent.click(serviceInput);

		// 이미지 mock 업로드
		const file = new File(['dummy'], 'test.png', { type: 'image/png' });
		const fileInput = screen.getByLabelText('이미지', { selector: 'input' }) as HTMLInputElement;
		fireEvent.change(fileInput, { target: { files: [file] } });

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
