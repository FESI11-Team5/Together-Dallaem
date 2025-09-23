import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/components/gatherings/GatheringReviewsSection';

export default function Page() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<GatheringInfoSection />
			<GatheringReviewsSection />
		</div>
	);
}
