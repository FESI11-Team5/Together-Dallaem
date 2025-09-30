import Image from 'next/image';

interface CanceledOverlayProps {
	canceledAt: string | null;
}

export default function CanceledOverlay({ canceledAt }: CanceledOverlayProps) {
	if (!canceledAt) return null;

	return (
		<div className="tb:rounded-3xl absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/80">
			<div>
				<p className="text-sm font-medium text-white">
					모집 취소된 모임이에요,
					<br />
					다음 기회에 만나요 🙏
				</p>
				<button className="mt-6 flex items-center justify-center gap-0.5 rounded-xl bg-orange-50 px-3 py-1.5 font-semibold text-orange-600">
					<Image src="/icons/bye.svg" alt="취소된 모임 오버레이 손바닥 아이콘" width={24} height={24} />
					모임 보내주기
				</button>
			</div>
		</div>
	);
}
