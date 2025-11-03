import GatheringSkeleton from './GatheringSkeleton';

/**
 * 마이페이지 활동 영역 컨테이너
 * - "나의 모임", "나의 리뷰", "내가 만든 모임" 탭 제공
 * - 탭 클릭 시 해당 컴포넌트 렌더링
 *
 * **탭 설명**
 * - 나의 모임: 사용자가 참여한 모임 리스트
 * - 나의 리뷰: 사용자가 작성한 리뷰 리스트
 * - TODO : 내가 만든 모임: 사용자가 생성한 모임 리스트
 */
export default function MyActivitySkeleton() {
	return (
		<div className="tb:px-6 flex flex-1 flex-col gap-6 border-t-2 border-gray-600 px-4 py-6">
			<div className="flex gap-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="h-7 w-17 rounded-3xl bg-gray-600"></div>
				))}
			</div>
			<GatheringSkeleton />
		</div>
	);
}
