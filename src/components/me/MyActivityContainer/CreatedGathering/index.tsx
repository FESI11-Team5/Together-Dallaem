import { useEffect, useState } from 'react';
import CardLayout from '../common/CardLayout';
import { getGatherings } from '@/apis/gatherings';
import { Gathering } from '@/types/response/gatherings';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'next/navigation';

export default function CreatedGatherings() {
	const { user } = useUserStore();
	const router = useRouter();
	const [gatherings, setGatherings] = useState<Gathering[]>([]);

	useEffect(() => {
		const fetchGatherings = async () => {
			const data = await getGatherings(`createdBy=${user?.userId}`);
			setGatherings(data as Gathering[]);
		};
		fetchGatherings();
	}, []);

	if (gatherings.length === 0) {
		return (
			<div className="flex h-full flex-1 items-center justify-center">
				<p className="text-sm text-gray-500">아직 만든 모임이 없어요</p>
			</div>
		);
	}

	return gatherings.map(gathering => (
		<div onClick={() => router.push(`/gatherings/${gathering.id}`)} key={gathering.id} className="cursor-pointer">
			<CardLayout gathering={gathering}></CardLayout>
		</div>
	));
}
