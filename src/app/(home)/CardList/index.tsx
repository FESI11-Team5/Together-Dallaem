'use client';

import Card from '@/app/(home)/Card';
import type { Gathering } from '@/types/response/gatherings';
import { useRouter } from 'next/navigation';

interface CardListProps {
	gatherings: Gathering[];
}

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
