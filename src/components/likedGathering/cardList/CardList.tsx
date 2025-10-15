import ClassProgressBar from '@/components/commons/ClassProgressBar';
import Image from 'next/image';

export default function CardList() {
	return (
		<div>
			{/* 이미지 영역 */}
			<div>
				<Image src="/images/exmaple.jpg" alt="모임 사진" width={378} height={205} className="shrink-0" />
			</div>

			{/* 모임 정보 영역 */}
			<div>
				{/* 제목 + 장소 + 찜 아이콘 영역 */}
				<div>
					<h2>달램핏 오피스 스트레칭</h2>
					<span>|</span>
					<p>을지로 3가</p>
				</div>

				{/* 진행상황 + 참가인원 프로그래스바 */}
				<div>
					<ClassProgressBar data={{ currentNumber: 3, totalNumber: 20 }} />
				</div>
			</div>
		</div>
	);
}
