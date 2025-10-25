import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/components/gatherings/GatheringReviewsSection';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;

	return (
		<div className="mb:h-screen flex w-full items-center justify-center bg-gray-100">
			{/* 헤더가 올경우를 대비하여 모바일 화면에서 py-30을 주었습니다. 추후 헤더 컴포넌트 추가되면 수정할 예정입니다. */}
			<div className="max-mb:pb-30 max-mb:pt-10 mb:h-screen tb:w-[1200px] flex items-center justify-center bg-gray-50">
				<div className="flex flex-col gap-6">
					<GatheringInfoSection gatheringId={id} />
					<GatheringReviewsSection gatheringId={id} />
				</div>
			</div>
		</div>
	);
}
