import MyActivitySkeleton from './MyActivitySkeleton';
import ProfileEditCardSkeleton from './ProfileEditCardSkeleton';

export default function MeSkeleton() {
	return (
		<div className="box-border animate-pulse">
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 m-auto flex min-h-[calc(100vh-60px)] flex-col bg-bg px-4 pt-6">
				<div className="mb-4 h-7 w-21 rounded-3xl bg-gray-200"></div>
				<ProfileEditCardSkeleton />
				<MyActivitySkeleton />
			</div>
		</div>
	);
}
