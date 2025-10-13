'use client';

import { useModal } from '@/hooks/useModal';

import BasicButton from '@/components/commons/basic/BasicButton';
import GatheringModal from '@/components/gatherings/GatheringModal';

export default function Home() {
	// useEffect(() => {
	// 	// 모임 API 테스트
	// 	const testGatherings = async () => {
	// 		try {
	// 			console.log('🔍 모임 API 테스트 시작...');
	// 			const gatherings = await getGatherings();
	// 			console.log('✅ 성공! 모임 목록:', gatherings);
	// 			console.log(`📈 총 ${gatherings.length}개의 모임`);
	// 		} catch (error) {
	// 			if (error instanceof ApiError) {
	// 				console.error('❌ 모임 API 에러:', error.message);
	// 			}
	// 		}
	// 	};

	// 	testGatherings();
	// }, []);
	const { openModal } = useModal();
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<h1 className="tb:text-orange-300 mb:text-gray-800 pc:text-3xl pc:leading-xl pc:text-orange-950 text-xs font-light underline">
				TEAM5 화이팅 !!
			</h1>
			<BasicButton onClick={() => openModal(<GatheringModal />)}>모임 만들기</BasicButton>
		</div>
	);
}
