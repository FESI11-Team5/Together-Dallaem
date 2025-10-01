import GatheringInfoSection from '@/components/gatherings/GatheringInfoSection';
import GatheringReviewsSection from '@/components/gatherings/GatheringReviewsSection';
import ReviewList from '@/components/reviewList/ReviewList';

export default function Page() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div>
				<GatheringInfoSection />
				<GatheringReviewsSection />
			</div>
			<div>
				<ReviewList />
			</div>
		</div>
	);
}
