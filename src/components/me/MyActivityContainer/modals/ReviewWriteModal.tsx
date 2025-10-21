import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { postReviews } from '@/apis/reviews/reviews';
import { useModal, useModalClose } from '@/hooks/useModal';
import BasicButton from '@/components/commons/basic/BasicButton';
import BasicModal from '@/components/commons/basic/BasicModal';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import BasicTextArea from '@/components/commons/basic/BasicTextArea';

interface ReviewWriteModalProps {
	/** 리뷰를 작성할 모임 ID */
	gatheringId: number;
	/** 리뷰 등록 성공 시 호출되는 콜백 */
	onSuccess: (score: number, comment: string) => void;
}

interface FormValues {
	/** 리뷰 점수 (1~5) */
	score: number;
	/** 리뷰 내용 */
	comment: string;
}

export default function ReviewWriteModal({ gatheringId, onSuccess }: ReviewWriteModalProps) {
	const { openModal } = useModal();
	const closeModal = useModalClose();
	const [rating, setRating] = useState(0);
	const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

	const { register, handleSubmit, watch } = useForm<FormValues>({
		defaultValues: {
			score: 0,
			comment: ''
		}
	});

	/**
	 * 에러 객체에서 사용자용 메시지를 추출합니다.
	 */
	const getErrorMessage = (err: unknown) => {
		if (!err) return '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
		if (typeof err === 'string') return err;
		if (err instanceof Error) return err.message;
		return '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
	};

	const comment = watch('comment');
	const isFormValid = rating > 0 && comment.trim().length > 0;

	const handleHeartClick = (index: number) => {
		setRating(index + 1);
		setAnimatingIndex(index);
		setTimeout(() => setAnimatingIndex(null), 100); // 애니메이션 끝나면 초기화
	};

	const onSubmit = async (data: FormValues) => {
		try {
			await postReviews({ gatheringId, score: rating, comment: data.comment });
			onSuccess(rating, data.comment);
			closeModal();
		} catch (err) {
			// 개발에서는 콘솔에 남기고, 사용자에게는 팝업으로 안내합니다.
			if (process.env.NODE_ENV !== 'production') console.error(err);
			const message = getErrorMessage(err);
			openModal(<BasicPopup title="" subTitle={message} confirmText="닫기" />);
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
												className={`transform transition-transform duration-500 ease-out ${
													animatingIndex === index ? 'scale-115' : index < rating ? 'scale-110' : 'scale-100'
												}`}
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
