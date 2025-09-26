// 마이페이지
import ProfileEditCard from '@/components/me/ProfileEditCard';

/**
 * `Home` 컴포넌트
 *
 * 마이페이지 화면을 렌더링합니다.
 * - 상단 제목("마이페이지")을 표시합니다.
 * - `ProfileEditCard` 컴포넌트를 포함하여 프로필 수정 UI를 제공합니다.
 *
 * @component
 * @returns {JSX.Element} 마이페이지 UI를 반환합니다.
 */
export default function Me() {
	return (
		<div className="box-border bg-gray-100" style={{ fontFamily: 'var(--font-pretendard)' }}>
			<div className="tb:px-6 tb:pt-8 pc:max-w-300 pc:px-25 m-auto min-h-[100vh] bg-white px-4 pt-6">
				<div className="mb-4 text-lg font-semibold text-gray-900">마이페이지</div>
				<ProfileEditCard />
			</div>
		</div>
	);
}
