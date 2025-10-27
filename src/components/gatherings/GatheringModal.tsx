'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { postGathering } from '@/apis/gatherings';
import { POPUP_MESSAGE } from '@/constants/messages';
import { useModal, useModalClose } from '@/hooks/useModal';
import { CreateGathering } from '@/types/response/createGathering';
import type { GatheringType } from '@/types/response/gatherings';
import { CreateGatheringSchema, GatheringSchemaType } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import BasicButton from '../commons/basic/BasicButton';
import BasicCheckBox from '../commons/basic/BasicCheckBox';
import BasicInput from '../commons/basic/BasicInput';
import BasicModal from '../commons/basic/BasicModal';
import BasicPopup from '../commons/basic/BasicPopup';
import GatheringCalendar from '../commons/GatheringCalendar';
import SelectBox from '../commons/SelectBox';

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
		control,
		formState: { errors, isSubmitting }
	} = useForm<GatheringSchemaType>({
		resolver: zodResolver(CreateGatheringSchema),
		mode: 'onChange'
	});
	const [fileName, setFileName] = useState('');
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { openModal } = useModal();
	const closePopup = useModalClose();
	const router = useRouter();

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: postGathering,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['gatherings'], exact: false });
			openModal(<BasicPopup title="모임이 생성되었습니다!" />, 'create-gathering-popup');
			closePopup();
			router.push('/');
		}
	});

	const isValid =
		watch('name') &&
		watch('location') &&
		watch('type') &&
		watch('dateTime') &&
		watch('registrationEnd') &&
		watch('image') &&
		watch('capacity') >= 5;

	const onSubmitForm = async (data: CreateGathering) => {
		const formData = new FormData();

		formData.append('location', data.location);
		formData.append('type', data.type as GatheringType);
		formData.append('name', data.name);
		formData.append('dateTime', data.dateTime);
		formData.append('registrationEnd', data.registrationEnd);
		formData.append('capacity', String(data.capacity));
		if (data.image instanceof File) formData.append('image', data.image);

		mutate(formData);
	};

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
					<SelectBox
						options={[
							{ value: '건대입구', text: '건대입구' },
							{ value: '을지로3가', text: '을지로3가' },
							{ value: '신림', text: '신림' },
							{ value: '홍대입구', text: '홍대입구' }
						]}
						expanded
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
							const file = e.target.files?.[0] || null;
							if (file) {
								setValue('image', file, { shouldValidate: true });
								setFileName(file.name);
							}
						}}
					/>

					<div className="mr-3 flex-1">
						<BasicInput
							id="gathering-image"
							label="이미지"
							placeholder={fileName || '이미지를 첨부해주세요'}
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
							render={({ field }) => {
								return (
									<div className="flex flex-col gap-3">
										<label className="leading-base flex text-base font-semibold text-gray-800">모임 날짜</label>
										<GatheringCalendar
											pageType="create"
											value={field.value ? new Date(field.value) : undefined}
											onChange={(date: Date) => {
												const isoFormatted = date.toISOString();
												field.onChange(isoFormatted);
											}}
										/>

										{errors.dateTime && (
											<p className="leading-sm text-start text-sm font-semibold text-red-600">
												{errors.dateTime.message}
											</p>
										)}
									</div>
								);
							}}
						/>
					</div>

					{/* 마감 날짜 */}
					<div className="flex flex-col gap-3">
						<Controller
							name="registrationEnd"
							control={control}
							render={({ field }) => {
								return (
									<div className="flex flex-col gap-3">
										<label className="leading-base flex text-base font-semibold text-gray-800">마감 날짜</label>

										<GatheringCalendar
											pageType="create"
											value={field.value ? new Date(field.value) : undefined}
											onChange={(date: Date) => {
												const isoFormatted = date.toISOString();
												field.onChange(isoFormatted);
											}}
										/>

										{errors.registrationEnd && (
											<p className="leading-sm text-start text-sm font-semibold text-red-600">
												{errors.registrationEnd.message}
											</p>
										)}
									</div>
								);
							}}
						/>
					</div>
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

				<BasicButton className="w-full" isActive={Boolean(isValid) && !isSubmitting} type="submit">
					확인
				</BasicButton>
			</form>
		</BasicModal>
	);
}
