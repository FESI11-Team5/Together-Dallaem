import ProfileEditCard from '@/components/me/ProfileEditContainer';
import MyActivityContainer from '@/components/me/MyActivityContainer';

const MYPAGE_TITLE_GLOW =
	'[text-shadow:0_0_2px_#05F2DB,0_0_4px_#05F2DB,0_0_8px_#05F2DB,0_0_16px_#05F2DB,0_0_32px_#05F2DB,0_0_64px_#05F2DB]';

export default function Me() {
	return (
		<div className="box-border" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 m-auto flex min-h-[calc(100vh-60px)] flex-col bg-gray-900 px-4 pt-6">
				<h1 className={`mb-4 text-lg font-semibold text-white ${MYPAGE_TITLE_GLOW}`}>마이페이지</h1>
				<ProfileEditCard />
				<MyActivityContainer />
			</div>
		</div>
	);
}
