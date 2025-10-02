export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
	const next = searchParams.next ? decodeURIComponent(searchParams.next) : '/';

	// TODO: next는 Loginform에 주입
	console.log(next);

	// TODO: 로그인 성공 시 이전 페이지로 리다이렉트해주는 로직은 loginform에 추가
	return <div>로그인 페이지</div>;
}
