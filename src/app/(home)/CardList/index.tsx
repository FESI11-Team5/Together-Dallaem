'use client';

import Card from '@/app/(home)/Card';
import type { Gathering } from '@/types/response/gatherings';
import { useRouter } from 'next/navigation';

interface CardListProps {
	/** 모임 카드에 표시할 모임 목록 */
	gatherings: Gathering[];
}

/**
 * 여러 개의 모임 카드를 리스트 형태로 표시하는 컴포넌트
 * 각 카드 클릭 시 해당 모임 상세 페이지로 이동합니다.
 *
 * @param {CardListProps} props - 모임 목록을 포함한 props
 */
export default function CardList({ gatherings }: CardListProps) {
	const router = useRouter();
	const handleClick = (id: number) => {
		router.push(`gatherings/${id}`);
	};

	return (
		<div className="flex flex-col gap-6">
			{gatherings.map(gathering => (
				<Card key={gathering.id} gathering={gathering} onClick={() => handleClick(gathering.id)} />
			))}
		</div>
	);
}
