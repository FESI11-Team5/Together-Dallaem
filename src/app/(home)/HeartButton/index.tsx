'use client';

import { useWishlistStore } from '@/stores/wishlist';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
	const { wishlist, toggleWish } = useWishlistStore.getState();
	const hasHydrated = useWishlistStore.persist.hasHydrated();
	const [isActive, setIsActive] = useState(() => wishlist.has(id));

	useEffect(() => {
		if (hasHydrated) setIsActive(wishlist.has(id));
	}, [hasHydrated, wishlist, id]);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsActive(prev => !prev);
		toggleWish(id);
	};

	return (
		// TODO: 공통 컴포넌트로 이런 아이콘 버튼만 모아두고 svg 넣을 수 있는 구조가 있으면 좋겠다.
		<button
			onClick={handleClick}
			className={cn(
				'flex size-[48px] items-center justify-center rounded-full transition-colors',
				isActive ? 'bg-orange-50 hover:bg-orange-100' : 'border-2 border-gray-200 bg-white hover:bg-gray-50',
				'transition-transform duration-150 ease-in-out hover:scale-105 active:scale-50'
			)}
			aria-pressed={isActive}
			aria-label={isActive ? '찜한 상태' : '찜하지 않은 상태'}>
			<Image
				priority
				src={isActive ? '/icons/heart_active.svg' : '/icons/heart.svg'}
				alt={isActive ? '꽉찬 하트 아이콘' : '빈 하트 아이콘'}
				width={24}
				height={24}
			/>
		</button>
	);
}
