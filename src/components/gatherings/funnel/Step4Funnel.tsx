'use client';

import { useFunnelStore } from '@/stores/useFunnelStore';

import BasicButton from '@/components/commons/basic/BasicButton';

export default function Step4Funnel() {
	const { next } = useFunnelStore();
	return (
		<>
			<span className="text-white">Step 4</span>
			<div>
				<BasicButton onClick={next}>다음</BasicButton>
			</div>
		</>
	);
}
