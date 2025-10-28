import ProfileEditCard from '@/components/me/ProfileEditCard';
import MyActivityContainer from '@/components/me/MyActivityContainer';

export default function Me() {
	return (
		<div className="box-border bg-gray-100" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 m-auto flex min-h-[calc(100vh-60px)] flex-col bg-root px-4 pt-6">
				<div className="mb-4 text-lg font-semibold text-gray-900">마이페이지</div>
				<ProfileEditCard />
				<MyActivityContainer />
			</div>
		</div>
	);
}
