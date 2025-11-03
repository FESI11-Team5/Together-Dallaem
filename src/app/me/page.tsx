import ProfileEditCard from '@/components/me/ProfileEditContainer';
import MyActivityContainer from '@/components/me/MyActivityContainer';

export default function Me() {
	return (
		<div>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 bg-root m-auto flex min-h-[calc(100vh-60px)] flex-col px-4 pt-6">
				<h1 className="text-shadow-primary mb-4 text-lg font-semibold text-white">마이페이지</h1>
				<ProfileEditCard />
				<MyActivityContainer />
			</div>
		</div>
	);
}
