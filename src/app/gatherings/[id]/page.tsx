import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/components/gatherings/GatheringReviewsSection';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const gatheringId = Number(id);
	return (
		<div className="flex h-screen w-full justify-center bg-gray-100">
			<div className="w-full max-w-[1200px] bg-gray-50">
				<div className="mx-auto flex max-w-[996px] flex-col gap-6">
					<GatheringInfoSection gatheringId={gatheringId} />
					<GatheringReviewsSection gatheringId={gatheringId} />
				</div>
			</div>
		</div>
	);
}
