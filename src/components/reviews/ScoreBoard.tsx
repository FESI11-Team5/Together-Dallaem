import { scoreData } from '@/types/response/reviews';
import { useMemo } from 'react';

export default function ScoreBoard({ data }: { data?: scoreData | null }) {
	const heartNum = useMemo(() => (data?.averageScore ? Math.round(data.averageScore) : 0), [data?.averageScore]);
	const totalCount = useMemo(
		() => (data ? data.fiveStars + data.fourStars + data.threeStars + data.twoStars + data.oneStar : 0),
		[data]
	);
	const scores = [
		data?.fiveStars ?? 0,
		data?.fourStars ?? 0,
		data?.threeStars ?? 0,
		data?.twoStars ?? 0,
		data?.oneStar ?? 0
	];

	//TODO: 우선은 반올림으로 하트 개수 처리했으나 나중에는 비율대로 하트 잘라서 표시하게 변경할 예정입니다.
	return (
		<div className="my-6 flex items-center justify-center gap-[180px] border-y-[2px] bg-white py-8">
			<div className="left-box text-center">
				<div className="text-2xl font-semibold text-gray-400">
					<span className="text-gray-900">{data?.averageScore ?? 0}</span>/5
				</div>
				<div className="flex gap-[2px]">
					{Array.from({ length: heartNum }).map((_, index) => (
						<img key={index} src="/icons/heart_active.svg" alt="heart score" />
					))}
					{Array.from({ length: 5 - heartNum }).map((_, index) => (
						<img key={index} src="/icons/heart.svg" alt="heart score" />
					))}
				</div>
			</div>
			<div className="right-box flex flex-col gap-2 text-sm">
				{scores.map((score, index) => (
					<div className="flex items-center gap-2">
						<span className="w-[21px] text-gray-900">{5 - index}점 </span>
						<div className="relative h-1 w-[240px] rounded-[2px] bg-gray-200">
							<div
								className="absolute top-0 left-0 h-full rounded-[2px] bg-gray-900"
								style={{ width: `${(score / totalCount) * 100}%` }}></div>
						</div>
						{score ?? 0}
					</div>
				))}
			</div>
		</div>
	);
}
