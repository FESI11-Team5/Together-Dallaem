'use client';

import { isPast } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';

import { useGathering } from '@/providers/GatheringProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user';
import { useModal } from '@/hooks/useModal';
import { getGatheringParticipant, postGatheringJoin, leaveGathering, putGatheringCancel } from '@/apis/gatherings/[id]';
import { GatheringParticipant } from '@/types/response/gatherings';
import { FOOTER_MESSAGE } from '@/constants/messages';

import BasicButton from '@/components/commons/basic/BasicButton';
import BasicPopup from '@/components/commons/basic/BasicPopup';
import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';

function GatheringNormalUserBtn() {
	const { openModal } = useModal();
	const { user } = useUserStore();
	const { gathering } = useGathering();
	const pathname = usePathname();
	const queryClient = useQueryClient();

	/** 참가자 목록 조회 */
	const { data: participants = [], isLoading } = useQuery<GatheringParticipant[]>({
		queryKey: ['participants', gathering.id],
		queryFn: () => getGatheringParticipant(gathering.id)
	});

	/** 참가하기 */
	const joinMutation = useMutation({
		mutationFn: () => postGatheringJoin(gathering.id),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['gathering', gathering.id] }),
				queryClient.invalidateQueries({ queryKey: ['participants', gathering.id] })
			]);
			openModal(<BasicPopup title="모임에 참가되었습니다" />, 'join-gathering-popup');
		},
		onError: () => {
			openModal(<BasicPopup title="모임 참가에 실패했습니다." />, 'error-popup');
		}
	});

	/** 취소하기 */
	const cancelMutation = useMutation({
		mutationFn: () => leaveGathering(gathering.id),

		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['gathering', gathering.id] }),
				queryClient.invalidateQueries({ queryKey: ['participants', gathering.id] })
			]);
			openModal(<BasicPopup title="모임 참가가 취소되었습니다." />, 'leave-gathering-popup');
		},
		onError: () => {
			openModal(<BasicPopup title="모임 참가 취소에 실패했습니다." />, 'error-popup');
		}
	});

	/** 조건들 */
	const isFull = gathering.capacity === gathering.participantCount;
	const past = isPast(new Date(gathering.registrationEnd));
	const joinedUser = participants.some(p => p.userId === user?.userId);

	/** 클릭 핸들러 */
	const handleJoin = () => {
		if (!user) {
			openModal(<RequiredLoginPopup next={pathname} />, 'required-login-popup');
			return;
		}
		joinMutation.mutate();
	};

	const handleCancel = () => {
		cancelMutation.mutate();
	};

	if (isLoading)
		return (
			<BasicButton className="cursor-not-allowed rounded-md px-4 py-2 text-sm font-bold" disabled isActive={false}>
				로딩 중...
			</BasicButton>
		);

	return (
		<>
			{joinedUser ? (
				<BasicButton onClick={handleCancel} className="rounded-md px-4 py-2 text-sm font-bold" outlined>
					예약 취소하기
				</BasicButton>
			) : (
				<BasicButton
					onClick={handleJoin}
					className="cursor-not-allowed rounded-md px-4 py-2 text-sm font-bold"
					isActive={!(isFull || past)}
					disabled={isFull || past}>
					{isFull ? '정원 마감' : past ? '모집 기간 종료' : '모임 참가하기'}
				</BasicButton>
			)}
		</>
	);
}

/** 모임 생성자(주최자) 모임 취소 / 공유하기 버튼 */
function GatheringOwnerUserBtn() {
	const { gathering } = useGathering();
	const { openModal } = useModal();
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: putGatheringCancel,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['gatherings'], exact: false });
			router.push('/');
		},
		onError: () => {
			openModal(<BasicPopup title="모임 취소에 실패했습니다." />, 'cancel-failed-popup');
		}
	});

	/** 실제 취소 처리 */
	const cancelGathering = () => {
		if (!gathering) return;

		openModal(
			<BasicPopup title="모임이 취소되었습니다." onConfirm={() => mutate(gathering.id)} />,
			'cancel-success-popup'
		);
	};

	/** 취소 버튼 클릭 시 확인 팝업 띄우기 */
	const handleCancelClick = () => {
		if (!gathering) return;

		openModal(
			<BasicPopup
				title="모임 취소를 하시겠어요?"
				subTitle="취소된 모임은 복구할 수 없습니다."
				cancelText="취소"
				onConfirm={cancelGathering}
			/>,
			'confirm-cancel-popup'
		);
	};

	/** 모임 URL 복사 핸들러 */
	const copyURL = async () => {
		try {
			const url = window.location.href;
			await navigator.clipboard.writeText(url);
			openModal(<BasicPopup title="URL이 복사되었습니다." />, 'copy-url-popup');
		} catch (error) {
			openModal(<BasicPopup title="URL 복사에 실패했습니다." />, 'error-popup');
		}
	};

	return (
		<div className="flex gap-2">
			<BasicButton
				outlined
				onClick={handleCancelClick}
				className="flex-1 rounded-md border border-primary-500 px-6 py-2 text-sm font-bold text-primary-500 hover:bg-primary-50">
				취소하기
			</BasicButton>
			<BasicButton
				onClick={copyURL}
				className="flex-1 rounded-md bg-primary-500 px-6 py-2 text-sm font-bold text-white hover:bg-primary-600">
				공유하기
			</BasicButton>
		</div>
	);
}

/** 모임 조회시에만 보일 푸터 */
export default function BasicFooter() {
	const { user } = useUserStore();
	const { gathering } = useGathering();

	if (!gathering) return null;
	const gatheringOwnerId = gathering?.createdBy === user?.userId;

	return (
		<footer className="z-layout fixed right-2 bottom-0 left-0 m-auto flex w-full items-center justify-center border-3 border-t-black bg-bg px-4 py-5">
			{user && gatheringOwnerId ? (
				<div className="max-mb:w-[696px] max-mb:flex-col flex w-[996px] flex-row items-center justify-between">
					<div className="pr-4">
						<h1 className="text-sm font-bold">{FOOTER_MESSAGE.title}</h1>
						<p className="text-xs text-gray-600">{FOOTER_MESSAGE.subTitle}</p>
					</div>

					<div className="max-mb:w-full shrink-0">
						<GatheringOwnerUserBtn />
					</div>
				</div>
			) : (
				<div className="flex w-[996px] items-center justify-between">
					<div className="flex-1 pr-4">
						<h1 className="text-sm font-bold">{FOOTER_MESSAGE.title}</h1>
						<p className="text-xs text-gray-600">{FOOTER_MESSAGE.subTitle}</p>
					</div>

					<div className="shrink-0">
						<GatheringNormalUserBtn />
					</div>
				</div>
			)}
		</footer>
	);
}
