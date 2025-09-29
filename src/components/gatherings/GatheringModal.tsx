'use client';

import { CreateGathering } from '@/types/response/gatherings';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';

import BasicCalendar from '../commons/BasicCalendar';
import BasicModal from '../commons/BasicModal';
import BasicButton from '../commons/BasicButton';
import BasicPopup from '../commons/BasicPopup';

/**
 * GatheringModal 컴포넌트
 * @returns GatheringModal 컴포넌트
 * - 모임 생성 폼을 제공
 * - react-hook-form을 사용하여 폼 상태 관리 및 유효성 검사
 * - 이미지 업로드, 모임 이름, 장소, 서비스 선택, 날짜 및 정원 입력 기능 포함
 * - 모든 필수 필드가 채워져야 제출 버튼 활성화
 * - 제출 시 서버에 폼 데이터 전송
 * - 제출 중에는 버튼 비활성화 및 로딩 상태 표시
 * - 제출 성공 시 폼 초기화 및 알림 표시
 * - 제출 실패 시 오류 콘솔 출력
 *
 */

export default function GatheringModal() {
	const {
		watch,
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { isSubmitting }
	} = useForm<CreateGathering>({
		defaultValues: {
			teamId: 5,
			location: '',
			type: '',
			name: '',
			dateTime: '',
			image: '',
			registrationEnd: ''
		}
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const formValues = watch(); // 버튼 활성화 모드를 위한 실시간 감지

	console.log(formValues);

	// const isFormFilled =
	// 	formValues.name &&
	// 	formValues.location &&
	// 	formValues.type &&
	// 	formValues.dateTime &&
	// 	formValues.registrationEnd &&
	// 	formValues.capacity >= 5 &&
	// 	formValues.capacity <= 20;

	const onSubmitForm = async (data: CreateGathering) => {
		// const body = new FormData();

		// body.append('teamId', String(data.teamId));
		// body.append('location', data.location);
		// body.append('type', data.type);
		// body.append('name', data.name);
		// body.append('dateTime', data.dateTime);
		// body.append('capacity', String(data.capacity));
		// body.append('registrationEnd', data.registrationEnd);
		// if (data.image instanceof File) {
		// 	body.append('image', data.image);
		// }

		// console.log('전송할 폼 데이터:', body);

		// try {
		// 	const response = await fetch(`https://fe-adv-project-together-dallaem.vercel.app/${data.teamId}/gatherings`, {
		// 		method: 'POST',
		// 		body
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error('게시글 생성 중 오류가 발생하였습니다.');
		// 	}

		// 	alert('게시글이 생성되었습니다');
		// 	reset();
		// } catch (error) {
		// 	console.log(error);
		// }
		console.log('추후 API 연동 예정');
	};

	const { openModal } = useModal();
	const closePopup = useModalClose(); // 자기 자신 닫기

	const handleCloseWithPopup = () => {
		const title = POPUP_MESSAGE.CREATE.title;
		const subTitle = POPUP_MESSAGE.CREATE.subTitle;

		openModal(
			<BasicPopup
				title={title}
				subTitle={subTitle}
				onConfirm={() => {
					closePopup(); // GatheringModal 닫기
				}}
				cancelText="취소"
			/>,
			'create-gathering-popup'
		);
	};
	return (
		<BasicModal onClose={handleCloseWithPopup} className="flex flex-col">
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

						<BasicCalendar
							pageType="create"
							onChange={date => setValue('dateTime', format(date, "yyyy-MM-dd'T'HH:mm:ss"))}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="gathering-end-date">마감 날짜</label>

						<BasicCalendar
							pageType="create"
							onChange={date => setValue('registrationEnd', format(date, "yyyy-MM-dd'T'HH:mm:ss"))}
						/>
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

				<BasicButton>확인</BasicButton>
			</form>
		</BasicModal>
	);
}
