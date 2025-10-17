import BasicPagination from '../commons/basic/BasicPagnation';
import { GetReviewsResponse } from '@/types/response/reviews';
import FilterSection from './FilterSection';

export default function ReviewSection({ reviewData }: { reviewData: GetReviewsResponse | null }) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 border-t-[2px] border-gray-900 bg-white p-6">
			<FilterSection />
			{reviewData ? (
				<>
					<div className="flex flex-col items-center gap-2">
						{reviewData.data.map(item => (
							<div key={item.id}>
								<div>{item.score}</div>
								<div>{item.comment}</div>
								<div>{item.createdAt}</div>
							</div>
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
