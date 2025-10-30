import Image from 'next/image';
import { CANCELED_GATHERING_MESSAGE } from '@/constants/messages';

interface CanceledOverlayProps {
	/** 모임 취소일시, 취소되지 않은 경우 null */
	canceledAt: string | null;
}

const CANCELED_OVERLAY_GLOW = '[box-shadow:0_0_2px_#D705F2,0_0_4px_#D705F2,0_0_8px_#D705F2,0_0_16px_#D705F2]';
const CANCELED_TEXT_GLOW = '[text-shadow:0_0_2px_#B3B3B3,0_0_4px_#B3B3B3,0_0_8px_#B3B3B3,0_0_16px_#B3B3B3]';
/**
 * 취소된 모임 위에 표시되는 오버레이 컴포넌트입니다.
 *
 * - `canceledAt`이 null이면 아무것도 렌더링하지 않습니다.
 * - 취소된 모임이면 검정 반투명 배경과 안내 문구, "모임 보내주기" 버튼을 표시합니다.
 *
 * @param {CanceledOverlayProps} props - 컴포넌트 props
 * @returns {JSX.Element | null} 모임 취소 오버레이
 *
 * @example
 * <CanceledOverlay canceledAt="2025-09-30T23:59:59" />
 */
export default function CanceledOverlay({ canceledAt }: CanceledOverlayProps) {
	if (!canceledAt) return null;

	return (
		<div
			className={`tb:rounded-3xl z-floating bg-primary-dark/70 absolute inset-0 flex items-center justify-center rounded-xl border-3 border-[#F7D2FB] ${CANCELED_OVERLAY_GLOW} ${CANCELED_TEXT_GLOW}`}
			role="status"
			aria-live="polite">
			<div>
				<p className="text-center text-sm font-medium whitespace-pre-line text-white">
					{`${CANCELED_GATHERING_MESSAGE.title}\n${CANCELED_GATHERING_MESSAGE.subTitle}`}
				</p>
				<button
					type="button"
					aria-label="취소된 모임 보내주기"
					className="tb:border-none tb:p-3 tb:rounded-full tb:absolute tb:top-0 tb:right-6 border-primary-500 mt-6 flex items-center gap-0.5 rounded-xl border bg-white px-3 py-1.5">
					<Image src="/icons/bye.svg" alt="취소된 모임 손바닥 아이콘" width={24} height={24} />
					<p className="tb:hidden text-primary-500 text-sm font-semibold">모임 보내주기</p>
				</button>
			</div>
		</div>
	);
}
