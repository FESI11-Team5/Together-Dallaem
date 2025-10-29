'use client';

import { useFunnelStore } from '@/stores/useFunnelStore';

import BasicButton from '@/components/commons/basic/BasicButton';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postGathering } from '@/apis/gatherings';
import BasicInput from '@/components/commons/basic/BasicInput';
import { useRouter } from 'next/navigation';

export default function Step4Funnel() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useFormContext();
	const router = useRouter();
	const { prev } = useFunnelStore();

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: postGathering,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['gatherings'] });
			router.push('/');
		}
	});

	const onSubmit = (data: FormData) => {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			if (value instanceof File) formData.append(key, value);
			else formData.append(key, String(value));
		}
		mutate(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<h2 className="text-xl font-semibold">모집 인원 입력</h2>

			<BasicInput
				id="gathering-capacity"
				label="모집 정원"
				type="number"
				placeholder="최소 5인 이상 입력해주세요"
				register={register('capacity', { valueAsNumber: true })}
			/>
			{typeof errors.capacity?.message === 'string' && <p className="text-red-500">{errors.capacity.message}</p>}

			<div className="flex justify-between">
				<BasicButton outlined onClick={prev}>
					이전
				</BasicButton>
				<BasicButton type="submit" isActive={!isPending}>
					{isPending ? '등록 중...' : '모임 생성하기'}
				</BasicButton>
			</div>
		</form>
	);
}
