export default function GatheringReviewSectionSkeleton() {
	return (
		<section className="flex w-full max-w-full animate-pulse flex-col gap-2 rounded-2xl border border-gray-500 p-4 sm:p-5 md:p-6">
			{/* 하트 구역 */}
			<div className="h-3 w-30 rounded-2xl bg-gray-500"></div>
			{/* 리뷰 내용 */}
			<div className="h-4 w-full rounded-2xl bg-gray-500"></div>
			{/* 유저 정보 */}
			<div className="mt-2 flex items-center gap-2">
				<div className="h-6 w-6 rounded-full bg-gray-500"></div>
				<div className="h-3 w-16 rounded-2xl bg-gray-500 sm:w-20"></div>
				<div className="h-3 w-20 rounded-2xl bg-gray-500 sm:w-24"></div>
			</div>
		</section>
	);
}
