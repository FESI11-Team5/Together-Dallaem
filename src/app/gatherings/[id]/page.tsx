import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewSection from '@/components/gatherings/GatheringReviewSection';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const gatheringId = Number(id);
	return (
		<div className="flex w-full flex-1 justify-center bg-gray-900">
			<div className="bg-root w-full max-w-[1200px]">
				<div className="max-mb:px-6 mx-auto flex max-w-[996px] flex-col gap-6">
					<GatheringInfoSection gatheringId={gatheringId} />
					<GatheringReviewSection gatheringId={gatheringId} />
				</div>
			</div>
		</div>
	);
}
