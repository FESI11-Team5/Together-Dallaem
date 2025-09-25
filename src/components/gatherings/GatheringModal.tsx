'use client';

import { Gathering } from '@/types/response/gatherings';
import BasicCalendar from '../commons/BasicCalendar';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function GatheringModal() {
	const {
		watch,
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { isSubmitting }
	} = useForm<Gathering>({
		defaultValues: {
			teamId: 5,
			location: '',
			type: '',
			name: '',
			dateTime: '',
			// capacity: 0,
			image: null,
			registrationEnd: ''
		}
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const formValues = watch(); // 버튼 활성화 모드를 위한 실시간 감지

	console.log(formValues);

	const isFormFilled =
		formValues.name &&
		formValues.location &&
		formValues.type &&
		formValues.dateTime &&
		formValues.registrationEnd &&
		formValues.capacity >= 5;

	const onSubmitForm = async (data: Gathering) => {
		const body = new FormData();

		body.append('teamId', String(data.teamId));
		body.append('location', data.location);
		body.append('type', data.type);
		body.append('name', data.name);
		body.append('dateTime', data.dateTime);
		body.append('capacity', String(data.capacity));
		body.append('registrationEnd', data.registrationEnd);

		// 파일 첨부가 있을 때만 서버 전송
		if (data.image instanceof File) {
			body.append('image', data.image);
		}

		console.log('전송할 폼 데이터:', body);

		try {
			const response = await fetch(`https://fe-adv-project-together-dallaem.vercel.app/${data.teamId}/gatherings`, {
				method: 'POST',
				body
			});

			if (!response.ok) {
				throw new Error('게시글 생성 중 오류가 발생하였습니다.');
			}

			alert('게시글이 생성되었습니다');
			reset();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col">
			모임 만들기
			<form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
				<label htmlFor="gathering-name">모임 이름</label>
				<input {...register('name')} id="gathering-name" type="text" className="border border-black" />

				<label htmlFor="gathering-location">장소</label>
				<select {...register('location')} id="gathering-location" className="border border-black">
					<option value="">장소를 선택해주세요</option>
					<option value="건대입구">건대입구</option>
					<option value="을지로3가">을지로3가</option>
					<option value="신림">신림</option>
					<option value="홍대">홍대</option>
				</select>

				<div className="flex flex-col">
					<label htmlFor="gathering-image">이미지</label>
					<div className="flex items-center gap-2">
						<input
							id="gathering-image"
							type="file"
							accept="image/*"
							className="hidden"
							ref={fileInputRef}
							onChange={e => {
								const file = e.target.files?.[0];
								if (file) {
									setValue('image', file);
								}
							}}
						/>

						<div className="flex-1">{watch('image') ? (watch('image') as File).name : '이미지를 첨부해주세요'}</div>

						{/* 오른쪽 버튼 */}
						<button type="button" onClick={() => fileInputRef.current?.click()} className="">
							파일 찾기
						</button>
					</div>
				</div>

				<label>선택 서비스</label>
				<div className="flex gap-4">
					<label>
						<input
							type="checkbox"
							value="OFFICE_STRETCHING"
							checked={watch('type') === 'OFFICE_STRETCHING'}
							onChange={e => {
								if (e.target.checked) {
									setValue('type', 'OFFICE_STRETCHING');
								} else {
									setValue('type', ''); // 해제하면 빈 값
								}
							}}
						/>
						달램핏 - 오피스 스트레칭
					</label>

					<label>
						<input
							type="checkbox"
							value="MINDFULNESS"
							checked={watch('type') === 'MINDFULNESS'}
							onChange={e => {
								if (e.target.checked) {
									setValue('type', 'MINDFULNESS');
								} else {
									setValue('type', '');
								}
							}}
						/>
						달램핏 - 마인드풀니스
					</label>

					<label>
						<input
							type="checkbox"
							value="WORKATION"
							checked={watch('type') === 'WORKATION'}
							onChange={e => {
								if (e.target.checked) {
									setValue('type', 'WORKATION');
								} else {
									setValue('type', '');
								}
							}}
						/>
						위케이션
					</label>
				</div>

				<div className="flex justify-between">
					<div className="flex flex-col">
						<label htmlFor="gathering-start-date">모임 날짜</label>
						<BasicCalendar pageType="create" />
					</div>
					<div className="flex flex-col">
						<label htmlFor="gathering-end-date">마감 날짜</label>
						<BasicCalendar pageType="create" />
					</div>
				</div>

				<label htmlFor="gathering-capacity">모집 정원</label>
				<input
					{...register('capacity', { valueAsNumber: true })}
					id="gathering-capacity"
					placeholder="최소 5인 이상 입력해주세요"
					type="number"
					className="border border-black"
				/>

				<button
					type="submit"
					disabled={!isFormFilled || isSubmitting}
					className={`${isFormFilled ? 'bg-blue-400' : ''}`}>
					{isSubmitting ? '등록 중...' : '확인'}
				</button>
			</form>
		</div>
	);
}
