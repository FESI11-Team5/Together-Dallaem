import BasicPagination from '../commons/basic/BasicPagnation';
import { GetReviewsResponse, Review } from '@/types/response/reviews';
import FilterSection, { FilterData } from './FilterSection';
import ReviewItem from './ReviewItem';

export default function ReviewSection({
	reviewData,
	callbackOnFilterChange
}: {
	reviewData: GetReviewsResponse | null;
	callbackOnFilterChange: (filter: FilterData) => void;
}) {
	const handleFilterChange = (newFilterData: FilterData) => {
		callbackOnFilterChange(newFilterData);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4 border-t-[2px] border-gray-900 bg-white p-6">
			<FilterSection onFilterChange={handleFilterChange} />
			{reviewData ? (
				<>
					<div className="flex w-full flex-col items-center gap-6">
						{reviewData.data.map((item: Review) => (
							<ReviewItem key={item.id} reviewData={item} />
						))}
					</div>
					<BasicPagination
						currentPage={reviewData?.currentPage}
						totalPages={reviewData?.totalPages}
						onPageChange={() => {}}
					/>
				</>
			) : (
				<div>아직 리뷰가 없어요</div>
			)}
		</div>
	);
}
