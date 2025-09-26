'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useModal, useModalClose } from '@/app/hooks/useModal';
import BasicButton from './BasicButton';
import BasicInput from './BasicInput';
import BasicTextBox from './BasicTextBox';
import BasicSelectBox from './BasicSelectBox';
import ExampleModal from './ExampleModal';
import BasicTextArea from './BasicTextArea';
import BasicModal from './BasicModal';

// 제출 완료 모달 컴포넌트(컴포넌트 파일 따로 생성하기 귀찮으면 이렇게 파일 내에 작성해도 됩니다.)
function SubmitCompleteModal() {
	const closeModal = useModalClose();

	return (
		<BasicModal onClose={closeModal}>
			<div className="mb-8 text-center">제출 완료 </div>
			<BasicButton onClick={closeModal} isLarge>
				확인
			</BasicButton>
		</BasicModal>
	);
}

export default function Home() {
	const { handleSubmit, watch, register } = useForm();
	const { openModal } = useModal();
	const [isValid, setIsValid] = useState(true);

	const selectedValue = watch('selectField');
	const textareaValue = watch('textareaField');
	const inputValue = watch('inputField') ?? '';

	const validation = useCallback(() => {
		return inputValue.trim().length > 4;
	}, [inputValue]);

	const handleFormSubmit = useCallback(() => {
		if (!validation()) {
			setIsValid(false);
			return;
		}
		setIsValid(true);
		openModal(<SubmitCompleteModal />);
	}, [inputValue, validation, openModal]);

	return (
		<div className="flex h-screen flex-col items-start justify-start gap-6">
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<BasicSelectBox
					options={[
						{ value: 'option1', text: '옵션 1' },
						{ value: 'option2', text: '옵션 2' }
					]}
					register={register('selectField')}
					isLarge={false}
					placeholder="선택"
				/>
				<BasicInput
					register={register('inputField')}
					placeholder="할 일의 제목을 적어주세요."
					required
					isValid={isValid}
					invalidText="5자 이상 입력해주세요"
					value={inputValue}
				/>
				<BasicTextBox>{selectedValue}</BasicTextBox>
				<BasicTextArea register={register('textareaField')}></BasicTextArea>
				<BasicButton isActive={inputValue.length > 0} outlined>
					생성하기
				</BasicButton>
			</form>
			<BasicButton
				onClick={() => {
					openModal(<ExampleModal />);
				}}>
				모달 창 열기
			</BasicButton>
		</div>
	);
}
