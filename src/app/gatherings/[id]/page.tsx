import GatheringInfoSection from '@/app/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/app/components/gatherings/GatheringReviewsSection';

export default function Page() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<GatheringInfoSection />
			<GatheringReviewsSection />
		</div>
	);
}
