import ProfileEditCard from '@/components/me/ProfileEditContainer';
import MyActivityContainer from '@/components/me/MyActivityContainer';

const MYPAGE_TITLE_GLOW = '[text-shadow:0_0_4px_#05F2DB,0_0_0px_#05F2DB,0_0_0px_#05F2DB,0_0_40px_#05F2DB]';

export default function Me() {
	return (
		<div className="box-border bg-white/15" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 bg-root m-auto flex min-h-[calc(100vh-60px)] flex-col px-4 pt-6">
				<h1 className={`text-primary-500 mb-4 text-lg font-semibold ${MYPAGE_TITLE_GLOW}`}>마이페이지</h1>
				<ProfileEditCard />
				<MyActivityContainer />
			</div>
		</div>
	);
}
