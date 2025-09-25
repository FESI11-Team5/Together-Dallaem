'use client';

import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useModal } from '@/app/hooks/useModal';
import BasicButton from './BasicButton';
import BasicInput from './BasicInput';
import BasicTextBox from './BasicTextBox';
import BasicSelectBox from './BasicSelectBox';
import ExampleModal from './ExampleModal';

export default function Home() {
	const { control, handleSubmit, watch, register } = useForm();
	const { openModal } = useModal();

	const selectedValue = watch('selectField');
	const value = watch('myInputField') ?? '';
	const isValid = useMemo(() => value.trim().length > 4, [value]);

	return (
		<div className="flex h-screen flex-col items-start justify-start gap-6">
			<form
				onSubmit={handleSubmit(() => {
					console.log('제출!!');
				})}>
				{/* register 또는 controller 둘 중 하나 방식으로 작성 selectbox:register input:controller로 각각의 예시 작성함 */}
				<BasicSelectBox
					options={[
						{ value: 'option1', text: '옵션 1' },
						{ value: 'option2', text: '옵션 2' }
					]}
					register={register('selectField')}
					isLarge={false}
					placeholder="선택"
				/>
				<Controller
					name="myInputField"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<BasicInput
							{...field}
							placeholder="할 일의 제목을 적어주세요."
							required
							isValid={isValid}
							invalidText="5자 이상 입력해주세요"
						/>
					)}
				/>
				<BasicTextBox>{selectedValue}</BasicTextBox>
				<BasicButton
					onClick={() => {
						console.log('button clicked');
					}}
					isActive={isValid}
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
