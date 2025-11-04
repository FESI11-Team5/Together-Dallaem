import { GetReviewsResponse, ReviewResponse } from '@/types/response/reviews';
import FilterSection, { FilterData } from './FilterSection';
import ReviewItem from './ReviewItem';
import BasicPagination from '../commons/basic/BasicPagination';
import Image from 'next/image';
import MyActivitySkeleton from '../me/skeleton/MyActivitySkeleton';
import NoDataMessage from '../commons/NoDataMessage/NoDataMessage';

export default function ReviewSection({
	reviewData,
	isLoading,
	callbackOnFilterChange,
	callBackOnPageChange
}: {
	reviewData: GetReviewsResponse | undefined;
	isLoading: boolean;
	callbackOnFilterChange: (filter: FilterData) => void;
	callBackOnPageChange: (offset: number) => void;
}) {
	const handleFilterChange = (newFilterData: FilterData) => {
		callbackOnFilterChange(newFilterData);
	};

	const handlePageChange = (page: number) => {
		callBackOnPageChange(page);
	};

	if (isLoading || !reviewData) {
		return <MyActivitySkeleton />;
	}

	return (
		<div className="tb:p-6 bg-root flex flex-col items-center justify-center gap-4 border-t-[2px] border-gray-900 p-4">
			<FilterSection onFilterChange={handleFilterChange} />
			{reviewData && reviewData.data.length > 0 ? (
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
				<NoDataMessage text="등록된 리뷰가 없어요!" />
			)}
		</div>
	);
}
