import { scoreData } from '@/types/response/reviews';
import { useMemo } from 'react';

/**
 * 리뷰 점수 섹션 컴포넌트
 * - 평균 점수(0~5)와 각 점수대(5~1점)의 분포를 표시
 * - 리뷰 점수 집계 데이터를 하트 아이콘과 막대 그래프로 시각화
 *
 * @param {{ data?: scoreData | null }} props
 *
 * @returns {JSX.Element}
 */
export default function ScoreSection({ data }: { data?: scoreData | null }) {
	/**
	 * 평균 점수를 반올림해 활성 하트 개수를 계산합니다.
	 * TODO: 향후에는 비율에 따라 하트를 부분 표시하도록 개선 예정입니다.
	 */
	const heartNum = useMemo(() => (data?.averageScore ? Math.round(data.averageScore) : 0), [data?.averageScore]);
	/** 총 리뷰 개수(5~1점의 합) */
	const totalCount = useMemo(
		() => (data ? data.fiveStars + data.fourStars + data.threeStars + data.twoStars + data.oneStar : 0),
		[data]
	);
	/**
	 * 점수 분포 배열 (인덱스 0 → 5점, 1 → 4점, ... , 4 → 1점)
	 * 그래프 우측에 개수와 함께 비율 막대를 그릴 때 사용됩니다.
	 */
	const scores = [
		data?.fiveStars ?? 0,
		data?.fourStars ?? 0,
		data?.threeStars ?? 0,
		data?.twoStars ?? 0,
		data?.oneStar ?? 0
	];

	//TODO: 우선은 반올림으로 하트 개수 처리했으나 나중에는 비율대로 하트 잘라서 표시하게 변경할 예정입니다.
	return (
		<div className="pc:gap-45 tb:gap-30 mb:gap-5 bg-root my-6 flex items-center justify-center gap-5 border-y-[2px] px-6 py-8">
			<div className="left-box flex flex-col items-center text-center">
				<div className="text-2xl font-semibold text-gray-400">
					<span className="text-highlight">{data?.averageScore ?? 0}</span>/5
				</div>
				<div className="flex gap-[2px]">
					{Array.from({ length: heartNum }).map((_, index) => (
						<img key={heartNum * 100 + index} src="/icons/heart_active.svg" alt="heart score" />
					))}
					{Array.from({ length: 5 - heartNum }).map((_, index) => (
						<img key={(5 - heartNum) * 100 + index} src="/icons/heart.svg" alt="heart score" />
					))}
				</div>
			</div>
			<div className="right-box flex flex-col gap-2 text-sm">
				{scores.map((score, index) => (
					//key 값 index로 고정하여 리렌더링 되지 않고 애니메이션 동작하도록 수정
					<div className="flex items-center gap-2" key={index}>
						<span className="w-[21px] text-gray-300">{5 - index}점 </span>
						<div className="tb:w-[240px] relative h-1 w-[84px] rounded-[2px] bg-gray-400">
							<div
								className="bg-highlight absolute top-0 left-0 h-full rounded-[2px] transition-all duration-500 ease-out"
								style={{ width: `${totalCount > 0 ? (score / totalCount) * 100 : 0}%` }}></div>
						</div>
						{score ?? 0}
					</div>
				))}
			</div>
		</div>
	);
}
