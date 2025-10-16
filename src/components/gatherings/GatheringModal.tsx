'use client';

import { format } from 'date-fns';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateGatheringSchema, GatheringSchemaType } from '@/utils/schema';
import { CreateGathering } from '@/types/response/createGathering';
import type { GatheringLocation, GatheringType } from '@/types/response/gatherings';

import BasicModal from '../commons/basic/BasicModal';
import BasicInput from '../commons/basic/BasicInput';
import BasicSelectBox from '../commons/basic/BasicSelectBox';
import BasicButton from '../commons/basic/BasicButton';
import BasicCalendar from '../commons/basic/BasicCalendar';
import BasicPopup from '../commons/basic/BasicPopup';
import BasicCheckBox from '../commons/basic/BasicCheckBox';

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
		control,
		formState: { errors, isSubmitting }
	} = useForm<GatheringSchemaType>({
		resolver: zodResolver(CreateGatheringSchema),
		mode: 'onChange',
		defaultValues: {
			teamId: 5,
			name: '',
			location: '' as GatheringLocation,
			type: '' as GatheringType,
			dateTime: '',
			registrationEnd: '',
			image: ''
		}
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

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

	// useEffect(() => {
	// 	if (formReady) {
	// 		formReady(methods);
	// 	}
	// }, [methods, formReady]);

	return (
		<BasicModal onClose={handleCloseWithPopup} className="relative" width="520px">
			<div className="absolute top-0 left-0">
				<h2 className="leading-lg text-lg font-semibold">모임 만들기</h2>
			</div>

			{/* 반복되는 필드를 컴포넌트로 묶어서 새로운 컴포넌트로 만들 예정입니다. */}
			<form onSubmit={handleSubmit(onSubmitForm)} className="mb:max-w-[472px] flex flex-col items-start gap-6">
				<div className="mt-12 flex w-full flex-col gap-3">
					<BasicInput
						id="gathering-name"
						label="모임 이름"
						placeholder="모임 이름을 작성해주세요"
						className="w-full"
						register={register('name')}
					/>

					{errors.name && (
						<p className="leading-sm text-start text-sm font-semibold text-red-600">{errors.name.message}</p>
					)}
				</div>

				<div className="flex w-full flex-col gap-3">
					<label htmlFor="gathering-location" className="leading-base flex text-base font-semibold text-gray-800">
						장소
					</label>
					<BasicSelectBox
						options={[
							{ value: '건대입구', text: '건대입구' },
							{ value: '을지로3가', text: '을지로3가' },
							{ value: '신림', text: '신림' },
							{ value: '홍대', text: '홍대' }
						]}
						size="expanded"
						placeholder="장소를 선택해주세요"
						register={register('location')}
					/>
					{errors.location && (
						<p className="leading-sm text-start text-sm font-semibold text-red-600">{errors.location.message}</p>
					)}
				</div>
				<div className="flex w-full justify-between">
					<input
						id="gathering-image"
						type="file"
						accept="image/*"
						className="hidden"
						ref={fileInputRef}
						onChange={e => {
							const file = e.target.files?.[0]?.name || '';
							if (file) {
								setValue('image', file, { shouldValidate: true });
							}
						}}
					/>

					<div className="mr-3 flex-1">
						<BasicInput
							id="gathering-image"
							label="이미지"
							placeholder={watch('image') ? watch('image') : '이미지를 첨부해주세요'}
							register={register('image')}
							readOnly
						/>
					</div>

					<BasicButton type="button" className="mt-8" onClick={() => fileInputRef.current?.click()} outlined>
						파일 찾기
					</BasicButton>
				</div>
				{errors.image && (
					<p className="leading-sm text-start text-sm font-semibold text-red-600">{errors.image.message}</p>
				)}

				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<div className="flex w-full flex-col justify-between gap-3">
							<label className="font-semibold text-gray-900">선택 서비스</label>
							<div className="flex gap-3">
								<BasicCheckBox
									title="달램핏"
									content="오피스 트레이닝"
									checked={field.value === 'OFFICE_STRETCHING'}
									onChange={() => field.onChange(field.value === 'OFFICE_STRETCHING' ? '' : 'OFFICE_STRETCHING')}
								/>

								<BasicCheckBox
									title="달램핏"
									content="마인드풀니스"
									checked={field.value === 'MINDFULNESS'}
									onChange={() => field.onChange(field.value === 'MINDFULNESS' ? '' : 'MINDFULNESS')}
								/>

								<BasicCheckBox
									title="위케이션"
									checked={field.value === 'WORKATION'}
									onChange={() => field.onChange(field.value === 'WORKATION' ? '' : 'WORKATION')}
								/>
							</div>
							{errors.type && (
								<p className="leading-sm text-start text-sm font-semibold text-red-600">{errors.type.message}</p>
							)}
						</div>
					)}
				/>

				<div className="max-mb:flex-col max-mb:gap-2 max-mb:w-auto flex w-full justify-between">
					<div className="flex flex-col gap-3">
						<Controller
							name="dateTime"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col gap-3">
									<label
										htmlFor="gathering-start-date"
										className="leading-base flex text-base font-semibold text-gray-800">
										모임 날짜
									</label>
									<BasicCalendar
										pageType="create"
										onChange={date => {
											const formatted = format(date, 'yyyy-MM-dd HH:mm a');
											field.onChange(formatted);
										}}
									/>
									{errors.dateTime && (
										<p className="leading-sm text-start text-sm font-semibold text-red-600">
											{errors.dateTime.message}
										</p>
									)}
								</div>
							)}
						/>
					</div>

					<Controller
						name="registrationEnd"
						control={control}
						render={({ field }) => (
							<div className="flex flex-col gap-3">
								<label htmlFor="gathering-end-date" className="leading-base flex text-base font-semibold text-gray-800">
									마감 날짜
								</label>
								<BasicCalendar
									pageType="create"
									onChange={date => {
										const formatted = format(date, 'yyyy-MM-dd HH:mm a');
										field.onChange(formatted);
									}}
								/>
								{errors.registrationEnd && (
									<p className="leading-sm text-start text-sm font-semibold text-red-600">
										{errors.registrationEnd.message}
									</p>
								)}
							</div>
						)}
					/>
				</div>

				<div className="mb-[40px] flex w-full flex-col gap-3">
					<BasicInput
						id="gathering-participant"
						label="모집 정원"
						type="number"
						placeholder="최소 5인 이상 입력해주세요"
						register={register('capacity', { valueAsNumber: true })}
					/>
					{errors.capacity && (
						<p className="leading-sm text-start text-sm font-semibold text-red-600">{errors.capacity.message}</p>
					)}
				</div>

				<BasicButton className="w-full">확인</BasicButton>
			</form>
		</BasicModal>
	);
}
