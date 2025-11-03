import { useEffect, useState } from 'react';
import CardLayout from '../common/CardLayout/CardLayout';
import NoDataMessage from '../../../commons/NoDataMessage/NoDataMessage';
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
		return <NoDataMessage text="아직 만든 크루가 없어요" />;
	}

	return gatherings.map(gathering => (
		<div onClick={() => router.push(`/gatherings/${gathering.id}`)} key={gathering.id} className="cursor-pointer">
			<CardLayout gathering={gathering}></CardLayout>
		</div>
	));
}
