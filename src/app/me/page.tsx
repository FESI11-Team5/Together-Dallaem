import ProfileEditCard from '@/components/me/ProfileEditContainer/ProfileEditCard';
import MyActivityContainer from '@/components/me/MyActivityContainer';

export default function Me() {
	return (
		<main className="box-border bg-white/15" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 bg-base m-auto flex min-h-[calc(100vh-60px)] flex-col px-4 pt-6">
				<h1 className="text-primary-500 mb-4 text-lg font-semibold">마이페이지</h1>
				<ProfileEditCard />
				<MyActivityContainer />
			</div>
		</main>
	);
}
