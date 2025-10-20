import BasicFooter from '@/components/commons/basic/BasicFooter';

import { getGatheringId } from '@/apis/gatherings';
import { GatheringProvider } from '@/providers/GatheringProvider';

export default async function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const gathering = await getGatheringId(Number(id));

	return (
		<GatheringProvider value={{ gathering }}>
			{children}
			<BasicFooter />
		</GatheringProvider>
	);
}
