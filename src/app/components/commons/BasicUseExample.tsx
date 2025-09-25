'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '@/app/hooks/useModal';
import BasicButton from './BasicButton';
import BasicInput from './BasicInput';
import BasicTextBox from './BasicTextBox';
import BasicSelectBox from './BasicSelectBox';
import ExampleModal from './ExampleModal';
import BasicTextArea from './BasicTextArea';

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
		console.log('제출!!');
	}, [inputValue, validation]);

	return (
		<div className="flex h-screen flex-col items-start justify-start gap-6">
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				{/* react-hook-form의 register 방식으로 작성*/}
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
				<BasicButton
					onClick={() => {
						handleFormSubmit();
					}}
					isActive={inputValue.length > 0}
					outlined>
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
