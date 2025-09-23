'use client';

import BasicButton from './BasicButton';
import BasicInput from './BasicInput';
import { useForm, Controller } from 'react-hook-form';
import { useMemo } from 'react';

export default function Home() {
	const { control, handleSubmit, watch } = useForm();
	const value = watch('myInputField') ?? '';
	const isValid = useMemo(() => value.trim().length > 4, [value]);

	return (
		<div className="flex h-screen flex-col items-start justify-start gap-6">
			<form
				onSubmit={handleSubmit(() => {
					console.log('제출!!');
				})}>
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
				<BasicButton
					onClick={() => {
						console.log('button clicked');
					}}
					isActive={isValid}
					outlined>
					생성하기
				</BasicButton>
			</form>
		</div>
	);
}
