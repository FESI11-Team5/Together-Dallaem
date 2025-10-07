import { UseFormReturn } from 'react-hook-form';
import GatheringModal from '../GatheringModal';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateGathering } from '@/types/response/gatherings';
import { ModalStoreProvider } from '@/providers/ModalProvider';

// AAA방식 적용기

// Mock useModal hook
jest.mock('@/hooks/useModal', () => ({
	useModal: () => ({
		openModal: jest.fn(),
		closeModal: jest.fn(),
		closeAllModals: jest.fn(),
		isModalOpen: jest.fn()
	}),
	useModalClose: () => jest.fn()
}));

describe('GatheringModal - 게시글 작성', () => {
	test('게시글 작성이 200을 반환하는 경우', async () => {
		// fetch mock
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200
		});
		// alert mock
		window.alert = jest.fn();

		let formAPI: UseFormReturn<CreateGathering>;
		render(
			<ModalStoreProvider>
				<GatheringModal formReady={api => (formAPI = api)} />
			</ModalStoreProvider>
		);

		// 이름 입력
		const nameInput = screen.getByLabelText('모임 이름');
		fireEvent.change(nameInput, { target: { value: '테스트 모임' } });

		// 장소 선택
		const placeInput = screen.getByLabelText('장소');
		fireEvent.change(placeInput, { target: { value: '건대입구' } });

		// 모집 정원
		const capacityInput = screen.getByLabelText('모집 정원');
		fireEvent.change(capacityInput, { target: { value: '10' } });

		// 날짜 선택 - 달력 컴포넌트가 react-hook-form과 연동되어 있지 않아 setValue로 직접 설정
		// waitFor을 사용하여 formAPI가 할당될 때까지 대기
		await waitFor(() => {
			// 모임 날짜 선택
			formAPI.setValue('dateTime', '2024-12-25T10:00');
			// 마감 날짜 선택
			formAPI.setValue('registrationEnd', '2024-12-20T10:00');
		});

		// 서비스 선택
		const serviceSelect = screen.getByLabelText('달램핏 - 오피스 스트레칭');
		fireEvent.click(serviceSelect);

		// 이미지 mock 업로드
		const file = new File(['dummy'], 'test.png', { type: 'image/png' });
		const fileInput = screen.getByLabelText('이미지', { selector: 'input' }) as HTMLInputElement;
		fireEvent.change(fileInput, { target: { files: [file] } });

		expect(fileInput.files?.[0].name).toBe('test.png');
		expect(fileInput.files?.[0]).toBeInstanceOf(File);

		// 제출
		const submitButton = screen.getByRole('button', { name: '확인' });
		fireEvent.click(submitButton);

		const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		fireEvent.click(screen.getByRole('button', { name: '확인' }));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('추후 API 연동 예정');
		});
	});
});
