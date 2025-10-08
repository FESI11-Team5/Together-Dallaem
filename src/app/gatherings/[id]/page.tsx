import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/components/gatherings/GatheringReviewsSection';

export default function Page() {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gray-100">
			<div className="flex h-screen w-[1200px] shrink-0 items-center justify-center bg-gray-50">
				<div className="flex flex-col gap-[24px]">
					<GatheringInfoSection />
					<GatheringReviewsSection />
				</div>
			</div>
		</div>
	);
}
