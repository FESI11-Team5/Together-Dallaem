import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getJoinedGathering } from '@/apis/gatherings/joined';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import type { JoinedGathering } from '@/types/response/gatherings';
import GatheringCard from './GatheringCard';
import NoDataMessage from '../../../commons/NoDataMessage/NoDataMessage';
import GatheringSkeleton from '@/components/me/skeleton/GatheringSkeleton';
import Chip from '@/components/commons/Chip';
/**
 * JoinedGatherings 컴포넌트
 *
 * 사용자가 참여한 모임 목록을 카드 리스트로 렌더링합니다. 이 컴포넌트는
 * - API로부터 사용자가 참여한 모임을 조회하고
 * - 취소된 모임을 뒤로 보내어 우선 표출합니다.
 * - 자식 카드에서 리뷰 작성/취소 성공 시 상위 쿼리 캐시를 업데이트합니다.
 *
 * @component
 * @returns {JSX.Element} 참여한 모임 목록을 렌더링하는 React 컴포넌트
 * @example
 * <JoinedGatherings />
 */

/**
 * 에러 객체에서 사용자에게 보여줄 간단한 메시지를 추출합니다.
 * - 문자열이나 Error 인스턴스, 기타 unknown 타입을 다룹니다.
 * - 더 정교한 매핑(HTTP 상태 코드별 메시지 등)은 공통 유틸로 분리 권장.
 *
 * @param {unknown} err - 잡힌 에러 객체
 * @returns {string} 사용자에게 표시할 에러 메시지
 */

export default function JoinedGatherings() {
	const queryClient = useQueryClient();
	const { handleError } = useErrorHandler();
	const [showFilteredOnly, setShowFilteredOnly] = useState(false);

	/**
	 * React Query: joinedGatherings 캐시
	 * - queryKey: ['joinedGatherings'] 로 캐싱/무효화에 사용됩니다.
	 * - queryFn: API에서 참여한 모임을 불러오고 취소된 모임을 뒤로 보냅니다.
	 */
	const { data: gatherings = [], isLoading } = useQuery<JoinedGathering[]>({
		queryKey: ['joinedGatherings'],
		queryFn: async () => {
			try {
				return await getJoinedGathering({ sortBy: 'dateTime', sortOrder: 'asc' });
			} catch (err) {
				handleError(err);
				throw err;
			}
		}
	});

	if (isLoading) return <GatheringSkeleton />;

	const filteredGatherings = showFilteredOnly
		? gatherings.filter(g => !g.isCompleted && !g.isReviewed && g.canceledAt === null)
		: gatherings;

	if (gatherings.length === 0) return <NoDataMessage text="신청한 모임이 아직 없어요" />;

	/**
	 * 리뷰 작성 성공 콜백
	 *
	 * 해당 모임의 isReviewed 플래그를 true로 설정하여 UI를 갱신합니다.
	 * 이 함수는 부모 컴포넌트에서 자식 카드(GatheringCard)가 리뷰 성공 시 호출합니다.
	 *
	 * @param {number} id - 리뷰가 작성된 모임의 ID
	 * @returns {void}
	 */
	const handleReviewSuccess = (gatheringId: number) => {
		queryClient.setQueryData<JoinedGathering[]>(['joinedGatherings'], prev =>
			prev ? prev.map(g => (g.id === gatheringId ? { ...g, isReviewed: true } : g)) : []
		);
	};

	/**
	 * 취소(모임 탈퇴/삭제) 성공 콜백
	 *
	 * 목록에서 해당 모임을 제거합니다. 자식 컴포넌트에서 탈퇴 성공 시 호출됩니다.
	 *
	 * @param {number} id - 취소된 모임의 ID
	 * @returns {void}
	 */
	const handleCancelSuccess = (id: number) => {
		queryClient.setQueryData<JoinedGathering[]>(['joinedGatherings'], prev =>
			prev ? prev.filter(g => g.id !== id) : []
		);
	};

	return (
		<div className="flex flex-1 flex-col gap-6">
			<div className="flex">
				<Chip
					isActive={showFilteredOnly}
					text="이용 예정인 모임만 보기"
					onClick={() => setShowFilteredOnly(prev => !prev)}
				/>
			</div>

			{filteredGatherings.length === 0 ? (
				<NoDataMessage text="이용 예정인 모임이 없어요" />
			) : (
				<ul className="flex flex-col gap-6">
					{filteredGatherings.map(gathering => (
						<li key={gathering.id}>
							<GatheringCard
								gathering={gathering}
								onReviewSuccess={() => handleReviewSuccess(gathering.id)}
								onCancelSuccess={() => handleCancelSuccess(gathering.id)}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
