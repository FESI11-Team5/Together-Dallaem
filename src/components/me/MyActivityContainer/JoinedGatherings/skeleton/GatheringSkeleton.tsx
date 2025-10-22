export default function GatheringSkeleton() {
	return (
		<div className="flex animate-pulse flex-col gap-6 rounded-3xl">
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className="border-b-2 border-dashed border-gray-200">
					<div className="tb:flex-row relative mb-6 flex flex-col gap-4">
						{/* 모임 이미지 */}
						<div className="tb:w-70 relative h-39 w-full overflow-hidden rounded-3xl bg-gray-200" />

						{/* 모임 정보 */}
						<div className="tb:justify-between flex flex-col gap-4.5 rounded-3xl">
							<div className="flex flex-col gap-3">
								<div className="flex gap-2">
									<div className="h-8 w-16 rounded-3xl bg-gray-200" />
									<div className="h-8 w-16 rounded-3xl bg-gray-200" />
								</div>
								<div className="flex flex-col gap-1.5">
									<div className="h-[28px] w-[249px] rounded-3xl bg-gray-200" />
									<div className="h-5 w-40 rounded-3xl bg-gray-200" />
								</div>
							</div>
							<div className="bg-gray-00 h-10 w-30 rounded-3xl bg-gray-200" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
