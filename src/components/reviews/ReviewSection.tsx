import { GetReviewsResponse, ReviewResponse } from '@/types/response/reviews';
import FilterSection, { FilterData } from './FilterSection';
import ReviewItem from './ReviewItem';
import BasicPagination from '../commons/basic/BasicPagination';

export default function ReviewSection({
	reviewData,
	callbackOnFilterChange,
	callBackOnPageChange
}: {
	reviewData: GetReviewsResponse | null;
	callbackOnFilterChange: (filter: FilterData) => void;
	callBackOnPageChange: (offset: number) => void;
}) {
	const handleFilterChange = (newFilterData: FilterData) => {
		callbackOnFilterChange(newFilterData);
	};

	const handlePageChange = (page: number) => {
		callBackOnPageChange(page);
	};

	return (
		<div className="tb:p-6 flex flex-col items-center justify-center gap-4 border-t-[2px] border-gray-900 bg-root p-4">
			<FilterSection onFilterChange={handleFilterChange} />
			{reviewData ? (
				<>
					<div className="flex w-full flex-col items-center gap-6">
						{reviewData.data.map((item: ReviewResponse) => (
							<ReviewItem key={item.id} reviewData={item} />
						))}
					</div>
					<BasicPagination
						currentPage={reviewData?.currentPage}
						totalPages={reviewData?.totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<div>아직 리뷰가 없어요</div>
			)}
		</div>
	);
}
