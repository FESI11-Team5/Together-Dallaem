'use client';

import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { useFunnelStore } from '@/stores/useFunnelStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateGathering } from '@/types/response/createGathering';
import { GatheringType } from '@/types/response/gatherings';
import { useModal, useModalClose } from '@/hooks/useModal';
import { postGathering } from '@/apis/gatherings';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicInput from '@/components/commons/basic/BasicInput';
import BasicPopup from '@/components/commons/basic/BasicPopup';

export default function Step4Funnel() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useFormContext<CreateGathering>();
	const closeModal = useModalClose();
	const queryClient = useQueryClient();
	const router = useRouter();
	const { prev, reset } = useFunnelStore();
	const { openModal } = useModal();
	const { mutate, isPending } = useMutation({
		mutationFn: postGathering,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['gatherings'] });
			openModal(<BasicPopup title="모임이 생성되었습니다." />, 'create-gathering-popup');
			closeModal(); // 모달 닫기
			reset(); // 퍼넬 스토어 1로 초기화
			router.push('/');
		}
	});

	const onSubmit = (data: CreateGathering) => {
		const formData = new FormData();

		formData.append('location', data.location);
		formData.append('type', data.type as GatheringType);
		formData.append('name', data.name);
		formData.append('dateTime', data.dateTime);
		formData.append('registrationEnd', data.registrationEnd);
		formData.append('capacity', String(data.capacity));
		if (data.image instanceof File) formData.append('image', data.image);
		console.log(data.location);
		mutate(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col gap-6">
			<div className="flex h-full flex-col justify-between">
				<div className="mt-3 flex h-full flex-col gap-2">
					<BasicInput
						id="gathering-capacity"
						label="모집 정원"
						type="number"
						placeholder="최소 5인 이상 입력해주세요"
						register={register('capacity', { valueAsNumber: true })}
					/>
					{typeof errors.capacity?.message === 'string' && (
						<p className="leading-sm text-highlight text-start text-sm font-semibold">{errors.capacity.message}</p>
					)}
				</div>
				<div className="max-mb:flex-col max-mb:mt-2 flex flex-row gap-2">
					<BasicButton onClick={prev} outlined className="w-full">
						이전
					</BasicButton>
					<BasicButton type="submit" isActive={!isPending} className="w-full">
						{isPending ? '등록 중...' : '모임 생성하기'}
					</BasicButton>
				</div>
			</div>
		</form>
	);
}
