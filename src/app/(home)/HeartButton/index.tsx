'use client';

import { useWishlistStore } from '@/stores/wishlist';
import { cn } from '@/utils/cn';
import Image from 'next/image';

interface HeartButtonProps {
	/** 모임 ID */
	id: number;
}

/**
 * 찜(하트) 기능을 담당하는 버튼 컴포넌트
 * Zustand의 wishlist 상태를 기반으로 활성/비활성 상태를 표시하며,
 * 클릭 시 찜 상태를 토글합니다.
 *
 * @param {HeartButtonProps} props - 모임 ID를 포함한 props
 */
export default function HeartButton({ id }: HeartButtonProps) {
	const isInWishlist = useWishlistStore(state => state.wishlist.has(id));
	const toggleWish = useWishlistStore(state => state.toggleWish);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleWish(id);
	};

	return (
		// TODO: 공통 컴포넌트로 이런 아이콘 버튼만 모아두고 svg 넣을 수 있는 구조가 있으면 좋겠다.
		<button
			onClick={handleClick}
			className={cn(
				'flex size-[48px] cursor-pointer items-center justify-center rounded-full border-2 transition-colors',
				isInWishlist ? 'border-highlight shadow-highlight/50 shadow-xl' : 'border-gray-300',
				'transition-transform duration-150 ease-in-out hover:scale-105 active:scale-90'
			)}
			aria-pressed={isInWishlist}
			aria-label={isInWishlist ? '찜한 상태' : '찜하지 않은 상태'}>
			<Image
				priority
				src={isInWishlist ? '/icons/heart_active.svg' : '/icons/heart.svg'}
				alt={isInWishlist ? '꽉찬 하트 아이콘' : '빈 하트 아이콘'}
				width={24}
				height={24}
			/>
		</button>
	);
}
