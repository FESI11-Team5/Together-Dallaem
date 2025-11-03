'use client';

export default function GatheringInfoSectionSkeleton() {
	return (
		<section className="max-mb:flex-col flex w-full animate-pulse flex-row gap-6 pt-6">
			{/* 이미지 섹션 */}
			<div className="relative w-full overflow-hidden rounded-3xl border-2 border-gray-200">
				{/* 칩(모집마감 태그) 자리 */}
				<div className="absolute top-0 right-0 h-8 w-25 rounded-bl-2xl bg-gray-400"></div>
			</div>

			{/* 모임 정보 섹션 */}
			<div className="flex w-full flex-col rounded-3xl border-2 border-gray-200 py-6">
				{/* 메인 정보 (제목 / 위치 / 날짜 / 찜 버튼) */}
				<div className="mb:gap-6 max-mb:gap-3 flex w-full flex-col border-b-2 border-dashed border-gray-400 px-6 pb-[43px]">
					{/* 제목 + 위치 + 찜 */}
					<div className="flex justify-between">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2.5">
								{/* 제목 */}
								<div className="h-5 w-48 rounded-lg bg-gray-400"></div>
								{/* 위치 */}
								<div className="h-4 w-32 rounded-lg bg-gray-400"></div>
							</div>

							{/* 날짜 + 시간 */}
							<div className="flex gap-2">
								<div className="h-4 w-16 rounded-lg bg-gray-400"></div>
								<div className="h-4 w-16 rounded-lg bg-gray-400"></div>
							</div>
						</div>

						{/* 찜 버튼 */}
						<div className="h-12 w-12 rounded-full bg-gray-400"></div>
					</div>
				</div>

				{/* 서브 정보 (정원, 참가 인원, 진행률 등) */}
				<div className="mt-4 flex w-full flex-col gap-3 px-6">
					{/* 정원 + 참가 인원 */}
					<div className="flex items-center gap-1.5">
						<div className="h-4 w-22 rounded-lg bg-gray-400"></div>

						{/* 참가자 이미지 스켈레톤 */}
						<div className="flex items-center -space-x-2">
							{Array.from({ length: 3 }).map((_, idx) => (
								<div key={idx} className="h-[30px] w-[30px] rounded-full border-2 border-gray-600 bg-gray-400" />
							))}
						</div>
					</div>

					{/* 프로그래스바 */}
					<div className="flex w-full flex-col gap-2">
						<div className="h-2 w-full rounded-full bg-gray-400"></div>

						{/* 최소/최대 인원 텍스트 */}
						<div className="flex justify-between">
							<div className="h-3 w-16 rounded-lg bg-gray-400"></div>
							<div className="h-3 w-16 rounded-lg bg-gray-400"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
