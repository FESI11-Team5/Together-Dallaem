import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/components/gatherings/GatheringReviewsSection';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const gatheringId = Number(id);
	return (
		<div className="flex w-full flex-1 justify-center bg-gray-900">
			<div className="bg-root w-full max-w-[1200px]">
				<div className="mx-auto flex max-w-[996px] flex-col gap-6">
					<GatheringInfoSection gatheringId={gatheringId} />
					<GatheringReviewsSection gatheringId={gatheringId} />
				</div>
			</div>
		</div>
	);
}
