import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useModalClose } from '@/hooks/useModal';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicTextArea from '@/components/commons/basic/BasicTextArea';
import BasicButton from '@/components/commons/basic/BasicButton';
import { addReview } from '@/apis/reviews';

interface ReviewWriteModalProps {
	gatheringId: number;
	onSuccess: () => void;
}

interface FormValues {
	score: number;
	comment: string;
}
export default function ReviewWriteModal({ gatheringId, onSuccess }: ReviewWriteModalProps) {
	const closeModal = useModalClose();
	const [rating, setRating] = useState(0);

	const { register, handleSubmit, watch } = useForm<FormValues>({
		defaultValues: {
			score: 0,
			comment: ''
		}
	});

	const comment = watch('comment');
	const isFormValid = rating > 0 && comment.trim().length > 0;

	const handleHeartClick = (index: number) => {
		setRating(index + 1);
	};

	const onSubmit = async (data: FormValues) => {
		try {
			await addReview({ gatheringId, score: rating, comment: data.comment });
			onSuccess();
			closeModal();
		} catch (err) {
			console.error('리뷰 등록 실패', err);
		}
	};

	return (
		<BasicModal onClose={closeModal} className="tb:min-w-[472px] min-w-[290px]">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p className="text-start text-lg font-semibold">리뷰 쓰기</p>
					<div className="mt-6 flex w-full flex-col gap-6">
						<div className="flex flex-col gap-3 font-semibold">
							<div className="flex flex-col items-start gap-3">
								<p>만족스러운 경험이었나요?</p>
								<div className="flex gap-0.5">
									{Array.from({ length: 5 }).map((_, index) => (
										<button
											key={`heart-${index}`}
											type="button"
											onClick={() => handleHeartClick(index)}
											className="cursor-pointer">
											<Image
												src={index < rating ? '/icons/heart_active.svg' : '/icons/heart.svg'}
												alt={index < rating ? '활성화된 하트' : '비활성화된 하트'}
												width={24}
												height={24}
											/>
										</button>
									))}
								</div>
							</div>
							<div className="flex w-full flex-col items-stretch gap-3">
								<p className="text-start">경험에 대해 남겨주세요.</p>
								<BasicTextArea
									register={register('comment', { required: true })}
									isValid={comment.trim().length > 0}
									invalidText="내용을 입력해주세요"
								/>
							</div>
						</div>
						<div className="flex gap-4">
							<BasicButton outlined onClick={closeModal} className="font-semibold" isLarge type="button">
								취소
							</BasicButton>
							<BasicButton className="font-semibold" isLarge isActive={isFormValid} type="submit">
								리뷰 등록
							</BasicButton>
						</div>
					</div>
				</div>
			</form>
		</BasicModal>
	);
}
