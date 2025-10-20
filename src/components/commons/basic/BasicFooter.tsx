'use client';

import { usePathname, useRouter } from 'next/navigation';

import { FOOTER_MESSAGE } from '@/constants/messages';
import { useGathering } from '@/providers/GatheringProvider';
import { useUserStore } from '@/stores/user';
import { useModal } from '@/hooks/useModal';
import { getGatheringParticipant, postGatheringJoin, putGatheringCancel } from '@/apis/gatherings';

import BasicButton from './BasicButton';
import BasicPopup from './BasicPopup';
import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';

/** 일반 사용자 모임 참여 버튼 */
function GatheringNormalUserBtn() {
	const { openModal } = useModal();
	const { user } = useUserStore();
	const { gathering } = useGathering();
	const pathname = usePathname();

	/** 모임 참여 핸들러 */
	const joinGathering = async () => {
		try {
			if (!user) {
				openModal(<RequiredLoginPopup next={pathname} />, 'required-login-popup');
				return;
			}
			if (!gathering) return;

			// 중복 참여 확인
			const participants = await getGatheringParticipant(gathering.id);
			const duplicatedUser = participants.some(participant => participant.userId === user?.userId);
			if (duplicatedUser) {
				openModal(<BasicPopup title="이미 참여한 모임입니다." />, 'duplicate-join-popup');
				return;
			}

			// 정원 초과 확인
			const isFull = gathering.capacity === gathering.participantCount;
			if (isFull) {
				openModal(<BasicPopup title="모임 정원이 가득 찼습니다." />, 'full-capacity-popup');
				return;
			}

			await postGatheringJoin(gathering.id);
			openModal(<BasicPopup title="모임에 참가되었습니다" />, 'join-gathering-popup');
		} catch (error) {
			openModal(<BasicPopup title="모임 참가에 실패했습니다." />, 'error-popup');
		}
	};
	return (
		<BasicButton onClick={joinGathering} className="rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white">
			참여하기
		</BasicButton>
	);
}

/** 모임 생성자(주최자) 모임 취소 / 공유하기 버튼 */
function GatheringOwnerUserBtn() {
	const { gathering } = useGathering();
	const { openModal } = useModal();

	const router = useRouter();

	/** 모임 취소 확인 팝업  */
	const cancelGathering = async () => {
		if (!gathering) return;

		try {
			await putGatheringCancel(gathering.id);
			openModal(
				<BasicPopup title="모임이 취소되었습니다." onConfirm={() => router.push('/')} />,
				'cancel-gathering-popup'
			);
		} catch (error) {
			openModal(<BasicPopup title="모임 취소에 실패했습니다." />, 'error-popup');
		}
	};

	/** 모임 취소 확인 팝업 핸들러 */
	const handleCancelClick = () => {
		if (!gathering) return;
		openModal(
			<BasicPopup
				title="모임 취소를 하시겠어요?"
				subTitle="취소된 모임은 복구할 수 없습니다."
				cancelText="취소"
				onConfirm={cancelGathering}
			/>,
			'confirm-popup'
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
				className="flex-1 rounded-md border border-orange-500 px-6 py-2 text-sm font-bold text-orange-500 hover:bg-orange-50">
				취소하기
			</BasicButton>
			<BasicButton
				onClick={copyURL}
				className="flex-1 rounded-md bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600">
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
		<footer className="fixed right-2 bottom-0 left-0 z-10 m-auto flex w-full items-center justify-center border-3 border-t-black bg-white px-4 py-5">
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
