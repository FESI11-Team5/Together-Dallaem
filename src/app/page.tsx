'use client';

export default function Home() {
	// useEffect(() => {
	// 	// 모임 API 테스트
	// 	const testGatherings = async () => {
	// 		try {
	// 			console.log('🔍 모임 API 테스트 시작...');
	// 			const gatherings = await getGatherings();
	// 			console.log('✅ 성공! 모임 목록:', gatherings);
	// 			console.log(`📈 총 ${gatherings.length}개의 모임`);
	// 		} catch (error) {s
	// 			if (error instanceof ApiError) {
	// 				console.error('❌ 모임 API 에러:', error.message);
	// 			}
	// 		}
	// 	};

	// 	testGatherings();
	// }, []);

	return (
		<h1 className="tb:text-orange-300 mb:text-gray-800 pc:text-3xl pc:leading-xl pc:text-orange-950 flex h-screen items-center justify-center text-xs font-light underline">
			TEAM5 화이팅 !!
		</h1>
	);
}
